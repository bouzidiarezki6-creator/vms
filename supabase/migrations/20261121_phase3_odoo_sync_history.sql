-- ====================================================================
-- QUICK BY VMS — PHASE 3: ODOO ERP SYNCHRONIZATION HISTORY & MAPPINGS
-- Migration: 20261121_phase3_odoo_sync_history.sql
-- Goal: Provide an enterprise audit log, idempotency key tracking,
--       and bidirectional ID cross-referencing between QUICK and Odoo.
-- ====================================================================

-- 1. CREATE ODOO_SYNC_HISTORY TABLE
CREATE TABLE IF NOT EXISTS odoo_sync_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(50) NOT NULL, -- 'product', 'motorcycle_lot', 'showroom_location', 'customer_lead', 'sale_order', 'stock_transfer'
  quick_record_id VARCHAR(100) NOT NULL,
  odoo_record_id INTEGER,
  operation VARCHAR(30) NOT NULL, -- 'EXPORT_CREATE', 'EXPORT_UPDATE', 'IMPORT_CREATE', 'IMPORT_UPDATE', 'DRY_RUN'
  sync_status VARCHAR(30) NOT NULL, -- 'SUCCESS', 'FAILED', 'PENDING', 'DRY_RUN', 'CONFLICT'
  details JSONB DEFAULT '{}'::jsonb,
  error_details TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0,
  checksum VARCHAR(64), -- SHA-256 idempotency hash of payload
  source_of_truth VARCHAR(20) DEFAULT 'QUICK', -- 'QUICK' or 'ODOO'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CREATE EXTERNAL ID MAPPINGS TABLE (FAST CROSS-LOOKUP)
CREATE TABLE IF NOT EXISTS odoo_external_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(50) NOT NULL,
  quick_id VARCHAR(100) NOT NULL,
  odoo_id INTEGER NOT NULL,
  last_sync_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  checksum VARCHAR(64),
  metadata JSONB DEFAULT '{}'::jsonb,
  CONSTRAINT uq_odoo_quick_mapping UNIQUE (entity_type, quick_id),
  CONSTRAINT uq_odoo_external_mapping UNIQUE (entity_type, odoo_id)
);

-- 3. CREATE DATA CONFLICTS TABLE
CREATE TABLE IF NOT EXISTS odoo_sync_conflicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(50) NOT NULL,
  quick_id VARCHAR(100) NOT NULL,
  odoo_id INTEGER,
  field_name VARCHAR(100) NOT NULL,
  quick_value TEXT,
  odoo_value TEXT,
  status VARCHAR(30) NOT NULL DEFAULT 'UNRESOLVED', -- 'UNRESOLVED', 'RESOLVED_QUICK', 'RESOLVED_ODOO', 'IGNORED'
  resolution_notes TEXT,
  resolved_by UUID,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CREATE INDEXES FOR OPTIMAL QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_odoo_sync_history_entity_quick 
  ON odoo_sync_history (entity_type, quick_record_id);

CREATE INDEX IF NOT EXISTS idx_odoo_sync_history_entity_odoo 
  ON odoo_sync_history (entity_type, odoo_record_id);

CREATE INDEX IF NOT EXISTS idx_odoo_sync_history_status 
  ON odoo_sync_history (sync_status);

CREATE INDEX IF NOT EXISTS idx_odoo_sync_history_created_at 
  ON odoo_sync_history (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_odoo_sync_history_checksum 
  ON odoo_sync_history (checksum);

CREATE INDEX IF NOT EXISTS idx_odoo_mappings_quick_id 
  ON odoo_external_mappings (entity_type, quick_id);

CREATE INDEX IF NOT EXISTS idx_odoo_mappings_odoo_id 
  ON odoo_external_mappings (entity_type, odoo_id);

CREATE INDEX IF NOT EXISTS idx_odoo_conflicts_status 
  ON odoo_sync_conflicts (status);

-- 5. FUNCTION TO REGISTER IDEMPOTENT SYNC LOG
CREATE OR REPLACE FUNCTION log_odoo_sync_operation(
  p_entity_type VARCHAR,
  p_quick_id VARCHAR,
  p_odoo_id INTEGER,
  p_operation VARCHAR,
  p_status VARCHAR,
  p_details JSONB,
  p_error TEXT,
  p_checksum VARCHAR
)
RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO odoo_sync_history (
    entity_type, quick_record_id, odoo_record_id,
    operation, sync_status, details, error_details, checksum, created_at, updated_at
  ) VALUES (
    p_entity_type, p_quick_id, p_odoo_id,
    p_operation, p_status, COALESCE(p_details, '{}'::jsonb), p_error, p_checksum, NOW(), NOW()
  )
  RETURNING id INTO v_log_id;

  -- Maintain mapping table if successful
  IF p_status = 'SUCCESS' AND p_odoo_id IS NOT NULL THEN
    INSERT INTO odoo_external_mappings (entity_type, quick_id, odoo_id, last_sync_at, checksum)
    VALUES (p_entity_type, p_quick_id, p_odoo_id, NOW(), p_checksum)
    ON CONFLICT (entity_type, quick_id) 
    DO UPDATE SET 
      odoo_id = EXCLUDED.odoo_id,
      last_sync_at = NOW(),
      checksum = EXCLUDED.checksum;
  END IF;

  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql;
