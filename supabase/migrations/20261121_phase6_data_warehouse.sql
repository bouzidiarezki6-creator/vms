-- ====================================================================
-- QUICK BY VMS — PHASE 6: ENTERPRISE DATA WAREHOUSE & STAR SCHEMA
-- Migration: 20261121_phase6_data_warehouse.sql
-- Architecture: Kimball Dimensional Star Schema (Surrogate Keys, Facts, Dimensions)
-- Data Governance: Provenance tracking, SCD Type 2 temporal validity, Data Quality
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. DIMENSION TABLES
-- --------------------------------------------------------------------

-- 1.1. Date Dimension (dim_date)
CREATE TABLE IF NOT EXISTS dim_date (
  date_key INTEGER PRIMARY KEY, -- Format YYYYMMDD (e.g., 20261121)
  full_date DATE NOT NULL UNIQUE,
  day_of_month INTEGER NOT NULL,
  day_of_week INTEGER NOT NULL, -- 1=Lundi, 7=Dimanche
  day_name_fr VARCHAR(20) NOT NULL,
  month_num INTEGER NOT NULL, -- 1-12
  month_name_fr VARCHAR(20) NOT NULL,
  quarter INTEGER NOT NULL, -- 1-4
  quarter_name VARCHAR(5) NOT NULL, -- 'Q1', 'Q2', 'Q3', 'Q4'
  year INTEGER NOT NULL,
  is_weekend BOOLEAN NOT NULL DEFAULT FALSE,
  algerian_season_id VARCHAR(50),
  algerian_season_name VARCHAR(100),
  season_multiplier NUMERIC(4,2) DEFAULT 1.00,
  is_ramadan BOOLEAN NOT NULL DEFAULT FALSE,
  is_algerian_holiday BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_dim_date_year_month ON dim_date (year, month_num);
CREATE INDEX IF NOT EXISTS idx_dim_date_quarter ON dim_date (year, quarter);

-- 1.2. Region Dimension (dim_region)
CREATE TABLE IF NOT EXISTS dim_region (
  region_key SERIAL PRIMARY KEY,
  region_code VARCHAR(20) NOT NULL UNIQUE, -- 'CENTRE', 'EST', 'OUEST', 'SUD'
  region_name_fr VARCHAR(50) NOT NULL,
  regional_hub VARCHAR(50) NOT NULL,
  wilayas_count INTEGER NOT NULL,
  logistics_base_cost_dzd NUMERIC(12,2) DEFAULT 4000.00,
  cost_per_km_dzd NUMERIC(8,2) DEFAULT 35.00
);

-- 1.3. Showroom Dimension (dim_showroom - SCD Type 2 ready)
CREATE TABLE IF NOT EXISTS dim_showroom (
  showroom_key SERIAL PRIMARY KEY,
  showroom_id VARCHAR(50) NOT NULL, -- Natural Key
  showroom_name VARCHAR(150) NOT NULL,
  city VARCHAR(100) NOT NULL,
  wilaya_code VARCHAR(10) NOT NULL,
  wilaya_name VARCHAR(100) NOT NULL,
  region_code VARCHAR(20) NOT NULL,
  region_key INTEGER REFERENCES dim_region(region_key),
  commercial_tier VARCHAR(10) DEFAULT 'B',
  capacity INTEGER DEFAULT 15,
  latitude NUMERIC(9,6),
  longitude NUMERIC(9,6),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_to TIMESTAMP WITH TIME ZONE,
  is_current BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_dim_showroom_id ON dim_showroom (showroom_id);
CREATE INDEX IF NOT EXISTS idx_dim_showroom_wilaya ON dim_showroom (wilaya_code);
CREATE INDEX IF NOT EXISTS idx_dim_showroom_region ON dim_showroom (region_code);

-- 1.4. Product Model Dimension (dim_product)
CREATE TABLE IF NOT EXISTS dim_product (
  product_key SERIAL PRIMARY KEY,
  model_id VARCHAR(50) NOT NULL, -- Natural Key
  model_name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'Scooter', 'Moto Urbaine', 'Trail', 'Maxi-scooter', 'Naked Sport'
  displacement_cc INTEGER NOT NULL,
  default_price_dzd NUMERIC(12,2) NOT NULL,
  margin_standard_pct NUMERIC(5,2) DEFAULT 8.00,
  status VARCHAR(30) DEFAULT 'active',
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_to TIMESTAMP WITH TIME ZONE,
  is_current BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_dim_product_model_id ON dim_product (model_id);
CREATE INDEX IF NOT EXISTS idx_dim_product_category ON dim_product (category);

-- 1.5. Customer Segment Dimension (dim_customer_segment)
CREATE TABLE IF NOT EXISTS dim_customer_segment (
  segment_key SERIAL PRIMARY KEY,
  segment_code VARCHAR(50) NOT NULL UNIQUE,
  segment_name_fr VARCHAR(100) NOT NULL,
  target_displacement VARCHAR(50),
  min_budget_dzd NUMERIC(12,2),
  max_budget_dzd NUMERIC(12,2)
);

-- 1.6. Payment Method Dimension (dim_payment_method)
CREATE TABLE IF NOT EXISTS dim_payment_method (
  payment_method_key SERIAL PRIMARY KEY,
  payment_type VARCHAR(50) NOT NULL UNIQUE, -- 'CASH', 'BANK_TRANSFER', 'FINANCING_FACILITE', 'CERTIFIED_CHEQUE'
  payment_label_fr VARCHAR(100) NOT NULL,
  clearing_time_days INTEGER DEFAULT 0,
  financial_risk_level VARCHAR(20) DEFAULT 'LOW'
);

-- --------------------------------------------------------------------
-- 2. FACT TABLES
-- --------------------------------------------------------------------

-- 2.1. Fact Sales (Grain: 1 ligne par transaction de vente confirmée)
CREATE TABLE IF NOT EXISTS fact_sales (
  sale_key SERIAL PRIMARY KEY,
  sale_id VARCHAR(50) NOT NULL UNIQUE, -- Business Degenerate Dimension
  date_key INTEGER NOT NULL REFERENCES dim_date(date_key),
  showroom_key INTEGER NOT NULL REFERENCES dim_showroom(showroom_key),
  product_key INTEGER NOT NULL REFERENCES dim_product(product_key),
  region_key INTEGER NOT NULL REFERENCES dim_region(region_key),
  payment_method_key INTEGER REFERENCES dim_payment_method(payment_method_key),
  vin VARCHAR(50) NOT NULL,
  sale_price_dzd NUMERIC(12,2) NOT NULL,
  estimated_margin_dzd NUMERIC(12,2) NOT NULL,
  discount_dzd NUMERIC(12,2) DEFAULT 0.00,
  days_in_stock_prior_to_sale INTEGER DEFAULT 0,
  is_dormant_liquidation BOOLEAN DEFAULT FALSE,
  data_provenance VARCHAR(50) DEFAULT 'QUICK_CERTIFIED', -- 'QUICK_CERTIFIED', 'ODOO_ERP_SYNC'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fact_sales_date ON fact_sales (date_key);
CREATE INDEX IF NOT EXISTS idx_fact_sales_showroom ON fact_sales (showroom_key);
CREATE INDEX IF NOT EXISTS idx_fact_sales_product ON fact_sales (product_key);
CREATE INDEX IF NOT EXISTS idx_fact_sales_region ON fact_sales (region_key);

-- 2.2. Fact Inventory Snapshots (Grain: 1 ligne par showroom, modèle et jour calendaire)
CREATE TABLE IF NOT EXISTS fact_inventory_snapshots (
  snapshot_key SERIAL PRIMARY KEY,
  snapshot_date_key INTEGER NOT NULL REFERENCES dim_date(date_key),
  showroom_key INTEGER NOT NULL REFERENCES dim_showroom(showroom_key),
  product_key INTEGER NOT NULL REFERENCES dim_product(product_key),
  region_key INTEGER NOT NULL REFERENCES dim_region(region_key),
  total_units_on_hand INTEGER NOT NULL DEFAULT 0,
  available_units INTEGER NOT NULL DEFAULT 0,
  reserved_units INTEGER NOT NULL DEFAULT 0,
  in_transit_units INTEGER NOT NULL DEFAULT 0,
  dormant_units_over_90d INTEGER NOT NULL DEFAULT 0,
  total_valuation_dzd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  dormant_valuation_dzd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  days_sales_inventory_dsi NUMERIC(8,2) DEFAULT 0.00,
  data_provenance VARCHAR(50) DEFAULT 'QUICK_CERTIFIED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT uq_inventory_snapshot_grain UNIQUE (snapshot_date_key, showroom_key, product_key)
);

CREATE INDEX IF NOT EXISTS idx_fact_inv_date ON fact_inventory_snapshots (snapshot_date_key);
CREATE INDEX IF NOT EXISTS idx_fact_inv_showroom ON fact_inventory_snapshots (showroom_key);
CREATE INDEX IF NOT EXISTS idx_fact_inv_product ON fact_inventory_snapshots (product_key);

-- 2.3. Fact Customer Requests & Leads (Grain: 1 ligne par demande client)
CREATE TABLE IF NOT EXISTS fact_customer_requests (
  request_key SERIAL PRIMARY KEY,
  request_id VARCHAR(50) NOT NULL UNIQUE,
  created_date_key INTEGER NOT NULL REFERENCES dim_date(date_key),
  showroom_key INTEGER REFERENCES dim_showroom(showroom_key),
  product_key INTEGER NOT NULL REFERENCES dim_product(product_key),
  region_key INTEGER REFERENCES dim_region(region_key),
  customer_segment_key INTEGER REFERENCES dim_customer_segment(segment_key),
  status VARCHAR(50) NOT NULL,
  budget_dzd NUMERIC(12,2) DEFAULT 0.00,
  is_converted_to_sale BOOLEAN DEFAULT FALSE,
  conversion_cycle_days INTEGER,
  data_provenance VARCHAR(50) DEFAULT 'QUICK_CERTIFIED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fact_requests_date ON fact_customer_requests (created_date_key);
CREATE INDEX IF NOT EXISTS idx_fact_requests_status ON fact_customer_requests (status);

-- 2.4. Fact Stock Transfers (Grain: 1 ligne par opération de transfert inter-showroom)
CREATE TABLE IF NOT EXISTS fact_transfers (
  transfer_key SERIAL PRIMARY KEY,
  transfer_id VARCHAR(50) NOT NULL UNIQUE,
  transfer_reference VARCHAR(50) NOT NULL,
  initiated_date_key INTEGER NOT NULL REFERENCES dim_date(date_key),
  completed_date_key INTEGER REFERENCES dim_date(date_key),
  source_showroom_key INTEGER NOT NULL REFERENCES dim_showroom(showroom_key),
  destination_showroom_key INTEGER NOT NULL REFERENCES dim_showroom(showroom_key),
  product_key INTEGER NOT NULL REFERENCES dim_product(product_key),
  distance_km NUMERIC(8,2) NOT NULL DEFAULT 0.00,
  logistics_cost_dzd NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  compte_global_opportunity_score NUMERIC(5,2) DEFAULT 0.00,
  transfer_status VARCHAR(50) NOT NULL,
  is_dormant_rebalance BOOLEAN DEFAULT TRUE,
  data_provenance VARCHAR(50) DEFAULT 'QUICK_CERTIFIED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fact_transfers_dates ON fact_transfers (initiated_date_key, completed_date_key);
CREATE INDEX IF NOT EXISTS idx_fact_transfers_source ON fact_transfers (source_showroom_key);
CREATE INDEX IF NOT EXISTS idx_fact_transfers_dest ON fact_transfers (destination_showroom_key);

-- 2.5. Fact Predictive Forecasts (Grain: 1 ligne par modèle/showroom, date cible et horizon)
CREATE TABLE IF NOT EXISTS fact_forecasts (
  forecast_key SERIAL PRIMARY KEY,
  forecast_generated_date_key INTEGER NOT NULL REFERENCES dim_date(date_key),
  target_date_key INTEGER NOT NULL REFERENCES dim_date(date_key),
  product_key INTEGER NOT NULL REFERENCES dim_product(product_key),
  showroom_key INTEGER REFERENCES dim_showroom(showroom_key), -- NULL si prévision nationale
  horizon_days INTEGER NOT NULL, -- 30, 60, 90
  model_algorithm VARCHAR(50) NOT NULL, -- 'SES', 'HOLT', 'WMA'
  projected_volume NUMERIC(8,2) NOT NULL,
  lower_bound_80 NUMERIC(8,2),
  upper_bound_80 NUMERIC(8,2),
  confidence_score NUMERIC(5,2),
  actual_sales_volume NUMERIC(8,2), -- Rétroactivement renseigné lors de l'échéance
  forecast_error_abs NUMERIC(8,2),
  data_provenance VARCHAR(50) DEFAULT 'PREDICTIVE_AI',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fact_forecasts_target ON fact_forecasts (target_date_key, horizon_days);

-- 2.6. Fact Showroom Performance (Grain: 1 ligne par showroom et période d'analyse)
CREATE TABLE IF NOT EXISTS fact_showroom_performance (
  performance_key SERIAL PRIMARY KEY,
  period_date_key INTEGER NOT NULL REFERENCES dim_date(date_key),
  showroom_key INTEGER NOT NULL REFERENCES dim_showroom(showroom_key),
  region_key INTEGER NOT NULL REFERENCES dim_region(region_key),
  sales_volume INTEGER NOT NULL DEFAULT 0,
  sales_revenue_dzd NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  customer_requests_count INTEGER NOT NULL DEFAULT 0,
  conversion_rate_pct NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  average_stock_level NUMERIC(8,2) NOT NULL DEFAULT 0.00,
  stock_turnover_rate NUMERIC(8,4) NOT NULL DEFAULT 0.00,
  dormant_ratio_pct NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  composite_efficiency_score NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  performance_tier VARCHAR(50) NOT NULL DEFAULT 'Équilibré',
  data_provenance VARCHAR(50) DEFAULT 'QUICK_CERTIFIED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT uq_showroom_perf_grain UNIQUE (period_date_key, showroom_key)
);

CREATE INDEX IF NOT EXISTS idx_fact_showroom_perf ON fact_showroom_performance (period_date_key, region_key);

-- --------------------------------------------------------------------
-- 3. ETL PIPELINE EXECUTION & DATA QUALITY AUDIT LOGS
-- --------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS etl_pipeline_runs (
  run_id SERIAL PRIMARY KEY,
  pipeline_name VARCHAR(100) NOT NULL,
  run_type VARCHAR(50) NOT NULL, -- 'FULL_BACKFILL', 'INCREMENTAL_DAILY'
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(30) NOT NULL, -- 'RUNNING', 'COMPLETED', 'FAILED'
  records_extracted INTEGER DEFAULT 0,
  records_transformed INTEGER DEFAULT 0,
  records_loaded INTEGER DEFAULT 0,
  records_rejected INTEGER DEFAULT 0,
  checksum_sha256 VARCHAR(64),
  error_message TEXT,
  execution_duration_ms INTEGER
);

CREATE TABLE IF NOT EXISTS data_quality_audit (
  audit_id SERIAL PRIMARY KEY,
  run_id INTEGER REFERENCES etl_pipeline_runs(run_id),
  audit_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  dimension_name VARCHAR(50) NOT NULL, -- 'COMPLETENESS', 'ACCURACY', 'CONSISTENCY', 'UNIQUENESS', 'INTEGRITY', 'FRESHNESS'
  target_table VARCHAR(100) NOT NULL,
  total_records_checked INTEGER NOT NULL,
  failed_records_count INTEGER NOT NULL DEFAULT 0,
  quality_score_pct NUMERIC(5,2) NOT NULL, -- 0.00 to 100.00
  status VARCHAR(20) NOT NULL, -- 'PASSED', 'WARNING', 'CRITICAL'
  details JSONB
);

-- --------------------------------------------------------------------
-- 4. AGGREGATE DECISION VIEWS
-- --------------------------------------------------------------------

-- Vue d'ensemble des ventes consolidées par Région et Modèle
CREATE OR REPLACE VIEW view_dw_regional_sales_summary AS
SELECT 
  r.region_code,
  r.region_name_fr,
  p.model_name,
  p.category,
  COUNT(f.sale_key) AS total_units_sold,
  COALESCE(SUM(f.sale_price_dzd), 0) AS total_revenue_dzd,
  COALESCE(SUM(f.estimated_margin_dzd), 0) AS total_estimated_margin_dzd,
  ROUND(AVG(f.days_in_stock_prior_to_sale), 1) AS avg_days_to_sell
FROM fact_sales f
JOIN dim_region r ON f.region_key = r.region_key
JOIN dim_product p ON f.product_key = p.product_key
GROUP BY r.region_code, r.region_name_fr, p.model_name, p.category;

-- Vue d'évaluation de la fraîcheur et de la valorisation des stocks
CREATE OR REPLACE VIEW view_dw_inventory_valuation_latest AS
SELECT 
  s.showroom_name,
  s.city,
  s.wilaya_code,
  r.region_code,
  p.model_name,
  inv.available_units,
  inv.dormant_units_over_90d,
  inv.total_valuation_dzd,
  inv.dormant_valuation_dzd,
  inv.days_sales_inventory_dsi
FROM fact_inventory_snapshots inv
JOIN dim_showroom s ON inv.showroom_key = s.showroom_key
JOIN dim_region r ON inv.region_key = r.region_key
JOIN dim_product p ON inv.product_key = p.product_key
WHERE inv.snapshot_date_key = (SELECT MAX(snapshot_date_key) FROM fact_inventory_snapshots);
