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
