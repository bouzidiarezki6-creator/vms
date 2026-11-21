// Generator script to produce 80 VMS Showrooms, 250+ Customer Requests, 400+ Motorcycles, Transfers, and Sales
const fs = require('fs');
const path = require('path');

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

const WILAYA_CITIES = {
  '16': ['Hussein Dey', 'Bouzaréah', 'Dar El Beïda', 'Chéraga', 'Kouba', 'Birtouta', 'Rouïba', 'Bab El Oued', 'Draria', 'Zéralda', 'Hydra', 'El Harrach'],
  '31': ['Es-Senia', 'Bir El Djir', 'Arzew', 'Aïn El Turk', 'Oran Centre', 'Gdyel', 'Bethioua'],
  '25': ['Ali Mendjeli', 'El Khroub', 'Constantine Centre', 'Hamma Bouziane', 'Didouche Mourad'],
  '06': ['Oued Ghir', 'Akbou', 'Tazmalt', 'Béjaïa Ville', 'El Kseur', 'Amizour', 'Sidi Aïch'],
  '19': ['Sétif Ville', 'El Eulma', 'Aïn Oulmene', 'Aïn Arnat', 'Bougaa'],
  '09': ['Blida Centre', 'Boufarik', 'Ouled Yaïch', 'Mouzaïa', 'El Affroun'],
  '23': ['Annaba Centre', 'El Bouni', 'Sidi Amar', 'El Hadjar'],
  '05': ['Batna Ville', 'Barika', 'Aïn Touta', 'Tazoult'],
  '15': ['Tizi Ouzou', 'Azazga', 'Draa Ben Khedda', 'Boghni'],
  '13': ['Tlemcen Ville', 'Maghnia', 'Mansourah', 'Ghazaouet'],
  '02': ['Chlef Ville', 'Ténès', 'Oued Fodda'],
  '10': ['Bouira', 'Lakhdaria', 'Sour El Ghozlane'],
  '34': ['Bordj Bou Arréridj', 'Ras El Oued', 'Mansoura'],
  '35': ['Boumerdès', 'Khemis El Khechna', 'Boudouaou'],
  '42': ['Tipaza', 'Koléa', 'Cherchell', 'Bou Ismaïl'],
  '17': ['Djelfa', 'Aïn Oussera', 'Hassi Bahbah'],
  '07': ['Biskra', 'Tolga', 'Sidi Okba'],
  '18': ['Jijel', 'Taher', 'El Milia'],
  '21': ['Skikda', 'El Harrouch', 'Collo'],
  '26': ['Médéa', 'Berrouaghia', 'Ksar El Boukhari'],
  '27': ['Mostaganem', 'Aïn Tedeles', 'Sidi Ali'],
  '28': ['M\'Sila', 'Boussaâda', 'Sidi Aïssa'],
  '29': ['Mascara', 'Tighennif', 'Sig'],
  '30': ['Ouargla', 'Hassi Messaoud', 'Touggourt'],
  '48': ['Relizane', 'Oued Rhiou', 'Yellel'],
  '47': ['Ghardaïa', 'Metlili', 'El Guerrara'],
  '39': ['El Oued', 'Guemar', 'Robbah'],
  '44': ['Aïn Defla', 'Khemis Miliana', 'El Attaf'],
  '22': ['Sidi Bel Abbès', 'Telagh', 'Ben Badis'],
  '14': ['Tiaret', 'Sougueur', 'Frenda'],
  '20': ['Saïda', 'Youb', 'Aïn El Hadjar'],
  '46': ['Aïn Témouchent', 'Béni Saf', 'Hammam Bouhadjar'],
  '12': ['Tébessa', 'Cheria', 'El Aouinet'],
  '24': ['Guelma', 'Oued Zenati', 'Bouchegouf'],
  '40': ['Khenchela', 'Chechar', 'Kaïs'],
  '41': ['Souk Ahras', 'Sedrata', 'M\'Daourouch'],
  '43': ['Mila', 'Chelghoum Laïd', 'Tadjenanet'],
  '08': ['Béchar', 'Béni Ounif', 'Taghit'],
  '01': ['Adrar', 'Reggane', 'Timimoun']
};

const MODELS = [
  {
    id: 'mod-vms-driver-125',
    name: 'VMS Driver 125',
    brand: 'VMS',
    category: 'Scooter Urbain',
    engine_cc: 125,
    power_hp: 8.8,
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
    id: 'mod-vms-cuxi-110',
    name: 'VMS Cuxi 110',
    brand: 'VMS',
    category: 'Scooter Compact',
    engine_cc: 110,
    power_hp: 7.2,
    cooling: 'Air',
    fuel_system: 'Carburateur',
    price_dzd: 215000,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra léger, consommation record inférieure à 2.1L/100km, idéal pour les livraisons et les trajets quotidiens.',
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
    name: 'Benelli TRK 502 X',
    brand: 'Benelli',
    category: 'Trail / Aventure',
    engine_cc: 500,
    power_hp: 47.6,
    cooling: 'Liquide',
    fuel_system: 'EFI Double Papillon',
    price_dzd: 1280000,
    image_url: 'https://images.unsplash.com/photo-1558981420-87aa9dad1c89?w=600&auto=format&fit=crop&q=80',
    description: 'Le maxi trail aventurier distribué par VMS en Algérie. Bicylindre réactif, réservoir 20L, crash bars et roues à rayons.',
    is_active: true,
    created_at: '2026-01-01T00:00:00Z'
  }
];

// Helper: normalize phone
function normalizePhone(phone) {
  if (!phone) return '';
  let cleaned = String(phone).replace(/\D/g, '');
  if (cleaned.startsWith('213')) {
    cleaned = '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    cleaned = '+213' + cleaned.substring(1);
  } else if (!cleaned.startsWith('+')) {
    cleaned = '+213' + cleaned;
  }
  return cleaned;
}

