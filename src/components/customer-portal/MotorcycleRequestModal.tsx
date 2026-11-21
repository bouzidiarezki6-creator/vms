import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Bike,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Building
} from 'lucide-react';
import { dbStore, normalizePhone } from '../../services/dbStore';
import { MotorcycleModel, CustomerRequest, RequestLimitCheck } from '../../types';
import { WILAYAS, getCitiesForWilaya } from '../../data/wilayas';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { formatPrice, formatDateTime } from '../../lib/utils';
import { useToast } from '../ui/Toast';

interface MotorcycleRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedModelId?: string;
  onSuccess?: (request: CustomerRequest) => void;
}

export const MotorcycleRequestModal: React.FC<MotorcycleRequestModalProps> = ({
  isOpen,
  onClose,
  preselectedModelId,
  onSuccess
}) => {
  const toast = useToast();
  const currentUser = dbStore.getCurrentUser();
  const models = dbStore.getModels().filter(m => m.is_active);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedModelId, setSelectedModelId] = useState<string>(preselectedModelId || models[0]?.id || '');
  const [wilayaCode, setWilayaCode] = useState<string>(currentUser?.wilaya_code || '16');
  const [city, setCity] = useState<string>('');
  
  // Contact details
  const [firstName, setFirstName] = useState(currentUser?.first_name || '');
  const [lastName, setLastName] = useState(currentUser?.last_name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  // Anti-abuse check
  const [limitCheck, setLimitCheck] = useState<RequestLimitCheck>({ allowed: true, current_count: 0, max_allowed: 2 });
  const [submittedRequest, setSubmittedRequest] = useState<CustomerRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Update dynamic cities list when wilaya changes
  const availableCities = getCitiesForWilaya(wilayaCode);

  useEffect(() => {
    if (availableCities.length > 0 && (!city || !availableCities.includes(city))) {
      setCity(availableCities[0]);
    }
  }, [wilayaCode]);

  useEffect(() => {
    if (preselectedModelId) {
      setSelectedModelId(preselectedModelId);
    }
  }, [preselectedModelId]);

  // Check rolling 7-day anti-abuse limit when user identity or phone changes
  useEffect(() => {
    const check = dbStore.checkCustomerRequestLimit(currentUser?.id, phone);
    setLimitCheck(check);
  }, [currentUser, phone]);

  if (!isOpen) return null;

  const selectedModel = models.find(m => m.id === selectedModelId);
  const selectedWilaya = WILAYAS.find(w => w.code === wilayaCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('Veuillez renseigner votre nom et prénom.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 9) {
      setErrorMessage('Numéro de téléphone algérien invalide (ex: 0550123456).');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Adresse email invalide.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newReq = dbStore.createCustomerRequest({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        motorcycle_model_id: selectedModelId,
        wilaya_code: wilayaCode,
        city: city || availableCities[0] || 'Centre-Ville',
        user_id: currentUser?.id
      });

      setSubmittedRequest(newReq);
      setStep(4); // Success confirmation step
      toast.success('Demande enregistrée !', `Référence : ${newReq.reference}`);
      if (onSuccess) onSuccess(newReq);
    } catch (err: any) {
      setErrorMessage(err.message || 'Erreur lors de la soumission de la demande.');
      toast.error('Échec de la demande', err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSubmittedRequest(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-2xl border border-slate-200">
          
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Bike className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  Demande de Disponibilité Moto
                </h3>
                <p className="text-xs text-slate-300">
                  Réseau officiel VMS Industrie Algérie
                </p>
              </div>
            </div>

            {/* Step progress pills */}
            {step < 4 && (
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className={`px-2.5 py-1 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>1</span>
                <span className="text-slate-600">—</span>
                <span className={`px-2.5 py-1 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>2</span>
                <span className="text-slate-600">—</span>
                <span className={`px-2.5 py-1 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>3</span>
              </div>
            )}
          </div>

          {/* Anti-Abuse Alert Banner (2 requests per 7 days rolling) */}
          <div className="px-6 pt-4">
            {!limitCheck.allowed ? (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-sm">Limite hebdomadaire atteinte</p>
                  <p className="mt-0.5 leading-relaxed">{limitCheck.message}</p>
                  {limitCheck.can_submit_at && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-100 font-semibold text-rose-800 text-[11px]">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Prochaine demande autorisée le : {formatDateTime(limitCheck.can_submit_at)}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-900 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-blue-600" />
                  <span>Règle anti-abus : 2 demandes max / 7 jours glissants</span>
                </div>
                <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                  {limitCheck.remaining} restante(s)
                </span>
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="mx-6 mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Step 1: Model Catalog Selection */}
          {step === 1 && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-800">
                  Choisissez le modèle VMS souhaité :
                </label>
                <span className="text-xs text-slate-500">
                  {models.length} modèles au catalogue
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {models.map(m => {
                  const isSelected = m.id === selectedModelId;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedModelId(m.id)}
                      className={`cursor-pointer rounded-xl border p-3 flex gap-3 transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={m.image_url}
                        alt={m.name}
                        className="h-16 w-16 object-cover rounded-lg flex-shrink-0 bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {m.name}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-1.5 py-0.5 rounded">
                            {m.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {m.engine_cc}cc • {m.cooling} • {m.power_hp} ch
                        </p>
                        <p className="text-xs font-extrabold text-blue-600 mt-1">
                          {formatPrice(m.price_dzd)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-end pt-4 border-t border-slate-100">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedModelId}
                  className="gap-1.5"
                >
                  <span>Continuer (Région & Ville)</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Region & City Dynamic Selection */}
          {step === 2 && (
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={selectedModel?.image_url}
                  alt={selectedModel?.name}
                  className="h-12 w-12 object-cover rounded-lg"
                />
                <div>
                  <p className="text-xs text-slate-500">Modèle sélectionné :</p>
                  <p className="text-sm font-bold text-slate-900">{selectedModel?.name}</p>
                </div>
              </div>

              <div className="space-y-4">
                <Select
                  label="1. Wilaya (Région en Algérie) *"
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
                  label="2. Ville / Commune *"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                >
                  {availableCities.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
                <p className="text-[11px] text-slate-500">
                  Le système identifiera automatiquement le showroom VMS agréé le plus proche de votre commune.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button variant="outline" onClick={() => setStep(1)} className="gap-1.5">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Précédent</span>
                </Button>
                <Button onClick={() => setStep(3)} className="gap-1.5">
                  <span>Mes Coordonnées</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Identity & Submission */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Prénom *"
                  placeholder="Ex: Amine"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  icon={<User className="h-4 w-4" />}
                  required
                />
                <Input
                  label="Nom de famille *"
                  placeholder="Ex: Dahmani"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  icon={<User className="h-4 w-4" />}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Téléphone (Algérie) *"
                  placeholder="Ex: 0550 12 34 56"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  icon={<Phone className="h-4 w-4" />}
                  helperText="Numéro utilisé pour la notification SMS / WhatsApp"
                  required
                />
                <Input
                  label="Adresse Email *"
                  type="email"
                  placeholder="amine.dahmani@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  icon={<Mail className="h-4 w-4" />}
                  required
                />
              </div>

              {/* Summary card before submit */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 text-slate-700">
                <p className="font-bold text-slate-900">Récapitulatif de votre demande :</p>
                <div className="flex justify-between">
                  <span className="text-slate-500">Moto demandée :</span>
                  <span className="font-semibold text-slate-900">{selectedModel?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Localisation :</span>
                  <span className="font-semibold text-slate-900">{city}, {selectedWilaya?.name} ({wilayaCode})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact :</span>
                  <span className="font-semibold text-slate-900">{phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button variant="outline" type="button" onClick={() => setStep(2)} className="gap-1.5">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Précédent</span>
                </Button>
                <Button
                  type="submit"
                  disabled={!limitCheck.allowed}
                  isLoading={isSubmitting}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Soumettre ma demande</span>
                </Button>
              </div>
            </form>
          )}

          {/* Step 4: Confirmation screen */}
          {step === 4 && submittedRequest && (
            <div className="p-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Demande Enregistrée avec Succès !
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Votre demande a été instantanément transmise au système centralisé QUICK VMS.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Référence Unique :</span>
                  <span className="font-mono font-black text-sm text-blue-600">
                    {submittedRequest.reference}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Statut actuel :</span>
                  {submittedRequest.status === 'available_notified' ? (
                    <Badge variant="success">Disponible en Showroom</Badge>
                  ) : (
                    <Badge variant="warning">En attente de stock</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Modèle :</span>
                  <span className="font-bold text-slate-800">{selectedModel?.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Région :</span>
                  <span className="font-bold text-slate-800">{submittedRequest.city} ({submittedRequest.wilaya_code})</span>
                </div>

                {submittedRequest.matched_showroom_id && (
                  <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950">
                    <p className="font-bold flex items-center gap-1.5 text-xs">
                      <Building className="h-4 w-4 text-emerald-600" />
                      Showroom VMS disponible dans votre région !
                    </p>
                    <p className="text-[11px] mt-1">
                      Un exemplaire de ce modèle est actuellement en stock dans votre wilaya. Veuillez consulter l'onglet "Mes Demandes" pour les coordonnées du showroom.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Button onClick={handleClose} className="px-8">
                  Terminer et voir mes demandes
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
