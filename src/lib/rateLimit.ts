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
  /** Says whether `key` may make another attempt. Does not count one. */
  check(key: string): { allowed: boolean; retryAfterMs: number };
  /** Counts an attempt for `key`. Call it only for attempts that should use up the budget. */
  record(key: string): void;
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
  const recent = (key: string, time: number) =>
    (hits.get(key) ?? []).filter((t) => time - t < windowMs);

  return {
    check(key) {
      const time = now();
      const inWindow = recent(key, time);
      if (inWindow.length >= limit) {
        return {
          allowed: false,
          retryAfterMs: windowMs - (time - inWindow[0]),
        };
      }
      return { allowed: true, retryAfterMs: 0 };
    },

    record(key) {
      const time = now();
      const inWindow = recent(key, time);
      inWindow.push(time);
      hits.set(key, inWindow);

      if (hits.size > maxKeys) {
        // Drop keys whose newest hit is outside the window.
        for (const [k, times] of hits) {
          if (time - times[times.length - 1] >= windowMs) hits.delete(k);
        }
      }
    },
  };
}

/**
 * The visitor's IP, or null when the proxy didn't say. x-real-ip is set by the
 * platform proxy; otherwise we take the LAST x-forwarded-for entry, the one
 * our own proxy appended, because earlier entries are client-supplied and can
 * be spoofed to dodge the limit.
 */
export function clientIp(headers: Pick<Headers, "get">): string | null {
  const real = headers.get("x-real-ip")?.trim();
  if (real) return real;
  const forwarded = headers.get("x-forwarded-for")?.split(",");
  return forwarded?.at(-1)?.trim() || null;
}