// -----------------------------------------------------------------------------
// 1. GENERATE EXACT 80 SHOWROOMS ACROSS ALGERIA
// -----------------------------------------------------------------------------
const SHOWROOM_DEFS = [
  // 06 - Béjaïa (Usine & Réseau)
  { wilaya: '06', city: 'Oued Ghir', name: 'VMS Siège & Usine Oued Ghir', address: 'Zone Industrielle Oued Ghir, RN 12, Béjaïa', phone: '034 18 50 00 / 0560 09 20 01', owner: 'M. Meziane' },
  { wilaya: '06', city: 'Akbou', name: 'VMS Showroom Akbou Vallée', address: 'Boulevard Colonel Amirouche, Akbou', phone: '034 35 12 40 / 0555 45 67 89', owner: 'M. Ould Ali' },
  { wilaya: '06', city: 'Tazmalt', name: 'VMS Agence Tazmalt', address: 'Route Nationale 26, Centre-Ville, Tazmalt', phone: '034 38 77 12 / 0550 88 99 22', owner: 'M. Guendouz' },

  // 48 - Relizane (Centre Logistique Ouest)
  { wilaya: '48', city: 'Relizane', name: 'VMS Pôle Logistique & Showroom Ouest Relizane', address: 'Zone d\'Activité Commerciale RN 04, Relizane', phone: '046 92 10 30 / 0560 12 34 56', owner: 'M. Mansouri' },
  { wilaya: '48', city: 'Oued Rhiou', name: 'VMS Agence Oued Rhiou', address: 'Avenue de la République, Oued Rhiou', phone: '046 95 44 20 / 0551 22 33 44', owner: 'M. Bouziane' },

  // 16 - Alger (10 Showrooms & Agents Officiels)
  { wilaya: '16', city: 'Bouzaréah', name: 'VMS Moto Team Bouzaréah', address: '12 Rue des Frères Bouadou, Bouzaréah, Alger', phone: '023 18 90 20 / 0560 11 22 33', owner: 'M. Belkacem' },
  { wilaya: '16', city: 'Hussein Dey', name: 'VMS Showroom Alger Centre Hussein Dey', address: '14 Rue Tripoli, Hussein Dey, Alger', phone: '023 77 45 10 / 0555 12 34 56', owner: 'M. Benali' },
  { wilaya: '16', city: 'Dar El Beïda', name: 'VMS Dar El Beïda Aéroport', address: 'Zone Commerciale, RN 05, Dar El Beïda, Alger', phone: '023 85 22 10 / 0550 99 88 77', owner: 'M. Saidi' },
  { wilaya: '16', city: 'Chéraga', name: 'VMS Showroom Chéraga Ouest', address: 'Route de Bouchaoui, Chéraga, Alger', phone: '023 36 40 80 / 0554 11 33 55', owner: 'M. Khelifi' },
  { wilaya: '16', city: 'Kouba', name: 'VMS Agence Kouba Jolie Vue', address: 'Boulevard Benboulaid, Kouba, Alger', phone: '023 71 19 00 / 0552 44 66 88', owner: 'M. Dahmani' },
  { wilaya: '16', city: 'Birtouta', name: 'VMS Birtouta Pôle Sud', address: 'Route de Blida, Birtouta, Alger', phone: '023 58 77 00 / 0553 90 12 34', owner: 'M. Chaouch' },
  { wilaya: '16', city: 'Rouïba', name: 'VMS Showroom Rouïba Zone Industrielle', address: 'Avenue de la Gare, Rouïba, Alger', phone: '023 86 33 11 / 0551 77 88 99', owner: 'M. Touati' },
  { wilaya: '16', city: 'Bab El Oued', name: 'VMS Bab El Oued Littoral', address: 'Boulevard Abderrahmane Mira, Bab El Oued, Alger', phone: '023 94 10 50 / 0556 22 44 66', owner: 'M. Zerrouki' },
  { wilaya: '16', city: 'Draria', name: 'VMS Agence Draria Hauts Plateaux', address: 'Rue Principale, Sebbala, Draria, Alger', phone: '023 26 44 99 / 0557 33 55 77', owner: 'M. Cherif' },
  { wilaya: '16', city: 'Zéralda', name: 'VMS Zéralda Côte Ouest', address: 'Boulevard du 1er Novembre, Zéralda, Alger', phone: '023 32 80 10 / 0558 44 66 00', owner: 'M. Hadj' },

  // 31 - Oran (4 Showrooms)
  { wilaya: '31', city: 'Es-Senia', name: 'VMS Showroom Oran Es-Senia', address: 'Zone des Garages, Route de Tlemcen, Es-Senia, Oran', phone: '041 51 22 90 / 0551 98 76 54', owner: 'M. Yacine' },
  { wilaya: '31', city: 'Bir El Djir', name: 'VMS Bir El Djir Pépinière', address: 'Boulevard Millénium, Bir El Djir, Oran', phone: '041 62 80 00 / 0552 11 22 99', owner: 'M. Mokhtari' },
  { wilaya: '31', city: 'Arzew', name: 'VMS Agence Arzew Port', address: 'Rue Emir Abdelkader, Arzew, Oran', phone: '041 47 33 10 / 0553 22 33 00', owner: 'M. Benaissa' },
  { wilaya: '31', city: 'Aïn El Turk', name: 'VMS Aïn El Turk Corniche', address: 'Boulevard Front de Mer, Aïn El Turk, Oran', phone: '041 39 88 40 / 0554 33 44 11', owner: 'M. Slimani' },

  // 25 - Constantine (3 Showrooms)
  { wilaya: '25', city: 'Ali Mendjeli', name: 'VMS Showroom Constantine Ali Mendjeli', address: 'Nouvelle Ville Ali Mendjeli UV 05, Constantine', phone: '031 67 40 10 / 0554 33 22 11', owner: 'M. Nadir' },
  { wilaya: '25', city: 'El Khroub', name: 'VMS Agence El Khroub', address: 'Boulevard Mohamed Khemisti, El Khroub, Constantine', phone: '031 96 12 30 / 0555 44 55 22', owner: 'M. Ferhat' },
  { wilaya: '25', city: 'Constantine Centre', name: 'VMS Constantine Bellevue', address: 'Rue Rahmani Achour, Bellevue, Constantine', phone: '031 92 45 80 / 0556 55 66 33', owner: 'M. Larbi' },

  // 19 - Sétif (3 Showrooms)
  { wilaya: '19', city: 'Sétif Ville', name: 'VMS Showroom Sétif 08 Mai', address: 'Cité 1000 Logements, RN 05, Sétif', phone: '036 84 50 20 / 0553 77 88 99', owner: 'M. Bouaziz' },
  { wilaya: '19', city: 'El Eulma', name: 'VMS El Eulma Dubaï Motor', address: 'Rue de Dubaï, El Eulma, Sétif', phone: '036 87 11 40 / 0554 88 99 00', owner: 'M. Gherbi' },
  { wilaya: '19', city: 'Aïn Oulmene', name: 'VMS Aïn Oulmene Sud', address: 'Boulevard Zighoud Youcef, Aïn Oulmene, Sétif', phone: '036 72 30 10 / 0555 99 00 11', owner: 'M. Zitouni' },

  // 09 - Blida (3 Showrooms)
  { wilaya: '09', city: 'Blida Centre', name: 'VMS Showroom Blida Bab Sebt', address: 'Boulevard Larbi Tebessi, Bab Sebt, Blida', phone: '025 31 40 60 / 0552 33 44 55', owner: 'M. Taleb' },
  { wilaya: '09', city: 'Boufarik', name: 'VMS Boufarik La Plaine', address: 'Avenue de la Liberté, Boufarik, Blida', phone: '025 47 20 80 / 0553 44 55 66', owner: 'M. Allouche' },
  { wilaya: '09', city: 'Ouled Yaïch', name: 'VMS Ouled Yaïch Université', address: 'RN 01, Proche Campus, Ouled Yaïch, Blida', phone: '025 22 15 90 / 0554 55 66 77', owner: 'M. Hamidi' },

  // 15 - Tizi Ouzou (3 Showrooms)
  { wilaya: '15', city: 'Tizi Ouzou', name: 'VMS Showroom Tizi Ouzou Nouvelle Ville', address: 'Boulevard Krim Belkacem, Tizi Ouzou', phone: '026 19 22 30 / 0551 66 77 88', owner: 'M. Mebarki' },
  { wilaya: '15', city: 'Azazga', name: 'VMS Agence Azazga Cheurfa', address: 'Avenue du 1er Novembre, Azazga, Tizi Ouzou', phone: '026 34 10 20 / 0552 77 88 99', owner: 'M. Yahiaoui' },
  { wilaya: '15', city: 'Draa Ben Khedda', name: 'VMS Draa Ben Khedda RN12', address: 'RN 12, Sortie Est, Draa Ben Khedda', phone: '026 25 40 10 / 0553 88 99 00', owner: 'M. Amrani' },

  // 05 - Batna (2 Showrooms)
  { wilaya: '05', city: 'Batna Ville', name: 'VMS Showroom Batna Aurès', address: 'Route de Biskra, Parc à Fourrage, Batna', phone: '033 86 50 20 / 0552 66 55 44', owner: 'M. Brahimi' },
  { wilaya: '05', city: 'Barika', name: 'VMS Agence Barika Carrefour', address: 'Boulevard de l\'Indépendance, Barika, Batna', phone: '033 78 30 15 / 0553 77 66 55', owner: 'M. Driss' },

  // 23 - Annaba (2 Showrooms)
  { wilaya: '23', city: 'Annaba Centre', name: 'VMS Showroom Annaba Plaine Ouest', address: 'Avenue de l\'ALN, Plaine Ouest, Annaba', phone: '038 45 60 70 / 0554 88 77 66', owner: 'M. Tebboune' },
  { wilaya: '23', city: 'El Bouni', name: 'VMS El Bouni Seybouse', address: 'Boulevard de l\'Université, El Bouni, Annaba', phone: '038 52 14 30 / 0555 99 88 77', owner: 'M. Boumaiza' },

  // 13 - Tlemcen (2 Showrooms)
  { wilaya: '13', city: 'Tlemcen Ville', name: 'VMS Showroom Tlemcen Kiffane', address: 'Boulevard Pasteur, Kiffane, Tlemcen', phone: '043 27 80 90 / 0556 11 00 22', owner: 'M. Bensalah' },
  { wilaya: '13', city: 'Maghnia', name: 'VMS Agence Maghnia Frontière', address: 'Rue de la Gare, Maghnia, Tlemcen', phone: '043 31 40 20 / 0557 22 11 33', owner: 'M. Senoussi' },

  // 02 - Chlef (2 Showrooms)
  { wilaya: '02', city: 'Chlef Ville', name: 'VMS Showroom Chlef El Mokrani', address: 'Boulevard Mohamed Boudiaf, Chlef', phone: '027 77 30 40 / 0558 33 22 44', owner: 'M. Medjdoub' },
  { wilaya: '02', city: 'Ténès', name: 'VMS Ténès Port & Ville', address: 'Avenue de la Mer, Ténès, Chlef', phone: '027 76 12 80 / 0559 44 33 55', owner: 'M. Ziane' },

  // 35 - Boumerdès (2 Showrooms)
  { wilaya: '35', city: 'Boumerdès', name: 'VMS Boumerdès Centre Côtier', address: 'Boulevard du Front de Mer, Boumerdès', phone: '024 81 50 60 / 0550 55 44 66', owner: 'M. Rebbani' },
  { wilaya: '35', city: 'Khemis El Khechna', name: 'VMS Khemis El Khechna Express', address: 'Avenue de la République, Khemis El Khechna, Boumerdès', phone: '024 89 20 10 / 0551 66 55 77', owner: 'M. Louanchi' },

  // 42 - Tipaza (2 Showrooms)
  { wilaya: '42', city: 'Tipaza', name: 'VMS Tipaza Ville Romaine', address: 'RN 11, Face Complexe Touristique, Tipaza', phone: '024 49 10 30 / 0552 77 66 88', owner: 'M. Merad' },
  { wilaya: '42', city: 'Koléa', name: 'VMS Koléa Mitidja Ouest', address: 'Boulevard Emir Khaled, Koléa, Tipaza', phone: '024 38 45 20 / 0553 88 77 99', owner: 'M. Belarbi' },

  // 10 - Bouira (2 Showrooms)
  { wilaya: '10', city: 'Bouira', name: 'VMS Showroom Bouira Djurdjura', address: 'Boulevard Zighoud Youcef, Bouira', phone: '026 93 40 50 / 0554 99 88 00', owner: 'M. Chabane' },
  { wilaya: '10', city: 'Lakhdaria', name: 'VMS Lakhdaria Gorges', address: 'RN 05, Entrée Sud, Lakhdaria, Bouira', phone: '026 88 12 30 / 0555 00 11 22', owner: 'M. Boudjemaa' },

  // 34 - Bordj Bou Arréridj (2 Showrooms)
  { wilaya: '34', city: 'Bordj Bou Arréridj', name: 'VMS Showroom BBA Electronique', address: 'Avenue du 8 Mai 1945, BBA', phone: '035 68 20 40 / 0556 11 22 33', owner: 'M. Benmansour' },
  { wilaya: '34', city: 'Ras El Oued', name: 'VMS Agence Ras El Oued', address: 'Rue Principale, Ras El Oued, BBA', phone: '035 74 15 20 / 0557 22 33 44', owner: 'M. Benaissa' },

  // 17 - Djelfa (2 Showrooms)
  { wilaya: '17', city: 'Djelfa', name: 'VMS Showroom Djelfa Berbère', address: 'Route de Laghouat, Cité 5 Juillet, Djelfa', phone: '027 87 30 10 / 0558 33 44 55', owner: 'M. Naili' },
  { wilaya: '17', city: 'Aïn Oussera', name: 'VMS Aïn Oussera Nord', address: 'RN 01, Boulevard Pasteur, Aïn Oussera', phone: '027 82 14 30 / 0559 44 55 66', owner: 'M. Guenane' },

  // 07 - Biskra (2 Showrooms)
  { wilaya: '07', city: 'Biskra', name: 'VMS Showroom Biskra Ziban', address: 'Avenue des Frères Zaâbat, Biskra', phone: '033 74 20 80 / 0550 55 66 77', owner: 'M. Djedidi' },
  { wilaya: '07', city: 'Tolga', name: 'VMS Tolga Palmiers', address: 'Boulevard de la Liberté, Tolga, Biskra', phone: '033 58 11 90 / 0551 66 77 88', owner: 'M. Kaddour' },

  // 28 - M'Sila (2 Showrooms)
  { wilaya: '28', city: 'M\'Sila', name: 'VMS Showroom M\'Sila Hodna', address: 'Route de Boussaâda, M\'Sila', phone: '035 55 40 20 / 0552 77 88 99', owner: 'M. Reguig' },
  { wilaya: '28', city: 'Boussaâda', name: 'VMS Boussaâda Cité Nasr', address: 'Boulevard Nasreddine Dinet, Boussaâda', phone: '035 52 18 30 / 0553 88 99 00', owner: 'M. Rouabah' },

  // 29 - Mascara (2 Showrooms)
  { wilaya: '29', city: 'Mascara', name: 'VMS Showroom Mascara Emir', address: 'Boulevard Khemisti, Mascara', phone: '045 80 12 30 / 0554 99 00 11', owner: 'M. Benmoussa' },
  { wilaya: '29', city: 'Tighennif', name: 'VMS Tighennif Palikao', address: 'Avenue Pasteur, Tighennif, Mascara', phone: '045 83 24 50 / 0555 00 11 22', owner: 'M. Bouchenafa' },

  // 18 - Jijel (2 Showrooms)
  { wilaya: '18', city: 'Jijel', name: 'VMS Showroom Jijel Corniche', address: 'Boulevard Emir Abdelkader, Jijel', phone: '034 50 14 20 / 0556 11 22 33', owner: 'M. Boukerche' },
  { wilaya: '18', city: 'Taher', name: 'VMS Taher Aéroport', address: 'RN 43, Taher, Jijel', phone: '034 48 30 10 / 0557 22 33 44', owner: 'M. Filali' },

  // 21 - Skikda (2 Showrooms)
  { wilaya: '21', city: 'Skikda', name: 'VMS Showroom Skikda Russicada', address: 'Avenue Didouche Mourad, Skikda', phone: '038 75 30 40 / 0558 33 44 55', owner: 'M. Chettah' },
  { wilaya: '21', city: 'El Harrouch', name: 'VMS El Harrouch Vallée', address: 'Avenue de la République, El Harrouch, Skikda', phone: '038 72 15 20 / 0559 44 55 66', owner: 'M. Boudraa' },

  // 26 - Médéa (2 Showrooms)
  { wilaya: '26', city: 'Médéa', name: 'VMS Showroom Médéa Titery', address: 'Avenue de l\'Indépendance, Médéa', phone: '025 58 20 30 / 0550 55 66 77', owner: 'M. Zebboudj' },
  { wilaya: '26', city: 'Berrouaghia', name: 'VMS Berrouaghia Sud', address: 'RN 01, Berrouaghia, Médéa', phone: '025 77 12 40 / 0551 66 77 88', owner: 'M. Allili' },

  // 27 - Mostaganem (2 Showrooms)
  { wilaya: '27', city: 'Mostaganem', name: 'VMS Showroom Mostaganem Salamandre', address: 'Boulevard Front de Mer, Salamandre, Mostaganem', phone: '045 21 40 50 / 0552 77 88 99', owner: 'M. Hamidi' },
  { wilaya: '27', city: 'Aïn Tedeles', name: 'VMS Aïn Tedeles Plaine', address: 'Route Nationale 11, Aïn Tedeles, Mostaganem', phone: '045 33 18 20 / 0553 88 99 00', owner: 'M. Oulhaci' },

  // 30 - Ouargla (2 Showrooms Grand Sud)
  { wilaya: '30', city: 'Ouargla', name: 'VMS Showroom Officiel Grand Sud Ouargla', address: 'Zone Industrielle Ouest, RN 49, Ouargla', phone: '029 71 80 90 / 0560 30 40 50', owner: 'M. Benaouda' },
  { wilaya: '30', city: 'Hassi Messaoud', name: 'VMS Hassi Messaoud Hydrocarbures', address: 'Boulevard 1er Novembre, Base Vie, Hassi Messaoud', phone: '029 73 40 10 / 0555 12 34 89', owner: 'M. Rouis' },

  // 44 - Aïn Defla (2 Showrooms)
  { wilaya: '44', city: 'Aïn Defla', name: 'VMS Showroom Aïn Defla Chelif', address: 'Boulevard Mohamed Boudiaf, Aïn Defla', phone: '027 60 18 20 / 0556 22 33 44', owner: 'M. Saadi' },
  { wilaya: '44', city: 'Khemis Miliana', name: 'VMS Khemis Miliana Carrefour', address: 'Avenue de la République, Khemis Miliana', phone: '027 66 45 10 / 0557 33 44 55', owner: 'M. Benkhedda' },

  // 22 - Sidi Bel Abbès
  { wilaya: '22', city: 'Sidi Bel Abbès', name: 'VMS Showroom Sidi Bel Abbès M\'Cid', address: 'Avenue Mitterrand, Faubourg Thiers, Sidi Bel Abbès', phone: '048 54 20 30 / 0558 44 55 66', owner: 'M. Mekki' },

  // 14 - Tiaret
  { wilaya: '14', city: 'Tiaret', name: 'VMS Showroom Tiaret Haras', address: 'Boulevard des Martyrs, Cité Volani, Tiaret', phone: '046 42 15 80 / 0559 55 66 77', owner: 'M. Tahari' },

  // 20 - Saïda
  { wilaya: '20', city: 'Saïda', name: 'VMS Showroom Saïda Eaux Vives', address: 'Avenue de l\'ALN, Saïda', phone: '048 47 30 10 / 0550 66 77 88', owner: 'M. Bendahmane' },

  // 46 - Aïn Témouchent
  { wilaya: '46', city: 'Aïn Témouchent', name: 'VMS Showroom Aïn Témouchent Plage', address: 'Boulevard de la Liberté, Aïn Témouchent', phone: '043 60 25 40 / 0551 77 88 99', owner: 'M. Belhadj' },

  // 47 - Ghardaïa
  { wilaya: '47', city: 'Ghardaïa', name: 'VMS Showroom Ghardaïa M\'Zab', address: 'Avenue 1er Novembre, Theniet El Makhzen, Ghardaïa', phone: '029 88 40 20 / 0552 88 99 00', owner: 'M. Baboun' },

  // 39 - El Oued
  { wilaya: '39', city: 'El Oued', name: 'VMS Showroom El Oued Souf', address: 'Boulevard Mohamed Khemisti, El Oued', phone: '032 21 50 30 / 0553 99 00 11', owner: 'M. Tidjani' },

  // 55 - Touggourt
  { wilaya: '55', city: 'Touggourt', name: 'VMS Showroom Touggourt Oasis', address: 'Avenue de la République, Touggourt', phone: '029 67 12 40 / 0554 00 11 22', owner: 'M. Djerbi' },

  // 12 - Tébessa
  { wilaya: '12', city: 'Tébessa', name: 'VMS Showroom Tébessa Murailles', address: 'Avenue Houari Boumédiène, Tébessa', phone: '037 49 30 10 / 0555 11 22 33', owner: 'M. Guesmia' },

  // 24 - Guelma
  { wilaya: '24', city: 'Guelma', name: 'VMS Showroom Guelma Calama', address: 'Boulevard du Volontariat, Guelma', phone: '037 20 45 60 / 0556 22 33 44', owner: 'M. Maouche' },

  // 40 - Khenchela
  { wilaya: '40', city: 'Khenchela', name: 'VMS Showroom Khenchela Nememcha', address: 'Boulevard de la Révolution, Khenchela', phone: '032 32 10 80 / 0557 33 44 55', owner: 'M. Harchaoui' },

  // 41 - Souk Ahras
  { wilaya: '41', city: 'Souk Ahras', name: 'VMS Showroom Souk Ahras Thagaste', address: 'Avenue Didouche Mourad, Souk Ahras', phone: '037 32 80 40 / 0558 44 55 66', owner: 'M. Boumaaza' },

  // 43 - Mila
  { wilaya: '43', city: 'Mila', name: 'VMS Showroom Mila Antique', address: 'Avenue de l\'ALN, Mila', phone: '031 57 20 10 / 0559 55 66 77', owner: 'M. Bouteraa' },

  // 04 - Oum El Bouaghi
  { wilaya: '04', city: 'Oum El Bouaghi', name: 'VMS Showroom Oum El Bouaghi Haracta', address: 'Boulevard Mohamed Khider, Oum El Bouaghi', phone: '032 42 15 30 / 0550 66 77 88', owner: 'M. Reghis' },

  // 03 - Laghouat
  { wilaya: '03', city: 'Laghouat', name: 'VMS Showroom Laghouat Oasis', address: 'Avenue de la Résistance, Laghouat', phone: '029 93 40 20 / 0551 77 88 99', owner: 'M. Rayane' },

  // 08 - Béchar
  { wilaya: '08', city: 'Béchar', name: 'VMS Showroom Béchar Saoura', address: 'Boulevard de l\'ALN, Cité Debdaba, Béchar', phone: '049 81 20 40 / 0552 88 99 00', owner: 'M. Belkheir' },

  // 01 - Adrar
  { wilaya: '01', city: 'Adrar', name: 'VMS Showroom Adrar Touat', address: 'Avenue du 1er Novembre, Place des Martyrs, Adrar', phone: '049 96 30 10 / 0553 99 00 11', owner: 'M. Boughrara' },

  // 11 - Tamanrasset
  { wilaya: '11', city: 'Tamanrasset', name: 'VMS Showroom Tamanrasset Hoggar', address: 'Avenue Ghabet Cheikh, Tamanrasset', phone: '029 55 12 30 / 0554 00 11 22', owner: 'M. Ag Mohamed' },

  // 58 - El Meniaa
  { wilaya: '58', city: 'El Meniaa', name: 'VMS Agence El Meniaa Rose des Sables', address: 'Avenue Principale, El Meniaa', phone: '029 80 15 20 / 0555 11 22 33', owner: 'M. Cherief' },

  // 36 - El Tarf
  { wilaya: '36', city: 'El Tarf', name: 'VMS Agence El Tarf Lac Tonga', address: 'Boulevard de l\'Indépendance, El Tarf', phone: '038 60 22 10 / 0556 22 33 44', owner: 'M. Nezzar' },

  // 45 - Naâma
  { wilaya: '45', city: 'Naâma', name: 'VMS Agence Naâma Steppes', address: 'Route Nationale 06, Mécheria / Naâma', phone: '049 79 10 30 / 0557 33 44 55', owner: 'M. Zaoui' },

  // 38 - Tissemsilt
  { wilaya: '38', city: 'Tissemsilt', name: 'VMS Agence Tissemsilt Ouarsenis', address: 'Boulevard Mohamed Boudiaf, Tissemsilt', phone: '046 47 20 40 / 0558 44 55 66', owner: 'M. Gacem' },

  // 32 - El Bayadh
  { wilaya: '32', city: 'El Bayadh', name: 'VMS Agence El Bayadh Alfa', address: 'Avenue de la République, El Bayadh', phone: '049 71 30 20 / 0559 55 66 77', owner: 'M. Boulenouar' },

  // 51 - Ouled Djellal
  { wilaya: '51', city: 'Ouled Djellal', name: 'VMS Agence Ouled Djellal Deglet Nour', address: 'Boulevard de la Fraternité, Ouled Djellal', phone: '033 59 12 30 / 0550 66 77 88', owner: 'M. Rahmani' }
];

