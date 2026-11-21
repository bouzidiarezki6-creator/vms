import React, { useState, useEffect, Suspense, lazy } from 'react';
import { dbStore } from './services/dbStore';
import { Profile } from './types';
import { Navbar } from './components/layout/Navbar';
import { CustomerAuthModal } from './components/auth/CustomerAuthModal';
import { ToastProvider } from './components/ui/Toast';
import { PageSkeleton } from './components/ui/Skeleton';
import { Logo } from './components/ui/Logo';
import { Bike, Database, Layers, ExternalLink, Server } from 'lucide-react';

// ── Lazy-load the four heavy portals so each is in its own JS chunk ──────────
// This cuts the initial bundle from ~860 KB to ~200 KB (gzip ~55 KB).
const CustomerPortal   = lazy(() => import('./components/customer-portal/CustomerPortal').then(m => ({ default: m.CustomerPortal })));
const ShowroomDashboard = lazy(() => import('./components/showroom-portal/ShowroomDashboard').then(m => ({ default: m.ShowroomDashboard })));
const CompteGlobalView  = lazy(() => import('./components/compte-global/CompteGlobalView').then(m => ({ default: m.CompteGlobalView })));
const AdminDashboard    = lazy(() => import('./components/admin-portal/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

export function App() {
  const [currentUser, setCurrentUser] = useState<Profile | null>(dbStore.getCurrentUser());
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const u = dbStore.getCurrentUser();
      setCurrentUser(u);
    };
    update();
    return dbStore.subscribe(update);
  }, []);

  // Update default tab based on user role when switching
  useEffect(() => {
    if (currentUser?.role === 'super_admin') {
      setActiveTab('admin-bi');
    } else if (currentUser?.role === 'showroom_owner' || currentUser?.role === 'showroom_staff') {
      setActiveTab('showroom-dashboard');
    } else {
      setActiveTab('customer-portal');
    }
  }, [currentUser?.role]);

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<PageSkeleton />}>
            {/* Customer Portal */}
            {(activeTab === 'home' || activeTab === 'customer-portal' || activeTab === 'customer-requests' || activeTab === 'catalog') && (
              <CustomerPortal />
            )}

            {/* Showroom Dashboard */}
            {(activeTab === 'showroom-dashboard' ||
              activeTab === 'showroom-stock' ||
              activeTab === 'showroom-transfers' ||
              activeTab === 'showroom-sales' ||
              activeTab === 'showroom-dormant' ||
              activeTab === 'showroom-requests') && (
              <ShowroomDashboard
                initialSubTab={
                  activeTab === 'showroom-stock'
                    ? 'inventory'
                    : activeTab === 'showroom-transfers'
                    ? 'transfers'
                    : activeTab === 'showroom-sales'
                    ? 'sales'
                    : activeTab === 'showroom-dormant'
                    ? 'dormant'
                    : activeTab === 'showroom-requests'
                    ? 'requests'
                    : 'overview'
                }
                onNavigateToCompteGlobal={() => setActiveTab('compte-global')}
              />
            )}

            {/* Dedicated Compte Global Interface */}
            {activeTab === 'compte-global' && (
              <CompteGlobalView />
            )}

            {/* Super Admin Dashboard */}
            {activeTab.startsWith('admin-') && (
              <AdminDashboard
                initialSubTab={
                  activeTab === 'admin-showrooms'
                    ? 'showrooms'
                    : activeTab === 'admin-inventory'
                    ? 'inventory'
                    : activeTab === 'admin-requests'
                    ? 'requests'
                    : activeTab === 'admin-audit'
                    ? 'audit'
                    : 'bi'
                }
                onNavigateToCompteGlobal={() => setActiveTab('compte-global')}
              />
            )}
          </Suspense>
        </main>

        {/* Enterprise SaaS Footer */}
        <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Logo size="sm" variant="badge" />
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-600">
              <button
                onClick={() => setActiveTab('compte-global')}
                className="hover:text-red-600 flex items-center gap-1 font-medium transition-colors"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Compte Global Réseau</span>
              </button>
              <span>•</span>
              <a
                href="https://motobladi.dz/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  dbStore.trackPreorderRedirect({
                    user_id: currentUser?.id,
                    wilaya_code: currentUser?.wilaya_code
                  });
                }}
                className="hover:text-amber-600 flex items-center gap-1 font-semibold text-amber-700"
              >
                <span>Motobladi.dz (Précommandes)</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Server className="h-3.5 w-3.5 text-emerald-600" />
                <span>Backend Express REST API (Port 5000)</span>
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              © 2026 VMS Industrie Algérie. Tous droits réservés.
            </p>
          </div>
        </footer>

        {/* Auth Modal */}
        <CustomerAuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </div>
    </ToastProvider>
  );
}

export default App;
