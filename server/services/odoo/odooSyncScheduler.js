// server/services/odoo/odooSyncScheduler.js
// QUICK by VMS — Phase 3: Configurable Background Synchronization Scheduler

export class OdooSyncScheduler {
  constructor(syncService, initialConfig = {}) {
    this.syncService = syncService;
    this.config = {
      enabled: initialConfig.enabled || process.env.ODOO_AUTO_SYNC_ENABLED === 'true' || false,
      intervalMinutes: initialConfig.intervalMinutes || parseInt(process.env.ODOO_SYNC_INTERVAL_MINUTES || '60', 10),
      entities: initialConfig.entities || ['product', 'showroom_location', 'customer_lead'],
      dryRunDefault: initialConfig.dryRunDefault !== undefined ? initialConfig.dryRunDefault : false,
      lastRunAt: null,
      nextRunAt: null
    };
    this.timerId = null;
    this.isRunning = false;

    if (this.config.enabled) {
      this.start();
    }
  }

  getConfig() {
    return {
      ...this.config,
      isCurrentlyRunning: this.isRunning
    };
  }

  updateConfig(newConfig = {}) {
    const wasEnabled = this.config.enabled;
    this.config = { ...this.config, ...newConfig };

    if (this.config.enabled && !wasEnabled) {
      this.start();
    } else if (!this.config.enabled && wasEnabled) {
      this.stop();
    } else if (this.config.enabled && this.timerId) {
      // Restart with new interval
      this.stop();
      this.start();
    }
    return this.getConfig();
  }

  start() {
    this.stop();
    this.config.enabled = true;
    const intervalMs = Math.max(1, this.config.intervalMinutes) * 60 * 1000;
    this.config.nextRunAt = new Date(Date.now() + intervalMs).toISOString();

    this.timerId = setInterval(async () => {
      await this.triggerScheduledSync();
    }, intervalMs);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.config.nextRunAt = null;
  }

  async triggerScheduledSync() {
    if (this.isRunning) {
      console.warn('[OdooSyncScheduler] Previous sync run still in progress. Skipping overlapping run.');
      return;
    }

    this.isRunning = true;
    this.config.lastRunAt = new Date().toISOString();
    const intervalMs = Math.max(1, this.config.intervalMinutes) * 60 * 1000;
    this.config.nextRunAt = new Date(Date.now() + intervalMs).toISOString();

    try {
      console.log(`[OdooSyncScheduler] Triggering scheduled background sync (Interval: ${this.config.intervalMinutes}m)...`);
      await this.syncService.synchronizeAll({
        dryRun: this.config.dryRunDefault,
        entities: this.config.entities,
        triggeredBy: 'SCHEDULER'
      });
    } catch (err) {
      console.error('[OdooSyncScheduler] Error during scheduled sync:', err.message);
    } finally {
      this.isRunning = false;
    }
  }
}
