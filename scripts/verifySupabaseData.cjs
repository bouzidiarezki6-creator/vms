const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://sgszaitcutsbyygssmfb.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3phaXRjdXRzYnl5Z3NzbWZiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5NTI1NzYyMCwiZXhwIjoyMTEwODMzNjIwfQ.2eJ3QHsWoc-WJDlgw3BX23WybSe9_PcDCOGBWtON3e0';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3phaXRjdXRzYnl5Z3NzbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNTc2MjAsImV4cCI6MjExMDgzMzYyMH0.DK8ABUNhTnXIbg0_B77oNRt9_tVB60i3m3dTdQs08og';

// Admin client (bypasses RLS to see total ground truth)
const adminSupabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// Public client (evaluates RLS policies)
const publicSupabase = createClient(SUPABASE_URL, ANON_KEY);

async function check() {
  console.log('--- SUPABASE REAL DATABASE VERIFICATION ---');
  
  const { count: showrooms } = await adminSupabase.from('showrooms').select('*', { count: 'exact', head: true });
  const { count: models } = await adminSupabase.from('motorcycle_models').select('*', { count: 'exact', head: true });
  const { count: regions } = await adminSupabase.from('regions').select('*', { count: 'exact', head: true });
  const { count: profiles } = await adminSupabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: motorcycles } = await adminSupabase.from('motorcycles').select('*', { count: 'exact', head: true });
  const { count: requests } = await adminSupabase.from('customer_requests').select('*', { count: 'exact', head: true });
  const { count: transfers } = await adminSupabase.from('transfers').select('*', { count: 'exact', head: true });
  const { count: sales } = await adminSupabase.from('sales').select('*', { count: 'exact', head: true });

  console.log('Ground Truth (PostgreSQL / Service Role):');
  console.log({
    showrooms,
    models,
    regions,
    profiles,
    motorcycles,
    requests,
    transfers,
    sales
  });

  const { count: pubShowrooms } = await publicSupabase.from('showrooms').select('*', { count: 'exact', head: true });
  const { count: pubModels } = await publicSupabase.from('motorcycle_models').select('*', { count: 'exact', head: true });
  const { count: pubDormantMotos } = await publicSupabase.from('motorcycles').select('*', { count: 'exact', head: true });

  console.log('\nPublic Client Discovery (RLS Enforced - Compte Global Active):');
  console.log({
    public_catalog_models: pubModels,
    public_showrooms_network: pubShowrooms,
    public_dormant_stock_discoverable: pubDormantMotos
  });
}

check().catch(console.error);
