import React from 'react';
import {
  LayoutDashboard,
  Bike,
  ArrowRightLeft,
  DollarSign,
  AlertTriangle,
  Users,
  Plus,
  ShoppingBag,
  Layers
} from 'lucide-react';
import { Button } from '../ui/Button';

export type ShowroomSubTab = 'overview' | 'inventory' | 'transfers' | 'sales' | 'dormant' | 'requests';

interface PortalNavbarProps {
  activeSubTab: ShowroomSubTab;
  setActiveSubTab: (tab: ShowroomSubTab) => void;
  onOpenAddModal: () => void;
  onOpenSaleModal: () => void;
  totalStockCount?: number;
  activeTransfersCount?: number;
  dormantStockCount?: number;
  pendingRequestsCount?: number;
}

export const PortalNavbar: React.FC<PortalNavbarProps> = ({
  activeSubTab,
  setActiveSubTab,
  onOpenAddModal,
  onOpenSaleModal,
  totalStockCount = 0,
  activeTransfersCount = 0,
  dormantStockCount = 0,
  pendingRequestsCount = 0
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
        <button
          onClick={() => setActiveSubTab('overview')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'overview'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Vue d'ensemble</span>
        </button>

        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'inventory'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bike className="h-4 w-4" />
          <span>Stock & Inventaire</span>
          {totalStockCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              activeSubTab === 'inventory' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
            }`}>
              {totalStockCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('transfers')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'transfers'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ArrowRightLeft className="h-4 w-4" />
          <span>Transferts Réseau</span>
          {activeTransfersCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              activeSubTab === 'transfers' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
            }`}>
              {activeTransfersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('sales')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'sales'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="h-4 w-4" />
          <span>Ventes & Factures</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dormant')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'dormant'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className={`h-4 w-4 ${dormantStockCount > 0 && activeSubTab !== 'dormant' ? 'text-amber-500' : ''}`} />
          <span>Stock Dormant (&gt;90j)</span>
          {dormantStockCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              activeSubTab === 'dormant' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800 animate-pulse'
            }`}>
              {dormantStockCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('requests')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'requests'
              ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Demandes Locales</span>
          {pendingRequestsCount > 0 && (
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
              activeSubTab === 'requests' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
            }`}>
              {pendingRequestsCount}
            </span>
          )}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <Button
          size="sm"
          onClick={onOpenAddModal}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold gap-1.5 py-2"
        >
          <Plus className="h-4 w-4" />
          <span>Ajouter Moto</span>
        </Button>

        <Button
          size="sm"
          onClick={onOpenSaleModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold gap-1.5 py-2 shadow-sm"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Enregistrer Vente</span>
        </Button>
      </div>
    </div>
  );
};
