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
  ArrowRight,
  Gauge,
  Fuel,
  SlidersHorizontal,
  ChevronRight,
  Eye
} from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import { api } from '../../services/api';
import { MotorcycleModel, CustomerRequest, RequestLimitCheck } from '../../types';
import { MotorcycleRequestModal } from './MotorcycleRequestModal';
import { TrackRequestModal } from './TrackRequestModal';
import { ShowroomDirectoryModal } from './ShowroomDirectoryModal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatPrice, formatDate } from '../../lib/utils';
import { WILAYAS } from '../../data/wilayas';
import logoImg from '../../assets/logo.png';

export const CustomerPortal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(dbStore.getCurrentUser());
  const [models, setModels] = useState<MotorcycleModel[]>([]);
  const [requests, setRequests] = useState<CustomerRequest[]>([]);
  const [limitCheck, setLimitCheck] = useState<RequestLimitCheck>({ allowed: true, current_count: 0, max_allowed: 2 });
  
  // Modals state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedModelId, setSelectedModelId] = useState<string | undefined>(undefined);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isShowroomsModalOpen, setIsShowroomsModalOpen] = useState(false);
  const [detailModel, setDetailModel] = useState<MotorcycleModel | null>(null);

  // Category & search & brand filter
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [selectedBrand, setSelectedBrand] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshData = async () => {
    const user = dbStore.getCurrentUser();
    setCurrentUser(user);
    const m = await api.getModels();
    setModels(m);
    setRequests(dbStore.getCustomerRequests(user?.id));
    const limit = await api.checkLimit(user?.id, user?.phone);
    setLimitCheck(limit);
  };

  useEffect(() => {
    refreshData();
    const unsub = dbStore.subscribe(refreshData);
    return () => unsub();
  }, []);

  const categories = ['Tous', 'Scooter', 'Maxi Scooter', 'Roadster', 'Trail Adventure'];
  const brands = ['Tous', 'VMS', 'Keeway', 'Benelli'];

  const filteredModels = models.filter(m => {
    const matchesCategory = selectedCategory === 'Tous' || m.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesBrand = selectedBrand === 'Tous' || m.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
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
      {/* Hero Section with Official QUICK by VMS Branding */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-red-950/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&auto=format&fit=crop&q=80"
          alt="VMS Algérie Moto"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30 mix-blend-luminosity"
        />

        <div className="relative z-20 px-6 py-10 sm:px-12 sm:py-14 max-w-4xl space-y-6">
          {/* Logo badge in Hero */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-black/90 p-1.5 border border-red-900/60 shadow-lg shadow-red-950/40 flex items-center justify-center">
              <img src={logoImg} alt="QUICK by VMS" className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-sans">QUICK</span>
                <span className="text-red-500 font-serif italic text-sm font-bold">by</span>
                <span className="bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded shadow">VMS</span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                Plateforme Officielle des Disponibilités Motos en Algérie
              </p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Vérifiez la disponibilité de votre moto VMS en temps réel.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Accédez instantanément aux stocks des <strong>58 wilayas</strong>, soumettez une demande prioritaire auprès du réseau VMS ou suivez votre commande en direct grâce au <strong>Compte Global</strong>.
          </p>

          {/* Action Hub */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={() => handleOpenRequest()}
              className="bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-600/30 font-bold gap-2 text-sm"
            >
              <Bike className="h-5 w-5" />
              <span>Demander une disponibilité</span>
            </Button>

            <button
              onClick={() => setIsTrackModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold transition-colors backdrop-blur-sm"
            >
              <Search className="h-4 w-4 text-red-400" />
              <span>Suivre ma demande</span>
            </button>

            <button
              onClick={() => setIsShowroomsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold transition-colors backdrop-blur-sm"
            >
              <MapPin className="h-4 w-4 text-slate-300" />
              <span>Showrooms (58 wilayas)</span>
            </button>

            <button
              onClick={() => handlePreorderRedirect()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 text-sm font-semibold transition-colors backdrop-blur-sm"
            >
              <span>Précommander (Motobladi)</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>

          {/* Quota & Protection Badge */}
          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Règle anti-abus 7 jours :</span>
              <span className="font-bold text-white">
                {limitCheck.allowed ? `${limitCheck.remaining} demande(s) restante(s)` : 'Quota atteint (2/2)'}
              </span>
            </div>

            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400">Réseau certifié VMS, Keeway & Benelli Algérie</span>
          </div>
        </div>
      </div>

      {/* Mes Demandes En Cours Section */}
      {requests.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
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
                <Card key={req.id} className="overflow-hidden hover:shadow-md transition-shadow border-slate-200">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <span className="font-mono text-xs font-bold text-red-600">
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
                        className="h-16 w-16 object-cover rounded-xl bg-slate-100 shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{req.model?.name}</h4>
                        <p className="text-xs text-red-600 font-bold mt-0.5">
                          {req.model ? formatPrice(req.model.price_dzd) : ''}
                        </p>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span>{req.city}, {wilaya?.name}</span>
                        </p>
                      </div>
                    </div>

                    {/* Matched Showroom Box if motorcycle is available */}
                    {req.matched_showroom && (
                      <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                          <Building className="h-4 w-4 text-emerald-600" />
                          <span>Disponible au Showroom :</span>
                        </div>
                        <p className="font-semibold text-slate-900">{req.matched_showroom.name}</p>
                        <p className="text-[11px] text-slate-600">{req.matched_showroom.address}</p>
                        <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
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
                          className="text-red-600 font-semibold hover:underline flex items-center gap-0.5"
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
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Catalogue & Gamme QUICK by VMS
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Consultez les caractéristiques techniques et demandez la disponibilité dans votre wilaya.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un modèle ou marque..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
            />
          </div>
        </div>

        {/* Filters bar: Brands & Categories */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          {/* Brand tabs */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 mr-1">Marque :</span>
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedBrand === brand
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-bold text-slate-400 mr-1">Catégorie :</span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredModels.map(model => (
            <div
              key={model.id}
              className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Badges */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={model.image_url}
                  alt={model.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/90 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                    {model.brand}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/90 text-slate-800 text-[10px] font-bold backdrop-blur-sm">
                    {model.category}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-black shadow-md">
                    {formatPrice(model.price_dzd)}
                  </span>
                </div>
              </div>

              {/* Model Info */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-base text-slate-900 group-hover:text-red-600 transition-colors">
                    {model.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {model.description}
                  </p>
                </div>

                {/* Specs Pill */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-slate-400" />
                    <span>{model.engine_cc} cc • {model.power_hp} ch</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Fuel className="h-3.5 w-3.5 text-slate-400" />
                    <span>{model.cooling} • {model.fuel_system}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <Button
                    onClick={() => handleOpenRequest(model.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 shadow-sm"
                  >
                    Demander
                  </Button>

                  <button
                    onClick={() => setDetailModel(model)}
                    title="Voir les spécifications"
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-slate-50 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handlePreorderRedirect(model.id)}
                    title="Précommander sur Motobladi.dz"
                    className="p-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Spec Detail Modal */}
      {detailModel && (
        <Modal
          isOpen={Boolean(detailModel)}
          onClose={() => setDetailModel(null)}
          title={detailModel.name}
          subtitle={`${detailModel.brand} — ${detailModel.category}`}
          maxWidth="lg"
        >
          <div className="space-y-6 py-2">
            <div className="relative rounded-2xl overflow-hidden h-64 bg-slate-100">
              <img
                src={detailModel.image_url}
                alt={detailModel.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4">
                <span className="text-xl font-black bg-slate-950/90 text-white px-4 py-2 rounded-xl border border-slate-800 shadow-xl">
                  {formatPrice(detailModel.price_dzd)}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {detailModel.description}
            </p>

            {/* Technical specs table */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                Fiche Technique Officielle VMS
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <span className="text-slate-400">Cylindrée :</span>
                  <p className="font-bold text-slate-800">{detailModel.engine_cc} cc</p>
                </div>
                <div>
                  <span className="text-slate-400">Puissance :</span>
                  <p className="font-bold text-slate-800">{detailModel.power_hp} ch</p>
                </div>
                <div>
                  <span className="text-slate-400">Refroidissement :</span>
                  <p className="font-bold text-slate-800">{detailModel.cooling}</p>
                </div>
                <div>
                  <span className="text-slate-400">Alimentation :</span>
                  <p className="font-bold text-slate-800">{detailModel.fuel_system}</p>
                </div>
                <div>
                  <span className="text-slate-400">Garantie Usine :</span>
                  <p className="font-bold text-emerald-700">12 Mois / 10 000 KM</p>
                </div>
                <div>
                  <span className="text-slate-400">Réseau :</span>
                  <p className="font-bold text-slate-800">58 Wilayas (VMS)</p>
                </div>
              </div>
            </div>

            {/* Modal actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={() => handlePreorderRedirect(detailModel.id)}
                className="px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Précommander sur Motobladi.dz</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>

              <Button
                onClick={() => {
                  const id = detailModel.id;
                  setDetailModel(null);
                  handleOpenRequest(id);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5"
              >
                Demander la disponibilité dans ma Wilaya →
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modals */}
      <MotorcycleRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        preselectedModelId={selectedModelId}
        onSuccess={() => {
          refreshData();
        }}
      />
      <TrackRequestModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />
      <ShowroomDirectoryModal
        isOpen={isShowroomsModalOpen}
        onClose={() => setIsShowroomsModalOpen(false)}
        onRequestModel={() => handleOpenRequest()}
      />
    </div>
  );
};
