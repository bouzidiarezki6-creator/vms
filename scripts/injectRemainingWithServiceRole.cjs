const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function toUUID(str) {
  if (!str) return null;
  const h = crypto.createHash('md5').update(String(str)).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

const SUPABASE_URL = 'https://sgszaitcutsbyygssmfb.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3phaXRjdXRzYnl5Z3NzbWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NTI1NzYyMCwiZXhwIjoyMTEwODMzNjIwfQ.2eJ3QHsWoc-WJDlgw3BX23WybSe9_PcDCOGBWtON3e0';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const store = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/data/store.json'), 'utf-8'));

async function main() {
  console.log('--- STARTING INJECTION VIA SUPABASE SERVICE ROLE ---');

  // 1. MOTORCYCLES (420 rows)
  console.log('1. Upserting 420 Motorcycles...');
  const motoRows = store.motorcycles.map(m => ({
    id: toUUID(m.id),
    model_id: toUUID(m.model_id),
    showroom_id: toUUID(m.showroom_id),
    vin: m.vin,
    color: m.color,
    engine_specs: m.engine_specs,
    acquisition_date: m.acquisition_date,
    arrival_date: m.arrival_date,
    status: m.status,
    notes: m.notes,
    sale_date: m.sale_date || null,
    created_at: m.created_at
  }));
  
  // Chunk in batches of 100
  for (let i = 0; i < motoRows.length; i += 100) {
    const chunk = motoRows.slice(i, i + 100);
    const { error } = await supabase.from('motorcycles').upsert(chunk, { onConflict: 'vin' });
    if (error) console.error(`Error in motorcycles batch ${i}:`, error.message);
  }
  console.log('Motorcycles upsert complete.');

  // 2. CUSTOMER REQUESTS (260 rows)
  console.log('2. Upserting 260 Customer Requests...');
  const reqRows = store.requests.map(r => ({
    id: toUUID(r.id),
    reference: r.reference,
    first_name: r.first_name,
    last_name: r.last_name,
    phone: r.phone,
    phone_normalized: r.phone_normalized,
    email: r.email,
    motorcycle_model_id: toUUID(r.motorcycle_model_id),
    wilaya_code: r.wilaya_code,
    city: r.city,
    status: r.status,
    matched_showroom_id: r.matched_showroom_id ? toUUID(r.matched_showroom_id) : null,
    notified_at: r.notified_at || null,
    fulfilled_at: r.fulfilled_at || null,
    notes: r.notes || null,
    created_at: r.created_at
  }));

  for (let i = 0; i < reqRows.length; i += 100) {
    const chunk = reqRows.slice(i, i + 100);
    const { error } = await supabase.from('customer_requests').upsert(chunk, { onConflict: 'reference' });
    if (error) console.error(`Error in customer_requests batch ${i}:`, error.message);
  }
  console.log('Customer Requests upsert complete.');

  // 3. TRANSFERS (24 rows)
  console.log('3. Upserting 24 Transfers...');
  const transferRows = store.transfers.map(t => ({
    id: toUUID(t.id),
    reference: t.reference,
    motorcycle_id: toUUID(t.motorcycle_id),
    source_showroom_id: toUUID(t.source_showroom_id),
    destination_showroom_id: toUUID(t.destination_showroom_id),
    status: t.status,
    reason: t.reason,
    stock_age_at_request: t.stock_age_at_request || 95,
    approved_at: t.approved_at || null,
    received_at: t.received_at || null,
    created_at: t.created_at
  }));
  const { error: trError } = await supabase.from('transfers').upsert(transferRows, { onConflict: 'reference' });
  if (trError) console.error('Error in transfers:', trError.message);
  console.log('Transfers upsert complete.');

  // 4. SALES (85 rows)
  console.log('4. Upserting 85 Sales...');
  const saleRows = store.sales.map(s => ({
    id: toUUID(s.id),
    reference: s.reference,
    motorcycle_id: toUUID(s.motorcycle_id),
    showroom_id: toUUID(s.showroom_id),
    customer_name: s.customer_name,
    customer_phone: s.customer_phone,
    sale_price: s.sale_price,
    payment_method: s.payment_method,
    sale_date: s.sale_date,
    notes: s.notes || null,
    created_at: s.created_at
  }));
  const { error: saleError } = await supabase.from('sales').upsert(saleRows, { onConflict: 'reference' });
  if (saleError) console.error('Error in sales:', saleError.message);
  console.log('Sales upsert complete.');

  // 5. VERIFY FINAL DATABASE COUNTS
  console.log('\n--- VERIFYING EXACT FINAL DATABASE COUNTS ---');
  const { count: showroomsCount } = await supabase.from('showrooms').select('*', { count: 'exact', head: true });
  const { count: modelsCount } = await supabase.from('motorcycle_models').select('*', { count: 'exact', head: true });
  const { count: regionsCount } = await supabase.from('regions').select('*', { count: 'exact', head: true });
  const { count: profilesCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: motosCount } = await supabase.from('motorcycles').select('*', { count: 'exact', head: true });
  const { count: requestsCount } = await supabase.from('customer_requests').select('*', { count: 'exact', head: true });
  const { count: transfersCount } = await supabase.from('transfers').select('*', { count: 'exact', head: true });
  const { count: salesCount } = await supabase.from('sales').select('*', { count: 'exact', head: true });

  console.log({
    showrooms: showroomsCount,
    models: modelsCount,
    regions: regionsCount,
    profiles: profilesCount,
    motorcycles: motosCount,
    customer_requests: requestsCount,
    transfers: transfersCount,
    sales: salesCount
  });
}

main().catch(console.error);
