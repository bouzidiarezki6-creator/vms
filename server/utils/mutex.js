// QUICK by VMS — Concurrency Mutex & Resource Lock Manager
// Prevents race conditions and double allocation on stock and transfers

class ConcurrencyMutex {
  constructor() {
    this.locks = new Map();
  }

  /**
   * Acquire an exclusive lock on a resource key.
   * Resolves when the lock is acquired.
   */
  async acquire(key, timeoutMs = 5000) {
    const startTime = Date.now();

    while (this.locks.has(key)) {
      if (Date.now() - startTime > timeoutMs) {
        throw new Error(`Délai d'attente dépassé pour le verrou sur la ressource: ${key}`);
      }
      await new Promise(resolve => setTimeout(resolve, 25));
    }

    this.locks.set(key, Date.now());
  }

  /**
   * Release the lock on a resource key.
   */
  release(key) {
    this.locks.delete(key);
  }

  /**
   * Execute an async function exclusively under a lock.
   */
  async runExclusive(key, fn, timeoutMs = 5000) {
    await this.acquire(key, timeoutMs);
    try {
      return await fn();
    } finally {
      this.release(key);
    }
  }
}

export const mutex = new ConcurrencyMutex();
