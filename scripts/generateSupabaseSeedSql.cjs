// Generate SQL seed for Supabase PostgreSQL with valid UUIDs and foreign keys
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

let sql = `-- ====================================================================\n`;
sql += `-- PROJECT: QUICK by VMS — Supabase PostgreSQL Mock Data Injection\n`;
sql += `-- Generated on: ${new Date().toISOString()}\n`;
sql += `-- Target DB: Supabase (postgres database / public schema)\n`;
sql += `-- ====================================================================\n\n`;

sql += `BEGIN;\n\n`;

// Disable triggers during bulk seed
sql += `-- Temporarily disable triggers for fast bulk import\n`;
sql += `ALTER TABLE IF EXISTS customer_requests DISABLE TRIGGER ALL;\n`;
sql += `ALTER TABLE IF EXISTS motorcycles DISABLE TRIGGER ALL;\n\n`;

// 1. REGIONS
const WILAYAS = [
  { code: '01', name: 'Adrar', name_ar: 'أدرار' },
  { code: '02', name: 'Chlef', name_ar: 'الشلف' },
  { code: '03', name: 'Laghouat', name_ar: 'الأغواط' },
  { code: '04', name: 'Oum El Bouaghi', name_ar: 'أم البواقي' },
  { code: '05', name: 'Batna', name_ar: 'باتنة' },
  { code: '06', name: 'Béjaïa', name_ar: 'بجاية' },
  { code: '07', name: 'Biskra', name_ar: 'بسكرة' },
  { code: '08', name: 'Béchar', name_ar: 'بشار' },
  { code: '09', name: 'Blida', name_ar: 'البليدة' },
  { code: '10', name: 'Bouira', name_ar: 'البويرة' },
  { code: '11', name: 'Tamanrasset', name_ar: 'تمنراست' },
  { code: '12', name: 'Tébessa', name_ar: 'تبسة' },
  { code: '13', name: 'Tlemcen', name_ar: 'تلمسان' },
  { code: '14', name: 'Tiaret', name_ar: 'تيارت' },
  { code: '15', name: 'Tizi Ouzou', name_ar: 'تيزي وزو' },
  { code: '16', name: 'Alger', name_ar: 'الجزائر' },
  { code: '17', name: 'Djelfa', name_ar: 'الجلفة' },
  { code: '18', name: 'Jijel', name_ar: 'جيجل' },
  { code: '19', name: 'Sétif', name_ar: 'سطيف' },
  { code: '20', name: 'Saïda', name_ar: 'سعيدة' },
  { code: '21', name: 'Skikda', name_ar: 'سكيكدة' },
  { code: '22', name: 'Sidi Bel Abbès', name_ar: 'سيدي بلعباس' },
  { code: '23', name: 'Annaba', name_ar: 'عنابة' },
  { code: '24', name: 'Guelma', name_ar: 'قالمة' },
  { code: '25', name: 'Constantine', name_ar: 'قسنطينة' },
  { code: '26', name: 'Médéa', name_ar: 'المدية' },
  { code: '27', name: 'Mostaganem', name_ar: 'مستغانم' },
  { code: '28', name: 'M\'Sila', name_ar: 'المسيلة' },
  { code: '29', name: 'Mascara', name_ar: 'معسكر' },
  { code: '30', name: 'Ouargla', name_ar: 'ورقلة' },
  { code: '31', name: 'Oran', name_ar: 'وهران' },
  { code: '32', name: 'El Bayadh', name_ar: 'البيض' },
  { code: '33', name: 'Illizi', name_ar: 'إليزي' },
  { code: '34', name: 'Bordj Bou Arréridj', name_ar: 'برج بوعريريج' },
  { code: '35', name: 'Boumerdès', name_ar: 'بومرداس' },
  { code: '36', name: 'El Tarf', name_ar: 'الطارف' },
  { code: '37', name: 'Tindouf', name_ar: 'تندوف' },
  { code: '38', name: 'Tissemsilt', name_ar: 'تيسمسيلت' },
  { code: '39', name: 'El Oued', name_ar: 'الوادي' },
  { code: '40', name: 'Khenchela', name_ar: 'خنشلة' },
  { code: '41', name: 'Souk Ahras', name_ar: 'سوق أهراس' },
  { code: '42', name: 'Tipaza', name_ar: 'تيبازة' },
  { code: '43', name: 'Mila', name_ar: 'ميلة' },
  { code: '44', name: 'Aïn Defla', name_ar: 'عين الدفلى' },
  { code: '45', name: 'Naâma', name_ar: 'النعامة' },
  { code: '46', name: 'Aïn Témouchent', name_ar: 'عين تموشنت' },
  { code: '47', name: 'Ghardaïa', name_ar: 'غرداية' },
  { code: '48', name: 'Relizane', name_ar: 'غليزان' },
  { code: '49', name: 'Timimoun', name_ar: 'تيميمون' },
  { code: '50', name: 'Bordj Badji Mokhtar', name_ar: 'برج باجي مختار' },
  { code: '51', name: 'Ouled Djellal', name_ar: 'أولاد جلال' },
  { code: '52', name: 'Béni Abbès', name_ar: 'بني عباس' },
  { code: '53', name: 'In Salah', name_ar: 'عين صالح' },
  { code: '54', name: 'In Guezzam', name_ar: 'عين قزام' },
  { code: '55', name: 'Touggourt', name_ar: 'تقرت' },
  { code: '56', name: 'Djanet', name_ar: 'جانت' },
  { code: '57', name: 'El M\'Ghair', name_ar: 'المغير' },
  { code: '58', name: 'El Meniaa', name_ar: 'المنيعة' }
];

