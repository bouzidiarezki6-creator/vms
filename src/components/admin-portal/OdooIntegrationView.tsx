import React, { useState, useEffect } from 'react';
import {
  Server,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Play,
  Sliders,
  FileSpreadsheet,
  Database,
  ArrowRightLeft,
  ShieldCheck,
  RotateCcw,
  Eye,
  Check,
  X,
  Layers,
  ChevronDown,
  Info,
  ExternalLink,
  Zap,
  Activity
} from 'lucide-react';
import { api } from '../../services/api';
import {
  OdooIntegrationState,
  OdooSyncHistoryItem,
  OdooConflictItem,
  OdooSyncSummary
} from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatDateTime } from '../../lib/utils';
import { useToast } from '../ui/Toast';

export const OdooIntegrationView: React.FC = () => {
  const toast = useToast();

  const [state, setState] = useState<OdooIntegrationState | null>(null);
  const [history, setHistory] = useState<OdooSyncHistoryItem[]>([]);
  const [conflicts, setConflicts] = useState<OdooConflictItem[]>([]);
  const [activeTab, setActiveTab] = useState<'history' | 'ownership' | 'conflicts' | 'settings'>('history');

  // Filters
  const [historyFilterStatus, setHistoryFilterStatus] = useState<string>('all');
  const [historyFilterEntity, setHistoryFilterEntity] = useState<string>('all');

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSummary, setSyncSummary] = useState<OdooSyncSummary | null>(null);

  // Settings form
  const [configUrl, setConfigUrl] = useState('');
  const [configDb, setConfigDb] = useState('');
  const [configUsername, setConfigUsername] = useState('');
  const [configApiKey, setConfigApiKey] = useState('');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
  const [syncIntervalMinutes, setSyncIntervalMinutes] = useState(60);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [statusRes, historyRes, conflictsRes] = await Promise.all([
        api.getOdooStatus(),
        api.getOdooHistory({ limit: 100 }),
        api.getOdooConflicts()
      ]);

      if (statusRes) {
        setState(statusRes);
        setConfigUrl(statusRes.connection.url === '(non configuré)' ? '' : statusRes.connection.url);
        setConfigDb(statusRes.connection.db === '(non configuré)' ? '' : statusRes.connection.db);
        setConfigUsername(statusRes.connection.username === '(non configuré)' ? '' : statusRes.connection.username);
        setAutoSyncEnabled(statusRes.scheduler.enabled);
        setSyncIntervalMinutes(statusRes.scheduler.intervalMinutes);
      }
      setHistory(historyRes.items || []);
      setConflicts(conflictsRes || []);
    } catch (err: any) {
      toast.error('Erreur de chargement Odoo', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTestConnection = async () => {
    setIsTesting(true);
    try {
      const res = await api.testOdooConnection();
      if (res.connected) {
        toast.success('Connexion Odoo réussie', res.message);
      } else {
        toast.error('Échec connexion Odoo', res.message);
      }
      await loadData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    } finally {
      setIsTesting(false);
    }
  };

  const handleRunSync = async (dryRun: boolean) => {
    setIsSyncing(true);
    setSyncSummary(null);
    try {
      const summary = await api.syncOdoo({ dryRun });
      setSyncSummary(summary);
      if (dryRun) {
        toast.info(
          'Simulation (Dry-Run) terminée',
          `${summary.totalProcessed} enregistrements évalués avec succès (aucune modification en base).`
        );
      } else {
        toast.success(
          'Synchronisation Odoo terminée',
          `${summary.totalSuccess} enregistrements synchronisés avec succès.`
        );
      }
      await loadData();
    } catch (err: any) {
      toast.error('Erreur de synchronisation', err.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleRetry = async (historyId: string) => {
    try {
      const res = await api.retryOdooHistory(historyId);
      if (res.success) {
        toast.success('Opération réexécutée avec succès');
      } else {
        toast.error('Échec lors de la réexécution', res.error);
      }
      await loadData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  const handleResolveConflict = async (conflictId: string, resolution: string) => {
    try {
      await api.resolveOdooConflict(conflictId, resolution, 'Résolu manuellement depuis le tableau de bord');
      toast.success('Conflit résolu');
      await loadData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateOdooConfig({
        client: {
          url: configUrl.trim(),
          db: configDb.trim(),
          username: configUsername.trim(),
          ...(configApiKey ? { apiKey: configApiKey.trim() } : {})
        },
        scheduler: {
          enabled: autoSyncEnabled,
          intervalMinutes: Number(syncIntervalMinutes) || 60
        }
      });
      toast.success('Configuration Odoo enregistrée avec succès');
      await loadData();
    } catch (err: any) {
      toast.error('Erreur', err.message);
    }
  };

  const handleExportLegacyCsv = () => {
    window.open('http://localhost:5000/api/export/odoo', '_blank');
    toast.info('Exportation CSV Odoo CRM initiée');
  };

  const filteredHistory = history.filter(item => {
    if (historyFilterStatus !== 'all' && item.sync_status !== historyFilterStatus) return false;
    if (historyFilterEntity !== 'all' && item.entity_type !== historyFilterEntity) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="rounded-3xl bg-slate-900 text-white p-7 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-purple-600/10 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              <Server className="h-4 w-4" />
              <span>Couche d'Intégration ERP VMS — Version 3.0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              INTÉGRATION & SYNCHRONISATION ODOO ERP
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Passerelle bidirectionnelle sécurisée entre QUICK by VMS et Odoo ERP. Synchronisation transactionnelle et idempotente des catalogues, stocks, numéros de châssis (VIN), demandes clients (Leads) et transferts inter-showrooms.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              isLoading={isTesting}
              className="bg-slate-800/80 hover:bg-slate-700 text-white border-slate-700 text-xs font-semibold gap-1.5"
            >
              <Activity className="h-3.5 w-3.5 text-emerald-400" />
              <span>Tester Connexion</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRunSync(true)}
              isLoading={isSyncing}
              className="bg-purple-950/60 hover:bg-purple-900 text-purple-200 border-purple-700/60 text-xs font-semibold gap-1.5"
            >
              <Eye className="h-3.5 w-3.5 text-purple-400" />
              <span>Dry-Run (Simulation)</span>
            </Button>

            <Button
              size="sm"
              onClick={() => handleRunSync(false)}
              isLoading={isSyncing}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold gap-1.5 shadow-lg shadow-purple-600/30"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Synchroniser Maintenant</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportLegacyCsv}
              className="text-xs font-semibold gap-1.5 text-slate-300 border-slate-700 hover:bg-slate-800"
              title="Télécharger le fichier CSV historique Odoo CRM"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-amber-400" />
              <span>CSV Fallback</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Connection Status & Health Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-purple-600 bg-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Statut Passerelle Odoo
          </span>
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                state?.connection.authenticated
                  ? 'bg-emerald-500 animate-pulse'
                  : state?.connection.mode === 'SANDBOX_SIMULATION'
                  ? 'bg-blue-500'
                  : 'bg-amber-500'
              }`}
            />
            <strong className="text-sm font-black text-slate-900">
              {state?.connection.mode === 'SANDBOX_SIMULATION'
                ? 'Mode Sandbox (Isolé)'
                : state?.connection.authenticated
                ? 'Connecté (Live ERP)'
                : 'En attente authentification'}
            </strong>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 truncate">
            {state?.connection.url || 'Protocole XML-RPC / JSON-RPC'}
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-emerald-500 bg-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Opérations Réussies
          </span>
          <div className="mt-1 text-2xl font-black text-slate-900">
            {state?.stats.successCount || 0}
          </div>
          <p className="text-[10px] text-emerald-600 font-semibold mt-1">
            {state?.stats.totalMappings || 0} entités mappées (Idempotence active)
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-amber-500 bg-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Simulations (Dry-Run)
          </span>
          <div className="mt-1 text-2xl font-black text-slate-900">
            {state?.stats.dryRunCount || 0}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Audits préventifs sans mutation de base
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-red-500 bg-white">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            Conflits / Échecs
          </span>
          <div className="mt-1 flex items-center gap-3">
            <div className="text-2xl font-black text-slate-900">
              {state?.stats.failedCount || 0}
            </div>
            {state?.stats.unresolvedConflictsCount ? (
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-extrabold">
                {state.stats.unresolvedConflictsCount} conflit(s)
              </span>
            ) : null}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Dernière sync : {state?.stats.lastSyncAt ? formatDateTime(state.stats.lastSyncAt) : 'Jamais'}
          </p>
        </Card>
      </div>

      {/* Dry Run Summary Toast Alert */}
      {syncSummary && (
        <div
          className={`p-4 rounded-2xl border text-xs space-y-2 ${
            syncSummary.dryRun
              ? 'bg-purple-50/80 border-purple-200 text-purple-950'
              : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold">
              {syncSummary.dryRun ? <Eye className="h-4 w-4 text-purple-600" /> : <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              <span>
                {syncSummary.dryRun
                  ? 'Résultats de la Simulation Dry-Run Odoo'
                  : 'Rapport de Synchronisation Exécutée'}
              </span>
            </div>
            <button
              onClick={() => setSyncSummary(null)}
              className="text-slate-400 hover:text-slate-700 text-sm font-bold"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] pt-1">
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block">Total Traités :</span>
              <strong>{syncSummary.totalProcessed}</strong>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block">Succès :</span>
              <strong className="text-emerald-700">{syncSummary.totalSuccess}</strong>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block">Échecs :</span>
              <strong className="text-red-700">{syncSummary.totalFailed}</strong>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block">Ignorés (Idempotent) :</span>
              <strong className="text-slate-700">{syncSummary.totalSkipped}</strong>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200">
              <span className="text-slate-500 block">Conflits détectés :</span>
              <strong className="text-amber-700">{syncSummary.conflictsCount}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 gap-2">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-purple-600 text-purple-700 bg-purple-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Journal de Synchronisation ({history.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ownership')}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'ownership'
                ? 'border-purple-600 text-purple-700 bg-purple-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Matrice de Propriété (Data Ownership)</span>
          </button>

          <button
            onClick={() => setActiveTab('conflicts')}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'conflicts'
                ? 'border-purple-600 text-purple-700 bg-purple-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Conflits & Divergences ({conflicts.filter(c => c.status === 'UNRESOLVED').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'settings'
                ? 'border-purple-600 text-purple-700 bg-purple-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>Paramètres & Planificateur</span>
          </button>
        </div>
      </div>

      {/* TAB 1: HISTORY LOGS */}
      {activeTab === 'history' && (
        <Card className="overflow-hidden">
          <CardHeader className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle>Journal d'Audit des Synchronisations Odoo</CardTitle>
              <p className="text-xs text-slate-500">Traçabilité complète avec empreinte SHA-256 et gestion des reprises</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={historyFilterEntity}
                onChange={e => setHistoryFilterEntity(e.target.value)}
                className="text-xs rounded-lg border border-slate-300 p-1.5 font-semibold text-slate-700"
              >
                <option value="all">Toutes les entités</option>
                <option value="product">Modèles / Produits</option>
                <option value="customer_lead">Demandes CRM</option>
                <option value="motorcycle_lot">Numéros Châssis (VIN)</option>
                <option value="showroom_location">Showrooms</option>
                <option value="sale_order">Ventes</option>
                <option value="stock_transfer">Transferts</option>
              </select>

              <select
                value={historyFilterStatus}
                onChange={e => setHistoryFilterStatus(e.target.value)}
                className="text-xs rounded-lg border border-slate-300 p-1.5 font-semibold text-slate-700"
              >
                <option value="all">Tous les statuts</option>
                <option value="SUCCESS">Succès</option>
                <option value="DRY_RUN">Dry-Run</option>
                <option value="FAILED">Échecs</option>
              </select>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Date / Heure</th>
                  <th className="px-4 py-3">Entité</th>
                  <th className="px-4 py-3">ID QUICK</th>
                  <th className="px-4 py-3">ID Odoo</th>
                  <th className="px-4 py-3">Opération</th>
                  <th className="px-4 py-3">Statut</th>
                  <th className="px-4 py-3">Détails / Empreinte</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-slate-400">
                      Aucune opération de synchronisation enregistrée dans le journal.
                    </td>
                  </tr>
                ) : (
                  filteredHistory.slice(0, 50).map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                        {formatDateTime(item.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-slate-800">{item.entity_type}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-700">
                        {item.quick_record_id}
                      </td>
                      <td className="px-4 py-3 font-mono text-purple-700">
                        {item.odoo_record_id ? `#${item.odoo_record_id}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-[11px] font-semibold text-slate-700">
                        {item.operation}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            item.sync_status === 'SUCCESS'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.sync_status === 'DRY_RUN'
                              ? 'bg-purple-100 text-purple-800'
                              : item.sync_status === 'FAILED'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.sync_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {item.error_details ? (
                          <span className="text-red-600 font-semibold text-[11px] block truncate max-w-xs">
                            {item.error_details}
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] text-slate-400 block truncate max-w-xs">
                            {item.checksum ? `SHA256: ${item.checksum.slice(0, 16)}...` : 'Vérifié'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {item.sync_status === 'FAILED' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRetry(item.id)}
                            className="text-[11px] text-red-700 border-red-300 hover:bg-red-50"
                          >
                            Réessayer
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 2: DATA OWNERSHIP MATRIX */}
      {activeTab === 'ownership' && (
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Matrice de Propriété des Données (Data Ownership & Single Source of Truth)
            </h3>
            <p className="text-xs text-slate-500">
              Règles d'arbitrage strictes pour garantir la cohérence des référentiels d'entreprise entre Odoo ERP et QUICK by VMS.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3">Entité Métier</th>
                  <th className="p-3">Modèle Odoo Natif</th>
                  <th className="p-3">Table PostgreSQL QUICK</th>
                  <th className="p-3">Système Référent (Source of Truth)</th>
                  <th className="p-3">Sens de Synchronisation</th>
                  <th className="p-3">Stratégie en Cas de Conflit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="p-3 font-bold text-slate-900">Produits / Modèles Moto</td>
                  <td className="p-3 font-mono text-purple-700">product.template</td>
                  <td className="p-3 font-mono text-slate-700">motorcycle_models</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-extrabold text-[10px]">
                      ODOO ERP
                    </span>
                  </td>
                  <td className="p-3">Odoo $\rightarrow$ QUICK (Catalogue & Tarifs)</td>
                  <td className="p-3 text-slate-600">Odoo gagne (prix officiel d'usine)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Numéros Châssis (VIN) & Lots</td>
                  <td className="p-3 font-mono text-purple-700">stock.lot</td>
                  <td className="p-3 font-mono text-slate-700">motorcycles</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold text-[10px]">
                      PARTAGÉ (SHARED)
                    </span>
                  </td>
                  <td className="p-3">Odoo $\leftrightarrow$ QUICK (Bi-directionnel)</td>
                  <td className="p-3 text-slate-600">Appariement strict sur VIN unique</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Showrooms & Emplacements</td>
                  <td className="p-3 font-mono text-purple-700">stock.location</td>
                  <td className="p-3 font-mono text-slate-700">showrooms</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      QUICK VMS
                    </span>
                  </td>
                  <td className="p-3">QUICK $\rightarrow$ Odoo (80 Showrooms réseau)</td>
                  <td className="p-3 text-slate-600">QUICK gagne (coordonnées réseau)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Demandes Clients & Précommandes</td>
                  <td className="p-3 font-mono text-purple-700">crm.lead / res.partner</td>
                  <td className="p-3 font-mono text-slate-700">customer_requests</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      QUICK VMS
                    </span>
                  </td>
                  <td className="p-3">QUICK $\rightarrow$ Odoo (Opportunités CRM)</td>
                  <td className="p-3 text-slate-600">QUICK gagne (Anti-abus & Wilayas)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Ventes Showroom & Facturation</td>
                  <td className="p-3 font-mono text-purple-700">sale.order / account.move</td>
                  <td className="p-3 font-mono text-slate-700">sales</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      QUICK VMS
                    </span>
                  </td>
                  <td className="p-3">QUICK $\rightarrow$ Odoo (Facturation & Déstockage)</td>
                  <td className="p-3 text-slate-600">QUICK gagne (Validation Showroom)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Transferts Inter-Showrooms</td>
                  <td className="p-3 font-mono text-purple-700">stock.picking</td>
                  <td className="p-3 font-mono text-slate-700">transfers</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      QUICK COMPTE GLOBAL
                    </span>
                  </td>
                  <td className="p-3">QUICK $\rightarrow$ Odoo (Mouvements internes)</td>
                  <td className="p-3 text-slate-600">QUICK gagne (Algorithme décisionnel)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* TAB 3: CONFLICTS RESOLUTION */}
      {activeTab === 'conflicts' && (
        <Card className="p-6 space-y-4">
          <div>
            <CardTitle>Gestionnaire des Conflits & Divergences de Données</CardTitle>
            <p className="text-xs text-slate-500">
              Résolution manuelle contrôlée pour les écarts dépassant les règles d'arbitrage automatique.
            </p>
          </div>

          {conflicts.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-slate-800">Aucun conflit détecté.</p>
              <p>Toutes les données synchronisées respectent les règles d'intégrité.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {conflicts.map(c => (
                <div key={c.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Entité: {c.entity_type} (Réf: {c.quick_id}) — Champ: <code className="text-purple-700 font-mono">{c.field_name}</code>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                      {c.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 bg-white p-3 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Valeur QUICK :</span>
                      <strong className="text-slate-900 block mt-0.5">{c.quick_value}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Valeur Odoo ERP :</span>
                      <strong className="text-purple-700 block mt-0.5">{c.odoo_value}</strong>
                    </div>
                  </div>

                  {c.status === 'UNRESOLVED' && (
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResolveConflict(c.id, 'RESOLVED_QUICK')}
                        className="text-xs"
                      >
                        Conserver QUICK
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleResolveConflict(c.id, 'RESOLVED_ODOO')}
                        className="text-xs bg-purple-600 hover:bg-purple-500"
                      >
                        Appliquer Odoo
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {/* TAB 4: SETTINGS & SCHEDULER */}
      {activeTab === 'settings' && (
        <Card className="p-6">
          <form onSubmit={handleSaveConfig} className="space-y-5 max-w-2xl text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Configuration de la Connexion Odoo & du Planificateur Automatique
              </h3>
              <p className="text-xs text-slate-500">
                Paramètres enregistrés sur le serveur backend sécurisé. Aucun secret n'est exposé côté client.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  URL du Serveur Odoo (XML-RPC / JSON-RPC) *
                </label>
                <input
                  type="text"
                  value={configUrl}
                  onChange={e => setConfigUrl(e.target.value)}
                  placeholder="https://erp.vms-industrie.com:8069"
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nom de la Base de Données Odoo *
                  </label>
                  <input
                    type="text"
                    value={configDb}
                    onChange={e => setConfigDb(e.target.value)}
                    placeholder="vms_production"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Utilisateur Service Odoo *
                  </label>
                  <input
                    type="text"
                    value={configUsername}
                    onChange={e => setConfigUsername(e.target.value)}
                    placeholder="quick_sync@vms.dz"
                    className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Clé API Odoo ou Mot de Passe (Laisser vide pour ne pas modifier)
                </label>
                <input
                  type="password"
                  value={configApiKey}
                  onChange={e => setConfigApiKey(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Planificateur de Synchronisation en Arrière-Plan
              </h4>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="autoSyncToggle"
                  checked={autoSyncEnabled}
                  onChange={e => setAutoSyncEnabled(e.target.checked)}
                  className="h-4 w-4 rounded text-purple-600 cursor-pointer"
                />
                <label htmlFor="autoSyncToggle" className="font-bold text-slate-800 cursor-pointer">
                  Activer la synchronisation automatique périodique
                </label>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">
                  Intervalle d'exécution (Minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="1440"
                  value={syncIntervalMinutes}
                  onChange={e => setSyncIntervalMinutes(Number(e.target.value))}
                  className="w-48 rounded-lg border border-slate-300 p-2 text-xs font-bold text-slate-900"
                />
                <span className="text-[11px] text-slate-400 ml-2">Ex: 60 minutes = toutes les heures</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <Button type="submit" className="bg-purple-600 hover:bg-purple-500 font-bold gap-2">
                <Check className="h-4 w-4" />
                <span>Enregistrer la Configuration</span>
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
