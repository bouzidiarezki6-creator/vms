import React, { useState } from 'react';
import { dbStore } from '../../services/dbStore';
import { MotorcycleModel, Showroom } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

interface AddMotorcycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  showroomId: string;
  onSuccess?: () => void;
}

export const AddMotorcycleModal: React.FC<AddMotorcycleModalProps> = ({
  isOpen,
  onClose,
  showroomId,
  onSuccess
}) => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();
  const models = dbStore.getModels().filter(m => m.is_active);

  const [modelId, setModelId] = useState(models[0]?.id || '');
  const [vin, setVin] = useState('');
  const [color, setColor] = useState('');
  const [engineSpecs, setEngineSpecs] = useState('');
  const [arrivalDate, setArrivalDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!vin.trim()) {
      setError('Le numéro de châssis / VIN est obligatoire.');
      return;
    }
    if (!color.trim()) {
      setError('Veuillez indiquer la couleur.');
      return;
    }

    setIsLoading(true);
    try {
      dbStore.addMotorcycle({
        model_id: modelId,
        showroom_id: showroomId,
        vin: vin.trim().toUpperCase(),
        color: color.trim(),
        engine_specs: engineSpecs.trim() || undefined,
        arrival_date: arrivalDate,
        notes: notes.trim() || undefined
      }, currentUser?.id || 'admin');

      toast.success('Moto ajoutée avec succès !', `VIN: ${vin.trim().toUpperCase()}`);
      if (onSuccess) onSuccess();
      onClose();
      // Reset form
      setVin('');
      setColor('');
      setEngineSpecs('');
      setNotes('');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'ajout de la moto.');
      toast.error('Erreur', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ajouter une Moto au Stock Showroom"
      subtitle="Enregistrez une nouvelle unité avec contrôle d'unicité du châssis"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <Select
          label="Modèle VMS *"
          value={modelId}
          onChange={e => setModelId(e.target.value)}
        >
          {models.map(m => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.brand}) — {m.category}
            </option>
          ))}
        </Select>

        <Input
          label="Numéro de Châssis / VIN (Unique) *"
          placeholder="Ex: VMSDZ2026CK891999"
          value={vin}
          onChange={e => setVin(e.target.value)}
          helperText="Le système vérifie immédiatement les doublons dans tout le réseau"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Couleur *"
            placeholder="Ex: Noir Mat / Rouge"
            value={color}
            onChange={e => setColor(e.target.value)}
            required
          />
          <Input
            label="Date d'Arrivée en Showroom *"
            type="date"
            value={arrivalDate}
            onChange={e => setArrivalDate(e.target.value)}
            helperText="Sert au calcul automatique du stock dormant (>90j)"
            required
          />
        </div>

        <Input
          label="Spécifications Moteur (Optionnel)"
          placeholder="Ex: 125cc Euro 5 4T injection"
          value={engineSpecs}
          onChange={e => setEngineSpecs(e.target.value)}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Notes / Lot de Production
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Observations atelier, lot d'assemblage ou accessoires..."
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            rows={2}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Enregistrer la Moto
          </Button>
        </div>
      </form>
    </Modal>
  );
};
