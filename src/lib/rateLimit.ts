/**
 * A small in-memory sliding-window rate limiter.
 *
 * Phase 1 trade-off: state lives in the memory of one server instance, so on
 * Vercel each warm function instance counts separately and a cold start resets
 * the count. That still stops a single visitor (or script) from hammering the
 * form, which is the goal for now. Move to a shared store (e.g. Supabase) if
 * abuse ever gets past it.
 */
export interface RateLimiter {
  /** Records an attempt for `key` and says whether it is allowed. */
  check(key: string): { allowed: boolean; retryAfterMs: number };
}

export function createRateLimiter({
  limit,
  windowMs,
  now = Date.now,
  maxKeys = 10_000,
}: {
  limit: number;
  windowMs: number;
  now?: () => number;
  /** Safety valve so the map can't grow without bound. */
  maxKeys?: number;
}): RateLimiter {
  const hits = new Map<string, number[]>();

  return {
    check(key) {
      const time = now();
      const recent = (hits.get(key) ?? []).filter((t) => time - t < windowMs);

      if (recent.length >= limit) {
        hits.set(key, recent);
        return { allowed: false, retryAfterMs: windowMs - (time - recent[0]) };
      }

      recent.push(time);
      hits.set(key, recent);

      if (hits.size > maxKeys) {
        // Drop keys whose newest hit is outside the window.
        for (const [k, times] of hits) {
          if (time - times[times.length - 1] >= windowMs) hits.delete(k);
        }
      }
      return { allowed: true, retryAfterMs: 0 };
    },
  };
}

/** The visitor's IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(headers: Pick<Headers, "get">): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}
