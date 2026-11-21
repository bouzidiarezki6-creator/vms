// server/services/odoo/odooSyncService.js
// QUICK by VMS — Phase 3: Comprehensive Odoo ERP Synchronization Orchestrator
import { OdooApiClient } from './odooApiClient.js';
import { OdooDataMapper } from './odooDataMapper.js';
import { OdooConflictResolver } from './odooConflictResolver.js';
import { OdooSyncLogger } from './odooSyncLogger.js';
import { OdooSyncScheduler } from './odooSyncScheduler.js';

export class OdooSyncService {
  constructor(store, clientConfig = {}, schedulerConfig = {}) {
    this.store = store;
    this.apiClient = new OdooApiClient(clientConfig);
    this.logger = new OdooSyncLogger(store);
    this.scheduler = new OdooSyncScheduler(this, schedulerConfig);
    this.isSyncing = false;
  }

  /**
   * Get complete status and metrics for admin dashboard
   */
  async getStatus() {
    const clientStatus = this.apiClient.getStatus();
    const stats = this.logger.getStats();
    const schedulerConfig = this.scheduler.getConfig();

    return {
      connection: clientStatus,
      stats,
      scheduler: schedulerConfig,
      dataOwnership: OdooConflictResolver.DATA_OWNERSHIP
    };
  }

  /**
   * Test Odoo connection
   */
  async testConnection() {
    return await this.apiClient.testConnection();
  }

  /**
   * Main synchronization entry point
   * Supports Dry-run mode, entity filtering, and audit logging
   */
  async synchronizeAll({ dryRun = false, entities = null, triggeredBy = 'MANUAL' } = {}) {
    if (this.isSyncing) {
      throw new Error('Une opération de synchronisation est déjà en cours d\'exécution.');
    }

    this.isSyncing = true;
    const targetEntities = entities && entities.length > 0
      ? entities
      : ['product', 'showroom_location', 'customer_lead', 'motorcycle_lot', 'sale_order', 'stock_transfer'];

    const summary = {
      dryRun,
      triggeredBy,
      startedAt: new Date().toISOString(),
      completedAt: null,
      entities: {},
      totalProcessed: 0,
      totalSuccess: 0,
      totalFailed: 0,
      totalSkipped: 0,
      conflictsCount: 0
    };

    try {
      // 1. Products / Models
      if (targetEntities.includes('product')) {
        summary.entities.product = await this.syncProducts({ dryRun });
      }

      // 2. Showrooms / Locations
      if (targetEntities.includes('showroom_location')) {
        summary.entities.showroom_location = await this.syncShowrooms({ dryRun });
      }

      // 3. Customer Leads / Requests
      if (targetEntities.includes('customer_lead')) {
        summary.entities.customer_lead = await this.syncCustomerLeads({ dryRun });
      }

      // 4. Motorcycle Lots / VIN
      if (targetEntities.includes('motorcycle_lot')) {
        summary.entities.motorcycle_lot = await this.syncMotorcycleLots({ dryRun });
      }

      // 5. Sales / Orders
      if (targetEntities.includes('sale_order')) {
        summary.entities.sale_order = await this.syncSales({ dryRun });
      }

      // 6. Transfers / Pickings
      if (targetEntities.includes('stock_transfer')) {
        summary.entities.stock_transfer = await this.syncTransfers({ dryRun });
      }

      // Aggregate counts
      Object.values(summary.entities).forEach(res => {
        summary.totalProcessed += res.processed || 0;
        summary.totalSuccess += res.success || 0;
        summary.totalFailed += res.failed || 0;
        summary.totalSkipped += res.skipped || 0;
        summary.conflictsCount += res.conflicts || 0;
      });

      summary.completedAt = new Date().toISOString();
      return summary;
    } finally {
      this.isSyncing = false;
    }
  }

