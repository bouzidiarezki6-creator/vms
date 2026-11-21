import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { signToken, verifyToken, redactEmail, redactPhone, createRateLimiter } from './utils/auth.js';
import { mutex } from './utils/mutex.js';
import {
  computeTransferOpportunities,
  getStockoutRisks,
  getDormantInventorySummary,
  globalAccountConfig,
  updateAlgorithmConfig
} from './services/globalAccountEngine.js';
import { OdooSyncService } from './services/odoo/odooSyncService.js';
import { BiAnalyticsService } from './services/bi/biAnalyticsService.js';
import { PredictiveAnalyticsService } from './services/predictive/predictiveAnalyticsService.js';
import { DataWarehouseService } from './services/warehouse/dataWarehouseService.js';
import { ExecutiveReportingService } from './services/warehouse/executiveReportingService.js';
import { dataQualityService } from './services/warehouse/dataQualityService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Enterprise Security Rate Limiters
const authLimiter = createRateLimiter({ windowMs: 60000, max: 20, message: 'Trop de tentatives d\'authentification. Veuillez patienter 1 minute.' });
const requestLimiter = createRateLimiter({ windowMs: 60000, max: 15, message: 'Fréquence de requêtes trop élevée. Veuillez patienter.' });

// Authentication & Session Extraction Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    req.user = null;
    return next();
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Session invalide ou expirée.' });
  }
  if (payload.isLegacy) {
    const user = db?.profiles?.find(p => p.id === payload.id);
    req.user = user || { id: payload.id, role: 'customer' };
  } else {
    req.user = payload;
  }
  next();
}

// Role Enforcement Guard Middleware
function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentification requise pour cette opération.' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Accès non autorisé pour ce profil.' });
    }
    next();
  };
}

// Request logger with PII masking
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(authenticateToken);

