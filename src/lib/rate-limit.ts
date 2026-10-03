interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding rate limiter per IP address.
 * Defaults to 5 requests per 10-minute window.
 */
export function checkRateLimit(
  ip: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): { allowed: boolean; remaining: number } {
  const now = Date.now();

  // Clean expired records occasionally
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetAt < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ip);

  if (!record || record.resetAt < now) {
    rateLimitMap.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}