sql += `-- 1. SEED REGIONS (58 Wilayas)\n`;
WILAYAS.forEach(w => {
  sql += `INSERT INTO regions (code, name, name_ar) VALUES (${esc(w.code)}, ${esc(w.name)}, ${esc(w.name_ar)}) ON CONFLICT (code) DO NOTHING;\n`;
});
sql += `\n`;

// 2. MOTORCYCLE MODELS
sql += `-- 2. SEED MOTORCYCLE MODELS\n`;
store.models.forEach(m => {
  const uuid = toUUID(m.id);
  sql += `INSERT INTO motorcycle_models (id, name, brand, category, engine_cc, power_hp, cooling, fuel_system, price_dzd, image_url, description, is_active)\n`;
  sql += `VALUES ('${uuid}', ${esc(m.name)}, ${esc(m.brand)}, ${esc(m.category)}, ${m.engine_cc}, ${m.power_hp || 10}, ${esc(m.cooling)}, ${esc(m.fuel_system)}, ${m.price_dzd}, ${esc(m.image_url)}, ${esc(m.description)}, TRUE)\n`;
  sql += `ON CONFLICT (id) DO UPDATE SET price_dzd = EXCLUDED.price_dzd;\n`;
});
sql += `\n`;

// 3. PROFILES
sql += `-- 3. SEED PROFILES (Super Admin & Showroom Managers)\n`;
store.profiles.forEach(p => {
  const uuid = toUUID(p.id);
  sql += `INSERT INTO profiles (id, email, role, first_name, last_name, phone, wilaya_code, is_active, created_at)\n`;
  sql += `VALUES ('${uuid}', ${esc(p.email)}, ${esc(p.role)}, ${esc(p.first_name)}, ${esc(p.last_name)}, ${esc(p.phone)}, ${esc(p.wilaya_code)}, TRUE, ${esc(p.created_at)})\n`;
  sql += `ON CONFLICT (email) DO NOTHING;\n`;
});
sql += `\n`;

// 4. SHOWROOMS (80 SHOWROOMS)
sql += `-- 4. SEED SHOWROOMS (80 National Points of Sale)\n`;
store.showrooms.forEach(s => {
  const uuid = toUUID(s.id);
  const ownerUuid = s.owner_id ? `'${toUUID(s.owner_id)}'` : 'NULL';
  sql += `INSERT INTO showrooms (id, name, code, wilaya_code, city, address, phone, email, owner_id, is_active, opening_hours, created_at)\n`;
  sql += `VALUES ('${uuid}', ${esc(s.name)}, ${esc(s.code)}, ${esc(s.wilaya_code)}, ${esc(s.city)}, ${esc(s.address)}, ${esc(s.phone)}, ${esc(s.email)}, ${ownerUuid}, TRUE, ${esc(s.opening_hours)}, ${esc(s.created_at)})\n`;
  sql += `ON CONFLICT (code) DO NOTHING;\n`;
});
sql += `\n`;

