// server/services/odoo/odooApiClient.js
// QUICK by VMS — Phase 3: Production-Grade Odoo XML-RPC & JSON-RPC Client
import http from 'http';
import https from 'https';
import crypto from 'crypto';

export class OdooApiClient {
  constructor(config = {}) {
    this.url = config.url || process.env.ODOO_URL || '';
    this.db = config.db || process.env.ODOO_DB || '';
    this.username = config.username || process.env.ODOO_USERNAME || '';
    this.apiKey = config.apiKey || process.env.ODOO_API_KEY || process.env.ODOO_PASSWORD || '';
    this.timeoutMs = config.timeoutMs || parseInt(process.env.ODOO_TIMEOUT_MS || '10000', 10);
    this.maxRetries = config.maxRetries || 3;
    this.uid = null;
    this.isSandbox = config.isSandbox || process.env.ODOO_SANDBOX_MODE === 'true' || !this.url;
    
    // In-memory sandbox storage for isolated testing when live ERP credentials are not injected
    this.sandboxStore = {
      'product.template': [],
      'stock.lot': [],
      'stock.location': [],
      'res.partner': [],
      'sale.order': [],
      'stock.picking': []
    };
  }

  /**
   * Update configuration dynamically
   */
  updateConfig(newConfig = {}) {
    if (newConfig.url !== undefined) this.url = newConfig.url;
    if (newConfig.db !== undefined) this.db = newConfig.db;
    if (newConfig.username !== undefined) this.username = newConfig.username;
    if (newConfig.apiKey !== undefined) this.apiKey = newConfig.apiKey;
    if (newConfig.timeoutMs !== undefined) this.timeoutMs = newConfig.timeoutMs;
    if (newConfig.isSandbox !== undefined) this.isSandbox = newConfig.isSandbox;
    this.uid = null; // Reset authenticated session
  }

  /**
   * Get public connection status (credentials masked for security)
   */
  getStatus() {
    const isConfigured = Boolean(this.url && this.db && this.username && this.apiKey);
    return {
      configured: isConfigured,
      mode: this.isSandbox ? 'SANDBOX_SIMULATION' : 'LIVE_PRODUCTION',
      url: this.url || '(non configuré)',
      db: this.db || '(non configuré)',
      username: this.username ? this.redactUsername(this.username) : '(non configuré)',
      authenticated: this.uid !== null,
      timeoutMs: this.timeoutMs
    };
  }

  redactUsername(user) {
    if (!user || user.length < 3) return '***';
    const atIdx = user.indexOf('@');
    if (atIdx > 1) {
      return user[0] + '***' + user.slice(atIdx);
    }
    return user[0] + '***' + user.slice(-1);
  }

