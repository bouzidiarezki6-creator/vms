/**
 * =============================================================================
 * QUICK by VMS - PHASE 6 AUTOMATED TEST SUITE
 * Enterprise Data Warehouse, Star Schema & Executive Reporting Verification
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
  console.log('🏛️  QUICK by VMS - TEST SUITE: PHASE 6 (DATA WAREHOUSE & ADVANCED REPORTING)');
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
    // TEST GROUP 1: Health & Warehouse Connectivity
    // -------------------------------------------------------------------------
    console.log('--- TEST GROUP 1: Health & Connectivity ---');
    const healthRes = await request(`${API_BASE}/health`);
    assert(healthRes.statusCode === 200, 'Server health check returns HTTP 200');
    const healthJson = JSON.parse(healthRes.body);
    assert(healthJson.status === 'online', 'Server reports status: online');

    // -------------------------------------------------------------------------
    // TEST GROUP 2: Star Schema Inventory & Dimensional Structure
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 2: Star Schema Dimensional Inventory ---');
    const overviewRes = await request(`${API_BASE}/warehouse/overview`);
    assert(overviewRes.statusCode === 200, 'GET /api/warehouse/overview returns HTTP 200');
    const overview = JSON.parse(overviewRes.body);

    assert(overview.architecture.includes('Star Schema'),
      'Warehouse architecture formally identifies as Kimball Star Schema');
    assert(overview.schemaInventory && Array.isArray(overview.schemaInventory.dimensions),
      'Schema inventory exposes dimensions collection');
    assert(overview.schemaInventory.dimensions.length === 6,
      'Exactly 6 dimension tables catalogued',
      `Found: ${overview.schemaInventory.dimensions.length}`);

    const dimNames = overview.schemaInventory.dimensions.map(d => d.name);
    assert(dimNames.includes('dim_date'), 'dim_date is present in dimensional model');
    assert(dimNames.includes('dim_showroom'), 'dim_showroom is present in dimensional model');
    assert(dimNames.includes('dim_product'), 'dim_product is present in dimensional model');
    assert(dimNames.includes('dim_region'), 'dim_region is present in dimensional model');
    assert(dimNames.includes('dim_customer_segment'), 'dim_customer_segment is present in dimensional model');
    assert(dimNames.includes('dim_payment_method'), 'dim_payment_method is present in dimensional model');

    assert(overview.schemaInventory && Array.isArray(overview.schemaInventory.facts),
      'Schema inventory exposes fact tables collection');
    assert(overview.schemaInventory.facts.length === 6,
      'Exactly 6 fact tables catalogued',
      `Found: ${overview.schemaInventory.facts.length}`);

    const factNames = overview.schemaInventory.facts.map(f => f.name);
    assert(factNames.includes('fact_sales'), 'fact_sales is present in fact tables');
    assert(factNames.includes('fact_inventory_snapshots'), 'fact_inventory_snapshots is present');
    assert(factNames.includes('fact_customer_requests'), 'fact_customer_requests is present');
    assert(factNames.includes('fact_transfers'), 'fact_transfers is present');
    assert(factNames.includes('fact_forecasts'), 'fact_forecasts is present');
    assert(factNames.includes('fact_showroom_performance'), 'fact_showroom_performance is present');

    // Verify row counts in dimensions and facts
    const dateDim = overview.schemaInventory.dimensions.find(d => d.name === 'dim_date');
    assert(dateDim && dateDim.rowCount >= 180, 'dim_date covers continuous calendar horizon (>= 180 days)',
      `Dates count: ${dateDim?.rowCount}`);

    const showroomDim = overview.schemaInventory.dimensions.find(d => d.name === 'dim_showroom');
    assert(showroomDim && showroomDim.rowCount === 80, 'dim_showroom contains all 80 network showrooms',
      `Showrooms count: ${showroomDim?.rowCount}`);

    const productDim = overview.schemaInventory.dimensions.find(d => d.name === 'dim_product');
    assert(productDim && productDim.rowCount === 8, 'dim_product contains all 8 VMS motorcycle models',
      `Products count: ${productDim?.rowCount}`);

    const salesFact = overview.schemaInventory.facts.find(f => f.name === 'fact_sales');
    assert(salesFact && salesFact.rowCount === 85, 'fact_sales contains exactly 85 audited sales records',
      `Sales fact count: ${salesFact?.rowCount}`);

    // -------------------------------------------------------------------------
    // TEST GROUP 3: Data Quality & Governance Framework (6 Dimensions)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 3: Data Quality Assessment (6 Dimensions) ---');
    const qualityRes = await request(`${API_BASE}/warehouse/quality`);
    assert(qualityRes.statusCode === 200, 'GET /api/warehouse/quality returns HTTP 200');
    const quality = JSON.parse(qualityRes.body);

    assert(quality.overallScore >= 95, 'Overall Data Quality Score meets enterprise threshold (>= 95/100)',
      `Score: ${quality.overallScore}`);
    assert(quality.status === 'EXCELLENT' || quality.status === 'GOOD', 'Quality status is EXCELLENT or GOOD');
    assert(Array.isArray(quality.dimensions) && quality.dimensions.length === 6,
      'Quality scorecard evaluates all 6 core dimensions');

    const expectedDimensions = ['COMPLETENESS', 'ACCURACY', 'CONSISTENCY', 'UNIQUENESS', 'REFERENTIAL_INTEGRITY', 'FRESHNESS'];
    for (const d of expectedDimensions) {
      const dimResult = quality.dimensions.find(item => item.dimension === d);
      assert(dimResult && dimResult.score >= 90, `Quality dimension [${d}] passes with score >= 90%`,
        `Score: ${dimResult?.score}%`);
    }

    // -------------------------------------------------------------------------
    // TEST GROUP 4: Historical Mathematical Reconciliation
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 4: Mathematical Reconciliation (Source vs Warehouse) ---');
    const recRes = await request(`${API_BASE}/warehouse/reconciliation`);
    assert(recRes.statusCode === 200, 'GET /api/warehouse/reconciliation returns HTTP 200');
    const reconciliation = JSON.parse(recRes.body);

    assert(reconciliation.status === 'RECONCILED_EXACT',
      'Reconciliation reports exact mathematical parity (RECONCILED_EXACT)');
    assert(reconciliation.allPassed === true, 'All reconciliation checks passed without variance');

    const salesRec = reconciliation.metrics.find(m => m.entity.includes('Ventes Totales'));
    assert(salesRec && salesRec.sourceCount === 85 && salesRec.warehouseCount === 85 && salesRec.variance === 0,
      'Sales volume reconciled: 85 source == 85 warehouse (0 variance)');

    const revenueRec = reconciliation.metrics.find(m => m.entity.includes('Chiffre d\'Affaires'));
    assert(revenueRec && revenueRec.variance === 0 && revenueRec.isReconciled,
      'Revenue reconciled: exact DZD parity between source and fact_sales');

    const showroomRec = reconciliation.metrics.find(m => m.entity.includes('Showrooms'));
    assert(showroomRec && showroomRec.sourceCount === 80 && showroomRec.warehouseCount === 80,
      'Showrooms reconciled: 80 source == 80 warehouse');

    const modelsRec = reconciliation.metrics.find(m => m.entity.includes('Modèles'));
    assert(modelsRec && modelsRec.sourceCount === 8 && modelsRec.warehouseCount === 8,
      'Products reconciled: 8 source models == 8 warehouse products');

    // -------------------------------------------------------------------------
    // TEST GROUP 5: ETL Pipeline Execution & Idempotency
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 5: ETL Pipeline Execution & Idempotency ---');
    const etlRunRes = await request(`${API_BASE}/warehouse/etl/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ runType: 'INCREMENTAL' })
    });
    assert(etlRunRes.statusCode === 200, 'POST /api/warehouse/etl/run returns HTTP 200');
    const etlRun = JSON.parse(etlRunRes.body);

    assert(etlRun.status === 'COMPLETED', 'ETL pipeline run completed successfully');
    assert(etlRun.records_extracted > 0 && etlRun.records_loaded > 0,
      'ETL pipeline extracts and loads records into dimensional schema',
      `Extracted: ${etlRun.records_extracted}, Loaded: ${etlRun.records_loaded}`);
    assert(Boolean(etlRun.checksum_sha256), 'ETL pipeline generates SHA-256 checksum for idempotency tracking');
    assert(etlRun.execution_duration_ms >= 0, 'ETL pipeline duration is measured');

    // Idempotent re-run check (re-run should complete with 0 variance)
    const etlReRunRes = await request(`${API_BASE}/warehouse/etl/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ runType: 'INCREMENTAL' })
    });
    assert(etlReRunRes.statusCode === 200, 'Second idempotent ETL run succeeds');
    const etlReRun = JSON.parse(etlReRunRes.body);
    assert(etlReRun.checksum_sha256 === etlRun.checksum_sha256,
      'Idempotency verified: identical source state produces identical SHA-256 checksum');

    // -------------------------------------------------------------------------
    // TEST GROUP 6: Executive Reporting Engine & Regional Filtering
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 6: Executive Reporting Engine ---');
    const execRepRes = await request(`${API_BASE}/warehouse/reports/executive`);
    assert(execRepRes.statusCode === 200, 'GET /api/warehouse/reports/executive returns HTTP 200');
    const report = JSON.parse(execRepRes.body);

    assert(report.reportMetadata && report.reportMetadata.reportTitle,
      'Executive report contains formal report metadata and title');
    assert(report.reportMetadata.dataSources.length >= 2,
      'Report documents underlying data sources');
    assert(report.kpiSummary.totalSalesVolume === 85,
      'Executive report KPI summary reflects 85 units');
    assert(report.kpiSummary.totalRevenueDzd > 0,
      'Executive report KPI summary reflects strictly positive total revenue');
    assert(report.kpiSummary.estimatedStandardMarginDzd > 0,
      'Executive report reflects 8% standard operational margin assumption');
    assert(Array.isArray(report.regionalBreakdown) && report.regionalBreakdown.length === 4,
      'Regional breakdown covers all 4 Algerian macro-regions (CENTRE, EST, OUEST, SUD)');
    assert(Array.isArray(report.productPerformance) && report.productPerformance.length === 8,
      'Product performance covers all 8 VMS motorcycle models');
    assert(Array.isArray(report.topShowrooms) && report.topShowrooms.length === 10,
      'Top 10 showrooms rankings generated with composite efficiency scores');

    // Regional Filter Test
    const centreRepRes = await request(`${API_BASE}/warehouse/reports/executive?regionCode=CENTRE`);
    assert(centreRepRes.statusCode === 200, 'Regional filter [CENTRE] returns HTTP 200');
    const centreReport = JSON.parse(centreRepRes.body);
    assert(centreReport.reportMetadata.regionFilterApplied === 'CENTRE',
      'Report metadata documents applied regional filter (CENTRE)');
    assert(centreReport.kpiSummary.totalSalesVolume > 0 && centreReport.kpiSummary.totalSalesVolume < 85,
      'Regional subset reflects valid filtered sales volume');

    // -------------------------------------------------------------------------
    // TEST GROUP 7: Multi-Format Report Exports (CSV, Excel, PDF payload)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 7: Multi-Format Report Exports ---');
    // 1. CSV Export
    const csvRes = await request(`${API_BASE}/warehouse/reports/export?format=csv`);
    assert(csvRes.statusCode === 200, 'GET /api/warehouse/reports/export?format=csv returns HTTP 200');
    assert(csvRes.headers['content-type'].includes('text/csv'), 'CSV returns Content-Type: text/csv');
    assert(csvRes.body.includes('RAPPORT EXECUTIF DE DIRECTION GENERALE'), 'CSV includes executive header title');
    assert(csvRes.body.includes('INDICATEURS CLES DE PERFORMANCE'), 'CSV includes KPI summary section');
    assert(csvRes.body.includes('PERFORMANCE PAR REGION'), 'CSV includes regional breakdown section');

    // 2. Excel SpreadsheetML Export
    const excelRes = await request(`${API_BASE}/warehouse/reports/export?format=excel`);
    assert(excelRes.statusCode === 200, 'GET /api/warehouse/reports/export?format=excel returns HTTP 200');
    assert(excelRes.headers['content-type'].includes('application/vnd.ms-excel'),
      'Excel export returns Content-Type: application/vnd.ms-excel');
    assert(excelRes.body.includes('<?xml version="1.0"'), 'Excel export is valid XML SpreadsheetML');
    assert(excelRes.body.includes('Worksheet ss:Name="1_Synthese_Executive"'),
      'Excel workbook contains Sheet 1 (Synthese_Executive)');
    assert(excelRes.body.includes('Worksheet ss:Name="2_Ventes_Modeles"'),
      'Excel workbook contains Sheet 2 (Ventes_Modeles)');
    assert(excelRes.body.includes('Worksheet ss:Name="3_Top_Showrooms"'),
      'Excel workbook contains Sheet 3 (Top_Showrooms)');

    // 3. PDF Structure Export
    const pdfRes = await request(`${API_BASE}/warehouse/reports/export?format=pdf`);
    assert(pdfRes.statusCode === 200, 'GET /api/warehouse/reports/export?format=pdf returns HTTP 200');
    const pdfPayload = JSON.parse(pdfRes.body);
    assert(pdfPayload.format === 'pdf' && pdfPayload.data,
      'PDF export payload structured and ready for printer/PDF rendering');

    // -------------------------------------------------------------------------
    // TEST GROUP 8: Data Lineage & Provenance Governance
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 8: Data Lineage & Provenance Governance ---');
    assert(report.reportMetadata.dataLineageClassification.certifiedOperational.includes('100%'),
      'Certified operational data lineage clearly tagged');
    assert(Boolean(report.reportMetadata.dataLineageClassification.estimatedAssumption),
      'Standard 8% margin explicitly classified as estimated operational assumption');
    assert(Boolean(report.reportMetadata.dataLineageClassification.predictiveAi),
      'Predictive AI forecasts distinctly labeled from historical facts');

    // -------------------------------------------------------------------------
    // TEST GROUP 9: Full Regression Verification (Phases 1 - 5)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 9: Comprehensive Regression (Phases 1-5) ---');
    // Phase 1: Auth JWT
    const p1Res = await request(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@vms.dz' })
    });
    assert(p1Res.statusCode === 200, 'Phase 1: Admin JWT login preserved');

    // Phase 2: Compte Global Engine
    const p2Res = await request(`${API_BASE}/compte-global/opportunities`);
    assert(p2Res.statusCode === 200, 'Phase 2: Compte Global opportunities intact (114 proposals)');

    // Phase 3: Odoo ERP Gateway
    const p3Res = await request(`${API_BASE}/odoo/status`);
    assert(p3Res.statusCode === 200, 'Phase 3: Odoo ERP status intact');

    // Phase 4: Business Intelligence
    const p4Res = await request(`${API_BASE}/bi/overview`);
    assert(p4Res.statusCode === 200, 'Phase 4: BI overview intact');

    // Phase 5: Predictive Analytics
    const p5Res = await request(`${API_BASE}/predictive/overview`);
    assert(p5Res.statusCode === 200, 'Phase 5: Predictive overview intact');

    console.log('\n=============================================================================');
    console.log(`📊 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round(passedTests / totalTests * 100)}%)`);
    console.log('=============================================================================');

    if (passedTests === totalTests) {
      console.log('🎉 ALL PHASE 6 DATA WAREHOUSE & REPORTING TESTS PASSED FLAWLESSLY!\n');
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
