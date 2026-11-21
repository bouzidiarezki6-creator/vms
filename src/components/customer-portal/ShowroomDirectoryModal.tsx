import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Building,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Store,
  Layers
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { api } from '../../services/api';
import { Showroom } from '../../types';
import { WILAYAS } from '../../data/wilayas';

interface ShowroomDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestModel?: () => void;
}

export const ShowroomDirectoryModal: React.FC<ShowroomDirectoryModalProps> = ({
  isOpen,
  onClose,
  onRequestModel
}) => {
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [selectedWilaya, setSelectedWilaya] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      api.getShowrooms().then(data => setShowrooms(data));
    }
  }, [isOpen]);

  const filteredShowrooms = showrooms.filter(s => {
    const matchesWilaya = selectedWilaya === 'all' || s.wilaya_code === selectedWilaya;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesWilaya && matchesSearch;
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Réseau National des Showrooms VMS"
      subtitle="Découvrez nos points de vente officiels à travers les 58 wilayas d'Algérie."
      maxWidth="xl"
    >
      <div className="space-y-6 py-2">
        {/* Filters Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par ville, nom du showroom ou adresse..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="sm:w-60">
            <select
              value={selectedWilaya}
              onChange={(e) => setSelectedWilaya(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
            >
              <option value="all">Toutes les wilayas ({WILAYAS.length})</option>
              {WILAYAS.map(w => (
                <option key={w.code} value={w.code}>
                  {w.code} - {w.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Network Count Badge */}
        <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2">
          <span>
            Affichage de <strong className="text-slate-800">{filteredShowrooms.length}</strong> showroom(s) officiel(s)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Réseau connecté en temps réel via QUICK by VMS
          </span>
        </div>

        {/* Showrooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
          {filteredShowrooms.map(shw => {
            const wilaya = WILAYAS.find(w => w.code === shw.wilaya_code);

            return (
              <div
                key={shw.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Wilaya {shw.wilaya_code} — {wilaya?.name || shw.city}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug">
                      {shw.name}
                    </h3>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 shrink-0">
                    <CheckCircle2 className="h-3 w-3" />
                    Actif
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{shw.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                    <a
                      href={`tel:${shw.phone}`}
                      className="font-mono font-semibold text-red-600 hover:underline"
                    >
                      {shw.phone}
                    </a>
                  </p>
                  <p className="flex items-center gap-2 text-slate-400">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>Dimanche - Jeudi : 08h30 - 17h00 | Samedi : 09h00 - 13h00</span>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${shw.phone}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-red-600 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Contacter</span>
                  </a>

                  {onRequestModel && (
                    <button
                      onClick={() => {
                        onClose();
                        onRequestModel();
                      }}
                      className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
                    >
                      Demander une moto ici →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
