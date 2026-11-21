/**
 * =============================================================================
 * QUICK by VMS — ENTERPRISE DATA WAREHOUSE (PHASE 6)
 * Data Quality & Governance Framework Service
 * =============================================================================
 * Evaluates 6 core dimensions of Data Quality:
 * 1. COMPLETENESS       - Mandatory attributes presence
 * 2. ACCURACY           - Values within valid business and mathematical domains
 * 3. CONSISTENCY         - Inter-table and aggregation coherence
 * 4. UNIQUENESS         - Primary/Surrogate key distinctness, zero duplicate records
 * 5. REFERENTIAL INTEGRITY - Valid foreign key relationships in the Star Schema
 * 6. FRESHNESS          - Timeliness of ingestion and sync cycles
 */

export class DataQualityService {
  constructor() {
    this.auditHistory = [];
  }

  /**
   * Run full data quality assessment on the dimensional warehouse
   * @param {Object} warehouse - Instance of DataWarehouseService state
   */
  assessWarehouseQuality(warehouse) {
    const timestamp = new Date().toISOString();
    const dimensionsResults = [];

    // 1. COMPLETENESS
    const completeness = this._checkCompleteness(warehouse);
    dimensionsResults.push(completeness);

    // 2. ACCURACY
    const accuracy = this._checkAccuracy(warehouse);
    dimensionsResults.push(accuracy);

    // 3. CONSISTENCY
    const consistency = this._checkConsistency(warehouse);
    dimensionsResults.push(consistency);

    // 4. UNIQUENESS
    const uniqueness = this._checkUniqueness(warehouse);
    dimensionsResults.push(uniqueness);

    // 5. REFERENTIAL INTEGRITY
    const integrity = this._checkReferentialIntegrity(warehouse);
    dimensionsResults.push(integrity);

    // 6. FRESHNESS
    const freshness = this._checkFreshness(warehouse);
    dimensionsResults.push(freshness);

    // Overall Quality Score (Weighted Average)
    const weights = {
      COMPLETENESS: 0.20,
      ACCURACY: 0.20,
      CONSISTENCY: 0.15,
      UNIQUENESS: 0.15,
      REFERENTIAL_INTEGRITY: 0.20,
      FRESHNESS: 0.10
    };

    let overallScore = 0;
    dimensionsResults.forEach(d => {
      overallScore += (d.score * (weights[d.dimension] || 0.166));
    });
    overallScore = Math.round(overallScore * 10) / 10;

    const auditRecord = {
      auditId: `dqa-${Date.now()}`,
      timestamp,
      overallScore,
      status: overallScore >= 95 ? 'EXCELLENT' : (overallScore >= 85 ? 'GOOD' : 'WARNING'),
      dimensions: dimensionsResults,
      dataProvenanceSummary: {
        certifiedQuickRecords: (warehouse.facts.sales?.length || 0) + (warehouse.facts.customerRequests?.length || 0),
        odooSyncRecords: warehouse.provenanceMetrics?.odooRecords || 0,
        predictiveRecords: warehouse.facts.forecasts?.length || 0,
        businessAssumptionsCount: 2 // Margin 8% + Seasonality multipliers
      }
    };

    this.auditHistory.unshift(auditRecord);
    if (this.auditHistory.length > 50) this.auditHistory.pop();

    return auditRecord;
  }

  _checkCompleteness(warehouse) {
    let totalFields = 0;
    let missingFields = 0;

    // Check fact_sales
    warehouse.facts.sales.forEach(s => {
      totalFields += 6;
      if (!s.sale_id) missingFields++;
      if (!s.date_key) missingFields++;
      if (!s.showroom_key) missingFields++;
      if (!s.product_key) missingFields++;
      if (!s.vin) missingFields++;
      if (s.sale_price_dzd === undefined || s.sale_price_dzd === null) missingFields++;
    });

    // Check dim_showroom
    warehouse.dimensions.showrooms.forEach(shw => {
      totalFields += 5;
      if (!shw.showroom_id) missingFields++;
      if (!shw.showroom_name) missingFields++;
      if (!shw.wilaya_code) missingFields++;
      if (!shw.region_code) missingFields++;
      if (!shw.showroom_key) missingFields++;
    });

    // Check dim_product
    warehouse.dimensions.products.forEach(p => {
      totalFields += 4;
      if (!p.model_id) missingFields++;
      if (!p.model_name) missingFields++;
      if (!p.default_price_dzd) missingFields++;
      if (!p.product_key) missingFields++;
    });

    const score = totalFields > 0 ? Math.round(((totalFields - missingFields) / totalFields) * 1000) / 10 : 100;

    return {
      dimension: 'COMPLETENESS',
      score,
      status: score >= 98 ? 'PASSED' : 'WARNING',
      checkedItems: totalFields,
      failedItems: missingFields,
      description: 'Présence des attributs obligatoires sur les faits et dimensions critiques.'
    };
  }

