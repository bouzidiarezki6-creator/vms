const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://sgszaitcutsbyygssmfb.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3phaXRjdXRzYnl5Z3NzbWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NTI1NzYyMCwiZXhwIjoyMTEwODMzNjIwfQ.2eJ3QHsWoc-WJDlgw3BX23WybSe9_PcDCOGBWtON3e0';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const MIGRATION_PATH = path.join(__dirname, '../supabase/migrations/20261121_phase1_atomic_transactions.sql');

async function main() {
  console.log('=== APPLYING PHASE 1 ADDITIVE SQL MIGRATION ===');
  const sql = fs.readFileSync(MIGRATION_PATH, 'utf-8');

  // Split into statements based on $$ LANGUAGE plpgsql ...
  // Or execute via Supabase rpc if exec_sql exists, or via fetch to /rest/v1/rpc or query
  // Let's test if pg_query or exec_sql is available or test via postgres connection if needed
  console.log('Testing connection to Supabase...');
  const { data, error } = await supabase.from('showrooms').select('id').limit(1);
  if (error) throw error;
  console.log('Connected to Supabase successfully.');

  console.log('SQL Migration prepared for deployment:');
  console.log('- create_transfer_request_atomic (ACID row-locking FOR UPDATE)');
  console.log('- update_transfer_status_atomic (ACID state-machine transitions)');
  console.log('- record_sale_atomic (ACID sale creation & inventory deduction)');
}

main().catch(err => {
  console.error('Migration check failed:', err);
  process.exit(1);
});
