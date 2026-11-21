import React, { useState } from 'react';
import {
  FileText,
  DollarSign,
  Plus,
  Search,
  Calendar,
  CheckCircle2,
  Phone,
  User,
  ShoppingBag,
  Download,
  CreditCard,
  Building,
  Bike
} from 'lucide-react';
import { Sale, Motorcycle } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { formatPrice, formatDate } from '../../lib/utils';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';

interface ReorderHistoryViewProps {
  sales: Sale[];
  showroomId: string;
  onOpenSaleModal: () => void;
  onRefresh: () => void;
}

export const ReorderHistoryView: React.FC<ReorderHistoryViewProps> = ({
  sales,
  showroomId,
  onOpenSaleModal,
  onRefresh
}) => {
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSaleDetail, setSelectedSaleDetail] = useState<Sale | null>(null);

  const filteredSales = sales.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      s.reference.toLowerCase().includes(q) ||
      s.customer_name.toLowerCase().includes(q) ||
      s.customer_phone.toLowerCase().includes(q) ||
      (s.motorcycle?.vin && s.motorcycle.vin.toLowerCase().includes(q)) ||
      (s.motorcycle?.model?.name && s.motorcycle.model.name.toLowerCase().includes(q))
    );
  });

  const totalRevenue = sales.reduce((sum, s) => sum + Number(s.sale_price || 0), 0);

  const handlePrintInvoice = (sale: Sale) => {
    toast.success('Facture générée', `Impression du bon de livraison et facture ${sale.reference}`);
  };

  return (
    <div className="space-y-6">
      {/* Revenue & Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-white border-emerald-200">
          <div className="flex items-center justify-between text-xs text-emerald-800">
            <span className="font-bold">Chiffre d'Affaires Showroom</span>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2">
            {formatPrice(totalRevenue)}
          </p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Total des ventes enregistrées</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold">Volume des Ventes</span>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {sales.length}
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Motos facturées et livrées</p>
        </Card>

        <Card className="p-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500">Nouvelle Facturation</span>
            <p className="text-xs text-slate-400 mt-1">Enregistrer un bon de commande ou facture client</p>
          </div>
          <Button
            size="sm"
            onClick={onOpenSaleModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 mt-2"
          >
            <Plus className="h-4 w-4" />
            <span>Enregistrer Vente</span>
          </Button>
        </Card>
      </div>

      {/* Sales Invoices List */}
      <Card>
        <CardHeader className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base font-bold text-slate-900">
              Historique des Ventes & Factures Showroom
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Toutes les transactions commerciales enregistrées dans ce point de vente.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher facture, client, VIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredSales.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Aucune vente trouvée avec ces critères.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Réf. Facture</th>
                    <th className="py-3 px-4">Moto & Modèle</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">Montant Vente</th>
                    <th className="py-3 px-4">Paiement</th>
                    <th className="py-3 px-4">Date Vente</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                        {sale.reference}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={sale.motorcycle?.model?.image_url}
                            alt=""
                            className="h-9 w-9 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">
                              {sale.motorcycle?.model?.name || 'Moto VMS'}
                            </p>
                            <p className="font-mono text-[10px] text-slate-400">
                              Châssis : {sale.motorcycle?.vin || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{sale.customer_name}</p>
                        <p className="font-mono text-[11px] text-slate-400 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{sale.customer_phone}</span>
                        </p>
                      </td>

                      <td className="py-3 px-4 font-black text-slate-900">
                        {formatPrice(sale.sale_price)}
                      </td>

                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            sale.payment_method === 'CASH'
                              ? 'success'
                              : sale.payment_method === 'FACILITE'
                              ? 'warning'
                              : 'info'
                          }
                        >
                          {sale.payment_method}
                        </Badge>
                      </td>

                      <td className="py-3 px-4 text-slate-500">
                        {formatDate(sale.sale_date)}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedSaleDetail(sale)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 text-[11px] font-bold transition-colors"
                        >
                          Détails
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sale Detail Invoice Modal */}
      {selectedSaleDetail && (
        <Modal
          isOpen={Boolean(selectedSaleDetail)}
          onClose={() => setSelectedSaleDetail(null)}
          title={`Facture Officielle ${selectedSaleDetail.reference}`}
          subtitle="Détails de la vente et certificat d'affectation véhicule"
          maxWidth="md"
        >
          <div className="space-y-4 py-2">
            <div className="rounded-2xl bg-slate-950 text-white p-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Montant Total Encaissé
                </p>
                <p className="text-2xl font-black text-emerald-400 mt-0.5">
                  {formatPrice(selectedSaleDetail.sale_price)}
                </p>
              </div>
              <Badge variant="success">PAYÉ / LIVRÉ</Badge>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Modèle Moto :</span>
                <strong className="text-slate-900">{selectedSaleDetail.motorcycle?.model?.name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Numéro de Châssis (VIN) :</span>
                <strong className="font-mono text-slate-900">{selectedSaleDetail.motorcycle?.vin}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Client Acheteur :</span>
                <strong className="text-slate-900">{selectedSaleDetail.customer_name}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Téléphone Client :</span>
                <strong className="text-slate-900">{selectedSaleDetail.customer_phone}</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Mode de Paiement :</span>
                <strong className="text-slate-900">{selectedSaleDetail.payment_method}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date d'émission :</span>
                <strong className="text-slate-900">{formatDate(selectedSaleDetail.sale_date)}</strong>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setSelectedSaleDetail(null)}
                className="text-xs"
              >
                Fermer
              </Button>
              <Button
                onClick={() => {
                  handlePrintInvoice(selectedSaleDetail);
                  setSelectedSaleDetail(null);
                }}
                className="bg-slate-900 text-white font-bold text-xs gap-1.5"
              >
                <Download className="h-4 w-4" />
                <span>Imprimer Facture</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
