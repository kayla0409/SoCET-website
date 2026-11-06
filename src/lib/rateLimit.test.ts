import { describe, expect, it } from "vitest";
import { clientIp, createRateLimiter } from "./rateLimit";

describe("createRateLimiter", () => {
  it("allows `limit` hits per window, then frees up as old hits expire", () => {
    let time = 0;
    const limiter = createRateLimiter({
      limit: 3,
      windowMs: 600_000,
      now: () => time,
    });

    const hit = (key: string) => {
      const result = limiter.check(key);
      if (result.allowed) limiter.record(key);
      return result;
    };

    expect(hit("a").allowed).toBe(true);
    time = 1000;
    expect(hit("a").allowed).toBe(true);
    expect(hit("a").allowed).toBe(true);
    expect(hit("a")).toEqual({ allowed: false, retryAfterMs: 599_000 });

    // Other keys have their own budget.
    expect(hit("b").allowed).toBe(true);

    // The first hit (at t=0) leaves the window at t=600000.
    time = 600_000;
    expect(hit("a").allowed).toBe(true);
    expect(hit("a").allowed).toBe(false);
  });

  it("does not count an attempt until it is recorded", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("a").allowed).toBe(true);
    limiter.record("a");
    expect(limiter.check("a").allowed).toBe(false);
  });
});

describe("clientIp", () => {
  it("prefers x-real-ip", () => {
    expect(
      clientIp(
        new Headers({
          "x-real-ip": "198.51.100.2",
          "x-forwarded-for": "1.1.1.1",
        }),
      ),
    ).toBe("198.51.100.2");
  });

  it("uses the last x-forwarded-for entry, which our proxy added", () => {
    expect(
      clientIp(new Headers({ "x-forwarded-for": "6.6.6.6, 203.0.113.5" })),
    ).toBe("203.0.113.5");
  });

  it("returns null when no header names the visitor", () => {
    expect(clientIp(new Headers())).toBeNull();
  });
});
