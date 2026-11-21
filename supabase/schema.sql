-- ====================================================================
-- PROJECT: QUICK — VMS Motorcycle Platform
-- Centralized PostgreSQL / Supabase Schema Definition
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. DROP TABLES (Ordered by dependencies)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS preorder_redirects CASCADE;
DROP TABLE IF EXISTS sales CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS transfer_history CASCADE;
DROP TABLE IF EXISTS transfers CASCADE;
DROP TABLE IF EXISTS customer_requests CASCADE;
DROP TABLE IF EXISTS motorcycles CASCADE;
DROP TABLE IF EXISTS motorcycle_models CASCADE;
DROP TABLE IF EXISTS showroom_users CASCADE;
DROP TABLE IF EXISTS showrooms CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS regions CASCADE;

-- 3. ENUMS / DOMAINS
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('super_admin', 'regional_admin', 'showroom_owner', 'showroom_staff', 'customer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE motorcycle_status AS ENUM ('available', 'reserved', 'in_transfer', 'sold');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE transfer_status AS ENUM ('pending', 'approved', 'rejected', 'in_preparation', 'in_transit', 'received', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE request_status AS ENUM ('pending', 'available_notified', 'fulfilled', 'cancelled', 'preorder_redirected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 4. REGIONS & CITIES (Wilayas of Algeria)
CREATE TABLE regions (
  code VARCHAR(5) PRIMARY KEY, -- '01' to '58'
  name VARCHAR(100) NOT NULL,
  name_ar VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region_code VARCHAR(5) REFERENCES regions(code) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_cities_region ON cities(region_code);

-- 5. PROFILES (Extends Supabase auth.users or standalone authentication)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'customer',
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  wilaya_code VARCHAR(5) REFERENCES regions(code),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- 6. CUSTOMERS (Specific details & anti-abuse identifier)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  phone_normalized VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  wilaya_code VARCHAR(5) REFERENCES regions(code),
  city VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_customers_phone_norm ON customers(phone_normalized);
CREATE INDEX idx_customers_email ON customers(email);

-- 7. SHOWROOMS
CREATE TABLE showrooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  code VARCHAR(50) UNIQUE,
  wilaya_code VARCHAR(5) NOT NULL REFERENCES regions(code),
  city VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  opening_hours TEXT DEFAULT '08:30 - 17:00 (Sam - Jeu)',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_showrooms_wilaya ON showrooms(wilaya_code);

-- 8. SHOWROOM USERS
CREATE TABLE showroom_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  showroom_id UUID NOT NULL REFERENCES showrooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'staff',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(showroom_id, user_id)
);

-- 9. MOTORCYCLE MODELS (Catalog)
CREATE TABLE motorcycle_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  brand VARCHAR(100) NOT NULL DEFAULT 'VMS',
  category VARCHAR(100) NOT NULL, -- 'Scooter', 'Maxi Scooter', 'Roadster', 'Trail', etc.
  engine_cc INTEGER NOT NULL,
  power_hp NUMERIC(5,2),
  cooling VARCHAR(50) DEFAULT 'Air',
  fuel_system VARCHAR(50) DEFAULT 'EFI',
  price_dzd NUMERIC(12,2) NOT NULL,
  image_url TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_motorcycle_models_brand ON motorcycle_models(brand);

-- 10. MOTORCYCLES (Individual physical units)
CREATE TABLE motorcycles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_id UUID NOT NULL REFERENCES motorcycle_models(id) ON DELETE RESTRICT,
  showroom_id UUID NOT NULL REFERENCES showrooms(id) ON DELETE RESTRICT,
  vin VARCHAR(50) UNIQUE NOT NULL, -- Chassis / VIN must be strictly unique
  color VARCHAR(50) NOT NULL,
  engine_specs TEXT,
  acquisition_date DATE NOT NULL DEFAULT CURRENT_DATE,
  arrival_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status motorcycle_status NOT NULL DEFAULT 'available',
  notes TEXT,
  sale_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_motorcycles_showroom ON motorcycles(showroom_id);
CREATE INDEX idx_motorcycles_model ON motorcycles(model_id);
CREATE INDEX idx_motorcycles_status ON motorcycles(status);
CREATE INDEX idx_motorcycles_arrival_date ON motorcycles(arrival_date);

-- 11. CUSTOMER REQUESTS
CREATE TABLE customer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  phone_normalized VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  motorcycle_model_id UUID NOT NULL REFERENCES motorcycle_models(id),
  wilaya_code VARCHAR(5) NOT NULL REFERENCES regions(code),
  city VARCHAR(100) NOT NULL,
  status request_status NOT NULL DEFAULT 'pending',
  matched_showroom_id UUID REFERENCES showrooms(id) ON DELETE SET NULL,
  notified_at TIMESTAMPTZ,
  fulfilled_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_customer_requests_customer ON customer_requests(customer_id);
CREATE INDEX idx_customer_requests_phone_norm ON customer_requests(phone_normalized);
CREATE INDEX idx_customer_requests_status ON customer_requests(status);
CREATE INDEX idx_customer_requests_created_at ON customer_requests(created_at);
CREATE INDEX idx_customer_requests_model_wilaya ON customer_requests(motorcycle_model_id, wilaya_code);

-- 12. NOTIFICATIONS
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_phone VARCHAR(50),
  recipient_email VARCHAR(255),
  type VARCHAR(50) NOT NULL, -- 'stock_available', 'transfer_update', 'request_submitted', 'system'
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb,
  is_read BOOLEAN DEFAULT FALSE,
  channel VARCHAR(50) DEFAULT 'in_app', -- 'in_app', 'sms', 'email'
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_notifications_recipient ON notifications(recipient_profile_id);
CREATE INDEX idx_notifications_unread ON notifications(recipient_profile_id) WHERE is_read = FALSE;

-- 13. TRANSFERS (Inter-showroom transfers via Compte Global)
CREATE TABLE transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference VARCHAR(50) UNIQUE NOT NULL,
  motorcycle_id UUID NOT NULL REFERENCES motorcycles(id) ON DELETE RESTRICT,
  source_showroom_id UUID NOT NULL REFERENCES showrooms(id) ON DELETE RESTRICT,
  destination_showroom_id UUID NOT NULL REFERENCES showrooms(id) ON DELETE RESTRICT,
  requested_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status transfer_status NOT NULL DEFAULT 'pending',
  reason TEXT,
  stock_age_at_request INTEGER, -- Age in days when requested
  approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  approved_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  received_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  received_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_diff_showrooms CHECK (source_showroom_id <> destination_showroom_id)
);
CREATE INDEX idx_transfers_motorcycle ON transfers(motorcycle_id);
CREATE INDEX idx_transfers_source ON transfers(source_showroom_id);
CREATE INDEX idx_transfers_dest ON transfers(destination_showroom_id);
CREATE INDEX idx_transfers_status ON transfers(status);

