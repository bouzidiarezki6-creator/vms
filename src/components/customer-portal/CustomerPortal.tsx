import React, { useState, useEffect } from 'react';
import {
  Bike,
  Sparkles,
  Search,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Phone,
  Building,
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import { MotorcycleModel, CustomerRequest, RequestLimitCheck } from '../../types';
import { MotorcycleRequestModal } from './MotorcycleRequestModal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatPrice, formatDate } from '../../lib/utils';
import { WILAYAS } from '../../data/wilayas';

export const CustomerPortal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(dbStore.getCurrentUser());
  const [models, setModels] = useState<MotorcycleModel[]>([]);
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [limitCheck, setLimitCheck] = useState<RequestLimitCheck>({ allowed: true, current_count: 0, max_allowed: 2 });
  
  // Modal state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(undefined);
  
  // Category & search filter
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshData = () => {
    const user = dbStore.getCurrentUser();
    setCurrentUser(user);
    setModels(dbStore.getModels().filter(m => m.is_active));
    setRequests(dbStore.getCustomerRequests(user?.id));
    setLimitCheck(dbStore.checkCustomerRequestLimit(user?.id, user?.phone));
  };

  useEffect(() => {
    refreshData();
    return dbStore.subscribe(refreshData);
  }, []);

  const categories = ['Tous', 'Scooter', 'Maxi Scooter', 'Roadster', 'Trail Adventure'];

  const filteredModels = models.filter(m => {
    const matchesCategory = selectedCategory === 'Tous' || m.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenRequest = (modelId?: string) => {
    setSelectedModelId(modelId);
    setIsRequestModalOpen(true);
  };

  const handlePreorderRedirect = (modelId?: string) => {
    dbStore.trackPreorderRedirect({
      user_id: currentUser?.id,
      motorcycle_model_id: modelId,
      wilaya_code: currentUser?.wilaya_code || '16',
    });
    window.open('https://motobladi.dz/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl border border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&auto=format&fit=crop&q=80"
          alt="VMS Algérie Moto"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-overlay"
        />

        <div className="relative z-20 px-6 py-12 sm:px-12 sm:py-16 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Portail National de Disponibilité — VMS Industrie</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Trouvez votre moto VMS en Algérie en temps réel.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Vérifiez instantanément la disponibilité de votre modèle favori dans les 58 wilayas ou soumettez une demande prioritaire auprès du réseau officiel des showrooms VMS.
          </p>

          {/* Action & Anti-Abuse Status */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={() => handleOpenRequest()}
              className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 font-bold gap-2 text-sm"
            >
              <Bike className="h-5 w-5" />
              <span>Soumettre une demande de disponibilité</span>
            </Button>

            <button
              onClick={() => handlePreorderRedirect()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold transition-colors backdrop-blur-sm"
            >
              <span>Précommander sur Motobladi.dz</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>

          {/* Quota Indicator */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Règle anti-abus 7 jours :</span>
              <span className="font-bold text-white">
                {limitCheck.allowed ? `${limitCheck.remaining} demande(s) disponible(s)` : 'Quota atteint (2/2)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mes Demandes En Cours Section */}
      {requests.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">Mes Demandes de Disponibilité</h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {requests.length} demande(s) enregistrée(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map(req => {
              const wilaya = WILAYAS.find(w => w.code === req.wilaya_code);
              return (
                <Card key={req.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <span className="font-mono text-xs font-bold text-blue-600">
                      {req.reference}
                    </span>
                    {req.status === 'available_notified' && (
                      <Badge variant="success" icon={<CheckCircle2 className="h-3 w-3" />}>
                        Disponible !
                      </Badge>
                    )}
                    {req.status === 'pending' && (
                      <Badge variant="warning" icon={<Clock className="h-3 w-3" />}>
                        En attente stock
                      </Badge>
                    )}
                    {req.status === 'fulfilled' && (
                      <Badge variant="info">Livrée / Vendu</Badge>
                    )}
                    {req.status === 'preorder_redirected' && (
                      <Badge variant="purple">Précommande</Badge>
                    )}
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <img
                        src={req.model?.image_url}
                        alt={req.model?.name}
                        className="h-16 w-16 object-cover rounded-lg bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{req.model?.name}</h4>
                        <p className="text-xs text-blue-600 font-bold mt-0.5">
                          {req.model ? formatPrice(req.model.price_dzd) : ''}
                        </p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          <span>{req.city}, {wilaya?.name}</span>
                        </p>
                      </div>
                    </div>

                    {/* Matched Showroom Box if motorcycle is available! */}
                    {req.matched_showroom && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                          <Building className="h-4 w-4 text-emerald-600" />
                          <span>Disponible au Showroom :</span>
                        </div>
                        <p className="font-semibold text-slate-900">{req.matched_showroom.name}</p>
                        <p className="text-[11px] text-slate-600">{req.matched_showroom.address}</p>
                        <p className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>Tél : {req.matched_showroom.phone}</span>
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                      <span>Soumise le {formatDate(req.created_at)}</span>
                      {req.status === 'pending' && (
                        <button
                          onClick={() => handlePreorderRedirect(req.motorcycle_model_id)}
                          className="text-blue-600 font-semibold hover:underline flex items-center gap-0.5"
                        >
                          <span>Précommander</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Catalogue Gamme Motos Section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Gamme Motos & Scooters VMS Industrie
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Consultez les spécifications techniques et faites une demande de disponibilité instantanée.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un modèle..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredModels.map(model => (
            <div
              key={model.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={model.image_url}
                  alt={model.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {model.category}
                </span>
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                  {model.brand}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {model.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                    <div>
                      <span className="text-slate-400 block">Cylindrée:</span>
                      <span className="font-semibold text-slate-900">{model.engine_cc} cc</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Puissance:</span>
                      <span className="font-semibold text-slate-900">{model.power_hp} ch</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Refroidissement:</span>
                      <span className="font-semibold text-slate-900">{model.cooling}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Alimentation:</span>
                      <span className="font-semibold text-slate-900">{model.fuel_system}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Prix public conseillé</span>
                      <span className="text-lg font-black text-slate-900">
                        {formatPrice(model.price_dzd)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleOpenRequest(model.id)}
                      className="w-full text-xs font-bold gap-1.5"
                    >
                      <span>Demander disponibilité</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preorder Redirection Card to motobladi.dz */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
            <span>Précommande Officielle</span>
          </div>
          <h3 className="text-2xl font-black">
            Votre moto n'est pas disponible en showroom ?
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
            Ne passez pas à côté de votre modèle. Effectuez une précommande directe et sécurisée sur la plateforme partenaire <strong className="text-white">motobladi.dz</strong> pour garantir votre réservation sur le prochain arrivage d'usine.
          </p>
        </div>

        <button
          onClick={() => handlePreorderRedirect()}
          className="flex-shrink-0 px-6 py-3.5 rounded-xl bg-white text-amber-700 hover:bg-amber-50 font-black text-sm shadow-md transition-all flex items-center gap-2 group"
        >
          <span>Accéder à Motobladi.dz</span>
          <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Request Modal */}
      <MotorcycleRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        preselectedModelId={selectedModelId}
      />
    </div>
  );
};
