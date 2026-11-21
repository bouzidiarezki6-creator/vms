import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Store,
  User,
  Bell,
  LogOut,
  ChevronDown,
  Layers,
  Bike,
  ExternalLink,
  RotateCcw,
  Search,
  MapPin,
  Menu,
  X,
  Server,
  Activity
} from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import { api } from '../../services/api';
import { Profile, Notification } from '../../types';
import { Badge } from '../ui/Badge';
import { Logo } from '../ui/Logo';
import { formatDateTime } from '../../lib/utils';
import { TrackRequestModal } from '../customer-portal/TrackRequestModal';
import { ShowroomDirectoryModal } from '../customer-portal/ShowroomDirectoryModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuthModal
}) => {
  const [currentUser, setCurrentUser] = useState<Profile | null>(dbStore.getCurrentUser());
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Modals
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isShowroomsModalOpen, setIsShowroomsModalOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const user = dbStore.getCurrentUser();
      setCurrentUser(user);
      setNotifications(dbStore.getNotifications(user?.id));
    };
    update();
    const unsubDb = dbStore.subscribe(update);
    const unsubApi = api.subscribeStatus(online => setIsBackendOnline(online));

    return () => {
      unsubDb();
      unsubApi();
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleRoleSwitch = (email: string) => {
    dbStore.loginAs(email);
    setShowRoleSwitcher(false);
  };

  const handleMarkAllRead = () => {
    if (currentUser) {
      dbStore.markAllNotificationsRead(currentUser.id);
    }
  };

  const handleResetData = () => {
    if (confirm('Voulez-vous réinitialiser les données de démonstration aux valeurs initiales ?')) {
      dbStore.resetToFactory();
      window.location.reload();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
        {/* Test Bar / Environment banner */}
        <div className="bg-slate-950 text-white px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>QUICK</span>
              <span className="text-red-500 italic text-[11px]">by</span>
              <span className="bg-red-600 text-[10px] font-black px-1.5 py-0.2 rounded">VMS</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden md:inline text-[11px]">
              Plateforme Intelligente des Disponibilités Motos & Compte Global
            </span>

            {/* Express Backend Live Status */}
            <span
              className={`hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isBackendOnline
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                  : 'bg-blue-950/80 text-blue-300 border border-blue-800'
              }`}
            >
              <Server className="h-2.5 w-2.5" />
              <span>{isBackendOnline ? 'Backend Express (5000) Connecté' : 'Mode Client Local (dbStore)'}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors border border-slate-700"
              >
                <span>Session:</span>
                <span className="text-red-400 font-bold capitalize">
                  {currentUser?.role === 'super_admin' && '👑 Super Admin'}
                  {currentUser?.role === 'showroom_owner' && `🏢 Showroom (${currentUser.first_name})`}
                  {currentUser?.role === 'customer' && `👤 Client (${currentUser.first_name})`}
                  {!currentUser && 'Visiteur Invité'}
                </span>
                <ChevronDown className="h-3 w-3 text-slate-400 ml-0.5" />
              </button>

              {showRoleSwitcher && (
                <div className="absolute right-0 mt-1 w-72 rounded-xl bg-white text-slate-800 shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <p className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Changer d'utilisateur de test :
                  </p>
                  <div className="space-y-1">
                    <button
                      onClick={() => handleRoleSwitch('admin@vms.dz')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">Karim Bensalem</p>
                        <p className="text-[10px] text-slate-500">Super Admin (VMS Algérie)</p>
                      </div>
                      <Badge variant="purple">Admin</Badge>
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('alger@vms.dz')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">Amine Larbi</p>
                        <p className="text-[10px] text-slate-500">Showroom Alger (Hydra)</p>
                      </div>
                      <Badge variant="info">Showroom</Badge>
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('oran@vms.dz')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">Tarek Mansouri</p>
                        <p className="text-[10px] text-slate-500">Showroom Oran (Maraval)</p>
                      </div>
                      <Badge variant="warning">Showroom</Badge>
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('customer@example.com')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">Yacine Hamidi</p>
                        <p className="text-[10px] text-slate-500">Client Acheteur (Alger)</p>
                      </div>
                      <Badge variant="success">Client</Badge>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleResetData}
              title="Réinitialiser les données démo"
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline">Reset Données</span>
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab('home')}
                className="flex items-center text-left group"
              >
                <Logo size="md" variant="badge" />
              </button>

              {/* Navigation Tabs */}
              <nav className="hidden lg:flex items-center gap-1">
                {currentUser?.role === 'customer' || !currentUser ? (
                  <>
                    <button
                      onClick={() => setActiveTab('customer-portal')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        activeTab === 'customer-portal' || activeTab === 'home'
                          ? 'bg-red-50 text-red-700 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Disponibilités
                    </button>
                    <button
                      onClick={() => setIsTrackModalOpen(true)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                    >
                      <Search className="h-3.5 w-3.5 text-red-500" />
                      <span>Suivre ma demande</span>
                    </button>
                    <button
                      onClick={() => setIsShowroomsModalOpen(true)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                    >
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>Showrooms (58 wilayas)</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('catalog')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        activeTab === 'catalog'
                          ? 'bg-red-50 text-red-700 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Catalogue Gamme
                    </button>
                    <a
                      href="https://motobladi.dz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-amber-700 hover:bg-amber-50 transition-colors flex items-center gap-1"
                    >
                      <span>Précommander</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </>
                ) : null}

                {/* Showroom Manager navigation */}
                {(currentUser?.role === 'showroom_owner' || currentUser?.role === 'showroom_staff') && (
                  <>
                    <button
                      onClick={() => setActiveTab('showroom-dashboard')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        activeTab === 'showroom-dashboard'
                          ? 'bg-red-50 text-red-700 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Tableau de Bord
                    </button>
                    <button
                      onClick={() => setActiveTab('compte-global')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === 'compte-global'
                          ? 'bg-red-600 text-white font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Layers className="h-4 w-4" />
                      <span>Compte Global Réseau</span>
                    </button>
                    <button
                      onClick={() => setIsShowroomsModalOpen(true)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    >
                      Réseau VMS
                    </button>
                  </>
                )}

                {/* Super Admin navigation */}
                {currentUser?.role === 'super_admin' && (
                  <>
                    <button
                      onClick={() => setActiveTab('admin-bi')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        activeTab === 'admin-bi'
                          ? 'bg-red-50 text-red-700 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Supervision BI
                    </button>
                    <button
                      onClick={() => setActiveTab('compte-global')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === 'compte-global'
                          ? 'bg-red-600 text-white font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Layers className="h-4 w-4" />
                      <span>Compte Global</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('admin-showrooms')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        activeTab === 'admin-showrooms'
                          ? 'bg-red-50 text-red-700 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Showrooms
                    </button>
                    <button
                      onClick={() => setActiveTab('admin-inventory')}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        activeTab === 'admin-inventory'
                          ? 'bg-red-50 text-red-700 font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Stock Global
                    </button>
                  </>
                )}
              </nav>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              {currentUser && (
                <div className="relative">
                  <button
                    onClick={() => setShowNotifMenu(!showNotifMenu)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 h-4 w-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifMenu && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <h4 className="font-bold text-sm text-slate-900">Notifications VMS</h4>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllRead}
                            className="text-xs text-red-600 hover:underline font-semibold"
                          >
                            Tout marquer comme lu
                          </button>
                        )}
                      </div>

                      <div className="max-h-72 overflow-y-auto space-y-2.5 pt-2">
                        {notifications.length === 0 ? (
                          <p className="text-center py-6 text-xs text-slate-400">
                            Aucune notification récente.
                          </p>
                        ) : (
                          notifications.slice(0, 5).map(n => (
                            <div
                              key={n.id}
                              className={`p-3 rounded-xl text-xs transition-colors ${
                                n.is_read ? 'bg-slate-50 text-slate-600' : 'bg-red-50 text-red-950 border border-red-100'
                              }`}
                            >
                              <p className="font-bold">{n.title}</p>
                              <p className="mt-0.5 text-slate-600">{n.message}</p>
                              <p className="text-[10px] text-slate-400 mt-1">
                                {formatDateTime(n.created_at)}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* User Account / Auth Button */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block text-right">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.first_name} {currentUser.last_name}
                    </p>
                    <p className="text-[10px] text-slate-400 capitalize">{currentUser.role.replace('_', ' ')}</p>
                  </div>
                  <button
                    onClick={() => dbStore.logout()}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Se déconnecter"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Connexion Client
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 animate-in slide-in-from-top">
            <button
              onClick={() => {
                setActiveTab('customer-portal');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50"
            >
              Disponibilités Motos
            </button>
            <button
              onClick={() => {
                setIsTrackModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              <span>Suivre ma demande</span>
            </button>
            <button
              onClick={() => {
                setIsShowroomsModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 flex items-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              <span>Showrooms (58 wilayas)</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('compte-global');
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold bg-red-600 text-white"
            >
              Compte Global Réseau
            </button>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <TrackRequestModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />
      <ShowroomDirectoryModal
        isOpen={isShowroomsModalOpen}
        onClose={() => setIsShowroomsModalOpen(false)}
        onRequestModel={() => setActiveTab('customer-portal')}
      />
    </>
  );
};
