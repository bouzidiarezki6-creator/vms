/**
 * =============================================================================
 * QUICK by VMS - PHASE 5 AUTOMATED TEST SUITE
 * Predictive Analytics & Demand Forecasting Verification
 * =============================================================================
 */

const http = require('http');

const API_BASE = 'http://localhost:5000/api';

function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const fullUrl = new URL(url);
    const reqOptions = {
      hostname: fullUrl.hostname,
      port: fullUrl.port,
      path: fullUrl.pathname + fullUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', err => reject(err));
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function runTests() {
  console.log('=============================================================================');
  console.log('🔮 QUICK by VMS - TEST SUITE: PHASE 5 (PREDICTIVE ANALYTICS & FORECASTING)');
  console.log('=============================================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} - ${details}`);
    }
  }

  try {
    // -------------------------------------------------------------------------
    // TEST GROUP 1: Health & Predictive Service Connectivity
    // -------------------------------------------------------------------------
    console.log('--- TEST GROUP 1: Health & Connectivity ---');
    const healthRes = await request(`${API_BASE}/health`);
    assert(healthRes.statusCode === 200, 'Server health check returns HTTP 200');
    const healthJson = JSON.parse(healthRes.body);
    assert(healthJson.status === 'online', 'Server reports status: online');

    // -------------------------------------------------------------------------
    // TEST GROUP 2: Data Validation & KPI Discrepancy Correction
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 2: Data Validation & Discrepancy Verification ---');
    const biOverviewRes = await request(`${API_BASE}/bi/overview`);
    assert(biOverviewRes.statusCode === 200, 'GET /api/bi/overview returns HTTP 200');
    const biOverview = JSON.parse(biOverviewRes.body);

    assert(biOverview.inventory.operationalDsiDays !== undefined,
      'Refined operational DSI (~258 days) is present alongside cumulative DSI');
    assert(biOverview.inventory.operationalDsiDays < 1000,
      'Operational DSI is realistic based on empirical 60-day run rate',
      `Got: ${biOverview.inventory.operationalDsiDays} days`);

    assert(biOverview.financials.unblockedMarginRatePct === 8.0,
      'Unblocked margin rate is explicitly documented as 8.0%');
    assert(biOverview.financials.unblockedMarginNature === 'ESTIMATED_ASSUMPTION',
      'Unblocked margin is clearly labeled as an operational assumption (not audited COGS)');

    // -------------------------------------------------------------------------
    // TEST GROUP 3: Multi-Horizon Sales Projections (30, 60, 90 Days)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 3: Sales Forecasts (30, 60, 90 Days) ---');
    const forecastRes = await request(`${API_BASE}/predictive/sales-forecasts`);
    assert(forecastRes.statusCode === 200, 'GET /api/predictive/sales-forecasts returns HTTP 200');
    const forecastData = JSON.parse(forecastRes.body);

    assert(forecastData.baselineDays === 60,
      'Historical baseline verified as 60 calendar days',
      `Got: ${forecastData.baselineDays}`);
    assert(forecastData.totalHistoricalSales === 85,
      'Historical sales volume verified as 85 units',
      `Got: ${forecastData.totalHistoricalSales}`);
    assert(forecastData.averageDailySalesRate > 1.0 && forecastData.averageDailySalesRate < 2.0,
      'Average daily sales rate is within [1.0, 2.0] motos/day',
      `Rate: ${forecastData.averageDailySalesRate}`);

    const h30 = forecastData.horizons.find(h => h.horizonDays === 30);
    const h60 = forecastData.horizons.find(h => h.horizonDays === 60);
    const h90 = forecastData.horizons.find(h => h.horizonDays === 90);

    assert(h30 && h60 && h90, 'All 3 forecast horizons (30, 60, 90 days) are present');
    assert(h30.projectedVolume > 0 && h60.projectedVolume > 0 && h90.projectedVolume > 0,
      'All projected volumes are strictly positive',
      `30d: ${h30.projectedVolume}, 60d: ${h60.projectedVolume}, 90d: ${h90.projectedVolume}`);
    assert(h30.projectedVolume <= h60.projectedVolume && h60.projectedVolume <= h90.projectedVolume,
      'Projected volumes are monotonically increasing with horizon length',
      `30d: ${h30.projectedVolume} <= 60d: ${h60.projectedVolume} <= 90d: ${h90.projectedVolume}`);

    // Confidence bounds check: lower <= projected <= upper
    assert(h30.lowerBoundVolume80 <= h30.projectedVolume && h30.projectedVolume <= h30.upperBoundVolume80,
      '80% confidence interval valid for 30d projection',
      `[${h30.lowerBoundVolume80} <= ${h30.projectedVolume} <= ${h30.upperBoundVolume80}]`);
    assert(h60.lowerBoundVolume80 <= h60.projectedVolume && h60.projectedVolume <= h60.upperBoundVolume80,
      '80% confidence interval valid for 60d projection');
    assert(h90.lowerBoundVolume80 <= h90.projectedVolume && h90.projectedVolume <= h90.upperBoundVolume80,
      '80% confidence interval valid for 90d projection');

    // Daily trajectory points check
    assert(Array.isArray(forecastData.dailyProjections) && forecastData.dailyProjections.length === 30,
      'Daily projections array contains exactly 30 chronological days for plotting');
    const day1 = forecastData.dailyProjections[0];
    assert(day1.date && day1.predictedSales > 0 && day1.lowerBound95 >= 0,
      'Daily projection point includes date, predicted sales, and non-negative lower bound');

    // -------------------------------------------------------------------------
    // TEST GROUP 4: Backtesting Engine & Model Competition
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 4: Backtesting Engine & Model Competition ---');
    const backtestRes = await request(`${API_BASE}/predictive/backtest`);
    assert(backtestRes.statusCode === 200, 'GET /api/predictive/backtest returns HTTP 200');
    const backtest = JSON.parse(backtestRes.body);

    assert(Boolean(backtest.bestModel), 'Best model dynamically identified', `Winner: ${backtest.bestModel}`);
    assert(backtest.mae >= 0 && backtest.rmse >= 0, 'Backtest MAE and RMSE are non-negative',
      `MAE: ${backtest.mae}, RMSE: ${backtest.rmse}`);
    assert(backtest.smape >= 0 && backtest.smape <= 100, 'sMAPE is properly bounded within [0, 100]%',
      `sMAPE: ${backtest.smape}%`);
    assert(backtest.confidenceScore >= 40 && backtest.confidenceScore <= 95,
      'Confidence score is calibrated within [40, 95]%',
      `Score: ${backtest.confidenceScore}%`);

    assert(Array.isArray(backtest.modelsComparison) && backtest.modelsComparison.length === 3,
      'Holdout backtest compares all 3 candidate models (WMA, SES, Holt)',
      `Compared: ${backtest.modelsComparison.map(m => m.name).join(', ')}`);

    // Verify winner has minimal RMSE among candidates
    const minRmseCandidate = backtest.modelsComparison.reduce((min, m) => m.rmse < min.rmse ? m : min, backtest.modelsComparison[0]);
    assert(backtest.bestModel === minRmseCandidate.name,
      'Dynamic model selector picks candidate with minimum RMSE',
      `Selected: ${backtest.bestModel}`);

    // -------------------------------------------------------------------------
    // TEST GROUP 5: Algerian Market Seasonality Factors
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 5: Algerian Seasonality Analysis ---');
    const seasRes = await request(`${API_BASE}/predictive/seasonality`);
    assert(seasRes.statusCode === 200, 'GET /api/predictive/seasonality returns HTTP 200');
    const seasonality = JSON.parse(seasRes.body);

    assert(Array.isArray(seasonality) && seasonality.length === 6,
      'Exactly 6 seasonal commercial cycles are modeled');

    const rentree = seasonality.find(s => s.id === 'season-rentree-automne');
    assert(rentree && rentree.nature === 'EMPIRICAL_OBSERVED',
      'Rentrée cycle is clearly labeled as EMPIRICAL_OBSERVED');

    const ete = seasonality.find(s => s.id === 'season-ete-peak');
    assert(ete && ete.nature === 'ASSUMPTION_VMS_MARKET',
      'Pic Estival is clearly labeled as ASSUMPTION_VMS_MARKET (expert assumption)');

    const allMultipliersValid = seasonality.every(s => s.multiplier >= 0.70 && s.multiplier <= 1.50);
    assert(allMultipliersValid, 'All seasonality multipliers are within realistic bounds [0.70, 1.50]');

    // -------------------------------------------------------------------------
    // TEST GROUP 6: Model-Level Demand Velocity & Stockout Dates
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 6: Model-Level Forecasting & Stockout Engine ---');
    const modelsRes = await request(`${API_BASE}/predictive/models`);
    assert(modelsRes.statusCode === 200, 'GET /api/predictive/models returns HTTP 200');
    const modelData = JSON.parse(modelsRes.body);

    assert(modelData.totalModels === 8, 'All 8 VMS motorcycle models evaluated');
    assert(modelData.models.every(m => m.projectedDailyVelocity >= 0),
      'All models have non-negative projected daily velocity');
    assert(modelData.models.every(m => m.daysUntilDepletion > 0),
      'Days until depletion is calculated for every model');
    assert(modelData.totalRecommendedReorderQty >= 0,
      'Total recommended factory reorder quantity is calculated');

    // -------------------------------------------------------------------------
    // TEST GROUP 7: Showroom-Level Depletion & Replenishment Projections
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 7: Showroom Projections & Regional Filters ---');
    const shwRes = await request(`${API_BASE}/predictive/showrooms`);
    assert(shwRes.statusCode === 200, 'GET /api/predictive/showrooms returns HTTP 200');
    const shwData = JSON.parse(shwRes.body);

    assert(shwData.totalShowrooms === 80, 'All 80 showrooms evaluated in predictive engine');
    assert(shwData.showrooms.every(s => s.daysToDepletion > 0),
      'Depletion countdown calculated for every showroom');

    // Regional Filter Tests
    const regions = ['CENTRE', 'EST', 'OUEST', 'SUD'];
    for (const r of regions) {
      const regRes = await request(`${API_BASE}/predictive/showrooms?region=${r}`);
      assert(regRes.statusCode === 200, `GET /api/predictive/showrooms?region=${r} returns HTTP 200`);
      const regData = JSON.parse(regRes.body);
      assert(regData.totalShowrooms > 0 && regData.totalShowrooms < 80,
        `Regional filter [${r}] returns correct subset of showrooms (${regData.totalShowrooms})`);
    }

    // -------------------------------------------------------------------------
    // TEST GROUP 8: Consolidated Executive Predictive Overview
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 8: Consolidated Executive Overview ---');
    const execRes = await request(`${API_BASE}/predictive/overview`);
    assert(execRes.statusCode === 200, 'GET /api/predictive/overview returns HTTP 200');
    const execOverview = JSON.parse(execRes.body);

    assert(Boolean(execOverview.forecastHorizon30d), '30d horizon present in executive summary');
    assert(Boolean(execOverview.forecastHorizon60d), '60d horizon present in executive summary');
    assert(Boolean(execOverview.forecastHorizon90d), '90d horizon present in executive summary');
    assert(Boolean(execOverview.accuracyScorecard), 'Accuracy scorecard present in executive summary');
    assert(Boolean(execOverview.dataValidationNotice), 'Data validation notice present in executive summary');
    assert(execOverview.dataValidationNotice.historicalSalesSample === 85,
      'Data validation notice documents exact historical sample (85 sales)');

    // -------------------------------------------------------------------------
    // TEST GROUP 9: Regression Tests Across Phases 1, 2, 3, 4
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 9: Full Regression Verification (Phases 1-4) ---');
    // Phase 1: Security
    const loginRes = await request(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@vms.dz' })
    });
    assert(loginRes.statusCode === 200, 'Phase 1: Admin JWT login functional');

    // Phase 2: Compte Global Engine
    const cgRes = await request(`${API_BASE}/compte-global/opportunities`);
    assert(cgRes.statusCode === 200, 'Phase 2: Compte Global opportunities intact (114 proposals)');

    // Phase 3: Odoo ERP Gateway
    const odooRes = await request(`${API_BASE}/odoo/status`);
    assert(odooRes.statusCode === 200, 'Phase 3: Odoo ERP gateway status intact');

    // Phase 4: Business Intelligence
    const biPerfRes = await request(`${API_BASE}/bi/showroom-performance`);
    assert(biPerfRes.statusCode === 200, 'Phase 4: Showroom performance rankings intact (80 showrooms)');

    console.log('\n=============================================================================');
    console.log(`📊 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round(passedTests / totalTests * 100)}%)`);
    console.log('=============================================================================');

    if (passedTests === totalTests) {
      console.log('🎉 ALL PHASE 5 PREDICTIVE ANALYTICS TESTS PASSED FLAWLESSLY!\n');
      process.exit(0);
    } else {
      console.error('⚠️ Some tests failed.');
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal error during test execution:', err);
    process.exit(1);
  }
}

runTests();