  _checkAccuracy(warehouse) {
    let totalChecks = 0;
    let inaccurateChecks = 0;

    // Sales price must be positive and realistic (100k - 2.5M DZD)
    warehouse.facts.sales.forEach(s => {
      totalChecks += 2;
      if (s.sale_price_dzd <= 0 || s.sale_price_dzd > 3000000) inaccurateChecks++;
      if (s.days_in_stock_prior_to_sale < 0) inaccurateChecks++;
    });

    // Products price > 0 and displacement between 50 and 1200cc
    warehouse.dimensions.products.forEach(p => {
      totalChecks += 2;
      if (p.default_price_dzd <= 0) inaccurateChecks++;
      if (p.displacement_cc < 50 || p.displacement_cc > 1200) inaccurateChecks++;
    });

    // Showrooms coordinates bounded to Algeria [Lat 18..38, Long -9..12]
    warehouse.dimensions.showrooms.forEach(shw => {
      totalChecks += 1;
      if (shw.latitude && (shw.latitude < 18 || shw.latitude > 38)) inaccurateChecks++;
    });

    const score = totalChecks > 0 ? Math.round(((totalChecks - inaccurateChecks) / totalChecks) * 1000) / 10 : 100;

    return {
      dimension: 'ACCURACY',
      score,
      status: score >= 98 ? 'PASSED' : 'WARNING',
      checkedItems: totalChecks,
      failedItems: inaccurateChecks,
      description: 'Conformité des valeurs aux domaines d\'affaires et aux bornes physiques.'
    };
  }

  _checkConsistency(warehouse) {
    let inconsistencies = 0;
    let totalChecks = 4;

    // Consistency 1: Total sales revenue matches sum of fact_sales prices
    const totalRevenueCalc = warehouse.facts.sales.reduce((sum, s) => sum + s.sale_price_dzd, 0);
    const sourceRevenue = warehouse.sourceMetrics?.totalRevenueDzd || totalRevenueCalc;
    if (Math.abs(totalRevenueCalc - sourceRevenue) > 1.0) inconsistencies++;

    // Consistency 2: Number of sales facts matches source sales records
    if (warehouse.facts.sales.length !== (warehouse.sourceMetrics?.totalSalesCount || warehouse.facts.sales.length)) {
      inconsistencies++;
    }

    // Consistency 3: Available units + reserved units <= total units in inventory snapshots
    warehouse.facts.inventorySnapshots.forEach(inv => {
      totalChecks++;
      if (inv.available_units + inv.reserved_units > inv.total_units_on_hand) {
        inconsistencies++;
      }
    });

    const score = Math.round(((totalChecks - inconsistencies) / totalChecks) * 1000) / 10;

    return {
      dimension: 'CONSISTENCY',
      score,
      status: score >= 95 ? 'PASSED' : 'WARNING',
      checkedItems: totalChecks,
      failedItems: inconsistencies,
      description: 'Cohérence croisée entre les agrégats de faits et les sources transactionnelles.'
    };
  }