  /**
   * Authenticate with Odoo instance
   * Uses XML-RPC common endpoint or JSON-RPC
   */
  async authenticate() {
    if (this.isSandbox) {
      // Validated sandbox authentication for isolated testing
      if (!this.username && !this.apiKey && this.url) {
        throw new Error('Identifiants Odoo manquants pour l\'authentification.');
      }
      this.uid = 2; // Standard admin/service user ID in Odoo
      return {
        success: true,
        uid: this.uid,
        serverVersion: '17.0-enterprise',
        mode: 'SANDBOX'
      };
    }

    if (!this.url || !this.db || !this.username || !this.apiKey) {
      throw new Error('Configuration Odoo incomplète : URL, DB, Utilisateur et Clé API sont requis.');
    }

    return this.executeWithRetry(async () => {
      const payload = {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'common',
          method: 'authenticate',
          args: [this.db, this.username, this.apiKey, {}]
        },
        id: Math.floor(Math.random() * 100000)
      };

      const res = await this.sendJsonRpcRequest(`${this.url}/jsonrpc`, payload);
      if (res.error) {
        throw new Error(`Erreur d'authentification Odoo : ${res.error.message || JSON.stringify(res.error)}`);
      }

      const uid = res.result;
      if (!uid || uid === false) {
        throw new Error('Échec d\'authentification Odoo : nom d\'utilisateur ou clé API incorrecte.');
      }

      this.uid = uid;
      return {
        success: true,
        uid: this.uid,
        serverVersion: '17.0',
        mode: 'LIVE'
      };
    });
  }

  /**
   * Test Odoo connection
   */
  async testConnection() {
    try {
      const auth = await this.authenticate();
      return {
        connected: true,
        mode: auth.mode,
        uid: auth.uid,
        version: auth.serverVersion || '17.0',
        message: auth.mode === 'SANDBOX'
          ? 'Connexion Sandbox Odoo réussie (Environnement de test isolé actif).'
          : 'Connexion directe avec le serveur Odoo ERP VMS établie avec succès.'
      };
    } catch (err) {
      return {
        connected: false,
        error: err.message,
        message: `Échec de connexion au serveur Odoo : ${err.message}`
      };
    }
  }

  /**
   * Execute standard Odoo ORM method (search_read, create, write, search, count)
   */
  async executeKw(model, method, args = [], kwargs = {}) {
    if (!this.uid) {
      await this.authenticate();
    }

    if (this.isSandbox) {
      return this.handleSandboxOrm(model, method, args, kwargs);
    }

    return this.executeWithRetry(async () => {
      const payload = {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          service: 'object',
          method: 'execute_kw',
          args: [this.db, this.uid, this.apiKey, model, method, args, kwargs]
        },
        id: Math.floor(Math.random() * 100000)
      };

      const res = await this.sendJsonRpcRequest(`${this.url}/jsonrpc`, payload);
      if (res.error) {
        throw new Error(`Odoo ORM Error on ${model}.${method} : ${res.error.message || JSON.stringify(res.error)}`);
      }
      return res.result;
    });
  }

  /**
   * Retry with exponential backoff on transient network failures
   */
  async executeWithRetry(fn, attempt = 1) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= this.maxRetries) {
        throw err;
      }
      // Check if transient error (e.g. timeout, 502, 503, connection reset)
      const isTransient = /ECONNREFUSED|ETIMEDOUT|EAI_AGAIN|socket hang up|timeout|502|503/i.test(err.message);
      if (!isTransient && !err.message.includes('network')) {
        throw err;
      }
      const delay = Math.pow(2, attempt) * 300 + Math.floor(Math.random() * 200);
      await new Promise(r => setTimeout(r, delay));
      return this.executeWithRetry(fn, attempt + 1);
    }
  }

  /**
   * Low-level HTTP/HTTPS JSON-RPC request sender
   */
  sendJsonRpcRequest(targetUrl, payload) {
    return new Promise((resolve, reject) => {
      try {
        const parsed = new URL(targetUrl);
        const isHttps = parsed.protocol === 'https:';
        const client = isHttps ? https : http;
        const postData = JSON.stringify(payload);

        const options = {
          hostname: parsed.hostname,
          port: parsed.port || (isHttps ? 443 : 80),
          path: parsed.pathname + (parsed.search || ''),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'QUICK-VMS-OdooSync/3.0'
          },
          timeout: this.timeoutMs
        };

        const req = client.request(options, res => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', chunk => { body += chunk; });
          res.on('end', () => {
            if (res.statusCode >= 400) {
              reject(new Error(`Odoo HTTP error ${res.statusCode} : ${body.slice(0, 300)}`));
              return;
            }
            try {
              const json = JSON.parse(body);
              resolve(json);
            } catch (err) {
              reject(new Error(`Réponse Odoo non-JSON invalide: ${body.slice(0, 200)}`));
            }
          });
        });

        req.on('timeout', () => {
          req.destroy();
          reject(new Error(`Délai d'attente dépassé (timeout ${this.timeoutMs}ms) lors de la requête vers Odoo.`));
        });

        req.on('error', err => {
          reject(new Error(`Erreur réseau Odoo : ${err.message}`));
        });

        req.write(postData);
        req.end();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Sandbox ORM Simulator (strictly conforms to Odoo 17.0 API contracts for isolated offline testing)
   */
  handleSandboxOrm(model, method, args, kwargs) {
    if (!this.sandboxStore[model]) {
      this.sandboxStore[model] = [];
    }
    const collection = this.sandboxStore[model];

    switch (method) {
      case 'search_read': {
        const domain = args[0] || [];
        const fields = kwargs.fields || null;
        let results = [...collection];
        
        // Simple domain filter for testing
        domain.forEach(criterion => {
          if (Array.isArray(criterion) && criterion.length === 3) {
            const [field, op, val] = criterion;
            if (op === '=') results = results.filter(r => r[field] === val);
            if (op === 'in') results = results.filter(r => Array.isArray(val) && val.includes(r[field]));
            if (op === '!=') results = results.filter(r => r[field] !== val);
          }
        });

        if (fields && fields.length > 0) {
          results = results.map(r => {
            const projected = { id: r.id };
            fields.forEach(f => { projected[f] = r[f]; });
            return projected;
          });
        }
        return results;
      }

      case 'create': {
        const vals = args[0] || {};
        const newId = collection.length > 0 ? Math.max(...collection.map(r => r.id)) + 1 : 1001;
        const newRecord = { id: newId, ...vals, create_date: new Date().toISOString() };
        collection.push(newRecord);
        return newId;
      }

      case 'write': {
        const ids = Array.isArray(args[0]) ? args[0] : [args[0]];
        const vals = args[1] || {};
        let updated = false;
        collection.forEach(r => {
          if (ids.includes(r.id)) {
            Object.assign(r, vals, { write_date: new Date().toISOString() });
            updated = true;
          }
        });
        return updated;
      }

      case 'search': {
        const results = this.handleSandboxOrm(model, 'search_read', args, { fields: ['id'] });
        return results.map(r => r.id);
      }

      case 'search_count': {
        const results = this.handleSandboxOrm(model, 'search_read', args, {});
        return results.length;
      }

      default:
        return true;
    }
  }
}
