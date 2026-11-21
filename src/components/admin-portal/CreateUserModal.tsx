import React, { useState } from 'react';
import { dbStore } from '../../services/dbStore';
import { Showroom, Profile } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (profile: Profile) => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();
  const showrooms = dbStore.getShowrooms();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'showroom_owner' | 'showroom_staff'>('showroom_owner');
  const [showroomId, setShowroomId] = useState(showrooms[0]?.id || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError('Nom et prénom requis.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Email valide requis.');
      return;
    }
    if (!phone.trim()) {
      setError('Numéro de téléphone requis.');
      return;
    }

    setIsLoading(true);
    try {
      const user = dbStore.createShowroomUser({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role,
        showroomId
      }, currentUser?.id || 'admin');

      toast.success('Compte utilisateur créé avec succès !', `${user.first_name} ${user.last_name}`);
      if (onSuccess) onSuccess(user);
      onClose();
      // Reset
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création du compte.');
      toast.error('Erreur', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Créer un Compte Showroom (Gestionnaire / Staff)"
      subtitle="Section 4 : Les comptes showroom doivent être créés exclusivement par le Super Admin"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Prénom *"
            placeholder="Ex: Farid"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <Input
            label="Nom *"
            placeholder="Ex: Benyahia"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Email Professionnel *"
            type="email"
            placeholder="farid.benyahia@vms.dz"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Téléphone *"
            placeholder="0550 12 34 56"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Rôle Attribué *"
            value={role}
            onChange={e => setRole(e.target.value as any)}
          >
            <option value="showroom_owner">Responsable / Gérant Showroom</option>
            <option value="showroom_staff">Conseiller Commercial / Staff</option>
          </Select>

          <Select
            label="Showroom Affecté *"
            value={showroomId}
            onChange={e => setShowroomId(e.target.value)}
          >
            {showrooms.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.city})
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Créer et Activer le Compte
          </Button>
        </div>
      </form>
    </Modal>
  );
};
