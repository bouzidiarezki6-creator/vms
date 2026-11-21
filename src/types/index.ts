export type UserRole = 
  | 'super_admin' 
  | 'regional_admin' 
  | 'showroom_owner' 
  | 'showroom_staff' 
  | 'customer';

export type MotorcycleStatus = 
  | 'available' 
  | 'reserved' 
  | 'in_transfer' 
  | 'sold';

export type TransferStatus = 
  | 'pending' 
  | 'approved' 
  | 'rejected' 
  | 'in_preparation' 
  | 'in_transit' 
  | 'received' 
  | 'cancelled';

export type RequestStatus = 
  | 'pending' 
  | 'available_notified' 
  | 'fulfilled' 
  | 'cancelled' 
  | 'preorder_redirected';

export interface Region {
  code: string;
  name: string;
  name_ar?: string;
}

export interface City {
  id: string;
  region_code: string;
  name: string;
}

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  phone?: string;
  wilaya_code?: string;
  avatar_url?: string;
  is_active: boolean;
  created_at: string;
}

export interface Showroom {
  id: string;
  name: string;
  code: string;
  wilaya_code: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  owner_id?: string;
  is_active: boolean;
  opening_hours?: string;
  created_at: string;
}

export interface ShowroomUser {
  id: string;
  showroom_id: string;
  user_id: string;
  role: 'owner' | 'staff';
  created_at: string;
}