-- 14. TRANSFER HISTORY (Immutable audit of each transfer transition)
CREATE TABLE transfer_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transfer_id UUID NOT NULL REFERENCES transfers(id) ON DELETE CASCADE,
  from_status transfer_status,
  to_status transfer_status NOT NULL,
  changed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_transfer_history_tx ON transfer_history(transfer_id);

-- 15. SALES (Showroom Motorcycle Sales)
CREATE TABLE sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference VARCHAR(50) UNIQUE NOT NULL,
  motorcycle_id UUID NOT NULL REFERENCES motorcycles(id) ON DELETE RESTRICT,
  showroom_id UUID NOT NULL REFERENCES showrooms(id) ON DELETE RESTRICT,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  customer_name VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  sale_price NUMERIC(12,2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'CASH', -- 'CASH', 'CHEQUE', 'VIREMENT', 'FACILITE'
  sale_date DATE NOT NULL DEFAULT CURRENT_DATE,
  sold_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_sales_showroom ON sales(showroom_id);
CREATE INDEX idx_sales_date ON sales(sale_date);

-- 16. PREORDER REDIRECTS (Tracking to motobladi.dz)
CREATE TABLE preorder_redirects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  motorcycle_model_id UUID REFERENCES motorcycle_models(id) ON DELETE SET NULL,
  wilaya_code VARCHAR(5) REFERENCES regions(code),
  city VARCHAR(100),
  target_url TEXT NOT NULL DEFAULT 'https://motobladi.dz/',
  referrer TEXT,
  user_agent TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_preorder_redirects_created ON preorder_redirects(created_at);
CREATE INDEX idx_preorder_model ON preorder_redirects(motorcycle_model_id);

-- 17. AUDIT LOGS (System-wide trace)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action_type VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);

