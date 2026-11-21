const fs = require('fs');
const path = require('path');

const store = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/data/store.json'), 'utf-8'));
const { showrooms, models } = store;

const FLAGSHIP_SHOWROOM_IDS = new Set([
  'shw-vms-06-01', // Oued Ghir Siège & Usine
  'shw-vms-48-04', // Relizane Pôle Logistique & Showroom
  'shw-vms-16-06', // Alger Bouzaréah
  'shw-vms-16-07', // Alger Hussein Dey
  'shw-vms-16-08', // Alger Dar El Beïda
  'shw-vms-16-09', // Alger Chéraga
  'shw-vms-16-10', // Alger Kouba
  'shw-vms-31-16', // Oran Es-Senia
  'shw-vms-31-17', // Oran Bir El Djir
  'shw-vms-25-20', // Constantine Ali Mendjeli
  'shw-vms-19-23', // Sétif Ville
  'shw-vms-23-30', // Annaba Centre
]);

const SOUTHERN_WILAYAS = new Set(['01', '08', '11', '30', '32', '33', '37', '39', '45', '47', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58']);

// Quotas
const showroomQuotas = {};
showrooms.forEach(s => {
  if (s.id === 'shw-vms-06-01') showroomQuotas[s.id] = 11;
  else if (s.id === 'shw-vms-48-04') showroomQuotas[s.id] = 10;
  else if (['shw-vms-16-06', 'shw-vms-16-07', 'shw-vms-16-08', 'shw-vms-31-16'].includes(s.id)) showroomQuotas[s.id] = 9;
  else if (FLAGSHIP_SHOWROOM_IDS.has(s.id)) showroomQuotas[s.id] = 8;
  else if (SOUTHERN_WILAYAS.has(s.wilaya_code)) showroomQuotas[s.id] = 4;
  else showroomQuotas[s.id] = 5;
});

// Adjust to exactly 420
let total = Object.values(showroomQuotas).reduce((a, b) => a + b, 0);
console.log('Initial total quotas:', total);

// Fine tune to reach exactly 420
const nonFlagships = showrooms.filter(s => !FLAGSHIP_SHOWROOM_IDS.has(s.id));
let idx = 0;
while (total < 420) {
  const shw = nonFlagships[idx % nonFlagships.length];
  if (showroomQuotas[shw.id] < 6) {
    showroomQuotas[shw.id]++;
    total++;
  }
  idx++;
}
while (total > 420) {
  const shw = nonFlagships[idx % nonFlagships.length];
  if (showroomQuotas[shw.id] > 3) {
    showroomQuotas[shw.id]--;
    total--;
  }
  idx++;
}

console.log('Final tuned total quotas:', Object.values(showroomQuotas).reduce((a, b) => a + b, 0));

// Generate motorcycles
const COLORS = ['Noir Mat', 'Blanc Nacre', 'Gris Titane', 'Bleu Nuit', 'Rouge VMS Racing', 'Jaune Sport'];
const NOW = new Date();
const motorcycles = [];
let motoIdx = 1;

showrooms.forEach((shw, sIdx) => {
  const quota = showroomQuotas[shw.id];
  const isFlagship = FLAGSHIP_SHOWROOM_IDS.has(shw.id);
  const isSouthern = SOUTHERN_WILAYAS.has(shw.wilaya_code);

  // Determine models for this showroom
  let chosenModels = [];
  if (isFlagship) {
    // Flagships get all 8 models + top sellers for remaining
    chosenModels = models.slice(0, 8);
    const extraNeeded = quota - chosenModels.length;
    for (let e = 0; e < extraNeeded; e++) {
      chosenModels.push(models[e % 2]); // Extra Driver 125 or Driver 150
    }
  } else if (quota >= 5) {
    // Urban showrooms: Core trio + 2 or 3 rotating models
    chosenModels = [models[0], models[1], models[2]]; // Driver 125, Driver 150, Cuxi 110
    const specialized = [models[3], models[4], models[5], models[6], models[7]];
    for (let r = 0; r < quota - 3; r++) {
      chosenModels.push(specialized[(sIdx + r) % specialized.length]);
    }
  } else {
    // Proximity & South: Core commuters + region suited model
    chosenModels = [models[0], models[2], models[1]]; // Driver 125, Cuxi 110, Driver 150
    if (quota >= 4) {
      if (isSouthern) {
        chosenModels.push((sIdx % 2 === 0) ? models[7] : models[6]); // TRK 502 or RKF 125
      } else {
        chosenModels.push(models[3 + (sIdx % 3)]); // Estate 125 or Victoria or Alpha
      }
    }
  }

  // Create physical motorcycles
  chosenModels.forEach((mod, mIdx) => {
    const vin = `VMS2026DZ${String(motoIdx).padStart(6, '0')}`;
    const color = COLORS[(sIdx * 3 + mIdx) % COLORS.length];

    // Aging stock: distribute ~24% dormant (>90 days)
    // Southern/interior showrooms or higher models have slightly more aging stock
    const isHigherModel = ['mod-benelli-trk-502', 'mod-vms-victoria-200', 'mod-keeway-rkf-125'].includes(mod.id);
    const isAging = isHigherModel ? (mIdx % 2 === 0) : ((sIdx + mIdx) % 4 === 0);
    const daysInStock = isAging ? (95 + ((sIdx + mIdx * 7) % 80)) : (8 + ((sIdx * 5 + mIdx * 11) % 70));

    const arrivalDate = new Date(NOW.getTime() - daysInStock * 24 * 60 * 60 * 1000);
    const acquisitionDate = new Date(arrivalDate.getTime() - 14 * 24 * 60 * 60 * 1000);

    let status = 'available';
    if ((sIdx + mIdx) % 17 === 0) status = 'reserved';
    else if ((sIdx + mIdx) % 19 === 0) status = 'in_transfer';
    else if ((sIdx + mIdx) % 23 === 0) status = 'sold';

    motorcycles.push({
      id: `moto-${String(motoIdx).padStart(4, '0')}`,
      model_id: mod.id,
      showroom_id: shw.id,
      vin,
      color,
      engine_specs: `${mod.engine_cc}cc • ${mod.cooling} • ${mod.fuel_system}`,
      acquisition_date: acquisitionDate.toISOString().split('T')[0],
      arrival_date: arrivalDate.toISOString().split('T')[0],
      status,
      notes: isAging ? 'Stock dormant éligible Compte Global (>90j)' : 'Contrôle qualité VMS usine validé',
      sale_date: status === 'sold' ? new Date(NOW.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
      created_at: arrivalDate.toISOString(),
      days_in_stock: daysInStock,
      is_aging: daysInStock >= 90
    });
    motoIdx++;
  });
});

console.log('Generated motorcycles:', motorcycles.length);

// Analyze distribution per showroom
const shwDist = {};
motorcycles.forEach(m => {
  if (!shwDist[m.showroom_id]) shwDist[m.showroom_id] = new Set();
  shwDist[m.showroom_id].add(m.model_id);
});

const distinctModelCounts = Object.values(shwDist).map(set => set.size);
const minModels = Math.min(...distinctModelCounts);
const maxModels = Math.max(...distinctModelCounts);
const avgModels = (distinctModelCounts.reduce((a, b) => a + b, 0) / distinctModelCounts.length).toFixed(1);
const dormantCount = motorcycles.filter(m => m.is_aging).length;
const dormantPct = ((dormantCount / motorcycles.length) * 100).toFixed(1);

console.log({
  totalMotorcycles: motorcycles.length,
  totalShowrooms: Object.keys(shwDist).length,
  minModelsPerShowroom: minModels,
  maxModelsPerShowroom: maxModels,
  avgModelsPerShowroom: avgModels,
  dormantStockCount: dormantCount,
  dormantStockPct: `${dormantPct}%`
});

// Sample 3 showrooms
console.log('\nSample Showroom 1 (Flagship Alger Bouzaréah):');
const sample1 = motorcycles.filter(m => m.showroom_id === 'shw-vms-16-06');
console.log(sample1.map(m => `${m.vin} | ${models.find(mod => mod.id === m.model_id)?.name} (${models.find(mod => mod.id === m.model_id)?.category}) | ${m.color} | ${m.days_in_stock}j`));

console.log('\nSample Showroom 2 (Urban Blida Centre):');
const sample2 = motorcycles.filter(m => m.showroom_id === 'shw-vms-09-26');
console.log(sample2.map(m => `${m.vin} | ${models.find(mod => mod.id === m.model_id)?.name} (${models.find(mod => mod.id === m.model_id)?.category}) | ${m.color} | ${m.days_in_stock}j`));

console.log('\nSample Showroom 3 (Southern Adrar Touat):');
const sample3 = motorcycles.filter(m => m.showroom_id === 'shw-vms-01-44');
console.log(sample3.map(m => `${m.vin} | ${models.find(mod => mod.id === m.model_id)?.name} (${models.find(mod => mod.id === m.model_id)?.category}) | ${m.color} | ${m.days_in_stock}j`));