export interface MotorcycleModel {
  id: string;
  name: string;
  brand: string; // 'VMS', 'Keeway', 'Benelli', etc.
  category: string; // 'Scooter', 'Maxi Scooter', 'Roadster', 'Trail', 'Cub'
  engine_cc: number;
  power_hp: number;
  cooling: string; // 'Air', 'Liquide'
  fuel_system: string; // 'EFI', 'Carburateur'
  price_dzd: number;
  image_url: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export interface Motorcycle {
  id: string;
  model_id: string;
  showroom_id: string;
  vin: string; // Unique chassis number
  color: string;
  engine_specs?: string;
  acquisition_date: string;
  arrival_date: string; // showroom arrival date
  status: MotorcycleStatus;
  notes?: string;
  sale_date?: string;
  created_at: string;
  // Populated fields
  model?: MotorcycleModel;
  showroom?: Showroom;
  days_in_stock?: number;
  is_aging?: boolean; // > 90 days
}

export interface CustomerRequest {
  id: string;
  reference: string;
  customer_id?: string;
  user_id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  phone_normalized: string;
  email: string;
  motorcycle_model_id: string;
  wilaya_code: string;
  city: string;
  status: RequestStatus;
  matched_showroom_id?: string;
  notified_at?: string;
  fulfilled_at?: string;
  notes?: string;
  created_at: string;
  // Populated fields
  model?: MotorcycleModel;
  region?: Region;
  matched_showroom?: Showroom;
}

export interface TransferHistoryItem {
  id: string;
  transfer_id: string;
  from_status?: TransferStatus;
  to_status: TransferStatus;
  changed_by?: string;
  comment?: string;
  created_at: string;
}

export interface Transfer {
  id: string;
  reference: string;
  motorcycle_id: string;
  source_showroom_id: string;
  destination_showroom_id: string;
  requested_by?: string;
  status: TransferStatus;
  reason?: string;
  stock_age_at_request?: number;
  approved_by?: string;
  approved_at?: string;
  shipped_at?: string;
  received_by?: string;
  received_at?: string;
  notes?: string;
  created_at: string;
  // Populated fields
  motorcycle?: Motorcycle;
  source_showroom?: Showroom;
  destination_showroom?: Showroom;
  history?: TransferHistoryItem[];
}

export interface Notification {
  id: string;
  recipient_profile_id?: string;
  recipient_phone?: string;
  recipient_email?: string;
  type: 'stock_available' | 'transfer_update' | 'request_submitted' | 'system';
  title: string;
  message: string;
  data?: Record<string, any>;
  is_read: boolean;
  channel: 'in_app' | 'sms' | 'email';
  created_at: string;
}

export interface Sale {
  id: string;
  reference: string;
  motorcycle_id: string;
  showroom_id: string;
  customer_id?: string;
  customer_name: string;
  customer_phone: string;
  sale_price: number;
  payment_method: 'CASH' | 'CHEQUE' | 'VIREMENT' | 'FACILITE';
  sale_date: string;
  sold_by?: string;
  notes?: string;
  created_at: string;
  // Populated fields
  motorcycle?: Motorcycle;
  showroom?: Showroom;
}

export interface PreorderRedirect {
  id: string;
  customer_id?: string;
  user_id?: string;
  motorcycle_model_id?: string;
  wilaya_code?: string;
  city?: string;
  target_url: string;
  referrer?: string;
  created_at: string;
  // Populated fields
  model?: MotorcycleModel;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  user_email?: string;
  action_type: string;
  entity_type: string;
  entity_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  created_at: string;
}

export interface RequestLimitCheck {
  allowed: boolean;
  current_count: number;
  max_allowed: number;
  can_submit_at?: string;
  remaining?: number;
  message?: string;
}

export interface ShowroomKPIs {
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  soldStock: number;
  agingStockCount: number; // >90 days
  incomingTransfers: number;
  outgoingTransfers: number;
  customerRequests: number;
  availabilityRate: number; // percentage
}

export interface GlobalKPIs {
  totalMotorcycles: number;
  availableMotorcycles: number;
  totalShowrooms: number;
  totalCustomers: number;
  totalRequests: number;
  fulfilledRequests: number;
  pendingRequests: number;
  agingStockCount: number;
  agingPercentage: number;
  activeTransfers: number;
  completedTransfers: number;
  preorderRedirects: number;
  totalSalesVolume: number;
  totalSalesValue: number;
}

// -----------------------------------------------------------------------------
// ADVANCED GLOBAL ACCOUNT ENGINE (PHASE 2)
// -----------------------------------------------------------------------------
export interface TransferSubScores {
  stockAgeScore: number;     // 0-100: Urgency of dormant unit
  demandScore: number;       // 0-100: Local customer demand pressure
  stockoutScore: number;     // 0-100: Absence of local equivalent inventory
  velocityScore: number;     // 0-100: Historical absorption & sales speed
  logisticsScore: number;    // 0-100: Geographic proximity & cost efficiency
}

export interface TransferOpportunity {
  id?: string;
  model: MotorcycleModel;
  sourceShowroom: Showroom;
  destinationShowroom: Showroom;
  motorcycle: Motorcycle;
  daysInStock: number;
  score: number;             // Overall 0-100 multi-criteria score
  priority: 'Haute' | 'Moyenne' | 'Standard';
  subScores: TransferSubScores;
  distanceKm: number;
  logisticsCostDzd: number;
  estimatedDaysToSell: number;
  commercialBenefitDzd: number;
  pendingDemandCount: number;
  destinationStockCount: number;
  reason: string;
  explanation: string;
}

export interface GlobalAccountConfig {
  weightAge: number;         // default: 0.25
  weightDemand: number;      // default: 0.25
  weightStockout: number;    // default: 0.20
  weightVelocity: number;    // default: 0.15
  weightLogistics: number;   // default: 0.15
  thresholdDays: number;     // default: 90
  logisticsBaseFeeDzd: number; // default: 4000
  logisticsRatePerKmDzd: number; // default: 35
}

export interface StockoutRisk {
  showroomId: string;
  showroomName: string;
  city: string;
  wilayaCode: string;
  modelId: string;
  modelName: string;
  category: string;
  pendingDemand: number;
  currentStock: number;
  severity: 'critical' | 'warning';
}

export interface DormantInventorySummary {
  totalDormantUnits: number;
  highRiskUnits: number;     // > 130 days
  moderateRiskUnits: number; // 90 - 130 days
  totalCapitalTiedUpDzd: number;
  topDormantShowrooms: Array<{ showroom: Showroom; count: number; totalValueDzd: number }>;
}

// -----------------------------------------------------------------------------
// ODOO ERP INTEGRATION & SYNCHRONIZATION (PHASE 3)
// -----------------------------------------------------------------------------
export interface OdooConnectionStatus {
  configured: boolean;
  mode: 'SANDBOX_SIMULATION' | 'LIVE_PRODUCTION';
  url: string;
  db: string;
  username: string;
  authenticated: boolean;
  timeoutMs: number;
}

export interface OdooSyncStats {
  totalOperations: number;
  successCount: number;
  failedCount: number;
  dryRunCount: number;
  pendingCount: number;
  unresolvedConflictsCount: number;
  totalMappings: number;
  lastSyncAt: string | null;
}

export interface OdooSyncSchedulerConfig {
  enabled: boolean;
  intervalMinutes: number;
  entities: string[];
  dryRunDefault: boolean;
  lastRunAt: string | null;
  nextRunAt: string | null;
  isCurrentlyRunning: boolean;
}

export interface OdooSyncHistoryItem {
  id: string;
  entity_type: string;
  quick_record_id: string;
  odoo_record_id: number | null;
  operation: 'EXPORT_CREATE' | 'EXPORT_UPDATE' | 'IMPORT_CREATE' | 'IMPORT_UPDATE' | 'DRY_RUN';
  sync_status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'DRY_RUN' | 'CONFLICT';
  details?: Record<string, any>;
  error_details?: string | null;
  retry_count: number;
  checksum?: string | null;
  created_at: string;
  updated_at: string;
}

export interface OdooConflictItem {
  id: string;
  entity_type: string;
  quick_id: string;
  odoo_id?: number | null;
  field_name: string;
  quick_value: string;
  odoo_value: string;
  status: 'UNRESOLVED' | 'RESOLVED_QUICK' | 'RESOLVED_ODOO' | 'IGNORED';
  resolution_notes?: string;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
}

export interface OdooSyncSummary {
  dryRun: boolean;
  triggeredBy: string;
  startedAt: string;
  completedAt: string;
  entities: Record<string, {
    processed: number;
    success: number;
    failed: number;
    skipped: number;
    conflicts: number;
    items?: any[];
  }>;
  totalProcessed: number;
  totalSuccess: number;
  totalFailed: number;
  totalSkipped: number;
  conflictsCount: number;
}

export interface OdooIntegrationState {
  connection: OdooConnectionStatus;
  stats: OdooSyncStats;
  scheduler: OdooSyncSchedulerConfig;
  dataOwnership: Record<string, {
    sourceOfTruth: string;
    conflictStrategy: string;
  }>;
}

// -----------------------------------------------------------------------------
// BUSINESS INTELLIGENCE & ANALYTICS (PHASE 4)
// -----------------------------------------------------------------------------
export interface BiExecutiveOverview {
  financials: {
    totalSalesRevenue: number;
    totalSalesVolume: number;
    averageTicketDzd: number;
    dormantCapitalTiedUpDzd: number;
    estimatedUnblockedMarginDzd: number;
  };
  inventory: {
    totalStock: number;
    availableStock: number;
    inventoryTurnoverRatio: number;
    daysSalesOfInventoryDsi: number;
    networkAvailabilityRatePercent: number;
    dormantSharePercent: number;
    agingPyramid: {
      freshUnder30d: number;
      normal30to60d: number;
      warning60to90d: number;
      dormantOver90d: number;
      criticalOver130d: number;
    };
  };
  demand: {
    totalRequests: number;
    pendingRequests: number;
    availableNotifiedRequests: number;
    fulfilledRequests: number;
    conversionRatePercent: number;
  };
  transfers: {
    activeTransfers: number;
    completedTransfers: number;
  };
  dataProvenance: {
    primarySource: string;
    isSandboxActive: boolean;
    odooMappingsCount: number;
    confidenceLevel: string;
    provenanceNotice: string;
  };
  generatedAt: string;
}

export interface BiTemporalSalesPoint {
  period: string;
  salesVolume: number;
  salesRevenue: number;
  requestsCount: number;
  averageTicketDzd: number;
}

export interface BiSalesTrendsResponse {
  granularity: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  points: BiTemporalSalesPoint[];
  paymentSplit: Record<string, number>;
  totalPeriods: number;
}

export interface BiShowroomRanking {
  showroomId: string;
  showroomName: string;
  city: string;
  wilayaCode: string;
  region?: string;
  rank?: number;
  availableStock: number;
  dormantStock: number;
  salesVolume: number;
  salesRevenue: number;
  pendingDemand: number;
  absorptionRatio: number;
  normalizedScore: number;
  tier: 'Top Performer' | 'Équilibré' | 'Rupture Critique' | 'Sur-Stock Dormant' | 'Standard';
}

export interface BiShowroomRankingsResponse {
  totalShowrooms: number;
  rankings: BiShowroomRanking[];
  topPerformersCount: number;
  stockoutRiskCount: number;
  dormantRiskCount: number;
}

export interface BiModelDemandPerformance {
  modelId: string;
  name: string;
  brand: string;
  category: string;
  priceDzd: number;
  totalRequests: number;
  pendingDemand: number;
  salesVolume: number;
  salesRevenue: number;
  availableStock: number;
  tensionIndex: number;
  tensionStatus: 'TENSION_RUPTURE' | 'SUR_STOCK' | 'EQUILIBRE';
}

export interface BiDemandIntelligenceResponse {
  modelStats: BiModelDemandPerformance[];
  funnel: {
    stage1_collected: number;
    stage2_availableNotified: number;
    stage3_salesFulfilled: number;
    stage4_pendingAwaitingStock: number;
  };
  mostPopularModel: string;
  highestTensionModel: string;
}

export interface BiFilterOptions {
  startDate?: string;
  endDate?: string;
  period?: '7d' | '30d' | '90d' | 'ytd' | '12m' | 'all';
  region?: 'ALL' | 'CENTRE' | 'EST' | 'OUEST' | 'SUD';
  granularity?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}
