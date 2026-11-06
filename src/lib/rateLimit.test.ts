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

    expect(limiter.check("a").allowed).toBe(true);
    time = 1000;
    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("a")).toEqual({
      allowed: false,
      retryAfterMs: 599_000,
    });

    // Other keys have their own budget.
    expect(limiter.check("b").allowed).toBe(true);

    // The first hit (at t=0) leaves the window at t=600000.
    time = 600_000;
    expect(limiter.check("a").allowed).toBe(true);
    expect(limiter.check("a").allowed).toBe(false);
  });
});

describe("clientIp", () => {
  it("uses the first address in x-forwarded-for", () => {
    expect(
      clientIp(new Headers({ "x-forwarded-for": "203.0.113.5, 10.0.0.1" })),
    ).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip, then to a shared bucket", () => {
    expect(clientIp(new Headers({ "x-real-ip": "198.51.100.2" }))).toBe(
      "198.51.100.2",
    );
    expect(clientIp(new Headers())).toBe("unknown");
  });
});