// 5. MOTORCYCLES (420 PHYSICAL UNITS)
sql += `-- 5. SEED MOTORCYCLES (420 physical units with aging & fresh stock)\n`;
store.motorcycles.forEach(m => {
  const uuid = toUUID(m.id);
  const modelUuid = toUUID(m.model_id);
  const showroomUuid = toUUID(m.showroom_id);
  sql += `INSERT INTO motorcycles (id, model_id, showroom_id, vin, color, engine_specs, acquisition_date, arrival_date, status, notes, sale_date, created_at)\n`;
  sql += `VALUES ('${uuid}', '${modelUuid}', '${showroomUuid}', ${esc(m.vin)}, ${esc(m.color)}, ${esc(m.engine_specs)}, ${esc(m.acquisition_date)}, ${esc(m.arrival_date)}, ${esc(m.status)}, ${esc(m.notes)}, ${esc(m.sale_date)}, ${esc(m.created_at)})\n`;
  sql += `ON CONFLICT (vin) DO NOTHING;\n`;
});
sql += `\n`;

// 6. CUSTOMER REQUESTS (260 DEMANDES)
sql += `-- 6. SEED CUSTOMER REQUESTS (260 nationwide requests)\n`;
store.requests.forEach(r => {
  const uuid = toUUID(r.id);
  const modelUuid = toUUID(r.motorcycle_model_id);
  const showroomUuid = r.matched_showroom_id ? `'${toUUID(r.matched_showroom_id)}'` : 'NULL';
  sql += `INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, motorcycle_model_id, wilaya_code, city, status, matched_showroom_id, notified_at, fulfilled_at, notes, created_at)\n`;
  sql += `VALUES ('${uuid}', ${esc(r.reference)}, ${esc(r.first_name)}, ${esc(r.last_name)}, ${esc(r.phone)}, ${esc(r.phone_normalized)}, ${esc(r.email)}, '${modelUuid}', ${esc(r.wilaya_code)}, ${esc(r.city)}, ${esc(r.status)}, ${showroomUuid}, ${esc(r.notified_at)}, ${esc(r.fulfilled_at)}, ${esc(r.notes)}, ${esc(r.created_at)})\n`;
  sql += `ON CONFLICT (reference) DO NOTHING;\n`;
});
sql += `\n`;

// 7. TRANSFERS (24 COMPTE GLOBAL TRANSFERS)
sql += `-- 7. SEED TRANSFERS\n`;
store.transfers.forEach(t => {
  const uuid = toUUID(t.id);
  const motoUuid = toUUID(t.motorcycle_id);
  const srcShwUuid = toUUID(t.source_showroom_id);
  const dstShwUuid = toUUID(t.destination_showroom_id);
  sql += `INSERT INTO transfers (id, reference, motorcycle_id, source_showroom_id, destination_showroom_id, status, reason, stock_age_at_request, approved_at, received_at, created_at)\n`;
  sql += `VALUES ('${uuid}', ${esc(t.reference)}, '${motoUuid}', '${srcShwUuid}', '${dstShwUuid}', ${esc(t.status)}, ${esc(t.reason)}, ${t.stock_age_at_request || 95}, ${esc(t.approved_at)}, ${esc(t.received_at)}, ${esc(t.created_at)})\n`;
  sql += `ON CONFLICT (reference) DO NOTHING;\n`;
});
sql += `\n`;

// 8. SALES (85 SALES)
sql += `-- 8. SEED SALES\n`;
store.sales.forEach(s => {
  const uuid = toUUID(s.id);
  const motoUuid = toUUID(s.motorcycle_id);
  const shwUuid = toUUID(s.showroom_id);
  sql += `INSERT INTO sales (id, reference, motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, sale_date, notes, created_at)\n`;
  sql += `VALUES ('${uuid}', ${esc(s.reference)}, '${motoUuid}', '${shwUuid}', ${esc(s.customer_name)}, ${esc(s.customer_phone)}, ${s.sale_price}, ${esc(s.payment_method)}, ${esc(s.sale_date)}, ${esc(s.notes)}, ${esc(s.created_at)})\n`;
  sql += `ON CONFLICT (reference) DO NOTHING;\n`;
});
sql += `\n`;

// Re-enable triggers
sql += `-- Re-enable triggers\n`;
sql += `ALTER TABLE IF EXISTS customer_requests ENABLE TRIGGER ALL;\n`;
sql += `ALTER TABLE IF EXISTS motorcycles ENABLE TRIGGER ALL;\n\n`;

sql += `COMMIT;\n`;

fs.writeFileSync(path.join(__dirname, '../supabase/seed_mock_data.sql'), sql, 'utf-8');
console.log('Successfully generated supabase/seed_mock_data.sql. File size:', (sql.length / 1024).toFixed(1), 'KB');
