import React, { useState } from 'react';
import {
  Database,
  FileCode,
  Download,
  Copy,
  CheckCircle2,
  Table,
  BarChart3,
  ExternalLink,
  Layers,
  Sparkles,
  Server,
  Code2,
  FileSpreadsheet
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { dbStore } from '../../services/dbStore';
import { useToast } from '../ui/Toast';

interface DataHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataHubModal: React.FC<DataHubModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'postgres' | 'odoo' | 'powerbi'>('postgres');
  const [copied, setCopied] = useState(false);

  const requests = dbStore.getCustomerRequests();
  const motorcycles = dbStore.getMotorcycles();
  const showrooms = dbStore.getShowrooms();
  const sales = dbStore.getSales();
  const models = dbStore.getModels();

  // Helper to escape SQL single quotes
  const esc = (val: any) => {
    if (val === null || val === undefined) return 'NULL';
    return `'${String(val).replace(/'/g, "''")}'`;
  };

  // 1. Generate PostgreSQL SQL Dump for Supabase
  const generatePostgresSQL = () => {
    let sql = `-- ====================================================================\n`;
    sql += `-- QUICK by VMS — PostgreSQL / Supabase Data Export\n`;
    sql += `-- Generated on: ${new Date().toISOString()}\n`;
    sql += `-- Target BAAS: Supabase PostgreSQL (postgres database)\n`;
    sql += `-- Suitable for Direct Execution in Supabase SQL Editor\n`;
    sql += `-- ====================================================================\n\n`;

    sql += `BEGIN;\n\n`;

    // Customer Requests
    sql += `-- 1. CUSTOMER AVAILABILITY REQUESTS (${requests.length} records)\n`;
    requests.forEach(r => {
      sql += `INSERT INTO customer_requests (\n`;
      sql += `  id, reference, first_name, last_name, phone, phone_normalized, email, \n`;
      sql += `  wilaya_code, city, status, matched_showroom_id, notes, created_at\n`;
      sql += `) VALUES (\n`;
      sql += `  gen_random_uuid(), ${esc(r.reference)}, ${esc(r.first_name)}, ${esc(r.last_name)},\n`;
      sql += `  ${esc(r.phone)}, ${esc(r.phone_normalized || r.phone)}, ${esc(r.email)},\n`;
      sql += `  ${esc(r.wilaya_code)}, ${esc(r.city)}, ${esc(r.status)}, \n`;
      sql += `  ${r.matched_showroom_id ? esc(r.matched_showroom_id) : 'NULL'}, ${esc(r.notes || '')}, ${esc(r.created_at)}\n`;
      sql += `) ON CONFLICT (reference) DO UPDATE SET\n`;
      sql += `  status = EXCLUDED.status,\n`;
      sql += `  matched_showroom_id = EXCLUDED.matched_showroom_id;\n\n`;
    });

    // Showroom Inventory
    sql += `-- 2. SHOWROOM MOTORCYCLES & DORMANT STOCK (${motorcycles.length} units)\n`;
    motorcycles.forEach(m => {
      sql += `INSERT INTO motorcycles (\n`;
      sql += `  vin, color, arrival_date, status, notes, created_at\n`;
      sql += `) VALUES (\n`;
      sql += `  ${esc(m.vin)}, ${esc(m.color)}, ${esc(m.arrival_date)}, ${esc(m.status)},\n`;
      sql += `  ${esc(m.notes || '')}, ${esc(m.created_at)}\n`;
      sql += `) ON CONFLICT (vin) DO UPDATE SET\n`;
      sql += `  status = EXCLUDED.status,\n`;
      sql += `  arrival_date = EXCLUDED.arrival_date;\n\n`;
    });

    // Completed Sales
    sql += `-- 3. SHOWROOM SALES & INVOICES (${sales.length} records)\n`;
    sales.forEach(s => {
      sql += `INSERT INTO sales (\n`;
      sql += `  reference, customer_name, customer_phone, sale_price, payment_method, sale_date, created_at\n`;
      sql += `) VALUES (\n`;
      sql += `  ${esc(s.reference)}, ${esc(s.customer_name)}, ${esc(s.customer_phone)}, ${s.sale_price},\n`;
      sql += `  ${esc(s.payment_method)}, ${esc(s.sale_date)}, ${esc(s.created_at)}\n`;
      sql += `) ON CONFLICT (reference) DO NOTHING;\n\n`;
    });

    sql += `COMMIT;\n`;
    return sql;
  };

  // 2. Generate Odoo CRM Leads CSV
  const generateOdooCSV = () => {
    const headers = [
      'name',              // Nom de l'opportunité (Odoo CRM)
      'contact_name',      // Nom et prénom du contact
      'partner_name',      // Société / Client
      'phone',             // Téléphone
      'mobile',            // Mobile
      'email_from',        // Email
      'city',              // Ville
      'state_code',        // Wilaya (Code)
      'description',       // Modèle moto souhaité et détails
      'expected_revenue',  // Montant estimé DZD
      'stage_name',        // Étape Odoo (Nouveau, Qualifié, Proposition, Gagné)
      'source_id'          // Source (QUICK by VMS)
    ];

    const rows = requests.map(r => {
      const model = models.find(m => m.id === r.motorcycle_model_id);
      const stage = r.status === 'available_notified' ? 'Proposition' : r.status === 'fulfilled' ? 'Gagné' : 'Nouveau';

      return [
        `"Demande Moto ${r.reference} - ${model?.name || 'VMS'}"`,
        `"${r.first_name} ${r.last_name}"`,
        `"${r.first_name} ${r.last_name}"`,
        `"${r.phone}"`,
        `"${r.phone}"`,
        `"${r.email}"`,
        `"${r.city}"`,
        `"${r.wilaya_code}"`,
        `"Modèle: ${model?.name || 'VMS'} | Wilaya: ${r.wilaya_code} | Notes: ${r.notes || ''}"`,
        model ? model.price_dzd : 250000,
        `"${stage}"`,
        `"QUICK by VMS Portal"`
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  };

  // 3. Generate Power BI Analytical Views SQL for Supabase DirectQuery
  const generatePowerBIVistaSQL = () => {
    return `-- ====================================================================\n` +
      `-- VMS INDUSTRIE — STAR SCHEMA ANALYTICAL VIEWS FOR POWER BI DIRECTQUERY\n` +
      `-- Host: db.<supabase-project>.supabase.co:5432 (Database: postgres)\n` +
      `-- ====================================================================\n\n` +
      `-- VIEW 1: FACT_CUSTOMER_DEMAND (Pour Power BI Matrix, Cartographie Wilayas & Funnel)\n` +
      `CREATE OR REPLACE VIEW view_powerbi_demandes_clients AS\n` +
      `SELECT\n` +
      `  r.id AS request_id,\n` +
      `  r.reference AS request_reference,\n` +
      `  r.created_at::DATE AS date_demande,\n` +
      `  r.wilaya_code,\n` +
      `  r.city AS commune,\n` +
      `  m.name AS modele_moto,\n` +
      `  m.brand AS marque,\n` +
      `  m.category AS categorie,\n` +
      `  m.price_dzd AS prix_catalogue,\n` +
      `  r.status AS statut_demande,\n` +
      `  CASE WHEN r.status = 'available_notified' THEN 1 ELSE 0 END AS est_disponible,\n` +
      `  CASE WHEN r.status = 'fulfilled' THEN 1 ELSE 0 END AS est_transformee,\n` +
      `  s.name AS showroom_attribue,\n` +
      `  s.city AS ville_showroom\n` +
      `FROM customer_requests r\n` +
      `LEFT JOIN motorcycle_models m ON r.motorcycle_model_id = m.id\n` +
      `LEFT JOIN showrooms s ON r.matched_showroom_id = s.id;\n\n` +
      `-- VIEW 2: FACT_STOCK_AGING (Pour Power BI Analyse de rotation & Compte Global)\n` +
      `CREATE OR REPLACE VIEW view_powerbi_stock_aging AS\n` +
      `SELECT\n` +
      `  moto.id AS moto_id,\n` +
      `  moto.vin AS chassis_vin,\n` +
      `  moto.color AS couleur,\n` +
      `  moto.arrival_date AS date_reception,\n` +
      `  CURRENT_DATE - moto.arrival_date AS jours_en_stock,\n` +
      `  CASE WHEN (CURRENT_DATE - moto.arrival_date) >= 90 THEN 'Dormant (>90j)' ELSE 'Actif (<90j)' END AS tranche_age,\n` +
      `  moto.status AS statut_stock,\n` +
      `  m.name AS modele_nom,\n` +
      `  m.price_dzd AS valeur_stock_dzd,\n` +
      `  s.name AS nom_showroom,\n` +
      `  s.wilaya_code AS wilaya_showroom\n` +
      `FROM motorcycles moto\n` +
      `LEFT JOIN motorcycle_models m ON moto.model_id = m.id\n` +
      `LEFT JOIN showrooms s ON moto.showroom_id = s.id;\n`;
  };

  // Download Trigger
  const handleDownload = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Fichier généré avec succès', filename);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success('Copié dans le presse-papier !');
    setTimeout(() => setCopied(false), 2000);
  };

  const sqlDump = generatePostgresSQL();
  const odooCSV = generateOdooCSV();
  const powerBiSQL = generatePowerBIVistaSQL();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Centre d'Extraction & Connecteurs BI / ERP"
      subtitle="Exportez la data des demandes clients et showrooms pour Supabase PostgreSQL, Odoo et Power BI."
      maxWidth="2xl"
    >
      <div className="space-y-6 py-2">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('postgres')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'postgres'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Database className="h-4 w-4 text-emerald-400" />
            <span>PostgreSQL / Supabase (.sql)</span>
          </button>

          <button
            onClick={() => setActiveTab('odoo')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'odoo'
                ? 'bg-purple-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Table className="h-4 w-4 text-purple-200" />
            <span>Odoo CRM & Ventes (CSV)</span>
          </button>

          <button
            onClick={() => setActiveTab('powerbi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'powerbi'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="h-4 w-4 text-amber-200" />
            <span>Power BI (DirectQuery Views)</span>
          </button>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* TAB 1: POSTGRESQL / SUPABASE                                      */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'postgres' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
              <Database className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Prêt pour Supabase BAAS & PostgreSQL</p>
                <p className="mt-0.5 leading-relaxed text-emerald-800">
                  Ce script génère l'ensemble des instructions <code className="font-mono bg-emerald-100 px-1 rounded">INSERT INTO ... ON CONFLICT</code> pour importer instantanément les demandes clients, les unités de stock et les ventes vers votre base de données Supabase.
                </p>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-2xl bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto max-h-64 border border-slate-800">
              <pre>{sqlDump}</pre>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 font-medium">
                Contient {requests.length} demandes clients, {motorcycles.length} motos et {sales.length} ventes.
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleCopy(sqlDump)}
                  className="text-xs font-bold gap-1.5"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copied ? 'Copié !' : 'Copier le SQL'}</span>
                </Button>

                <Button
                  onClick={() => handleDownload(sqlDump, `vms_supabase_dump_${new Date().toISOString().split('T')[0]}.sql`, 'application/sql')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>Télécharger Script SQL (.sql)</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 2: ODOO CRM & SALES                                           */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'odoo' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-950 flex items-start gap-3">
              <Table className="h-5 w-5 text-purple-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Importation directe Odoo CRM / Leads</p>
                <p className="mt-0.5 leading-relaxed text-purple-800">
                  Fichier CSV structuré selon les champs natifs Odoo (<code className="font-mono bg-purple-100 px-1 rounded">crm.lead</code> et <code className="font-mono bg-purple-100 px-1 rounded">res.partner</code>). Il intègre les numéros de téléphone, wilayas algériennes, modèles motos et montants prévisionnels.
                </p>
              </div>
            </div>

            {/* Odoo Field Mapping Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden text-xs">
              <div className="bg-slate-50 px-4 py-2 font-bold text-slate-700 border-b border-slate-200 text-[11px] uppercase">
                Correspondance des champs Odoo
              </div>
              <div className="divide-y divide-slate-100">
                <div className="px-4 py-2 flex justify-between">
                  <span className="font-mono text-purple-700 font-bold">name</span>
                  <span className="text-slate-600">Référence & Modèle de Moto</span>
                </div>
                <div className="px-4 py-2 flex justify-between">
                  <span className="font-mono text-purple-700 font-bold">contact_name & phone</span>
                  <span className="text-slate-600">Identité du client & Téléphone</span>
                </div>
                <div className="px-4 py-2 flex justify-between">
                  <span className="font-mono text-purple-700 font-bold">city & state_code</span>
                  <span className="text-slate-600">Commune et Wilaya algérienne (1 à 58)</span>
                </div>
                <div className="px-4 py-2 flex justify-between">
                  <span className="font-mono text-purple-700 font-bold">expected_revenue</span>
                  <span className="text-slate-600">Prix catalogue officiel VMS (DZD)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-500 font-medium">
                {requests.length} opportunités commerciales prêtes à être importées dans Odoo.
              </span>

              <Button
                onClick={() => handleDownload(odooCSV, `vms_odoo_crm_leads_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv')}
                className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs gap-1.5 shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger CSV Odoo CRM</span>
              </Button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* TAB 3: POWER BI DIRECTQUERY (STAR SCHEMA)                         */}
        {/* ----------------------------------------------------------------- */}
        {activeTab === 'powerbi' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <BarChart3 className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Vues SQL Analytiques pour Power BI DirectQuery</p>
                <p className="mt-0.5 leading-relaxed text-amber-800">
                  Connectez Power BI Desktop directement à Supabase PostgreSQL pour construire vos tableaux de bord décisionnels (analyse de la demande par wilaya, taux de rotation des stocks et goulots d'étranglement).
                </p>
              </div>
            </div>

            {/* Connection instructions card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Paramètres de Connexion Power BI Desktop
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">CONNECTEUR :</span>
                  <strong className="text-slate-800">PostgreSQL Database</strong>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">SERVEUR (HOST) :</span>
                  <strong className="text-slate-800">db.&lt;project-ref&gt;.supabase.co:5432</strong>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">BASE DE DONNÉES :</span>
                  <strong className="text-slate-800">postgres</strong>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">MODE DE REQUÊTE :</span>
                  <strong className="text-amber-700">DirectQuery (Temps Réel)</strong>
                </div>
              </div>
            </div>

            {/* Code Box */}
            <div className="relative rounded-2xl bg-slate-950 text-amber-300 p-4 font-mono text-xs overflow-x-auto max-h-48 border border-slate-800">
              <pre>{powerBiSQL}</pre>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => handleCopy(powerBiSQL)}
                className="text-xs font-bold gap-1.5"
              >
                <Copy className="h-4 w-4" />
                <span>Copier les Vues SQL</span>
              </Button>

              <Button
                onClick={() => handleDownload(powerBiSQL, `vms_powerbi_views_${new Date().toISOString().split('T')[0]}.sql`, 'application/sql')}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger Vues Power BI (.sql)</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