// Path to persistent data
const DATA_DIR = path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Phone normalization helper (+213...)
export function normalizePhone(phone) {
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
// Seed Data Initialization
// -----------------------------------------------------------------------------
const INITIAL_DATA = {
  profiles: [
    {
      id: 'usr-admin-1',
      email: 'admin@vms.dz',
      role: 'super_admin',
      first_name: 'Karim',
      last_name: 'Bensalem',
      phone: '+213550112233',
      wilaya_code: '16',
      is_active: true,
      created_at: '2026-01-01T08:00:00Z'
    },
    {
      id: 'usr-owner-alger',
      email: 'alger@vms.dz',
      role: 'showroom_owner',
      first_name: 'Amine',
      last_name: 'Larbi',
      phone: '+213550223344',
      wilaya_code: '16',
      is_active: true,
      created_at: '2026-01-05T09:00:00Z'
    },
    {
      id: 'usr-owner-oran',
      email: 'oran@vms.dz',
      role: 'showroom_owner',
      first_name: 'Tarek',
      last_name: 'Mansouri',
      phone: '+213550334455',
      wilaya_code: '31',
      is_active: true,
      created_at: '2026-01-05T09:30:00Z'
    },
    {
      id: 'usr-owner-bejaia',
      email: 'bejaia@vms.dz',
      role: 'showroom_owner',
      first_name: 'Sofiane',
      last_name: 'Boudiaf',
      phone: '+213550667788',
      wilaya_code: '06',
      is_active: true,
      created_at: '2026-01-07T08:30:00Z'
    },
    {
      id: 'usr-customer-1',
      email: 'customer@example.com',
      role: 'customer',
      first_name: 'Yacine',
      last_name: 'Hamidi',
      phone: '+213661889900',
      wilaya_code: '16',
      is_active: true,
      created_at: '2026-02-10T14:20:00Z'
    }
  ],
  showrooms: [
    {
      id: 'shw-alger-centre',
      name: 'VMS Showroom Alger — Sidi Yahia',
      wilaya_code: '16',
      city: 'Hydra',
      address: '14 Boulevard Sidi Yahia, Hydra, Alger',
      phone: '+213 23 48 11 22',
      email: 'alger@vms.dz',
      owner_id: 'usr-owner-alger',
      is_active: true,
      created_at: '2026-01-05T09:00:00Z'
    },
    {
      id: 'shw-oran-maraval',
      name: 'VMS Showroom Oran — Maraval',
      wilaya_code: '31',
      city: 'Oran',
      address: 'Route Nationale 11, Maraval, Oran',
      phone: '+213 41 33 44 55',
      email: 'oran@vms.dz',
      owner_id: 'usr-owner-oran',
      is_active: true,
      created_at: '2026-01-05T09:30:00Z'
    },
    {
      id: 'shw-constantine',
      name: 'VMS Showroom Constantine — Ville Nouvelle',
      wilaya_code: '25',
      city: 'Ali Mendjeli',
      address: 'UV 05, Ville Nouvelle Ali Mendjeli, Constantine',
      phone: '+213 31 66 77 88',
      email: 'constantine@vms.dz',
      is_active: true,
      created_at: '2026-01-06T10:00:00Z'
    },
    {
      id: 'shw-bejaia-usine',
      name: 'VMS Flagship & Usine Béjaïa',
      wilaya_code: '06',
      city: 'Amizour',
      address: 'Zone Industrielle Oued Ghir / Amizour, Béjaïa',
      phone: '+213 34 21 00 11',
      email: 'bejaia@vms.dz',
      owner_id: 'usr-owner-bejaia',
      is_active: true,
      created_at: '2026-01-07T08:30:00Z'
    },
    {
      id: 'shw-setif',
      name: 'VMS Showroom Sétif — Bel Air',
      wilaya_code: '19',
      city: 'Sétif',
      address: 'Boulevard 08 Mai 1945, Sétif',
      phone: '+213 36 84 99 00',
      email: 'setif@vms.dz',
      is_active: true,
      created_at: '2026-01-08T11:00:00Z'
    },
    {
      id: 'shw-blida',
      name: 'VMS Showroom Blida — Centre',
      wilaya_code: '09',
      city: 'Blida',
      address: 'Boulevard Mohamed Boudiaf, Blida',
      phone: '+213 25 31 22 33',
      email: 'blida@vms.dz',
      is_active: true,
      created_at: '2026-01-09T14:00:00Z'
    }
  ],
  models: [
    {
      id: 'mod-vms-ckee-125',
      name: 'VMS C-Kee 125',
      brand: 'VMS',
      category: 'Scooter',
      displacement: '124.6 cc',
      price: 245000,
      image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
      description: 'Le scooter urbain par excellence. Économique, agile et robuste pour le quotidien.',
      colors: ['Noir Mat', 'Blanc Brillant', 'Gris Nardo'],
      is_active: true
    },
    {
      id: 'mod-vms-driver-150',
      name: 'VMS Driver 150',
      brand: 'VMS',
      category: 'Scooter',
      displacement: '149.6 cc',
      price: 310000,
      image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      description: 'Polyvalence et dynamisme. Moteur 150cc puissant avec freinage CBS combiné.',
      colors: ['Bleu Électrique', 'Noir Titane', 'Rouge Course'],
      is_active: true
    },
    {
      id: 'mod-vms-estate-125',
      name: 'VMS Estate 125',
      brand: 'VMS',
      category: 'Scooter',
      displacement: '124.6 cc',
      price: 260000,
      image_url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
      description: 'Design rétro-moderne européen avec finitions chromées et selle surpiquée.',
      colors: ['Brun Havane', 'Crème Vintage', 'Vert Anglais'],
      is_active: true
    },
    {
      id: 'mod-vms-victoria-200',
      name: 'VMS Victoria 200',
      brand: 'VMS',
      category: 'Maxi Scooter',
      displacement: '171 cc',
      price: 435000,
      image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
      description: 'Maxi scooter confortable avec éclairage Full LED, coffre spacieux et ABS avant.',
      colors: ['Gris Anthracite', 'Bleu Nuit', 'Noir Satin'],
      is_active: true
    },
    {
      id: 'mod-vms-alpha-150',
      name: 'VMS Alpha 150',
      brand: 'VMS',
      category: 'Roadster',
      displacement: '149 cc',
      price: 330000,
      image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      description: 'Moto Roadster sportive avec tableau de bord digital et suspensions renforcées.',
      colors: ['Rouge Racing', 'Noir & Jaune Fluo'],
      is_active: true
    },
    {
      id: 'mod-keeway-rkf-125',
      name: 'Keeway RKF 125',
      brand: 'Keeway',
      category: 'Roadster',
      displacement: '124.8 cc',
      price: 395000,
      image_url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
      description: 'Moteur 4 soupapes refroidissement liquide, look agressif et cadre treillis tubulaire.',
      colors: ['Blanc Perle', 'Noir Mat', 'Rouge Sport'],
      is_active: true
    },
    {
      id: 'mod-benelli-trk-502',
      name: 'Benelli TRK 502 X',
      brand: 'Benelli',
      category: 'Trail Adventure',
      displacement: '500 cc',
      price: 1350000,
      image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&auto=format&fit=crop&q=80',
      description: 'Le trail routier référence. Bicomposant 500cc, roues à rayons, réservoir 20L.',
      colors: ['Blanc Glacier', 'Gris Anthracite', 'Jaune Dune'],
      is_active: true
    },
    {
      id: 'mod-benelli-leoncino-500',
      name: 'Benelli Leoncino 500',
      brand: 'Benelli',
      category: 'Roadster',
      displacement: '500 cc',
      price: 1220000,
      image_url: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&auto=format&fit=crop&q=80',
      description: 'Scrambler au charme italien légendaire. Moteur bicylindre 48ch et finitions premium.',
      colors: ['Rouge Leoncino', 'Noir Mat', 'Vert Forêt'],
      is_active: true
    }
  ],
  motorcycles: [
    {
      id: 'moto-101',
      model_id: 'mod-vms-ckee-125',
      showroom_id: 'shw-alger-centre',
      vin: 'VMS2026CK12500101',
      color: 'Noir Mat',
      arrival_date: '2026-02-01',
      acquisition_date: '2026-01-20',
      status: 'available',
      created_at: '2026-02-01T10:00:00Z'
    },
    {
      id: 'moto-102',
      model_id: 'mod-vms-driver-150',
      showroom_id: 'shw-alger-centre',
      vin: 'VMS2026DR15000102',
      color: 'Bleu Électrique',
      arrival_date: '2026-01-15',
      acquisition_date: '2026-01-10',
      status: 'available',
      created_at: '2026-01-15T11:00:00Z'
    },
    {
      id: 'moto-103',
      model_id: 'mod-vms-victoria-200',
      showroom_id: 'shw-oran-maraval',
      vin: 'VMS2025VC20000088',
      color: 'Gris Anthracite',
      arrival_date: '2025-10-25', // Stock > 115 days dormant!
      acquisition_date: '2025-10-15',
      status: 'available',
      notes: 'Unité éligible Compte Global (dormante depuis >110 jours)',
      created_at: '2025-10-25T14:00:00Z'
    },
    {
      id: 'moto-104',
      model_id: 'mod-keeway-rkf-125',
      showroom_id: 'shw-constantine',
      vin: 'KW2026RK12500204',
      color: 'Rouge Sport',
      arrival_date: '2026-01-20',
      acquisition_date: '2026-01-10',
      status: 'available',
      created_at: '2026-01-20T09:00:00Z'
    },
    {
      id: 'moto-105',
      model_id: 'mod-benelli-trk-502',
      showroom_id: 'shw-bejaia-usine',
      vin: 'BN2026TK50200505',
      color: 'Blanc Glacier',
      arrival_date: '2026-02-05',
      acquisition_date: '2026-01-25',
      status: 'available',
      created_at: '2026-02-05T16:00:00Z'
    },
    {
      id: 'moto-106',
      model_id: 'mod-vms-estate-125',
      showroom_id: 'shw-setif',
      vin: 'VMS2025ES12500072',
      color: 'Brun Havane',
      arrival_date: '2025-11-05', // Stock > 105 days dormant!
      acquisition_date: '2025-10-28',
      status: 'available',
      notes: 'Eligible transfert inter-showroom',
      created_at: '2025-11-05T12:00:00Z'
    },
    {
      id: 'moto-107',
      model_id: 'mod-vms-alpha-150',
      showroom_id: 'shw-blida',
      vin: 'VMS2026AL15000707',
      color: 'Noir & Jaune Fluo',
      arrival_date: '2026-02-08',
      acquisition_date: '2026-01-30',
      status: 'available',
      created_at: '2026-02-08T13:00:00Z'
    }
  ],
  requests: [
    {
      id: 'req-2026-1001',
      reference: 'REQ-2026-1001',
      user_id: 'usr-customer-1',
      first_name: 'Yacine',
      last_name: 'Hamidi',
      phone: '+213661889900',
      phone_normalized: '+213661889900',
      email: 'customer@example.com',
      motorcycle_model_id: 'mod-vms-victoria-200',
      wilaya_code: '16',
      city: 'Alger Centre',
      status: 'pending',
      notes: 'Client intéressé par la Victoria 200 à Alger. Stock local = 0 mais unité disponible à Oran (>115j).',
      created_at: '2026-02-18T10:15:00Z'
    }
  ],
  transfers: [],
  notifications: [],
  sales: [
    {
      id: 'sal-1',
      reference: 'FAC-2026-1001',
      motorcycle_id: 'moto-101',
      showroom_id: 'shw-alger-centre',
      customer_name: 'Farid Mebarki',
      customer_phone: '+213550119988',
      sale_price: 245000,
      payment_method: 'CASH',
      sale_date: '2026-02-15',
      sold_by: 'usr-owner-alger',
      created_at: '2026-02-15T15:30:00Z'
    }
  ],
  audit_logs: [
    {
      id: 'aud-init-1',
      user_id: 'system',
      user_email: 'system@vms.dz',
      action_type: 'SYSTEM_BOOTSTRAP',
      entity_type: 'system',
      details: { platform: 'QUICK by VMS', version: '2.0.0' },
      created_at: '2026-02-21T00:00:00Z'
    }
  ],
  preorders: []
};

// -----------------------------------------------------------------------------
// Database In-Memory Cache & Persistence Engine
// -----------------------------------------------------------------------------
let db = null;

function loadStore() {
  if (db) return db;
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      db = JSON.parse(raw);
    } else {
      db = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveStore();
    }
  } catch (err) {
    console.error('Error loading store, falling back to initial data:', err);
    db = JSON.parse(JSON.stringify(INITIAL_DATA));
  }
  return db;
}

