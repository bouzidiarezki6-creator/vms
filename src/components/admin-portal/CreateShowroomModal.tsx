import React, { useState } from 'react';
import { dbStore } from '../../services/dbStore';
import { Showroom } from '../../types';
import { WILAYAS, getCitiesForWilaya } from '../../data/wilayas';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

interface CreateShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (showroom: Showroom) => void;
}

export const CreateShowroomModal: React.FC<CreateShowroomModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [wilayaCode, setWilayaCode] = useState('16');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [openingHours, setOpeningHours] = useState('08:30 - 17:00 (Sam - Jeu)');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableCities = getCitiesForWilaya(wilayaCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Nom du showroom requis.');
      return;
    }
    if (!phone.trim()) {
      setError('Téléphone requis.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Email valide requis.');
      return;
    }

    setIsLoading(true);
    try {
      const shw = dbStore.createShowroom({
        name: name.trim(),
        code: code.trim() || `VMS-${wilayaCode}-${Math.floor(10 + Math.random() * 90)}`,
        wilaya_code: wilayaCode,
        city: city || availableCities[0] || 'Centre-Ville',
        address: address.trim(),
        phone: phone.trim(),
        email: email.trim(),
        is_active: true,
        opening_hours: openingHours
      }, currentUser?.id || 'admin');

      toast.success('Showroom créé avec succès !', shw.name);
      if (onSuccess) onSuccess(shw);
      onClose();
      // Reset
      setName('');
      setCode('');
      setAddress('');
      setPhone('');
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du showroom.');
      toast.error('Erreur', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Créer un Nouveau Showroom VMS"
      subtitle="Administration centrale du réseau commercial VMS Industrie"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Nom Officiel du Showroom *"
            placeholder="Ex: VMS Showroom Annaba Port"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            label="Code Identifiant (Optionnel)"
            placeholder="Ex: VMS-ANN-01"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Wilaya (Algérie) *"
            value={wilayaCode}
            onChange={e => setWilayaCode(e.target.value)}
          >
            {WILAYAS.map(w => (
              <option key={w.code} value={w.code}>
                {w.code} - {w.name} ({w.name_ar})
              </option>
            ))}
          </Select>

          <Select
            label="Commune / Ville *"
            value={city}
            onChange={e => setCity(e.target.value)}
          >
            {availableCities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        </div>

        <Input
          label="Adresse Complète *"
          placeholder="Ex: Boulevard de l'Aviation, Zone Industrielle"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Numéro de Téléphone *"
            placeholder="Ex: 038 45 12 30 / 0550 11 22 33"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
          <Input
            label="Adresse Email Showroom *"
            type="email"
            placeholder="annaba@vms.dz"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <Input
          label="Horaires d'Ouverture"
          placeholder="08:30 - 17:00 (Sam - Jeu)"
          value={openingHours}
          onChange={e => setOpeningHours(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Créer le Showroom
          </Button>
        </div>
      </form>
    </Modal>
  );
};
