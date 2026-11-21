import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Building,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Bike
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { CustomerRequest } from '../../types';
import { api } from '../../services/api';
import { formatDate } from '../../lib/utils';
import { WILAYAS } from '../../data/wilayas';

interface TrackRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const TrackRequestModal: React.FC<TrackRequestModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<CustomerRequest[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setErrorMsg(null);

    try {
      const data = await api.trackRequest(query);
      if (!data || data.length === 0) {
        setErrorMsg('Aucune demande trouvée avec cette référence ou ce numéro de téléphone.');
        setResults([]);
      } else {
        setResults(data);
      }
    } catch {
      setErrorMsg('Erreur lors de la recherche. Veuillez vérifier votre saisie.');
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'available_notified':
        return 3;
      case 'fulfilled':
        return 4;
      case 'cancelled':
        return -1;
      case 'pending':
      default:
        return 1;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Suivre ma Demande de Moto"
      subtitle="Consultez en direct l'état d'avancement de votre demande avec votre référence ou numéro de téléphone."
      maxWidth="lg"
    >
      <div className="space-y-6 py-2">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Ex: REQ-2026-1001 ou 0550 12 34 56"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm font-medium"
            />
          </div>
          <Button
            type="submit"
            isLoading={isSearching}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6"
          >
            Rechercher
          </Button>
        </form>

        {/* Demo Tip */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-center justify-between">
          <span>
            💡 Astuce de test : essayez la référence <span className="font-mono font-bold text-slate-700">REQ-2026-1001</span> ou le numéro <span className="font-mono font-bold text-slate-700">0661889900</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setQuery('REQ-2026-1001');
              setTimeout(() => {
                api.trackRequest('REQ-2026-1001').then(r => setResults(r));
              }, 50);
            }}
            className="text-red-600 hover:underline font-semibold ml-2 shrink-0"
          >
            Tester cet exemple
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-600" />
            <div>
              <p className="font-bold">Demande introuvable</p>
              <p className="text-xs text-red-600 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {results && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {results.length} demande(s) trouvée(s) :
            </p>

            {results.map((req) => {
              const wilaya = WILAYAS.find((w) => w.code === req.wilaya_code);
              const step = getStatusStep(req.status);

              return (
                <div
                  key={req.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4 hover:border-red-200 transition-colors"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-black text-slate-900">
                          {req.reference}
                        </span>
                        {req.status === 'available_notified' ? (
                          <Badge variant="success">✓ Moto Disponible</Badge>
                        ) : req.status === 'fulfilled' ? (
                          <Badge variant="info">Livrée / Récupérée</Badge>
                        ) : (
                          <Badge variant="warning">En attente d'arrivage</Badge>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Soumise le {formatDate(req.created_at)} pour {req.first_name} {req.last_name}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">
                        {req.model?.name || 'Moto VMS'}
                      </p>
                      <p className="text-xs text-slate-400">
                        Wilaya {req.wilaya_code} — {wilaya?.name || req.city}
                      </p>
                    </div>
                  </div>

                  {/* Status Progress Stepper */}
                  <div className="py-2">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="space-y-1">
                        <div className="h-2 rounded-full bg-emerald-500 w-full" />
                        <span className="font-bold text-emerald-700">1. Enregistrée</span>
                      </div>
                      <div className="space-y-1">
                        <div
                          className={`h-2 rounded-full w-full ${
                            step >= 2 ? 'bg-emerald-500' : 'bg-amber-400 animate-pulse'
                          }`}
                        />
                        <span className={step >= 2 ? 'font-bold text-emerald-700' : 'font-semibold text-amber-700'}>
                          2. Recherche Réseau
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div
                          className={`h-2 rounded-full w-full ${
                            step >= 3 ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                        />
                        <span className={step >= 3 ? 'font-bold text-emerald-700' : 'text-slate-400'}>
                          3. Showroom Attribué
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Matched Showroom Contact Card */}
                  {req.matched_showroom ? (
                    <div className="rounded-xl bg-emerald-50/80 border border-emerald-200 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Showroom VMS de Retrait Attribué</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {req.matched_showroom.name}
                      </h4>
                      <p className="text-xs text-slate-600 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{req.matched_showroom.address}</span>
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <a
                          href={`tel:${req.matched_showroom.phone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          <span>Appeler le Showroom : {req.matched_showroom.phone}</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-600 space-y-1">
                      <p className="font-semibold text-slate-800">
                        Votre demande est active dans le système Compte Global.
                      </p>
                      <p className="text-slate-500">
                        Dès qu'un arrivage ou un transfert vers votre région est validé, vous recevrez une notification immédiate par SMS/In-App.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Modal>
  );
};
