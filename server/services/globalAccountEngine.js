// QUICK by VMS — Advanced Global Account Intelligent Decision Engine (Phase 2)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Wilaya Coordinates
const COORD_FILE = path.join(__dirname, '../data/wilayaCoordinates.json');
let WILAYA_COORDS = {};
try {
  WILAYA_COORDS = JSON.parse(fs.readFileSync(COORD_FILE, 'utf-8'));
} catch (e) {
  console.warn('Could not load wilayaCoordinates.json, using defaults:', e.message);
}

// Configurable Scoring Algorithm Weights & Business Parameters
export let globalAccountConfig = {
  weightAge: 0.25,        // 25%: Urgence de déstockage de l'unité dormante (>90j)
  weightDemand: 0.25,     // 25%: Pression de la demande locale clients
  weightStockout: 0.20,   // 20%: Gravité de la rupture dans le showroom cible
  weightVelocity: 0.15,   // 15%: Vitesse d'absorption historique du modèle
  weightLogistics: 0.15,  // 15%: Proximité géographique et coût kilométrique
  thresholdDays: 90,      // Seuil d'éligibilité Compte Global (jours)
  logisticsBaseFeeDzd: 4000,
  logisticsRatePerKmDzd: 35
};

export function updateAlgorithmConfig(newConfig) {
  globalAccountConfig = { ...globalAccountConfig, ...newConfig };
  return globalAccountConfig;
}

/**
 * Calculate road distance in km between two wilayas (Haversine + road factor)
 */
export function calculateDistanceKm(code1, code2) {
  if (code1 === code2) return 15; // intra-wilaya standard local transit
  const c1 = WILAYA_COORDS[code1];
  const c2 = WILAYA_COORDS[code2];
  if (!c1 || !c2) return 250; // fallback standard inter-wilaya distance

  const R = 6371;
  const dLat = (c2.lat - c1.lat) * Math.PI / 180;
  const dLon = (c2.lon - c1.lon) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 1.25);
}

/**
 * Estimate logistics transport cost in DZD
 */
export function estimateLogisticsCost(distanceKm, baseFee = 4000, ratePerKm = 35) {
  return Math.round(baseFee + (distanceKm * ratePerKm));
}

/**
 * Compute multi-criteria transfer recommendations
 */