function saveStore() {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing store to disk:', err);
  }
}

// Initialize database
loadStore();

// Ensure Phase 3 Odoo collections exist
if (!db.odoo_sync_history) db.odoo_sync_history = [];
if (!db.odoo_external_mappings) db.odoo_external_mappings = [];
if (!db.odoo_sync_conflicts) db.odoo_sync_conflicts = [];

// Phase 3: Odoo ERP Integration Service
export const odooSyncService = new OdooSyncService(db);

// Phase 4: Business Intelligence & Analytics Engine
export const biAnalyticsService = new BiAnalyticsService(db);

// Phase 5: Predictive Analytics & Demand Forecasting Engine
export const predictiveAnalyticsService = new PredictiveAnalyticsService(db);

// Phase 6: Enterprise Data Warehouse & Executive Reporting Engine
export const dataWarehouseService = new DataWarehouseService(db);
export const executiveReportingService = new ExecutiveReportingService(dataWarehouseService);

// Helper to log audit with sensitive PII redaction
function logAudit(userId, userEmail, actionType, entityType, entityId, details) {
  // Sanitize details to prevent logging raw PII
  const sanitizedDetails = { ...details };
  if (sanitizedDetails.phone) sanitizedDetails.phone = redactPhone(sanitizedDetails.phone);
  if (sanitizedDetails.customer_phone) sanitizedDetails.customer_phone = redactPhone(sanitizedDetails.customer_phone);
  if (sanitizedDetails.password) delete sanitizedDetails.password;

  const log = {
    id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    user_id: userId || 'anonymous',
    user_email: redactEmail(userEmail || 'system'),
    action_type: actionType,
    entity_type: entityType,
    entity_id: entityId,
    details: sanitizedDetails || {},
    created_at: new Date().toISOString()
  };
  db.audit_logs.unshift(log);
  if (db.audit_logs.length > 500) db.audit_logs.pop();
  saveStore();
}

// -----------------------------------------------------------------------------
// API ROUTES
// -----------------------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'QUICK by VMS',
    version: '2.1.0',
    phase: 'Phase 1 - Enterprise Secured & Concurrent Protected',
    timestamp: new Date().toISOString(),
    stats: {
      models: db.models.length,
      showrooms: db.showrooms.length,
      motorcycles: db.motorcycles.length,
      requests: db.requests.length,
      transfers: db.transfers.length
    }
  });
});

// Authentication routes (Hardened with rate limiter & cryptographic JWT)
app.post('/api/auth/login', authLimiter, (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Adresse email obligatoire et valide requise.' });
  }
  const cleanEmail = email.trim().toLowerCase();
  const user = db.profiles.find(p => p.email.toLowerCase() === cleanEmail);
  if (!user) {
    return res.status(404).json({ error: 'Identifiants introuvables. Vérifiez votre adresse email.' });
  }

  // Generate cryptographically signed JWT token
  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
    wilaya_code: user.wilaya_code
  });

  logAudit(user.id, user.email, 'AUTH_LOGIN_SECURE', 'profiles', user.id, { role: user.role });

  // Return both signed token and legacy compatibility
  res.json({
    user,
    token,
    tokenType: 'Bearer',
    expiresIn: 86400
  });
});

app.post('/api/auth/register', authLimiter, (req, res) => {
  const { first_name, last_name, phone, email, wilaya_code } = req.body;
  if (!first_name || !last_name || !phone || !email) {
    return res.status(400).json({ error: 'Tous les champs requis doivent être remplis' });
  }
  const cleanEmail = email.trim().toLowerCase();
  const existing = db.profiles.find(p => p.email.toLowerCase() === cleanEmail);
  if (existing) {
    return res.status(409).json({ error: 'Un compte avec cette adresse email existe déjà' });
  }

  const newUser = {
    id: `usr-cust-${Date.now()}`,
    email: cleanEmail,
    role: 'customer',
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    phone: phone.trim(),
    wilaya_code: wilaya_code || '16',
    is_active: true,
    created_at: new Date().toISOString()
  };

  db.profiles.push(newUser);
  saveStore();

  const token = signToken({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role,
    wilaya_code: newUser.wilaya_code
  });

  logAudit(newUser.id, newUser.email, 'AUTH_REGISTER_SECURE', 'profiles', newUser.id, { role: 'customer' });
  res.status(201).json({ user: newUser, token, tokenType: 'Bearer' });
});

app.get('/api/auth/users', (req, res) => {
  res.json(db.profiles);
});

// Models Catalog
app.get('/api/models', (req, res) => {
  let list = db.models.filter(m => m.is_active);
  const { category, search } = req.query;
  if (category && category !== 'Tous') {
    list = list.filter(m => m.category.toLowerCase().includes(category.toLowerCase()));
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(m =>
      m.name.toLowerCase().includes(q) ||
      m.brand.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    );
  }
  res.json(list);
});

app.get('/api/models/:id', (req, res) => {
  const model = db.models.find(m => m.id === req.params.id);
  if (!model) return res.status(404).json({ error: 'Modèle introuvable' });
  res.json(model);
});

// Showrooms
app.get('/api/showrooms', (req, res) => {
  const enriched = db.showrooms.map(s => {
    const stockCount = db.motorcycles.filter(m => m.showroom_id === s.id && m.status === 'available').length;
    const owner = db.profiles.find(p => p.id === s.owner_id);
    return { ...s, available_stock_count: stockCount, owner_name: owner ? `${owner.first_name} ${owner.last_name}` : null };
  });
  res.json(enriched);
});

