import {
  Profile,
  Showroom,
  MotorcycleModel,
  Motorcycle,
  CustomerRequest,
  Transfer,
  Notification,
  Sale,
  PreorderRedirect,
  AuditLog,
  RequestLimitCheck,
  ShowroomKPIs,
  GlobalKPIs,
  TransferStatus,
  MotorcycleStatus
} from '../types';
import {
  INITIAL_PROFILES,
  INITIAL_SHOWROOMS,
  INITIAL_MODELS,
  INITIAL_MOTORCYCLES,
  INITIAL_REQUESTS,
  INITIAL_TRANSFERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SALES,
  INITIAL_PREORDERS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';
import { WILAYAS } from '../data/wilayas';

const STORAGE_KEYS = {
  PROFILES: 'vms_quick_profiles_v1',
  CURRENT_USER: 'vms_quick_current_user_v1',
  SHOWROOMS: 'vms_quick_showrooms_v1',
  MODELS: 'vms_quick_models_v1',
  MOTORCYCLES: 'vms_quick_motorcycles_v1',
  REQUESTS: 'vms_quick_requests_v1',
  TRANSFERS: 'vms_quick_transfers_v1',
  NOTIFICATIONS: 'vms_quick_notifications_v1',
  SALES: 'vms_quick_sales_v1',
  PREORDERS: 'vms_quick_preorders_v1',
  AUDIT_LOGS: 'vms_quick_audit_logs_v1',
};

// Helper: load from localStorage with initial fallback
function loadData<T>(key: string, initial: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Error loading key ${key}`, e);
    return initial;
  }
}

// Helper: save to localStorage
function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving key ${key}`, e);
  }
}

export function normalizePhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('213')) {
    cleaned = '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    cleaned = '+213' + cleaned.substring(1);
  } else if (!cleaned.startsWith('+')) {
    cleaned = '+213' + cleaned;
  }
  return cleaned;
}

class DatabaseStore {
  // Current authenticated user
  private currentUser: Profile | null = null;
  private listeners: Set<() => void> = new Set();

  // ── In-memory read cache ────────────────────────────────────────────────
  // Each localStorage key maps to its parsed value.
  // The cache is invalidated (key deleted) whenever saveData() is called for
  // that key so reads always see fresh data after a write.
  private cache: Map<string, unknown> = new Map();

  constructor() {
    this.currentUser = this.cachedLoad<Profile | null>(STORAGE_KEYS.CURRENT_USER, INITIAL_PROFILES[0]);
  }

  // Cached wrapper around the module-level loadData helper
  private cachedLoad<T>(key: string, initial: T): T {
    if (this.cache.has(key)) {
      return this.cache.get(key) as T;
    }
    const value = loadData<T>(key, initial);
    this.cache.set(key, value);
    return value;
  }

  // Invalidate-on-write wrapper around the module-level saveData helper
  private cachedSave<T>(key: string, data: T): void {
    saveData(key, data);
    this.cache.set(key, data); // update cache with new value immediately
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  // ====================================================================
  // AUTHENTICATION & PROFILES
  // ====================================================================

  public getCurrentUser(): Profile | null {
    return this.currentUser;
  }

  public setCurrentUser(user: Profile | null): void {
    this.currentUser = user;
    this.cachedSave(STORAGE_KEYS.CURRENT_USER, user);
    this.notify();
  }

  public loginAs(email: string): Profile | null {
    const profiles = this.getProfiles();
    const user = profiles.find(p => p.email.toLowerCase() === email.toLowerCase());
    if (user) {
      this.setCurrentUser(user);
      this.logAudit(user.id, user.email, 'AUTH_LOGIN', 'profiles', user.id, {
        method: 'login',
        role: user.role
      });
      return user;
    }
    return null;
  }

  public registerCustomer(data: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    wilaya_code?: string;
  }): Profile {
    const profiles = this.getProfiles();
    const existing = profiles.find(p => p.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      throw new Error('Un compte existe déjà avec cette adresse email.');
    }

    const newUser: Profile = {
      id: `usr-cust-${Date.now()}`,
      email: data.email,
      role: 'customer',
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      wilaya_code: data.wilaya_code || '16',
      is_active: true,
      created_at: new Date().toISOString()
    };

    profiles.push(newUser);
    this.cachedSave(STORAGE_KEYS.PROFILES, profiles);
    this.setCurrentUser(newUser);

    this.logAudit(newUser.id, newUser.email, 'AUTH_REGISTER', 'profiles', newUser.id, {
      role: 'customer'
    });

    this.notify();
    return newUser;
  }

  public logout(): void {
    const user = this.currentUser;
    if (user) {
      this.logAudit(user.id, user.email, 'AUTH_LOGOUT', 'profiles', user.id);
    }
    this.setCurrentUser(null);
  }

  public getProfiles(): Profile[] {
    return this.cachedLoad<Profile[]>(STORAGE_KEYS.PROFILES, INITIAL_PROFILES);
  }

