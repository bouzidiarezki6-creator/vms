import React, { useState } from 'react';
import { dbStore } from '../../services/dbStore';
import { WILAYAS } from '../../data/wilayas';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { User, Lock, Mail, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const toast = useToast();
  const [mode, setMode] = useState<'login' | 'register' | 'recover'>('login');

  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register fields (Customer)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilayaCode, setWilayaCode] = useState('16');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Email requis.');
      return;
    }

    setIsLoading(true);
    try {
      const user = dbStore.loginAs(email.trim());
      if (!user) {
        throw new Error('Identifiants non reconnus. Vous pouvez utiliser les comptes de test rapides ci-dessous.');
      }
      toast.success('Connexion réussie', `Bienvenue ${user.first_name} !`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
      toast.error('Erreur', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError('Nom et prénom obligatoires.');
      return;
    }
    if (!phone.trim()) {
      setError('Numéro de téléphone requis.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Email valide requis.');
      return;
    }

    setIsLoading(true);
    try {
      const newUser = dbStore.registerCustomer({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        wilaya_code: wilayaCode
      });

      toast.success('Compte client créé avec succès !', `Bienvenue ${newUser.first_name}`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
      toast.error('Erreur', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Veuillez entrer votre email.');
      return;
    }
    toast.info('Lien de réinitialisation envoyé', 'Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.');
    setMode('login');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'login'
          ? 'Connexion à votre Espace QUICK'
          : mode === 'register'
          ? 'Création de Compte Client VMS'
          : 'Récupération de Mot de Passe'
      }
      subtitle="Accédez à la gestion centralisée de vos demandes et stocks motos"
      maxWidth="md"
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {/* Mode: Login */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Adresse Email *"
              type="email"
              placeholder="ex: amine.dahmani@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              label="Mot de passe *"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
            />

            <div className="flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setMode('recover')}
                className="text-blue-600 hover:underline"
              >
                Mot de passe oublié ?
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-slate-600 hover:text-slate-900 font-semibold"
              >
                Nouveau client ? Créer un compte
              </button>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Se Connecter
            </Button>

            {/* Quick Test Logins */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Comptes de Démo Préconfigurés :
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@vms.dz');
                    setPassword('admin123');
                  }}
                  className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-left"
                >
                  <p className="font-bold">👑 Super Admin</p>
                  <p className="text-[10px] text-purple-700">admin@vms.dz</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('alger@vms.dz');
                    setPassword('showroom123');
                  }}
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-left"
                >
                  <p className="font-bold">🏢 Showroom Alger</p>
                  <p className="text-[10px] text-blue-700">alger@vms.dz</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('oran@vms.dz');
                    setPassword('showroom123');
                  }}
                  className="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 text-left"
                >
                  <p className="font-bold">🏢 Showroom Oran</p>
                  <p className="text-[10px] text-orange-700">oran@vms.dz (Dormant)</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail('amine.dahmani@gmail.com');
                    setPassword('client123');
                  }}
                  className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-left"
                >
                  <p className="font-bold">👤 Client Amine</p>
                  <p className="text-[10px] text-emerald-700">amine.dahmani@gmail.com</p>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Mode: Customer Registration */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Prénom *"
                placeholder="Ex: Amine"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <Input
                label="Nom de famille *"
                placeholder="Ex: Dahmani"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Téléphone (Algérie) *"
                placeholder="0550 12 34 56"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                icon={<Phone className="h-4 w-4" />}
                required
              />
              <Select
                label="Wilaya de Résidence *"
                value={wilayaCode}
                onChange={e => setWilayaCode(e.target.value)}
              >
                {WILAYAS.map(w => (
                  <option key={w.code} value={w.code}>
                    {w.code} - {w.name}
                  </option>
                ))}
              </Select>
            </div>

            <Input
              label="Adresse Email *"
              type="email"
              placeholder="amine@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />

            <Input
              label="Mot de passe *"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              helperText="Minimum 8 caractères"
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-blue-600 hover:underline"
              >
                Déjà inscrit ? Se connecter
              </button>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full">
              Créer mon Compte Client
            </Button>
          </form>
        )}

        {/* Mode: Recover Password */}
        {mode === 'recover' && (
          <form onSubmit={handleRecover} className="space-y-4">
            <Input
              label="Votre Adresse Email *"
              type="email"
              placeholder="amine@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />

            <Button type="submit" className="w-full">
              Envoyer les Instructions
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Retour à la connexion
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