app.post('/api/showrooms', (req, res) => {
  const { name, wilaya_code, city, address, phone, email, owner_id } = req.body;
  if (!name || !wilaya_code || !city) {
    return res.status(400).json({ error: 'Nom, Wilaya et Ville obligatoires' });
  }
  const newShowroom = {
    id: `shw-${Date.now()}`,
    name,
    wilaya_code,
    city,
    address: address || '',
    phone: phone || '',
    email: email || '',
    owner_id: owner_id || null,
    is_active: true,
    created_at: new Date().toISOString()
  };
  db.showrooms.push(newShowroom);
  saveStore();
  logAudit('admin', 'Super Admin', 'SHOWROOM_CREATE', 'showrooms', newShowroom.id, { name });
  res.status(201).json(newShowroom);
});

// Inventory / Motorcycles
app.get('/api/motorcycles', (req, res) => {
  const { showroom_id, status, is_aging, model_id } = req.query;
  const now = Date.now();

  let list = db.motorcycles.map(m => {
    const model = db.models.find(mod => mod.id === m.model_id);
    const showroom = db.showrooms.find(sh => sh.id === m.showroom_id);
    const arrival = new Date(m.arrival_date).getTime();
    const daysInStock = Math.max(0, Math.floor((now - arrival) / (1000 * 60 * 60 * 24)));
    return {
      ...m,
      model,
      showroom,
      days_in_stock: daysInStock,
      is_aging: daysInStock >= 90
    };
  });

  if (showroom_id) list = list.filter(m => m.showroom_id === showroom_id);
  if (status) list = list.filter(m => m.status === status);
  if (is_aging === 'true') list = list.filter(m => m.is_aging);
  if (model_id) list = list.filter(m => m.model_id === model_id);

  res.json(list);
});

