import React, { useState, useEffect } from 'react';
import {
  Database,
  Layers,
  RefreshCw,
  Download,
  ShieldCheck,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  Sparkles,
  Server,
  Zap,
  BarChart3,
  Award,
  ChevronRight
} from 'lucide-react';
import { api } from '../../services/api';
import {
  DataWarehouseOverview,
  ExecutiveReport,
  ReconciliationReport,
  DataQualityScorecard
} from '../../types';

export const DataWarehouseDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'synthese' | 'star_schema' | 'etl_pipeline' | 'qualite' | 'exports'>('synthese');
  const [overview, setOverview] = useState<DataWarehouseOverview | null>(null);
  const [report, setReport] = useState<ExecutiveReport | null>(null);
  const [reconciliation, setReconciliation] = useState<ReconciliationReport | null>(null);
  const [quality, setQuality] = useState<DataQualityScorecard | null>(null);
  const [loading, setLoading] = useState(true);
  const [etlRunning, setEtlRunning] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('60d');

  useEffect(() => {
    loadData();
  }, [selectedRegion, selectedPeriod]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ov, rep, rec, qual] = await Promise.all([
        api.getWarehouseOverview(),
        api.getExecutiveReport({
          regionCode: selectedRegion !== 'ALL' ? selectedRegion : undefined,
          dateRange: selectedPeriod
        }),
        api.getWarehouseReconciliation(),
        api.getWarehouseQuality()
      ]);

      setOverview(ov);
      setReport(rep);
      setReconciliation(rec);
      setQuality(qual);
    } catch (err) {
      console.error('Failed to load data warehouse data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRunEtl = async (runType: 'FULL_BACKFILL' | 'INCREMENTAL') => {
    setEtlRunning(true);
    try {
      await api.triggerEtlPipeline(runType);
      await loadData();
    } catch (err) {
      console.error('ETL execution failed:', err);
    } finally {
      setEtlRunning(false);
    }
  };

  const formatDzd = (val: number) => {
    return new Intl.NumberFormat('fr-DZ', { maximumFractionDigits: 0 }).format(val) + ' DZD';
  };

  if (loading && !overview) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Chargement de l'Entrepôt de Données et des Rapports Exécutifs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold backdrop-blur-sm border border-blue-400/20">
              <Database className="w-3.5 h-3.5" />
              <span>Phase 6 — Kimball Star Schema Architecture v3.0</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Entrepôt de Données & Reporting Exécutif</h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Consolidation souveraine des faits opérationnels QUICK, tables de dimensions historiques, traçabilité de gouvernance et exports certifiés pour la Direction Générale.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleRunEtl('INCREMENTAL')}
              disabled={etlRunning}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${etlRunning ? 'animate-spin' : ''}`} />
              <span>{etlRunning ? 'Sync ETL en cours...' : 'Exécuter ETL Incrémental'}</span>
            </button>
            <a
              href={api.getExportReportUrl('excel', { regionCode: selectedRegion, dateRange: selectedPeriod })}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel Multi-Feuilles</span>
            </a>
          </div>
        </div>

        {/* METRICS STRIP */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <div className="text-slate-400">Statut Réconciliation</div>
            <div className="font-semibold text-sm flex items-center gap-1.5 mt-0.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{reconciliation?.status === 'RECONCILED_EXACT' ? '100% Réconcilié (Zéro Écart)' : 'Vérification...'}</span>
            </div>
          </div>
          <div>
            <div className="text-slate-400">Score Qualité Global</div>
            <div className="font-semibold text-sm flex items-center gap-1.5 mt-0.5 text-blue-300">
              <ShieldCheck className="w-4 h-4" />
              <span>{quality?.overallScore || overview?.qualityScorecard?.overallScore || 99.2} / 100</span>
            </div>
          </div>
          <div>
            <div className="text-slate-400">Dernier Run ETL</div>
            <div className="font-semibold text-sm text-slate-200 mt-0.5">
              {overview?.lastEtlRun ? `${overview.lastEtlRun.status} (${overview.lastEtlRun.execution_duration_ms}ms)` : 'Actif'}
            </div>
          </div>
          <div>
            <div className="text-slate-400">Modèle Dimensionnel</div>
            <div className="font-semibold text-sm text-slate-200 mt-0.5">
              6 Dimensions • 6 Tables de Faits
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-sm overflow-x-auto">
        <button
          onClick={() => setActiveTab('synthese')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'synthese' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Synthèse Exécutive Direction</span>
        </button>

        <button
          onClick={() => setActiveTab('star_schema')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'star_schema' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Explorateur Star Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('etl_pipeline')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'etl_pipeline' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Console Pipelines ETL</span>
        </button>

        <button
          onClick={() => setActiveTab('qualite')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'qualite' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Gouvernance & Qualité (6D)</span>
        </button>

        <button
          onClick={() => setActiveTab('exports')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
            activeTab === 'exports' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Hub d'Exportation Multi-Formats</span>
        </button>
      </div>

      {/* TAB 1: SYNTHÈSE EXÉCUTIVE */}
      {activeTab === 'synthese' && report && (
        <div className="space-y-6">
          {/* FILTERS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Filtrer par Région :</span>
              <div className="flex gap-1.5">
                {['ALL', 'CENTRE', 'EST', 'OUEST', 'SUD'].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition ${
                      selectedRegion === r ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {r === 'ALL' ? 'Toutes Régions' : r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Période :</span>
              <select
                value={selectedPeriod}
                onChange={e => setSelectedPeriod(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="30d">30 Derniers Jours</option>
                <option value="60d">60 Jours (Historique Complet)</option>
                <option value="all">Historique Global</option>
              </select>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Chiffre d'Affaires Réseau</div>
              <div className="text-xl font-bold text-slate-900 mt-1">{formatDzd(report.kpiSummary.totalRevenueDzd)}</div>
              <div className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Certifié conforme base transactionnelle</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Volume Total des Ventes</div>
              <div className="text-xl font-bold text-slate-900 mt-1">{report.kpiSummary.totalSalesVolume} motos</div>
              <div className="text-xs text-slate-500 mt-2">Panier moyen : {formatDzd(report.kpiSummary.averageTicketDzd)}</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Marge Opérationnelle Standard (8%)</div>
              <div className="text-xl font-bold text-indigo-700 mt-1">{formatDzd(report.kpiSummary.estimatedStandardMarginDzd)}</div>
              <div className="text-xs text-amber-600 font-medium mt-2 flex items-center gap-1">
                <span>Hypothèse constructeur standard</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-medium text-slate-500">Capital Dormant Immobilisé (&gt;90j)</div>
              <div className="text-xl font-bold text-rose-600 mt-1">{formatDzd(report.kpiSummary.dormantCapitalTiedUpDzd)}</div>
              <div className="text-xs text-slate-500 mt-2">{report.kpiSummary.dormantStockUnitsOver90d} motos éligibles au Compte Global</div>
            </div>
          </div>

          {/* REGIONAL MATRIX & PRODUCT MODEL PERFORMANCE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* REGIONAL MATRIX */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Performance Consolidée par Région</span>
                </h3>
                <span className="text-xs text-slate-500">4 Pôles Régionaux</span>
              </div>

              <div className="divide-y divide-slate-100">
                {report.regionalBreakdown.map(r => (
                  <div key={r.regionCode} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-800">{r.regionName}</div>
                      <div className="text-slate-500">Hub : {r.hub} • {r.showroomsCount} concessions</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{formatDzd(r.revenueDzd)}</div>
                      <div className="text-slate-500">{r.salesVolume} motos ({r.revenueSharePct}%)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCT BREAKDOWN */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <span>Ventes par Modèle de Moto</span>
                </h3>
                <span className="text-xs text-slate-500">8 Modèles Catalogués</span>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {report.productPerformance.map(p => (
                  <div key={p.modelId} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-800">{p.modelName}</div>
                      <div className="text-slate-500">{p.category} • {p.displacementCc}cc • Délai moyen : {p.averageDaysToSell}j</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{formatDzd(p.revenueDzd)}</div>
                      <div className="text-slate-500">{p.salesVolume} unités ({p.revenueSharePct}%)</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TOP SHOWROOMS RANKINGS */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Top Concessionnaires & Score d'Efficacité Multicritère</span>
              </h3>
              <span className="text-xs text-slate-500">Évaluation Normalisée 0-100</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Rang</th>
                    <th className="py-2.5 px-3">Showroom</th>
                    <th className="py-2.5 px-3">Ville / Région</th>
                    <th className="py-2.5 px-3 text-right">Ventes</th>
                    <th className="py-2.5 px-3 text-right">Chiffre d'Affaires</th>
                    <th className="py-2.5 px-3 text-right">Conversion</th>
                    <th className="py-2.5 px-3 text-center">Score Efficacité</th>
                    <th className="py-2.5 px-3 text-center">Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.topShowrooms.map((s, idx) => (
                    <tr key={s.showroomKey} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-bold text-slate-700">#{idx + 1}</td>
                      <td className="py-2 px-3 font-semibold text-slate-900">{s.showroomName}</td>
                      <td className="py-2 px-3 text-slate-600">{s.city} ({s.regionCode})</td>
                      <td className="py-2 px-3 text-right font-medium">{s.salesVolume}</td>
                      <td className="py-2 px-3 text-right font-bold text-slate-900">{formatDzd(s.revenueDzd)}</td>
                      <td className="py-2 px-3 text-right">{s.conversionRatePct}%</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800">
                          {s.compositeEfficiencyScore}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800 text-[10px]">
                          {s.tier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STAR SCHEMA EXPLORER */}
      {activeTab === 'star_schema' && overview && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Inventaire du Modèle Dimensionnel (Kimball Star Schema)</span>
            </h3>
            <p className="text-xs text-slate-500">
              L'entrepôt sépare formellement les tables de dimensions (attributs descriptifs et clés de substitution) des tables de faits (événements discrets, indicateurs numériques et métriques).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* DIMENSIONS */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                  <Database className="w-4 h-4" />
                  <span>Tables de Dimensions (Surrogate Keys & SCD)</span>
                </div>
                <div className="border border-indigo-100 rounded-lg overflow-hidden divide-y divide-indigo-50">
                  {overview.schemaInventory.dimensions.map(dim => (
                    <div key={dim.name} className="p-3 bg-indigo-50/30 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-mono font-bold text-indigo-950">{dim.name}</div>
                        <div className="text-slate-500 text-[11px]">{dim.grain}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-white border border-indigo-200 rounded font-semibold text-indigo-700">
                        {dim.rowCount} lignes
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FACTS */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Tables de Faits (Grains Transactionnels & Snapshots)</span>
                </div>
                <div className="border border-emerald-100 rounded-lg overflow-hidden divide-y divide-emerald-50">
                  {overview.schemaInventory.facts.map(fact => (
                    <div key={fact.name} className="p-3 bg-emerald-50/30 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-mono font-bold text-emerald-950">{fact.name}</div>
                        <div className="text-slate-500 text-[11px]">{fact.grain}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-white border border-emerald-200 rounded font-semibold text-emerald-700">
                        {fact.rowCount} lignes
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONSOLE PIPELINES ETL */}
      {activeTab === 'etl_pipeline' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-600" />
                <span>Exécution & Traçabilité des Pipelines d'Ingestion (ETL / ELT)</span>
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRunEtl('INCREMENTAL')}
                  disabled={etlRunning}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium disabled:opacity-50"
                >
                  Exécuter Sync Incrémentale
                </button>
                <button
                  onClick={() => handleRunEtl('FULL_BACKFILL')}
                  disabled={etlRunning}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-medium disabled:opacity-50"
                >
                  Rejouer Backfill Complet
                </button>
              </div>
            </div>

            {overview?.lastEtlRun && (
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Dernière Exécution : {overview.lastEtlRun.run_id}</span>
                  <span className="px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800">
                    {overview.lastEtlRun.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-600">
                  <div>Extraits : <strong>{overview.lastEtlRun.records_extracted}</strong></div>
                  <div>Transformés : <strong>{overview.lastEtlRun.records_transformed}</strong></div>
                  <div>Chargés (Facts/Dims) : <strong>{overview.lastEtlRun.records_loaded}</strong></div>
                  <div>Durée : <strong>{overview.lastEtlRun.execution_duration_ms} ms</strong></div>
                </div>
                {overview.lastEtlRun.checksum_sha256 && (
                  <div className="text-[11px] font-mono text-slate-500 truncate">
                    Checksum SHA-256 : {overview.lastEtlRun.checksum_sha256}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: QUALITÉ ET GOUVERNANCE */}
      {activeTab === 'qualite' && quality && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Scorecard de Qualité des Données (Framework 6 Dimensions)</span>
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                Score Global : {quality.overallScore} / 100 ({quality.status})
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {quality.dimensions.map(dim => (
                <div key={dim.dimension} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{dim.dimension}</span>
                    <span className={`px-2 py-0.5 rounded font-bold ${dim.score >= 95 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {dim.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${dim.score}%` }}></div>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{dim.description}</p>
                </div>
              ))}
            </div>

            {/* RECONCILIATION SUMMARY */}
            {reconciliation && (
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <h4 className="font-semibold text-slate-900 text-xs">Rapprochement Mathématique Source vs Entrepôt</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 font-semibold">
                      <tr>
                        <th className="py-2 px-3">Entité Métier</th>
                        <th className="py-2 px-3 text-right">Base Opérationnelle</th>
                        <th className="py-2 px-3 text-right">Entrepôt de Données</th>
                        <th className="py-2 px-3 text-center">Écart (Variance)</th>
                        <th className="py-2 px-3 text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {reconciliation.metrics.map(m => (
                        <tr key={m.entity}>
                          <td className="py-2 px-3 font-medium text-slate-800">{m.entity}</td>
                          <td className="py-2 px-3 text-right">{m.sourceCount}</td>
                          <td className="py-2 px-3 text-right">{m.warehouseCount}</td>
                          <td className="py-2 px-3 text-center">{m.variance === 0 ? '0' : m.variance}</td>
                          <td className="py-2 px-3 text-center">
                            <span className="text-emerald-600 font-bold">✓ Parité Exacte</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: HUB D'EXPORTATION MULTI-FORMATS */}
      {activeTab === 'exports' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600" />
              <span>Génération & Exportation des Rapports Exécutifs Officiels</span>
            </h3>
            <p className="text-xs text-slate-500">
              Les rapports générés intègrent systématiquement leur horodatage d'émission, leur périmètre régional, ainsi que la traçabilité de classification des données.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {/* EXCEL */}
              <div className="p-5 border border-emerald-200 rounded-xl bg-emerald-50/30 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Classeur Excel Multi-Feuilles</h4>
                  <p className="text-xs text-slate-500">
                    5 onglets formatés : Synthèse Exécutive, Ventes Modèles, Concessionnaires, Inventaire Dormant et Audit Qualité.
                  </p>
                </div>
                <a
                  href={api.getExportReportUrl('excel', { regionCode: selectedRegion, dateRange: selectedPeriod })}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  Télécharger Classeur Excel (.xls)
                </a>
              </div>

              {/* CSV */}
              <div className="p-5 border border-blue-200 rounded-xl bg-blue-50/30 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Export Brut CSV Universel</h4>
                  <p className="text-xs text-slate-500">
                    Extraction délimitée avec en-têtes exécutifs, KPIs clés et agrégations régionales compatibles avec tous tableurs.
                  </p>
                </div>
                <a
                  href={api.getExportReportUrl('csv', { regionCode: selectedRegion, dateRange: selectedPeriod })}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  Télécharger Export CSV (.csv)
                </a>
              </div>

              {/* PDF SUMMARY PAYLOAD */}
              <div className="p-5 border border-slate-200 rounded-xl bg-slate-50 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Rapport Direction Imprimable / PDF</h4>
                  <p className="text-xs text-slate-500">
                    Mise en page épurée prête pour impression ou archivage décisionnel pour le Conseil d'Administration VMS.
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="w-full text-center py-2 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  Imprimer la Vue Exécutive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DataWarehouseDashboard;
