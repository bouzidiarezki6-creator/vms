import { dbStore } from './dbStore';
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
  GlobalAccountConfig
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private isOnline: boolean = false;
  private checkPromise: Promise<boolean> | null = null;
  private listeners: Set<(online: boolean) => void> = new Set();

  constructor() {
    this.checkHealth();
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
}

export const api = new ApiService();
