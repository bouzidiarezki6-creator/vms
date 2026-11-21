// server/services/odoo/odooSyncLogger.js
// QUICK by VMS — Phase 3: Persistent Odoo Synchronization History & Audit Logger

export class OdooSyncLogger {
  constructor(store) {
    this.store = store;
    if (!this.store.odoo_sync_history) {
      this.store.odoo_sync_history = [];
    }
    if (!this.store.odoo_external_mappings) {
      this.store.odoo_external_mappings = [];
    }
    if (!this.store.odoo_sync_conflicts) {
      this.store.odoo_sync_conflicts = [];
    }
  }

  /**
   * Log an individual sync operation
   */
  logOperation({
    entityType,
    quickId,
    odooId = null,
    operation, // 'EXPORT_CREATE', 'EXPORT_UPDATE', 'IMPORT_CREATE', 'IMPORT_UPDATE', 'DRY_RUN'
    status,    // 'SUCCESS', 'FAILED', 'PENDING', 'DRY_RUN', 'CONFLICT'
    details = {},
    error = null,
    checksum = null
  }) {
    const entry = {
      id: `osh-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      entity_type: entityType,
      quick_record_id: String(quickId),
      odoo_record_id: odooId ? Number(odooId) : null,
      operation,
      sync_status: status,
      details,
      error_details: error ? String(error) : null,
      retry_count: 0,
      checksum,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Prepend to history (most recent first)
    this.store.odoo_sync_history.unshift(entry);

    // Keep history capped at 1000 items in memory to prevent memory bloat
    if (this.store.odoo_sync_history.length > 1000) {
      this.store.odoo_sync_history.pop();
    }

    // Update external mapping if success
    if (status === 'SUCCESS' && odooId) {
      this.saveMapping(entityType, quickId, odooId, checksum);
    }

    return entry;
  }

  /**
   * Save or update cross-reference mapping (QUICK ID <-> Odoo ID)
   */
  saveMapping(entityType, quickId, odooId, checksum = null) {
    const mappings = this.store.odoo_external_mappings;
    const existingIndex = mappings.findIndex(
      m => m.entity_type === entityType && m.quick_id === String(quickId)
    );

    const mappingRecord = {
      id: existingIndex >= 0 ? mappings[existingIndex].id : `map-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      entity_type: entityType,
      quick_id: String(quickId),
      odoo_id: Number(odooId),
      checksum,
      last_sync_at: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      mappings[existingIndex] = mappingRecord;
    } else {
      mappings.push(mappingRecord);
    }
  }

  /**
   * Find Odoo ID for a given QUICK record
   */
  getOdooId(entityType, quickId) {
    const mapping = this.store.odoo_external_mappings.find(
      m => m.entity_type === entityType && m.quick_id === String(quickId)
    );
    return mapping?.odoo_id || null;
  }

  /**
   * Find QUICK ID for a given Odoo ID
   */
  getQuickId(entityType, odooId) {
    const mapping = this.store.odoo_external_mappings.find(
      m => m.entity_type === entityType && m.odoo_id === Number(odooId)
    );
    return mapping?.quick_id || null;
  }

  /**
   * Log a detected data conflict
   */
  logConflict({ entityType, quickId, odooId, fieldName, quickValue, odooValue }) {
    const conflict = {
      id: `cnf-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      entity_type: entityType,
      quick_id: String(quickId),
      odoo_id: odooId ? Number(odooId) : null,
      field_name: fieldName,
      quick_value: String(quickValue),
      odoo_value: String(odooValue),
      status: 'UNRESOLVED',
      created_at: new Date().toISOString()
    };
    this.store.odoo_sync_conflicts.unshift(conflict);
    return conflict;
  }

  /**
   * Resolve an existing conflict
   */
  resolveConflict(conflictId, resolution, notes = '', userId = 'admin') {
    const conflict = this.store.odoo_sync_conflicts.find(c => c.id === conflictId);
    if (!conflict) {
      throw new Error(`Conflit ${conflictId} introuvable.`);
    }
    conflict.status = resolution; // 'RESOLVED_QUICK', 'RESOLVED_ODOO', 'IGNORED'
    conflict.resolution_notes = notes;
    conflict.resolved_by = userId;
    conflict.resolved_at = new Date().toISOString();
    return conflict;
  }

  /**
   * Get sync history with pagination & filtering
   */
  getHistory({ limit = 50, offset = 0, entityType = null, status = null } = {}) {
    let list = this.store.odoo_sync_history;
    if (entityType && entityType !== 'all') {
      list = list.filter(h => h.entity_type === entityType);
    }
    if (status && status !== 'all') {
      list = list.filter(h => h.sync_status === status);
    }
    const total = list.length;
    const paginated = list.slice(offset, offset + limit);
    return { total, items: paginated };
  }

  /**
   * Get sync aggregate metrics
   */
  getStats() {
    const history = this.store.odoo_sync_history;
    const conflicts = this.store.odoo_sync_conflicts;

    return {
      totalOperations: history.length,
      successCount: history.filter(h => h.sync_status === 'SUCCESS').length,
      failedCount: history.filter(h => h.sync_status === 'FAILED').length,
      dryRunCount: history.filter(h => h.sync_status === 'DRY_RUN').length,
      pendingCount: history.filter(h => h.sync_status === 'PENDING').length,
      unresolvedConflictsCount: conflicts.filter(c => c.status === 'UNRESOLVED').length,
      totalMappings: this.store.odoo_external_mappings.length,
      lastSyncAt: history.length > 0 ? history[0].created_at : null
    };
  }
}
