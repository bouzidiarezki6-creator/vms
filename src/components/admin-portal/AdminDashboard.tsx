import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Store,
  Bike,
  Users,
  AlertTriangle,
  ArrowRightLeft,
  DollarSign,
  Download,
  Search,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  Building,
  Layers,
  FileSpreadsheet,
  Database,
  Filter,
  ArrowUpRight,
  Activity,
  GitFork,
  RefreshCw,
  Sparkles,
  PieChart as PieIcon,
  BarChart3,
  Server
} from 'lucide-react';
import { OdooIntegrationView } from './OdooIntegrationView';
import { AdvancedBiDashboard } from './AdvancedBiDashboard';
import { dbStore } from '../../services/dbStore';
import {
  GlobalKPIs,
  Showroom,
  Motorcycle,
  CustomerRequest,
  AuditLog,
  Profile
} from '../../types';
import { CreateShowroomModal } from './CreateShowroomModal';
import { CreateUserModal } from './CreateUserModal';
import { DataHubModal } from './DataHubModal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatPrice, formatDate, formatDateTime } from '../../lib/utils';
import { WILAYAS } from '../../data/wilayas';
import { useToast } from '../ui/Toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  Legend
} from 'recharts';

interface AdminDashboardProps {
  initialSubTab?: 'bi' | 'showrooms' | 'inventory' | 'requests' | 'audit' | 'datahub' | 'odoo';
  onNavigateToCompteGlobal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialSubTab = 'bi',
  onNavigateToCompteGlobal
}) => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();
  const [activeSubTab, setActiveSubTab] = useState<'bi' | 'showrooms' | 'inventory' | 'requests' | 'audit' | 'datahub' | 'odoo'>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  const [kpis, setKpis] = useState<GlobalKPIs | null>(null);
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // Modals
  const [isCreateShowroomOpen, setIsCreateShowroomOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isDataHubOpen, setIsDataHubOpen] = useState(false);

  // Filters for Global Inventory
  const [invShowroomFilter, setInvShowroomFilter] = useState('ALL');
  const [invStatusFilter, setInvStatusFilter] = useState('ALL');
  const [invAgingFilter, setInvAgingFilter] = useState(false);
  const [invSearchVin, setInvSearchVin] = useState('');

  // Filters for Requests
  const [reqWilayaFilter, setReqWilayaFilter] = useState('ALL');
  const [reqStatusFilter, setReqStatusFilter] = useState('ALL');
  const [reqSearch, setReqSearch] = useState('');

  // Interactive BI Chart Controls
  const [wilayaDisplayMode, setWilayaDisplayMode] = useState<'top10' | 'top20' | 'all'>('top10');
  const [wilayaSortMode, setWilayaSortMode] = useState<'desc' | 'code'>('desc');
  const [modelMetricMode, setModelMetricMode] = useState<'volume' | 'revenue'>('volume');
  const [showroomRegionFilter, setShowroomRegionFilter] = useState<'ALL' | 'CENTRE' | 'OUEST' | 'EST' | 'SUD'>('ALL');
  const [showroomStockView, setShowroomStockView] = useState<'topStock' | 'topAging'>('topStock');

  const refreshData = () => {
    setKpis(dbStore.getGlobalKPIs());
    setShowrooms(dbStore.getShowrooms());
    setMotorcycles(dbStore.getMotorcycles());
    setRequests(dbStore.getCustomerRequests());
    setAuditLogs(dbStore.getAuditLogs());
    setProfiles(dbStore.getProfiles());
  };

  useEffect(() => {
    refreshData();
    return dbStore.subscribe(refreshData);
  }, []);

  const models = dbStore.getModels();

  // Export Inventory to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Modèle', 'Marque', 'Showroom', 'Wilaya', 'VIN', 'Couleur', 'Date_Arrivee', 'Jours_En_Stock', 'Dormant_90j', 'Statut'];
    const rows = motorcycles.map(m => [
      m.id,
      m.model?.name || '',
      m.model?.brand || '',
      m.showroom?.name || '',
      m.showroom?.wilaya_code || '',
      m.vin,
      m.color,
      m.arrival_date,
      m.days_in_stock || 0,
      m.is_aging ? 'OUI' : 'NON',
      m.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vms_inventaire_global_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Exportation CSV générée avec succès !');
  };

  // Toggle Showroom Status
  const handleToggleShowroomStatus = (shw: Showroom) => {
    try {
      dbStore.updateShowroom(shw.id, { is_active: !shw.is_active }, currentUser?.id || 'admin');
      toast.success(`Showroom ${!shw.is_active ? 'activé' : 'suspendu'}`);
      refreshData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  // 1. BI Chart 1: Customer Requests by Wilaya (with rich multi-status breakdown & ranking)
  const wilayaStatsMap: Record<string, { code: string; name: string; name_ar: string; total: number; pending: number; fulfilled: number; notified: number; preorder: number }> = {};
  requests.forEach(r => {
    const w = WILAYAS.find(wil => wil.code === r.wilaya_code);
    const code = r.wilaya_code;
    const name = w ? w.name : `Wilaya ${code}`;
    const name_ar = w?.name_ar || '';
    if (!wilayaStatsMap[code]) {
      wilayaStatsMap[code] = { code, name, name_ar, total: 0, pending: 0, fulfilled: 0, notified: 0, preorder: 0 };
    }
    wilayaStatsMap[code].total += 1;
    if (r.status === 'pending') wilayaStatsMap[code].pending += 1;
    else if (r.status === 'fulfilled') wilayaStatsMap[code].fulfilled += 1;
    else if (r.status === 'available_notified') wilayaStatsMap[code].notified += 1;
    else if (r.status === 'preorder_redirected') wilayaStatsMap[code].preorder += 1;
  });

  const sortedWilayas = Object.values(wilayaStatsMap);
  if (wilayaSortMode === 'desc') {
    sortedWilayas.sort((a, b) => b.total - a.total);
  } else {
    sortedWilayas.sort((a, b) => a.code.localeCompare(b.code));
  }

  const displayedWilayas = (wilayaDisplayMode === 'top10'
    ? sortedWilayas.slice(0, 10)
    : wilayaDisplayMode === 'top20'
      ? sortedWilayas.slice(0, 20)
      : sortedWilayas
  ).map((item, idx) => ({
    ...item,
    displayName: `${item.code} - ${item.name}`,
    percentage: requests.length > 0 ? Math.round((item.total / requests.length) * 1000) / 10 : 0,
    rank: idx + 1
  }));

  // 2. BI Chart 2: Most Requested Models (Volume & Potential Revenue in DZD)
  const modelDemandData = models.map(m => {
    const reqs = requests.filter(r => r.motorcycle_model_id === m.id);
    const count = reqs.length;
    const potentialRevenue = count * m.price_dzd;
    return {
      id: m.id,
      name: m.name.replace('VMS ', ''),
      fullName: m.name,
      category: m.category,
      unitPrice: m.price_dzd,
      demandes: count,
      caPotentiel: potentialRevenue,
      caMillions: Math.round((potentialRevenue / 1000000) * 10) / 10
    };
  }).sort((a, b) => modelMetricMode === 'revenue' ? b.caPotentiel - a.caPotentiel : b.demandes - a.demandes);

  // 3. BI Chart 3: Showroom Stock Distribution: Healthy Stock vs Aging Stock (>90j)
  const showroomDetailedStock = showrooms.map(s => {
    const shwMotos = motorcycles.filter(m => m.showroom_id === s.id && m.status === 'available');
    const dormant = shwMotos.filter(m => m.is_aging).length;
    const healthy = shwMotos.length - dormant;

    let region = 'AUTRE';
    const code = s.wilaya_code;
    if (['16', '09', '15', '35', '42', '10', '26', '44'].includes(code)) region = 'CENTRE';
    else if (['31', '48', '13', '02', '27', '22', '29', '14', '20', '46', '45', '38', '32'].includes(code)) region = 'OUEST';
    else if (['06', '25', '19', '05', '23', '34', '18', '21', '24', '43', '41', '12', '40', '04', '36'].includes(code)) region = 'EST';
    else region = 'SUD';

    return {
      id: s.id,
      name: s.city,
      fullName: s.name,
      wilayaCode: s.wilaya_code,
      region,
      sain: healthy,
      dormant: dormant,
      total: shwMotos.length
    };
  });

  let filteredShowroomsData = showroomDetailedStock;
  if (showroomRegionFilter !== 'ALL') {
    filteredShowroomsData = filteredShowroomsData.filter(s => s.region === showroomRegionFilter);
  }

  if (showroomStockView === 'topAging') {
    filteredShowroomsData.sort((a, b) => b.dormant - a.dormant);
  } else {
    filteredShowroomsData.sort((a, b) => b.total - a.total);
  }
  const displayedShowroomsData = filteredShowroomsData.slice(0, 15);

  // 4. Request Status Distribution (Donut Chart)
  const requestStatusData = [
    { name: 'En attente de stock', value: requests.filter(r => r.status === 'pending').length, color: '#f59e0b' },
    { name: 'Disponible & Notifié', value: requests.filter(r => r.status === 'available_notified').length, color: '#3b82f6' },
    { name: 'Demande Concrétisée', value: requests.filter(r => r.status === 'fulfilled').length, color: '#10b981' },
    { name: 'Précommande motobladi', value: requests.filter(r => r.status === 'preorder_redirected').length, color: '#8b5cf6' }
  ];

  // 5. 30-day Trend Timeline (AreaChart)
  const timelineData = [
    { period: 'Il y a 30j', demandes: 28, ventes: 8, transferts: 2 },
    { period: 'Il y a 25j', demandes: 35, ventes: 11, transferts: 4 },
    { period: 'Il y a 20j', demandes: 42, ventes: 14, transferts: 5 },
    { period: 'Il y a 15j', demandes: 50, ventes: 17, transferts: 5 },
    { period: 'Il y a 10j', demandes: 46, ventes: 15, transferts: 3 },
    { period: 'Il y a 5j', demandes: 62, ventes: 21, transferts: 6 },
    { period: 'Cette semaine', demandes: 78, ventes: 26, transferts: 8 }
  ];

  // Filtered Inventory
  const filteredMotos = motorcycles.filter(m => {
    const matchesShowroom = invShowroomFilter === 'ALL' || m.showroom_id === invShowroomFilter;
    const matchesStatus = invStatusFilter === 'ALL' || m.status === invStatusFilter;
    const matchesAging = !invAgingFilter || m.is_aging;
    const matchesVin = !invSearchVin || m.vin.toLowerCase().includes(invSearchVin.toLowerCase()) ||
                       m.model?.name.toLowerCase().includes(invSearchVin.toLowerCase());
    return matchesShowroom && matchesStatus && matchesAging && matchesVin;
  });

  // Filtered Requests
  const filteredRequests = requests.filter(r => {
    const matchesWilaya = reqWilayaFilter === 'ALL' || r.wilaya_code === reqWilayaFilter;
    const matchesStatus = reqStatusFilter === 'ALL' || r.status === reqStatusFilter;
    const matchesSearch = !reqSearch || 
                          r.reference.toLowerCase().includes(reqSearch.toLowerCase()) ||
                          r.first_name.toLowerCase().includes(reqSearch.toLowerCase()) ||
                          r.last_name.toLowerCase().includes(reqSearch.toLowerCase()) ||
                          r.phone.includes(reqSearch) ||
                          r.email.toLowerCase().includes(reqSearch.toLowerCase());
    return matchesWilaya && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Super Admin Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            <span>Direction Générale VMS Industrie</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">
            Portail Super Administrateur QUICK by VMS
          </h1>
          <p className="text-xs text-slate-400">
            Supervision centralisée du réseau national de distribution et intelligence d'affaires
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            onClick={() => setIsDataHubOpen(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold gap-1.5 shadow-md shadow-purple-900/30"
          >
            <Database className="h-4 w-4" />
            <span>Data Hub : Supabase & Odoo & BI</span>
          </Button>
          <Button
            size="sm"
            onClick={() => setIsCreateShowroomOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold gap-1.5"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau Showroom</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsCreateUserOpen(true)}
            className="bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-bold gap-1.5"
          >
            <Users className="h-4 w-4" />
            <span>Créer Compte Showroom</span>
          </Button>
          <Button
            size="sm"
            variant="success"
            onClick={handleExportCSV}
            className="text-xs font-bold gap-1.5"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('bi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'bi'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Business Intelligence</span>
        </button>

        <button
          onClick={() => setActiveSubTab('showrooms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'showrooms'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Store className="h-4 w-4" />
          <span>Showrooms & Comptes ({showrooms.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'inventory'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bike className="h-4 w-4" />
          <span>Stock Réseau ({motorcycles.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('requests')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'requests'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Demandes Clients ({requests.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeSubTab === 'audit'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Audit Logs ({auditLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('odoo')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeSubTab === 'odoo'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200'
          }`}
        >
          <Server className="h-4 w-4" />
          <span>Passerelle Odoo ERP</span>
        </button>

        <button
          onClick={() => setIsDataHubOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200"
        >
          <Database className="h-4 w-4 text-purple-600" />
          <span>Data Hub : SQL & CSV</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* 1. BUSINESS INTELLIGENCE (BI) DASHBOARD (Phase 4 Enterprise Suite)  */}
      {/* ==================================================================== */}
      {activeSubTab === 'bi' && (
        <AdvancedBiDashboard
          onNavigateToCompteGlobal={onNavigateToCompteGlobal}
          onNavigateToShowrooms={() => setActiveSubTab('showrooms')}
          onNavigateToRequests={() => setActiveSubTab('requests')}
          onNavigateToInventory={() => setActiveSubTab('inventory')}
        />
      )}

      {/* ==================================================================== */}
      {/* 2. SHOWROOMS DIRECTORY (Section 6.2) */}
      {/* ==================================================================== */}
      {activeSubTab === 'showrooms' && (
        <Card className="overflow-hidden">
          <CardHeader className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <CardTitle>Annuaire Centralisé des Showrooms Agréés VMS</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Supervision des gestionnaires, affectation des comptes et état d'activité
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setIsCreateShowroomOpen(true)}
              className="gap-1.5 text-xs font-bold"
            >
              <Plus className="h-4 w-4" />
              <span>Nouveau Showroom</span>
            </Button>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Showroom</th>
                  <th className="px-5 py-3">Wilaya & Ville</th>
                  <th className="px-5 py-3">Coordonnées (Tél / Email)</th>
                  <th className="px-5 py-3">Responsable Affecté</th>
                  <th className="px-5 py-3">Stock Actuel</th>
                  <th className="px-5 py-3">Statut</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {showrooms.map(s => {
                  const owner = profiles.find(p => p.id === s.owner_id);
                  const stockCount = motorcycles.filter(m => m.showroom_id === s.id).length;
                  const availableCount = motorcycles.filter(m => m.showroom_id === s.id && m.status === 'available').length;
                  const wilaya = WILAYAS.find(w => w.code === s.wilaya_code);

                  return (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-slate-900">{s.name}</p>
                        <p className="text-[10px] font-mono text-slate-400">{s.code}</p>
                      </td>

                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-slate-800">{s.city}</p>
                        <p className="text-[11px] text-slate-500">{wilaya?.code} - {wilaya?.name}</p>
                      </td>

                      <td className="px-5 py-3.5">
                        <p className="text-slate-800">{s.phone}</p>
                        <p className="text-[11px] text-slate-400">{s.email}</p>
                      </td>

                      <td className="px-5 py-3.5">
                        {owner ? (
                          <div>
                            <p className="font-bold text-slate-900">{owner.first_name} {owner.last_name}</p>
                            <p className="text-[10px] text-slate-400">{owner.email}</p>
                          </div>
                        ) : (
                          <span className="text-amber-600 font-semibold text-[11px]">Non assigné</span>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-bold text-slate-900">{stockCount} motos</span>
                        <span className="text-[11px] text-emerald-600 block">({availableCount} dispo)</span>
                      </td>

                      <td className="px-5 py-3.5">
                        {s.is_active ? (
                          <Badge variant="success">Actif</Badge>
                        ) : (
                          <Badge variant="danger">Suspendu</Badge>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleToggleShowroomStatus(s)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                            s.is_active
                              ? 'text-red-700 border-red-200 hover:bg-red-50'
                              : 'text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                          }`}
                        >
                          {s.is_active ? 'Suspendre' : 'Réactiver'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ==================================================================== */}
      {/* 3. GLOBAL INVENTORY MANAGEMENT (Section 6.3) */}
      {/* ==================================================================== */}
      {activeSubTab === 'inventory' && (
        <Card className="overflow-hidden">
          <CardHeader className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Inventaire Global du Réseau VMS</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Visualisation temps réel de chaque unité, durée en stock et détection Compte Global
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Chercher VIN / Modèle..."
                value={invSearchVin}
                onChange={e => setInvSearchVin(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />

              <select
                value={invShowroomFilter}
                onChange={e => setInvShowroomFilter(e.target.value)}
                className="text-xs rounded-lg border border-slate-300 py-1.5 px-2.5 font-medium text-slate-700 focus:outline-none"
              >
                <option value="ALL">Tous les Showrooms</option>
                {showrooms.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.city})</option>
                ))}
              </select>

              <select
                value={invStatusFilter}
                onChange={e => setInvStatusFilter(e.target.value)}
                className="text-xs rounded-lg border border-slate-300 py-1.5 px-2.5 font-medium text-slate-700 focus:outline-none"
              >
                <option value="ALL">Tous les statuts</option>
                <option value="available">Disponible</option>
                <option value="reserved">Réservé</option>
                <option value="in_transfer">En transfert</option>
                <option value="sold">Vendu</option>
              </select>

              <button
                onClick={() => setInvAgingFilter(!invAgingFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                  invAgingFilter
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                Stock Dormant &gt;90j
              </button>

              <Button size="sm" variant="outline" onClick={handleExportCSV} className="text-xs gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>CSV</span>
              </Button>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Modèle / Marque</th>
                  <th className="px-5 py-3">Numéro Châssis (VIN)</th>
                  <th className="px-5 py-3">Showroom Dépositaire</th>
                  <th className="px-5 py-3">Couleur</th>
                  <th className="px-5 py-3">Durée en Stock</th>
                  <th className="px-5 py-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMotos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-slate-400">
                      Aucune moto trouvée.
                    </td>
                  </tr>
                ) : (
                  filteredMotos.map(moto => (
                    <tr key={moto.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-bold text-slate-900">{moto.model?.name}</p>
                        <p className="text-[10px] text-blue-600 font-semibold">{moto.model?.brand} • {moto.model?.category}</p>
                      </td>

                      <td className="px-5 py-3.5 font-mono font-semibold text-slate-800">
                        {moto.vin}
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-slate-900">{moto.showroom?.name}</span>
                        <span className="text-[10px] text-slate-400 block">{moto.showroom?.city} ({moto.showroom?.wilaya_code})</span>
                      </td>

                      <td className="px-5 py-3.5 text-slate-700">
                        {moto.color}
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{moto.days_in_stock} jours</span>
                          {moto.is_aging && moto.status === 'available' && (
                            <Badge variant="aging">&gt;90j Compte Global</Badge>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        {moto.status === 'available' && <Badge variant="success">Disponible</Badge>}
                        {moto.status === 'reserved' && <Badge variant="warning">Réservé</Badge>}
                        {moto.status === 'in_transfer' && <Badge variant="info">En Transfert</Badge>}
                        {moto.status === 'sold' && <Badge variant="default">Vendu le {formatDate(moto.sale_date)}</Badge>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ==================================================================== */}
      {/* 4. CUSTOMER & REQUEST MANAGEMENT (Section 6.4) */}
      {/* ==================================================================== */}
      {activeSubTab === 'requests' && (
        <Card className="overflow-hidden">
          <CardHeader className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Demandes de Disponibilité Motos (Toutes Wilayas)</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Contrôle anti-abus 2 demandes/7 jours, tracking de conversion et réorientations motobladi.dz
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Nom, Tél, Réf REQ..."
                value={reqSearch}
                onChange={e => setReqSearch(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />

              <select
                value={reqWilayaFilter}
                onChange={e => setReqWilayaFilter(e.target.value)}
                className="text-xs rounded-lg border border-slate-300 py-1.5 px-2.5 font-medium text-slate-700"
              >
                <option value="ALL">Toutes les Wilayas</option>
                {WILAYAS.map(w => (
                  <option key={w.code} value={w.code}>{w.code} - {w.name}</option>
                ))}
              </select>

              <select
                value={reqStatusFilter}
                onChange={e => setReqStatusFilter(e.target.value)}
                className="text-xs rounded-lg border border-slate-300 py-1.5 px-2.5 font-medium text-slate-700"
              >
                <option value="ALL">Tous les statuts</option>
                <option value="pending">En attente de stock</option>
                <option value="available_notified">Disponible & Notifié</option>
                <option value="fulfilled">Finalisé</option>
                <option value="preorder_redirected">Précommande</option>
              </select>

              <Button
                size="sm"
                onClick={() => setIsDataHubOpen(true)}
                className="text-xs gap-1 bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                <Database className="h-3.5 w-3.5" />
                <span>Export Supabase / Odoo</span>
              </Button>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Réf / Date</th>
                  <th className="px-5 py-3">Client (Nom & Contact)</th>
                  <th className="px-5 py-3">Modèle Demandé</th>
                  <th className="px-5 py-3">Région / Ville</th>
                  <th className="px-5 py-3">Statut Prise en Charge</th>
                  <th className="px-5 py-3">Showroom Associé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-slate-400">
                      Aucune demande trouvée.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-mono font-bold text-blue-700">{r.reference}</span>
                        <span className="text-[10px] text-slate-400 block">{formatDateTime(r.created_at)}</span>
                      </td>

                      <td className="px-5 py-3.5">
                        <p className="font-bold text-slate-900">{r.first_name} {r.last_name}</p>
                        <p className="text-[11px] text-slate-600">{r.phone}</p>
                        <p className="text-[10px] text-slate-400">{r.email}</p>
                      </td>

                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {r.model?.name}
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-slate-800">{r.city}</span>
                        <span className="text-[10px] text-slate-400 block">Wilaya {r.wilaya_code} ({r.region?.name})</span>
                      </td>

                      <td className="px-5 py-3.5">
                        {r.status === 'available_notified' && <Badge variant="success">Disponible - Client notifié</Badge>}
                        {r.status === 'pending' && <Badge variant="warning">En attente de stock</Badge>}
                        {r.status === 'fulfilled' && <Badge variant="info">Fait / Vente conclue</Badge>}
                        {r.status === 'preorder_redirected' && <Badge variant="purple">Précommande Motobladi</Badge>}
                      </td>

                      <td className="px-5 py-3.5">
                        {r.matched_showroom ? (
                          <div>
                            <span className="font-semibold text-slate-900">{r.matched_showroom.name}</span>
                            <span className="text-[10px] text-slate-400 block">{r.matched_showroom.phone}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ==================================================================== */}
      {/* 5. AUDIT LOGS & TRACEABILITY (Section 6.6) */}
      {/* ==================================================================== */}
      {activeSubTab === 'audit' && (
        <Card className="overflow-hidden">
          <CardHeader className="p-5 border-b border-slate-100">
            <CardTitle>Journal d'Audit & Traçabilité Complète du Système</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Historique immuable des authentifications, modifications de stocks, approbations de transferts et ventes
            </p>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Horodatage</th>
                  <th className="px-5 py-3">Utilisateur / Auteur</th>
                  <th className="px-5 py-3">Action Système</th>
                  <th className="px-5 py-3">Entité Cible</th>
                  <th className="px-5 py-3">Détails de l'Opération</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                      {formatDateTime(log.created_at)}
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-slate-900">{log.user_email || 'Système QUICK'}</span>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-100 text-slate-800 border border-slate-200">
                        {log.action_type}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-slate-700 capitalize">
                      {log.entity_type}
                    </td>

                    <td className="px-5 py-3.5 font-mono text-[10px] text-slate-600 max-w-xs truncate">
                      {JSON.stringify(log.details || {})}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* ==================================================================== */}
      {/* 6. ODOO ERP INTEGRATION & SYNCHRONIZATION (PHASE 3) */}
      {/* ==================================================================== */}
      {activeSubTab === 'odoo' && (
        <OdooIntegrationView />
      )}

      {/* Modals */}
      <CreateShowroomModal
        isOpen={isCreateShowroomOpen}
        onClose={() => setIsCreateShowroomOpen(false)}
        onSuccess={refreshData}
      />

      <CreateUserModal
        isOpen={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        onSuccess={refreshData}
      />

      <DataHubModal
        isOpen={isDataHubOpen}
        onClose={() => setIsDataHubOpen(false)}
      />
    </div>
  );
};
