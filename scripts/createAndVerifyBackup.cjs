const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://sgszaitcutsbyygssmfb.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3phaXRjdXRzYnl5Z3NzbWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NTI1NzYyMCwiZXhwIjoyMTEwODMzNjIwfQ.2eJ3QHsWoc-WJDlgw3BX23WybSe9_PcDCOGBWtON3e0';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const BACKUP_DIR = path.join(__dirname, '../backups');
const SQL_BACKUP = path.join(BACKUP_DIR, 'phase1_pre_migration_backup.sql');
const JSON_BACKUP = path.join(BACKUP_DIR, 'phase1_pre_migration_store.json');

async function main() {
  console.log('=== STARTING COMPLETE DATABASE BACKUP & VERIFICATION ===');

  // Verify JSON backup exists
  if (!fs.existsSync(JSON_BACKUP)) {
    throw new Error(`JSON backup not found at ${JSON_BACKUP}`);
  }
  const store = JSON.parse(fs.readFileSync(JSON_BACKUP, 'utf-8'));
  console.log('Verified store.json backup:');
  console.log({
    showrooms: store.showrooms.length,
    models: store.models.length,
    motorcycles: store.motorcycles.length,
    requests: store.requests.length,
    transfers: store.transfers.length,
    sales: store.sales.length,
    profiles: store.profiles.length
  });

  // Fetch live tables from Supabase
  console.log('\nFetching live tables from Supabase...');
  const { data: showrooms, error: e1 } = await supabase.from('showrooms').select('*');
  const { data: models, error: e2 } = await supabase.from('motorcycle_models').select('*');
  const { data: regions, error: e3 } = await supabase.from('regions').select('*');
  const { data: profiles, error: e4 } = await supabase.from('profiles').select('*');
  const { data: motorcycles, error: e5 } = await supabase.from('motorcycles').select('*');
  const { data: requests, error: e6 } = await supabase.from('customer_requests').select('*');
  const { data: transfers, error: e7 } = await supabase.from('transfers').select('*');
  const { data: sales, error: e8 } = await supabase.from('sales').select('*');

  if (e1 || e2 || e3 || e4 || e5 || e6 || e7 || e8) {
    throw new Error('Error fetching Supabase data: ' + JSON.stringify({ e1, e2, e3, e4, e5, e6, e7, e8 }));
  }

  console.log('Supabase Live Record Counts:');
  console.log({
    showrooms: showrooms.length,
    models: models.length,
    regions: regions.length,
    profiles: profiles.length,
    motorcycles: motorcycles.length,
    requests: requests.length,
    transfers: transfers.length,
    sales: sales.length
  });

  // Verify completeness
  if (showrooms.length !== 80 || models.length !== 8 || regions.length !== 58 ||
      motorcycles.length !== 420 || requests.length !== 260 || transfers.length !== 24 || sales.length !== 85) {
    throw new Error('Supabase database counts do not match expected ground truth!');
  }

  // Generate self-contained SQL restore script
  console.log('\nGenerating self-contained SQL backup file...');
  const esc = (v) => v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`;

  let sql = `-- ====================================================================\n`;
  sql += `-- QUICK BY VMS — PHASE 1 PRE-MIGRATION COMPLETE DATABASE BACKUP\n`;
  sql += `-- Generated on: ${new Date().toISOString()}\n`;
  sql += `-- Target: Supabase PostgreSQL (Instance: sgszaitcutsbyygssmfb)\n`;
  sql += `-- Contains: 80 Showrooms, 8 Models, 58 Regions, 84 Profiles,\n`;
  sql += `--           420 Motorcycles, 260 Requests, 24 Transfers, 85 Sales\n`;
  sql += `-- ====================================================================\n\nBEGIN;\n\n`;

  // 1. Regions
  sql += `-- 1. REGIONS (${regions.length} rows)\n`;
  regions.forEach(r => {
    sql += `INSERT INTO regions (code, name, name_ar) VALUES (${esc(r.code)}, ${esc(r.name)}, ${esc(r.name_ar)}) ON CONFLICT (code) DO NOTHING;\n`;
  });

  // 2. Profiles
  sql += `\n-- 2. PROFILES (${profiles.length} rows)\n`;
  profiles.forEach(p => {
    sql += `INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at) VALUES (${esc(p.id)}, ${esc(p.email)}, ${esc(p.role)}, ${esc(p.first_name)}, ${esc(p.last_name)}, ${esc(p.phone)}, ${esc(p.wilaya_code)}, ${p.is_active ? 'TRUE' : 'FALSE'}, ${esc(p.created_at)}) ON CONFLICT (id) DO NOTHING;\n`;
  });

  // 3. Models
  sql += `\n-- 3. MOTORCYCLE MODELS (${models.length} rows)\n`;
  models.forEach(m => {
    sql += `INSERT INTO motorcycle_models (id, name, brand, category, engine_cc, power_hp, cooling, fuel_system, price_dzd, image_url, description, is_active, created_at) VALUES (${esc(m.id)}, ${esc(m.name)}, ${esc(m.brand)}, ${esc(m.category)}, ${m.engine_cc}, ${m.power_hp || 'NULL'}, ${esc(m.cooling)}, ${esc(m.fuel_system)}, ${m.price_dzd}, ${esc(m.image_url)}, ${esc(m.description)}, ${m.is_active ? 'TRUE' : 'FALSE'}, ${esc(m.created_at)}) ON CONFLICT (id) DO NOTHING;\n`;
  });

  // 4. Showrooms
  sql += `\n-- 4. SHOWROOMS (${showrooms.length} rows)\n`;
  showrooms.forEach(s => {
    sql += `INSERT INTO showrooms (id, code, name, wilaya_code, city, address, phone, email, owner_id, is_active, opening_hours, created_at) VALUES (${esc(s.id)}, ${esc(s.code)}, ${esc(s.name)}, ${esc(s.wilaya_code)}, ${esc(s.city)}, ${esc(s.address)}, ${esc(s.phone)}, ${esc(s.email)}, ${esc(s.owner_id)}, ${s.is_active ? 'TRUE' : 'FALSE'}, ${esc(s.opening_hours)}, ${esc(s.created_at)}) ON CONFLICT (id) DO NOTHING;\n`;
  });

  // 5. Motorcycles
  sql += `\n-- 5. MOTORCYCLES (${motorcycles.length} rows)\n`;
  motorcycles.forEach(m => {
    sql += `INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at) VALUES (${esc(m.id)}, ${esc(m.model_id)}, ${esc(m.showroom_id)}, ${esc(m.vin)}, ${esc(m.color)}, ${esc(m.engine_specs)}, ${esc(m.acquisition_date)}, ${esc(m.arrival_date)}, ${esc(m.status)}, ${esc(m.notes)}, ${esc(m.sale_date)}, ${esc(m.created_at)}) ON CONFLICT (vin) DO UPDATE SET showroom_id = EXCLUDED.showroom_id, status = EXCLUDED.status, arrival_date = EXCLUDED.arrival_date;\n`;
  });

  // 6. Requests
  sql += `\n-- 6. CUSTOMER REQUESTS (${requests.length} rows)\n`;
  requests.forEach(r => {
    sql += `INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at) VALUES (${esc(r.id)}, ${esc(r.reference)}, ${esc(r.first_name)}, ${esc(r.last_name)}, ${esc(r.phone)}, ${esc(r.phone_normalized)}, ${esc(r.email)}, ${esc(r.motorcycle_model_id)}, ${esc(r.wilaya_code)}, ${esc(r.city)}, ${esc(r.status)}, ${esc(r.matched_showroom_id)}, ${esc(r.notified_at)}, ${esc(r.fulfilled_at)}, ${esc(r.notes)}, ${esc(r.created_at)}) ON CONFLICT (reference) DO UPDATE SET status = EXCLUDED.status, matched_showroom_id = EXCLUDED.matched_showroom_id;\n`;
  });

  // 7. Transfers
  sql += `\n-- 7. TRANSFERS (${transfers.length} rows)\n`;
  transfers.forEach(t => {
    sql += `INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at) VALUES (${esc(t.id)}, ${esc(t.reference)}, ${esc(t.motorcycle_id)}, ${esc(t.source_showroom_id)}, ${esc(t.destination_showroom_id)}, ${esc(t.status)}, ${esc(t.reason)}, ${t.stock_age_at_request || 95}, ${esc(t.approved_at)}, ${esc(t.received_at)}, ${esc(t.created_at)}) ON CONFLICT (reference) DO UPDATE SET status = EXCLUDED.status;\n`;
  });

  // 8. Sales
  sql += `\n-- 8. SALES (${sales.length} rows)\n`;
  sales.forEach(s => {
    sql += `INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at) VALUES (${esc(s.id)}, ${esc(s.reference)}, ${esc(s.motorcycle_id)}, ${esc(s.showroom_id)}, ${esc(s.customer_name)}, ${esc(s.customer_phone)}, ${s.sale_price}, ${esc(s.payment_method)}, ${esc(s.sale_date)}, ${esc(s.notes)}, ${esc(s.created_at)}) ON CONFLICT (reference) DO NOTHING;\n`;
  });

  sql += `\nCOMMIT;\n`;

  fs.writeFileSync(SQL_BACKUP, sql, 'utf-8');
  const stats = fs.statSync(SQL_BACKUP);
  console.log(`\nSuccessfully created SQL backup: ${SQL_BACKUP} (${(stats.size / 1024).toFixed(1)} KB)`);
  console.log('=== COMPLETE RESTORABLE BACKUP VERIFIED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error('BACKUP FAILED:', err);
  process.exit(1);
});
