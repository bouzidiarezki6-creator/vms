import {
  Profile,
  Showroom,
  MotorcycleModel,
  Motorcycle,
  CustomerRequest,
  Transfer,
  Notification,
  Sale,
  PreorderRedirect,
  AuditLog
} from '../types';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'usr-super-admin-01',
    email: 'admin@vms.dz',
    role: 'super_admin',
    first_name: 'Ahmed',
    last_name: 'Benali',
    phone: '0560112233',
    wilaya_code: '16',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    is_active: true,
    created_at: '2026-01-01T08:00:00Z'
  },
  {
    id: 'usr-owner-alger-01',
    email: 'alger@vms.dz',
    role: 'showroom_owner',
    first_name: 'Karim',
    last_name: 'Belkacem',
    phone: '0555123456',
    wilaya_code: '16',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    is_active: true,
    created_at: '2026-01-10T09:00:00Z'
  },
  {
    id: 'usr-owner-oran-01',
    email: 'oran@vms.dz',
    role: 'showroom_owner',
    first_name: 'Yacine',
    last_name: 'Mansouri',
    phone: '0551987654',
    wilaya_code: '31',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    is_active: true,
    created_at: '2026-01-15T09:00:00Z'
  },
  {
    id: 'usr-owner-cne-01',
    email: 'constantine@vms.dz',
    role: 'showroom_owner',
    first_name: 'Nadir',
    last_name: 'Khelifi',
    phone: '0554332211',
    wilaya_code: '25',
    avatar_url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
    is_active: true,
    created_at: '2026-02-01T09:00:00Z'
  },
  {
    id: 'usr-customer-01',
    email: 'amine.dahmani@gmail.com',
    role: 'customer',
    first_name: 'Amine',
    last_name: 'Dahmani',
    phone: '0550123456',
    wilaya_code: '16',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    is_active: true,
    created_at: '2026-02-10T10:30:00Z'
  }
];

export const INITIAL_SHOWROOMS: Showroom[] = [
  {
    id: 'shw-alger-01',
    name: 'VMS Showroom Alger Centre',
    code: 'VMS-ALG-01',
    wilaya_code: '16',
    city: 'Hussein Dey',
    address: '14 Rue Tripoli, Hussein Dey, Alger',
    phone: '023 77 45 10 / 0555 12 34 56',
    email: 'alger@vms.dz',
    owner_id: 'usr-owner-alger-01',
    is_active: true,
    opening_hours: '08:30 - 17:30 (Sam - Jeu)',
    created_at: '2026-01-10T09:00:00Z'
  },
  {
    id: 'shw-oran-01',
    name: 'VMS Showroom Oran Es-Senia',
    code: 'VMS-ORN-01',
    wilaya_code: '31',
    city: 'Es-Senia',
    address: 'Zone des Garages, Route de Tlemcen, Es-Senia, Oran',
    phone: '041 51 22 90 / 0551 98 76 54',
    email: 'oran@vms.dz',
    owner_id: 'usr-owner-oran-01',
    is_active: true,
    opening_hours: '08:30 - 17:00 (Sam - Jeu)',
    created_at: '2026-01-15T09:00:00Z'
  },
  {
    id: 'shw-constantine-01',
    name: 'VMS Showroom Constantine Rhumel',
    code: 'VMS-CNE-01',
    wilaya_code: '25',
    city: 'Ali Mendjeli',
    address: 'Nouvelle Ville Ali Mendjeli UV 05, Constantine',
    phone: '031 66 12 80 / 0554 33 22 11',
    email: 'constantine@vms.dz',
    owner_id: 'usr-owner-cne-01',
    is_active: true,
    opening_hours: '08:30 - 17:00 (Sam - Jeu)',
    created_at: '2026-02-01T09:00:00Z'
  },
  {
    id: 'shw-bejaia-01',
    name: 'VMS Siège & Showroom Béjaïa',
    code: 'VMS-BJA-01',
    wilaya_code: '06',
    city: 'Béjaïa Ville',
    address: 'Zone Industrielle Ibourassen, Oued Ghir, Béjaïa',
    phone: '034 21 00 11 / 0560 90 80 70',
    email: 'bejaia@vms.dz',
    owner_id: 'usr-super-admin-01',
    is_active: true,
    opening_hours: '08:00 - 17:00 (Sam - Jeu)',
    created_at: '2026-01-05T08:00:00Z'
  },
  {
    id: 'shw-setif-01',
    name: 'VMS Showroom Sétif El Eulma',
    code: 'VMS-STF-01',
    wilaya_code: '19',
    city: 'El Eulma',
    address: 'Boulevard Dubaï, El Eulma, Sétif',
    phone: '036 85 41 20 / 0558 77 66 55',
    email: 'eulma@vms.dz',
    is_active: true,
    opening_hours: '08:30 - 17:30 (Sam - Jeu)',
    created_at: '2026-02-15T09:00:00Z'
  },
  {
    id: 'shw-blida-01',
    name: 'VMS Showroom Blida Centre',
    code: 'VMS-BLD-01',
    wilaya_code: '09',
    city: 'Blida Centre',
    address: 'Avenue de la Gare, Blida',
    phone: '025 31 10 40 / 0559 44 33 22',
    email: 'blida@vms.dz',
    is_active: true,
    opening_hours: '08:30 - 17:00 (Sam - Jeu)',
    created_at: '2026-02-20T09:00:00Z'
  }
];

