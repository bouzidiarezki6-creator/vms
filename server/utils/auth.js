// QUICK by VMS — Enterprise Authentication & Security Utilities
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'vms-quick-enterprise-secret-key-2026-production-secured';

// Base64URL encoding/decoding helpers
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf-8');
}

/**
 * Sign a cryptographic JWT token with HMAC-SHA256
 */
export function signToken(payload, expiresInSeconds = 86400) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verify a cryptographic JWT token
 */
export function verifyToken(token) {
  if (!token || typeof token !== 'string') return null;

  // Backward compatibility with legacy demo tokens
  if (token.startsWith('vms-jwt-token-')) {
    const userId = token.replace('vms-jwt-token-', '');
    return { id: userId, isLegacy: true };
  }

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Constant-time comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expBuffer.length || !crypto.timingSafeEqual(sigBuffer, expBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Token expired
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * PII Sanitization for Audit Logs
 */
export function redactPhone(phone) {
  if (!phone) return '';
  const str = String(phone).trim();
  if (str.length < 6) return '******';
  return str.slice(0, 4) + '****' + str.slice(-2);
}

export function redactEmail(email) {
  if (!email || !email.includes('@')) return '******';
  const [user, domain] = email.split('@');
  const redactedUser = user.length <= 2 ? user[0] + '***' : user[0] + '***' + user[user.length - 1];
  return `${redactedUser}@${domain}`;
}

/**
 * In-memory sliding window rate limiter
 */
const rateLimitMap = new Map();

export function createRateLimiter(options = {}) {
  const windowMs = options.windowMs || 60000; // 1 minute
  const maxRequests = options.max || 30; // 30 requests per minute
  const message = options.message || 'Trop de requêtes, veuillez réessayer dans quelques instants.';

  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const windowStart = now - windowMs;

    let timestamps = rateLimitMap.get(ip) || [];
    timestamps = timestamps.filter(t => t > windowStart);

    if (timestamps.length >= maxRequests) {
      return res.status(429).json({ error: message, retryAfterSeconds: Math.ceil(windowMs / 1000) });
    }

    timestamps.push(now);
    rateLimitMap.set(ip, timestamps);

    // Periodic cleanup
    if (rateLimitMap.size > 5000) {
      for (const [key, list] of rateLimitMap.entries()) {
        if (list.length === 0 || list[list.length - 1] < windowStart) {
          rateLimitMap.delete(key);
        }
      }
    }

    next();
  };
}
