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
  RotateCcw
} from 'lucide-react';
import { dbStore } from '../../services/dbStore';
import { Profile, Notification } from '../../types';
import { Badge } from '../ui/Badge';
import { formatDateTime } from '../../lib/utils';

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

  useEffect(() => {
    const update = () => {
      const user = dbStore.getCurrentUser();
      setCurrentUser(user);
      setNotifications(dbStore.getNotifications(user?.id));
    };
    update();
    return dbStore.subscribe(update);
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
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-sm">
      {/* Test Bar / Environment banner */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-slate-200">QUICK • VMS Algérie</span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline text-[11px]">
            Plateforme Intelligente Centralisée & Compte Global
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Demo Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors border border-slate-700"
            >
              <span>Rôle actuel:</span>
              <span className="text-blue-400 font-bold capitalize">
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
                  Changer de session de test :
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleRoleSwitch('admin@vms.dz')}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-blue-50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-bold text-slate-900">👑 Ahmed Benali</p>
                      <p className="text-[10px] text-slate-500">Super Admin (Direction VMS)</p>
                    </div>
                    <Badge variant="purple">Super Admin</Badge>
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('alger@vms.dz')}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-blue-50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-bold text-slate-900">🏢 Karim Belkacem</p>
                      <p className="text-[10px] text-slate-500">Showroom Alger Centre</p>
                    </div>
                    <Badge variant="info">Showroom</Badge>
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('oran@vms.dz')}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-blue-50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-bold text-slate-900">🏢 Yacine Mansouri</p>
                      <p className="text-[10px] text-slate-500">Showroom Oran (Stock dormant 115j)</p>
                    </div>
                    <Badge variant="aging">Dormant</Badge>
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('amine.dahmani@gmail.com')}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-blue-50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-bold text-slate-900">👤 Amine Dahmani</p>
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
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Bike className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900 font-sans">
                    QUICK
                  </span>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide">
                    VMS
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Motorcycle Platform</p>
              </div>
            </button>

            {/* Navigation Tabs based on Role */}
            <nav className="hidden md:flex items-center gap-1">
              {currentUser?.role === 'customer' && (
                <>
                  <button
                    onClick={() => setActiveTab('customer-portal')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'customer-portal'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Demande de Moto
                  </button>
                  <button
                    onClick={() => setActiveTab('customer-requests')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'customer-requests'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Mes Demandes
                  </button>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'catalog'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Catalogue Gamme
                  </button>
                  <a
                    href="https://motobladi.dz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      dbStore.trackPreorderRedirect({
                        user_id: currentUser?.id,
                        wilaya_code: currentUser?.wilaya_code,
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors ml-2"
                  >
                    <span>Précommande Motobladi</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </>
              )}

              {currentUser?.role === 'showroom_owner' && (
                <>
                  <button
                    onClick={() => setActiveTab('showroom-dashboard')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'showroom-dashboard'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Tableau de Bord
                  </button>
                  <button
                    onClick={() => setActiveTab('showroom-stock')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'showroom-stock'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Gestion du Stock
                  </button>
                  <button
                    onClick={() => setActiveTab('compte-global')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'compte-global'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Layers className="h-4 w-4 text-blue-600" />
                    <span>Compte Global</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('showroom-transfers')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'showroom-transfers'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Transferts
                  </button>
                  <button
                    onClick={() => setActiveTab('showroom-sales')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'showroom-sales'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Ventes
                  </button>
                </>
              )}

              {currentUser?.role === 'super_admin' && (
                <>
                  <button
                    onClick={() => setActiveTab('admin-bi')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'admin-bi'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Business Intelligence
                  </button>
                  <button
                    onClick={() => setActiveTab('admin-showrooms')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'admin-showrooms'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Store className="h-4 w-4" />
                    <span>Showrooms</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('admin-inventory')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'admin-inventory'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Stock Réseau
                  </button>
                  <button
                    onClick={() => setActiveTab('compte-global')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'compte-global'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Layers className="h-4 w-4 text-blue-600" />
                    <span>Compte Global</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('admin-requests')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      activeTab === 'admin-requests'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    Demandes Clients
                  </button>
                  <button
                    onClick={() => setActiveTab('admin-audit')}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      activeTab === 'admin-audit'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <ShieldAlert className="h-4 w-4 text-slate-500" />
                    <span>Audit Logs</span>
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Right actions: Notifications & User profile */}
          <div className="flex items-center gap-3">
            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifMenu && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                      {unreadCount > 0 && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">
                          {unreadCount} nouvelle(s)
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Tout marquer lu
                      </button>
                    )}
                  </div>

                  <div className="mt-3 max-h-72 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">Aucune notification.</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => dbStore.markNotificationRead(n.id)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                            !n.is_read
                              ? 'bg-blue-50/60 border-blue-200/80 font-medium'
                              : 'bg-white border-slate-100 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-bold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400">
                              {formatDateTime(n.created_at)}
                            </span>
                          </div>
                          <p className="mt-1 text-slate-700 line-clamp-3 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User profile / Log in */}
            {currentUser ? (
              <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm overflow-hidden ring-2 ring-slate-100">
                  {currentUser.avatar_url ? (
                    <img src={currentUser.avatar_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span>{currentUser.first_name[0]}</span>
                  )}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-slate-900">
                    {currentUser.first_name} {currentUser.last_name}
                  </p>
                  <p className="text-[11px] text-slate-500 capitalize">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => dbStore.logout()}
                  title="Déconnexion"
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition-colors"
              >
                <User className="h-4 w-4" />
                <span>Connexion</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
