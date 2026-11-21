const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://sgszaitcutsbyygssmfb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc3phaXRjdXRzYnl5Z3NzbWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUyNTc2MjAsImV4cCI6MjExMDgzMzYyMH0.DK8ABUNhTnXIbg0_B77oNRt9_tVB60i3m3dTdQs08og'
);

async function check() {
  const { count: showroomsCount, error: e1 } = await supabase.from('showrooms').select('*', { count: 'exact', head: true });
  const { count: requestsCount, error: e2 } = await supabase.from('customer_requests').select('*', { count: 'exact', head: true });
  const { count: motosCount, error: e3 } = await supabase.from('motorcycles').select('*', { count: 'exact', head: true });
  const { count: modelsCount, error: e4 } = await supabase.from('motorcycle_models').select('*', { count: 'exact', head: true });
  const { count: salesCount, error: e5 } = await supabase.from('sales').select('*', { count: 'exact', head: true });

  console.log({
    showrooms: showroomsCount,
    requests: requestsCount,
    motorcycles: motosCount,
    models: modelsCount,
    sales: salesCount,
    errors: { e1: e1?.message, e2: e2?.message, e3: e3?.message, e4: e4?.message, e5: e5?.message }
  });
}

check();
