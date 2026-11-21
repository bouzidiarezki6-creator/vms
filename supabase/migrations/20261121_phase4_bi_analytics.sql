-- ====================================================================
-- QUICK BY VMS — PHASE 4: BUSINESS INTELLIGENCE & ANALYTICS
-- Migration: 20261121_phase4_bi_analytics.sql
-- Goal: Analytical indexes, aggregate reporting views, and KPI optimization.
-- ====================================================================

-- 1. ANALYTICAL COMPOSITE INDEXES FOR RAPID REPORTING
CREATE INDEX IF NOT EXISTS idx_sales_date_amount 
  ON sales (sale_date DESC, sale_price);

CREATE INDEX IF NOT EXISTS idx_sales_showroom_model 
  ON sales (showroom_id, motorcycle_id);

CREATE INDEX IF NOT EXISTS idx_motorcycles_status_arrival 
  ON motorcycles (status, arrival_date);

CREATE INDEX IF NOT EXISTS idx_motorcycles_showroom_status 
  ON motorcycles (showroom_id, status);

CREATE INDEX IF NOT EXISTS idx_customer_requests_wilaya_status 
  ON customer_requests (wilaya_code, status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_transfers_status_dates 
  ON transfers (status, created_at DESC);

-- 2. ANALYTICAL VIEW: DAILY SALES SUMMARY (RAPID AGGREGATION)
CREATE OR REPLACE VIEW view_bi_daily_sales AS
SELECT 
  sale_date::date AS day,
  COUNT(id) AS sales_volume,
  COALESCE(SUM(sale_price), 0) AS sales_revenue,
  COALESCE(AVG(sale_price), 0) AS average_ticket
FROM sales
GROUP BY sale_date::date
ORDER BY day DESC;

-- 3. ANALYTICAL VIEW: SHOWROOM PERFORMANCE & EFFICIENCY RATIOS
CREATE OR REPLACE VIEW view_bi_showroom_performance AS
SELECT 
  s.id AS showroom_id,
  s.name AS showroom_name,
  s.city,
  s.wilaya_code,
  COUNT(DISTINCT m.id) AS current_stock,
  COUNT(DISTINCT CASE WHEN m.status = 'available' THEN m.id END) AS available_stock,
  COUNT(DISTINCT CASE WHEN m.status = 'available' AND (CURRENT_DATE - m.arrival_date) >= 90 THEN m.id END) AS dormant_stock_count,
  COALESCE(sales_agg.total_sales, 0) AS sales_volume,
  COALESCE(sales_agg.total_revenue, 0) AS total_revenue,
  -- Normalized Efficiency Ratio: Sales Volume per Unit of Available Stock
  ROUND(
    CASE 
      WHEN COUNT(DISTINCT CASE WHEN m.status = 'available' THEN m.id END) > 0 
      THEN (COALESCE(sales_agg.total_sales, 0)::numeric / COUNT(DISTINCT CASE WHEN m.status = 'available' THEN m.id END)::numeric) * 100
      ELSE 0 
    END, 2
  ) AS stock_absorption_rate
FROM showrooms s
LEFT JOIN motorcycles m ON m.showroom_id = s.id
LEFT JOIN (
  SELECT showroom_id, COUNT(id) AS total_sales, SUM(sale_price) AS total_revenue
  FROM sales
  GROUP BY showroom_id
) sales_agg ON sales_agg.showroom_id = s.id
GROUP BY s.id, s.name, s.city, s.wilaya_code, sales_agg.total_sales, sales_agg.total_revenue;

-- 4. ANALYTICAL VIEW: MODEL DEMAND VS STOCKOUT TENSION
CREATE OR REPLACE VIEW view_bi_model_demand_tension AS
SELECT 
  mod.id AS model_id,
  mod.name AS model_name,
  mod.brand,
  mod.category,
  mod.price_dzd,
  COUNT(DISTINCT req.id) AS total_requests,
  COUNT(DISTINCT CASE WHEN req.status = 'pending' THEN req.id END) AS pending_requests,
  COUNT(DISTINCT CASE WHEN req.status = 'fulfilled' THEN req.id END) AS fulfilled_requests,
  COUNT(DISTINCT m.id) AS total_stock,
  COUNT(DISTINCT CASE WHEN m.status = 'available' THEN m.id END) AS available_stock,
  COUNT(DISTINCT CASE WHEN m.status = 'available' AND (CURRENT_DATE - m.arrival_date) >= 90 THEN m.id END) AS dormant_stock
FROM motorcycle_models mod
LEFT JOIN customer_requests req ON req.motorcycle_model_id = mod.id
LEFT JOIN motorcycles m ON m.model_id = mod.id
GROUP BY mod.id, mod.name, mod.brand, mod.category, mod.price_dzd;

-- 5. FUNCTION TO GET CACHED BI METRICS SUMMARY (ATOMIC & OPTIMIZED)
CREATE OR REPLACE FUNCTION get_bi_executive_summary()
RETURNS JSONB AS $$
DECLARE
  v_total_sales_value NUMERIC;
  v_total_sales_volume INTEGER;
  v_total_requests INTEGER;
  v_fulfilled_requests INTEGER;
  v_conversion_rate NUMERIC;
  v_total_stock INTEGER;
  v_dormant_stock INTEGER;
  v_dormant_value NUMERIC;
  v_inventory_turnover NUMERIC;
  v_avg_dsi NUMERIC;
BEGIN
  -- Sales aggregation
  SELECT COALESCE(SUM(sale_price), 0), COUNT(id) 
  INTO v_total_sales_value, v_total_sales_volume 
  FROM sales;

  -- Requests & Conversion
  SELECT COUNT(id), COUNT(CASE WHEN status = 'fulfilled' THEN 1 END)
  INTO v_total_requests, v_fulfilled_requests
  FROM customer_requests;

  IF v_total_requests > 0 THEN
    v_conversion_rate := ROUND((v_fulfilled_requests::numeric / v_total_requests::numeric) * 100, 2);
  ELSE
    v_conversion_rate := 0;
  END IF;

  -- Inventory & Dormant Capital
  SELECT 
    COUNT(m.id),
    COUNT(CASE WHEN m.status = 'available' AND (CURRENT_DATE - m.arrival_date) >= 90 THEN 1 END),
    COALESCE(SUM(CASE WHEN m.status = 'available' AND (CURRENT_DATE - m.arrival_date) >= 90 THEN mod.price_dzd ELSE 0 END), 0)
  INTO v_total_stock, v_dormant_stock, v_dormant_value
  FROM motorcycles m
  JOIN motorcycle_models mod ON mod.id = m.model_id;

  -- Turnover ratio
  IF v_total_stock > 0 THEN
    v_inventory_turnover := ROUND((v_total_sales_volume::numeric / v_total_stock::numeric), 2);
    IF v_inventory_turnover > 0 THEN
      v_avg_dsi := ROUND(365.0 / v_inventory_turnover, 0);
    ELSE
      v_avg_dsi := 999;
    END IF;
  ELSE
    v_inventory_turnover := 0;
    v_avg_dsi := 0;
  END IF;

  RETURN jsonb_build_object(
    'total_sales_revenue', v_total_sales_value,
    'total_sales_volume', v_total_sales_volume,
    'average_ticket_dzd', CASE WHEN v_total_sales_volume > 0 THEN ROUND(v_total_sales_value / v_total_sales_volume, 0) ELSE 0 END,
    'total_requests', v_total_requests,
    'fulfilled_requests', v_fulfilled_requests,
    'conversion_rate_percent', v_conversion_rate,
    'total_stock', v_total_stock,
    'dormant_stock_count', v_dormant_stock,
    'dormant_capital_tied_up_dzd', v_dormant_value,
    'inventory_turnover_ratio', v_inventory_turnover,
    'days_sales_of_inventory_dsi', v_avg_dsi,
    'generated_at', NOW()
  );
END;
$$ LANGUAGE plpgsql;