app.post('/api/motorcycles', async (req, res) => {
  const { model_id, showroom_id, vin, color, arrival_date, notes } = req.body;
  if (!model_id || !showroom_id || !vin || !color) {
    return res.status(400).json({ error: 'Modèle, Showroom, VIN et Couleur sont requis' });
  }

  const cleanVin = vin.trim().toUpperCase();

  try {
    const newMoto = await mutex.runExclusive(`vin:${cleanVin}`, async () => {
      if (db.motorcycles.some(m => m.vin.toUpperCase() === cleanVin)) {
        throw new Error(`Le numéro de châssis / VIN "${cleanVin}" existe déjà`);
      }

      const moto = {
        id: `moto-${Date.now()}`,
        model_id,
        showroom_id,
        vin: cleanVin,
        color,
        acquisition_date: arrival_date || new Date().toISOString().split('T')[0],
        arrival_date: arrival_date || new Date().toISOString().split('T')[0],
        status: 'available',
        notes: notes || '',
        created_at: new Date().toISOString()
      };

      db.motorcycles.push(moto);
      saveStore();

      // Check if this stock arrival matches any pending customer request!
      matchPendingRequestsForStock(moto);

      logAudit(req.body.user_id || req.user?.id || 'staff', 'Showroom Staff', 'STOCK_CREATE_SECURE', 'motorcycles', moto.id, { vin: cleanVin });
      return moto;
    });

    res.status(201).json(newMoto);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
});

app.put('/api/motorcycles/:id', (req, res) => {
  const idx = db.motorcycles.findIndex(m => m.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Moto introuvable' });

  const oldStatus = db.motorcycles[idx].status;
  db.motorcycles[idx] = { ...db.motorcycles[idx], ...req.body };
  saveStore();

  if (req.body.status === 'available' && oldStatus !== 'available') {
    matchPendingRequestsForStock(db.motorcycles[idx]);
  }

  res.json(db.motorcycles[idx]);
});

// -----------------------------------------------------------------------------
// Anti-Abuse Checking & Customer Requests
// -----------------------------------------------------------------------------
function checkLimit(userId, phone) {
  const normPhone = phone ? normalizePhone(phone) : null;
  const now = Date.now();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const windowStart = now - sevenDaysMs;

  const recent = db.requests.filter(r => {
    const match = (userId && r.user_id === userId) || (normPhone && r.phone_normalized === normPhone);
    if (!match) return false;
    return new Date(r.created_at).getTime() >= windowStart;
  });

  recent.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  if (recent.length >= 2) {
    const oldest = new Date(recent[0].created_at).getTime();
    const canSubmitAt = new Date(oldest + sevenDaysMs).toISOString();
    return {
      allowed: false,
      current_count: recent.length,
      max_allowed: 2,
      can_submit_at: canSubmitAt,
      message: 'Limite de 2 demandes par période glissante de 7 jours atteinte.'
    };
  }

  return {
    allowed: true,
    current_count: recent.length,
    max_allowed: 2,
    remaining: 2 - recent.length,
    message: `Il vous reste ${2 - recent.length} demande(s) disponible(s) cette semaine.`
  };
}

app.get('/api/requests/check-limit', (req, res) => {
  const { user_id, phone } = req.query;
  const result = checkLimit(user_id, phone);
  res.json(result);
});

// Dynamic Request Tracker by Reference or Phone
app.get('/api/requests/track/:query', (req, res) => {
  const query = req.params.query.trim().toUpperCase();
  const normQuery = normalizePhone(query);

  const found = db.requests.filter(r =>
    r.reference.toUpperCase() === query ||
    (normQuery && r.phone_normalized === normQuery) ||
    r.phone.includes(query)
  );

  if (!found || found.length === 0) {
    return res.status(404).json({ error: 'Aucune demande trouvée avec cette référence ou ce numéro.' });
  }

  const enriched = found.map(r => {
    const model = db.models.find(m => m.id === r.motorcycle_model_id);
    const showroom = r.matched_showroom_id ? db.showrooms.find(s => s.id === r.matched_showroom_id) : null;
    return { ...r, model, matched_showroom: showroom };
  });

  res.json(enriched);
});

app.get('/api/requests', (req, res) => {
  const { user_id, status, wilaya_code } = req.query;
  let list = db.requests.map(r => {
    const model = db.models.find(m => m.id === r.motorcycle_model_id);
    const showroom = r.matched_showroom_id ? db.showrooms.find(s => s.id === r.matched_showroom_id) : null;
    return { ...r, model, matched_showroom: showroom };
  });

  if (user_id) list = list.filter(r => r.user_id === user_id);
  if (status) list = list.filter(r => r.status === status);
  if (wilaya_code) list = list.filter(r => r.wilaya_code === wilaya_code);

  res.json(list);
});

app.post('/api/requests', requestLimiter, (req, res) => {
  const { first_name, last_name, phone, email, motorcycle_model_id, wilaya_code, city, user_id } = req.body;

  if (!first_name || !last_name || !phone || !email || !motorcycle_model_id || !wilaya_code) {
    return res.status(400).json({ error: 'Tous les champs obligatoires doivent être renseignés.' });
  }

  const normPhone = normalizePhone(phone);
  const limitCheck = checkLimit(user_id, normPhone);
  if (!limitCheck.allowed) {
    return res.status(429).json({ error: limitCheck.message, limitCheck });
  }

  // Check if motorcycle is already available in the customer's region
  const regionalShowrooms = db.showrooms.filter(s => s.wilaya_code === wilaya_code && s.is_active);
  const regionalIds = regionalShowrooms.map(s => s.id);

  const availableUnit = db.motorcycles.find(
    m => m.model_id === motorcycle_model_id && regionalIds.includes(m.showroom_id) && m.status === 'available'
  );

  const ref = `REQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  const newRequest = {
    id: `req-${Date.now()}`,
    reference: ref,
    user_id: user_id || null,
    first_name,
    last_name,
    phone,
    phone_normalized: normPhone,
    email,
    motorcycle_model_id,
    wilaya_code,
    city: city || '',
    status: availableUnit ? 'available_notified' : 'pending',
    matched_showroom_id: availableUnit ? availableUnit.showroom_id : null,
    notified_at: availableUnit ? new Date().toISOString() : null,
    notes: availableUnit
      ? 'Disponibilité immédiate trouvée au showroom régional lors de la soumission.'
      : 'Demande enregistrée en attente d\'arrivage ou de transfert Compte Global.',
    created_at: new Date().toISOString()
  };

  db.requests.unshift(newRequest);
  saveStore();

  logAudit(user_id || 'customer', email, 'CUSTOMER_REQUEST_CREATE', 'customer_requests', newRequest.id, {
    reference: ref,
    model_id: motorcycle_model_id,
    immediate_match: Boolean(availableUnit)
  });

  const model = db.models.find(m => m.id === motorcycle_model_id);
  const showroom = availableUnit ? db.showrooms.find(s => s.id === availableUnit.showroom_id) : null;

  res.status(201).json({
    request: { ...newRequest, model, matched_showroom: showroom },
    immediateMatch: Boolean(availableUnit),
    message: availableUnit
      ? `Excellente nouvelle ! Le modèle ${model?.name || ''} est disponible immédiatement au showroom ${showroom?.name}.`
      : `Demande enregistrée avec succès sous la référence ${ref}.`
  });
});

// Automatic stock matching engine
function matchPendingRequestsForStock(moto) {
  if (moto.status !== 'available') return;
  const showroom = db.showrooms.find(s => s.id === moto.showroom_id);
  if (!showroom) return;

  const pendingIdx = db.requests.findIndex(
    r => r.motorcycle_model_id === moto.model_id &&
         r.wilaya_code === showroom.wilaya_code &&
         r.status === 'pending'
  );

  if (pendingIdx !== -1) {
    const req = db.requests[pendingIdx];
    req.status = 'available_notified';
    req.matched_showroom_id = showroom.id;
    req.notified_at = new Date().toISOString();
    saveStore();

    logAudit('system', 'QUICK Engine', 'STOCK_AUTO_MATCHED', 'customer_requests', req.id, {
      vin: moto.vin,
      reference: req.reference,
      showroom: showroom.name
    });
  }
}

// -----------------------------------------------------------------------------
// Compte Global & Inter-Showroom Transfers
// -----------------------------------------------------------------------------
app.get('/api/compte-global/aging', (req, res) => {
  const now = Date.now();
  const aging = db.motorcycles
    .filter(m => m.status === 'available')
    .map(m => {
      const arrival = new Date(m.arrival_date).getTime();
      const days = Math.max(0, Math.floor((now - arrival) / (1000 * 60 * 60 * 24)));
      return {
        ...m,
        model: db.models.find(mod => mod.id === m.model_id),
        showroom: db.showrooms.find(s => s.id === m.showroom_id),
        days_in_stock: days,
        is_aging: days >= 90
      };
    })
    .filter(m => m.is_aging)
    .sort((a, b) => b.days_in_stock - a.days_in_stock);

  res.json(aging);
});

// Advanced Global Account Intelligent Decision Engine (Phase 2)
app.get('/api/compte-global/opportunities', (req, res) => {
  const { target_showroom_id } = req.query;
  const recommendations = computeTransferOpportunities(db, target_showroom_id || null);
  res.json(recommendations);
});

app.get('/api/compte-global/config', (req, res) => {
  res.json(globalAccountConfig);
});

app.put('/api/compte-global/config', (req, res) => {
  const updated = updateAlgorithmConfig(req.body);
  logAudit(req.user?.id || 'admin', req.user?.email || 'admin@vms.dz', 'COMPTE_GLOBAL_CONFIG_UPDATE', 'system', null, updated);
  res.json(updated);
});

app.get('/api/compte-global/stockout-risks', (req, res) => {
  const risks = getStockoutRisks(db);
  res.json(risks);
});

app.get('/api/compte-global/dormant-summary', (req, res) => {
  const summary = getDormantInventorySummary(db);
  res.json(summary);
});

// Transfers
app.get('/api/transfers', (req, res) => {
  const list = db.transfers.map(t => {
    const moto = db.motorcycles.find(m => m.id === t.motorcycle_id);
    const model = moto ? db.models.find(mod => mod.id === moto.model_id) : null;
    const source = db.showrooms.find(s => s.id === t.source_showroom_id);
    const dest = db.showrooms.find(s => s.id === t.destination_showroom_id);
    return {
      ...t,
      motorcycle: moto ? { ...moto, model } : null,
      source_showroom: source,
      destination_showroom: dest
    };
  });
  res.json(list);
});

app.post('/api/transfers', async (req, res) => {
  const { motorcycle_id, source_showroom_id, destination_showroom_id, reason, user_id } = req.body;
  if (!motorcycle_id || !source_showroom_id || !destination_showroom_id) {
    return res.status(400).json({ error: 'Paramètres de transfert incomplets.' });
  }

  try {
    const result = await mutex.runExclusive(`moto:${motorcycle_id}`, async () => {
      const moto = db.motorcycles.find(m => m.id === motorcycle_id);
      if (!moto) {
        throw new Error('Moto introuvable.');
      }
      if (moto.status !== 'available') {
        throw new Error(`La moto n'est pas disponible pour un transfert (statut actuel: ${moto.status}).`);
      }

      // Check if motorcycle is already in an active transfer
      const activeTransfer = db.transfers.find(
        t => t.motorcycle_id === motorcycle_id && ['pending', 'approved', 'in_preparation', 'in_transit'].includes(t.status)
      );
      if (activeTransfer) {
        throw new Error(`Cette moto fait déjà l'objet du transfert actif ${activeTransfer.reference}.`);
      }

      const ref = `TRF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newTransfer = {
        id: `trf-${Date.now()}`,
        reference: ref,
        motorcycle_id,
        source_showroom_id,
        destination_showroom_id,
        requested_by: user_id || req.user?.id || 'operator',
        status: 'pending',
        reason: reason || 'Rééquilibrage Compte Global',
        created_at: new Date().toISOString(),
        history: [
          {
            id: `th-${Date.now()}`,
            to_status: 'pending',
            changed_by: user_id || req.user?.id || 'operator',
            comment: reason || 'Initiation de la demande de transfert atomique',
            created_at: new Date().toISOString()
          }
        ]
      };

      db.transfers.unshift(newTransfer);
      saveStore();
      logAudit(user_id || req.user?.id || 'operator', 'Compte Global', 'TRANSFER_REQUEST_SECURE', 'transfers', newTransfer.id, { ref, vin: moto.vin });
      return newTransfer;
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/transfers/:id/status', async (req, res) => {
  const { status, user_id, comment } = req.body;
  const trf = db.transfers.find(t => t.id === req.params.id);
  if (!trf) return res.status(404).json({ error: 'Transfert introuvable' });

  try {
    const updated = await mutex.runExclusive(`moto:${trf.motorcycle_id}`, async () => {
      const motoIdx = db.motorcycles.findIndex(m => m.id === trf.motorcycle_id);
      const oldStatus = trf.status;

      if (status === 'approved' || status === 'in_transit') {
        if (motoIdx !== -1) db.motorcycles[motoIdx].status = 'in_transfer';
      } else if (status === 'received') {
        // Atomic reception: assign new showroom, reset arrival date to today, set available
        if (motoIdx !== -1) {
          db.motorcycles[motoIdx].showroom_id = trf.destination_showroom_id;
          db.motorcycles[motoIdx].status = 'available';
          db.motorcycles[motoIdx].arrival_date = new Date().toISOString().split('T')[0];
          db.motorcycles[motoIdx].notes = `Transféré via ${trf.reference} le ${new Date().toLocaleDateString('fr-FR')}.`;
          matchPendingRequestsForStock(db.motorcycles[motoIdx]);
        }
      } else if (status === 'rejected' || status === 'cancelled') {
        if (motoIdx !== -1 && db.motorcycles[motoIdx].status === 'in_transfer') {
          db.motorcycles[motoIdx].status = 'available';
        }
      }

      trf.status = status;
      if (!trf.history) trf.history = [];
      trf.history.push({
        id: `th-${Date.now()}`,
        from_status: oldStatus,
        to_status: status,
        changed_by: user_id || req.user?.id || 'operator',
        comment: comment || `Statut passé à ${status}`,
        created_at: new Date().toISOString()
      });

      saveStore();
      logAudit(user_id || req.user?.id || 'operator', 'Operator', `TRANSFER_${status.toUpperCase()}_SECURE`, 'transfers', trf.id, { ref: trf.reference });
      return trf;
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Sales
app.get('/api/sales', (req, res) => {
  const { showroom_id } = req.query;
  let list = db.sales.map(s => {
    const moto = db.motorcycles.find(m => m.id === s.motorcycle_id);
    const showroom = db.showrooms.find(sh => sh.id === s.showroom_id);
    return { ...s, motorcycle: moto, showroom };
  });
  if (showroom_id) list = list.filter(s => s.showroom_id === showroom_id);
  res.json(list);
});

app.post('/api/sales', async (req, res) => {
  const { motorcycle_id, showroom_id, customer_name, customer_phone, sale_price, payment_method, user_id, notes } = req.body;
  if (!motorcycle_id || !showroom_id || !customer_name || !customer_phone || !sale_price) {
    return res.status(400).json({ error: 'Champs obligatoires manquants pour l\'enregistrement de la vente.' });
  }

  try {
    const sale = await mutex.runExclusive(`moto:${motorcycle_id}`, async () => {
      const motoIdx = db.motorcycles.findIndex(m => m.id === motorcycle_id);
      if (motoIdx === -1) throw new Error('Moto introuvable.');

      const moto = db.motorcycles[motoIdx];
      if (moto.status !== 'available' && moto.status !== 'reserved') {
        throw new Error(`La moto n'est pas disponible pour la vente (statut actuel: ${moto.status}).`);
      }

      const ref = `FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      db.motorcycles[motoIdx].status = 'sold';
      db.motorcycles[motoIdx].sale_date = new Date().toISOString().split('T')[0];

      const newSale = {
        id: `sal-${Date.now()}`,
        reference: ref,
        motorcycle_id,
        showroom_id,
        customer_name,
        customer_phone,
        sale_price: Number(sale_price),
        payment_method: payment_method || 'CASH',
        sale_date: new Date().toISOString().split('T')[0],
        sold_by: user_id || req.user?.id || 'seller',
        notes: notes || 'Vente showroom enregistrée avec garantie VMS 2 ans',
        created_at: new Date().toISOString()
      };

      db.sales.unshift(newSale);
      saveStore();

      // Log with sanitized PII
      logAudit(user_id || req.user?.id || 'seller', 'Showroom Seller', 'SALE_CREATE_SECURE', 'sales', newSale.id, {
        ref,
        vin: db.motorcycles[motoIdx].vin,
        sale_price: Number(sale_price),
        customer_phone_redacted: redactPhone(customer_phone)
      });

      return newSale;
    });

    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// KPIs
app.get('/api/kpis/global', (req, res) => {
  const now = Date.now();
  const agingUnits = db.motorcycles.filter(m => {
    if (m.status !== 'available') return false;
    const diff = (now - new Date(m.arrival_date).getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 90;
  }).length;

  const available = db.motorcycles.filter(m => m.status === 'available').length;
  const totalSalesVal = db.sales.reduce((sum, s) => sum + Number(s.sale_price || 0), 0);

  res.json({
    totalMotorcycles: db.motorcycles.length,
    availableMotorcycles: available,
    totalShowrooms: db.showrooms.length,
    totalCustomers: db.profiles.filter(p => p.role === 'customer').length,
    totalRequests: db.requests.length,
    pendingRequests: db.requests.filter(r => r.status === 'pending').length,
    fulfilledRequests: db.requests.filter(r => r.status === 'available_notified').length,
    agingStockCount: agingUnits,
    agingPercentage: available > 0 ? Math.round((agingUnits / available) * 100) : 0,
    activeTransfers: db.transfers.filter(t => ['pending', 'approved', 'in_transit'].includes(t.status)).length,
    totalSalesVolume: db.sales.length,
    totalSalesValue: totalSalesVal
  });
});

// Audit logs
app.get('/api/audit-logs', (req, res) => {
  res.json(db.audit_logs);
});

// Factory Reset
app.post('/api/reset-factory', (req, res) => {
  db = JSON.parse(JSON.stringify(INITIAL_DATA));
  saveStore();
  res.json({ message: 'Données réinitialisées avec succès aux valeurs de démonstration VMS.' });
});

// -----------------------------------------------------------------------------
// BI, Odoo & Supabase PostgreSQL Data Exports
// -----------------------------------------------------------------------------
app.get('/api/export/postgres', (req, res) => {
  const esc = (val) => val === null || val === undefined ? 'NULL' : `'${String(val).replace(/'/g, "''")}'`;

  let sql = `-- ====================================================================\n`;
  sql += `-- QUICK by VMS — PostgreSQL / Supabase Data Export\n`;
  sql += `-- Target: Supabase BAAS (postgres)\n`;
  sql += `-- ====================================================================\n\nBEGIN;\n\n`;

  db.requests.forEach(r => {
    sql += `INSERT INTO customer_requests (id, reference, first_name, last_name, phone, phone_normalized, email, wilaya_code, city, status, notes, created_at)\n`;
    sql += `VALUES (gen_random_uuid(), ${esc(r.reference)}, ${esc(r.first_name)}, ${esc(r.last_name)}, ${esc(r.phone)}, ${esc(r.phone_normalized || r.phone)}, ${esc(r.email)}, ${esc(r.wilaya_code)}, ${esc(r.city)}, ${esc(r.status)}, ${esc(r.notes || '')}, ${esc(r.created_at)})\n`;
    sql += `ON CONFLICT (reference) DO UPDATE SET status = EXCLUDED.status;\n`;
  });

  sql += `\nCOMMIT;\n`;

  res.setHeader('Content-Type', 'application/sql');
  res.setHeader('Content-Disposition', `attachment; filename="vms_supabase_dump_${Date.now()}.sql"`);
  res.send(sql);
});