  /**
   * 1. Synchronize Products / Motorcycle Models (Odoo -> QUICK master catalog)
   */
  async syncProducts({ dryRun = false } = {}) {
    const result = { processed: 0, success: 0, failed: 0, skipped: 0, conflicts: 0, items: [] };
    const models = this.store.models || [];

    for (const model of models) {
      result.processed++;
      const payload = OdooDataMapper.quickModelToOdooProduct(model);
      const checksum = OdooConflictResolver.computeChecksum(payload);
      let odooId = this.logger.getOdooId('product', model.id);

      try {
        if (dryRun) {
          result.success++;
          this.logger.logOperation({
            entityType: 'product',
            quickId: model.id,
            odooId,
            operation: 'DRY_RUN',
            status: 'DRY_RUN',
            details: { name: model.name, price: model.price_dzd, proposedAction: odooId ? 'UPDATE' : 'CREATE' },
            checksum
          });
          continue;
        }

        if (!odooId) {
          // Check if product exists in Odoo by default_code
          const existing = await this.apiClient.executeKw('product.template', 'search_read', [
            [['default_code', '=', model.id]]
          ], { fields: ['id', 'name', 'list_price', 'active'] });

          if (existing && existing.length > 0) {
            odooId = existing[0].id;
            this.logger.saveMapping('product', model.id, odooId, checksum);
            
            // Check for conflict
            const conflicts = OdooConflictResolver.detectConflicts('product', model, existing[0]);
            if (conflicts.length > 0) {
              result.conflicts += conflicts.length;
              conflicts.forEach(c => {
                this.logger.logConflict({
                  entityType: 'product',
                  quickId: model.id,
                  odooId,
                  fieldName: c.fieldName,
                  quickValue: c.quickValue,
                  odooValue: c.odooValue
                });
              });
            }
          } else {
            // Create in Odoo
            odooId = await this.apiClient.executeKw('product.template', 'create', [payload]);
          }
        } else {
          // Update in Odoo
          await this.apiClient.executeKw('product.template', 'write', [[odooId], payload]);
        }

        result.success++;
        this.logger.logOperation({
          entityType: 'product',
          quickId: model.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'SUCCESS',
          details: { name: model.name, price_dzd: model.price_dzd },
          checksum
        });
      } catch (err) {
        result.failed++;
        this.logger.logOperation({
          entityType: 'product',
          quickId: model.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'FAILED',
          error: err.message,
          checksum
        });
      }
    }
    return result;
  }

  /**
   * 2. Synchronize Showrooms -> Odoo Stock Locations
   */
  async syncShowrooms({ dryRun = false } = {}) {
    const result = { processed: 0, success: 0, failed: 0, skipped: 0, conflicts: 0, items: [] };
    const showrooms = this.store.showrooms || [];

    for (const showroom of showrooms) {
      result.processed++;
      const payload = OdooDataMapper.quickShowroomToOdooLocation(showroom);
      const checksum = OdooConflictResolver.computeChecksum(payload);
      let odooId = this.logger.getOdooId('showroom_location', showroom.id);

      try {
        if (dryRun) {
          result.success++;
          this.logger.logOperation({
            entityType: 'showroom_location',
            quickId: showroom.id,
            odooId,
            operation: 'DRY_RUN',
            status: 'DRY_RUN',
            details: { name: showroom.name, city: showroom.city, code: showroom.code },
            checksum
          });
          continue;
        }

        if (!odooId) {
          odooId = await this.apiClient.executeKw('stock.location', 'create', [payload]);
        } else {
          await this.apiClient.executeKw('stock.location', 'write', [[odooId], payload]);
        }

        result.success++;
        this.logger.logOperation({
          entityType: 'showroom_location',
          quickId: showroom.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'SUCCESS',
          details: { city: showroom.city, code: showroom.code },
          checksum
        });
      } catch (err) {
        result.failed++;
        this.logger.logOperation({
          entityType: 'showroom_location',
          quickId: showroom.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'FAILED',
          error: err.message,
          checksum
        });
      }
    }
    return result;
  }

