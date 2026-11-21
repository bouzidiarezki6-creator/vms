-- =============================================================================
-- QUICK by VMS — PHASE 5 : PREDICTIVE ANALYTICS & DEMAND FORECASTING
-- Migration : Tables, Index, Vues Analytiques et Procédures de Prévision
-- =============================================================================

-- 1. Configuration des Hyperparamètres des Modèles Prédictifs
CREATE TABLE IF NOT EXISTS predictive_models_config (
    id VARCHAR(50) PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    description TEXT,
    alpha_smoothing NUMERIC(4, 3) DEFAULT 0.250,
    beta_trend NUMERIC(4, 3) DEFAULT 0.150,
    gamma_seasonality NUMERIC(4, 3) DEFAULT 0.100,
    moving_average_window INTEGER DEFAULT 7,
    weights_wma JSONB DEFAULT '[0.4, 0.3, 0.2, 0.1]',
    confidence_level NUMERIC(3, 2) DEFAULT 0.95,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertion de la configuration de référence VMS Industrie
INSERT INTO predictive_models_config (id, model_name, description, alpha_smoothing, beta_trend, moving_average_window, weights_wma)
VALUES 
    ('cfg-holt-linear', 'Holts Linear Trend Method', 'Double lissage exponentiel adapté aux tendances de vente à 30-90 jours', 0.280, 0.120, 7, '[0.4, 0.3, 0.2, 0.1]'),
    ('cfg-ses-standard', 'Simple Exponential Smoothing', 'Lissage exponentiel simple robuste pour séries à faible variance', 0.250, 0.000, 7, '[0.5, 0.3, 0.2]'),
    ('cfg-wma-short', 'Weighted Moving Average 7D', 'Moyenne mobile pondérée sur 7 jours avec surpondération des jours récents', 0.000, 0.000, 7, '[0.35, 0.25, 0.20, 0.20]')
ON CONFLICT (id) DO UPDATE SET
    alpha_smoothing = EXCLUDED.alpha_smoothing,
    beta_trend = EXCLUDED.beta_trend,
    updated_at = CURRENT_TIMESTAMP;

-- 2. Table des Coefficients de Saisonnalité du Marché Algérien
CREATE TABLE IF NOT EXISTS predictive_algerian_seasonality (
    id VARCHAR(50) PRIMARY KEY,
    season_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    start_month INTEGER,
    end_month INTEGER,
    approximate_period VARCHAR(100),
    multiplier NUMERIC(4, 2) NOT NULL DEFAULT 1.00,
    confidence_nature VARCHAR(50) NOT NULL DEFAULT 'ASSUMPTION_VMS_MARKET', -- 'EMPIRICAL_OBSERVED' ou 'ASSUMPTION_VMS_MARKET'
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des facteurs saisonniers algériens VMS Industrie
INSERT INTO predictive_algerian_seasonality (id, season_name, description, start_month, end_month, approximate_period, multiplier, confidence_nature, notes)
VALUES
    ('season-summer-peak', 'Pic Estival Algérien', 'Afflux touristique et demande maximale sur les scooters urbains et trails', 6, 8, '15 Juin - 31 Août', 1.35, 'ASSUMPTION_VMS_MARKET', 'Surcroît de demande de 35% sur les zones côtières et métropolitaines'),
    ('season-rentree', 'Rentrée Universitaire & Urbaine', 'Forte reprise des déplacements quotidiens et mobilité jeunes actifs', 9, 10, '01 Septembre - 31 Octobre', 1.20, 'EMPIRICAL_OBSERVED', 'Observé dans la base : accélération des modèles 110cc et 125cc'),
    ('season-yearend-promo', 'Clôture Budgétaire & Campagnes Fin d Année', 'Promotions constructeur VMS et liquidation des stocks concessions', 11, 12, '01 Novembre - 31 Décembre', 1.15, 'EMPIRICAL_OBSERVED', 'Période active dans les données avec ventes soutenues'),
    ('season-winter-lull', 'Ralentissement Hivernal', 'Météo pluvieuse et baisse des immatriculations deux-roues', 1, 2, '01 Janvier - 28 Février', 0.80, 'ASSUMPTION_VMS_MARKET', 'Baisse saisonnière historique de 20% sur les régions Centre et Est'),
    ('season-ramadan-cycle', 'Mois Sacré du Ramadan', 'Ralentissement diurne compensé par des soirées d achat ciblées', NULL, NULL, 'Mois Lunaire Mobile', 0.85, 'ASSUMPTION_VMS_MARKET', 'Tassement diurne de 15% avec pic d achat les 10 derniers jours'),
    ('season-eid-recovery', 'Période des Fêtes de l Aïd', 'Reprise des achats cadeaux et bonus annuels post-fêtes', NULL, NULL, 'Semaines suivant Aïd', 1.10, 'ASSUMPTION_VMS_MARKET', 'Rebond post-fêtes traditionnelles')
ON CONFLICT (id) DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    updated_at = CURRENT_TIMESTAMP;

-- 3. Table des Clichés de Prévisions & Backtesting (Historisation)
CREATE TABLE IF NOT EXISTS predictive_forecast_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    snapshot_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    horizon_days INTEGER NOT NULL, -- 30, 60, 90
    forecast_level VARCHAR(30) NOT NULL, -- 'national', 'model', 'showroom', 'region'
    target_entity_id VARCHAR(100),
    target_entity_name VARCHAR(150),
    predicted_volume NUMERIC(10, 2) NOT NULL,
    predicted_revenue_dzd NUMERIC(14, 2) NOT NULL,
    lower_bound_80 NUMERIC(10, 2),
    upper_bound_80 NUMERIC(10, 2),
    lower_bound_95 NUMERIC(10, 2),
    upper_bound_95 NUMERIC(10, 2),
    confidence_score NUMERIC(5, 2),
    model_used VARCHAR(100) NOT NULL,
    backtest_mae NUMERIC(8, 3),
    backtest_rmse NUMERIC(8, 3),
    backtest_smape NUMERIC(6, 2),
    seasonality_applied NUMERIC(4, 2) DEFAULT 1.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_pred_snapshots_date ON predictive_forecast_snapshots(snapshot_date);
CREATE INDEX IF NOT EXISTS idx_pred_snapshots_level ON predictive_forecast_snapshots(forecast_level, horizon_days);

-- 4. Vue Analytique : Séries Temporelles Quotidiennes de Ventes
CREATE OR REPLACE VIEW view_predictive_daily_series AS
SELECT
    COALESCE(s.sale_date, s.created_at::DATE) AS sale_day,
    COUNT(s.id) AS daily_sales_count,
    SUM(s.sale_price) AS daily_revenue_dzd,
    AVG(s.sale_price) AS daily_avg_ticket
FROM sales s
GROUP BY COALESCE(s.sale_date, s.created_at::DATE)
ORDER BY sale_day ASC;

-- 5. Vue Analytique : Vélocité des Modèles et Estimation des Jours de Couverture
CREATE OR REPLACE VIEW view_predictive_model_coverage AS
WITH model_sales_60d AS (
    SELECT 
        m.model_id,
        COUNT(s.id) AS sales_count_60d,
        SUM(s.sale_price) AS sales_revenue_60d,
        (COUNT(s.id)::NUMERIC / 60.0) AS daily_sales_velocity
    FROM motorcycles m
    JOIN sales s ON s.motorcycle_id = m.id
    WHERE COALESCE(s.sale_date, s.created_at) >= CURRENT_DATE - INTERVAL '60 days'
    GROUP BY m.model_id
),
model_stock AS (
    SELECT 
        model_id,
        COUNT(id) AS total_stock,
        COUNT(CASE WHEN status = 'available' THEN 1 END) AS available_stock,
        COUNT(CASE WHEN status = 'available' AND is_aging THEN 1 END) AS dormant_stock
    FROM motorcycles
    GROUP BY model_id
)
SELECT
    mm.id AS model_id,
    mm.name AS model_name,
    mm.brand,
    mm.category,
    mm.price_dzd,
    COALESCE(ms.available_stock, 0) AS current_available_stock,
    COALESCE(ms.dormant_stock, 0) AS current_dormant_stock,
    COALESCE(ms60.sales_count_60d, 0) AS sales_last_60d,
    COALESCE(ROUND(ms60.daily_sales_velocity, 3), 0.000) AS daily_velocity,
    CASE 
        WHEN COALESCE(ms60.daily_sales_velocity, 0) = 0 THEN 999
        ELSE ROUND(COALESCE(ms.available_stock, 0) / ms60.daily_sales_velocity)
    END AS estimated_days_until_depletion,
    CASE 
        WHEN COALESCE(ms60.daily_sales_velocity, 0) > 0 AND (COALESCE(ms.available_stock, 0) / ms60.daily_sales_velocity) <= 15 THEN 'CRITICAL_DEPLETION'
        WHEN COALESCE(ms60.daily_sales_velocity, 0) > 0 AND (COALESCE(ms.available_stock, 0) / ms60.daily_sales_velocity) <= 30 THEN 'WARNING_DEPLETION'
        WHEN COALESCE(ms.available_stock, 0) = 0 THEN 'OUT_OF_STOCK'
        ELSE 'SUFFICIENT_COVERAGE'
    END AS depletion_risk_status
FROM models mm
LEFT JOIN model_stock ms ON ms.model_id = mm.id
LEFT JOIN model_sales_60d ms60 ON ms60.model_id = mm.id;
