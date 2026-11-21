import React, { useState, useEffect } from 'react';
import {
  Bike,
  Plus,
  Search,
  Filter,
  ArrowRightLeft,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Truck,
  Building,
  RotateCcw,
  Sparkles,
  TrendingUp,
  FileText,
  Trash2,
  Eye,
  ShieldCheck,
  MapPin
} from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import { Showroom, Motorcycle, ShowroomKPIs, Transfer } from '../../types';
import { AddMotorcycleModal } from './AddMotorcycleModal';
import { RecordSaleModal } from './RecordSaleModal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatPrice, formatDate } from '../../lib/utils';
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
  Cell
} from 'recharts';

interface ShowroomDashboardProps {
  onNavigateToCompteGlobal?: () => void;
}

export const ShowroomDashboard: React.FC<ShowroomDashboardProps> = ({
  onNavigateToCompteGlobal
}) => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();
  const showrooms = dbStore.getShowrooms();

  // If user is showroom owner, pick their showroom; else pick first showroom (Alger or Oran)
  const defaultShowroomId = showrooms.find(s => s.owner_id === currentUser?.id)?.id || showrooms[0]?.id || '';
  const [selectedShowroomId, setSelectedShowroomId] = useState<string>(defaultShowroomId);

  const [kpis, setKpis] = useState<ShowroomKPIs | null>(null);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [modelFilter, setModelFilter] = useState<string>('ALL');
  const [onlyAgingFilter, setOnlyAgingFilter] = useState(false);
  const [searchVin, setSearchVin] = useState('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [selectedMotorcycleForSale, setSelectedMotorcycleForSale] = useState<Motorcycle | undefined>(undefined);

  const refreshData = () => {
    if (!selectedShowroomId) return;
    setKpis(dbStore.getShowroomKPIs(selectedShowroomId));
    setMotorcycles(dbStore.getMotorcycles(selectedShowroomId));
    setTransfers(dbStore.getTransfers());
  };

  useEffect(() => {
    refreshData();
    return dbStore.subscribe(refreshData);
  }, [selectedShowroomId]);

  const activeShowroom = showrooms.find(s => s.id === selectedShowroomId);
  const models = dbStore.getModels();

  // Filtered motorcycles
  const filteredMotos = motorcycles.filter(m => {
    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
    const matchesModel = modelFilter === 'ALL' || m.model_id === modelFilter;
    const matchesAging = !onlyAgingFilter || m.is_aging;
    const matchesSearch = !searchVin || m.vin.toLowerCase().includes(searchVin.toLowerCase()) ||
                          m.color.toLowerCase().includes(searchVin.toLowerCase()) ||
                          m.model?.name.toLowerCase().includes(searchVin.toLowerCase());
    return matchesStatus && matchesModel && matchesAging && matchesSearch;
  });

  // Incoming and Outgoing Transfers for this Showroom
  const incomingTransfers = transfers.filter(
    t => t.destination_showroom_id === selectedShowroomId && ['pending', 'approved', 'in_transit'].includes(t.status)
  );

  const outgoingTransfers = transfers.filter(
    t => t.source_showroom_id === selectedShowroomId && ['pending', 'approved', 'in_transit'].includes(t.status)
  );

  // Reception handler (Atomic transfer reception)
  const handleConfirmReception = (transferId: string) => {
    try {
      dbStore.updateTransferStatus(
        transferId,
        'received',
        currentUser?.id || 'staff',
        `Réception physique confirmée au showroom ${activeShowroom?.name}`
      );
      toast.success('Réception confirmée !', 'La moto est intégrée à votre inventaire avec statut Disponible.');
      refreshData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  // Status transition handlers for outgoing transfers
  const handleApproveTransfer = (transferId: string) => {
    try {
      dbStore.updateTransferStatus(transferId, 'approved', currentUser?.id || 'staff', 'Transfert approuvé par le showroom source');
      toast.success('Transfert approuvé');
      refreshData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  const handleShipTransfer = (transferId: string) => {
    try {
      dbStore.updateTransferStatus(transferId, 'in_transit', currentUser?.id || 'staff', 'Moto expédiée par camion de transport');
      toast.success('Statut mis à jour : En transit');
      refreshData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  // Motorcycle status change
  const handleChangeStatus = (motoId: string, newStatus: any) => {
    try {
      dbStore.updateMotorcycle(motoId, { status: newStatus }, currentUser?.id || 'staff');
      toast.success('Statut mis à jour', `Nouveau statut: ${newStatus}`);
      refreshData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  const handleDeleteMotorcycle = (motoId: string) => {
    if (confirm('Voulez-vous vraiment retirer cette moto du stock ?')) {
      try {
        dbStore.deleteMotorcycle(motoId, currentUser?.id || 'staff');
        toast.success('Moto supprimée du stock');
        refreshData();
      } catch (err: any) {
        toast.error('Erreur', err.message);
      }
    }
  };

  // Chart data: Stock by Model
  const modelStockData = models.map(mod => {
    const count = motorcycles.filter(m => m.model_id === mod.id && m.status === 'available').length;
    return {
      name: mod.name.replace('VMS ', ''),
      disponibles: count
    };
  }).filter(d => d.disponibles > 0);

  // Chart data: Stock Age Breakdown
  const ageUnder30 = motorcycles.filter(m => (m.days_in_stock || 0) < 30 && m.status === 'available').length;
  const age30to60 = motorcycles.filter(m => (m.days_in_stock || 0) >= 30 && (m.days_in_stock || 0) < 60 && m.status === 'available').length;
  const age60to90 = motorcycles.filter(m => (m.days_in_stock || 0) >= 60 && (m.days_in_stock || 0) < 90 && m.status === 'available').length;
  const ageOver90 = motorcycles.filter(m => (m.days_in_stock || 0) >= 90 && m.status === 'available').length;

  const ageData = [
    { name: '< 30 jours', value: ageUnder30, color: '#10b981' },
    { name: '30 - 60 jours', value: age30to60, color: '#3b82f6' },
    { name: '60 - 90 jours', value: age60to90, color: '#f59e0b' },
    { name: '> 90 jours (Dormant)', value: ageOver90, color: '#ef4444' }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Showroom Header & Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{activeShowroom?.name}</h1>
              <Badge variant="success">Actif</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>{activeShowroom?.address}</span>
              <span>•</span>
              <span>Tél: {activeShowroom?.phone}</span>
            </p>
          </div>
        </div>

        {/* Showroom selector (if super admin or switching for demo test) */}
        <div className="flex items-center gap-3">
          <div className="w-64">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Changer de Showroom (Démo) :
            </label>
            <select
              value={selectedShowroomId}
              onChange={e => setSelectedShowroomId(e.target.value)}
              className="w-full text-xs rounded-lg border border-slate-300 py-1.5 px-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              {showrooms.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.city})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-1.5 text-xs font-bold"
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter une Moto</span>
            </Button>
            <Button
              variant="success"
              onClick={() => {
                setSelectedMotorcycleForSale(undefined);
                setIsSaleModalOpen(true);
              }}
              className="gap-1.5 text-xs font-bold"
            >
              <DollarSign className="h-4 w-4" />
              <span>Enregistrer Vente</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Aging Stock Alert Banner if any (>90 days) */}
      {kpis && kpis.agingStockCount > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-200 text-amber-800 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm">
                Détection Stock Dormant — Compte Global ({kpis.agingStockCount} moto(s) &gt; 90 jours)
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                Certains exemplaires présents dans ce showroom dépassent les 90 jours d'ancienneté. Le système Compte Global propose de les transférer vers des showrooms en rupture ou à forte demande.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            onClick={onNavigateToCompteGlobal}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold whitespace-nowrap text-xs gap-1.5 self-start sm:self-auto"
          >
            <span>Voir opportunités Compte Global</span>
            <ArrowRightLeft className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* KPI Statistic Cards (Section 4.2) */}
      {kpis && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Stock Total</span>
              <Bike className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900 mt-2">{kpis.totalStock}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Unités affectées</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Disponibles</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-emerald-600 mt-2">{kpis.availableStock}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Prêtes à la vente</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Réservées</span>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="text-2xl font-black text-amber-600 mt-2">{kpis.reservedStock}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Acomptes versés</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Stock Dormant &gt;90j</span>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <p className="text-2xl font-black text-orange-600 mt-2">{kpis.agingStockCount}</p>
            <p className="text-[11px] text-orange-600/80 font-semibold mt-0.5">Compte Global</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>Taux Disponibilité</span>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
            <p className="text-2xl font-black text-purple-600 mt-2">{kpis.availabilityRate}%</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Ratio stock dispo</p>
          </Card>
        </div>
      )}

      {/* Interactive Charts: Stock by Model & Stock Age */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <CardHeader className="p-0 pb-4 mb-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <CardTitle>Disponibilité Réelle par Modèle</CardTitle>
              <p className="text-xs text-slate-500">Motos immédiatement livrables dans ce showroom</p>
            </div>
            <Badge variant="info">{kpis?.availableStock || 0} disponibles</Badge>
          </CardHeader>
          <div className="h-64 w-full">
            {modelStockData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelStockData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="disponibles" fill="#026fc7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Aucune moto disponible actuellement dans ce showroom.
              </div>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <CardHeader className="p-0 pb-4 mb-4 border-b border-slate-100">
            <CardTitle>Ancienneté du Stock (Jours)</CardTitle>
            <p className="text-xs text-slate-500">Calcul automatique depuis la date d'arrivée</p>
          </CardHeader>
          <div className="h-64 w-full flex items-center justify-center">
            {ageData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-slate-400">Aucune donnée d'âge.</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-100 text-[10px]">
            {ageData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-slate-600">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Incoming / Outgoing Inter-Showroom Transfers Section */}
      {(incomingTransfers.length > 0 || outgoingTransfers.length > 0) && (
        <Card className="p-5 border-blue-200 bg-blue-50/20">
          <CardHeader className="p-0 pb-3 mb-3 border-b border-blue-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-sm">Transferts Inter-Showrooms en Cours</CardTitle>
            </div>
            <span className="text-xs text-blue-700 font-semibold">
              {incomingTransfers.length} entrant(s) • {outgoingTransfers.length} sortant(s)
            </span>
          </CardHeader>

          <div className="space-y-3">
            {/* Incoming */}
            {incomingTransfers.map(trf => (
              <div
                key={trf.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-700">{trf.reference}</span>
                    <Badge variant={trf.status === 'in_transit' ? 'info' : 'warning'}>
                      {trf.status === 'in_transit' ? 'En camion de transport' : trf.status}
                    </Badge>
                  </div>
                  <p className="font-bold text-slate-900 mt-1">
                    {trf.motorcycle?.model?.name} (Châssis: {trf.motorcycle?.vin})
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Provenant de : <strong className="text-slate-700">{trf.source_showroom?.name}</strong> • Âge au départ: {trf.stock_age_at_request}j
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleConfirmReception(trf.id)}
                    className="gap-1.5 text-xs font-bold"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Confirmer Réception en Showroom</span>
                  </Button>
                </div>
              </div>
            ))}

            {/* Outgoing */}
            {outgoingTransfers.map(trf => (
              <div
                key={trf.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700">{trf.reference}</span>
                    <Badge variant="purple">Demande sortante</Badge>
                    <span className="text-slate-400">• Statut : {trf.status}</span>
                  </div>
                  <p className="font-bold text-slate-900 mt-1">
                    {trf.motorcycle?.model?.name} (Châssis: {trf.motorcycle?.vin})
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    Destination : <strong className="text-slate-700">{trf.destination_showroom?.name}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {trf.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleApproveTransfer(trf.id)}
                      className="text-xs"
                    >
                      Approuver le départ
                    </Button>
                  )}
                  {trf.status === 'approved' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleShipTransfer(trf.id)}
                      className="text-xs gap-1"
                    >
                      <Truck className="h-3.5 w-3.5" />
                      <span>Confirmer Expédition (En transit)</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Complete Stock Inventory Management Table (Section 4.3) */}
      <Card className="overflow-hidden">
        <CardHeader className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Inventaire Physique & Suivi du Stock</CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Historique complet, détection de stock dormant (&gt;90j) et contrôle des numéros de châssis
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Chercher VIN / Couleur..."
                value={searchVin}
                onChange={e => setSearchVin(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-xs rounded-lg border border-slate-300 py-1.5 px-2.5 font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option value="ALL">Tous les statuts</option>
              <option value="available">Disponible</option>
              <option value="reserved">Réservé</option>
              <option value="in_transfer">En transfert</option>
              <option value="sold">Vendu</option>
            </select>

            <button
              onClick={() => setOnlyAgingFilter(!onlyAgingFilter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border flex items-center gap-1.5 ${
                onlyAgingFilter
                  ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className="h-3 w-3 text-amber-600" />
              <span>Dormant (&gt;90j)</span>
            </button>
          </div>
        </CardHeader>

        {/* Inventory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Modèle / Marque</th>
                <th className="px-5 py-3">Numéro Châssis (VIN)</th>
                <th className="px-5 py-3">Couleur</th>
                <th className="px-5 py-3">Date Arrivée</th>
                <th className="px-5 py-3">Durée en Stock</th>
                <th className="px-5 py-3">Statut</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMotos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-slate-400">
                    Aucune moto trouvée pour ces critères de recherche.
                  </td>
                </tr>
              ) : (
                filteredMotos.map(moto => (
                  <tr key={moto.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={moto.model?.image_url}
                          alt={moto.model?.name}
                          className="h-9 w-9 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{moto.model?.name}</p>
                          <p className="text-[10px] text-slate-400">{moto.model?.category}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 font-mono font-semibold text-slate-800">
                      {moto.vin}
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-medium text-slate-700">{moto.color}</span>
                    </td>

                    <td className="px-5 py-3.5 text-slate-600">
                      {formatDate(moto.arrival_date)}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{moto.days_in_stock} jours</span>
                        {moto.is_aging && moto.status === 'available' && (
                          <Badge variant="aging">
                            &gt;90j Éligible Transfert
                          </Badge>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      {moto.status === 'available' && <Badge variant="success">Disponible</Badge>}
                      {moto.status === 'reserved' && <Badge variant="warning">Réservé</Badge>}
                      {moto.status === 'in_transfer' && <Badge variant="info">En Transfert</Badge>}
                      {moto.status === 'sold' && <Badge variant="default">Vendu le {formatDate(moto.sale_date)}</Badge>}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {moto.status === 'available' && (
                          <button
                            onClick={() => {
                              setSelectedMotorcycleForSale(moto);
                              setIsSaleModalOpen(true);
                            }}
                            title="Vendre"
                            className="p-1 rounded text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <DollarSign className="h-4 w-4" />
                          </button>
                        )}

                        {moto.status === 'available' && (
                          <button
                            onClick={() => handleChangeStatus(moto.id, 'reserved')}
                            title="Marquer Réservé"
                            className="p-1 rounded text-amber-600 hover:bg-amber-50 hover:text-amber-700"
                          >
                            <Clock className="h-4 w-4" />
                          </button>
                        )}

                        {moto.status === 'reserved' && (
                          <button
                            onClick={() => handleChangeStatus(moto.id, 'available')}
                            title="Remettre Disponible"
                            className="p-1 rounded text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </button>
                        )}

                        {moto.status !== 'in_transfer' && (
                          <button
                            onClick={() => handleDeleteMotorcycle(moto.id)}
                            title="Supprimer du stock"
                            className="p-1 rounded text-slate-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Motorcycle Modal */}
      <AddMotorcycleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        showroomId={selectedShowroomId}
        onSuccess={refreshData}
      />

      {/* Record Sale Modal */}
      <RecordSaleModal
        isOpen={isSaleModalOpen}
        onClose={() => setIsSaleModalOpen(false)}
        showroomId={selectedShowroomId}
        preselectedMotorcycle={selectedMotorcycleForSale}
        onSuccess={refreshData}
      />
    </div>
  );
};