app.get('/api/export/odoo', (req, res) => {
  const headers = ['name', 'contact_name', 'partner_name', 'phone', 'email_from', 'city', 'state_code', 'description', 'expected_revenue', 'stage_name'];
  const rows = db.requests.map(r => {
    const model = db.models.find(m => m.id === r.motorcycle_model_id);
    const stage = r.status === 'available_notified' ? 'Proposition' : r.status === 'fulfilled' ? 'Gagné' : 'Nouveau';
    return [
      `"Demande Moto ${r.reference} - ${model?.name || 'VMS'}"`,
      `"${r.first_name} ${r.last_name}"`,
      `"${r.first_name} ${r.last_name}"`,
      `"${r.phone}"`,
      `"${r.email}"`,
      `"${r.city}"`,
      `"${r.wilaya_code}"`,
      `"Modèle: ${model?.name || 'VMS'} | Wilaya: ${r.wilaya_code}"`,
      model?.price_dzd || 250000,
      `"${stage}"`
    ].join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="vms_odoo_crm_${Date.now()}.csv"`);
  res.send(csv);
});

// -----------------------------------------------------------------------------
// Odoo ERP Integration API (Phase 3)
// -----------------------------------------------------------------------------
app.get('/api/odoo/status', async (req, res) => {
  const status = await odooSyncService.getStatus();
  res.json(status);
});

app.post('/api/odoo/test-connection', async (req, res) => {
  const result = await odooSyncService.testConnection();
  logAudit(req.user?.id || 'admin', req.user?.email || 'admin@vms.dz', 'ODOO_TEST_CONNECTION', 'system', null, { connected: result.connected, mode: result.mode });
  res.json(result);
});

app.post('/api/odoo/sync', async (req, res) => {
  const { dryRun, entities } = req.body;
  try {
    const summary = await odooSyncService.synchronizeAll({
      dryRun: Boolean(dryRun),
      entities: Array.isArray(entities) ? entities : null,
      triggeredBy: req.user?.email || 'admin'
    });
    saveStore();
    logAudit(req.user?.id || 'admin', req.user?.email || 'admin@vms.dz', dryRun ? 'ODOO_SYNC_DRY_RUN' : 'ODOO_SYNC_EXECUTE', 'odoo', null, {
      dryRun,
      totalSuccess: summary.totalSuccess,
      totalFailed: summary.totalFailed,
      conflictsCount: summary.conflictsCount
    });
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/odoo/history', (req, res) => {
  const { limit, offset, entity_type, status } = req.query;
  const history = odooSyncService.logger.getHistory({
    limit: parseInt(limit || '50', 10),
    offset: parseInt(offset || '0', 10),
    entityType: entity_type || null,
    status: status || null
  });
  res.json(history);
});

app.post('/api/odoo/history/:id/retry', async (req, res) => {
  try {
    const result = await odooSyncService.retryOperation(req.params.id);
    saveStore();
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/api/odoo/conflicts', (req, res) => {
  res.json(db.odoo_sync_conflicts || []);
});

app.post('/api/odoo/conflicts/:id/resolve', (req, res) => {
  const { resolution, notes } = req.body;
  try {
    const resolved = odooSyncService.logger.resolveConflict(
      req.params.id,
      resolution,
      notes,
      req.user?.id || 'admin'
    );
    saveStore();
    logAudit(req.user?.id || 'admin', req.user?.email || 'admin@vms.dz', 'ODOO_CONFLICT_RESOLVED', 'conflict', req.params.id, { resolution });
    res.json(resolved);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.get('/api/odoo/config', (req, res) => {
  res.json({
    client: odooSyncService.apiClient.getStatus(),
    scheduler: odooSyncService.scheduler.getConfig()
  });
});

app.put('/api/odoo/config', (req, res) => {
  const { client, scheduler } = req.body;
  if (client) {
    odooSyncService.apiClient.updateConfig(client);
  }
  if (scheduler) {
    odooSyncService.scheduler.updateConfig(scheduler);
  }
  logAudit(req.user?.id || 'admin', req.user?.email || 'admin@vms.dz', 'ODOO_CONFIG_UPDATED', 'system', null, { hasClientUpdates: Boolean(client), hasSchedulerUpdates: Boolean(scheduler) });
  res.json({
    success: true,
    client: odooSyncService.apiClient.getStatus(),
    scheduler: odooSyncService.scheduler.getConfig()
  });
});

// Preorder tracking
app.post('/api/preorder-redirect', (req, res) => {
  const { user_id, model_id, wilaya_code } = req.body;
  const record = {
    id: `po-${Date.now()}`,
    user_id,
    model_id,
    wilaya_code,
    target_url: 'https://motobladi.dz/',
    created_at: new Date().toISOString()
  };
  db.preorders.unshift(record);
  saveStore();
  logAudit(user_id || 'guest', 'Customer', 'PREORDER_REDIRECT', 'preorders', record.id, { target: 'https://motobladi.dz/' });
  res.status(201).json(record);
});

// -----------------------------------------------------------------------------
// Business Intelligence & Advanced Analytics (Phase 4)
// -----------------------------------------------------------------------------
app.get('/api/bi/overview', async (req, res) => {
  try {
    const { startDate, endDate, region } = req.query;
    const overview = await biAnalyticsService.getExecutiveOverview({ startDate, endDate, region });
    res.json(overview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bi/sales-trends', async (req, res) => {
  try {
    const { granularity = 'monthly', range = '12m' } = req.query;
    const trends = await biAnalyticsService.getSalesTrends(granularity, range);
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bi/showroom-performance', async (req, res) => {
  try {
    const { region } = req.query;
    const rankings = await biAnalyticsService.getShowroomRankings({ region });
    res.json(rankings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bi/demand-intelligence', async (req, res) => {
  try {
    const intelligence = await biAnalyticsService.getDemandIntelligence();
    res.json(intelligence);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/bi/reports/export', async (req, res) => {
  try {
    const { format = 'csv' } = req.query;
    const overview = await biAnalyticsService.getExecutiveOverview({});
    const rankings = await biAnalyticsService.getShowroomRankings({});
    const demand = await biAnalyticsService.getDemandIntelligence();

    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="vms_bi_executive_report_${Date.now()}.json"`);
      return res.json({
        overview,
        rankings,
        demand,
        showroomRankings: rankings,
        demandIntelligence: demand
      });
    }

    // Default CSV report
    let csv = `RAPPORT EXECUTIF DE BUSINESS INTELLIGENCE — QUICK BY VMS\n`;
    csv += `Généré le: ${new Date().toISOString()}\n\n`;

    csv += `1. INDICATEURS CLÉS DE PERFORMANCE (KPIS)\n`;
    csv += `Métrique,Valeur\n`;
    csv += `Chiffre d'Affaires Réalisé (DZD),${overview.financials.totalSalesRevenue}\n`;
    csv += `Volume de Ventes (Motos),${overview.financials.totalSalesVolume}\n`;
    csv += `Ticket Moyen par Moto (DZD),${overview.financials.averageTicketDzd}\n`;
    csv += `Taux de Conversion Demandes (%),${overview.demand.conversionRatePercent}%\n`;
    csv += `Rotation des Stocks (Turnover Ratio),${overview.inventory.inventoryTurnoverRatio}\n`;
    csv += `Délai Moyen d'Écoulement (DSI Jours),${overview.inventory.daysSalesOfInventoryDsi}\n`;
    csv += `Stock Dormant >90j (Unités),${overview.inventory.agingPyramid.dormantOver90d}\n`;
    csv += `Capital Immobilisé en Stock Dormant (DZD),${overview.financials.dormantCapitalTiedUpDzd}\n`;
    csv += `Taux de Disponibilité Réseau (%),${overview.inventory.networkAvailabilityRatePercent}%\n\n`;

    csv += `2. BENCHMARKING DES SHOWROOMS (TOP 20)\n`;
    csv += `Showroom,Ville,Wilaya,Ventes (Volume),Stock Dispo,Stock Dormant,Demande En Attente,Score Efficience Normalisé,Catégorie\n`;
    rankings.rankings.slice(0, 20).forEach(r => {
      csv += `"${r.showroomName}","${r.city}","${r.wilayaCode}",${r.salesVolume},${r.availableStock},${r.dormantStock},${r.pendingDemand},${r.normalizedScore}/100,"${r.tier}"\n`;
    });
    csv += `\n`;

    csv += `3. ANALYSE DE LA DEMANDE PAR MODÈLE\n`;
    csv += `Modèle,Catégorie,Prix Catalogue (DZD),Demandes Clients,Demandes En Attente,Ventes,Stock Dispo,Indice de Tension\n`;
    demand.modelStats.forEach(m => {
      csv += `"${m.name}","${m.category}",${m.priceDzd},${m.totalRequests},${m.pendingDemand},${m.salesVolume},${m.availableStock},${m.tensionIndex}\n`;
    });

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="vms_bi_executive_report_${Date.now()}.csv"`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =============================================================================
// PREDICTIVE ANALYTICS & DEMAND FORECASTING (PHASE 5)
// =============================================================================
app.get('/api/predictive/overview', async (req, res) => {
  try {
    const overview = await predictiveAnalyticsService.getExecutiveOverview();
    res.json(overview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/predictive/sales-forecasts', async (req, res) => {
  try {
    const forecasts = await predictiveAnalyticsService.getSalesForecasts(req.query);
    res.json(forecasts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/predictive/models', async (req, res) => {
  try {
    const models = await predictiveAnalyticsService.getModelForecasts();
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/predictive/showrooms', async (req, res) => {
  try {
    const showrooms = await predictiveAnalyticsService.getShowroomProjections(req.query);
    res.json(showrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/predictive/seasonality', (req, res) => {
  res.json(predictiveAnalyticsService.getAlgerianSeasonality());
});

app.get('/api/predictive/backtest', (req, res) => {
  try {
    const series = predictiveAnalyticsService.extractDailySeries();
    const backtest = predictiveAnalyticsService.evaluateModelsBacktest(series, 14);
    res.json(backtest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =============================================================================
// ENTERPRISE DATA WAREHOUSE & EXECUTIVE REPORTING (PHASE 6)
// =============================================================================
app.get('/api/warehouse/overview', (req, res) => {
  try {
    const overview = dataWarehouseService.getWarehouseOverview();
    res.json(overview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/warehouse/etl/run', (req, res) => {
  try {
    const { runType = 'INCREMENTAL' } = req.body || {};
    const run = dataWarehouseService.runEtlPipeline(runType);
    logAudit(req.user?.id || 'admin', req.user?.email || 'admin@vms.dz', 'ETL_PIPELINE_EXECUTED', 'warehouse', run.run_id, { runType, status: run.status });
    res.json(run);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/warehouse/quality', (req, res) => {
  try {
    const audit = dataQualityService.assessWarehouseQuality(dataWarehouseService);
    res.json(audit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/warehouse/reconciliation', (req, res) => {
  try {
    const reconciliation = dataWarehouseService.reconcileWithSource();
    res.json(reconciliation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/warehouse/reports/executive', (req, res) => {
  try {
    const report = executiveReportingService.generateExecutiveReport(req.query);
    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/warehouse/reports/export', (req, res) => {
  try {
    const { format = 'csv' } = req.query;
    if (format === 'csv') {
      const csv = executiveReportingService.exportReport('csv', req.query);
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="vms_rapport_executif_${Date.now()}.csv"`);
      return res.send(csv);
    } else if (format === 'excel') {
      const xml = executiveReportingService.exportReport('excel', req.query);
      res.setHeader('Content-Type', 'application/vnd.ms-excel; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="vms_rapport_executif_${Date.now()}.xls"`);
      return res.send(xml);
    } else if (format === 'pdf') {
      const pdfData = executiveReportingService.exportReport('pdf', req.query);
      return res.json(pdfData);
    } else {
      return res.status(400).json({ error: `Format non supporté: ${format}` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 QUICK by VMS — Express Backend Server running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📦 Data storage: ${STORE_FILE}`);
  console.log(`====================================================`);
});