  public createShowroomUser(data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: 'showroom_owner' | 'showroom_staff';
    showroomId: string;
  }, adminUserId: string): Profile {
    const profiles = this.getProfiles();
    if (profiles.find(p => p.email.toLowerCase() === data.email.toLowerCase())) {
      throw new Error('Un utilisateur avec cet email existe déjà.');
    }

    const newProfile: Profile = {
      id: `usr-shw-${Date.now()}`,
      email: data.email,
      role: data.role,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      is_active: true,
      created_at: new Date().toISOString()
    };

    profiles.push(newProfile);
    this.cachedSave(STORAGE_KEYS.PROFILES, profiles);

    // Link as owner if role is showroom_owner
    if (data.role === 'showroom_owner') {
      const showrooms = this.getShowrooms();
      const shw = showrooms.find(s => s.id === data.showroomId);
      if (shw) {
        shw.owner_id = newProfile.id;
        this.cachedSave(STORAGE_KEYS.SHOWROOMS, showrooms);
      }
    }

    this.logAudit(adminUserId, 'Super Admin', 'USER_CREATE', 'profiles', newProfile.id, {
      created_role: data.role,
      showroom_id: data.showroomId
    });

    this.notify();
    return newProfile;
  }

  public updateProfileStatus(profileId: string, isActive: boolean, adminUserId: string): void {
    const profiles = this.getProfiles();
    const p = profiles.find(x => x.id === profileId);
    if (p) {
      p.is_active = isActive;
      this.cachedSave(STORAGE_KEYS.PROFILES, profiles);
      this.logAudit(adminUserId, 'Super Admin', 'USER_STATUS_CHANGE', 'profiles', profileId, {
        is_active: isActive
      });
      this.notify();
    }
  }

  // ====================================================================
  // SHOWROOMS
  // ====================================================================

  public getShowrooms(): Showroom[] {
    return this.cachedLoad<Showroom[]>(STORAGE_KEYS.SHOWROOMS, INITIAL_SHOWROOMS);
  }

  public getShowroomById(id: string): Showroom | undefined {
    return this.getShowrooms().find(s => s.id === id);
  }

  public createShowroom(data: Omit<Showroom, 'id' | 'created_at'>, adminUserId: string): Showroom {
    const showrooms = this.getShowrooms();
    const newShowroom: Showroom = {
      ...data,
      id: `shw-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    showrooms.push(newShowroom);
    this.cachedSave(STORAGE_KEYS.SHOWROOMS, showrooms);

    this.logAudit(adminUserId, 'Super Admin', 'SHOWROOM_CREATE', 'showrooms', newShowroom.id, {
      name: newShowroom.name,
      wilaya: newShowroom.wilaya_code
    });

    this.notify();
    return newShowroom;
  }

  public updateShowroom(id: string, data: Partial<Showroom>, userId: string): void {
    const showrooms = this.getShowrooms();
    const idx = showrooms.findIndex(s => s.id === id);
    if (idx !== -1) {
      showrooms[idx] = { ...showrooms[idx], ...data };
      this.cachedSave(STORAGE_KEYS.SHOWROOMS, showrooms);
      this.logAudit(userId, 'Admin/Owner', 'SHOWROOM_UPDATE', 'showrooms', id, data);
      this.notify();
    }
  }

  // ====================================================================
  // MOTORCYCLE MODELS CATALOG
  // ====================================================================

  public getModels(): MotorcycleModel[] {
    return this.cachedLoad<MotorcycleModel[]>(STORAGE_KEYS.MODELS, INITIAL_MODELS);
  }

  public getModelById(id: string): MotorcycleModel | undefined {
    return this.getModels().find(m => m.id === id);
  }

  // ====================================================================
  // INVENTORY / MOTORCYCLES (Showroom & Global)
  // ====================================================================

  public getMotorcycles(showroomId?: string): Motorcycle[] {
    const rawList = this.cachedLoad<Motorcycle[]>(STORAGE_KEYS.MOTORCYCLES, INITIAL_MOTORCYCLES);
    const models = this.getModels();
    const showrooms = this.getShowrooms();
    const now = new Date().getTime();

    // Build O(1) lookup Maps instead of O(n) .find() per motorcycle
    const modelMap = new Map(models.map(m => [m.id, m]));
    const showroomMap = new Map(showrooms.map(s => [s.id, s]));

    const populated = rawList.map(moto => {
      const arrival = new Date(moto.arrival_date).getTime();
      const diffDays = Math.max(0, Math.floor((now - arrival) / (1000 * 60 * 60 * 24)));
      return {
        ...moto,
        model: modelMap.get(moto.model_id),
        showroom: showroomMap.get(moto.showroom_id),
        days_in_stock: diffDays,
        is_aging: diffDays >= 90 // Critical 90-day threshold
      };
    });

    if (showroomId) {
      return populated.filter(m => m.showroom_id === showroomId);
    }
    return populated;
  }

  public addMotorcycle(data: {
    model_id: string;
    showroom_id: string;
    vin: string;
    color: string;
    engine_specs?: string;
    arrival_date: string;
    notes?: string;
  }, userId: string): Motorcycle {
    const motorcycles = this.cachedLoad<Motorcycle[]>(STORAGE_KEYS.MOTORCYCLES, INITIAL_MOTORCYCLES);
    
    // Constraint: VIN must be strictly unique across the whole platform!
    const cleanVin = data.vin.trim().toUpperCase();
    if (motorcycles.some(m => m.vin.toUpperCase() === cleanVin)) {
      throw new Error(`Le numéro de châssis / VIN "${cleanVin}" existe déjà dans le système.`);
    }

    const newMoto: Motorcycle = {
      id: `moto-${Date.now()}`,
      model_id: data.model_id,
      showroom_id: data.showroom_id,
      vin: cleanVin,
      color: data.color,
      engine_specs: data.engine_specs,
      acquisition_date: data.arrival_date,
      arrival_date: data.arrival_date,
      status: 'available',
      notes: data.notes,
      created_at: new Date().toISOString()
    };

    motorcycles.push(newMoto);
    this.cachedSave(STORAGE_KEYS.MOTORCYCLES, motorcycles);

    this.logAudit(userId, 'Showroom Staff', 'STOCK_CREATE', 'motorcycles', newMoto.id, {
      vin: newMoto.vin,
      model_id: newMoto.model_id,
      showroom_id: newMoto.showroom_id
    });

    // BUSINESS RULE 3.4: Stock arrival triggers matching pending customer requests!
    this.matchPendingRequestsForStock(newMoto);

    this.notify();
    return newMoto;
  }

  public updateMotorcycle(id: string, updates: Partial<Motorcycle>, userId: string): void {
    const motorcycles = this.cachedLoad<Motorcycle[]>(STORAGE_KEYS.MOTORCYCLES, INITIAL_MOTORCYCLES);
    const idx = motorcycles.findIndex(m => m.id === id);
    if (idx === -1) throw new Error('Moto non trouvée.');

    const oldStatus = motorcycles[idx].status;

    // Check VIN uniqueness if updated
    if (updates.vin && updates.vin !== motorcycles[idx].vin) {
      const cleanVin = updates.vin.trim().toUpperCase();
      if (motorcycles.some(m => m.id !== id && m.vin.toUpperCase() === cleanVin)) {
        throw new Error(`Le numéro de châssis / VIN "${cleanVin}" est déjà attribué.`);
      }
      updates.vin = cleanVin;
    }

    motorcycles[idx] = { ...motorcycles[idx], ...updates };
    this.cachedSave(STORAGE_KEYS.MOTORCYCLES, motorcycles);

    this.logAudit(userId, 'Staff', 'STOCK_UPDATE', 'motorcycles', id, updates);

    // If status became available, run availability matcher!
    if (updates.status === 'available' && oldStatus !== 'available') {
      this.matchPendingRequestsForStock(motorcycles[idx]);
    }

    this.notify();
  }

  public deleteMotorcycle(id: string, userId: string): void {
    const motorcycles = this.cachedLoad<Motorcycle[]>(STORAGE_KEYS.MOTORCYCLES, INITIAL_MOTORCYCLES);
    const moto = motorcycles.find(m => m.id === id);
    if (!moto) throw new Error('Moto non trouvée.');
    if (moto.status === 'in_transfer') {
      throw new Error('Impossible de supprimer une moto en cours de transfert.');
    }

    const filtered = motorcycles.filter(m => m.id !== id);
    this.cachedSave(STORAGE_KEYS.MOTORCYCLES, filtered);

    this.logAudit(userId, 'Staff', 'STOCK_DELETE', 'motorcycles', id, {
      vin: moto.vin,
      model_id: moto.model_id
    });

    this.notify();
  }

  // ====================================================================
  // CUSTOMER REQUESTS & ANTI-ABUSE 2-REQUESTS PER 7 DAYS
  // ====================================================================

  public checkCustomerRequestLimit(userId?: string, phone?: string): RequestLimitCheck {
    const requests = this.cachedLoad<CustomerRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
    const normalizedPhone = phone ? normalizePhone(phone) : null;
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const windowStart = now - sevenDaysMs;

    // Filter requests in last rolling 7 days by user ID or normalized phone
    const recentRequests = requests.filter(r => {
      const matchesIdentity = (userId && r.user_id === userId) || 
                              (normalizedPhone && r.phone_normalized === normalizedPhone);
      if (!matchesIdentity) return false;
      const reqTime = new Date(r.created_at).getTime();
      return reqTime >= windowStart;
    });

    // Sort by creation date ascending to find the oldest request in the window
    recentRequests.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    if (recentRequests.length >= 2) {
      const oldestReqTime = new Date(recentRequests[0].created_at).getTime();
      const canSubmitAt = new Date(oldestReqTime + sevenDaysMs).toISOString();
      return {
        allowed: false,
        current_count: recentRequests.length,
        max_allowed: 2,
        can_submit_at: canSubmitAt,
        message: 'Vous avez atteint la limite de 2 demandes de disponibilité par période de 7 jours glissants. Ce mécanisme anti-abus protège la disponibilité des conseillers VMS.'
      };
    }

    return {
      allowed: true,
      current_count: recentRequests.length,
      max_allowed: 2,
      remaining: 2 - recentRequests.length,
      message: `Vous pouvez encore soumettre ${2 - recentRequests.length} demande(s) cette semaine.`
    };
  }

  public createCustomerRequest(data: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    motorcycle_model_id: string;
    wilaya_code: string;
    city: string;
    user_id?: string;
  }): CustomerRequest {
    const normPhone = normalizePhone(data.phone);

    // CRITICAL BACKEND ENFORCEMENT: Anti-Abuse 2 requests per 7 days
    const limitCheck = this.checkCustomerRequestLimit(data.user_id, normPhone);
    if (!limitCheck.allowed) {
      throw new Error(limitCheck.message || 'Limite de 2 demandes par 7 jours atteinte.');
    }

    const requests = this.cachedLoad<CustomerRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const reference = `REQ-2026-${refNum}`;

    // Check if motorcycle is already available in the customer's region!
    const motorcycles = this.getMotorcycles();
    const showrooms = this.getShowrooms();
    const regionalShowrooms = showrooms.filter(s => s.wilaya_code === data.wilaya_code && s.is_active);
    const regionalShowroomIds = regionalShowrooms.map(s => s.id);

    const availableUnit = motorcycles.find(
      m => m.model_id === data.motorcycle_model_id && 
           regionalShowroomIds.includes(m.showroom_id) && 
           m.status === 'available'
    );

    const newRequest: CustomerRequest = {
      id: `req-${Date.now()}`,
      reference,
      user_id: data.user_id,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      phone_normalized: normPhone,
      email: data.email,
      motorcycle_model_id: data.motorcycle_model_id,
      wilaya_code: data.wilaya_code,
      city: data.city,
      status: availableUnit ? 'available_notified' : 'pending',
      matched_showroom_id: availableUnit ? availableUnit.showroom_id : undefined,
      notified_at: availableUnit ? new Date().toISOString() : undefined,
      notes: availableUnit 
        ? 'Disponibilité immédiate trouvée au showroom local lors de la soumission.' 
        : 'Demande enregistrée en attente d\'arrivage ou de transfert.',
      created_at: new Date().toISOString()
    };

    requests.unshift(newRequest);
    this.cachedSave(STORAGE_KEYS.REQUESTS, requests);

    // Create confirmation notification for customer
    const model = this.getModelById(data.motorcycle_model_id);
    const modelName = model ? model.name : 'Moto VMS';

    if (availableUnit) {
      const shw = showrooms.find(s => s.id === availableUnit.showroom_id);
      this.createNotification({
        recipient_profile_id: data.user_id,
        recipient_phone: data.phone,
        recipient_email: data.email,
        type: 'stock_available',
        title: 'Excellente nouvelle ! Moto déjà disponible',
        message: `Bonne nouvelle ! Le modèle ${modelName} est actuellement disponible dans votre région au showroom ${shw?.name || 'VMS'}. Référence demande: ${reference}.`,
        channel: 'in_app'
      });
    } else {
      this.createNotification({
        recipient_profile_id: data.user_id,
        recipient_phone: data.phone,
        recipient_email: data.email,
        type: 'request_submitted',
        title: 'Demande enregistrée avec succès',
        message: `Votre demande de disponibilité pour ${modelName} a été enregistrée avec la référence ${reference}. Vous serez notifié dès qu'un exemplaire sera attribué à votre région.`,
        channel: 'in_app'
      });
    }

    this.logAudit(data.user_id || 'anonymous', data.email, 'CUSTOMER_REQUEST_CREATE', 'customer_requests', newRequest.id, {
      reference,
      model_id: data.motorcycle_model_id,
      wilaya: data.wilaya_code,
      immediate_match: Boolean(availableUnit)
    });

    this.notify();
    return newRequest;
  }

  public getCustomerRequests(userId?: string): CustomerRequest[] {
    const rawRequests = this.cachedLoad<CustomerRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
    const models = this.getModels();
    const showrooms = this.getShowrooms();

    const populated = rawRequests.map(r => ({
      ...r,
      model: models.find(m => m.id === r.motorcycle_model_id),
      region: WILAYAS.find(w => w.code === r.wilaya_code),
      matched_showroom: r.matched_showroom_id ? showrooms.find(s => s.id === r.matched_showroom_id) : undefined
    }));

    if (userId) {
      return populated.filter(r => r.user_id === userId);
    }
    return populated;
  }

  // Automatic matching when motorcycle becomes available
  private matchPendingRequestsForStock(moto: Motorcycle): void {
    if (moto.status !== 'available') return;

    const showroom = this.getShowroomById(moto.showroom_id);
    if (!showroom) return;

    const requests = this.cachedLoad<CustomerRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
    const model = this.getModelById(moto.model_id);
    const modelName = model?.name || 'VMS';

    // Find first pending request matching this model in this showroom's wilaya
    const pendingReqIndex = requests.findIndex(
      r => r.motorcycle_model_id === moto.model_id && 
           r.wilaya_code === showroom.wilaya_code && 
           r.status === 'pending'
    );

    if (pendingReqIndex !== -1) {
      const req = requests[pendingReqIndex];
      req.status = 'available_notified';
      req.matched_showroom_id = showroom.id;
      req.notified_at = new Date().toISOString();
      requests[pendingReqIndex] = req;
      this.cachedSave(STORAGE_KEYS.REQUESTS, requests);

      // Trigger multi-channel notifications (In-app + simulated SMS & Email)
      this.createNotification({
        recipient_profile_id: req.user_id,
        recipient_phone: req.phone,
        recipient_email: req.email,
        type: 'stock_available',
        title: 'Bonne nouvelle ! Moto disponible dans votre région',
        message: `Bonne nouvelle ! La moto ${modelName} que vous recherchez est maintenant disponible au showroom ${showroom.name} (Tél: ${showroom.phone}). Veuillez contacter le showroom avec votre référence ${req.reference}.`,
        channel: 'in_app'
      });

      this.logAudit('system', 'QUICK Automated Engine', 'STOCK_AUTO_MATCHED', 'customer_requests', req.id, {
        motorcycle_id: moto.id,
        vin: moto.vin,
        showroom_id: showroom.id,
        request_reference: req.reference
      });
    }
  }

  // ====================================================================
  // COMPTE GLOBAL — INTELLIGENT MATCHING & TRANSFERS
  // ====================================================================

  public getAgingMotorcycles(thresholdDays = 90): Motorcycle[] {
    const all = this.getMotorcycles();
    return all.filter(m => (m.days_in_stock || 0) >= thresholdDays && m.status === 'available');
  }

  public getTransferOpportunities(targetShowroomId?: string): Array<{
    model: MotorcycleModel;
    sourceShowroom: Showroom;
    motorcycle: Motorcycle;
    destinationShowroom?: Showroom;
    daysInStock: number;
    priority: 'Haute' | 'Moyenne' | 'Standard';
    reason: string;
    pendingDemandCount: number;
  }> {
    const allMotos = this.getMotorcycles();
    const requests = this.getCustomerRequests().filter(r => r.status === 'pending');
    const showrooms = this.getShowrooms();
    const opportunities: any[] = [];

    // Find aging motorcycles (>90 days) that could be transferred to satisfy demand
    const agingUnits = allMotos.filter(m => m.is_aging && m.status === 'available' && m.showroom && m.model);

    agingUnits.forEach(moto => {
      // Find demand in other showrooms
      const pendingForModel = requests.filter(r => r.motorcycle_model_id === moto.model_id);
      
      showrooms.forEach(shw => {
        if (shw.id === moto.showroom_id) return;
        if (targetShowroomId && shw.id !== targetShowroomId) return;

        // Count pending customer requests in this destination showroom's wilaya
        const demandInWilaya = pendingForModel.filter(r => r.wilaya_code === shw.wilaya_code).length;
        
        // Count existing stock in destination showroom
        const localStockCount = allMotos.filter(m => m.showroom_id === shw.id && m.model_id === moto.model_id && m.status === 'available').length;

        if (demandInWilaya > 0 || localStockCount === 0) {
          const priority = moto.days_in_stock && moto.days_in_stock >= 110 ? 'Haute' : (demandInWilaya > 0 ? 'Haute' : 'Moyenne');
          opportunities.push({
            model: moto.model!,
            sourceShowroom: moto.showroom!,
            destinationShowroom: shw,
            motorcycle: moto,
            daysInStock: moto.days_in_stock || 0,
            priority,
            pendingDemandCount: demandInWilaya,
            reason: demandInWilaya > 0
              ? `${demandInWilaya} client(s) en attente à ${shw.city} pour ce modèle; stock dormant de ${moto.days_in_stock}j à ${moto.showroom?.city}.`
              : `Rupture de stock à ${shw.city} et sur-stockage (${moto.days_in_stock} jours) à ${moto.showroom?.city}.`
          });
        }
      });
    });

    // Sort by priority and stock age descending
    return opportunities.sort((a, b) => b.daysInStock - a.daysInStock);
  }

  public getTransfers(): Transfer[] {
    const rawList = this.cachedLoad<Transfer[]>(STORAGE_KEYS.TRANSFERS, INITIAL_TRANSFERS);
    const motorcycles = this.getMotorcycles();
    const showrooms = this.getShowrooms();

    return rawList.map(trf => ({
      ...trf,
      motorcycle: motorcycles.find(m => m.id === trf.motorcycle_id),
      source_showroom: showrooms.find(s => s.id === trf.source_showroom_id),
      destination_showroom: showrooms.find(s => s.id === trf.destination_showroom_id)
    }));
  }

  public createTransferRequest(data: {
    motorcycle_id: string;
    source_showroom_id: string;
    destination_showroom_id: string;
    reason: string;
  }, userId: string): Transfer {
    if (data.source_showroom_id === data.destination_showroom_id) {
      throw new Error('Le showroom source et le showroom de destination doivent être différents.');
    }

    const motorcycles = this.cachedLoad<Motorcycle[]>(STORAGE_KEYS.MOTORCYCLES, INITIAL_MOTORCYCLES);
    const moto = motorcycles.find(m => m.id === data.motorcycle_id);
    if (!moto) throw new Error('Moto introuvable.');
    if (moto.status !== 'available') {
      throw new Error(`La moto n'est pas disponible pour un transfert (statut actuel: ${moto.status}).`);
    }

    // Check if motorcycle is already in an active transfer
    const transfers = this.cachedLoad<Transfer[]>(STORAGE_KEYS.TRANSFERS, INITIAL_TRANSFERS);
    const activeTransfer = transfers.find(
      t => t.motorcycle_id === data.motorcycle_id && 
           ['pending', 'approved', 'in_preparation', 'in_transit'].includes(t.status)
    );
    if (activeTransfer) {
      throw new Error(`Cette moto fait déjà l'objet du transfert actif ${activeTransfer.reference}.`);
    }

    const arrival = new Date(moto.arrival_date).getTime();
    const daysInStock = Math.floor((Date.now() - arrival) / 86400000);
    const ref = `TRF-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTransfer: Transfer = {
      id: `trf-${Date.now()}`,
      reference: ref,
      motorcycle_id: data.motorcycle_id,
      source_showroom_id: data.source_showroom_id,
      destination_showroom_id: data.destination_showroom_id,
      requested_by: userId,
      status: 'pending',
      reason: data.reason,
      stock_age_at_request: daysInStock,
      created_at: new Date().toISOString(),
      history: [
        {
          id: `th-${Date.now()}`,
          transfer_id: `trf-${Date.now()}`,
          to_status: 'pending',
          changed_by: userId,
          comment: `Demande de transfert initiée: ${data.reason}`,
          created_at: new Date().toISOString()
        }
      ]
    };

    transfers.unshift(newTransfer);
    this.cachedSave(STORAGE_KEYS.TRANSFERS, transfers);

    // Notify source showroom
    const sourceShowroom = this.getShowroomById(data.source_showroom_id);
    if (sourceShowroom?.owner_id) {
      this.createNotification({
        recipient_profile_id: sourceShowroom.owner_id,
        type: 'transfer_update',
        title: 'Nouvelle demande de transfert Compte Global',
        message: `Une demande de transfert (${ref}) a été soumise pour le châssis ${moto.vin}. Veuillez l'examiner.`,
        channel: 'in_app'
      });
    }

    this.logAudit(userId, 'Compte Global User', 'TRANSFER_REQUEST', 'transfers', newTransfer.id, {
      reference: ref,
      motorcycle_id: data.motorcycle_id,
      source_showroom_id: data.source_showroom_id,
      destination_showroom_id: data.destination_showroom_id
    });

    this.notify();
    return newTransfer;
  }

  public updateTransferStatus(
    transferId: string, 
    newStatus: TransferStatus, 
    userId: string, 
    comment?: string
  ): void {
    const transfers = this.cachedLoad<Transfer[]>(STORAGE_KEYS.TRANSFERS, INITIAL_TRANSFERS);
    const trf = transfers.find(t => t.id === transferId);
    if (!trf) throw new Error('Transfert introuvable.');

    const oldStatus = trf.status;
    const motorcycles = this.cachedLoad<Motorcycle[]>(STORAGE_KEYS.MOTORCYCLES, INITIAL_MOTORCYCLES);
    const motoIdx = motorcycles.findIndex(m => m.id === trf.motorcycle_id);

    // Business rules for transitions
    if (newStatus === 'approved') {
      trf.approved_by = userId;
      trf.approved_at = new Date().toISOString();
      if (motoIdx !== -1) {
        motorcycles[motoIdx].status = 'in_transfer';
      }
    } else if (newStatus === 'in_transit') {
      trf.shipped_at = new Date().toISOString();
      if (motoIdx !== -1) {
        motorcycles[motoIdx].status = 'in_transfer';
      }
    } else if (newStatus === 'received') {
      // ATOMIC RECEPTION: updates motorcycle showroom, resets arrival date to today, sets available
      trf.received_by = userId;
      trf.received_at = new Date().toISOString();
      if (motoIdx !== -1) {
        motorcycles[motoIdx].showroom_id = trf.destination_showroom_id;
        motorcycles[motoIdx].status = 'available';
        motorcycles[motoIdx].arrival_date = new Date().toISOString().split('T')[0];
        motorcycles[motoIdx].notes = `Transféré depuis showroom initial via ${trf.reference}. Réceptionné le ${new Date().toLocaleDateString('fr-FR')}.`;
      }
    } else if (newStatus === 'rejected' || newStatus === 'cancelled') {
      // If cancelled/rejected, release motorcycle back to available
      if (motoIdx !== -1 && motorcycles[motoIdx].status === 'in_transfer') {
        motorcycles[motoIdx].status = 'available';
      }
    }

    trf.status = newStatus;
    if (!trf.history) trf.history = [];
    trf.history.push({
      id: `th-${Date.now()}`,
      transfer_id: trf.id,
      from_status: oldStatus,
      to_status: newStatus,
      changed_by: userId,
      comment: comment || `Statut mis à jour vers ${newStatus}`,
      created_at: new Date().toISOString()
    });

    this.cachedSave(STORAGE_KEYS.TRANSFERS, transfers);
    this.cachedSave(STORAGE_KEYS.MOTORCYCLES, motorcycles);

    this.logAudit(userId, 'Operator', `TRANSFER_${newStatus.toUpperCase()}`, 'transfers', trf.id, {
      reference: trf.reference,
      from_status: oldStatus,
      to_status: newStatus,
      comment
    });

    // If motorcycle was received, trigger notification matching for requests in the new showroom!
    if (newStatus === 'received' && motoIdx !== -1) {
      this.matchPendingRequestsForStock(motorcycles[motoIdx]);
    }

    this.notify();
  }

  // ====================================================================
  // NOTIFICATIONS
  // ====================================================================

  public getNotifications(profileId?: string): Notification[] {
    const list = this.cachedLoad<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    if (profileId) {
      return list.filter(n => n.recipient_profile_id === profileId || !n.recipient_profile_id);
    }
    return list;
  }

  public createNotification(data: Omit<Notification, 'id' | 'created_at' | 'is_read'>): Notification {
    const list = this.cachedLoad<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const newNotif: Notification = {
      ...data,
      id: `notif-${Date.now()}`,
      is_read: false,
      created_at: new Date().toISOString()
    };
    list.unshift(newNotif);
    this.cachedSave(STORAGE_KEYS.NOTIFICATIONS, list);
    this.notify();
    return newNotif;
  }

  public markNotificationRead(id: string): void {
    const list = this.cachedLoad<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    const n = list.find(x => x.id === id);
    if (n) {
      n.is_read = true;
      this.cachedSave(STORAGE_KEYS.NOTIFICATIONS, list);
      this.notify();
    }
  }

  public markAllNotificationsRead(profileId: string): void {
    const list = this.cachedLoad<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
    list.forEach(n => {
      if (n.recipient_profile_id === profileId) {
        n.is_read = true;
      }
    });
    this.cachedSave(STORAGE_KEYS.NOTIFICATIONS, list);
    this.notify();
  }

  // ====================================================================
  // PREORDER REDIRECTION (motobladi.dz tracking)
  // ====================================================================

  public trackPreorderRedirect(data: {
    customer_id?: string;
    user_id?: string;
    motorcycle_model_id?: string;
    wilaya_code?: string;
    city?: string;
  }): void {
    const list = this.cachedLoad<PreorderRedirect[]>(STORAGE_KEYS.PREORDERS, INITIAL_PREORDERS);
    const record: PreorderRedirect = {
      id: `po-${Date.now()}`,
      customer_id: data.customer_id,
      user_id: data.user_id,
      motorcycle_model_id: data.motorcycle_model_id,
      wilaya_code: data.wilaya_code,
      city: data.city,
      target_url: 'https://motobladi.dz/',
      referrer: window.location.href,
      created_at: new Date().toISOString()
    };
    list.unshift(record);
    this.cachedSave(STORAGE_KEYS.PREORDERS, list);

    this.logAudit(data.user_id || 'guest', 'Customer', 'PREORDER_REDIRECT', 'preorder_redirects', record.id, {
      model_id: data.motorcycle_model_id,
      target_url: 'https://motobladi.dz/'
    });

    this.notify();
  }

  public getPreorders(): PreorderRedirect[] {
    const list = this.cachedLoad<PreorderRedirect[]>(STORAGE_KEYS.PREORDERS, INITIAL_PREORDERS);
    const models = this.getModels();
    return list.map(p => ({
      ...p,
      model: models.find(m => m.id === p.motorcycle_model_id)
    }));
  }

  // ====================================================================
  // SALES
  // ====================================================================

  public recordSale(data: {
    motorcycle_id: string;
    showroom_id: string;
    customer_name: string;
    customer_phone: string;
    sale_price: number;
    payment_method: 'CASH' | 'CHEQUE' | 'VIREMENT' | 'FACILITE';
    notes?: string;
  }, userId: string): Sale {
    const motorcycles = this.cachedLoad<Motorcycle[]>(STORAGE_KEYS.MOTORCYCLES, INITIAL_MOTORCYCLES);
    const motoIdx = motorcycles.findIndex(m => m.id === data.motorcycle_id);
    if (motoIdx === -1) throw new Error('Moto introuvable.');

    const moto = motorcycles[motoIdx];
    if (moto.status !== 'available' && moto.status !== 'reserved') {
      throw new Error(`La moto n'est pas disponible pour la vente (statut: ${moto.status}).`);
    }

    const todayStr = new Date().toISOString().split('T')[0];
    motorcycles[motoIdx].status = 'sold';
    motorcycles[motoIdx].sale_date = todayStr;
    this.cachedSave(STORAGE_KEYS.MOTORCYCLES, motorcycles);

    const sales = this.cachedLoad<Sale[]>(STORAGE_KEYS.SALES, INITIAL_SALES);
    const ref = `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSale: Sale = {
      id: `sal-${Date.now()}`,
      reference: ref,
      motorcycle_id: data.motorcycle_id,
      showroom_id: data.showroom_id,
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      sale_price: data.sale_price,
      payment_method: data.payment_method,
      sale_date: todayStr,
      sold_by: userId,
      notes: data.notes,
      created_at: new Date().toISOString()
    };

    sales.unshift(newSale);
    this.cachedSave(STORAGE_KEYS.SALES, sales);

    this.logAudit(userId, 'Showroom Seller', 'SALE_CREATE', 'sales', newSale.id, {
      reference: ref,
      motorcycle_vin: moto.vin,
      sale_price: data.sale_price,
      payment_method: data.payment_method
    });

    this.notify();
    return newSale;
  }

  public getSales(showroomId?: string): Sale[] {
    const list = this.cachedLoad<Sale[]>(STORAGE_KEYS.SALES, INITIAL_SALES);
    const motos = this.getMotorcycles();
    const showrooms = this.getShowrooms();

    const populated = list.map(s => ({
      ...s,
      motorcycle: motos.find(m => m.id === s.motorcycle_id),
      showroom: showrooms.find(sh => sh.id === s.showroom_id)
    }));

    if (showroomId) {
      return populated.filter(s => s.showroom_id === showroomId);
    }
    return populated;
  }

  // ====================================================================
  // AUDIT LOGS
  // ====================================================================

  public getAuditLogs(): AuditLog[] {
    return this.cachedLoad<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  public logAudit(
    userId: string,
    userEmail: string,
    actionType: string,
    entityType: string,
    entityId?: string,
    details?: Record<string, any>
  ): void {
    const logs = this.cachedLoad<AuditLog[]>(STORAGE_KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
    const entry: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user_id: userId,
      user_email: userEmail,
      action_type: actionType,
      entity_type: entityType,
      entity_id: entityId,
      details,
      created_at: new Date().toISOString()
    };
    logs.unshift(entry);
    // Keep max 500 logs in storage
    if (logs.length > 500) logs.pop();
    this.cachedSave(STORAGE_KEYS.AUDIT_LOGS, logs);
  }

  // ====================================================================
  // REAL-DATA KPIS & ANALYTICS
  // ====================================================================

  public getShowroomKPIs(showroomId: string): ShowroomKPIs {
    const motos = this.getMotorcycles(showroomId);
    const transfers = this.getTransfers();
    const requests = this.getCustomerRequests();
    const shw = this.getShowroomById(showroomId);

    const totalStock = motos.length;
    const availableStock = motos.filter(m => m.status === 'available').length;
    const reservedStock = motos.filter(m => m.status === 'reserved').length;
    const soldStock = motos.filter(m => m.status === 'sold').length;
    const agingStockCount = motos.filter(m => m.is_aging && m.status === 'available').length;

    const incomingTransfers = transfers.filter(
      t => t.destination_showroom_id === showroomId && ['pending', 'approved', 'in_transit'].includes(t.status)
    ).length;

    const outgoingTransfers = transfers.filter(
      t => t.source_showroom_id === showroomId && ['pending', 'approved', 'in_transit'].includes(t.status)
    ).length;

    const customerRequests = shw
      ? requests.filter(r => r.wilaya_code === shw.wilaya_code).length
      : 0;

    const availabilityRate = totalStock > 0 ? Math.round((availableStock / totalStock) * 100) : 0;

    return {
      totalStock,
      availableStock,
      reservedStock,
      soldStock,
      agingStockCount,
      incomingTransfers,
      outgoingTransfers,
      customerRequests,
      availabilityRate
    };
  }

  public getGlobalKPIs(): GlobalKPIs {
    const motos = this.getMotorcycles();
    const showrooms = this.getShowrooms();
    const requests = this.getCustomerRequests();
    const transfers = this.getTransfers();
    const sales = this.getSales();
    const preorders = this.getPreorders();

    const totalMotorcycles = motos.length;
    const availableMotorcycles = motos.filter(m => m.status === 'available').length;
    const agingUnits = motos.filter(m => m.is_aging && m.status === 'available').length;
    const agingPercentage = availableMotorcycles > 0 
      ? Math.round((agingUnits / availableMotorcycles) * 100) 
      : 0;

    const totalSalesValue = sales.reduce((sum, s) => sum + Number(s.sale_price || 0), 0);

    return {
      totalMotorcycles,
      availableMotorcycles,
      totalShowrooms: showrooms.length,
      totalCustomers: this.getProfiles().filter(p => p.role === 'customer').length,
      totalRequests: requests.length,
      fulfilledRequests: requests.filter(r => r.status === 'fulfilled').length,
      pendingRequests: requests.filter(r => r.status === 'pending').length,
      agingStockCount: agingUnits,
      agingPercentage,
      activeTransfers: transfers.filter(t => ['pending', 'approved', 'in_transit'].includes(t.status)).length,
      completedTransfers: transfers.filter(t => t.status === 'received').length,
      preorderRedirects: preorders.length,
      totalSalesVolume: sales.length,
      totalSalesValue
    };
  }

  // Reset store to fresh initial values
  public resetToFactory(): void {
    // Clear in-memory cache first so reads go back to defaults
    this.cache.clear();
    localStorage.removeItem(STORAGE_KEYS.PROFILES);
    localStorage.removeItem(STORAGE_KEYS.SHOWROOMS);
    localStorage.removeItem(STORAGE_KEYS.MODELS);
    localStorage.removeItem(STORAGE_KEYS.MOTORCYCLES);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.TRANSFERS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.SALES);
    localStorage.removeItem(STORAGE_KEYS.PREORDERS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    this.currentUser = INITIAL_PROFILES[0];
    this.cachedSave(STORAGE_KEYS.CURRENT_USER, this.currentUser);
    this.notify();
  }
}

export const dbStore = new DatabaseStore();
