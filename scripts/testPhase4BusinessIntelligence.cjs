/**
 * =============================================================================
 * QUICK by VMS - PHASE 4 AUTOMATED TEST SUITE
 * Advanced Business Intelligence & Analytics Verification
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
  console.log('🚀 QUICK by VMS - TEST SUITE: PHASE 4 (BUSINESS INTELLIGENCE & ANALYTICS)');
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
    // TEST 1: Health & Server Connectivity
    // -------------------------------------------------------------------------
    console.log('--- TEST GROUP 1: Health & Connectivity ---');
    const healthRes = await request(`${API_BASE}/health`);
    assert(healthRes.statusCode === 200, 'Server health check returns HTTP 200');
    const healthJson = JSON.parse(healthRes.body);
    assert(healthJson.status === 'online', 'Health response status is "online"');

    // -------------------------------------------------------------------------
    // TEST 2: Executive Overview KPI Calculations & Data Provenance
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 2: Executive Overview & KPI Calculations ---');
    const overviewRes = await request(`${API_BASE}/bi/overview`);
    assert(overviewRes.statusCode === 200, 'GET /api/bi/overview returns HTTP 200');
    const overview = JSON.parse(overviewRes.body);

    // Verify Financials
    assert(overview.financials && overview.financials.totalSalesRevenue > 0,
      'Total sales revenue is strictly positive',
      `Got: ${overview.financials?.totalSalesRevenue} DZD`);
    assert(overview.financials.totalSalesVolume > 0,
      'Total sales volume is strictly positive',
      `Got: ${overview.financials?.totalSalesVolume} sales`);
    assert(overview.financials.averageTicketDzd > 0,
      'Average ticket is properly calculated',
      `Got: ${overview.financials?.averageTicketDzd} DZD`);
    assert(overview.financials.dormantCapitalTiedUpDzd > 0,
      'Dormant capital tied up (>90j) is strictly positive',
      `Got: ${overview.financials?.dormantCapitalTiedUpDzd} DZD`);
    assert(overview.financials.estimatedUnblockedMarginDzd > 0,
      'Estimated unblocked margin (8%) is strictly positive',
      `Got: ${overview.financials?.estimatedUnblockedMarginDzd} DZD`);

    // Verify Inventory & Aging Pyramid
    assert(overview.inventory.totalStock >= overview.inventory.availableStock,
      'Total stock is greater than or equal to available stock',
      `Total: ${overview.inventory.totalStock}, Dispo: ${overview.inventory.availableStock}`);
    assert(overview.inventory.inventoryTurnoverRatio > 0,
      'Inventory turnover ratio is calculated',
      `Turnover: ${overview.inventory.inventoryTurnoverRatio}`);
    assert(overview.inventory.daysSalesOfInventoryDsi > 0,
      'Days sales of inventory (DSI) is calculated',
      `DSI: ${overview.inventory.daysSalesOfInventoryDsi} days`);
    assert(overview.inventory.agingPyramid && overview.inventory.agingPyramid.dormantOver90d > 0,
      'Aging pyramid identifies dormant motorcycles (>90j)',
      `Dormant count: ${overview.inventory.agingPyramid?.dormantOver90d}`);

    // Verify Conversion Rate & Demand
    assert(overview.demand.totalRequests > 0,
      'Total requests recorded is positive',
      `Requests: ${overview.demand.totalRequests}`);
    assert(overview.demand.conversionRatePercent >= 0 && overview.demand.conversionRatePercent <= 100,
      'Conversion rate percentage is strictly within [0, 100]',
      `Rate: ${overview.demand.conversionRatePercent}%`);

    // Verify Data Provenance
    assert(overview.dataProvenance && overview.dataProvenance.primarySource === 'QUICK_LOCAL_DATABASE',
      'Data provenance explicitly labels QUICK local database (no fabricated ERP data)',
      `Source: ${overview.dataProvenance?.primarySource}`);

    // -------------------------------------------------------------------------
    // TEST 3: Temporal Analysis & Payment Method Granularities
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 3: Temporal Analysis & Granularities ---');
    const granularities = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'];

    for (const g of granularities) {
      const trendRes = await request(`${API_BASE}/bi/sales-trends?granularity=${g}&range=all`);
      assert(trendRes.statusCode === 200, `GET /api/bi/sales-trends [${g}] returns HTTP 200`);
      const trendData = JSON.parse(trendRes.body);
      assert(Array.isArray(trendData.points) && trendData.points.length > 0,
        `Granularity [${g}] produces non-empty temporal aggregation points`,
        `Points count: ${trendData.points?.length}`);

      // Verify that points have valid structure
      const sample = trendData.points[0];
      assert(sample.period && sample.salesVolume !== undefined && sample.salesRevenue !== undefined,
        `Granularity [${g}] point contains valid period, volume, and revenue`);
    }

    // Verify Payment Split
    const monthlyTrendsRes = await request(`${API_BASE}/bi/sales-trends?granularity=monthly`);
    const monthlyTrends = JSON.parse(monthlyTrendsRes.body);
    assert(monthlyTrends.paymentSplit && typeof monthlyTrends.paymentSplit === 'object',
      'Payment method distribution is returned as an object');
    const totalSplitPct = Object.values(monthlyTrends.paymentSplit).reduce((a, b) => a + b, 0);
    assert(Math.round(totalSplitPct) === 100,
      'Payment method distribution percentages sum to 100%',
      `Sum: ${totalSplitPct}%`);

    // -------------------------------------------------------------------------
    // TEST 4: Fair Showroom Benchmarking & Normalization Formula
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 4: Fair Showroom Benchmarking & Normalization ---');
    const showroomRes = await request(`${API_BASE}/bi/showroom-performance`);
    assert(showroomRes.statusCode === 200, 'GET /api/bi/showroom-performance returns HTTP 200');
    const showroomData = JSON.parse(showroomRes.body);

    assert(showroomData.totalShowrooms === 80,
      'All 80 national showrooms are evaluated and ranked',
      `Total: ${showroomData.totalShowrooms}`);
    assert(Array.isArray(showroomData.rankings) && showroomData.rankings.length === 80,
      'Showroom rankings array has exactly 80 items');

    // Verify ranking monotonicity & normalized scores (0 to 100)
    let isMonotonic = true;
    let scoresWithinBounds = true;
    for (let i = 0; i < showroomData.rankings.length; i++) {
      const item = showroomData.rankings[i];
      if (item.normalizedScore < 0 || item.normalizedScore > 100) {
        scoresWithinBounds = false;
      }
      if (i > 0 && showroomData.rankings[i - 1].normalizedScore < item.normalizedScore) {
        isMonotonic = false;
      }
    }
    assert(scoresWithinBounds, 'All showroom efficiency scores are within [0, 100]');
    assert(isMonotonic, 'Showroom rankings are strictly sorted in descending order of efficiency score');

    // Verify Tier Classification
    const tiers = new Set(showroomData.rankings.map(s => s.tier));
    assert(tiers.has('Top Performer') || tiers.has('Équilibré'),
      'Showroom tiers include Top Performer and/or Équilibré classifications');

    // -------------------------------------------------------------------------
    // TEST 5: Demand Intelligence & Stockout Risk Detection
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 5: Demand Intelligence & Stockout Risk ---');
    const demandRes = await request(`${API_BASE}/bi/demand-intelligence`);
    assert(demandRes.statusCode === 200, 'GET /api/bi/demand-intelligence returns HTTP 200');
    const demandData = JSON.parse(demandRes.body);

    assert(Array.isArray(demandData.modelStats) && demandData.modelStats.length > 0,
      'Model demand performance contains evaluated models',
      `Count: ${demandData.modelStats?.length}`);
    assert(demandData.funnel && demandData.funnel.stage1_collected >= demandData.funnel.stage3_salesFulfilled,
      'Demand funnel shows realistic stage drop-off (collected >= fulfilled)',
      `Collected: ${demandData.funnel.stage1_collected}, Fulfilled: ${demandData.funnel.stage3_salesFulfilled}`);

    const hasTension = demandData.modelStats.some(m => m.tensionIndex >= 1.0);
    assert(hasTension, 'Model demand tension properly identifies high-tension models (tensionIndex >= 1.0)');

    // -------------------------------------------------------------------------
    // TEST 6: Regional Filters & Edge Case Resilience
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 6: Regional Filters & Edge Case Resilience ---');
    const regions = ['CENTRE', 'EST', 'OUEST', 'SUD'];

    for (const r of regions) {
      const regRes = await request(`${API_BASE}/bi/showroom-performance?region=${r}`);
      assert(regRes.statusCode === 200, `GET /api/bi/showroom-performance?region=${r} returns HTTP 200`);
      const regData = JSON.parse(regRes.body);
      assert(regData.totalShowrooms > 0, `Region ${r} contains active showrooms (${regData.totalShowrooms})`);
    }

    // Invalid filter test (resilience)
    const invalidFilterRes = await request(`${API_BASE}/bi/overview?region=NON_EXISTENT_REGION`);
    assert(invalidFilterRes.statusCode === 200, 'Invalid region filter handled gracefully without crashing');

    // -------------------------------------------------------------------------
    // TEST 7: Executive Report Export Endpoints (CSV & JSON)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 7: Executive Report Exports ---');
    const csvExportRes = await request(`${API_BASE}/bi/reports/export?format=csv`);
    assert(csvExportRes.statusCode === 200, 'GET /api/bi/reports/export?format=csv returns HTTP 200');
    assert(csvExportRes.headers['content-type'].includes('text/csv'),
      'Export returns Content-Type: text/csv');
    assert(csvExportRes.body.includes('RAPPORT EXECUTIF DE BUSINESS INTELLIGENCE'),
      'CSV contains executive BI header and title');
    assert(csvExportRes.body.includes('BENCHMARKING DES SHOWROOMS'),
      'CSV contains showroom benchmarking section');

    const jsonExportRes = await request(`${API_BASE}/bi/reports/export?format=json`);
    assert(jsonExportRes.statusCode === 200, 'GET /api/bi/reports/export?format=json returns HTTP 200');
    const jsonExport = JSON.parse(jsonExportRes.body);
    assert(jsonExport.overview && jsonExport.showroomRankings && jsonExport.demandIntelligence,
      'JSON export contains complete consolidated BI intelligence payload');

    // -------------------------------------------------------------------------
    // TEST 8: Full Regression Verification (Phases 1, 2, 3)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 8: Regression Tests (Phases 1, 2, 3) ---');
    // Phase 1: Security & Auth endpoints
    const authRes = await request(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bad@vms.dz', password: 'bad' })
    });
    assert(authRes.statusCode === 404 || authRes.statusCode === 401, 'Phase 1: Unauthorized login properly rejected with HTTP 404/401');

    // Phase 2: Compte Global Engine
    const cgRes = await request(`${API_BASE}/compte-global/opportunities`);
    assert(cgRes.statusCode === 200, 'Phase 2: Compte Global recommendation engine returns HTTP 200');
    const cgData = JSON.parse(cgRes.body);
    assert(Array.isArray(cgData) && cgData.length > 0, 'Phase 2: Recommendations array preserved and functional');

    // Phase 3: Odoo ERP Gateway
    const odooRes = await request(`${API_BASE}/odoo/status`);
    assert(odooRes.statusCode === 200, 'Phase 3: Odoo ERP status endpoint returns HTTP 200');
    const odooData = JSON.parse(odooRes.body);
    assert(odooData.connection && odooData.dataOwnership, 'Phase 3: Odoo integration state preserved and intact');

    console.log('\n=============================================================================');
    console.log(`📊 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round(passedTests / totalTests * 100)}%)`);
    console.log('=============================================================================');

    if (passedTests === totalTests) {
      console.log('🎉 ALL PHASE 4 BUSINESS INTELLIGENCE TESTS PASSED FLAWLESSLY!\n');
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
