import React, { useState, useEffect, useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Bike,
  Users,
  AlertTriangle,
  ArrowRightLeft,
  Calendar,
  Download,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  Eye,
  BarChart3,
  PieChart as PieIcon,
  Search,
  Sparkles,
  Zap,
  Building,
  MapPin,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { api } from '../../services/api';
import {
  BiExecutiveOverview,
  BiSalesTrendsResponse,
  BiShowroomRankingsResponse,
  BiDemandIntelligenceResponse,
  BiShowroomRanking,
  BiModelDemandPerformance
} from '../../types';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';
import { formatPrice } from '../../lib/utils';

interface AdvancedBiDashboardProps {
  onNavigateToCompteGlobal?: () => void;
  onNavigateToShowrooms?: () => void;
  onNavigateToRequests?: () => void;
  onNavigateToInventory?: () => void;
}

export const AdvancedBiDashboard: React.FC<AdvancedBiDashboardProps> = ({
  onNavigateToCompteGlobal,
  onNavigateToShowrooms,
  onNavigateToRequests,
  onNavigateToInventory
}) => {
  const toast = useToast();

  // Primary Filter Controls
  const [period, setPeriod] = useState<'7d' | '30d' | '90d' | 'ytd' | '12m' | 'all'>('all');
  const [granularity, setGranularity] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [region, setRegion] = useState<'ALL' | 'CENTRE' | 'EST' | 'OUEST' | 'SUD'>('ALL');

  // Sub-Navigation within BI Suite
  const [activeBiTab, setActiveBiTab] = useState<'overview' | 'commercial' | 'inventory' | 'showrooms' | 'demand'>('overview');

  // Async Data States
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [overview, setOverview] = useState<BiExecutiveOverview | null>(null);
  const [trends, setTrends] = useState<BiSalesTrendsResponse | null>(null);
  const [rankings, setRankings] = useState<BiShowroomRankingsResponse | null>(null);
  const [demand, setDemand] = useState<BiDemandIntelligenceResponse | null>(null);

  // Drill-down Modal States
  const [selectedShowroom, setSelectedShowroom] = useState<BiShowroomRanking | null>(null);
  const [selectedModel, setSelectedModel] = useState<BiModelDemandPerformance | null>(null);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);

  // Table Filters
  const [showroomSearch, setShowroomSearch] = useState<string>('');
  const [showroomTierFilter, setShowroomTierFilter] = useState<string>('ALL');
  const [modelSearch, setModelSearch] = useState<string>('');

  // Fetch all BI Data concurrently
  const loadBiData = async (forceRefresh: boolean = false) => {
    try {
      if (forceRefresh) setRefreshing(true);

      const [resOverview, resTrends, resRankings, resDemand] = await Promise.all([
        api.getBiOverview({ period, region }),
        api.getBiSalesTrends({ granularity, range: period, region }),
        api.getBiShowroomRankings({ region }),
        api.getBiDemandIntelligence({ region })
      ]);

      if (resOverview) setOverview(resOverview);
      if (resTrends) setTrends(resTrends);
      if (resRankings) setRankings(resRankings);
      if (resDemand) setDemand(resDemand);

      if (forceRefresh) {
        toast.success('Données BI actualisées avec succès (Cache régénéré)');
      }
    } catch (err: any) {
      console.error('Error loading BI data:', err);
      toast.error('Erreur de chargement BI', err.message || 'Impossible de récupérer les indicateurs');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBiData();
  }, [period, granularity, region]);

  // Export handlers
  const handleExportCsv = () => {
    const url = api.getBiExportUrl('csv', period, region);
    window.open(url, '_blank');
    toast.success('Téléchargement du rapport exécutif CSV lancé');
  };

  const handleExportJson = () => {
    const url = api.getBiExportUrl('json', period, region);
    window.open(url, '_blank');
    toast.success('Export JSON généré');
  };

  // Filtered Showrooms for Benchmarking Table
  const filteredShowrooms = useMemo(() => {
    if (!rankings?.rankings) return [];
    return rankings.rankings.filter(s => {
      const matchSearch =
        !showroomSearch ||
        s.showroomName.toLowerCase().includes(showroomSearch.toLowerCase()) ||
        s.city.toLowerCase().includes(showroomSearch.toLowerCase()) ||
        s.wilayaCode.includes(showroomSearch);
      const matchTier = showroomTierFilter === 'ALL' || s.tier === showroomTierFilter;
      return matchSearch && matchTier;
    });
  }, [rankings, showroomSearch, showroomTierFilter]);

  // Filtered Models for Demand Intelligence
  const filteredModels = useMemo(() => {
    if (!demand?.modelStats) return [];
    return demand.modelStats.filter(m => {
      return (
        !modelSearch ||
        m.name.toLowerCase().includes(modelSearch.toLowerCase()) ||
        m.brand.toLowerCase().includes(modelSearch.toLowerCase()) ||
        m.category.toLowerCase().includes(modelSearch.toLowerCase())
      );
    });
  }, [demand, modelSearch]);

  // Payment Breakdown Chart Data
  const paymentChartData = useMemo(() => {
    if (!trends?.paymentSplit) return [];
    const colors: Record<string, string> = {
      CASH: '#10b981',
      VIREMENT: '#3b82f6',
      CHEQUE: '#8b5cf6',
      FACILITE: '#f59e0b'
    };
    return Object.entries(trends.paymentSplit).map(([key, percentage]) => ({
      name: key,
      displayName:
        key === 'CASH'
          ? 'Espèces (Comptant)'
          : key === 'VIREMENT'
          ? 'Virement Bancaire'
          : key === 'CHEQUE'
          ? 'Chèque Certifié'
          : 'Facilité de Paiement',
      percentage,
      color: colors[key] || '#94a3b8'
    }));
  }, [trends]);

  // Aging Pyramid Chart Data
  const agingPyramidData = useMemo(() => {
    if (!overview?.inventory.agingPyramid) return [];
    const aging = overview.inventory.agingPyramid;
    return [
      { tranche: '< 30 jours (Frais)', motos: aging.freshUnder30d, color: '#10b981', description: 'Stock très fluide' },
      { tranche: '30 - 60 jours (Normal)', motos: aging.normal30to60d, color: '#3b82f6', description: 'Rotation normale' },
      { tranche: '60 - 90 jours (Surveillance)', motos: aging.warning60to90d, color: '#f59e0b', description: 'Surveillance active' },
      { tranche: '90 - 130 jours (Dormant)', motos: aging.dormantOver90d, color: '#f97316', description: 'Compte Global éligible' },
      { tranche: '> 130 jours (Critique)', motos: aging.criticalOver130d, color: '#ef4444', description: 'Alerte rouge déstockage' }
    ];
  }, [overview]);

  return (
    <div className="space-y-6">
      {/* ===================================================================== */}
      {/* 1. TOP HEADER & PROVENANCE BANNER                                     */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Données Locales QUICK Certifiées</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                <span>PostgreSQL Transact-Audit</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>Phase 4 Enterprise BI Suite</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Business Intelligence & Décisionnel VMS</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Pilotage consolidé du chiffre d'affaires, rotation d'inventaire, benchmarking équitable des 80 showrooms et détection précoce des ruptures.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsFormulaModalOpen(true)}
              className="bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-semibold gap-1.5"
            >
              <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
              <span>Dictionnaire des KPIs</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              disabled={refreshing}
              onClick={() => loadBiData(true)}
              className="bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-semibold gap-1.5"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-slate-400 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Actualisation...' : 'Rafraîchir Cache'}</span>
            </Button>

            <Button
              size="sm"
              onClick={handleExportCsv}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-1.5 shadow-md shadow-emerald-900/30"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>Rapport CSV</span>
            </Button>

            <Button
              size="sm"
              onClick={handleExportJson}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold gap-1.5 shadow-md shadow-indigo-900/30"
            >
              <Download className="h-4 w-4" />
              <span>Export JSON</span>
            </Button>
          </div>
        </div>

        {/* Global Multi-dimensional Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Period selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Période :
            </span>
            <div className="inline-flex rounded-xl bg-slate-800/90 p-1 border border-slate-700/80">
              {[
                { id: '7d', label: '7J' },
                { id: '30d', label: '30J' },
                { id: '90d', label: '90J' },
                { id: 'ytd', label: 'YTD' },
                { id: '12m', label: '12 Mois' },
                { id: 'all', label: 'Tout l\'Historique' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setPeriod(opt.id as any)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    period === opt.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Granularity selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              Granularité :
            </span>
            <div className="inline-flex rounded-xl bg-slate-800/90 p-1 border border-slate-700/80">
              {[
                { id: 'daily', label: 'Jour' },
                { id: 'weekly', label: 'Semaine' },
                { id: 'monthly', label: 'Mois' },
                { id: 'quarterly', label: 'Trimestre' },
                { id: 'yearly', label: 'Année' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setGranularity(opt.id as any)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    granularity === opt.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Region selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              Zone Géographique :
            </span>
            <div className="inline-flex rounded-xl bg-slate-800/90 p-1 border border-slate-700/80">
              {[
                { id: 'ALL', label: 'National (Tout)' },
                { id: 'CENTRE', label: 'Centre' },
                { id: 'EST', label: 'Est' },
                { id: 'OUEST', label: 'Ouest' },
                { id: 'SUD', label: 'Sud' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setRegion(opt.id as any)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                    region === opt.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. SIX EXECUTIVE KPI METRIC CARDS                                      */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Card 1: Chiffre d'Affaires Global */}
        <Card className="p-4 border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Chiffre d'Affaires</span>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-xl font-black text-slate-900 mt-2 truncate" title={overview ? formatPrice(overview.financials.totalSalesRevenue) : '-'}>
            {overview ? formatPrice(overview.financials.totalSalesRevenue) : '...'}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span>{overview ? `${overview.financials.totalSalesVolume} ventes` : '...'}</span>
            <span className="font-semibold text-emerald-600">Facturé</span>
          </div>
        </Card>

        {/* Card 2: Ticket Moyen */}
        <Card className="p-4 border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Ticket Moyen</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-xl font-black text-emerald-700 mt-2 truncate" title={overview ? formatPrice(overview.financials.averageTicketDzd) : '-'}>
            {overview ? formatPrice(overview.financials.averageTicketDzd) : '...'}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span>Par moto vendue</span>
            <span className="font-semibold text-slate-700">Panier moyen</span>
          </div>
        </Card>

        {/* Card 3: Taux de Conversion Demandes */}
        <Card className="p-4 border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Conversion Réseau</span>
            <CheckCircle2 className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-1 mt-2">
            <p className="text-2xl font-black text-purple-700">
              {overview ? `${overview.demand.conversionRatePercent}%` : '...'}
            </p>
            <span className="text-[10px] text-slate-400 font-semibold">cible 15-20%</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span>{overview ? `${overview.demand.fulfilledRequests}/${overview.demand.totalRequests} servies` : '...'}</span>
            <span className="font-semibold text-purple-600">Entonnoir</span>
          </div>
        </Card>

        {/* Card 4: Rotation & DSI */}
        <Card className="p-4 border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Rotation & DSI</span>
            <Clock className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-1.5 mt-2">
            <p className="text-xl font-black text-slate-900">
              {overview ? `${overview.inventory.inventoryTurnoverRatio}x` : '...'}
            </p>
            <span className="text-xs font-bold text-amber-600">
              ({overview ? `${overview.inventory.daysSalesOfInventoryDsi}j DSI` : '...'})
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span>Dispo : {overview?.inventory.availableStock || 0}</span>
            <span className="font-semibold text-amber-700">Jours de stock</span>
          </div>
        </Card>

        {/* Card 5: Capital Immobilisé Dormant */}
        <Card className="p-4 border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Capital Dormant</span>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </div>
          <p className="text-xl font-black text-red-600 mt-2 truncate" title={overview ? formatPrice(overview.financials.dormantCapitalTiedUpDzd) : '-'}>
            {overview ? formatPrice(overview.financials.dormantCapitalTiedUpDzd) : '...'}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
            <span>{overview ? `${overview.inventory.agingPyramid.dormantOver90d} motos (>90j)` : '...'}</span>
            <span className="font-bold text-red-600">{overview?.inventory.dormantSharePercent || 0}% stock</span>
          </div>
        </Card>

        {/* Card 6: Marge Potentielle Récupérable */}
        <Card className="p-4 border-slate-200/80 hover:shadow-md transition-shadow relative overflow-hidden group bg-gradient-to-br from-indigo-50/50 to-white">
          <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-100/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">Marge Déblocable</span>
            <Zap className="h-4 w-4 text-indigo-600" />
          </div>
          <p className="text-xl font-black text-indigo-800 mt-2 truncate" title={overview ? formatPrice(overview.financials.estimatedUnblockedMarginDzd) : '-'}>
            {overview ? formatPrice(overview.financials.estimatedUnblockedMarginDzd) : '...'}
          </p>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-indigo-100">
            <span className="text-indigo-600 font-semibold">Via Compte Global</span>
            <button
              onClick={onNavigateToCompteGlobal}
              className="text-[10px] font-bold text-indigo-700 hover:underline flex items-center gap-0.5"
            >
              Actionner <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </Card>
      </div>

      {/* ===================================================================== */}
      {/* 3. BI SUB-TABS NAVIGATION                                             */}
      {/* ===================================================================== */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveBiTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeBiTab === 'overview'
              ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>Vue Synthèse & Cycle Décisionnel V3</span>
        </button>

        <button
          onClick={() => setActiveBiTab('commercial')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeBiTab === 'commercial'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Performance Commerciale & Temporelle</span>
        </button>

        <button
          onClick={() => setActiveBiTab('inventory')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeBiTab === 'inventory'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Bike className="h-4 w-4" />
          <span>Rotation des Stocks & Pyramide des Âges</span>
        </button>

        <button
          onClick={() => setActiveBiTab('showrooms')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeBiTab === 'showrooms'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Building className="h-4 w-4" />
          <span>Benchmarking Équitable des 80 Showrooms</span>
        </button>

        <button
          onClick={() => setActiveBiTab('demand')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeBiTab === 'demand'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Intelligence Demande & Risques Rupture</span>
        </button>
      </div>

      {/* ===================================================================== */}
      {/* 4. TAB CONTENT 1 : VUE SYNTHÈSE & CYCLE DÉCISIONNEL V3                */}
      {/* ===================================================================== */}
      {activeBiTab === 'overview' && (
        <div className="space-y-6">
          <Card className="p-6 border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
              <div>
                <CardTitle className="text-base font-black flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-600" />
                  <span>Pipeline Stratégique Global : De l'Acquisition Client à la Clôture Commerciale</span>
                </CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visualisation temps-réel du cycle d'affaires intégré QUICK by VMS
                </p>
              </div>
              <Badge variant="default">Cycle V3 Intégré</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Étape 1 : Demande Client & Réservation */}
              <div
                onClick={onNavigateToRequests}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      1
                    </span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Demande Client</span>
                  </div>
                  <Users className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">{overview?.demand.totalRequests || 0}</span>
                    <span className="text-xs font-semibold text-slate-500">Total</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 text-[11px] text-slate-600">
                    <span className="inline-flex items-center gap-1.5 font-medium text-amber-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      {overview?.demand.pendingRequests || 0} en attente
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      {overview?.demand.availableNotifiedRequests || 0} notifiées
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between text-slate-600">
                  <span>Concrétisées :</span>
                  <span className="font-extrabold text-blue-600">{overview?.demand.fulfilledRequests || 0}</span>
                </div>
              </div>

              {/* Étape 2 : Audit Stock & Âge */}
              <div
                onClick={onNavigateToInventory}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      2
                    </span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Audit Inventaire</span>
                  </div>
                  <Bike className="h-4 w-4 text-amber-600 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">{overview?.inventory.totalStock || 0}</span>
                    <span className="text-xs font-semibold text-slate-500">Motos</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 text-[11px] text-slate-600">
                    <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {overview?.inventory.availableStock || 0} disponibles
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      {(overview?.inventory.totalStock || 0) - (overview?.inventory.availableStock || 0)} vendues
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between text-slate-600">
                  <span>Disponibilité :</span>
                  <span className="font-extrabold text-emerald-600">{overview?.inventory.networkAvailabilityRatePercent || 0}%</span>
                </div>
              </div>

              {/* Étape 3 : Compte Global & Arbitrage */}
              <div
                onClick={onNavigateToCompteGlobal}
                className="p-4 rounded-xl border border-red-200 bg-red-50/40 hover:bg-red-50/70 hover:border-red-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      3
                    </span>
                    <span className="text-xs font-bold text-red-900 uppercase tracking-wider">Compte Global</span>
                  </div>
                  <AlertTriangle className="h-4 w-4 text-red-600 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-red-600">{overview?.inventory.agingPyramid.dormantOver90d || 0}</span>
                    <span className="text-xs font-semibold text-red-500">Dormants</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 text-[11px] text-red-700">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      &gt;90 jours immobilisés
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-red-600/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      {overview?.inventory.agingPyramid.criticalOver130d || 0} critiques (&gt;130j)
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-red-200 text-xs flex items-center justify-between text-red-800">
                  <span>Part du stock :</span>
                  <span className="font-extrabold text-red-600">{overview?.inventory.dormantSharePercent || 0}%</span>
                </div>
              </div>

              {/* Étape 4 : Régulation Réseau & Transferts */}
              <div
                onClick={onNavigateToCompteGlobal}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      4
                    </span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Régulation Réseau</span>
                  </div>
                  <ArrowRightLeft className="h-4 w-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">{overview?.transfers.activeTransfers || 0}</span>
                    <span className="text-xs font-semibold text-slate-500">Actifs</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 text-[11px] text-slate-600">
                    <span className="inline-flex items-center gap-1.5 font-medium text-indigo-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      Inter-showrooms en cours
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      Transit sécurisé VMS
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between text-slate-600">
                  <span>Achevés :</span>
                  <span className="font-extrabold text-indigo-600">{overview?.transfers.completedTransfers || 0}</span>
                </div>
              </div>

              {/* Étape 5 : Vente & Facturation */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                      5
                    </span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Vente & Facturation</span>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-900">{overview?.financials.totalSalesVolume || 0}</span>
                    <span className="text-xs font-semibold text-slate-500">Ventes</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 text-[11px] text-slate-600">
                    <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      {overview?.demand.fulfilledRequests || 0} demandes concrétisées
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      Garantie VMS activée
                    </span>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between text-slate-600">
                  <span>CA Total :</span>
                  <span className="font-extrabold text-emerald-700 truncate max-w-[120px]" title={overview ? formatPrice(overview.financials.totalSalesRevenue) : '-'}>
                    {overview ? formatPrice(overview.financials.totalSalesRevenue) : '-'}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Dual Cards: Chronological Pulse & Provenance Certification */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Timeline Snapshot */}
            <Card className="lg:col-span-2 p-5 border-slate-200">
              <CardHeader className="p-0 pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-black flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                    <span>Courbe Chronologique des Ventes ({granularity})</span>
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Évolution du chiffre d'affaires et volume par tranche temporelle
                  </p>
                </div>
                <Badge variant="info">{trends?.points.length || 0} Périodes</Badge>
              </CardHeader>

              <div className="h-64 w-full">
                {trends?.points && trends.points.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trends.points} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                      <defs>
                        <linearGradient id="caGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#64748b' }} />
                      <YAxis
                        tick={{ fontSize: 10, fill: '#64748b' }}
                        tickFormatter={(v: number) => `${Math.round(v / 1000000)}M`}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data: any = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-800">
                                <p className="font-bold text-white text-sm">{data.period}</p>
                                <p className="text-emerald-400 font-extrabold text-sm">{formatPrice(data.salesRevenue)}</p>
                                <p className="text-slate-300 font-semibold">{data.salesVolume} motos vendues</p>
                                <p className="text-slate-400 text-[10px]">Ticket Moyen : {formatPrice(data.averageTicketDzd)}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="salesRevenue"
                        name="Chiffre d'Affaires"
                        stroke="#2563eb"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#caGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    Aucune donnée temporelle disponible pour cette sélection.
                  </div>
                )}
              </div>
            </Card>

            {/* Right Col: Data Provenance & Trust Certification */}
            <Card className="p-5 border-slate-200 flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                  <CardTitle className="text-sm font-black flex items-center gap-2 text-slate-900">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Traçabilité & Provenance</span>
                  </CardTitle>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Certifié
                  </span>
                </CardHeader>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Toutes les données présentées dans ce tableau de bord sont issues des tables transactionnelles réelles de production QUICK.
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">Base QUICK Locale</p>
                      <p className="text-[10px] text-slate-500">Ventes, Demandes, Motos, Showrooms</p>
                    </div>
                    <Badge variant="success">100% Réel</Badge>
                  </div>

                  <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-200/80 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-purple-900">Passerelle Odoo ERP</p>
                      <p className="text-[10px] text-purple-700">Audit & Sync bidirectionnelle</p>
                    </div>
                    <Badge variant="info">Phase 3</Badge>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800">Données Simulées / Sandbox</p>
                      <p className="text-[10px] text-slate-500">Exclues des rapports BI officiels</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">Exclus</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Dernier calcul : {overview?.generatedAt ? new Date(overview.generatedAt).toLocaleTimeString() : '-'}</span>
                <span className="font-mono text-[10px]">TTL: 300s</span>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 5. TAB CONTENT 2 : PERFORMANCE COMMERCIALE & TEMPORELLE               */}
      {/* ===================================================================== */}
      {activeBiTab === 'commercial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 1: Revenue & Volume Dual Axis AreaChart */}
            <Card className="lg:col-span-2 p-5 border-slate-200">
              <CardHeader className="p-0 pb-4 mb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-black flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span>Chiffre d'Affaires vs Volume de Ventes ({granularity})</span>
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Croisement entre valeur financière générée et unités physiques écoulées
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">{period.toUpperCase()}</Badge>
                </div>
              </CardHeader>

              <div className="h-80 w-full">
                {trends?.points && trends.points.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trends.points} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
                      <defs>
                        <linearGradient id="commCaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="commVolGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="period" tick={{ fontSize: 10, fill: '#64748b' }} />
                      <YAxis
                        yAxisId="ca"
                        tick={{ fontSize: 10, fill: '#3b82f6' }}
                        tickFormatter={(v: number) => `${Math.round(v / 1000000)}M`}
                      />
                      <YAxis
                        yAxisId="vol"
                        orientation="right"
                        tick={{ fontSize: 10, fill: '#10b981' }}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data: any = payload[0].payload;
                            return (
                              <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-800">
                                <p className="font-bold text-white text-sm">{data.period}</p>
                                <p className="text-blue-400 font-extrabold text-sm">CA : {formatPrice(data.salesRevenue)}</p>
                                <p className="text-emerald-400 font-bold">Volume : {data.salesVolume} motos</p>
                                <p className="text-slate-400 text-[10px]">Ticket Moyen : {formatPrice(data.averageTicketDzd)}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Area
                        yAxisId="ca"
                        type="monotone"
                        dataKey="salesRevenue"
                        name="Chiffre d'Affaires (DZD)"
                        stroke="#2563eb"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#commCaGrad)"
                      />
                      <Area
                        yAxisId="vol"
                        type="monotone"
                        dataKey="salesVolume"
                        name="Volume (Unités)"
                        stroke="#10b981"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#commVolGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    Données insuffisantes sur cet intervalle.
                  </div>
                )}
              </div>
            </Card>

            {/* Chart 2: Payment Method Distribution Donut */}
            <Card className="p-5 border-slate-200 flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 pb-4 mb-2 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-black flex items-center gap-2">
                      <PieIcon className="h-4 w-4 text-emerald-600" />
                      <span>Modes de Paiement</span>
                    </CardTitle>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Répartition du chiffre d'affaires
                    </p>
                  </div>
                </CardHeader>

                <div className="h-48 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="percentage"
                      >
                        {paymentChartData.map((entry, index) => (
                          <Cell key={`pay-cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: any) => `${val}%`}
                        contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '10px', fontSize: '11px', color: '#fff' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Payment methods list breakdown */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                {paymentChartData.map(pm => (
                  <div key={pm.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: pm.color }} />
                      <span className="text-slate-600 truncate max-w-[140px]">{pm.displayName}</span>
                    </div>
                    <span className="font-bold text-slate-900">{pm.percentage}%</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Revenue summary metrics banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-slate-50/70 border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Volume Total Vendu</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{overview?.financials.totalSalesVolume || 0} motos</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Sur la période sélectionnée</p>
            </Card>

            <Card className="p-4 bg-slate-50/70 border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Chiffre d'Affaires</span>
              <p className="text-2xl font-black text-blue-600 mt-1">
                {overview ? formatPrice(overview.financials.totalSalesRevenue) : '-'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Facturation réseau QUICK</p>
            </Card>

            <Card className="p-4 bg-slate-50/70 border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Panier Moyen</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {overview ? formatPrice(overview.financials.averageTicketDzd) : '-'}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Valeur par unité vendue</p>
            </Card>

            <Card className="p-4 bg-slate-50/70 border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Paiement Comptant (Cash)</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">
                {trends?.paymentSplit?.CASH || 0}%
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Part dominante du réseau</p>
            </Card>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 6. TAB CONTENT 3 : ROTATION DES STOCKS & PYRAMIDE DES ÂGES            */}
      {/* ===================================================================== */}
      {activeBiTab === 'inventory' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pyramid BarChart */}
            <Card className="lg:col-span-2 p-5 border-slate-200">
              <CardHeader className="p-0 pb-4 mb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-base font-black flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span>Pyramide des Âges du Stock Disponible ({overview?.inventory.availableStock || 0} motos)</span>
                  </CardTitle>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Décomposition de l'inventaire en 5 paliers de vieillissement
                  </p>
                </div>
                <Badge variant="warning">
                  {overview?.inventory.agingPyramid.dormantOver90d || 0} Dormantes (&gt;90j)
                </Badge>
              </CardHeader>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={agingPyramidData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis dataKey="tranche" type="category" tick={{ fontSize: 10, fill: '#334155' }} width={140} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data: any = payload[0].payload;
                          const totalDispo = overview?.inventory.availableStock || 365;
                          const pct = Math.round((data.motos / totalDispo) * 100);
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-800">
                              <p className="font-bold text-white text-sm">{data.tranche}</p>
                              <p className="text-amber-400 font-extrabold text-sm">{data.motos} motos ({pct}% du stock)</p>
                              <p className="text-slate-300 text-[11px]">{data.description}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="motos" name="Motos en Stock" radius={[0, 6, 6, 0]}>
                      {agingPyramidData.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Financial Impact & Dormant Recovery */}
            <Card className="p-5 border-slate-200 flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 pb-4 mb-3 border-b border-slate-100 flex items-center justify-between">
                  <CardTitle className="text-base font-black flex items-center gap-2 text-slate-900">
                    <DollarSign className="h-4 w-4 text-red-600" />
                    <span>Impact Financier Dormant</span>
                  </CardTitle>
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                    Priorité Compte Global
                  </span>
                </CardHeader>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Le stock immobilisé depuis plus de 90 jours représente un coût d'opportunité majeur pour le réseau VMS.
                </p>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-red-50/70 border border-red-200/80">
                    <span className="text-[10px] font-bold text-red-700 uppercase">Capital Total Immobilisé (&gt;90j)</span>
                    <p className="text-2xl font-black text-red-700 mt-1">
                      {overview ? formatPrice(overview.financials.dormantCapitalTiedUpDzd) : '-'}
                    </p>
                    <p className="text-[11px] text-red-600 mt-1">
                      {overview?.inventory.agingPyramid.dormantOver90d || 0} motos immobilisées
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Marge Brute Récupérable Estimée (8%)</span>
                    <p className="text-2xl font-black text-emerald-700 mt-1">
                      {overview ? formatPrice(overview.financials.estimatedUnblockedMarginDzd) : '-'}
                    </p>
                    <p className="text-[11px] text-emerald-600 mt-1">
                      Déblocable via redistribution réseau
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-slate-600">
                      <span>Jours de Vente de Stock (DSI) :</span>
                      <span className="font-bold text-slate-900">{overview?.inventory.daysSalesOfInventoryDsi || 0} jours</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Taux de Rotation Annuel :</span>
                      <span className="font-bold text-slate-900">{overview?.inventory.inventoryTurnoverRatio || 0}x</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <Button
                  onClick={onNavigateToCompteGlobal}
                  className="w-full bg-red-600 hover:bg-red-500 text-white text-xs font-bold gap-2 shadow-md shadow-red-900/20"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Lancer l'Algorithme Compte Global (Phase 2)</span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 7. TAB CONTENT 4 : BENCHMARKING ÉQUITABLE DES 80 SHOWROOMS            */}
      {/* ===================================================================== */}
      {activeBiTab === 'showrooms' && (
        <div className="space-y-6">
          {/* Fair Normalization Explanation Banner */}
          <Card className="p-5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white border-indigo-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-bold border border-indigo-400/30">
                  <ShieldCheck className="h-3.5 w-3.5 text-indigo-300" />
                  <span>Principe d'Équité Analytique VMS</span>
                </div>
                <h3 className="text-base font-bold text-white">
                  Score d'Efficience Normalisé (0 - 100) : Une Comparaison Juste et Pondérée
                </h3>
                <p className="text-xs text-indigo-200 max-w-4xl leading-relaxed">
                  Contrairement au chiffre d'affaires brut qui favorise arbitrairement les grandes métropoles, le score VMS normalise la performance en croisant : 
                  <strong className="text-white"> Vitesse de rotation (40%)</strong>, 
                  <strong className="text-white"> Taux d'absorption de la demande locale (30%)</strong> et 
                  <strong className="text-white"> Qualité sanitaire du stock (30%)</strong>.
                </p>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFormulaModalOpen(true)}
                className="bg-indigo-800/80 border-indigo-600 text-indigo-100 hover:bg-indigo-700 text-xs font-bold shrink-0 gap-1"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Voir la Formule Mathématique</span>
              </Button>
            </div>
          </Card>

          {/* Showroom Table Controls */}
          <Card className="p-5 border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-64">
                  <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={showroomSearch}
                    onChange={e => setShowroomSearch(e.target.value)}
                    placeholder="Rechercher showroom, ville..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <span className="font-semibold text-slate-500">Catégorie :</span>
                  <select
                    value={showroomTierFilter}
                    onChange={e => setShowroomTierFilter(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALL">Toutes les Catégories</option>
                    <option value="Top Performer">Top Performers</option>
                    <option value="Équilibré">Équilibrés</option>
                    <option value="Rupture Critique">Rupture Critique</option>
                    <option value="Sur-Stock Dormant">Sur-Stock Dormant</option>
                  </select>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-semibold">
                Affichage de {filteredShowrooms.length} sur {rankings?.totalShowrooms || 80} showrooms
              </div>
            </div>

            {/* Benchmarking Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3 font-bold">Rang</th>
                    <th className="py-3 px-3 font-bold">Showroom & Ville</th>
                    <th className="py-3 px-3 font-bold">Région</th>
                    <th className="py-3 px-3 font-bold text-center">Score Efficience</th>
                    <th className="py-3 px-3 font-bold text-right">Ventes / CA</th>
                    <th className="py-3 px-3 font-bold text-center">Stock Dispo</th>
                    <th className="py-3 px-3 font-bold text-center">Dormant (&gt;90j)</th>
                    <th className="py-3 px-3 font-bold text-center">Absorption</th>
                    <th className="py-3 px-3 font-bold">Statut BI</th>
                    <th className="py-3 px-3 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredShowrooms.slice(0, 25).map((shw, idx) => {
                    const scoreColor =
                      shw.normalizedScore >= 70
                        ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                        : shw.normalizedScore >= 50
                        ? 'text-blue-600 bg-blue-50 border-blue-200'
                        : shw.normalizedScore >= 35
                        ? 'text-amber-600 bg-amber-50 border-amber-200'
                        : 'text-red-600 bg-red-50 border-red-200';

                    const tierBadge =
                      shw.tier === 'Top Performer' ? (
                        <Badge variant="success">Top Performer</Badge>
                      ) : shw.tier === 'Équilibré' ? (
                        <Badge variant="info">Équilibré</Badge>
                      ) : shw.tier === 'Rupture Critique' ? (
                        <Badge variant="warning">Rupture Critique</Badge>
                      ) : (
                        <Badge variant="danger">Sur-Stock Dormant</Badge>
                      );

                    return (
                      <tr key={shw.showroomId} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3 font-black text-slate-700">#{shw.rank || idx + 1}</td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-900">{shw.showroomName}</p>
                          <p className="text-[11px] text-slate-400">{shw.city} (Wilaya {shw.wilayaCode})</p>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-600">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-bold">
                            {shw.region || 'NATIONAL'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black border ${scoreColor}`}>
                            {shw.normalizedScore} / 100
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <p className="font-bold text-slate-900">{shw.salesVolume} ventes</p>
                          <p className="text-[10px] text-emerald-600 font-semibold">{formatPrice(shw.salesRevenue)}</p>
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-800">
                          {shw.availableStock}
                        </td>
                        <td className="py-3 px-3 text-center">
                          {shw.dormantStock > 0 ? (
                            <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                              {shw.dormantStock}
                            </span>
                          ) : (
                            <span className="text-slate-400">0</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-700">
                          {shw.absorptionRatio}
                        </td>
                        <td className="py-3 px-3">{tierBadge}</td>
                        <td className="py-3 px-3 text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedShowroom(shw)}
                            className="h-7 px-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Inspecter
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredShowrooms.length > 25 && (
                <div className="py-3 text-center text-xs text-slate-400 border-t border-slate-100">
                  Affichage des 25 premiers showrooms. Utilisez la recherche pour filtrer un showroom spécifique.
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 8. TAB CONTENT 5 : INTELLIGENCE DEMANDE & RISQUES RUPTURE             */}
      {/* ===================================================================== */}
      {activeBiTab === 'demand' && (
        <div className="space-y-6">
          {/* Conversion Funnel 4-Stage Breakdown */}
          <Card className="p-5 border-slate-200">
            <CardHeader className="p-0 pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-black flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>Entonnoir de Traitement des Demandes Clients</span>
                </CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Répartition des flux clients dans le circuit de distribution
                </p>
              </div>
              <Badge variant="info">
                Modèle le plus demandé : {demand?.mostPopularModel || 'N/A'}
              </Badge>
            </CardHeader>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Étape 1 : Collectées
                </span>
                <p className="font-extrabold text-slate-900 text-sm">Demandes Exprimées</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{demand?.funnel.stage1_collected || 0}</p>
                <span className="text-[10px] text-slate-400">Enregistrées sur QUICK</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Étape 2 : Notifiées
                </span>
                <p className="font-extrabold text-slate-900 text-sm">Disponibles Showroom</p>
                <p className="text-2xl font-black text-blue-600 mt-1">{demand?.funnel.stage2_availableNotified || 0}</p>
                <span className="text-[10px] text-slate-400">Clients prévenus</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Étape 3 : Concrétisées
                </span>
                <p className="font-extrabold text-slate-900 text-sm">Ventes Finalisées</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">{demand?.funnel.stage3_salesFulfilled || 0}</p>
                <span className="text-[10px] text-slate-400">Actes d'achat conclus</span>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  Étape 4 : En Attente
                </span>
                <p className="font-extrabold text-slate-900 text-sm">Alerte Stockout</p>
                <p className="text-2xl font-black text-amber-600 mt-1">{demand?.funnel.stage4_pendingAwaitingStock || 0}</p>
                <span className="text-[10px] text-slate-400">En attente de réappro</span>
              </div>
            </div>
          </Card>

          {/* Model Demand & Tension Index Table */}
          <Card className="p-5 border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <CardTitle className="text-base font-black flex items-center gap-2">
                  <Bike className="h-4 w-4 text-blue-600" />
                  <span>Indice de Tension des Modèles (Demande vs Stock Disponible)</span>
                </CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Identification précoce des modèles en risque de rupture immédiate
                </p>
              </div>

              <div className="relative w-64">
                <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={modelSearch}
                  onChange={e => setModelSearch(e.target.value)}
                  placeholder="Rechercher modèle, marque..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3 font-bold">Modèle VMS</th>
                    <th className="py-3 px-3 font-bold">Catégorie</th>
                    <th className="py-3 px-3 font-bold text-right">Prix Unitaire</th>
                    <th className="py-3 px-3 font-bold text-center">Demandes Totales</th>
                    <th className="py-3 px-3 font-bold text-center">Stock Dispo</th>
                    <th className="py-3 px-3 font-bold text-center">Indice Tension</th>
                    <th className="py-3 px-3 font-bold">Diagnostic Rupture</th>
                    <th className="py-3 px-3 font-bold text-right">CA Réalisé</th>
                    <th className="py-3 px-3 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredModels.map(m => {
                    const tensionBadge =
                      m.tensionIndex >= 1.5 ? (
                        <Badge variant="danger">Rupture Critique</Badge>
                      ) : m.tensionIndex >= 1.0 ? (
                        <Badge variant="warning">Forte Tension</Badge>
                      ) : m.tensionIndex >= 0.5 ? (
                        <Badge variant="info">Équilibré</Badge>
                      ) : (
                        <Badge variant="default">Sur-Stock</Badge>
                      );

                    return (
                      <tr key={m.modelId} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-3">
                          <p className="font-bold text-slate-900">{m.name}</p>
                          <p className="text-[10px] text-slate-400">{m.brand}</p>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-600">{m.category}</td>
                        <td className="py-3 px-3 text-right font-bold text-slate-800">
                          {formatPrice(m.priceDzd)}
                        </td>
                        <td className="py-3 px-3 text-center font-black text-purple-700">
                          {m.totalRequests}
                        </td>
                        <td className="py-3 px-3 text-center font-black text-slate-800">
                          {m.availableStock}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-extrabold text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-800">
                            {m.tensionIndex}x
                          </span>
                        </td>
                        <td className="py-3 px-3">{tensionBadge}</td>
                        <td className="py-3 px-3 text-right font-black text-emerald-700">
                          {formatPrice(m.salesRevenue)}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedModel(m)}
                            className="h-7 px-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Détails
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 9. DRILL-DOWN MODAL : SHOWROOM INSPECTION                            */}
      {/* ===================================================================== */}
      {selectedShowroom && (
        <Modal
          isOpen={!!selectedShowroom}
          onClose={() => setSelectedShowroom(null)}
          title={`Fiche d'Évaluation BI : ${selectedShowroom.showroomName}`}
          subtitle={`${selectedShowroom.city} • Wilaya ${selectedShowroom.wilayaCode} • Région ${selectedShowroom.region || 'NATIONAL'}`}
          maxWidth="2xl"
        >
          <div className="space-y-5 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Score d'Efficience Normalisé</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">
                  {selectedShowroom.normalizedScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Rang national : <strong className="text-white">#{selectedShowroom.rank || 1}</strong> sur {rankings?.totalShowrooms || 80}
                </p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Classification</span>
                <div>
                  <Badge variant={selectedShowroom.tier === 'Top Performer' ? 'success' : selectedShowroom.tier === 'Équilibré' ? 'info' : 'danger'}>
                    {selectedShowroom.tier}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Ventes Réalisées</span>
                <p className="text-lg font-black text-slate-900 mt-1">{selectedShowroom.salesVolume} motos</p>
                <p className="text-[10px] text-emerald-600 font-semibold">{formatPrice(selectedShowroom.salesRevenue)}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Stock Disponible</span>
                <p className="text-lg font-black text-blue-600 mt-1">{selectedShowroom.availableStock} motos</p>
                <p className="text-[10px] text-slate-400">En salle d'exposition</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Stock Dormant (&gt;90j)</span>
                <p className="text-lg font-black text-red-600 mt-1">{selectedShowroom.dormantStock} motos</p>
                <p className="text-[10px] text-red-500">
                  {selectedShowroom.availableStock > 0
                    ? `${Math.round((selectedShowroom.dormantStock / selectedShowroom.availableStock) * 100)}% du stock`
                    : '0%'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Taux d'Absorption</span>
                <p className="text-lg font-black text-purple-600 mt-1">{selectedShowroom.absorptionRatio}</p>
                <p className="text-[10px] text-slate-400">Demandes / Stock</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                <span>Recommandations d'Arbitrage Compte Global :</span>
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                {selectedShowroom.dormantStock > 2 ? (
                  <span className="text-red-700">
                    Ce showroom présente <strong>{selectedShowroom.dormantStock} motos dormantes</strong> éligibles à un transfert prioritaire vers les showrooms à forte absorption de la même région.
                  </span>
                ) : selectedShowroom.availableStock <= 2 ? (
                  <span className="text-amber-700">
                    Niveau de stock bas critique ({selectedShowroom.availableStock} motos). Risque élevé de rupture sur les demandes locales entrantes.
                  </span>
                ) : (
                  <span className="text-emerald-700">
                    Équilibre opérationnel sain. Le niveau de stock correspond à la vélocité commerciale locale.
                  </span>
                )}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button size="sm" variant="outline" onClick={() => setSelectedShowroom(null)}>
                Fermer
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  setSelectedShowroom(null);
                  if (onNavigateToCompteGlobal) onNavigateToCompteGlobal();
                }}
                className="bg-red-600 hover:bg-red-500 text-white font-bold"
              >
                Gérer les Transferts
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* 10. DRILL-DOWN MODAL : MODEL DETAIL                                   */}
      {/* ===================================================================== */}
      {selectedModel && (
        <Modal
          isOpen={!!selectedModel}
          onClose={() => setSelectedModel(null)}
          title={`Diagnostic Modèle : ${selectedModel.name}`}
          subtitle={`${selectedModel.brand} • Catégorie : ${selectedModel.category}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Prix Public TTC</span>
                <p className="text-lg font-black text-slate-900 mt-1">{formatPrice(selectedModel.priceDzd)}</p>
              </div>

              <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
                <span className="text-[10px] font-bold text-purple-700 uppercase">Demandes Enregistrées</span>
                <p className="text-lg font-black text-purple-700 mt-1">{selectedModel.totalRequests} clients</p>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                <span className="text-[10px] font-bold text-blue-700 uppercase">Stock Réseau Disponible</span>
                <p className="text-lg font-black text-blue-700 mt-1">{selectedModel.availableStock} unités</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Chiffre d'Affaires Réalisé</span>
                <p className="text-lg font-black text-emerald-700 mt-1 truncate" title={formatPrice(selectedModel.salesRevenue)}>
                  {formatPrice(selectedModel.salesRevenue)}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Indice de Tension & Rupture</span>
              <p className="font-extrabold text-sm text-slate-900">
                Ratio Demande / Stock : <span className="text-purple-600">{selectedModel.tensionIndex}x</span>
              </p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {selectedModel.tensionIndex >= 1.5 ? (
                  'La demande dépasse l\'inventaire immédiat de plus de 50%. Réapprovisionnement urgent ou déclenchement de précommandes recommandé.'
                ) : selectedModel.tensionIndex >= 1.0 ? (
                  'Tension équilibrée avec le stock physique. Les nouvelles commandes doivent être approvisionnées.'
                ) : (
                  'Le stock actuel couvre largement la demande exprimée. Aucune tension détectée.'
                )}
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button size="sm" variant="outline" onClick={() => setSelectedModel(null)}>
                Fermer
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* ===================================================================== */}
      {/* 11. KPI DICTIONARY MODAL                                              */}
      {/* ===================================================================== */}
      {isFormulaModalOpen && (
        <Modal
          isOpen={isFormulaModalOpen}
          onClose={() => setIsFormulaModalOpen(false)}
          title="Dictionnaire des KPIs & Formules Analytiques QUICK BI"
          subtitle="Documentation méthodologique des indicateurs de gestion VMS Industrie"
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs max-h-[70vh] overflow-y-auto pr-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-900 text-sm">1. Taux de Conversion Réseau (%)</p>
              <p className="font-mono text-purple-700 text-[11px]">
                Formule : (Demandes Concrétisées / Total Demandes Exprimées) × 100
              </p>
              <p className="text-slate-600">
                Mesure l'efficacité du réseau à transformer l'intérêt client en acte de vente effectif avec facturation. Cible constructeur : 15% à 20%.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-900 text-sm">2. Rotation des Stocks (Inventory Turnover Ratio)</p>
              <p className="font-mono text-amber-700 text-[11px]">
                Formule : Volume des Ventes Réalisées / Stock Disponible Moyen
              </p>
              <p className="text-slate-600">
                Indicateur de vélocité du stock. Un ratio élevé indique une excellente fluidité des modèles, évitant l'immobilisation financière.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-900 text-sm">3. Jours de Vente d'Inventaire (DSI - Days Sales of Inventory)</p>
              <p className="font-mono text-blue-700 text-[11px]">
                Formule : (Stock Disponible Actuel / Ventes Annuelles Normalisées) × 365
              </p>
              <p className="text-slate-600">
                Nombre de jours nécessaires pour écouler l'intégralité du stock disponible au rythme actuel des ventes.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-900 text-sm">4. Capital Immobilisé Dormant (&gt;90 jours)</p>
              <p className="font-mono text-red-700 text-[11px]">
                Formule : Somme(Prix Catalogue TTC des Motos avec arrival_date &gt; 90 jours)
              </p>
              <p className="text-slate-600">
                Montant total des capitaux gelés dans des unités invendues. Sert de base de calcul pour l'optimiseur de redistribution Compte Global.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-900 text-sm">5. Score d'Efficience Normalisé des Showrooms (0 - 100)</p>
              <p className="font-mono text-indigo-700 text-[11px]">
                Formule : (Score Vitesse × 40%) + (Score Absorption × 30%) + (Score Santé Stock × 30%)
              </p>
              <p className="text-slate-600">
                Garantit une comparaison équitable entre les showrooms régionaux et les concessions des grandes wilayas, sans favoriser arbitrairement la taille du point de vente.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-900 text-sm">6. Indice de Tension Modèle</p>
              <p className="font-mono text-purple-700 text-[11px]">
                Formule : Total Demandes pour le Modèle / Stock Réseau Immédiatement Disponible
              </p>
              <p className="text-slate-600">
                Un indice supérieur à 1.0 indique une demande supérieure au stock disponible (risque de rupture imminente).
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button size="sm" onClick={() => setIsFormulaModalOpen(false)}>
                Fermer le Dictionnaire
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
