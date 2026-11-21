import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { GlobalAccountConfig } from '../../types';
import { dbStore } from '../../services/dbStore';
import { useToast } from '../ui/Toast';
import { Sliders, RotateCcw, CheckCircle2, AlertTriangle, Calculator } from 'lucide-react';

interface AlgorithmConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (newConfig: GlobalAccountConfig) => void;
}

export const AlgorithmConfigModal: React.FC<AlgorithmConfigModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const toast = useToast();
  const [config, setConfig] = useState<GlobalAccountConfig>(dbStore.getAlgorithmConfig());

  useEffect(() => {
    if (isOpen) {
      setConfig(dbStore.getAlgorithmConfig());
    }
  }, [isOpen]);

  const weightSumPercent = Math.round(
    (config.weightAge +
      config.weightDemand +
      config.weightStockout +
      config.weightVelocity +
      config.weightLogistics) *
      100
  );

  const isBalanced = weightSumPercent === 100;

  const handleWeightChange = (key: keyof GlobalAccountConfig, percentValue: number) => {
    setConfig(prev => ({
      ...prev,
      [key]: percentValue / 100
    }));
  };

  const handleResetDefaults = () => {
    const defaults: GlobalAccountConfig = {
      thresholdDays: 90,
      weightAge: 0.25,
      weightDemand: 0.25,
      weightStockout: 0.20,
      weightVelocity: 0.15,
      weightLogistics: 0.15,
      logisticsBaseFeeDzd: 4000,
      logisticsRatePerKmDzd: 35
    };
    setConfig(defaults);
    toast.info('Paramètres réinitialisés', 'Les valeurs d\'usine de l\'algorithme ont été restaurées.');
  };

  const handleSave = () => {
    if (!isBalanced) {
      toast.error(
        'Pondération déséquilibrée',
        `La somme des 5 pondérations doit être égale à 100% (actuellement: ${weightSumPercent}%).`
      );
      return;
    }

    try {
      const updated = dbStore.updateAlgorithmConfig(config);
      toast.success(
        'Algorithme mis à jour',
        'Les opportunités de transfert ont été recalculées selon les nouvelles pondérations.'
      );
      if (onSave) onSave(updated);
      onClose();
    } catch (err: any) {
      toast.error('Erreur de configuration', err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Paramétrage du Moteur Décisionnel Compte Global"
      subtitle="Ajustement transparent des pondérations et règles d'optimisation"
      maxWidth="lg"
    >
      <div className="space-y-6 text-xs text-slate-700">
        {/* Formula Explanation Banner */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Calculator className="h-4 w-4 text-blue-600" />
            <span>Formule de Scoring Multicritère Transparent (0 — 100)</span>
          </div>
          <div className="font-mono bg-white p-2.5 rounded-xl border border-blue-100 text-blue-950 text-[11px] overflow-x-auto">
            Score = (W_âge × S_âge) + (W_demande × S_demande) + (W_rupture × S_rupture) + (W_vélocité × S_vélocité) + (W_logistique × S_logistique)
          </div>
          <p className="text-[11px] text-blue-800 leading-relaxed">
            Chaque sous-score est normalisé sur une échelle de 0 à 100. Les transferts recommandés sont ensuite classés par priorité : 
            <strong className="text-emerald-700"> Haute (&ge; 75)</strong>, 
            <strong className="text-amber-700"> Moyenne (50–74)</strong>, et 
            <strong className="text-slate-700"> Standard (&lt; 50)</strong>.
          </p>
        </div>

        {/* Weights Balance Indicator */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-slate-600" />
            <span className="font-bold text-slate-800">Somme des 5 Pondérations :</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`font-black text-sm px-2.5 py-0.5 rounded-full ${
                isBalanced
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
              }`}
            >
              {weightSumPercent} %
            </span>
            {isBalanced ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
          </div>
        </div>

        {/* Weights Sliders */}
        <div className="space-y-4">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b pb-1">
            Pondération des Critères Décisionnels
          </h4>

          {/* Weight 1: Stock Age */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800">
                1. Âge du Stock Dormant (W_âge)
              </label>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {Math.round(config.weightAge * 100)} %
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={Math.round(config.weightAge * 100)}
              onChange={e => handleWeightChange('weightAge', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">
              Valorise les unités ayant dépassé 90 jours. Plus la moto est ancienne (ex: 120-180j), plus le sous-score S_âge tend vers 100.
            </p>
          </div>

          {/* Weight 2: Pending Demand */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800">
                2. Demande Clients Non Servie (W_demande)
              </label>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {Math.round(config.weightDemand * 100)} %
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={Math.round(config.weightDemand * 100)}
              onChange={e => handleWeightChange('weightDemand', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">
              Mesure les demandes clients en attente dans le showroom cible pour ce modèle spécifique (S_demande saturé à 4+ demandes = 100).
            </p>
          </div>

          {/* Weight 3: Stockout Risk */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800">
                3. Rupture de Stock Cible (W_rupture)
              </label>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {Math.round(config.weightStockout * 100)} %
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={Math.round(config.weightStockout * 100)}
              onChange={e => handleWeightChange('weightStockout', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">
              Donne la priorité absolue aux showrooms ayant 0 moto disponible en rayon (S_rupture = 100 si stock = 0, 50 si stock = 1).
            </p>
          </div>

          {/* Weight 4: Sales Velocity */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800">
                4. Vélocité Commerciale Historique (W_vélocité)
              </label>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {Math.round(config.weightVelocity * 100)} %
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={Math.round(config.weightVelocity * 100)}
              onChange={e => handleWeightChange('weightVelocity', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">
              Favorise les showrooms démontrant une forte capacité d'écoulement rapide (historique des ventes confirmées de ce modèle).
            </p>
          </div>

          {/* Weight 5: Logistics & Distance */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/50 border border-slate-200">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-800">
                5. Efficience Logistique & Proximité (W_logistique)
              </label>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {Math.round(config.weightLogistics * 100)} %
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="5"
              value={Math.round(config.weightLogistics * 100)}
              onChange={e => handleWeightChange('weightLogistics', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">
              Minimise la distance routière estimée et les coûts de transport en DZD entre wilayas (formule géodésique Haversine + facteur routier 1.25).
            </p>
          </div>
        </div>

        {/* Operational Constraints */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b pb-1">
            Contraintes & Paramètres Métier
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Seuil Éligibilité Stock (Jours)
              </label>
              <input
                type="number"
                min="30"
                max="365"
                value={config.thresholdDays}
                onChange={e => setConfig(prev => ({ ...prev, thresholdDays: Number(e.target.value) || 90 }))}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400">Règle par défaut : 90 jours</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Forfait Base Transport (DZD)
              </label>
              <input
                type="number"
                min="0"
                max="20000"
                step="500"
                value={config.logisticsBaseFeeDzd}
                onChange={e => setConfig(prev => ({ ...prev, logisticsBaseFeeDzd: Number(e.target.value) || 4000 }))}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400">Forfait fixe de manutention</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Coût Kilométrique (DZD / Km)
              </label>
              <input
                type="number"
                min="10"
                max="200"
                step="5"
                value={config.logisticsRatePerKmDzd}
                onChange={e => setConfig(prev => ({ ...prev, logisticsRatePerKmDzd: Number(e.target.value) || 35 }))}
                className="w-full rounded-lg border border-slate-300 p-2 text-xs font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400">Tarif au km parcouru</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleResetDefaults}
            className="gap-1.5 text-xs text-slate-600"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Valeurs d'usine</span>
          </Button>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSave}
              disabled={!isBalanced}
              className="gap-1.5 font-bold"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Enregistrer & Recalculer</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