-- ====================================================================
-- BUSINESS FUNCTIONS & TRIGGERS
-- ====================================================================

-- 1. Anti-abuse: Rolling 7-day restriction function
CREATE OR REPLACE FUNCTION check_customer_request_limit(
  p_user_id UUID,
  p_phone_norm VARCHAR(50)
)
RETURNS JSONB AS $$
DECLARE
  v_count INTEGER;
  v_oldest_timestamp TIMESTAMPTZ;
  v_can_submit_at TIMESTAMPTZ;
BEGIN
  -- Count requests in the last rolling 7 days by user_id OR normalized phone
  SELECT COUNT(*), MIN(created_at)
  INTO v_count, v_oldest_timestamp
  FROM customer_requests
  WHERE (user_id IS NOT NULL AND user_id = p_user_id)
     OR (p_phone_norm IS NOT NULL AND phone_normalized = p_phone_norm)
    AND created_at >= (NOW() - INTERVAL '7 days');

  IF v_count >= 2 THEN
    -- Customer must wait until 7 days after their first request in this window
    v_can_submit_at := v_oldest_timestamp + INTERVAL '7 days';
    RETURN jsonb_build_object(
      'allowed', FALSE,
      'current_count', v_count,
      'max_allowed', 2,
      'can_submit_at', v_can_submit_at,
      'message', 'Vous avez atteint la limite de 2 demandes de disponibilité par période de 7 jours.'
    );
  END IF;

  RETURN jsonb_build_object(
    'allowed', TRUE,
    'current_count', v_count,
    'max_allowed', 2,
    'remaining', 2 - v_count
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger on Customer Request Insertion to enforce the limit at DB level
CREATE OR REPLACE FUNCTION trg_enforce_request_limit()
RETURNS TRIGGER AS $$
DECLARE
  v_check JSONB;
BEGIN
  v_check := check_customer_request_limit(NEW.user_id, NEW.phone_normalized);
  IF (v_check->>'allowed')::boolean = FALSE THEN
    RAISE EXCEPTION 'Request limit exceeded: customer has already submitted 2 requests in the past 7 days. Eligible again at: %', (v_check->>'can_submit_at');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_customer_request_insert
BEFORE INSERT ON customer_requests
FOR EACH ROW
EXECUTE FUNCTION trg_enforce_request_limit();

-- 3. Automatic Notification matching when motorcycle becomes 'available'
CREATE OR REPLACE FUNCTION trg_notify_availability()
RETURNS TRIGGER AS $$
DECLARE
  v_showroom_wilaya VARCHAR(5);
  v_showroom_name VARCHAR(150);
  v_showroom_phone VARCHAR(50);
  v_model_name VARCHAR(150);
  r_req RECORD;
BEGIN
  -- Only trigger when motorcycle is newly inserted as available or updated to available
  IF (TG_OP = 'INSERT' AND NEW.status = 'available') OR 
     (TG_OP = 'UPDATE' AND NEW.status = 'available' AND OLD.status <> 'available') THEN
    
    -- Get Showroom details
    SELECT wilaya_code, name, phone INTO v_showroom_wilaya, v_showroom_name, v_showroom_phone
    FROM showrooms WHERE id = NEW.showroom_id;

    -- Get Model name
    SELECT name INTO v_model_name FROM motorcycle_models WHERE id = NEW.model_id;

    -- Find pending requests for this model and wilaya
    FOR r_req IN 
      SELECT id, user_id, phone, email, first_name
      FROM customer_requests
      WHERE motorcycle_model_id = NEW.model_id
        AND wilaya_code = v_showroom_wilaya
        AND status = 'pending'
    LOOP
      -- Update customer request status
      UPDATE customer_requests
      SET status = 'available_notified',
          matched_showroom_id = NEW.showroom_id,
          notified_at = NOW(),
          updated_at = NOW()
      WHERE id = r_req.id;

      -- Insert notification
      INSERT INTO notifications (
        recipient_profile_id,
        recipient_phone,
        recipient_email,
        type,
        title,
        message,
        data,
        channel
      ) VALUES (
        r_req.user_id,
        r_req.phone,
        r_req.email,
        'stock_available',
        'Bonne nouvelle ! Moto disponible dans votre région',
        FORMAT('Bonne nouvelle ! La moto %s que vous recherchez est maintenant disponible au showroom VMS %s (Tél: %s). Veuillez contacter le showroom pour finaliser votre commande.', v_model_name, v_showroom_name, v_showroom_phone),
        jsonb_build_object(
          'request_id', r_req.id,
          'motorcycle_id', NEW.id,
          'showroom_id', NEW.showroom_id,
          'model_name', v_model_name,
          'showroom_name', v_showroom_name,
          'showroom_phone', v_showroom_phone
        ),
        'in_app'
      );
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER after_motorcycle_status_available
AFTER INSERT OR UPDATE ON motorcycles
FOR EACH ROW
EXECUTE FUNCTION trg_notify_availability();

-- 4. Atomic Transfer Reception Function
CREATE OR REPLACE FUNCTION complete_transfer_reception(
  p_transfer_id UUID,
  p_user_id UUID
)
RETURNS JSONB AS $$
DECLARE
  v_transfer transfers%ROWTYPE;
BEGIN
  -- Lock transfer record
  SELECT * INTO v_transfer FROM transfers WHERE id = p_transfer_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'Transfert non trouvé');
  END IF;

  IF v_transfer.status NOT IN ('approved', 'in_transit', 'in_preparation') THEN
    RETURN jsonb_build_object('success', FALSE, 'error', FORMAT('Statut invalide pour réception: %s', v_transfer.status));
  END IF;

  -- 1. Update transfer
  UPDATE transfers
  SET status = 'received',
      received_by = p_user_id,
      received_at = NOW(),
      updated_at = NOW()
  WHERE id = p_transfer_id;

  -- 2. Update motorcycle: change showroom, reset arrival date, set available
  UPDATE motorcycles
  SET showroom_id = v_transfer.destination_showroom_id,
      status = 'available',
      arrival_date = CURRENT_DATE,
      updated_at = NOW()
  WHERE id = v_transfer.motorcycle_id;

  -- 3. Log transfer history
  INSERT INTO transfer_history (transfer_id, from_status, to_status, changed_by, comment)
  VALUES (p_transfer_id, v_transfer.status, 'received', p_user_id, 'Réception confirmée au showroom de destination');

  -- 4. Audit log
  INSERT INTO audit_logs (user_id, action_type, entity_type, entity_id, details)
  VALUES (
    p_user_id, 
    'TRANSFER_RECEIVE', 
    'transfers', 
    p_transfer_id, 
    jsonb_build_object('motorcycle_id', v_transfer.motorcycle_id, 'new_showroom_id', v_transfer.destination_showroom_id)
  );

  RETURN jsonb_build_object('success', TRUE, 'transfer_id', p_transfer_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
