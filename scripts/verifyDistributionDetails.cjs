const fs = require('fs');
const path = require('path');

const store = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/data/store.json'), 'utf-8'));
const { motorcycles, showrooms, models } = store;

console.log('=== REALISTIC MOTORCYCLES DISTRIBUTION AUDIT ===');
console.log('Total motorcycles:', motorcycles.length);
console.log('Total showrooms:', showrooms.length);

const byShowroom = {};
const byShwModelColors = {};
let duplicateCombos = 0;

motorcycles.forEach(m => {
  if (!byShowroom[m.showroom_id]) byShowroom[m.showroom_id] = [];
  byShowroom[m.showroom_id].push(m);

  const key = `${m.showroom_id}_${m.model_id}_${m.color}`;
  if (byShwModelColors[key]) duplicateCombos++;
  byShwModelColors[key] = true;
});

const countsPerShowroom = Object.values(byShowroom).map(l => l.length);
const distinctPerShowroom = Object.values(byShowroom).map(l => new Set(l.map(m => m.model_id)).size);

console.log({
  totalMotorcycles: motorcycles.length,
  showroomsWithStock: Object.keys(byShowroom).length,
  duplicateModelColorCombos: duplicateCombos,
  motorcyclesPerShowroom: {
    min: Math.min(...countsPerShowroom),
    max: Math.max(...countsPerShowroom),
    avg: (countsPerShowroom.reduce((a, b) => a + b, 0) / countsPerShowroom.length).toFixed(1)
  },
  distinctModelsPerShowroom: {
    min: Math.min(...distinctPerShowroom),
    max: Math.max(...distinctPerShowroom),
    avg: (distinctPerShowroom.reduce((a, b) => a + b, 0) / distinctPerShowroom.length).toFixed(1)
  },
  dormantStock: {
    count: motorcycles.filter(m => m.is_aging).length,
    percentage: ((motorcycles.filter(m => m.is_aging).length / motorcycles.length) * 100).toFixed(1) + '%'
  }
});

// Flagship 1: Siège Béjaïa
const siege = showrooms.find(s => s.name.includes('Siège') || s.name.includes('Oued Ghir'));
console.log('\n--- Flagship: Béjaïa Siège & Usine (' + siege.name + ') ---');
console.log('Stock count:', byShowroom[siege.id]?.length);
byShowroom[siege.id]?.forEach(m => {
  const mod = models.find(x => x.id === m.model_id);
  console.log(`  • ${m.vin} | ${mod.name} [${mod.category}] | ${m.color} | Âge: ${m.days_in_stock}j | ${m.status}`);
});

// Flagship 2: Alger Bouzaréah
const alg = showrooms.find(s => s.name.includes('Bouzaréah'));
console.log('\n--- Flagship: Alger Bouzaréah (' + alg.name + ') ---');
console.log('Stock count:', byShowroom[alg.id]?.length);
byShowroom[alg.id]?.forEach(m => {
  const mod = models.find(x => x.id === m.model_id);
  console.log(`  • ${m.vin} | ${mod.name} [${mod.category}] | ${m.color} | Âge: ${m.days_in_stock}j | ${m.status}`);
});

// Major Urban: Constantine
const cst = showrooms.find(s => s.wilaya_code === '25');
console.log('\n--- Major Urban: Constantine (' + cst.name + ') ---');
console.log('Stock count:', byShowroom[cst.id]?.length);
byShowroom[cst.id]?.forEach(m => {
  const mod = models.find(x => x.id === m.model_id);
  console.log(`  • ${m.vin} | ${mod.name} [${mod.category}] | ${m.color} | Âge: ${m.days_in_stock}j | ${m.status}`);
});

// Southern / Proximity: Find any showroom in Southern wilayas
const southernShws = showrooms.filter(s => ['01', '08', '11', '30', '33', '37', '39', '47'].includes(s.wilaya_code) || s.city.toLowerCase().includes('adrar') || s.city.toLowerCase().includes('ghardaia') || s.city.toLowerCase().includes('tamanrasset') || s.city.toLowerCase().includes('ouargla'));
console.log('Southern showrooms found:', southernShws.length);

if (southernShws.length > 0) {
  const adr = southernShws[0];
  console.log('\n--- Southern Showroom: ' + adr.city + ' (' + adr.name + ') ---');
  console.log('Stock count:', byShowroom[adr.id]?.length);
  byShowroom[adr.id]?.forEach(m => {
    const mod = models.find(x => x.id === m.model_id);
    console.log(`  • ${m.vin} | ${mod.name} [${mod.category}] | ${m.color} | Âge: ${m.days_in_stock}j | ${m.status}`);
  });

  if (southernShws.length > 1) {
    const tam = southernShws[1];
    console.log('\n--- Southern Showroom 2: ' + tam.city + ' (' + tam.name + ') ---');
    console.log('Stock count:', byShowroom[tam.id]?.length);
    byShowroom[tam.id]?.forEach(m => {
      const mod = models.find(x => x.id === m.model_id);
      console.log(`  • ${m.vin} | ${mod.name} [${mod.category}] | ${m.color} | Âge: ${m.days_in_stock}j | ${m.status}`);
    });
  }
}