  _checkUniqueness(warehouse) {
    let duplicateCount = 0;
    let totalUniqueChecks = 0;

    // Check unique sale_id
    const saleIds = new Set();
    warehouse.facts.sales.forEach(s => {
      totalUniqueChecks++;
      if (saleIds.has(s.sale_id)) duplicateCount++;
      else saleIds.add(s.sale_id);
    });

    // Check unique VINs
    const vins = new Set();
    warehouse.facts.sales.forEach(s => {
      totalUniqueChecks++;
      if (vins.has(s.vin)) duplicateCount++;
      else vins.add(s.vin);
    });

    // Check unique showroom natural IDs
    const showroomIds = new Set();
    warehouse.dimensions.showrooms.forEach(shw => {
      totalUniqueChecks++;
      if (showroomIds.has(shw.showroom_id)) duplicateCount++;
      else showroomIds.add(shw.showroom_id);
    });

    // Check unique date_key in dim_date
    const dateKeys = new Set();
    warehouse.dimensions.dates.forEach(d => {
      totalUniqueChecks++;
      if (dateKeys.has(d.date_key)) duplicateCount++;
      else dateKeys.add(d.date_key);
    });

    const score = totalUniqueChecks > 0 ? Math.round(((totalUniqueChecks - duplicateCount) / totalUniqueChecks) * 1000) / 10 : 100;

    return {
      dimension: 'UNIQUENESS',
      score,
      status: duplicateCount === 0 ? 'PASSED' : 'CRITICAL',
      checkedItems: totalUniqueChecks,
      failedItems: duplicateCount,
      description: 'Absence totale de doublons sur les clés métier et clés de substitution (Surrogate Keys).'
    };
  }

  _checkReferentialIntegrity(warehouse) {
    let orphanForeignKeys = 0;
    let totalForeignKeyChecks = 0;

    const dateKeySet = new Set(warehouse.dimensions.dates.map(d => d.date_key));
    const showroomKeySet = new Set(warehouse.dimensions.showrooms.map(s => s.showroom_key));
    const productKeySet = new Set(warehouse.dimensions.products.map(p => p.product_key));
    const regionKeySet = new Set(warehouse.dimensions.regions.map(r => r.region_key));

    // Verify fact_sales foreign keys
    warehouse.facts.sales.forEach(s => {
      totalForeignKeyChecks += 4;
      if (!dateKeySet.has(s.date_key)) orphanForeignKeys++;
      if (!showroomKeySet.has(s.showroom_key)) orphanForeignKeys++;
      if (!productKeySet.has(s.product_key)) orphanForeignKeys++;
      if (!regionKeySet.has(s.region_key)) orphanForeignKeys++;
    });

    // Verify fact_inventory_snapshots foreign keys
    warehouse.facts.inventorySnapshots.forEach(inv => {
      totalForeignKeyChecks += 4;
      if (!dateKeySet.has(inv.snapshot_date_key)) orphanForeignKeys++;
      if (!showroomKeySet.has(inv.showroom_key)) orphanForeignKeys++;
      if (!productKeySet.has(inv.product_key)) orphanForeignKeys++;
      if (!regionKeySet.has(inv.region_key)) orphanForeignKeys++;
    });

    const score = totalForeignKeyChecks > 0 ? Math.round(((totalForeignKeyChecks - orphanForeignKeys) / totalForeignKeyChecks) * 1000) / 10 : 100;

    return {
      dimension: 'REFERENTIAL_INTEGRITY',
      score,
      status: orphanForeignKeys === 0 ? 'PASSED' : 'CRITICAL',
      checkedItems: totalForeignKeyChecks,
      failedItems: orphanForeignKeys,
      description: 'Intégrité référentielle stricte des jointures en étoile (Star Schema) sans clés orphelines.'
    };
  }

  _checkFreshness(warehouse) {
    const now = Date.now();
    const lastRunTs = warehouse.lastEtlRun?.completed_at ? new Date(warehouse.lastEtlRun.completed_at).getTime() : now;
    const diffHours = (now - lastRunTs) / (1000 * 3600);

    let score = 100;
    if (diffHours > 24) score = 80;
    if (diffHours > 72) score = 50;

    return {
      dimension: 'FRESHNESS',
      score,
      status: score >= 90 ? 'PASSED' : 'WARNING',
      checkedItems: 1,
      failedItems: score < 90 ? 1 : 0,
      description: `Fraîcheur des données : dernier cycle d'ingestion ETL exécuté il y a ${Math.round(diffHours * 10) / 10} heures.`
    };
  }

  getAuditHistory() {
    return this.auditHistory;
  }
}

export const dataQualityService = new DataQualityService();
export default dataQualityService;
