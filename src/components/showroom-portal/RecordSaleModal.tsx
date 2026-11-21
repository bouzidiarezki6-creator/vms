import React, { useState } from 'react';
import { dbStore } from '../../services/dbStore';
import { Motorcycle, Sale } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { formatPrice } from '../../lib/utils';

interface RecordSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  showroomId: string;
  preselectedMotorcycle?: Motorcycle;
  onSuccess?: (sale: Sale) => void;
}

export const RecordSaleModal: React.FC<RecordSaleModalProps> = ({
  isOpen,
  onClose,
  showroomId,
  preselectedMotorcycle,
  onSuccess
}) => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();
  const availableMotos = dbStore.getMotorcycles(showroomId).filter(
    m => m.status === 'available' || m.status === 'reserved'
  );

  const [motorcycleId, setMotorcycleId] = useState<string>(
    preselectedMotorcycle?.id || availableMotos[0]?.id || ''
  );
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [salePrice, setSalePrice] = useState<number>(
    preselectedMotorcycle?.model?.price_dzd || 250000
  );
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CHEQUE' | 'VIREMENT' | 'FACILITE'>('CASH');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedMoto = availableMotos.find(m => m.id === motorcycleId) || preselectedMotorcycle;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!motorcycleId) {
      setError('Veuillez sélectionner une moto.');
      return;
    }
    if (!customerName.trim()) {
      setError('Nom de l\'acheteur obligatoire.');
      return;
    }
    if (!customerPhone.trim()) {
      setError('Téléphone de l\'acheteur obligatoire.');
      return;
    }

    setIsLoading(true);
    try {
      const sale = dbStore.recordSale({
        motorcycle_id: motorcycleId,
        showroom_id: showroomId,
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        sale_price: Number(salePrice),
        payment_method: paymentMethod,
        notes: notes.trim() || undefined
      }, currentUser?.id || 'staff');

      toast.success('Vente enregistrée avec succès !', `Facture : ${sale.reference}`);
      if (onSuccess) onSuccess(sale);
      onClose();
      // Reset
      setCustomerName('');
      setCustomerPhone('');
      setNotes('');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'enregistrement de la vente.');
      toast.error('Erreur', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enregistrer une Vente Showroom"
      subtitle="Finaliser la vente, générer la référence facture et mettre à jour le stock"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <Select
          label="Moto à Vendre *"
          value={motorcycleId}
          onChange={e => {
            setMotorcycleId(e.target.value);
            const m = availableMotos.find(item => item.id === e.target.value);
            if (m?.model?.price_dzd) {
              setSalePrice(m.model.price_dzd);
            }
          }}
        >
          {availableMotos.map(m => (
            <option key={m.id} value={m.id}>
              {m.model?.name} — VIN: {m.vin} ({m.color}) — {formatPrice(m.model?.price_dzd || 0)}
            </option>
          ))}
        </Select>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Nom & Prénom de l'Acheteur *"
            placeholder="Ex: Youssef Meziane"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            required
          />
          <Input
            label="Téléphone Client *"
            placeholder="Ex: 0550 12 34 56"
            value={customerPhone}
            onChange={e => setCustomerPhone(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Prix de Vente Conclu (DZD) *"
            type="number"
            value={salePrice}
            onChange={e => setSalePrice(Number(e.target.value))}
            required
          />
          <Select
            label="Mode de Règlement *"
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value as any)}
          >
            <option value="CASH">Espèces (Comptant)</option>
            <option value="CHEQUE">Chèque Bancaire</option>
            <option value="VIREMENT">Virement Bancaire</option>
            <option value="FACILITE">Facilité de Paiement</option>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Observations / Remises / Carte Grise
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Dossier d'immatriculation déposé, casque offert..."
            className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            rows={2}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" variant="success" isLoading={isLoading}>
            Valider la Vente
          </Button>
        </div>
      </form>
    </Modal>
  );
};
