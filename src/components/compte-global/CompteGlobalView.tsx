import React, { useState, useEffect } from 'react';
import {
  Layers,
  Sparkles,
  AlertTriangle,
  ArrowRightLeft,
  Truck,
  CheckCircle2,
  Clock,
  Building,
  Filter,
  History,
  Info,
  ChevronRight,
  ShieldCheck,
  Bike,
  Sliders,
  DollarSign,
  TrendingUp,
  MapPin,
  Gauge,
  PackageX,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldAlert,
  Zap
} from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import {
  Motorcycle,
  Transfer,
  Showroom,
  TransferStatus,
  TransferOpportunity,
  StockoutRisk,
  DormantInventorySummary
} from '../../types';
import { CreateTransferModal } from './CreateTransferModal';
import { AlgorithmConfigModal } from './AlgorithmConfigModal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatDate, formatDateTime, formatPrice } from '../../lib/utils';
import { useToast } from '../ui/Toast';

export const CompteGlobalView: React.FC = () => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();

  // Data states
  const [agingMotos, setAgingMotos] = useState<Motorcycle[]>([]);
  const [opportunities, setOpportunities] = useState<TransferOpportunity[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [dormantSummary, setDormantSummary] = useState<DormantInventorySummary | null>(null);
  const [stockoutRisks, setStockoutRisks] = useState<StockoutRisk[]>([]);
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);

  // Filter states
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'Haute' | 'Moyenne' | 'Standard'>('all');
  const [modelFilter, setModelFilter] = useState<string>('all');
  const [targetShowroomFilter, setTargetShowroomFilter] = useState<string>('all');
  const [expandedScores, setExpandedScores] = useState<Record<string, boolean>>({});
  const [showStockoutRisks, setShowStockoutRisks] = useState<boolean>(true);

  // Modals
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<any>(null);
  const [selectedTransferForHistory, setSelectedTransferForHistory] = useState<Transfer | null>(null);

  const refreshData = () => {
    setAgingMotos(dbStore.getAgingMotorcycles(90));
    setOpportunities(dbStore.getTransferOpportunities());
    setTransfers(dbStore.getTransfers());
    setDormantSummary(dbStore.getDormantInventorySummary());
    setStockoutRisks(dbStore.getStockoutRisks());
    setShowrooms(dbStore.getShowrooms());
  };

  useEffect(() => {
    refreshData();
    return dbStore.subscribe(refreshData);
  }, []);

  const handleOpenTransferForOpportunity = (opp: TransferOpportunity) => {
    setSelectedOpp(opp);
    setIsTransferModalOpen(true);
  };

  const toggleScoreExpand = (vin: string) => {
    setExpandedScores(prev => ({
      ...prev,
      [vin]: !prev[vin]
    }));
  };

  const handleUpdateStatus = (transferId: string, newStatus: TransferStatus) => {
    try {
      dbStore.updateTransferStatus(
        transferId,
        newStatus,
        currentUser?.id || 'admin',
        `Mise à jour Compte Global vers ${newStatus}`
      );
      toast.success('Statut du transfert mis à jour', `Nouveau statut: ${newStatus}`);
      refreshData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  // Helper for workflow progress steps
  const getProgressStep = (status: TransferStatus): number => {
    switch (status) {
      case 'pending': return 1;
      case 'approved': return 2;
      case 'in_preparation': return 2;
      case 'in_transit': return 3;
      case 'received': return 4;
      default: return 0;
    }
  };

  // Filtered opportunities
  const filteredOpportunities = opportunities.filter(opp => {
    if (priorityFilter !== 'all' && opp.priority !== priorityFilter) return false;
    if (modelFilter !== 'all' && opp.model.id !== modelFilter) return false;
    if (targetShowroomFilter !== 'all' && opp.destinationShowroom?.id !== targetShowroomFilter) return false;
    return true;
  });

  const highPriorityCount = opportunities.filter(o => o.priority === 'Haute').length;
  const mediumPriorityCount = opportunities.filter(o => o.priority === 'Moyenne').length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <Sparkles className="h-4 w-4" />
              <span>Moteur Décisionnel Intelligent & Transparent V2.0</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              COMPTE GLOBAL VMS
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Rééquilibrage algorithmique national des stocks par scoring multicritère transparent (0–100). Détection des stocks dormants (&gt;90 jours), anticipation des ruptures locales et aide à la décision pour les transferts inter-showrooms sous validation humaine stricte.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsConfigModalOpen(true)}
              className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 font-semibold gap-2 text-xs"
            >
              <Sliders className="h-4 w-4 text-blue-400" />
              <span>Paramétrage Algorithme</span>
            </Button>

            <Button
              onClick={() => {
                setSelectedOpp(null);
                setIsTransferModalOpen(true);
              }}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold gap-2 text-xs shadow-lg shadow-blue-600/30"
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span>Nouveau Transfert</span>
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards — Executive Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-amber-500 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Capital Stock Dormant
            </span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {formatPrice(dormantSummary?.totalCapitalTiedUpDzd || 0)}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {dormantSummary?.totalDormantUnits || 0} motos &gt;90j ({dormantSummary?.highRiskUnits || 0} à risque critique &gt;130j)
          </p>
        </Card>

        <Card className="p-5 border-l-4 border-l-blue-600 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Recommandations Actives
            </span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {opportunities.length}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            <span className="font-bold text-emerald-600">{highPriorityCount} haute priorité</span> • {mediumPriorityCount} moyenne
          </p>
        </Card>

        <Card className="p-5 border-l-4 border-l-red-500 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Risques Rupture Cibles
            </span>
            <div className="p-2 rounded-xl bg-red-50 text-red-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {stockoutRisks.length} Showrooms
          </div>
          <p className="mt-1 text-[11px] text-red-600 font-semibold">
            Demandes clients bloquées par stock local = 0
          </p>
        </Card>

        <Card className="p-5 border-l-4 border-l-emerald-500 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Transferts en Cours
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Truck className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900">
            {transfers.filter(t => t.status === 'in_transit' || t.status === 'approved').length}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {transfers.filter(t => t.status === 'received').length} achevé(s) avec succès
          </p>
        </Card>
      </div>

      {/* Stockout Risks Alert Banner */}
      {stockoutRisks.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50/70 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="h-5 w-5 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-950 text-sm">
                  {stockoutRisks.length} Showroom(s) en Risque Critique de Rupture Immédiate
                </h3>
                <p className="text-[11px] text-red-800">
                  Clients en attente dans la wilaya alors que le showroom dispose de 0 unité de ce modèle en stock physique.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowStockoutRisks(!showStockoutRisks)}
              className="text-xs font-bold text-red-700 hover:text-red-900 flex items-center gap-1"
            >
              <span>{showStockoutRisks ? 'Masquer' : 'Afficher le détail'}</span>
              {showStockoutRisks ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>

          {showStockoutRisks && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {stockoutRisks.slice(0, 6).map((risk, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white p-3 border border-red-200 shadow-sm flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <strong className="text-slate-900 block font-bold">{risk.showroomName}</strong>
                    <span className="text-[11px] text-slate-500">{risk.city} ({risk.wilayaCode})</span>
                    <div className="text-[11px] font-semibold text-blue-700">{risk.modelName}</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-extrabold text-[11px] inline-block">
                      {risk.pendingDemand} en attente
                    </span>
                    <button
                      onClick={() => {
                        setTargetShowroomFilter(risk.showroomId);
                        setModelFilter(risk.modelId);
                      }}
                      className="text-[10px] text-blue-600 hover:underline block mt-1 font-semibold"
                    >
                      Voir solutions →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Section: Intelligent Showroom Matching Opportunities */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recommandations de Réallocation Algorithmique
              </h2>
              <p className="text-xs text-slate-500">
                Classement par Score Multicritère (0–100) • Validation humaine obligatoire
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Priority Pills */}
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => setPriorityFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors ${
                  priorityFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Toutes ({opportunities.length})
              </button>
              <button
                onClick={() => setPriorityFilter('Haute')}
                className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors ${
                  priorityFilter === 'Haute' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Haute ({highPriorityCount})
              </button>
              <button
                onClick={() => setPriorityFilter('Moyenne')}
                className={`px-2.5 py-1 rounded-lg font-semibold text-xs transition-colors ${
                  priorityFilter === 'Moyenne' ? 'bg-amber-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Moyenne ({mediumPriorityCount})
              </button>
            </div>

            {/* Target Showroom Filter */}
            {targetShowroomFilter !== 'all' && (
              <button
                onClick={() => {
                  setTargetShowroomFilter('all');
                  setModelFilter('all');
                }}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-semibold hover:bg-blue-200"
              >
                Réinitialiser filtre showroom ✕
              </button>
            )}
          </div>
        </div>

        {/* Opportunities List */}
        {filteredOpportunities.length === 0 ? (
          <Card className="p-8 text-center text-xs text-slate-500">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-800 text-sm">Aucune opportunité ne correspond aux filtres.</p>
            <p className="mt-0.5">Le stock réseau est équilibré pour ces critères ou les filtres sont trop restrictifs.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredOpportunities.map((opp, idx) => {
              const isScoresOpen = !!expandedScores[opp.motorcycle.vin];
              const scoreColor =
                opp.score >= 75
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-300'
                  : opp.score >= 50
                  ? 'text-amber-700 bg-amber-50 border-amber-300'
                  : 'text-slate-700 bg-slate-50 border-slate-300';

              const barColor =
                opp.score >= 75
                  ? 'bg-emerald-500'
                  : opp.score >= 50
                  ? 'bg-amber-500'
                  : 'bg-slate-400';

              return (
                <Card
                  key={idx}
                  className={`border-t-4 hover:shadow-lg transition-all duration-200 flex flex-col justify-between ${
                    opp.priority === 'Haute'
                      ? 'border-t-emerald-500'
                      : opp.priority === 'Moyenne'
                      ? 'border-t-amber-500'
                      : 'border-t-slate-400'
                  }`}
                >
                  <CardContent className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top Row: Model info and Score */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={opp.model.image_url}
                            alt={opp.model.name}
                            className="h-12 w-12 rounded-xl object-cover bg-slate-100 flex-shrink-0 border border-slate-200"
                          />
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm leading-tight">{opp.model.name}</h4>
                            <p className="text-[11px] font-mono text-slate-500 mt-0.5">VIN: {opp.motorcycle.vin}</p>
                            <span className="text-[10px] text-slate-400">{formatPrice(opp.model.price_dzd)}</span>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className={`px-2.5 py-1 rounded-xl border font-black text-xs inline-flex items-center gap-1 ${scoreColor}`}>
                            <Zap className="h-3 w-3" />
                            <span>{opp.score}/100</span>
                          </div>
                          <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mt-1">
                            Priorité {opp.priority}
                          </span>
                        </div>
                      </div>

                      {/* Score Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                            style={{ width: `${Math.min(100, opp.score)}%` }}
                          />
                        </div>
                      </div>

                      {/* Route Block */}
                      <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Source (Dormant)</span>
                            <strong className="text-slate-900 font-bold block">{opp.sourceShowroom.city}</strong>
                            <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-semibold inline-block">
                              {opp.daysInStock}j en stock
                            </span>
                          </div>

                          <div className="flex flex-col items-center px-2">
                            <ArrowRight className="h-4 w-4 text-blue-600" />
                            <span className="text-[9px] font-mono text-slate-500 mt-0.5">
                              {opp.distanceKm} km
                            </span>
                          </div>

                          <div className="space-y-0.5 text-right">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cible (Demande)</span>
                            <strong className="text-blue-700 font-bold block">{opp.destinationShowroom?.city || 'Showroom Cible'}</strong>
                            <span className="text-[10px] text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-semibold inline-block">
                              {opp.subScores.demandScore > 0 ? `${Math.round(opp.subScores.demandScore / 25)} client(s)` : '0 stock'}
                            </span>
                          </div>
                        </div>

                        {/* Logistics & Cost info */}
                        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
                          <span className="flex items-center gap-1">
                            <Truck className="h-3.5 w-3.5 text-slate-400" />
                            <span>Coût transport estimé :</span>
                          </span>
                          <strong className="font-mono text-slate-900 font-bold">
                            {formatPrice(opp.logisticsCostDzd)}
                          </strong>
                        </div>

                        {/* Rationale explanation */}
                        <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/80 leading-relaxed">
                          💡 {opp.reason}
                        </div>

                        {opp.estimatedDaysToSell && (
                          <div className="flex items-center justify-between text-[10px] text-emerald-700 font-semibold px-1">
                            <span>Vente locale anticipée :</span>
                            <span>~{opp.estimatedDaysToSell} jours après réception</span>
                          </div>
                        )}
                      </div>

                      {/* Sub-scores details expandable */}
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => toggleScoreExpand(opp.motorcycle.vin)}
                          className="w-full text-[11px] text-slate-500 hover:text-slate-800 flex items-center justify-between p-1"
                        >
                          <span>Décomposition transparente des sous-scores</span>
                          {isScoresOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>

                        {isScoresOpen && (
                          <div className="mt-2 p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Âge du stock (25%) :</span>
                              <strong className="font-mono text-slate-900">{opp.subScores.stockAgeScore}/100</strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Demande en attente (25%) :</span>
                              <strong className="font-mono text-slate-900">{opp.subScores.demandScore}/100</strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Rupture showroom cible (20%) :</span>
                              <strong className="font-mono text-slate-900">{opp.subScores.stockoutScore}/100</strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Vélocité commerciale (15%) :</span>
                              <strong className="font-mono text-slate-900">{opp.subScores.velocityScore}/100</strong>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600">Proximité logistique (15%) :</span>
                              <strong className="font-mono text-slate-900">{opp.subScores.logisticsScore}/100</strong>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button: Human Approval Required */}
                    <div className="pt-3">
                      <Button
                        size="sm"
                        onClick={() => handleOpenTransferForOpportunity(opp)}
                        className="w-full text-xs font-bold gap-1.5 bg-blue-600 hover:bg-blue-500 shadow-sm"
                      >
                        <span>Initier le Transfert Recommandé</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <span className="block text-center text-[10px] text-slate-400 mt-1.5">
                        Validation humaine requise avant expédition
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 5.1: Stock Aging Detection (>90 Days) */}
      <Card className="overflow-hidden">
        <CardHeader className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div>
              <CardTitle>Motos en Stock Dormant (&gt; 90 Jours dans le Réseau)</CardTitle>
              <p className="text-xs text-slate-500">Calcul automatique d'ancienneté d'après la date d'arrivée physique showroom</p>
            </div>
          </div>
          <Badge variant="aging">{agingMotos.length} unité(s) &gt;90 jours</Badge>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Modèle</th>
                <th className="px-5 py-3">Numéro Châssis (VIN)</th>
                <th className="px-5 py-3">Showroom Actuel</th>
                <th className="px-5 py-3">Arrivée Showroom</th>
                <th className="px-5 py-3">Âge en Stock</th>
                <th className="px-5 py-3">Valeur Immobilisée</th>
                <th className="px-5 py-3">Statut Éligibilité</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agingMotos.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-slate-400">
                    Aucun stock dormant de plus de 90 jours dans le réseau VMS.
                  </td>
                </tr>
              ) : (
                agingMotos.map(moto => (
                  <tr key={moto.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-900">
                      {moto.model?.name}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-700">
                      {moto.vin}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-semibold text-slate-800">{moto.showroom?.name}</span>
                      <span className="text-[10px] text-slate-400 block">{moto.showroom?.city}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {formatDate(moto.arrival_date)}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-900 font-extrabold text-xs">
                        {moto.days_in_stock} jours
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono font-semibold text-slate-800">
                      {formatPrice(moto.model?.price_dzd || 0)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="success">Éligible Compte Global</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedOpp({
                            model: moto.model,
                            motorcycle: moto,
                            sourceShowroom: moto.showroom,
                            daysInStock: moto.days_in_stock,
                            reason: `Transfert de stock dormant (${moto.days_in_stock} jours à ${moto.showroom?.city})`
                          });
                          setIsTransferModalOpen(true);
                        }}
                        className="text-xs"
                      >
                        Transférer
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Section 5.3: Transfer Management Workflow & Board */}
      <Card className="overflow-hidden">
        <CardHeader className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-600" />
            <div>
              <CardTitle>Suivi & Traçabilité des Transferts Inter-Showrooms</CardTitle>
              <p className="text-xs text-slate-500">Cycle de vie complet : Demande → Approbation → Expédition → Réception</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {transfers.length} transfert(s) au total
          </span>
        </CardHeader>

        <div className="p-5 space-y-4">
          {transfers.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">Aucun transfert pour le moment.</p>
          ) : (
            transfers.map(trf => {
              const currentStep = getProgressStep(trf.status);
              return (
                <div
                  key={trf.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 hover:border-blue-300 transition-colors"
                >
                  {/* Header info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-black text-blue-600">
                        {trf.reference}
                      </span>
                      <Badge
                        variant={
                          trf.status === 'received'
                            ? 'success'
                            : trf.status === 'in_transit'
                            ? 'info'
                            : trf.status === 'approved'
                            ? 'purple'
                            : 'warning'
                        }
                      >
                        {trf.status === 'received' && 'Réceptionné'}
                        {trf.status === 'in_transit' && 'En Transit'}
                        {trf.status === 'approved' && 'Approuvé'}
                        {trf.status === 'pending' && 'En Attente Approbation'}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-400">
                      Initié le {formatDateTime(trf.created_at)}
                    </span>
                  </div>

                  {/* Details & Routing */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Moto à transférer :</span>
                      <strong className="text-slate-900 text-sm block mt-0.5">{trf.motorcycle?.model?.name}</strong>
                      <span className="font-mono text-[11px] text-slate-600">VIN: {trf.motorcycle?.vin}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Showroom Départ (Source) :</span>
                      <strong className="text-slate-900 block mt-0.5">{trf.source_showroom?.name}</strong>
                      <span className="text-slate-500 text-[11px]">{trf.source_showroom?.city}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 block text-[11px]">Showroom Arrivée (Destination) :</span>
                      <strong className="text-blue-700 block mt-0.5">{trf.destination_showroom?.name}</strong>
                      <span className="text-slate-500 text-[11px]">{trf.destination_showroom?.city}</span>
                    </div>
                  </div>

                  {/* Visual Stepper / Workflow */}
                  <div className="pt-2">
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                      <div className={`p-2 rounded-lg border ${currentStep >= 1 ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-slate-50 text-slate-400'}`}>
                        1. Soumis
                      </div>
                      <div className={`p-2 rounded-lg border ${currentStep >= 2 ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-slate-50 text-slate-400'}`}>
                        2. Approuvé
                      </div>
                      <div className={`p-2 rounded-lg border ${currentStep >= 3 ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-slate-50 text-slate-400'}`}>
                        3. En Transit
                      </div>
                      <div className={`p-2 rounded-lg border ${currentStep >= 4 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-50 text-slate-400'}`}>
                        4. Réceptionné
                      </div>
                    </div>
                  </div>

                  {/* Actions according to step */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500 italic">
                      Motif: "{trf.reason || 'Rééquilibrage Compte Global'}"
                    </p>

                    <div className="flex items-center gap-2">
                      {trf.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(trf.id, 'approved')}
                          className="text-xs"
                        >
                          Approuver le Transfert
                        </Button>
                      )}

                      {trf.status === 'approved' && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleUpdateStatus(trf.id, 'in_transit')}
                          className="text-xs gap-1.5"
                        >
                          <Truck className="h-3.5 w-3.5" />
                          <span>Marquer En Transit (Expédié)</span>
                        </Button>
                      )}

                      {trf.status === 'in_transit' && (
                        <Button
                          size="sm"
                          variant="success"
                          onClick={() => handleUpdateStatus(trf.id, 'received')}
                          className="text-xs font-bold gap-1.5"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Confirmer Réception (Showroom Arrivée)</span>
                        </Button>
                      )}

                      {trf.history && trf.history.length > 0 && (
                        <button
                          onClick={() => setSelectedTransferForHistory(trf)}
                          className="p-1.5 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Historique des transitions"
                        >
                          <History className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* History Modal */}
      {selectedTransferForHistory && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedTransferForHistory(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl max-w-md w-full border border-slate-200 space-y-4">
              <h3 className="font-bold text-base text-slate-900">
                Historique d'audit — Transfert {selectedTransferForHistory.reference}
              </h3>
              <div className="space-y-3">
                {selectedTransferForHistory.history?.map((h, i) => (
                  <div key={i} className="text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Statut : {h.to_status}</span>
                      <span className="text-[10px] text-slate-400">{formatDateTime(h.created_at)}</span>
                    </div>
                    <p className="text-slate-600">{h.comment}</p>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <Button variant="outline" size="sm" onClick={() => setSelectedTransferForHistory(null)}>
                  Fermer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Transfer Modal */}
      <CreateTransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        preselectedMotorcycle={selectedOpp?.motorcycle}
        preselectedSourceShowroomId={selectedOpp?.sourceShowroom?.id}
        preselectedDestinationShowroomId={selectedOpp?.destinationShowroom?.id}
        preselectedReason={selectedOpp?.reason}
        onSuccess={refreshData}
      />

      {/* Algorithm Config & Transparency Modal */}
      <AlgorithmConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSave={refreshData}
      />
    </div>
  );
};