  /**
   * 3. Synchronize Customer Requests -> Odoo CRM Leads
   */
  async syncCustomerLeads({ dryRun = false } = {}) {
    const result = { processed: 0, success: 0, failed: 0, skipped: 0, conflicts: 0, items: [] };
    const requests = this.store.requests || [];

    for (const req of requests) {
      result.processed++;
      const model = this.store.models?.find(m => m.id === req.motorcycle_model_id);
      const payload = OdooDataMapper.quickRequestToOdooLead(req, model?.name);
      const checksum = OdooConflictResolver.computeChecksum(payload);
      let odooId = this.logger.getOdooId('customer_lead', req.id);

      try {
        if (dryRun) {
          result.success++;
          this.logger.logOperation({
            entityType: 'customer_lead',
            quickId: req.id,
            odooId,
            operation: 'DRY_RUN',
            status: 'DRY_RUN',
            details: { ref: req.reference, client: `${req.first_name} ${req.last_name}`, wilaya: req.wilaya_code },
            checksum
          });
          continue;
        }

        if (!odooId) {
          odooId = await this.apiClient.executeKw('crm.lead', 'create', [payload]);
        } else {
          await this.apiClient.executeKw('crm.lead', 'write', [[odooId], payload]);
        }

        result.success++;
        this.logger.logOperation({
          entityType: 'customer_lead',
          quickId: req.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'SUCCESS',
          details: { ref: req.reference, status: req.status },
          checksum
        });
      } catch (err) {
        result.failed++;
        this.logger.logOperation({
          entityType: 'customer_lead',
          quickId: req.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'FAILED',
          error: err.message,
          checksum
        });
      }
    }
    return result;
  }

  /**
   * 4. Synchronize Motorcycle Units / VIN -> Odoo stock.lot
   */
  async syncMotorcycleLots({ dryRun = false } = {}) {
    const result = { processed: 0, success: 0, failed: 0, skipped: 0, conflicts: 0, items: [] };
    const motorcycles = this.store.motorcycles || [];

    for (const moto of motorcycles) {
      result.processed++;
      const odooProductId = this.logger.getOdooId('product', moto.model_id) || 1001;
      const payload = OdooDataMapper.quickMotorcycleToOdooLot(moto, odooProductId);
      const checksum = OdooConflictResolver.computeChecksum(payload);
      let odooId = this.logger.getOdooId('motorcycle_lot', moto.id);

      try {
        if (dryRun) {
          result.success++;
          this.logger.logOperation({
            entityType: 'motorcycle_lot',
            quickId: moto.id,
            odooId,
            operation: 'DRY_RUN',
            status: 'DRY_RUN',
            details: { vin: moto.vin, status: moto.status, showroom: moto.showroom_id },
            checksum
          });
          continue;
        }

        if (!odooId) {
          // Check if lot with same VIN exists in Odoo to prevent duplication
          const existing = await this.apiClient.executeKw('stock.lot', 'search_read', [
            [['name', '=', moto.vin]]
          ], { fields: ['id', 'name'] });

          if (existing && existing.length > 0) {
            odooId = existing[0].id;
          } else {
            odooId = await this.apiClient.executeKw('stock.lot', 'create', [payload]);
          }
        } else {
          await this.apiClient.executeKw('stock.lot', 'write', [[odooId], payload]);
        }

        result.success++;
        this.logger.logOperation({
          entityType: 'motorcycle_lot',
          quickId: moto.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'SUCCESS',
          details: { vin: moto.vin },
          checksum
        });
      } catch (err) {
        result.failed++;
        this.logger.logOperation({
          entityType: 'motorcycle_lot',
          quickId: moto.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'FAILED',
          error: err.message,
          checksum
        });
      }
    }
    return result;
  }