export const INITIAL_MODELS: MotorcycleModel[] = [
  {
    id: 'mod-vms-ckee-125',
    name: 'VMS C-Kee 125',
    brand: 'VMS',
    category: 'Scooter',
    engine_cc: 125,
    power_hp: 8.5,
    cooling: 'Air',
    fuel_system: 'Carburateur optimisé',
    price_dzd: 255000,
    image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    description: 'Le best-seller urbain en Algérie. Compact, économique, agile avec son coffre généreux et son plancher plat.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'mod-vms-driver-150',
    name: 'VMS Driver 150',
    brand: 'VMS',
    category: 'Maxi Scooter',
    engine_cc: 150,
    power_hp: 13.5,
    cooling: 'Liquide',
    fuel_system: 'EFI Delphi',
    price_dzd: 365000,
    image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
    description: 'Maxi-scooter racé avec freins ABS, éclairage full LED, tableau de bord TFT couleur et port USB de charge rapide.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'mod-vms-estate-125',
    name: 'VMS Estate 125',
    brand: 'VMS',
    category: 'Scooter Néo-Rétro',
    engine_cc: 125,
    power_hp: 9.2,
    cooling: 'Air',
    fuel_system: 'Carburateur',
    price_dzd: 295000,
    image_url: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?w=600&auto=format&fit=crop&q=80',
    description: 'Élégance vintage avec touches chromées, selle en cuir biplace surpiquée et porte-paquet arrière d\'origine.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'mod-vms-victoria-200',
    name: 'VMS Victoria 200',
    brand: 'VMS',
    category: 'Maxi Scooter GT',
    engine_cc: 175,
    power_hp: 15.0,
    cooling: 'Liquide',
    fuel_system: 'EFI Bosch',
    price_dzd: 445000,
    image_url: 'https://images.unsplash.com/photo-1571188654248-7a89213915f7?w=600&auto=format&fit=crop&q=80',
    description: 'Le vaisseau amiral de la gamme VMS. Confort royal, pare-brise réglable, démarrage sans clé Keyless et transmission ultra souple.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'mod-vms-alpha-150',
    name: 'VMS Alpha 150',
    brand: 'VMS',
    category: 'Scooter Sport',
    engine_cc: 150,
    power_hp: 12.0,
    cooling: 'Air forcé',
    fuel_system: 'EFI',
    price_dzd: 335000,
    image_url: 'https://images.unsplash.com/photo-1547025603-ef918201b127?w=600&auto=format&fit=crop&q=80',
    description: 'Design affûté inspiré des sportives, amortisseurs gaz réglables, disques wave pétales et double optique agressive.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'mod-keeway-rkf-125',
    name: 'Keeway RKF 125',
    brand: 'Keeway',
    category: 'Roadster',
    engine_cc: 125,
    power_hp: 12.8,
    cooling: 'Liquide',
    fuel_system: 'EFI',
    price_dzd: 420000,
    image_url: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&auto=format&fit=crop&q=80',
    description: 'Roadster moderne à cadre treillis tubulaire acier, fourche inversée dorée et sonorité sportive.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'mod-benelli-trk-502',
    name: 'Benelli TRK 502',
    brand: 'Benelli',
    category: 'Trail Adventure',
    engine_cc: 500,
    power_hp: 47.6,
    cooling: 'Liquide bi-cylindre',
    fuel_system: 'EFI Bosch',
    price_dzd: 1380000,
    image_url: 'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=600&auto=format&fit=crop&q=80',
    description: 'La référence du voyage deux-roues en Algérie. Prête pour les grands raids avec crashbars, réservoir 20L et suspensions à grand débattement.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'mod-benelli-leoncino-500',
    name: 'Benelli Leoncino 500',
    brand: 'Benelli',
    category: 'Scrambler Roadster',
    engine_cc: 500,
    power_hp: 47.6,
    cooling: 'Liquide bi-cylindre',
    fuel_system: 'EFI Bosch',
    price_dzd: 1190000,
    image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80',
    description: 'Le charme intemporel du lion de Pesaro. Pneus mixtes Pirelli, garde-boue surmonté du lion doré emblématique.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  }
];

// Helper to compute ISO date N days ago
function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export const INITIAL_MOTORCYCLES: Motorcycle[] = [
  // 1. Alger Centre Inventory (Mix of fresh and moderate stock)
  {
    id: 'moto-alg-001',
    model_id: 'mod-vms-ckee-125',
    showroom_id: 'shw-alger-01',
    vin: 'VMSDZ2026CK891201',
    color: 'Noir Mat / Rouge',
    engine_specs: 'Monocylindre 4T 124.6cc refroidi par air forcé',
    acquisition_date: daysAgo(20),
    arrival_date: daysAgo(18),
    status: 'available',
    notes: 'Arrivage usine Béjaïa Lot #44, révisée et prête pour livraison.',
    created_at: new Date(Date.now() - 18 * 86400000).toISOString()
  },
  {
    id: 'moto-alg-002',
    model_id: 'mod-vms-ckee-125',
    showroom_id: 'shw-alger-01',
    vin: 'VMSDZ2026CK891202',
    color: 'Gris Nardo',
    engine_specs: 'Monocylindre 4T 124.6cc',
    acquisition_date: daysAgo(35),
    arrival_date: daysAgo(32),
    status: 'available',
    notes: 'Modèle avec alarme intégrée et démarrage à distance.',
    created_at: new Date(Date.now() - 32 * 86400000).toISOString()
  },
  {
    id: 'moto-alg-003',
    model_id: 'mod-vms-driver-150',
    showroom_id: 'shw-alger-01',
    vin: 'VMSDZ2026DR456003',
    color: 'Bleu Minuit',
    engine_specs: 'Monocylindre 4T 150cc 4 soupapes injection Delphi',
    acquisition_date: daysAgo(12),
    arrival_date: daysAgo(10),
    status: 'available',
    notes: 'Version avec système de freinage double ABS Bosch.',
    created_at: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: 'moto-alg-004',
    model_id: 'mod-vms-estate-125',
    showroom_id: 'shw-alger-01',
    vin: 'VMSDZ2026ES234004',
    color: 'Blanc Perle / Marron',
    engine_specs: 'Monocylindre 4T 125cc Néo-Rétro',
    acquisition_date: daysAgo(45),
    arrival_date: daysAgo(40),
    status: 'reserved',
    notes: 'Réservée pour client Boumerdès (acompte 50 000 DZD versé).',
    created_at: new Date(Date.now() - 40 * 86400000).toISOString()
  },
  {
    id: 'moto-alg-005',
    model_id: 'mod-keeway-rkf-125',
    showroom_id: 'shw-alger-01',
    vin: 'KW125RKF2026ALG05',
    color: 'Noir / Vert Fluo',
    engine_specs: 'Monocylindre 4T 125cc 4V refroidissement liquide',
    acquisition_date: daysAgo(15),
    arrival_date: daysAgo(14),
    status: 'available',
    notes: 'Livrée avec support de plaque court.',
    created_at: new Date(Date.now() - 14 * 86400000).toISOString()
  },

  // 2. Oran Es-Senia Inventory (CRITICAL: Holds AGING STOCK for Compte Global!)
  {
    id: 'moto-orn-101',
    model_id: 'mod-vms-victoria-200', // VMS Victoria 200 in demand in Alger!
    showroom_id: 'shw-oran-01',
    vin: 'VMSDZ2026VC112101',
    color: 'Blanc Nacré / Selle Cognac',
    engine_specs: 'Monocylindre 4T 175cc injection électronique',
    acquisition_date: daysAgo(120),
    arrival_date: daysAgo(115), // 115 DAYS OLD: >90 DAYS AGING STOCK!
    status: 'available',
    notes: 'Stock dormant en showroom Oran depuis 115 jours. Prioritaire pour transfert inter-showroom.',
    created_at: new Date(Date.now() - 115 * 86400000).toISOString()
  },
  {
    id: 'moto-orn-102',
    model_id: 'mod-vms-driver-150',
    showroom_id: 'shw-oran-01',
    vin: 'VMSDZ2026DR456102',
    color: 'Gris Anthracite',
    engine_specs: 'Monocylindre 4T 150cc',
    acquisition_date: daysAgo(98),
    arrival_date: daysAgo(95), // 95 DAYS OLD: AGING STOCK!
    status: 'available',
    notes: 'Dépassé les 90 jours de stock à Oran. Éligible Compte Global.',
    created_at: new Date(Date.now() - 95 * 86400000).toISOString()
  },
  {
    id: 'moto-orn-103',
    model_id: 'mod-vms-ckee-125',
    showroom_id: 'shw-oran-01',
    vin: 'VMSDZ2026CK891103',
    color: 'Rouge Ferrari',
    engine_specs: 'Monocylindre 4T 125cc',
    acquisition_date: daysAgo(25),
    arrival_date: daysAgo(22),
    status: 'available',
    notes: 'Très forte demande locale à Oran.',
    created_at: new Date(Date.now() - 22 * 86400000).toISOString()
  },
  {
    id: 'moto-orn-104',
    model_id: 'mod-benelli-leoncino-500',
    showroom_id: 'shw-oran-01',
    vin: 'BN500LEO2026ORN04',
    color: 'Rouge Benelli Matt',
    engine_specs: 'Bi-cylindre en ligne 500cc 8 soupapes',
    acquisition_date: daysAgo(110),
    arrival_date: daysAgo(105), // 105 DAYS OLD: AGING STOCK!
    status: 'available',
    notes: 'Exemplaire d\'exposition, parfait état 0 km.',
    created_at: new Date(Date.now() - 105 * 86400000).toISOString()
  },

  // 3. Constantine Rhumel Inventory
  {
    id: 'moto-cne-201',
    model_id: 'mod-vms-alpha-150',
    showroom_id: 'shw-constantine-01',
    vin: 'VMSDZ2026AL778201',
    color: 'Noir Carbone / Jaune Cyber',
    engine_specs: 'Monocylindre 4T 150cc',
    acquisition_date: daysAgo(50),
    arrival_date: daysAgo(48),
    status: 'available',
    notes: 'Arrivée en bon état, rodage atelier effectué.',
    created_at: new Date(Date.now() - 48 * 86400000).toISOString()
  },
  {
    id: 'moto-cne-202',
    model_id: 'mod-vms-ckee-125',
    showroom_id: 'shw-constantine-01',
    vin: 'VMSDZ2026CK891202',
    color: 'Bleu Marine',
    engine_specs: 'Monocylindre 4T 125cc',
    acquisition_date: daysAgo(100),
    arrival_date: daysAgo(96), // 96 DAYS OLD: AGING STOCK!
    status: 'available',
    notes: 'Stock supérieur à 90 jours à Constantine.',
    created_at: new Date(Date.now() - 96 * 86400000).toISOString()
  },
  {
    id: 'moto-cne-203',
    model_id: 'mod-benelli-trk-502',
    showroom_id: 'shw-constantine-01',
    vin: 'BN502TRK2026CNE03',
    color: 'Gris Anthracite / Jaune',
    engine_specs: 'Bicylindre 4T 500cc Euro 5',
    acquisition_date: daysAgo(15),
    arrival_date: daysAgo(12),
    status: 'in_transfer', // In transit from Béjaïa to Constantine!
    notes: 'Transfert en cours de transport.',
    created_at: new Date(Date.now() - 12 * 86400000).toISOString()
  },

  // 4. Béjaïa Port / Siège Inventory
  {
    id: 'moto-bja-301',
    model_id: 'mod-benelli-trk-502',
    showroom_id: 'shw-bejaia-01',
    vin: 'BN502TRK2026BJA01',
    color: 'Blanc Perle Aventure',
    engine_specs: 'Bicylindre 4T 500cc',
    acquisition_date: daysAgo(135),
    arrival_date: daysAgo(130), // 130 DAYS OLD: AGING STOCK!
    status: 'available',
    notes: 'Stock siège disponible pour réallocation nationale.',
    created_at: new Date(Date.now() - 130 * 86400000).toISOString()
  },
  {
    id: 'moto-bja-302',
    model_id: 'mod-vms-victoria-200',
    showroom_id: 'shw-bejaia-01',
    vin: 'VMSDZ2026VC112302',
    color: 'Noir Ébène',
    engine_specs: 'Monocylindre 4T 175cc',
    acquisition_date: daysAgo(18),
    arrival_date: daysAgo(15),
    status: 'available',
    notes: 'Neuf sortie de ligne d\'assemblage Béjaïa.',
    created_at: new Date(Date.now() - 15 * 86400000).toISOString()
  },

  // 5. Sétif & Blida Inventory
  {
    id: 'moto-stf-401',
    model_id: 'mod-vms-driver-150',
    showroom_id: 'shw-setif-01',
    vin: 'VMSDZ2026DR456401',
    color: 'Blanc / Rouge Sport',
    engine_specs: 'Monocylindre 4T 150cc',
    acquisition_date: daysAgo(60),
    arrival_date: daysAgo(55),
    status: 'sold',
    sale_date: daysAgo(5),
    notes: 'Vendu avec pack accessoires top-case.',
    created_at: new Date(Date.now() - 55 * 86400000).toISOString()
  },
  {
    id: 'moto-bld-501',
    model_id: 'mod-vms-ckee-125',
    showroom_id: 'shw-blida-01',
    vin: 'VMSDZ2026CK891501',
    color: 'Noir Mat',
    engine_specs: 'Monocylindre 4T 125cc',
    acquisition_date: daysAgo(10),
    arrival_date: daysAgo(8),
    status: 'available',
    notes: 'Stock récent.',
    created_at: new Date(Date.now() - 8 * 86400000).toISOString()
  }
];

export const INITIAL_REQUESTS: CustomerRequest[] = [
  {
    id: 'req-2026-001',
    reference: 'REQ-2026-8821',
    customer_id: 'cust-01',
    user_id: 'usr-customer-01',
    first_name: 'Amine',
    last_name: 'Dahmani',
    phone: '0550123456',
    phone_normalized: '+213550123456',
    email: 'amine.dahmani@gmail.com',
    motorcycle_model_id: 'mod-vms-victoria-200', // Victoria 200 in Alger! Currently 0 in Alger showroom!
    wilaya_code: '16',
    city: 'Hussein Dey',
    status: 'pending',
    notes: 'Recherche activement la couleur Blanche ou Cognac pour trajet quotidien.',
    created_at: daysAgo(2) + 'T14:30:00Z'
  },
  {
    id: 'req-2026-002',
    reference: 'REQ-2026-8822',
    first_name: 'Mehdi',
    last_name: 'Zitouni',
    phone: '0661223344',
    phone_normalized: '+213661223344',
    email: 'mehdi.zitouni@outlook.com',
    motorcycle_model_id: 'mod-benelli-trk-502',
    wilaya_code: '25', // Constantine
    city: 'Ali Mendjeli',
    status: 'available_notified',
    matched_showroom_id: 'shw-constantine-01',
    notified_at: daysAgo(1) + 'T09:15:00Z',
    notes: 'Notification envoyée au client dès la validation du transfert.',
    created_at: daysAgo(4) + 'T11:00:00Z'
  },
  {
    id: 'req-2026-003',
    reference: 'REQ-2026-8823',
    first_name: 'Walid',
    last_name: 'Brahimi',
    phone: '0770556677',
    phone_normalized: '+213770556677',
    email: 'walid.brahimi@gmail.com',
    motorcycle_model_id: 'mod-vms-ckee-125',
    wilaya_code: '31', // Oran
    city: 'Es-Senia',
    status: 'fulfilled',
    matched_showroom_id: 'shw-oran-01',
    fulfilled_at: daysAgo(3) + 'T16:00:00Z',
    notes: 'Achat finalisé avec succès au Showroom Es-Senia.',
    created_at: daysAgo(6) + 'T10:20:00Z'
  },
  {
    id: 'req-2026-004',
    reference: 'REQ-2026-8824',
    first_name: 'Sofiane',
    last_name: 'Larbi',
    phone: '0555998877',
    phone_normalized: '+213555998877',
    email: 'sofiane.larbi@yahoo.fr',
    motorcycle_model_id: 'mod-vms-driver-150',
    wilaya_code: '09', // Blida
    city: 'Boufarik',
    status: 'preorder_redirected',
    notes: 'Modèle en rupture dans la région, client redirigé vers motobladi.dz.',
    created_at: daysAgo(5) + 'T18:40:00Z'
  }
];

export const INITIAL_TRANSFERS: Transfer[] = [
  {
    id: 'trf-2026-01',
    reference: 'TRF-2026-0412',
    motorcycle_id: 'moto-cne-203', // Benelli TRK 502
    source_showroom_id: 'shw-bejaia-01',
    destination_showroom_id: 'shw-constantine-01',
    requested_by: 'usr-owner-cne-01',
    status: 'in_transit',
    reason: 'Forte demande client à Constantine et stock disponible au siège de Béjaïa.',
    stock_age_at_request: 85,
    approved_by: 'usr-super-admin-01',
    approved_at: daysAgo(2) + 'T10:00:00Z',
    shipped_at: daysAgo(1) + 'T08:30:00Z',
    notes: 'Transporteur VMS Express Camion #04.',
    created_at: daysAgo(3) + 'T15:00:00Z',
    history: [
      {
        id: 'th-1',
        transfer_id: 'trf-2026-01',
        to_status: 'pending',
        comment: 'Demande soumise par Showroom Constantine',
        created_at: daysAgo(3) + 'T15:00:00Z'
      },
      {
        id: 'th-2',
        transfer_id: 'trf-2026-01',
        from_status: 'pending',
        to_status: 'approved',
        comment: 'Approuvé par VMS Direction Commerciale',
        created_at: daysAgo(2) + 'T10:00:00Z'
      },
      {
        id: 'th-3',
        transfer_id: 'trf-2026-01',
        from_status: 'approved',
        to_status: 'in_transit',
        comment: 'Moto chargée dans le camion logistique VMS',
        created_at: daysAgo(1) + 'T08:30:00Z'
      }
    ]
  },
  {
    id: 'trf-2026-02',
    reference: 'TRF-2026-0399',
    motorcycle_id: 'moto-stf-401',
    source_showroom_id: 'shw-alger-01',
    destination_showroom_id: 'shw-setif-01',
    requested_by: 'usr-super-admin-01',
    status: 'received',
    reason: 'Rééquilibrage de stock vers El Eulma.',
    stock_age_at_request: 94,
    approved_by: 'usr-super-admin-01',
    approved_at: daysAgo(14) + 'T11:00:00Z',
    shipped_at: daysAgo(12) + 'T07:00:00Z',
    received_by: 'usr-owner-alger-01',
    received_at: daysAgo(10) + 'T15:45:00Z',
    notes: 'Réception confirmée sans réserve.',
    created_at: daysAgo(15) + 'T09:00:00Z',
    history: [
      {
        id: 'th-4',
        transfer_id: 'trf-2026-02',
        to_status: 'received',
        comment: 'Réception confirmée au showroom de Sétif',
        created_at: daysAgo(10) + 'T15:45:00Z'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-01',
    recipient_profile_id: 'usr-customer-01',
    recipient_phone: '0550123456',
    recipient_email: 'amine.dahmani@gmail.com',
    type: 'stock_available',
    title: 'Disponibilité en cours de traitement',
    message: 'Votre demande REQ-2026-8821 pour VMS Victoria 200 a été prise en compte par le réseau commercial VMS.',
    is_read: false,
    channel: 'in_app',
    created_at: daysAgo(2) + 'T14:31:00Z'
  },
  {
    id: 'notif-02',
    recipient_profile_id: 'usr-owner-alger-01',
    type: 'transfer_update',
    title: 'Opportunité Compte Global détectée',
    message: 'Un client à Alger recherche un VMS Victoria 200. Un modèle dormant (>115j) est disponible au Showroom Oran.',
    is_read: false,
    channel: 'in_app',
    created_at: daysAgo(1) + 'T10:15:00Z'
  },
  {
    id: 'notif-03',
    recipient_profile_id: 'usr-super-admin-01',
    type: 'transfer_update',
    title: 'Transfert en cours d\'acheminement',
    message: 'Transfert TRF-2026-0412 en transit entre Béjaïa et Constantine.',
    is_read: true,
    channel: 'in_app',
    created_at: daysAgo(1) + 'T08:35:00Z'
  }
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'sal-2026-01',
    reference: 'FAC-2026-0042',
    motorcycle_id: 'moto-stf-401',
    showroom_id: 'shw-setif-01',
    customer_name: 'Rabah Belkheir',
    customer_phone: '0561334455',
    sale_price: 365000,
    payment_method: 'CASH',
    sale_date: daysAgo(5),
    notes: 'Paiement comptant à la caisse du showroom.',
    created_at: daysAgo(5) + 'T16:20:00Z'
  },
  {
    id: 'sal-2026-02',
    reference: 'FAC-2026-0038',
    motorcycle_id: 'moto-orn-103',
    showroom_id: 'shw-oran-01',
    customer_name: 'Hamid Senoussi',
    customer_phone: '0772889900',
    sale_price: 255000,
    payment_method: 'CHEQUE',
    sale_date: daysAgo(18),
    notes: 'Chèque bancaire certifié BNA.',
    created_at: daysAgo(18) + 'T11:45:00Z'
  }
];

export const INITIAL_PREORDERS: PreorderRedirect[] = [
  {
    id: 'po-01',
    customer_id: 'cust-04',
    user_id: 'usr-customer-01',
    motorcycle_model_id: 'mod-vms-driver-150',
    wilaya_code: '09',
    city: 'Boufarik',
    target_url: 'https://motobladi.dz/',
    referrer: 'https://quick.vms.dz/portal/requests',
    created_at: daysAgo(5) + 'T18:40:00Z'
  },
  {
    id: 'po-02',
    motorcycle_model_id: 'mod-benelli-leoncino-500',
    wilaya_code: '16',
    city: 'Kouba',
    target_url: 'https://motobladi.dz/',
    created_at: daysAgo(8) + 'T14:10:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-01',
    user_id: 'usr-super-admin-01',
    user_email: 'admin@vms.dz',
    action_type: 'AUTH_LOGIN',
    entity_type: 'profiles',
    details: { message: 'Connexion Super Administrateur réussie', ip: '105.101.44.12' },
    created_at: daysAgo(0) + 'T08:00:00Z'
  },
  {
    id: 'aud-02',
    user_id: 'usr-super-admin-01',
    user_email: 'admin@vms.dz',
    action_type: 'TRANSFER_APPROVE',
    entity_type: 'transfers',
    entity_id: 'trf-2026-01',
    details: { reference: 'TRF-2026-0412', model: 'Benelli TRK 502', from: 'Béjaïa', to: 'Constantine' },
    created_at: daysAgo(2) + 'T10:00:00Z'
  },
  {
    id: 'aud-03',
    user_id: 'usr-owner-alger-01',
    user_email: 'alger@vms.dz',
    action_type: 'STOCK_CREATE',
    entity_type: 'motorcycles',
    entity_id: 'moto-alg-001',
    details: { vin: 'VMSDZ2026CK891201', model: 'VMS C-Kee 125' },
    created_at: daysAgo(18) + 'T09:12:00Z'
  },
  {
    id: 'aud-04',
    user_id: 'usr-customer-01',
    user_email: 'amine.dahmani@gmail.com',
    action_type: 'CUSTOMER_REQUEST_CREATE',
    entity_type: 'customer_requests',
    entity_id: 'req-2026-001',
    details: { reference: 'REQ-2026-8821', model: 'VMS Victoria 200', wilaya: '16' },
    created_at: daysAgo(2) + 'T14:30:00Z'
  }
];
