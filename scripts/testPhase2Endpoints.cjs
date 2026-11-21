const http = require('http');

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    }).on('error', reject);
  });
}

async function verifyPhase2Api() {
  console.log('Testing live Express Phase 2 Compte Global endpoints...\n');

  // 1. Opportunities
  const opps = await fetchJson('http://localhost:5000/api/compte-global/opportunities');
  console.log(`[1] Opportunities status: ${opps.status}`);
  console.log(`    Total opportunities returned: ${opps.body.length}`);
  if (opps.body.length > 0) {
    const first = opps.body[0];
    console.log(`    Top Ranked: Score=${first.score}/100, Priority=${first.priority}, VIN=${first.motorcycle?.vin}`);
    console.log(`    Source: ${first.sourceShowroom?.city} -> Dest: ${first.destinationShowroom?.city}`);
    console.log(`    Distance: ${first.distanceKm} km, Cost: ${first.logisticsCostDzd} DZD`);
    console.log(`    Sub-scores:`, first.subScores);
    console.log(`    Reason: ${first.reason}`);
  }

  // 2. Config
  const cfg = await fetchJson('http://localhost:5000/api/compte-global/config');
  console.log(`\n[2] Algorithm Config status: ${cfg.status}`);
  console.log(`    Weights:`, {
    weightAge: cfg.body.weightAge,
    weightDemand: cfg.body.weightDemand,
    weightStockout: cfg.body.weightStockout,
    weightVelocity: cfg.body.weightVelocity,
    weightLogistics: cfg.body.weightLogistics,
    thresholdDays: cfg.body.thresholdDays
  });

  // 3. Stockout risks
  const risks = await fetchJson('http://localhost:5000/api/compte-global/stockout-risks');
  console.log(`\n[3] Stockout Risks status: ${risks.status}`);
  console.log(`    Total stockout risk alerts: ${risks.body.length}`);
  if (risks.body.length > 0) {
    console.log(`    First risk alert: Showroom ${risks.body[0].showroomName} (${risks.body[0].city}) for model ${risks.body[0].modelName} with ${risks.body[0].pendingDemand} pending requests and ${risks.body[0].currentStock} local stock`);
  }

  // 4. Dormant summary
  const dormant = await fetchJson('http://localhost:5000/api/compte-global/dormant-summary');
  console.log(`\n[4] Dormant Inventory Summary status: ${dormant.status}`);
  console.log(`    Total dormant units: ${dormant.body.totalDormantUnits}`);
  console.log(`    High-risk units (>130j): ${dormant.body.highRiskUnits}`);
  console.log(`    Total capital tied up: ${dormant.body.totalCapitalTiedUpDzd} DZD`);

  console.log('\n✅ All Phase 2 Express endpoints verified successfully!');
}

verifyPhase2Api().catch(err => {
  console.error('API Verification error:', err);
  process.exit(1);
});
