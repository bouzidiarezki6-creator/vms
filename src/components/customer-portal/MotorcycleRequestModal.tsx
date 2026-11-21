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
  Building,
  Layers,
  ArrowRight
} from 'lucide-react';
import { dbStore, normalizePhone } from '../../services/dbStore';
import { api } from '../../services/api';
import { MotorcycleModel, CustomerRequest, RequestLimitCheck } from '../../types';
import { WILAYAS, getCitiesForWilaya } from '../../data/wilayas';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { formatPrice, formatDateTime } from '../../lib/utils';
import { useToast } from '../ui/Toast';
import logoImg from '../../assets/logo.png';

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

  // Live availability pre-check for Step 2
  const regionalShowrooms = dbStore.getShowrooms().filter(s => s.wilaya_code === wilayaCode && s.is_active);
  const regionalUnits = dbStore.getMotorcycles().filter(
    m => m.model_id === selectedModelId && m.status === 'available' && regionalShowrooms.some(s => s.id === m.showroom_id)
  );
  const hasLocalStock = regionalUnits.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await api.createCustomerRequest({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        motorcycle_model_id: selectedModelId,
        wilaya_code: wilayaCode,
        city: city || availableCities[0] || 'Centre-Ville',
        user_id: currentUser?.id
      });

      const newReq = response.request;
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
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-2xl border border-slate-200">
          
          {/* Header */}
          <div className="border-b border-slate-800 bg-slate-950 px-6 py-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 p-1 flex items-center justify-center">
                <img src={logoImg} alt="QUICK by VMS" className="h-full w-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-black text-white font-sans">QUICK</span>
                  <span className="text-red-500 font-serif italic text-xs font-bold">by</span>
                  <span className="bg-red-600 text-[10px] font-black px-1.5 py-0.2 rounded">VMS</span>
                </div>
                <h3 className="text-sm font-bold text-slate-200">
                  Demande de Disponibilité Moto
                </h3>
              </div>
            </div>

            {/* Step progress pills */}
            {step < 4 && (
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className={`px-2.5 py-1 rounded-full ${step >= 1 ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>1</span>
                <span className="text-slate-600">—</span>
                <span className={`px-2.5 py-1 rounded-full ${step >= 2 ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>2</span>
                <span className="text-slate-600">—</span>
                <span className={`px-2.5 py-1 rounded-full ${step >= 3 ? 'bg-red-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}>3</span>
              </div>
            )}
          </div>

          {/* Anti-Abuse Alert Banner (2 requests per 7 days rolling) */}
          <div className="px-6 pt-4">
            {!limitCheck.allowed ? (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
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
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Règle anti-abus 7 jours : 2 demandes maximum</span>
                </div>
                <span className="bg-emerald-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                  {limitCheck.remaining} restante(s)
                </span>
              </div>
            )}
          </div>

          {/* Error Banner if any */}
          {errorMessage && (
            <div className="mx-6 mt-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {/* Step 1: Select Motorcycle Model */}
          {step === 1 && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900">
                  Étape 1 : Choisissez le modèle de moto ou scooter
                </h4>
                <span className="text-xs text-slate-400">{models.length} modèles disponibles</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {models.map(m => {
                  const isSelected = m.id === selectedModelId;
                  return (
                    <div
                      key={m.id}
                      onClick={() => setSelectedModelId(m.id)}
                      className={`cursor-pointer rounded-xl border p-3 flex gap-3 transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img
                        src={m.image_url}
                        alt={m.name}
                        className="h-16 w-16 object-cover rounded-lg shrink-0 bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {m.name}
                          </span>
                          <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-1.5 py-0.5 rounded">
                            {m.brand}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {m.engine_cc}cc • {m.cooling} • {m.power_hp} ch
                        </p>
                        <p className="text-xs font-black text-red-600 mt-1">
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
                  className="bg-red-600 hover:bg-red-700 text-white font-bold gap-1.5"
                >
                  <span>Continuer (Région & Ville)</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Region & City Dynamic Selection with Live Availability Check */}
          {step === 2 && (
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={selectedModel?.image_url}
                  alt={selectedModel?.name}
                  className="h-12 w-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Modèle sélectionné :</p>
                  <p className="text-sm font-bold text-slate-900">{selectedModel?.name}</p>
                </div>
                <span className="text-xs font-black text-red-600">{formatPrice(selectedModel?.price_dzd || 0)}</span>
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

                {/* Real-Time Live Availability Feedback Badge */}
                {hasLocalStock ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-900">Excellente nouvelle ! Stock local détecté</p>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        Ce modèle est actuellement en stock au showroom VMS de votre wilaya ({regionalShowrooms[0]?.name}). Vous obtiendrez une confirmation immédiate !
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                    <Layers className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-900">Prise en charge Compte Global</p>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Rupture temporaire dans cette wilaya. Votre demande sera automatiquement jumelée avec les stocks dormants du réseau VMS ou le prochain arrivage d'usine.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="gap-1.5"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Retour</span>
                </Button>

                <Button
                  onClick={() => setStep(3)}
                  disabled={!wilayaCode}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold gap-1.5"
                >
                  <span>Vos Coordonnées</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Details & Validation */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Étape 3 : Vos coordonnées pour la confirmation
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Prénom *"
                  placeholder="Ex: Karim"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
                <Input
                  label="Nom *"
                  placeholder="Ex: Bensalem"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Numéro de Téléphone (Algérie) *"
                  placeholder="Ex: 0550 12 34 56"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                />
                <Input
                  label="Adresse Email *"
                  type="email"
                  placeholder="Ex: client@email.dz"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Summary box */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span>Modèle sélectionné :</span>
                  <strong className="text-slate-900">{selectedModel?.name}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Région de retrait :</span>
                  <strong className="text-slate-900">{city}, Wilaya {wilayaCode} ({selectedWilaya?.name})</strong>
                </div>
                <div className="flex items-center justify-between text-slate-700">
                  <span>Prix indicatif :</span>
                  <strong className="text-red-600 font-bold">{formatPrice(selectedModel?.price_dzd || 0)}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="gap-1.5"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Retour</span>
                </Button>

                <Button
                  type="submit"
                  disabled={!limitCheck.allowed || isSubmitting}
                  isLoading={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2"
                >
                  <span>Confirmer la demande</span>
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}

          {/* Step 4: Success Confirmation */}
          {step === 4 && submittedRequest && (
            <div className="p-8 text-center space-y-5">
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-in zoom-in-75">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  Demande Enregistrée avec Succès !
                </h3>
                <p className="text-xs text-slate-500">
                  Votre demande a été prise en compte par le système <strong>QUICK by VMS</strong>.
                </p>
              </div>

              {/* Reference Badge */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white inline-block shadow-lg">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Votre Référence de Demande
                </p>
                <p className="text-2xl font-black font-mono text-red-400 mt-0.5">
                  {submittedRequest.reference}
                </p>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Conservez cette référence. Vous recevrez une notification par SMS dès attribution d'un showroom de retrait.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={handleClose}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6"
                >
                  Fermer
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