// Ensure we have exactly 80 showrooms
console.log('Base showroom count:', SHOWROOM_DEFS.length);
while (SHOWROOM_DEFS.length < 80) {
  const i = SHOWROOM_DEFS.length + 1;
  const w = WILAYAS[(i * 3) % WILAYAS.length];
  SHOWROOM_DEFS.push({
    wilaya: w.code,
    city: `${w.name} Sud`,
    name: `VMS Agence Agréée ${w.name} Extension`,
    address: `Boulevard Principal, ${w.name}`,
    phone: `0550 ${String(10 + i).padStart(2, '0')} ${String(20 + i).padStart(2, '0')} ${String(30 + i).padStart(2, '0')}`,
    owner: `M. VMS Partner ${i}`
  });
}
console.log('Final showroom count:', SHOWROOM_DEFS.length);

// Build Showroom Objects & Profiles
const showrooms = SHOWROOM_DEFS.slice(0, 80).map((def, idx) => {
  const codeNum = String(idx + 1).padStart(2, '0');
  const id = `shw-vms-${def.wilaya.toLowerCase()}-${codeNum}`;
  const ownerId = `usr-owner-${def.wilaya.toLowerCase()}-${codeNum}`;
  return {
    id,
    name: def.name,
    code: `VMS-${def.wilaya}-${codeNum}`,
    wilaya_code: def.wilaya,
    city: def.city,
    address: def.address,
    phone: def.phone,
    email: `contact.${def.city.toLowerCase().replace(/[^a-z0-9]/g, '')}@vms.dz`,
    owner_id: ownerId,
    is_active: true,
    opening_hours: '08:30 - 17:30 (Sam - Jeu)',
    created_at: new Date(2025, 11, 15 + (idx % 15)).toISOString()
  };
});

