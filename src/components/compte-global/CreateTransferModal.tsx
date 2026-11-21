import React, { useState } from 'react';
import { dbStore } from '../../services/dbStore';
import { Showroom, Motorcycle } from '../../types';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { AlertCircle, ArrowRightLeft } from 'lucide-react';

interface CreateTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedMotorcycle?: Motorcycle;
  preselectedSourceShowroomId?: string;
  preselectedDestinationShowroomId?: string;
  preselectedReason?: string;
  onSuccess?: () => void;
}

export const CreateTransferModal: React.FC<CreateTransferModalProps> = ({
  isOpen,
  onClose,
  preselectedMotorcycle,
  preselectedSourceShowroomId,
  preselectedDestinationShowroomId,
  preselectedReason,
  onSuccess
}) => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();
  const showrooms = dbStore.getShowrooms();
  const allMotos = dbStore.getMotorcycles();

  const [sourceShowroomId, setSourceShowroomId] = useState(
    preselectedSourceShowroomId || preselectedMotorcycle?.showroom_id || showrooms[0]?.id || ''
  );
  const [destinationShowroomId, setDestinationShowroomId] = useState(
    preselectedDestinationShowroomId || showrooms[1]?.id || ''
  );

  // Filter available motorcycles from source showroom
  const sourceAvailableMotos = allMotos.filter(
    m => m.showroom_id === sourceShowroomId && m.status === 'available'
  );

  const [motorcycleId, setMotorcycleId] = useState(
    preselectedMotorcycle?.id || sourceAvailableMotos[0]?.id || ''
  );
  const [reason, setReason] = useState(
    preselectedReason || 'Rééquilibrage de stock Compte Global suite à demande client prioritaire'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedMoto = allMotos.find(m => m.id === motorcycleId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (sourceShowroomId === destinationShowroomId) {
      setError('Le showroom source et le showroom de destination doivent être différents.');
      return;
    }
    if (!motorcycleId) {
      setError('Veuillez sélectionner une moto éligible au transfert.');
      return;
    }

    setIsLoading(true);
    try {
      const transfer = dbStore.createTransferRequest({
        motorcycle_id: motorcycleId,
        source_showroom_id: sourceShowroomId,
        destination_showroom_id: destinationShowroomId,
        reason: reason.trim()
      }, currentUser?.id || 'admin');

      toast.success('Demande de transfert créée !', `Réf: ${transfer.reference}`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du transfert.');
      toast.error('Erreur', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Initier un Transfert Inter-Showroom"
      subtitle="Système Compte Global — Réallocation intelligente du stock"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Showroom Source (Départ) *"
            value={sourceShowroomId}
            onChange={e => {
              setSourceShowroomId(e.target.value);
              const available = allMotos.filter(m => m.showroom_id === e.target.value && m.status === 'available');
              if (available.length > 0) {
                setMotorcycleId(available[0].id);
              } else {
                setMotorcycleId('');
              }
            }}
          >
            {showrooms.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.city})
              </option>
            ))}
          </Select>

          <Select
            label="Showroom Destination (Arrivée) *"
            value={destinationShowroomId}
            onChange={e => setDestinationShowroomId(e.target.value)}
          >
            {showrooms
              .filter(s => s.id !== sourceShowroomId)
              .map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.city})
                </option>
              ))}
          </Select>
        </div>

        <Select
          label="Moto Disponible à Transférer *"
          value={motorcycleId}
          onChange={e => setMotorcycleId(e.target.value)}
        >
          {sourceAvailableMotos.length === 0 ? (
            <option value="">Aucune moto disponible dans ce showroom</option>
          ) : (
            sourceAvailableMotos.map(m => (
              <option key={m.id} value={m.id}>
                {m.model?.name} — VIN: {m.vin} ({m.color}) — {m.days_in_stock}j en stock {m.is_aging ? '🔥 DORMANT' : ''}
              </option>
            ))
          )}
        </Select>

        {selectedMoto && (
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
            <p className="font-bold text-slate-800">Détails de l'unité sélectionnée :</p>
            <div className="flex justify-between text-slate-600">
              <span>Durée en stock showroom source :</span>
              <span className={`font-bold ${selectedMoto.is_aging ? 'text-amber-600' : 'text-slate-900'}`}>
                {selectedMoto.days_in_stock} jours {selectedMoto.is_aging && '(Stock > 90j)'}
              </span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Numéro Châssis (VIN) :</span>
              <span className="font-mono font-semibold text-slate-900">{selectedMoto.vin}</span>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Motif du Transfert *
          </label>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            rows={2}
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!motorcycleId || sourceShowroomId === destinationShowroomId}
            className="gap-2"
          >
            <ArrowRightLeft className="h-4 w-4" />
            <span>Soumettre le Transfert</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
};
