const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function toUUID(str) {
  if (!str) return null;
  const h = crypto.createHash('md5').update(String(str)).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

function esc(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return String(val);
  return `'${String(val).replace(/'/g, "''")}'`;
}

const store = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/data/store.json'), 'utf-8'));
const outDir = path.join(__dirname, '../supabase/seeds');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// 1. PROFILES
let sqlProfiles = 'BEGIN;\n';
store.profiles.forEach(p => {
  const uuid = toUUID(p.id);
  sqlProfiles += `INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)\n` +
    `VALUES (${esc(uuid)}, ${esc(p.email)}, ${esc(p.role)}, ${esc(p.first_name)}, ${esc(p.last_name)}, ${esc(p.phone)}, ${esc(p.wilaya_code)}, TRUE, ${esc(p.created_at)})\n` +
    `ON CONFLICT (id) DO NOTHING;\n`;
});
sqlProfiles += 'COMMIT;\n';
fs.writeFileSync(path.join(outDir, '01_profiles.sql'), sqlProfiles, 'utf-8');

// 2. MOTORCYCLES PART 1 (0 to 210)
let sqlM1 = 'BEGIN;\nALTER TABLE motorcycles DISABLE TRIGGER ALL;\n';
store.motorcycles.slice(0, 210).forEach(m => {
  const uuid = toUUID(m.id);
  const modelUuid = toUUID(m.model_id);
  const showroomUuid = toUUID(m.showroom_id);
  sqlM1 += `INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)\n` +
    `VALUES (${esc(uuid)}, ${esc(modelUuid)}, ${esc(showroomUuid)}, ${esc(m.vin)}, ${esc(m.color)}, ${esc(m.engine_specs)}, ${esc(m.acquisition_date)}, ${esc(m.arrival_date)}, ${esc(m.status)}, ${esc(m.notes)}, ${esc(m.sale_date)}, ${esc(m.created_at)})\n` +
    `ON CONFLICT (vin) DO NOTHING;\n`;
});
sqlM1 += 'ALTER TABLE motorcycles ENABLE TRIGGER ALL;\nCOMMIT;\n';
fs.writeFileSync(path.join(outDir, '02_motorcycles_1.sql'), sqlM1, 'utf-8');

// 3. MOTORCYCLES PART 2 (210 to 420)
let sqlM2 = 'BEGIN;\nALTER TABLE motorcycles DISABLE TRIGGER ALL;\n';
store.motorcycles.slice(210).forEach(m => {
  const uuid = toUUID(m.id);
  const modelUuid = toUUID(m.model_id);
  const showroomUuid = toUUID(m.showroom_id);
  sqlM2 += `INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)\n` +
    `VALUES (${esc(uuid)}, ${esc(modelUuid)}, ${esc(showroomUuid)}, ${esc(m.vin)}, ${esc(m.color)}, ${esc(m.engine_specs)}, ${esc(m.acquisition_date)}, ${esc(m.arrival_date)}, ${esc(m.status)}, ${esc(m.notes)}, ${esc(m.sale_date)}, ${esc(m.created_at)})\n` +
    `ON CONFLICT (vin) DO NOTHING;\n`;
});
sqlM2 += 'ALTER TABLE motorcycles ENABLE TRIGGER ALL;\nCOMMIT;\n';
fs.writeFileSync(path.join(outDir, '03_motorcycles_2.sql'), sqlM2, 'utf-8');

// 4. REQUESTS (260 requests)
let sqlReq = 'BEGIN;\nALTER TABLE customer_requests DISABLE TRIGGER ALL;\n';
store.requests.forEach(r => {
  const uuid = toUUID(r.id);
  const modelUuid = toUUID(r.motorcycle_model_id);
  const showroomUuid = r.matched_showroom_id ? esc(toUUID(r.matched_showroom_id)) : 'NULL';
  sqlReq += `INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)\n` +
    `VALUES (${esc(uuid)}, ${esc(r.reference)}, ${esc(r.first_name)}, ${esc(r.last_name)}, ${esc(r.phone)}, ${esc(r.phone_normalized)}, ${esc(r.email)}, ${esc(modelUuid)}, ${esc(r.wilaya_code)}, ${esc(r.city)}, ${esc(r.status)}, ${showroomUuid}, ${esc(r.notified_at)}, ${esc(r.fulfilled_at)}, ${esc(r.notes)}, ${esc(r.created_at)})\n` +
    `ON CONFLICT (reference) DO NOTHING;\n`;
});
sqlReq += 'ALTER TABLE customer_requests ENABLE TRIGGER ALL;\nCOMMIT;\n';
fs.writeFileSync(path.join(outDir, '04_requests.sql'), sqlReq, 'utf-8');

// 5. TRANSFERS & SALES
let sqlTS = 'BEGIN;\n';
store.transfers.forEach(t => {
  const uuid = toUUID(t.id);
  const motoUuid = toUUID(t.motorcycle_id);
  const srcShwUuid = toUUID(t.source_showroom_id);
  const dstShwUuid = toUUID(t.destination_showroom_id);
  sqlTS += `INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)\n` +
    `VALUES (${esc(uuid)}, ${esc(t.reference)}, ${esc(motoUuid)}, ${esc(srcShwUuid)}, ${esc(dstShwUuid)}, ${esc(t.status)}, ${esc(t.reason)}, ${t.stock_age_at_request || 95}, ${esc(t.approved_at)}, ${esc(t.received_at)}, ${esc(t.created_at)})\n` +
    `ON CONFLICT (reference) DO NOTHING;\n`;
});
store.sales.forEach(s => {
  const uuid = toUUID(s.id);
  const motoUuid = toUUID(s.motorcycle_id);
  const shwUuid = toUUID(s.showroom_id);
  sqlTS += `INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)\n` +
    `VALUES (${esc(uuid)}, ${esc(s.reference)}, ${esc(motoUuid)}, ${esc(shwUuid)}, ${esc(s.customer_name)}, ${esc(s.customer_phone)}, ${s.sale_price}, ${esc(s.payment_method)}, ${esc(s.sale_date)}, ${esc(s.notes)}, ${esc(s.created_at)})\n` +
    `ON CONFLICT (reference) DO NOTHING;\n`;
});
sqlTS += 'COMMIT;\n';
fs.writeFileSync(path.join(outDir, '05_transfers_sales.sql'), sqlTS, 'utf-8');

console.log('Successfully generated split seed files in supabase/seeds:');
fs.readdirSync(outDir).forEach(f => {
  const stat = fs.statSync(path.join(outDir, f));
  console.log(` - ${f}: ${(stat.size / 1024).toFixed(1)} KB`);
});