// Build Profiles
const profiles = [
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

// Add showroom owner profiles for all 80 showrooms
showrooms.forEach(s => {
  if (!profiles.find(p => p.id === s.owner_id)) {
    profiles.push({
      id: s.owner_id,
      email: s.email,
      role: 'showroom_owner',
      first_name: s.name.split(' ')[1] || 'Directeur',
      last_name: s.city,
      phone: s.phone.split('/')[0].trim(),
      wilaya_code: s.wilaya_code,
      avatar_url: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150`,
      is_active: true,
      created_at: s.created_at
    });
  }
});

// -----------------------------------------------------------------------------
// 2. GENERATE 420 MOTORCYCLES DISTRIBUTED ACROSS 80 SHOWROOMS
// -----------------------------------------------------------------------------
const COLORS = ['Noir Mat', 'Blanc Nacre', 'Gris Titane', 'Bleu Nuit', 'Rouge VMS Racing', 'Jaune Sport'];
const motorcycles = [];

const NOW = new Date(); // Dynamic real-time date (relative to current date)

for (let i = 1; i <= 420; i++) {
  const model = MODELS[i % MODELS.length];
  const showroom = showrooms[i % showrooms.length];
  const color = COLORS[i % COLORS.length];

  // Distribute stock age: ~24% aging > 90 days (between 95 and 180 days) for Compte Global
  const isAging = (i % 4 === 0);
  const daysInStock = isAging ? 95 + (i % 85) : 5 + (i % 75);

  const arrivalDate = new Date(NOW.getTime() - daysInStock * 24 * 60 * 60 * 1000);
  const acquisitionDate = new Date(arrivalDate.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Statuses: 78% available, 10% reserved, 6% in_transfer, 6% sold
  let status = 'available';
  if (i % 15 === 0) status = 'reserved';
  else if (i % 17 === 0) status = 'in_transfer';
  else if (i % 19 === 0) status = 'sold';

  const vin = `VMS2026DZ${String(i).padStart(6, '0')}`;

  motorcycles.push({
    id: `moto-${String(i).padStart(4, '0')}`,
    model_id: model.id,
    showroom_id: showroom.id,
    vin,
    color,
    engine_specs: `${model.engine_cc}cc • ${model.cooling} • ${model.fuel_system}`,
    acquisition_date: acquisitionDate.toISOString().split('T')[0],
    arrival_date: arrivalDate.toISOString().split('T')[0],
    status,
    notes: isAging ? 'Stock dormant éligible Compte Global (>90j)' : 'Contrôle qualité VMS usine validé',
    sale_date: status === 'sold' ? new Date(NOW.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined,
    created_at: arrivalDate.toISOString(),
    days_in_stock: daysInStock,
    is_aging: daysInStock >= 90
  });
}

// -----------------------------------------------------------------------------
// 3. GENERATE 260 CUSTOMER REQUESTS (HUNDREDS OF REQUESTS ACROSS 58 WILAYAS)
// -----------------------------------------------------------------------------
const FIRST_NAMES = [
  'Mohamed', 'Amine', 'Youcef', 'Karim', 'Walid', 'Sofiane', 'Bilal', 'Yacine',
  'Ryad', 'Mehdi', 'Hamza', 'Farouk', 'Abdelkader', 'Omar', 'Mustapha', 'Lotfi',
  'Samy', 'Anis', 'Zinedine', 'Islam', 'Oussama', 'Ayoub', 'Zakaria', 'Reda',
  'Nassim', 'Meriem', 'Yasmine', 'Sarah', 'Amina', 'Rania', 'Nour', 'Selma',
  'Ines', 'Chaima', 'Lynda', 'Fouad', 'Khaled', 'Tarek', 'Hichem', 'Moncef'
];

const LAST_NAMES = [
  'Benali', 'Belkacem', 'Mansouri', 'Khelifi', 'Dahmani', 'Saidi', 'Boudiaf',
  'Meziane', 'Chaouch', 'Hadj', 'Brahimi', 'Touati', 'Guendouz', 'Zerrouki',
  'Cherif', 'Benaissa', 'Allouche', 'Bouaziz', 'Mokhtari', 'Ferhat', 'Slimani',
  'Tebboune', 'Ould', 'Yahiaoui', 'Mebarki', 'Larbi', 'Zitouni', 'Gherbi',
  'Hamidi', 'Taleb', 'Amrani', 'Bensalah', 'Ziane', 'Chabane', 'Naili', 'Djedidi'
];

const PHONE_PREFIXES = ['0550', '0551', '0552', '0554', '0555', '0560', '0561', '0660', '0661', '0662', '0770', '0771', '0772'];

const requests = [];

for (let i = 1; i <= 260; i++) {
  const ref = `REQ-2026-${String(i).padStart(4, '0')}`;
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length];
  const model = MODELS[(i * 2) % MODELS.length];

  // Distribute across wilayas
  const wilaya = WILAYAS[i % WILAYAS.length];
  const cities = WILAYA_CITIES[wilaya.code] || [`${wilaya.name} Centre`, `${wilaya.name} Ouest`];
  const city = cities[i % cities.length];

  // Phone
  const prefix = PHONE_PREFIXES[i % PHONE_PREFIXES.length];
  const phoneSuffix = String(100000 + (i * 739) % 900000);
  const phone = `${prefix}${phoneSuffix}`;
  const normalizedPhone = normalizePhone(phone);
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i % 50}@gmail.com`;

  // Statuses: 55% pending, 20% available_notified, 15% fulfilled, 10% preorder_redirected
  let status = 'pending';
  let matchedShowroom = undefined;
  let notifiedAt = undefined;
  let fulfilledAt = undefined;

  const localShowroom = showrooms.find(s => s.wilaya_code === wilaya.code) || showrooms[0];

  if (i % 10 === 0) {
    status = 'preorder_redirected';
  } else if (i % 6 === 0) {
    status = 'fulfilled';
    matchedShowroom = localShowroom.id;
    notifiedAt = new Date(NOW.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString();
    fulfilledAt = new Date(NOW.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
  } else if (i % 4 === 0) {
    status = 'available_notified';
    matchedShowroom = localShowroom.id;
    notifiedAt = new Date(NOW.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
  }

  // Submission time spread over last 40 days
  const daysAgo = (i * 13) % 40;
  const createdAt = new Date(NOW.getTime() - daysAgo * 24 * 60 * 60 * 1000 - (i % 24) * 3600000).toISOString();

  requests.push({
    id: `req-${String(i).padStart(4, '0')}`,
    reference: ref,
    customer_id: i === 1 ? 'usr-customer-01' : undefined,
    user_id: i === 1 ? 'usr-customer-01' : undefined,
    first_name: firstName,
    last_name: lastName,
    phone,
    phone_normalized: normalizedPhone,
    email,
    motorcycle_model_id: model.id,
    wilaya_code: wilaya.code,
    city,
    status,
    matched_showroom_id: matchedShowroom,
    notified_at: notifiedAt,
    fulfilled_at: fulfilledAt,
    notes: status === 'preorder_redirected' ? 'Redirigé vers motobladi.dz pour précommande' : undefined,
    created_at: createdAt
  });
}

// -----------------------------------------------------------------------------
// 4. GENERATE 85 SALES ACROSS SHOWROOMS
// -----------------------------------------------------------------------------
const PAYMENT_METHODS = ['CASH', 'CHEQUE', 'VIREMENT', 'FACILITE'];
const sales = [];

for (let i = 1; i <= 85; i++) {
  const moto = motorcycles[i * 4 % motorcycles.length];
  const showroom = showrooms.find(s => s.id === moto.showroom_id) || showrooms[0];
  const model = MODELS.find(m => m.id === moto.model_id) || MODELS[0];
  const daysAgo = (i * 7) % 60;
  const saleDate = new Date(NOW.getTime() - daysAgo * 24 * 60 * 60 * 1000);

  sales.push({
    id: `sale-${String(i).padStart(4, '0')}`,
    reference: `VTE-2026-${String(i).padStart(4, '0')}`,
    motorcycle_id: moto.id,
    showroom_id: showroom.id,
    customer_name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[i % LAST_NAMES.length]}`,
    customer_phone: `0550${String(200000 + i * 111).slice(0, 6)}`,
    sale_price: model.price_dzd,
    payment_method: PAYMENT_METHODS[i % PAYMENT_METHODS.length],
    sale_date: saleDate.toISOString().split('T')[0],
    sold_by: showroom.owner_id,
    notes: 'Vente showroom avec carte grise VMS et garantie 2 ans',
    created_at: saleDate.toISOString()
  });
}

// -----------------------------------------------------------------------------
// 5. GENERATE 24 COMPTE GLOBAL TRANSFERS
// -----------------------------------------------------------------------------
const TRANSFER_STATUSES = ['pending', 'approved', 'in_transit', 'received', 'rejected'];
const transfers = [];

for (let i = 1; i <= 24; i++) {
  const agingMoto = motorcycles.find(m => m.is_aging && !transfers.find(t => t.motorcycle_id === m.id)) || motorcycles[i * 5];
  const sourceShw = showrooms.find(s => s.id === agingMoto.showroom_id) || showrooms[0];
  const destShw = showrooms[(showrooms.indexOf(sourceShw) + 3) % showrooms.length];
  const status = TRANSFER_STATUSES[i % TRANSFER_STATUSES.length];

  const daysAgo = (i * 3) % 20;
  const createdAt = new Date(NOW.getTime() - daysAgo * 24 * 60 * 60 * 1000).toISOString();

  transfers.push({
    id: `trf-${String(i).padStart(4, '0')}`,
    reference: `TRF-2026-${String(i).padStart(4, '0')}`,
    motorcycle_id: agingMoto.id,
    source_showroom_id: sourceShw.id,
    destination_showroom_id: destShw.id,
    requested_by: destShw.owner_id,
    status,
    reason: `Compte Global: Demande forte à ${destShw.city} pour stock dormant (${agingMoto.days_in_stock}j à ${sourceShw.city})`,
    stock_age_at_request: agingMoto.days_in_stock,
    approved_by: status !== 'pending' ? sourceShw.owner_id : undefined,
    approved_at: status !== 'pending' ? new Date(new Date(createdAt).getTime() + 86400000).toISOString() : undefined,
    received_by: status === 'received' ? destShw.owner_id : undefined,
    received_at: status === 'received' ? new Date(new Date(createdAt).getTime() + 3 * 86400000).toISOString() : undefined,
    created_at: createdAt
  });
}

// -----------------------------------------------------------------------------
// 6. GENERATE PREORDER REDIRECTS, NOTIFICATIONS & AUDIT LOGS
// -----------------------------------------------------------------------------
const preorders = requests.filter(r => r.status === 'preorder_redirected').map(r => ({
  id: `pre-${r.id}`,
  customer_id: r.customer_id,
  user_id: r.user_id,
  motorcycle_model_id: r.motorcycle_model_id,
  wilaya_code: r.wilaya_code,
  city: r.city,
  target_url: 'https://motobladi.dz/',
  referrer: 'QUICK by VMS Platform',
  created_at: r.created_at
}));

const notifications = [
  {
    id: 'notif-001',
    recipient_phone: '+213550123456',
    recipient_email: 'amine.dahmani@gmail.com',
    type: 'stock_available',
    title: 'Bonne nouvelle ! Votre moto est disponible',
    message: 'Bonne nouvelle ! Le modèle VMS Driver 125 que vous avez demandé est désormais disponible au showroom VMS Showroom Alger Centre. Contactez le showroom pour finaliser votre achat.',
    is_read: false,
    channel: 'in_app',
    created_at: '2026-02-18T14:30:00Z'
  },
  {
    id: 'notif-002',
    recipient_phone: '+213555123456',
    recipient_email: 'alger@vms.dz',
    type: 'transfer_update',
    title: 'Nouvelle opportunité de transfert Compte Global',
    message: 'Un transfert de moto Keeway RKF 125 (dormante depuis 118 jours à Oran) a été proposé vers votre showroom.',
    is_read: true,
    channel: 'in_app',
    created_at: '2026-02-19T09:15:00Z'
  }
];

const auditLogs = [
  {
    id: 'log-001',
    user_id: 'usr-super-admin-01',
    user_email: 'admin@vms.dz',
    action_type: 'INITIALIZE_NETWORK_80_SHOWROOMS',
    entity_type: 'showroom',
    entity_id: 'network-dz',
    details: { total_showrooms: 80, wilayas_covered: 58, target: 'National VMS Network' },
    created_at: '2026-01-01T08:00:00Z'
  },
  {
    id: 'log-002',
    user_id: 'usr-super-admin-01',
    user_email: 'admin@vms.dz',
    action_type: 'COMPTE_GLOBAL_REBALANCING',
    entity_type: 'transfer',
    entity_id: 'trf-0001',
    details: { algorithm: 'Aging Stock > 90 Days', rebalanced_units: 24 },
    created_at: '2026-02-15T11:00:00Z'
  }
];

console.log('Summary of generated data:');
console.log({
  showrooms: showrooms.length,
  profiles: profiles.length,
  motorcycles: motorcycles.length,
  requests: requests.length,
  sales: sales.length,
  transfers: transfers.length,
  preorders: preorders.length
});

// Export to server/data/store.json
const storeData = {
  profiles,
  showrooms,
  models: MODELS,
  motorcycles,
  requests,
  transfers,
  notifications,
  sales,
  preorders,
  audit_logs: auditLogs
};

fs.writeFileSync(path.join(__dirname, '../server/data/store.json'), JSON.stringify(storeData, null, 2), 'utf-8');
console.log('Saved server/data/store.json successfully.');

// Now write src/data/mockData.ts
const mockDataTs = `// AUTO-GENERATED RICH MOCK DATA: 80 SHOWROOMS, 260+ REQUESTS, 420 MOTORCYCLES
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

export const INITIAL_PROFILES: Profile[] = ${JSON.stringify(profiles, null, 2)};

export const INITIAL_SHOWROOMS: Showroom[] = ${JSON.stringify(showrooms, null, 2)};

export const INITIAL_MODELS: MotorcycleModel[] = ${JSON.stringify(MODELS, null, 2)};

export const INITIAL_MOTORCYCLES: Motorcycle[] = ${JSON.stringify(motorcycles, null, 2)};

export const INITIAL_REQUESTS: CustomerRequest[] = ${JSON.stringify(requests, null, 2)};

export const INITIAL_TRANSFERS: Transfer[] = ${JSON.stringify(transfers, null, 2)};

export const INITIAL_NOTIFICATIONS: Notification[] = ${JSON.stringify(notifications, null, 2)};

export const INITIAL_SALES: Sale[] = ${JSON.stringify(sales, null, 2)};

export const INITIAL_PREORDERS: PreorderRedirect[] = ${JSON.stringify(preorders, null, 2)};

export const INITIAL_AUDIT_LOGS: AuditLog[] = ${JSON.stringify(auditLogs, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/mockData.ts'), mockDataTs, 'utf-8');
console.log('Saved src/data/mockData.ts successfully.');
