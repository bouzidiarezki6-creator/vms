import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRightLeft,
  Calendar,
  Clock,
  Building,
  CheckCircle2,
  TrendingDown,
  Layers,
  MapPin,
  Sparkles,
  Info
} from 'lucide-react';
import { Motorcycle, Showroom, MotorcycleModel } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatPrice, formatDate } from '../../lib/utils';
import { dbStore } from '../../services/dbStore';
import { useToast } from '../ui/Toast';
import { CreateTransferModal } from '../compte-global/CreateTransferModal';

interface DormantStockSectionProps {
  motorcycles: Motorcycle[];
  currentShowroom?: Showroom;
  onRefresh: () => void;
  onNavigateToCompteGlobal?: () => void;
}

export const DormantStockSection: React.FC<DormantStockSectionProps> = ({
  motorcycles,
  currentShowroom,
  onRefresh,
  onNavigateToCompteGlobal
}) => {
  const toast = useToast();
  const dormantUnits = motorcycles.filter(m => (m.days_in_stock || 0) >= 90 && m.status === 'available');
  const showrooms = dbStore.getShowrooms();
  const customerRequests = dbStore.getCustomerRequests();

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedMotoForTransfer, setSelectedMotoForTransfer] = useState<Motorcycle | undefined>(undefined);

  const handleInitiateTransfer = (moto: Motorcycle) => {
    setSelectedMotoForTransfer(moto);
    setIsTransferModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/30">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  Stock Dormant (&gt; 90 Jours) — Compte Global
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  {dormantUnits.length} unité(s) concernée(s)
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Conformément aux règles de gestion VMS, toute moto en stock depuis plus de 90 jours est prioritaire pour un transfert réseau vers les showrooms enregistrant une forte demande ou une rupture de stock.
              </p>
            </div>
          </div>

          {onNavigateToCompteGlobal && (
            <Button
              onClick={onNavigateToCompteGlobal}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs gap-2 shrink-0 shadow-md"
            >
              <Layers className="h-4 w-4" />
              <span>Tableau Réseau Compte Global</span>
            </Button>
          )}
        </div>
      </div>

      {/* Dormant Units List */}
      {dormantUnits.length === 0 ? (
        <Card className="p-8 text-center space-y-3">
          <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Aucun stock dormant !</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Toutes les motos présentes dans le showroom de {currentShowroom?.name || 'ce point de vente'} ont été réceptionnées il y a moins de 90 jours. La rotation du stock est optimale.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {dormantUnits.map(moto => {
            // Find destination showrooms that have 0 of this model or customer demand
            const otherShowrooms = showrooms.filter(s => s.id !== currentShowroom?.id && s.is_active);
            const highDemandShowrooms = otherShowrooms.filter(target => {
              const pendingReqCount = customerRequests.filter(
                r => r.motorcycle_model_id === moto.model_id && r.wilaya_code === target.wilaya_code && r.status === 'pending'
              ).length;
              const targetStock = dbStore.getMotorcycles(target.id).filter(
                m => m.model_id === moto.model_id && m.status === 'available'
              ).length;
              return pendingReqCount > 0 || targetStock === 0;
            });

            return (
              <div
                key={moto.id}
                className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={moto.model?.image_url}
                      alt={moto.model?.name}
                      className="h-14 w-14 object-cover rounded-xl bg-slate-100 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400">
                        {moto.model?.brand} • {moto.model?.category}
                      </span>
                      <h4 className="font-black text-slate-900 text-base">{moto.model?.name}</h4>
                      <p className="font-mono text-xs text-slate-500 font-semibold">
                        Châssis : {moto.vin}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-black animate-pulse">
                      <Clock className="h-3.5 w-3.5 text-amber-700" />
                      <span>{moto.days_in_stock} jours</span>
                    </span>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Arrivée le {formatDate(moto.arrival_date)}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="text-slate-400">Couleur :</span>
                    <strong className="text-slate-800 ml-1.5">{moto.color}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Prix unitaire :</span>
                    <strong className="text-red-600 font-bold ml-1.5">{formatPrice(moto.model?.price_dzd || 0)}</strong>
                  </div>
                </div>

                {/* Algorithmic Compte Global Recommendation */}
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>Opportunités de Transfert Détectées :</span>
                  </div>

                  {highDemandShowrooms.length > 0 ? (
                    <div className="space-y-1">
                      {highDemandShowrooms.slice(0, 2).map(target => {
                        const count = customerRequests.filter(
                          r => r.motorcycle_model_id === moto.model_id && r.wilaya_code === target.wilaya_code && r.status === 'pending'
                        ).length;

                        return (
                          <div
                            key={target.id}
                            className="flex items-center justify-between text-xs text-slate-700 bg-white p-2 rounded-lg border border-slate-200"
                          >
                            <div className="flex items-center gap-2">
                              <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span>{target.name} ({target.city})</span>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-700">
                              {count > 0 ? `${count} demande(s) en attente` : 'Rupture de stock'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      Éligible à un transfert vers n'importe quel showroom du réseau VMS.
                    </p>
                  )}
                </div>

                {/* Action button */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleInitiateTransfer(moto)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 shadow-sm"
                  >
                    <ArrowRightLeft className="h-3.5 w-3.5" />
                    <span>Initier Transfert Compte Global</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isTransferModalOpen && (
        <CreateTransferModal
          isOpen={isTransferModalOpen}
          onClose={() => {
            setIsTransferModalOpen(false);
            setSelectedMotoForTransfer(undefined);
          }}
          preselectedMotorcycle={selectedMotoForTransfer}
          preselectedSourceShowroomId={currentShowroom?.id}
          onSuccess={() => {
            onRefresh();
            toast.success('Demande de transfert enregistrée', 'Le showroom destinataire a été notifié.');
          }}
        />
      )}
    </div>
  );
};
