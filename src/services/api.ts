import { dbStore } from './dbStore';
import { ClientBiService } from './clientBiService';
import {
  Profile,
  Showroom,
  MotorcycleModel,
  Motorcycle,
  CustomerRequest,
  Transfer,
  Sale,
  RequestLimitCheck,
  GlobalKPIs,
  ShowroomKPIs,
  TransferOpportunity,
  StockoutRisk,
  DormantInventorySummary,
  GlobalAccountConfig,
  OdooConnectionStatus,
  OdooSyncStats,
  OdooSyncSchedulerConfig,
  OdooSyncHistoryItem,
  OdooConflictItem,
  OdooSyncSummary,
  OdooIntegrationState,
  BiExecutiveOverview,
  BiSalesTrendsResponse,
  BiShowroomRankingsResponse,
  BiDemandIntelligenceResponse,
  BiFilterOptions,
  PredictiveExecutiveOverview,
  SalesForecastResponse,
  ModelForecastsResponse,
  ShowroomProjectionsResponse,
  AlgerianSeasonalityFactor,
  BacktestAccuracyScorecard,
  DataWarehouseOverview,
  DataQualityScorecard,
  EtlPipelineRun,
  ReconciliationReport,
  ExecutiveReport
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private isOnline: boolean = false;
  private checkPromise: Promise<boolean> | null = null;
  private listeners: Set<(online: boolean) => void> = new Set();

  constructor() {
    this.checkHealth();
    if (typeof window !== 'undefined') {
      setInterval(() => {
        this.checkHealth();
      }, 4000);
    }
  }

  public subscribeStatus(cb: (online: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isOnline);
    return () => this.listeners.delete(cb);
  }

  public getIsOnline(): boolean {
    return this.isOnline;
  }

  public async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      const wasOnline = this.isOnline;
      this.isOnline = res.ok;
      if (wasOnline !== this.isOnline) {
        this.listeners.forEach(cb => cb(this.isOnline));
      }
      return this.isOnline;
    } catch {
      const wasOnline = this.isOnline;
      this.isOnline = false;
      if (wasOnline !== this.isOnline) {
        this.listeners.forEach(cb => cb(this.isOnline));
      }
      return false;
    }
  }

  // ---------------------------------------------------------------------------
  // Models
  // ---------------------------------------------------------------------------
  public async getModels(category?: string, search?: string): Promise<MotorcycleModel[]> {
    if (this.isOnline) {
      try {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (search) params.append('search', search);
        const res = await fetch(`${API_BASE_URL}/models?${params.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    // Fallback client-side
    let list = dbStore.getModels().filter(m => m.is_active);
    if (category && category !== 'Tous') {
      list = list.filter(m => m.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      );
    }
    return list;
  }

  // ---------------------------------------------------------------------------
  // Showrooms
  // ---------------------------------------------------------------------------
  public async getShowrooms(): Promise<Showroom[]> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/showrooms`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.getShowrooms();
  }

  // ---------------------------------------------------------------------------
  // Customer Requests & Anti-Abuse
  // ---------------------------------------------------------------------------
  public async checkLimit(userId?: string, phone?: string): Promise<RequestLimitCheck> {
    if (this.isOnline) {
      try {
        const params = new URLSearchParams();
        if (userId) params.append('user_id', userId);
        if (phone) params.append('phone', phone);
        const res = await fetch(`${API_BASE_URL}/requests/check-limit?${params.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.checkCustomerRequestLimit(userId, phone);
  }

  public async trackRequest(query: string): Promise<CustomerRequest[]> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/requests/track/${encodeURIComponent(query)}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    // Client-side fallback
    const all = dbStore.getCustomerRequests();
    const clean = query.trim().toUpperCase();
    return all.filter(r =>
      r.reference.toUpperCase().includes(clean) ||
      (r.phone && r.phone.replace(/\D/g, '').includes(clean.replace(/\D/g, '')))
    );
  }

  public async createCustomerRequest(data: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    motorcycle_model_id: string;
    wilaya_code: string;
    city: string;
    user_id?: string;
  }): Promise<{ request: CustomerRequest; immediateMatch?: boolean; message?: string }> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/requests`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          const json = await res.json();
          // Keep local store in sync
          dbStore.getCustomerRequests();
          return json;
        } else {
          const errData = await res.json();
          throw new Error(errData.error || 'Erreur lors de la soumission');
        }
      } catch (err: any) {
        if (!err.message?.includes('Limite') && !err.message?.includes('obligatoire')) {
          console.warn('Express API request failed, fallback to dbStore:', err);
        } else {
          throw err;
        }
      }
    }

    // Client-side execution
    const req = dbStore.createCustomerRequest(data);
    return {
      request: req,
      immediateMatch: req.status === 'available_notified',
      message: req.status === 'available_notified'
        ? `Excellente nouvelle ! Moto disponible dans votre région.`
        : `Demande enregistrée avec la référence ${req.reference}.`
    };
  }

  // ---------------------------------------------------------------------------
  // Compte Global & Aging (Advanced Decision Engine - Phase 2)
  // ---------------------------------------------------------------------------
  public async getOpportunities(targetShowroomId?: string): Promise<TransferOpportunity[]> {
    if (this.isOnline) {
      try {
        const url = targetShowroomId
          ? `${API_BASE_URL}/compte-global/opportunities?target_showroom_id=${encodeURIComponent(targetShowroomId)}`
          : `${API_BASE_URL}/compte-global/opportunities`;
        const res = await fetch(url);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.getTransferOpportunities(targetShowroomId);
  }

  public async getAgingStock(minDays: number = 90): Promise<Motorcycle[]> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/compte-global/aging?min_days=${minDays}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.getAgingMotorcycles(minDays);
  }

  public async getStockoutRisks(): Promise<StockoutRisk[]> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/compte-global/stockout-risks`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.getStockoutRisks();
  }

  public async getDormantSummary(): Promise<DormantInventorySummary> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/compte-global/dormant-summary`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.getDormantInventorySummary();
  }

  public async getAlgorithmConfig(): Promise<GlobalAccountConfig> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/compte-global/config`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.getAlgorithmConfig();
  }

  public async updateAlgorithmConfig(config: Partial<GlobalAccountConfig>): Promise<GlobalAccountConfig> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/compte-global/config`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config)
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.updateAlgorithmConfig(config);
  }

  // ---------------------------------------------------------------------------
  // KPIs
  // ---------------------------------------------------------------------------
  public async getGlobalKPIs(): Promise<GlobalKPIs> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/kpis/global`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Express API unavailable, fallback to dbStore:', err);
      }
    }
    return dbStore.getGlobalKPIs();
  }

  // ---------------------------------------------------------------------------
  // ODOO ERP INTEGRATION & SYNCHRONIZATION (PHASE 3)
  // ---------------------------------------------------------------------------
  public async getOdooStatus(): Promise<OdooIntegrationState | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/odoo/status`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Odoo API unavailable:', err);
      }
    }
    return null;
  }

  public async testOdooConnection(): Promise<{ connected: boolean; mode?: string; version?: string; message: string; error?: string }> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/odoo/test-connection`, { method: 'POST' });
        if (res.ok) return await res.json();
      } catch (err: any) {
        return { connected: false, message: err.message };
      }
    }
    return { connected: false, message: 'Serveur API backend hors-ligne' };
  }

  public async syncOdoo(options: { dryRun?: boolean; entities?: string[] } = {}): Promise<OdooSyncSummary> {
    if (this.isOnline) {
      const res = await fetch(`${API_BASE_URL}/odoo/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      });
      if (res.ok) return await res.json();
      const err = await res.json();
      throw new Error(err.error || 'Erreur lors de la synchronisation Odoo');
    }
    throw new Error('API backend hors-ligne. Impossible de synchroniser avec Odoo.');
  }

  public async getOdooHistory(params: { limit?: number; offset?: number; entity_type?: string; status?: string } = {}): Promise<{ total: number; items: OdooSyncHistoryItem[] }> {
    if (this.isOnline) {
      try {
        const q = new URLSearchParams();
        if (params.limit) q.set('limit', String(params.limit));
        if (params.offset) q.set('offset', String(params.offset));
        if (params.entity_type) q.set('entity_type', params.entity_type);
        if (params.status) q.set('status', params.status);
        const res = await fetch(`${API_BASE_URL}/odoo/history?${q.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Odoo history fetch error:', err);
      }
    }
    return { total: 0, items: [] };
  }

  public async retryOdooHistory(id: string): Promise<{ success: boolean; item?: OdooSyncHistoryItem; error?: string }> {
    if (this.isOnline) {
      const res = await fetch(`${API_BASE_URL}/odoo/history/${id}/retry`, { method: 'POST' });
      return await res.json();
    }
    return { success: false, error: 'Serveur API backend hors-ligne' };
  }

  public async getOdooConflicts(): Promise<OdooConflictItem[]> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/odoo/conflicts`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Odoo conflicts fetch error:', err);
      }
    }
    return [];
  }

  public async resolveOdooConflict(id: string, resolution: string, notes: string = ''): Promise<OdooConflictItem> {
    if (this.isOnline) {
      const res = await fetch(`${API_BASE_URL}/odoo/conflicts/${id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolution, notes })
      });
      if (res.ok) return await res.json();
    }
    throw new Error('Impossible de résoudre le conflit en mode hors-ligne');
  }

  public async getOdooConfig(): Promise<{ client: OdooConnectionStatus; scheduler: OdooSyncSchedulerConfig } | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/odoo/config`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Odoo config fetch error:', err);
      }
    }
    return null;
  }

  public async updateOdooConfig(config: { client?: Partial<OdooConnectionStatus>; scheduler?: Partial<OdooSyncSchedulerConfig> }): Promise<any> {
    if (this.isOnline) {
      const res = await fetch(`${API_BASE_URL}/odoo/config`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (res.ok) return await res.json();
    }
    throw new Error('Impossible de mettre à jour la configuration en mode hors-ligne');
  }

  // ---------------------------------------------------------------------------
  // BUSINESS INTELLIGENCE & ANALYTICS (PHASE 4)
  // ---------------------------------------------------------------------------
  public async getBiOverview(filters: BiFilterOptions = {}): Promise<BiExecutiveOverview | null> {
    try {
      const q = new URLSearchParams();
      if (filters.startDate) q.set('startDate', filters.startDate);
      if (filters.endDate) q.set('endDate', filters.endDate);
      if (filters.period) q.set('period', filters.period);
      if (filters.region && filters.region !== 'ALL') q.set('region', filters.region);
      const res = await fetch(`${API_BASE_URL}/bi/overview?${q.toString()}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        if (!this.isOnline) {
          this.isOnline = true;
          this.listeners.forEach(cb => cb(true));
        }
        return await res.json();
      }
    } catch (err) {
      // Fallback seamlessly to client-side computation from dbStore
    }
    return ClientBiService.getExecutiveOverview(filters);
  }

  public async getBiSalesTrends(
    paramsOrGranularity: { granularity?: string; range?: string; region?: string } | string = 'monthly',
    range: string = '12m',
    region?: string
  ): Promise<BiSalesTrendsResponse | null> {
    let granularityVal = 'monthly';
    let rangeVal = range;
    let regionVal = region;

    if (typeof paramsOrGranularity === 'object') {
      granularityVal = paramsOrGranularity.granularity || 'monthly';
      rangeVal = paramsOrGranularity.range || '12m';
      regionVal = paramsOrGranularity.region;
    } else {
      granularityVal = paramsOrGranularity;
    }

    try {
      const q = new URLSearchParams();
      q.set('granularity', granularityVal);
      q.set('range', rangeVal);
      if (regionVal && regionVal !== 'ALL') q.set('region', regionVal);
      const res = await fetch(`${API_BASE_URL}/bi/sales-trends?${q.toString()}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        if (!this.isOnline) {
          this.isOnline = true;
          this.listeners.forEach(cb => cb(true));
        }
        return await res.json();
      }
    } catch (err) {
      // Fallback seamlessly to client-side computation from dbStore
    }
    return ClientBiService.getSalesTrends(granularityVal, rangeVal, regionVal);
  }

  public async getBiShowroomRankings(filters: { region?: string } = {}): Promise<BiShowroomRankingsResponse | null> {
    try {
      const q = new URLSearchParams();
      if (filters.region && filters.region !== 'ALL') q.set('region', filters.region);
      const res = await fetch(`${API_BASE_URL}/bi/showroom-performance?${q.toString()}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        if (!this.isOnline) {
          this.isOnline = true;
          this.listeners.forEach(cb => cb(true));
        }
        return await res.json();
      }
    } catch (err) {
      // Fallback seamlessly to client-side computation from dbStore
    }
    return ClientBiService.getShowroomRankings(filters);
  }

  public async getBiDemandIntelligence(filters: { region?: string } = {}): Promise<BiDemandIntelligenceResponse | null> {
    try {
      const q = new URLSearchParams();
      if (filters.region && filters.region !== 'ALL') q.set('region', filters.region);
      const res = await fetch(`${API_BASE_URL}/bi/demand-intelligence?${q.toString()}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        if (!this.isOnline) {
          this.isOnline = true;
          this.listeners.forEach(cb => cb(true));
        }
        return await res.json();
      }
    } catch (err) {
      // Fallback seamlessly to client-side computation from dbStore
    }
    return ClientBiService.getDemandIntelligence(filters);
  }

  public getBiExportUrl(format: 'csv' | 'json' = 'csv', period?: string, region?: string): string {
    const q = new URLSearchParams({ format });
    if (period) q.set('period', period);
    if (region && region !== 'ALL') q.set('region', region);
    return `${API_BASE_URL}/bi/reports/export?${q.toString()}`;
  }

  // ---------------------------------------------------------------------------
  // PREDICTIVE ANALYTICS & DEMAND FORECASTING (PHASE 5)
  // ---------------------------------------------------------------------------
  public async getPredictiveOverview(): Promise<PredictiveExecutiveOverview | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/predictive/overview`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Predictive overview fetch error:', err);
      }
    }
    return null;
  }

  public async getPredictiveSalesForecasts(options: { horizon?: number } = {}): Promise<SalesForecastResponse | null> {
    if (this.isOnline) {
      try {
        const q = new URLSearchParams();
        if (options.horizon) q.set('horizon', options.horizon.toString());
        const res = await fetch(`${API_BASE_URL}/predictive/sales-forecasts?${q.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Predictive sales forecasts fetch error:', err);
      }
    }
    return null;
  }

  public async getPredictiveModels(): Promise<ModelForecastsResponse | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/predictive/models`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Predictive models fetch error:', err);
      }
    }
    return null;
  }

  public async getPredictiveShowrooms(options: { region?: string } = {}): Promise<ShowroomProjectionsResponse | null> {
    if (this.isOnline) {
      try {
        const q = new URLSearchParams();
        if (options.region && options.region !== 'ALL') q.set('region', options.region);
        const res = await fetch(`${API_BASE_URL}/predictive/showrooms?${q.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Predictive showrooms fetch error:', err);
      }
    }
    return null;
  }

  public async getPredictiveSeasonality(): Promise<AlgerianSeasonalityFactor[] | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/predictive/seasonality`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Predictive seasonality fetch error:', err);
      }
    }
    return null;
  }

  public async getPredictiveBacktest(): Promise<BacktestAccuracyScorecard | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/predictive/backtest`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Predictive backtest fetch error:', err);
      }
    }
    return null;
  }

  // ---------------------------------------------------------------------------
  // ENTERPRISE DATA WAREHOUSE & EXECUTIVE REPORTING (PHASE 6)
  // ---------------------------------------------------------------------------
  public async getWarehouseOverview(): Promise<DataWarehouseOverview | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/warehouse/overview`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Warehouse overview fetch error:', err);
      }
    }
    return null;
  }

  public async triggerEtlPipeline(runType: 'FULL_BACKFILL' | 'INCREMENTAL' = 'INCREMENTAL'): Promise<EtlPipelineRun | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/warehouse/etl/run`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ runType })
        });
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('ETL run error:', err);
      }
    }
    return null;
  }

  public async getWarehouseQuality(): Promise<DataQualityScorecard | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/warehouse/quality`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Warehouse quality fetch error:', err);
      }
    }
    return null;
  }

  public async getWarehouseReconciliation(): Promise<ReconciliationReport | null> {
    if (this.isOnline) {
      try {
        const res = await fetch(`${API_BASE_URL}/warehouse/reconciliation`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Warehouse reconciliation fetch error:', err);
      }
    }
    return null;
  }

  public async getExecutiveReport(params: { regionCode?: string; dateRange?: string } = {}): Promise<ExecutiveReport | null> {
    if (this.isOnline) {
      try {
        const q = new URLSearchParams();
        if (params.regionCode && params.regionCode !== 'ALL') q.set('regionCode', params.regionCode);
        if (params.dateRange) q.set('dateRange', params.dateRange);
        const res = await fetch(`${API_BASE_URL}/warehouse/reports/executive?${q.toString()}`);
        if (res.ok) return await res.json();
      } catch (err) {
        console.warn('Executive report fetch error:', err);
      }
    }
    return null;
  }

  public getExportReportUrl(format: 'csv' | 'excel' | 'pdf', params: { regionCode?: string; dateRange?: string } = {}): string {
    const q = new URLSearchParams({ format });
    if (params.regionCode && params.regionCode !== 'ALL') q.set('regionCode', params.regionCode);
    if (params.dateRange) q.set('dateRange', params.dateRange);
    return `${API_BASE_URL}/warehouse/reports/export?${q.toString()}`;
  }
}

export const api = new ApiService();
