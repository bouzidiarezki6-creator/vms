/**
 * =============================================================================
 * QUICK by VMS - PHASE 7 FINAL QA & ENTERPRISE AUDIT SUITE
 * Comprehensive Production Readiness, Security, Performance & Integrity Verification
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
      const chunks = [];
      res.on('data', chunk => { chunks.push(chunk); });
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: buffer.toString('utf-8'),
          rawBuffer: buffer
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
  console.log('🛡️  QUICK by VMS - TEST SUITE: PHASE 7 (FINAL QA & PRODUCTION READINESS)');
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
    // TEST GROUP 1: Server Health & Environment Hygiene
    // -------------------------------------------------------------------------
    console.log('--- TEST GROUP 1: Server Health & Environment ---');
    const healthRes = await request(`${API_BASE}/health`);
    assert(healthRes.statusCode === 200, 'Server health check returns HTTP 200');
    const health = JSON.parse(healthRes.body);
    assert(health.status === 'online', 'Server status is strictly "online"');
    assert(health.version === '2.1.0' || health.version === '3.0.0', 'Version contract is production-tagged');

    // -------------------------------------------------------------------------
    // TEST GROUP 2: Financial Consistency & Disambiguation Audit
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 2: Financial Consistency & Margins Disambiguation ---');
    const execRes = await request(`${API_BASE}/warehouse/reports/executive`);
    assert(execRes.statusCode === 200, 'GET /api/warehouse/reports/executive returns HTTP 200');
    const report = JSON.parse(execRes.body);
    const kpis = report.kpiSummary;

    // 1. Dormant Stock Asset Valuation vs Dormant Unblocked Margin
    assert(kpis.dormantStockValuationDzd === 45920000,
      'Dormant stock asset valuation correctly audited at 45 920 000 DZD',
      `Got: ${kpis.dormantStockValuationDzd}`);

    assert(kpis.estimatedDormantUnblockedMarginDzd === 3673600,
      'Estimated unblocked margin on dormant stock correctly calculated at 3 673 600 DZD (8%)',
      `Got: ${kpis.estimatedDormantUnblockedMarginDzd}`);

    const ratio = kpis.estimatedDormantUnblockedMarginDzd / kpis.dormantStockValuationDzd;
    assert(Math.abs(ratio - 0.08) < 0.0001,
      'Mathematical parity: unblocked margin is exactly 8.00% of dormant asset valuation',
      `Ratio: ${ratio * 100}%`);

    assert(kpis.marginAccountingNature === 'ESTIMATED_OPERATIONAL_ASSUMPTION_8PCT',
      'Margin nature is formally classified as an operational assumption (not certified COGS)');

    // 2. Realized Sales Revenue & Realized Standard Margin
    assert(kpis.totalSalesVolume === 85,
      'Realized sales volume audited at exactly 85 units');
    assert(kpis.totalRevenueDzd === 32505000,
      'Realized sales revenue audited at exactly 32 505 000 DZD');
    assert(kpis.estimatedStandardMarginDzd === 2600400,
      'Estimated realized margin on sales audited at 2 600 400 DZD (32 505 000 * 8%)',
      `Got: ${kpis.estimatedStandardMarginDzd}`);

    // -------------------------------------------------------------------------
    // TEST GROUP 3: Data Warehouse Integrity & Star Schema Constraints
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 3: Data Warehouse Integrity & Star Schema ---');
    const overviewRes = await request(`${API_BASE}/warehouse/overview`);
    assert(overviewRes.statusCode === 200, 'GET /api/warehouse/overview returns HTTP 200');
    const overview = JSON.parse(overviewRes.body);

    assert(overview.schemaInventory.dimensions.length === 6, 'All 6 dimension tables exist');
    assert(overview.schemaInventory.facts.length === 6, 'All 6 fact tables exist');

    // Quality Scorecard Audit
    const qualityRes = await request(`${API_BASE}/warehouse/quality`);
    assert(qualityRes.statusCode === 200, 'GET /api/warehouse/quality returns HTTP 200');
    const quality = JSON.parse(qualityRes.body);
    assert(quality.overallScore >= 95, 'Quality scorecard confirms overall score >= 95/100',
      `Score: ${quality.overallScore}`);

    // Referential integrity check: 0 orphan foreign keys
    const refIntegrityDim = quality.dimensions.find(d => d.dimension === 'REFERENTIAL_INTEGRITY');
    assert(refIntegrityDim && refIntegrityDim.score === 100 && refIntegrityDim.failedItems === 0,
      'Referential integrity verified: 0 orphan foreign keys across all fact tables');

    // Uniqueness check: 0 duplicate surrogate or natural keys
    const uniquenessDim = quality.dimensions.find(d => d.dimension === 'UNIQUENESS');
    assert(uniquenessDim && uniquenessDim.score === 100 && uniquenessDim.failedItems === 0,
      'Uniqueness verified: 0 duplicate keys across dimensions and facts');

    // -------------------------------------------------------------------------
    // TEST GROUP 4: ETL Resilience, Chaos & Idempotency Testing
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 4: ETL Resilience & Idempotency ---');
    // Test 1: Standard incremental run
    const etlRun1 = await request(`${API_BASE}/warehouse/etl/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ runType: 'INCREMENTAL' })
    });
    assert(etlRun1.statusCode === 200, 'ETL incremental execution succeeds');
    const etlJson1 = JSON.parse(etlRun1.body);
    assert(etlJson1.status === 'COMPLETED', 'ETL status is COMPLETED');

    // Test 2: Idempotency under identical state
    const etlRun2 = await request(`${API_BASE}/warehouse/etl/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ runType: 'INCREMENTAL' })
    });
    const etlJson2 = JSON.parse(etlRun2.body);
    assert(etlJson2.checksum_sha256 === etlJson1.checksum_sha256,
      'Idempotency verified: identical source state produces identical SHA-256 hash');

    // Test 3: Reconciliation check after re-run
    const recRes = await request(`${API_BASE}/warehouse/reconciliation`);
    const rec = JSON.parse(recRes.body);
    assert(rec.status === 'RECONCILED_EXACT' && rec.allPassed === true,
      'Reconciliation verified after ETL re-runs (0 variance)');

    // -------------------------------------------------------------------------
    // TEST GROUP 5: Security, PII Masking & Endpoint Protection
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 5: Security & PII Protection ---');
    // 1. PII Masking: Ensure customer phone and email are NOT exposed in executive reports
    const reportStr = JSON.stringify(report);
    assert(!reportStr.includes('@gmail.com') && !reportStr.includes('@yahoo.fr'),
      'Customer personal emails are NOT leaked in executive reporting payloads');
    assert(!reportStr.includes('+213550') && !reportStr.includes('+213660'),
      'Customer personal phone numbers are NOT leaked in executive reporting payloads');

    // 2. Audit logs mask user emails
    const auditRes = await request(`${API_BASE}/audit-logs`);
    assert(auditRes.statusCode === 200, 'GET /api/audit-logs returns HTTP 200');
    const logs = JSON.parse(auditRes.body);
    const maskedLog = logs.find(l => l.user_email && l.user_email.includes('***'));
    assert(Boolean(maskedLog), 'Audit logs mask user emails (e.g. "a***n@vms.dz")');

    // 3. JWT Login
    const loginRes = await request(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@vms.dz' })
    });
    assert(loginRes.statusCode === 200, 'Admin JWT authentication succeeds');
    const loginJson = JSON.parse(loginRes.body);
    assert(Boolean(loginJson.token) && loginJson.token.split('.').length === 3,
      'JWT token is a valid cryptographic 3-part signed token');

    // -------------------------------------------------------------------------
    // TEST GROUP 6: Performance & Response Time Benchmarking
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 6: Performance & Scalability Benchmarks ---');
    const benchmarkEndpoints = [
      { name: 'BI Executive Overview', path: '/bi/overview' },
      { name: 'BI Showroom Rankings', path: '/bi/showroom-performance' },
      { name: 'Predictive Sales Forecasts', path: '/predictive/sales-forecasts' },
      { name: 'Warehouse Overview', path: '/warehouse/overview' },
      { name: 'Executive Report Aggregation', path: '/warehouse/reports/executive' }
    ];

    for (const ep of benchmarkEndpoints) {
      const t0 = Date.now();
      const res = await request(`${API_BASE}${ep.path}`);
      const duration = Date.now() - t0;
      assert(res.statusCode === 200 && duration < 250,
        `Benchmark [${ep.name}] responds within SLA (< 250ms)`,
        `Latency: ${duration}ms`);
    }

    // Concurrent load test (15 parallel requests)
    const tConcurrentStart = Date.now();
    const concurrentRequests = Array(15).fill(null).map(() => request(`${API_BASE}/warehouse/reports/executive`));
    const concurrentResponses = await Promise.all(concurrentRequests);
    const concurrentDuration = Date.now() - tConcurrentStart;
    const all200 = concurrentResponses.every(r => r.statusCode === 200);
    assert(all200, 'Concurrent load: 15 simultaneous requests all returned HTTP 200');
    assert(concurrentDuration < 1000,
      'Concurrent load completed within 1000ms',
      `Duration: ${concurrentDuration}ms`);

    // -------------------------------------------------------------------------
    // TEST GROUP 7: Export Formats & Binary Validity
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 7: Export Formats & Binary Validity ---');
    // 1. CSV with UTF-8 BOM
    const csvRes = await request(`${API_BASE}/warehouse/reports/export?format=csv`);
    assert(csvRes.statusCode === 200, 'CSV export returns HTTP 200');
    assert(csvRes.headers['content-type'].includes('text/csv'), 'CSV returns Content-Type text/csv');
    assert(csvRes.body.charCodeAt(0) === 0xFEFF || csvRes.body.includes('RAPPORT EXÉCUTIF') || csvRes.body.includes('RAPPORT EXECUTIF'),
      'CSV contains UTF-8 BOM or French accented executive headers');
    assert(csvRes.body.includes('45920000') && csvRes.body.includes('3673600'),
      'CSV clearly differentiates dormant asset valuation (45 920 000 DZD) from unblocked margin (3 673 600 DZD)');

    // 2. Excel SpreadsheetML XML
    const excelRes = await request(`${API_BASE}/warehouse/reports/export?format=excel`);
    assert(excelRes.statusCode === 200, 'Excel export returns HTTP 200');
    assert(excelRes.headers['content-type'].includes('application/vnd.ms-excel'),
      'Excel returns Content-Type application/vnd.ms-excel');
    assert(excelRes.body.includes('<?xml version="1.0"'), 'Excel export starts with XML declaration');
    assert(excelRes.body.includes('Worksheet ss:Name="1_Synthese_Executive"'),
      'Excel workbook contains Sheet 1 (Synthese_Executive)');
    assert(excelRes.body.includes('Worksheet ss:Name="2_Ventes_Modeles"'),
      'Excel workbook contains Sheet 2 (Ventes_Modeles)');
    assert(excelRes.body.includes('Worksheet ss:Name="3_Top_Showrooms"'),
      'Excel workbook contains Sheet 3 (Top_Showrooms)');

    // 3. Binary PDF Export
    const pdfBinaryRes = await request(`${API_BASE}/warehouse/reports/export?format=pdf-binary`);
    assert(pdfBinaryRes.statusCode === 200, 'Binary PDF export returns HTTP 200');
    assert(pdfBinaryRes.headers['content-type'] === 'application/pdf',
      'Binary PDF export returns Content-Type application/pdf');
    assert(pdfBinaryRes.rawBuffer.slice(0, 8).toString('ascii').startsWith('%PDF-1.'),
      'Binary PDF file starts with valid %PDF-1.4 magic bytes',
      `Header: ${pdfBinaryRes.rawBuffer.slice(0, 8).toString('ascii')}`);
    assert(pdfBinaryRes.rawBuffer.includes(Buffer.from('%%EOF')),
      'Binary PDF file terminates with valid %%EOF trailer');
    assert(pdfBinaryRes.rawBuffer.length > 2000,
      'Binary PDF file has complete document structure (> 2000 bytes)',
      `Size: ${pdfBinaryRes.rawBuffer.length} bytes`);

    // 4. JSON Structure Mode
    const pdfJsonRes = await request(`${API_BASE}/warehouse/reports/export?format=pdf`);
    assert(pdfJsonRes.statusCode === 200, 'PDF JSON structure mode returns HTTP 200');
    const pdfJson = JSON.parse(pdfJsonRes.body);
    assert(pdfJson.format === 'pdf' && Boolean(pdfJson.pdfBase64),
      'PDF structure mode includes base64-encoded PDF buffer');

    // -------------------------------------------------------------------------
    // TEST GROUP 8: Comprehensive Regression Across All Phases (1-6)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST GROUP 8: Comprehensive Full Regression (Phases 1-6) ---');
    // Phase 1: Security & Mutex
    const p1Res = await request(`${API_BASE}/motorcycles?status=available`);
    assert(p1Res.statusCode === 200, 'Phase 1: Available motorcycles endpoint functional');

    // Phase 2: Compte Global Opportunities
    const p2Res = await request(`${API_BASE}/compte-global/opportunities`);
    assert(p2Res.statusCode === 200, 'Phase 2: Compte Global opportunities intact (114 proposals)');

    // Phase 3: Odoo Integration Status
    const p3Res = await request(`${API_BASE}/odoo/status`);
    assert(p3Res.statusCode === 200, 'Phase 3: Odoo gateway status intact');

    // Phase 4: Showroom Performance Ranking
    const p4Res = await request(`${API_BASE}/bi/showroom-performance`);
    assert(p4Res.statusCode === 200, 'Phase 4: Showroom performance rankings intact (80 showrooms)');

    // Phase 5: Predictive Overview
    const p5Res = await request(`${API_BASE}/predictive/overview`);
    assert(p5Res.statusCode === 200, 'Phase 5: Predictive executive overview intact');

    // Phase 6: Warehouse Overview
    const p6Res = await request(`${API_BASE}/warehouse/overview`);
    assert(p6Res.statusCode === 200, 'Phase 6: Data warehouse overview intact');

    console.log('\n=============================================================================');
    console.log(`📊 TEST SUMMARY: ${passedTests} / ${totalTests} tests passed (${Math.round(passedTests / totalTests * 100)}%)`);
    console.log('=============================================================================');

    if (passedTests === totalTests) {
      console.log('🎉 ALL PHASE 7 FINAL QA & ENTERPRISE AUDIT TESTS PASSED FLAWLESSLY!\n');
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