export function computeTransferOpportunities(store, targetShowroomId = null, customConfig = null) {
  const config = customConfig ? { ...globalAccountConfig, ...customConfig } : globalAccountConfig;
  const now = Date.now();
  const opportunities = [];

  const { motorcycles = [], showrooms = [], requests = [], models = [], sales = [] } = store;

  // Filter aging available stock
  const eligibleMotos = motorcycles
    .filter(m => m.status === 'available')
    .map(m => {
      const arrival = new Date(m.arrival_date).getTime();
      const days = Math.max(0, Math.floor((now - arrival) / (1000 * 60 * 60 * 24)));
      return { ...m, days_in_stock: days };
    })
    .filter(m => m.days_in_stock >= config.thresholdDays);

  const pendingRequests = requests.filter(r => r.status === 'pending');

  eligibleMotos.forEach(moto => {
    const model = models.find(mod => mod.id === moto.model_id);
    const sourceShowroom = showrooms.find(s => s.id === moto.showroom_id);
    if (!model || !sourceShowroom) return;

    showrooms.forEach(destShowroom => {
      if (destShowroom.id === moto.showroom_id) return;
      if (targetShowroomId && destShowroom.id !== targetShowroomId) return;

      // 1. Demand in destination wilaya
      const demandInWilaya = pendingRequests.filter(
        r => r.motorcycle_model_id === moto.model_id && r.wilaya_code === destShowroom.wilaya_code
      ).length;

      // 2. Local stock in destination showroom
      const localStock = motorcycles.filter(
        m => m.showroom_id === destShowroom.id && m.model_id === moto.model_id && m.status === 'available'
      ).length;

      // 3. Historical sales velocity in destination showroom
      const recentSalesCount = sales.filter(
        s => s.showroom_id === destShowroom.id && s.motorcycle_id &&
             motorcycles.find(m => m.id === s.motorcycle_id)?.model_id === moto.model_id
      ).length;

      // Candidate qualification: must have demand, stockout, or high sales velocity
      if (demandInWilaya === 0 && localStock > 0 && recentSalesCount === 0) {
        return; // No justification to transfer here
      }

      // --- SUB-SCORES CALCULATION (0 - 100) ---
      // A. Stock Age Score (25%)
      const excessDays = Math.max(0, moto.days_in_stock - config.thresholdDays);
      const stockAgeScore = Math.min(100, Math.round(50 + (excessDays / 90) * 50));

      // B. Customer Demand Score (25%)
      const demandScore = Math.min(100, demandInWilaya * 25);

      // C. Stockout Severity Score (20%)
      const stockoutScore = localStock === 0 ? 100 : (localStock === 1 ? 50 : 15);

      // D. Sales Velocity Score (15%)
      const velocityScore = Math.min(100, Math.max(25, recentSalesCount * 30));

      // E. Logistics & Proximity Score (15%)
      const distanceKm = calculateDistanceKm(sourceShowroom.wilaya_code, destShowroom.wilaya_code);
      const logisticsCostDzd = estimateLogisticsCost(distanceKm, config.logisticsBaseFeeDzd, config.logisticsRatePerKmDzd);
      const logisticsScore = Math.max(10, Math.min(100, Math.round(100 - (distanceKm / 12))));

      // Overall Composite Score (0 - 100)
      const overallScore = Math.min(100, Math.max(0, Math.round(
        (stockAgeScore * config.weightAge) +
        (demandScore * config.weightDemand) +
        (stockoutScore * config.weightStockout) +
        (velocityScore * config.weightVelocity) +
        (logisticsScore * config.weightLogistics)
      )));

      // Priority Level
      let priority = 'Standard';
      if (overallScore >= 75) priority = 'Haute';
      else if (overallScore >= 50) priority = 'Moyenne';

      // Estimated Days to Sell
      let estimatedDaysToSell = 21;
      if (demandInWilaya >= 2) estimatedDaysToSell = 3;
      else if (demandInWilaya === 1) estimatedDaysToSell = 7;
      else if (localStock === 0 && recentSalesCount > 0) estimatedDaysToSell = 12;

      // Commercial Benefit (estimated gross margin unblocked minus logistics)
      const bikeValue = model.price_dzd || 250000;
      const commercialBenefitDzd = Math.max(0, Math.round((bikeValue * 0.08) - logisticsCostDzd));

      // Human-readable Explanation
      const explanation = generateExplanation({
        score: overallScore,
        priority,
        modelName: model.name,
        sourceCity: sourceShowroom.city,
        destCity: destShowroom.city,
        daysInStock: moto.days_in_stock,
        demandCount: demandInWilaya,
        localStock,
        distanceKm,
        logisticsCostDzd,
        estimatedDaysToSell
      });

      opportunities.push({
        id: `opp-${moto.id}-${destShowroom.id}`,
        model,
        sourceShowroom,
        destinationShowroom: destShowroom,
        motorcycle: moto,
        daysInStock: moto.days_in_stock,
        score: overallScore,
        priority,
        subScores: {
          stockAgeScore,
          demandScore,
          stockoutScore,
          velocityScore,
          logisticsScore
        },
        distanceKm,
        logisticsCostDzd,
        estimatedDaysToSell,
        commercialBenefitDzd,
        pendingDemandCount: demandInWilaya,
        destinationStockCount: localStock,
        reason: demandInWilaya > 0
          ? `${demandInWilaya} client(s) en attente à ${destShowroom.city}; stock dormant de ${moto.days_in_stock}j à ${sourceShowroom.city}.`
          : `Rupture de stock à ${destShowroom.city} (0 dispo) et sur-stockage (${moto.days_in_stock}j) à ${sourceShowroom.city}.`,
        explanation
      });
    });
  });

  // Keep top optimal recommendations and sort by score descending
  // Group by motorcycle ID so each dormant motorcycle has its best destination ranked first
  const bestByMoto = new Map();
  opportunities.sort((a, b) => b.score - a.score).forEach(opp => {
    if (!bestByMoto.has(opp.motorcycle.id)) {
      bestByMoto.set(opp.motorcycle.id, opp);
    }
  });

  return Array.from(bestByMoto.values()).sort((a, b) => b.score - a.score);
}

