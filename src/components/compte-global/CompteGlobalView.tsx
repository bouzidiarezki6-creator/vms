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
  Bike
} from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import { Motorcycle, Transfer, Showroom, TransferStatus } from '../../types';
import { CreateTransferModal } from './CreateTransferModal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatDate, formatDateTime } from '../../lib/utils';
import { useToast } from '../ui/Toast';

export const CompteGlobalView: React.FC = () => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();
  const [agingMotos, setAgingMotos] = useState<Motorcycle[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [selectedTransferForHistory, setSelectedTransferForHistory] = useState<Transfer | null>(null);

  // Modal State
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<any>(null);

  const refreshData = () => {
    setAgingMotos(dbStore.getAgingMotorcycles(90));
    setOpportunities(dbStore.getTransferOpportunities());
    setTransfers(dbStore.getTransfers());
  };

  useEffect(() => {
    refreshData();
    return dbStore.subscribe(refreshData);
  }, []);

  const handleOpenTransferForOpportunity = (opp: any) => {
    setSelectedOpp(opp);
    setIsTransferModalOpen(true);
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

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/10 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
              <Layers className="h-4 w-4" />
              <span>Système Intelligent de Centralisation du Stock</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              COMPTE GLOBAL VMS
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Moteur algorithmique d'optimisation de la répartition des motos entre showrooms. Détection temps réel des stocks dormants (&gt;90 jours), matching automatique avec la demande client et régulation des transferts inter-showrooms.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
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

      {/* Section 5.2: Intelligent Showroom Matching Opportunities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Opportunités de Transfert Intelligentes (Recommandations Algorithmiques)
            </h2>
          </div>
          <Badge variant="info">{opportunities.length} proposition(s)</Badge>
        </div>

        {opportunities.length === 0 ? (
          <Card className="p-8 text-center text-xs text-slate-500">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="font-bold text-slate-800">Le stock réseau est parfaitement équilibré.</p>
            <p className="mt-0.5">Aucune rupture de stock ou demande client non couverte nécessitant un transfert.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {opportunities.map((opp, idx) => (
              <Card key={idx} className="border-l-4 border-l-amber-500 hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={opp.model.image_url}
                        alt={opp.model.name}
                        className="h-12 w-12 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{opp.model.name}</h4>
                        <p className="text-[11px] font-mono text-slate-500">VIN: {opp.motorcycle.vin}</p>
                      </div>
                    </div>
                    <Badge variant="aging">
                      {opp.daysInStock} jours
                    </Badge>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Showroom Source :</span>
                      <strong className="text-slate-800">{opp.sourceShowroom.city}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Showroom Cible :</span>
                      <strong className="text-blue-700">{opp.destinationShowroom?.city || 'Showroom en rupture'}</strong>
                    </div>
                    <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-100">
                      💡 {opp.reason}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleOpenTransferForOpportunity(opp)}
                    className="w-full text-xs font-bold gap-1.5"
                  >
                    <span>Initier le Transfert Recommandé</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
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
              <p className="text-xs text-slate-500">Calcul automatique d'ancienneté d'après la date d'arrivée showroom</p>
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
                <th className="px-5 py-3">Statut Éligibilité</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {agingMotos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-slate-400">
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
                    <td className="px-5 py-3.5">
                      <Badge variant="success">Éligible Transfert Immédiat</Badge>
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
    </div>
  );
};
