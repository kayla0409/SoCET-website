# Architecture (Phase 1 intent)

This is the plan, written before code exists. The TS-1 ADR confirms or changes it; if they disagree, the ADR wins. Update this file when the code diverges.

## System overview

```
Visitor / Officer browser
        │
        ▼
Vercel (Next.js App Router: server components, server actions, route handlers)
   │            │                │               │
   ▼            ▼                ▼               ▼
Postgres     Object storage   Resend (email)   Sentry + analytics
(Prisma)     (team photos)    (magic links,    (PII scrubbed)
                              officer alerts)
```

Public pages are server-rendered from the database. Officers sign in with an emailed magic link; only allowlisted emails can sign in. Everything else is anonymous.

## Data model (Phase 1)

From BE-1.1. Phase 2 adds members, RSVPs, check-in tokens, projects, opportunities, sponsors, site settings, audit log and grid cache (BE-7).

| Entity | Notes |
|---|---|
| Officer user / role | Allowlisted; roles admin and officer |
| Event | Type, start/end, location, Partiful RSVP URL; created/updated by |
| Team member | Name, role, bio, photo, alt text, sort order |
| Submission | Join and contact form entries, with consent text and timestamp |
| Newsletter signup | Email, consent text and timestamp. No newsletter is sent in Phase 1 |

Event types in the plan: speaker, workshop, journal club, site tour, hackathon, social (confirm in open question #38).

## Security and privacy rules

- **Authorization is server-side.** A `requireRole` helper is called in every admin server action, with a test for the denied path.
- **Validate everything with Zod** on the server, including query params (e.g. `?type=workshop&when=past` falls back to defaults on bad input).
- **Collect only approved fields** (decided in DC-4; privacy policy text must match what is collected exactly).
- **Forms:** honeypot and rate limiting on all public forms and sign-in.
- **Uploads:** validate type and size; alt text required.
- **Secrets** only in Vercel env vars; `.env.example` holds dummy values. Staging and production databases are separate; seed data is fake and guarded from production.
- **Monitoring** must scrub PII (Sentry) and use cookieless analytics.
- **Accounts** (domain registrar, Vercel, Resend, Sentry, etc.) are owned by a club login, recorded in the account inventory (PH-2).

## Environments

| Environment | Purpose | Data |
|---|---|---|
| Local | Development | Local DB, fake seed |
| Preview | One per PR (Vercel) | Staging DB |
| Staging | Integration and officer review before launch | Staging Postgres |
| Production | Public site | Production Postgres |

Migrations are versioned with Prisma and run on staging first.

## CI checks (TS-3)

On every PR: lint, typecheck, unit tests (Vitest), Playwright e2e with axe against the preview URL, and a Lighthouse budget on Home. A PR needs green CI plus 1 review to merge.

## Design system

Tokens (color for light and dark at WCAG AA, type, spacing, motion) are exported as JSON from the design file (DS-1.2) and imported into the Tailwind theme (TS-5.1). UI primitives (button, input, form field, card, badge, toast) live in the repo (TS-5.3). Dark mode follows the system preference with no flash.

## Decision records

Put them in `docs/adr/`. Copy `0000-template.md`. TS-1 writes the first ADR: stack choices, paid-service cost table with free-tier fallbacks, a simple diagram, and club-owned accounts.