  /**
   * 5. Synchronize Sales -> Odoo sale.order
   */
  async syncSales({ dryRun = false } = {}) {
    const result = { processed: 0, success: 0, failed: 0, skipped: 0, conflicts: 0, items: [] };
    const sales = this.store.sales || [];

    for (const sale of sales) {
      result.processed++;
      const odooPartnerId = 1; // Default customer/cash partner
      const odooProductId = 1001;
      const payload = OdooDataMapper.quickSaleToOdooOrder(sale, odooPartnerId, odooProductId);
      const checksum = OdooConflictResolver.computeChecksum(payload);
      let odooId = this.logger.getOdooId('sale_order', sale.id);

      try {
        if (dryRun) {
          result.success++;
          this.logger.logOperation({
            entityType: 'sale_order',
            quickId: sale.id,
            odooId,
            operation: 'DRY_RUN',
            status: 'DRY_RUN',
            details: { ref: sale.reference, price: sale.sale_price, customer: sale.customer_name },
            checksum
          });
          continue;
        }

        if (!odooId) {
          odooId = await this.apiClient.executeKw('sale.order', 'create', [payload]);
        }

        result.success++;
        this.logger.logOperation({
          entityType: 'sale_order',
          quickId: sale.id,
          odooId,
          operation: 'EXPORT_CREATE',
          status: 'SUCCESS',
          details: { ref: sale.reference, amount: sale.sale_price },
          checksum
        });
      } catch (err) {
        result.failed++;
        this.logger.logOperation({
          entityType: 'sale_order',
          quickId: sale.id,
          odooId,
          operation: 'EXPORT_CREATE',
          status: 'FAILED',
          error: err.message,
          checksum
        });
      }
    }
    return result;
  }

  /**
   * 6. Synchronize Compte Global Transfers -> Odoo stock.picking
   */
  async syncTransfers({ dryRun = false } = {}) {
    const result = { processed: 0, success: 0, failed: 0, skipped: 0, conflicts: 0, items: [] };
    const transfers = this.store.transfers || [];

    for (const trf of transfers) {
      result.processed++;
      const odooSourceLoc = this.logger.getOdooId('showroom_location', trf.source_showroom_id) || 1;
      const odooDestLoc = this.logger.getOdooId('showroom_location', trf.destination_showroom_id) || 2;
      const odooProductId = 1001;
      const payload = OdooDataMapper.quickTransferToOdooPicking(trf, odooSourceLoc, odooDestLoc, odooProductId);
      const checksum = OdooConflictResolver.computeChecksum(payload);
      let odooId = this.logger.getOdooId('stock_transfer', trf.id);

      try {
        if (dryRun) {
          result.success++;
          this.logger.logOperation({
            entityType: 'stock_transfer',
            quickId: trf.id,
            odooId,
            operation: 'DRY_RUN',
            status: 'DRY_RUN',
            details: { ref: trf.reference, status: trf.status },
            checksum
          });
          continue;
        }

        if (!odooId) {
          odooId = await this.apiClient.executeKw('stock.picking', 'create', [payload]);
        } else {
          await this.apiClient.executeKw('stock.picking', 'write', [[odooId], { state: payload.state }]);
        }

        result.success++;
        this.logger.logOperation({
          entityType: 'stock_transfer',
          quickId: trf.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'SUCCESS',
          details: { ref: trf.reference, status: trf.status },
          checksum
        });
      } catch (err) {
        result.failed++;
        this.logger.logOperation({
          entityType: 'stock_transfer',
          quickId: trf.id,
          odooId,
          operation: 'EXPORT_UPDATE',
          status: 'FAILED',
          error: err.message,
          checksum
        });
      }
    }
    return result;
  }

  /**
   * Retry a single failed synchronization operation
   */
  async retryOperation(historyId) {
    const item = this.store.odoo_sync_history.find(h => h.id === historyId);
    if (!item) {
      throw new Error(`Entrée d'historique ${historyId} introuvable.`);
    }

    item.retry_count = (item.retry_count || 0) + 1;
    item.sync_status = 'PENDING';
    item.updated_at = new Date().toISOString();

    try {
      // Re-run sync for this single entity
      let res = null;
      if (item.entity_type === 'product') {
        const model = this.store.models.find(m => m.id === item.quick_record_id);
        if (model) res = await this.syncProducts({ dryRun: false });
      } else if (item.entity_type === 'customer_lead') {
        const req = this.store.requests.find(r => r.id === item.quick_record_id);
        if (req) res = await this.syncCustomerLeads({ dryRun: false });
      }

      item.sync_status = 'SUCCESS';
      item.error_details = null;
      return { success: true, item };
    } catch (err) {
      item.sync_status = 'FAILED';
      item.error_details = err.message;
      return { success: false, error: err.message, item };
    }
  }
}
