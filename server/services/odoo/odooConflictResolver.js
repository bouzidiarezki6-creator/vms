// server/services/odoo/odooConflictResolver.js
// QUICK by VMS — Phase 3: Data Ownership & Conflict Resolution Engine
import crypto from 'crypto';

export class OdooConflictResolver {
  /**
   * Data Ownership Rules Matrix
   * Defines authoritative system for each entity and attribute
   */
  static DATA_OWNERSHIP = {
    'product': {
      sourceOfTruth: 'ODOO', // Odoo ERP owns master catalog, reference, active status
      updatableInQuick: false,
      conflictStrategy: 'ODOO_WINS'
    },
    'motorcycle_lot': {
      sourceOfTruth: 'SHARED', // Odoo owns lot identity, QUICK owns physical showroom location & aging
      conflictStrategy: 'LAST_WRITE_WINS'
    },
    'showroom_location': {
      sourceOfTruth: 'QUICK', // QUICK network manages 80 showrooms
      conflictStrategy: 'QUICK_WINS'
    },
    'customer_lead': {
      sourceOfTruth: 'QUICK', // QUICK captures web requests & anti-abuse checks
      conflictStrategy: 'QUICK_WINS'
    },
    'sale_order': {
      sourceOfTruth: 'QUICK', // Showroom POS sale in QUICK pushed to Odoo
      conflictStrategy: 'QUICK_WINS'
    },
    'stock_transfer': {
      sourceOfTruth: 'QUICK', // Compte Global algorithm initiates internal pickings
      conflictStrategy: 'QUICK_WINS'
    }
  };

  /**
   * Compute a deterministic SHA-256 checksum for idempotency
   */
  static computeChecksum(payload) {
    const serialized = JSON.stringify(payload, Object.keys(payload || {}).sort());
    return crypto.createHash('sha256').update(serialized).digest('hex');
  }

  /**
   * Compare two entity representations and detect field divergences
   */
  static detectConflicts(entityType, quickRecord, odooRecord) {
    const conflicts = [];
    if (!quickRecord || !odooRecord) return conflicts;

    switch (entityType) {
      case 'product': {
        // Price divergence
        const qPrice = Math.round(quickRecord.price_dzd || 0);
        const oPrice = Math.round(odooRecord.list_price || 0);
        if (qPrice > 0 && oPrice > 0 && Math.abs(qPrice - oPrice) > 100) {
          conflicts.push({
            fieldName: 'price_dzd',
            quickValue: String(qPrice),
            odooValue: String(oPrice),
            severity: Math.abs(qPrice - oPrice) / qPrice > 0.1 ? 'HIGH' : 'LOW',
            recommendedSource: 'ODOO'
          });
        }
        // Name divergence
        if (quickRecord.name && odooRecord.name && quickRecord.name.trim().toLowerCase() !== odooRecord.name.trim().toLowerCase()) {
          conflicts.push({
            fieldName: 'name',
            quickValue: quickRecord.name,
            odooValue: odooRecord.name,
            severity: 'MEDIUM',
            recommendedSource: 'ODOO'
          });
        }
        break;
      }

      case 'motorcycle_lot': {
        // VIN mismatch is critical
        if (quickRecord.vin && odooRecord.name && quickRecord.vin !== odooRecord.name) {
          conflicts.push({
            fieldName: 'vin',
            quickValue: quickRecord.vin,
            odooValue: odooRecord.name,
            severity: 'CRITICAL',
            recommendedSource: 'QUICK'
          });
        }
        break;
      }

      default:
        break;
    }

    return conflicts;
  }

  /**
   * Automatically resolve conflicts based on Data Ownership rules
   */
  static resolveConflict(entityType, conflict, manualDecision = null) {
    if (manualDecision) {
      return {
        resolved: true,
        source: manualDecision, // 'QUICK' or 'ODOO'
        appliedValue: manualDecision === 'QUICK' ? conflict.quickValue : conflict.odooValue,
        resolutionMode: 'MANUAL_ADMIN_OVERRIDE'
      };
    }

    const rule = this.DATA_OWNERSHIP[entityType];
    const source = rule?.conflictStrategy === 'ODOO_WINS' ? 'ODOO' : 'QUICK';
    return {
      resolved: true,
      source,
      appliedValue: source === 'QUICK' ? conflict.quickValue : conflict.odooValue,
      resolutionMode: 'AUTOMATIC_POLICY'
    };
  }
}