function generateExplanation(data) {
  const parts = [];
  parts.push(`Score global ${data.score}/100 (${data.priority} priorité).`);
  parts.push(`Unité ${data.modelName} immobilisée depuis ${data.daysInStock} jours à ${data.sourceCity}.`);

  if (data.demandCount > 0) {
    parts.push(`Forte tension locale: ${data.demandCount} client(s) en attente active à ${data.destCity}.`);
  } else if (data.localStock === 0) {
    parts.push(`Rupture totale de stock constatée à ${data.destCity} (0 unité disponible).`);
  }

  parts.push(`Distance routière: ${data.distanceKm} km (coût plateau estimé: ${new Intl.NumberFormat('fr-DZ').format(data.logisticsCostDzd)} DZD).`);
  parts.push(`Délai moyen estimé d'écoulement à destination: ${data.estimatedDaysToSell} jours.`);

  return parts.join(' ');
}

/**
 * Identify stockout risks across all showrooms
 */
export function getStockoutRisks(store) {
  const { motorcycles = [], showrooms = [], requests = [], models = [] } = store;
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const risks = [];

  showrooms.forEach(shw => {
    models.forEach(mod => {
      const localStock = motorcycles.filter(
        m => m.showroom_id === shw.id && m.model_id === mod.id && m.status === 'available'
      ).length;

      const demand = pendingRequests.filter(
        r => r.motorcycle_model_id === mod.id && r.wilaya_code === shw.wilaya_code
      ).length;

      if (localStock === 0 && demand > 0) {
        risks.push({
          showroomId: shw.id,
          showroomName: shw.name,
          city: shw.city,
          wilayaCode: shw.wilaya_code,
          modelId: mod.id,
          modelName: mod.name,
          category: mod.category,
          pendingDemand: demand,
          currentStock: 0,
          severity: demand >= 2 ? 'critical' : 'warning'
        });
      }
    });
  });

  return risks.sort((a, b) => b.pendingDemand - a.pendingDemand);
}

/**
 * Audit dormant stock distribution and capital immobilized
 */
export function getDormantInventorySummary(store) {
  const { motorcycles = [], showrooms = [], models = [] } = store;
  const now = Date.now();

  const dormantMotos = motorcycles
    .filter(m => m.status === 'available')
    .map(m => {
      const arrival = new Date(m.arrival_date).getTime();
      const days = Math.max(0, Math.floor((now - arrival) / (1000 * 60 * 60 * 24)));
      const model = models.find(mod => mod.id === m.model_id);
      return { ...m, days_in_stock: days, valueDzd: model?.price_dzd || 250000 };
    })
    .filter(m => m.days_in_stock >= globalAccountConfig.thresholdDays);

  const highRisk = dormantMotos.filter(m => m.days_in_stock >= 130);
  const moderateRisk = dormantMotos.filter(m => m.days_in_stock < 130);
  const totalCapital = dormantMotos.reduce((sum, m) => sum + m.valueDzd, 0);

  // Group by showroom
  const byShw = {};
  dormantMotos.forEach(m => {
    if (!byShw[m.showroom_id]) byShw[m.showroom_id] = { count: 0, totalValueDzd: 0 };
    byShw[m.showroom_id].count++;
    byShw[m.showroom_id].totalValueDzd += m.valueDzd;
  });

  const topShowrooms = Object.keys(byShw)
    .map(id => ({
      showroom: showrooms.find(s => s.id === id) || { id, name: id, city: 'Inconnu' },
      count: byShw[id].count,
      totalValueDzd: byShw[id].totalValueDzd
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalDormantUnits: dormantMotos.length,
    highRiskUnits: highRisk.length,
    moderateRiskUnits: moderateRisk.length,
    totalCapitalTiedUpDzd: totalCapital,
    topDormantShowrooms: topShowrooms
  };
}
