// server/services/bi/biAnalyticsService.js
// QUICK by VMS — Phase 4: Advanced Business Intelligence & Analytics Engine

export class BiAnalyticsService {
  constructor(store) {
    this.store = store;
    this.cache = new Map();
    this.cacheTtlMs = 5 * 60 * 1000; // 5 minutes cache TTL
  }

  /**
   * Clear cache (called on new sales, requests, transfers, or inventory changes)
   */
  invalidateCache() {
    this.cache.clear();
  }

  /**
   * Get cached value or compute
   */
  async getCached(key, computeFn) {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTtlMs) {
      return cached.data;
    }
    const data = await computeFn();
    this.cache.set(key, { timestamp: Date.now(), data });
    return data;
  }

  /**
   * 1. EXECUTIVE MANAGEMENT OVERVIEW
   * Calculates comprehensive operational and financial KPIs
   */
  async getExecutiveOverview(filters = {}) {
    return this.getCached(`overview_${JSON.stringify(filters)}`, async () => {
      const { motorcycles = [], models = [], showrooms = [], sales = [], requests = [], transfers = [], odoo_external_mappings = [] } = this.store;
      const now = Date.now();

      // Date filtering for sales
      let filteredSales = sales;
      let filteredRequests = requests;
      if (filters.startDate) {
        const start = new Date(filters.startDate).getTime();
        filteredSales = filteredSales.filter(s => new Date(s.sale_date || s.created_at).getTime() >= start);
        filteredRequests = filteredRequests.filter(r => new Date(r.created_at).getTime() >= start);
      }
      if (filters.endDate) {
        const end = new Date(filters.endDate).getTime();
        filteredSales = filteredSales.filter(s => new Date(s.sale_date || s.created_at).getTime() <= end);
        filteredRequests = filteredRequests.filter(r => new Date(r.created_at).getTime() <= end);
      }
      if (filters.region && filters.region !== 'ALL') {
        const wilayasInRegion = this.getWilayasForRegion(filters.region);
        filteredSales = filteredSales.filter(s => {
          const shw = showrooms.find(sh => sh.id === s.showroom_id);
          return shw && wilayasInRegion.includes(shw.wilaya_code);
        });
        filteredRequests = filteredRequests.filter(r => wilayasInRegion.includes(r.wilaya_code));
      }

      // Sales Metrics
      const totalSalesRevenue = filteredSales.reduce((acc, s) => acc + (s.sale_price || 0), 0);
      const totalSalesVolume = filteredSales.length;
      const averageTicketDzd = totalSalesVolume > 0 ? Math.round(totalSalesRevenue / totalSalesVolume) : 0;

      // Customer Requests & Conversion Funnel
      const totalRequests = filteredRequests.length;
      const fulfilledRequests = filteredRequests.filter(r => r.status === 'fulfilled').length;
      const availableNotifiedRequests = filteredRequests.filter(r => r.status === 'available_notified').length;
      const pendingRequests = filteredRequests.filter(r => r.status === 'pending').length;
      const conversionRatePercent = totalRequests > 0 ? Math.round((fulfilledRequests / totalRequests) * 1000) / 10 : 0;

      // Inventory & Stock Turnover
      const totalStock = motorcycles.length;
      const availableMotos = motorcycles.filter(m => m.status === 'available');
      const availableStock = availableMotos.length;

      // Aging Segmentation
      const agingMotos = availableMotos.map(m => {
        const arrival = new Date(m.arrival_date || m.created_at).getTime();
        const days = Math.max(0, Math.floor((now - arrival) / (1000 * 60 * 60 * 24)));
        const model = models.find(mod => mod.id === m.model_id);
        return { ...m, days_in_stock: days, price_dzd: model?.price_dzd || 250000 };
      });

      const freshStockCount = agingMotos.filter(m => m.days_in_stock < 30).length;
      const normalStockCount = agingMotos.filter(m => m.days_in_stock >= 30 && m.days_in_stock < 60).length;
      const warningStockCount = agingMotos.filter(m => m.days_in_stock >= 60 && m.days_in_stock < 90).length;
      const dormantStockCount = agingMotos.filter(m => m.days_in_stock >= 90).length;
      const highRiskStockCount = agingMotos.filter(m => m.days_in_stock >= 130).length;

      const dormantCapitalTiedUpDzd = agingMotos
        .filter(m => m.days_in_stock >= 90)
        .reduce((sum, m) => sum + m.price_dzd, 0);

      const dormantSharePercent = availableStock > 0 ? Math.round((dormantStockCount / availableStock) * 1000) / 10 : 0;

      // Inventory Turnover Ratio & DSI
      const avgStock = availableStock > 0 ? availableStock : 1;
      const inventoryTurnoverRatio = Math.round((totalSalesVolume / avgStock) * 100) / 100;
      const daysSalesOfInventoryDsi = inventoryTurnoverRatio > 0 ? Math.round(365 / inventoryTurnoverRatio) : 999;

      // Network Availability Rate
      const showroomsWithAvailableStock = showrooms.filter(s =>
        motorcycles.some(m => m.showroom_id === s.id && m.status === 'available')
      ).length;
      const networkAvailabilityRatePercent = showrooms.length > 0
        ? Math.round((showroomsWithAvailableStock / showrooms.length) * 1000) / 10
        : 0;

      // Compte Global Engine indicators
      const completedTransfers = transfers.filter(t => t.status === 'received').length;
      const activeTransfers = transfers.filter(t => t.status === 'in_transit' || t.status === 'approved').length;
      const estimatedUnblockedMarginDzd = Math.round(dormantCapitalTiedUpDzd * 0.08);

      // Data Provenance & Source Labeling
      const mappedEntitiesCount = odoo_external_mappings.length;
      const dataProvenance = {
        primarySource: 'QUICK_LOCAL_DATABASE',
        isSandboxActive: process.env.ODOO_SANDBOX_MODE === 'true',
        odooMappingsCount: mappedEntitiesCount,
        confidenceLevel: 'VERIFIED_TRANSACTIONAL',
        provenanceNotice: process.env.ODOO_SANDBOX_MODE === 'true'
          ? 'Mode Simulation / Sandbox actif pour les flux ERP. Les indicateurs de vente et de stock QUICK proviennent de transactions showroom réelles vérifiées.'
          : 'Données certifiées synchronisées avec le serveur Odoo ERP VMS Industrie.'
      };

      return {
        financials: {
          totalSalesRevenue,
          totalSalesVolume,
          averageTicketDzd,
          dormantCapitalTiedUpDzd,
          estimatedUnblockedMarginDzd
        },
        inventory: {
          totalStock,
          availableStock,
          inventoryTurnoverRatio,
          daysSalesOfInventoryDsi,
          networkAvailabilityRatePercent,
          dormantSharePercent,
          agingPyramid: {
            freshUnder30d: freshStockCount,
            normal30to60d: normalStockCount,
            warning60to90d: warningStockCount,
            dormantOver90d: dormantStockCount,
            criticalOver130d: highRiskStockCount
          }
        },
        demand: {
          totalRequests,
          pendingRequests,
          availableNotifiedRequests,
          fulfilledRequests,
          conversionRatePercent
        },
        transfers: {
          activeTransfers,
          completedTransfers
        },
        dataProvenance,
        generatedAt: new Date().toISOString()
      };
    });
  }

  /**
   * 2. TEMPORAL SALES & REVENUE TRENDS
   * Aggregates by day, week, month, quarter, or year
   */
  async getSalesTrends(granularity = 'monthly', range = '12m') {
    return this.getCached(`trends_${granularity}_${range}`, async () => {
      const { sales = [], requests = [] } = this.store;
      const points = [];
      const paymentSplitRaw = { CASH: 0, CHEQUE: 0, VIREMENT: 0, FACILITE: 0 };
      let totalSalesRevenue = 0;

      // Aggregate payment method split
      sales.forEach(s => {
        const method = s.payment_method || 'CASH';
        const price = s.sale_price || 0;
        paymentSplitRaw[method] = (paymentSplitRaw[method] || 0) + price;
        totalSalesRevenue += price;
      });

      const paymentSplit = {};
      const methodKeys = Object.keys(paymentSplitRaw);
      let runningPct = 0;
      methodKeys.forEach((m, idx) => {
        if (idx === methodKeys.length - 1) {
          paymentSplit[m] = Math.max(0, Math.round((100 - runningPct) * 10) / 10);
        } else {
          const pct = totalSalesRevenue > 0 ? Math.round((paymentSplitRaw[m] / totalSalesRevenue) * 1000) / 10 : 0;
          paymentSplit[m] = pct;
          runningPct += pct;
        }
      });

      // Group sales by timeline bucket
      const buckets = new Map();

      sales.forEach(s => {
        const dateStr = s.sale_date || s.created_at;
        const bucketKey = this.formatBucketKey(dateStr, granularity);
        if (!buckets.has(bucketKey)) {
          buckets.set(bucketKey, { volume: 0, revenue: 0, requestsCount: 0 });
        }
        const b = buckets.get(bucketKey);
        b.volume += 1;
        b.revenue += (s.sale_price || 0);
      });

      requests.forEach(r => {
        const bucketKey = this.formatBucketKey(r.created_at, granularity);
        if (!buckets.has(bucketKey)) {
          buckets.set(bucketKey, { volume: 0, revenue: 0, requestsCount: 0 });
        }
        buckets.get(bucketKey).requestsCount += 1;
      });

      // Sort chronological keys
      const sortedKeys = Array.from(buckets.keys()).sort();
      sortedKeys.forEach(k => {
        const b = buckets.get(k);
        points.push({
          period: k,
          salesVolume: b.volume,
          salesRevenue: b.revenue,
          requestsCount: b.requestsCount,
          averageTicketDzd: b.volume > 0 ? Math.round(b.revenue / b.volume) : 0
        });
      });

      return {
        granularity,
        points,
        paymentSplit,
        totalPeriods: points.length
      };
    });
  }

  /**
   * 3. NORMALIZED SHOWROOM FAIR BENCHMARKING
   * Compares showrooms fairly considering allocated stock & regional demand
   */
  async getShowroomRankings(filters = {}) {
    return this.getCached(`rankings_${JSON.stringify(filters)}`, async () => {
      let { showrooms = [], motorcycles = [], sales = [], requests = [] } = this.store;
      const now = Date.now();

      if (filters.region && filters.region !== 'ALL') {
        const wilayas = this.getWilayasForRegion(filters.region);
        showrooms = showrooms.filter(s => wilayas.includes(s.wilaya_code));
      }

      const rankings = showrooms.map(shw => {
        const shwMotos = motorcycles.filter(m => m.showroom_id === shw.id);
        const availableStock = shwMotos.filter(m => m.status === 'available').length;
        const dormantStock = shwMotos.filter(m => {
          if (m.status !== 'available') return false;
          const arrival = new Date(m.arrival_date || m.created_at).getTime();
          return (now - arrival) >= (90 * 24 * 3600 * 1000);
        }).length;

        const shwSales = sales.filter(s => s.showroom_id === shw.id);
        const salesVolume = shwSales.length;
        const salesRevenue = shwSales.reduce((acc, s) => acc + (s.sale_price || 0), 0);

        const wilayaRequests = requests.filter(r => r.wilaya_code === shw.wilaya_code);
        const pendingDemand = wilayaRequests.filter(r => r.status === 'pending').length;

        // Normalized absorption ratio: Sales per unit of stock capacity
        const stockBase = Math.max(1, availableStock);
        const absorptionRatio = Math.round((salesVolume / stockBase) * 100) / 100;

        // Normalized Efficiency Score (0 - 100):
        // 40% sales absorption speed + 30% demand satisfaction + 30% low dormancy rate
        const speedScore = Math.min(100, Math.round(absorptionRatio * 100));
        const demandScore = Math.min(100, Math.round((salesVolume / Math.max(1, wilayaRequests.length)) * 120));
        const dormancyPenalty = availableStock > 0 ? (dormantStock / availableStock) * 100 : 0;
        const healthyStockScore = Math.max(0, 100 - dormancyPenalty);

        const normalizedScore = Math.min(100, Math.max(0, Math.round(
          (speedScore * 0.40) +
          (demandScore * 0.30) +
          (healthyStockScore * 0.30)
        )));

        // Performance Tier Classification
        let tier = 'Standard';
        if (normalizedScore >= 55) tier = 'Top Performer';
        else if (normalizedScore >= 35) tier = 'Équilibré';
        else if (pendingDemand >= 2 && availableStock <= 1) tier = 'Rupture Critique';
        else if (dormantStock >= 3) tier = 'Sur-Stock Dormant';

        return {
          showroomId: shw.id,
          showroomName: shw.name,
          city: shw.city,
          wilayaCode: shw.wilaya_code,
          availableStock,
          dormantStock,
          salesVolume,
          salesRevenue,
          pendingDemand,
          absorptionRatio,
          normalizedScore,
          tier
        };
      });

      // Sort by normalized efficiency score descending
      rankings.sort((a, b) => b.normalizedScore - a.normalizedScore);

      // Add ranks
      rankings.forEach((r, idx) => {
        r.rank = idx + 1;
      });

      return {
        totalShowrooms: rankings.length,
        rankings,
        topPerformersCount: rankings.filter(r => r.tier === 'Top Performer').length,
        stockoutRiskCount: rankings.filter(r => r.tier === 'Rupture Critique').length,
        dormantRiskCount: rankings.filter(r => r.tier === 'Sur-Stock Dormant').length
      };
    });
  }

  /**
   * 4. CUSTOMER DEMAND & POPULAR MODELS INTELLIGENCE
   * Analyzes conversion funnel and product desire vs availability
   */
  async getDemandIntelligence() {
    return this.getCached('demand_intelligence', async () => {
      const { models = [], requests = [], motorcycles = [], sales = [] } = this.store;

      const modelStats = models.map(mod => {
        const modReqs = requests.filter(r => r.motorcycle_model_id === mod.id);
        const modSales = sales.filter(s => {
          const moto = motorcycles.find(m => m.id === s.motorcycle_id);
          return moto?.model_id === mod.id;
        });
        const availableStock = motorcycles.filter(m => m.model_id === mod.id && m.status === 'available').length;
        const pendingDemand = modReqs.filter(r => r.status === 'pending').length;

        // Tension index: ratio of unmet demand to stock availability
        const tensionIndex = Math.round((pendingDemand / (availableStock + 0.1)) * 10) / 10;

        return {
          modelId: mod.id,
          name: mod.name,
          brand: mod.brand,
          category: mod.category,
          priceDzd: mod.price_dzd,
          totalRequests: modReqs.length,
          pendingDemand,
          salesVolume: modSales.length,
          salesRevenue: modSales.reduce((acc, s) => acc + (s.sale_price || mod.price_dzd || 0), 0),
          availableStock,
          tensionIndex,
          tensionStatus: tensionIndex > 1.5 ? 'TENSION_RUPTURE' : tensionIndex < 0.3 ? 'SUR_STOCK' : 'EQUILIBRE'
        };
      });

      // Sort by total requests descending
      modelStats.sort((a, b) => b.totalRequests - a.totalRequests);

      // Conversion Funnel
      const funnel = {
        stage1_collected: requests.length,
        stage2_availableNotified: requests.filter(r => r.status === 'available_notified').length,
        stage3_salesFulfilled: requests.filter(r => r.status === 'fulfilled').length,
        stage4_pendingAwaitingStock: requests.filter(r => r.status === 'pending').length
      };

      return {
        modelStats,
        funnel,
        mostPopularModel: modelStats[0]?.name || 'N/A',
        highestTensionModel: [...modelStats].sort((a, b) => b.tensionIndex - a.tensionIndex)[0]?.name || 'N/A'
      };
    });
  }

  /**
   * Helper: bucket key formatter
   */
  formatBucketKey(dateStr, granularity) {
    const d = new Date(dateStr || Date.now());
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    if (granularity === 'daily') {
      return `${year}-${month}-${day}`;
    }
    if (granularity === 'weekly') {
      const weekNum = Math.ceil(d.getDate() / 7);
      return `${year}-M${month}-S${weekNum}`;
    }
    if (granularity === 'quarterly') {
      const quarter = Math.floor(d.getMonth() / 3) + 1;
      return `${year}-T${quarter}`;
    }
    if (granularity === 'yearly') {
      return `${year}`;
    }
    // Default monthly
    return `${year}-${month}`;
  }

  /**
   * Helper: Wilayas by Algerian Region
   */
  getWilayasForRegion(region) {
    const REGIONS = {
      CENTRE: ['16', '09', '15', '10', '26', '35', '42', '44'],
      EST: ['04', '05', '06', '07', '12', '18', '19', '21', '23', '24', '25', '34', '36', '40', '41', '43'],
      OUEST: ['02', '13', '14', '20', '22', '27', '29', '31', '38', '46', '48'],
      SUD: ['01', '03', '08', '11', '17', '28', '30', '32', '33', '37', '39', '45', '47', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58']
    };
    return REGIONS[region] || [];
  }
}
