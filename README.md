# SoCET Website

Public website and simple officer admin for the SoCET club at UCLA. Mobile-first, accessible (WCAG AA), cheap to run, and easy to hand to the next set of officers.

> **Status:** planning complete, code not started. Phase 1 launches **Tue Dec 15, 2026** (8 weeks from Oct 21).
> **New here? Read [Start here](#start-here-5-minutes) below.**

## Start here (5 minutes)

1. Read this README.
2. Open [docs/PHASE-1-TASKS.md](docs/PHASE-1-TASKS.md) and find **this week's** section.
3. Pick an unclaimed task whose dependencies are done. Put your name in the **Owner** column and on the Asana task.
4. Follow [CONTRIBUTING.md](CONTRIBUTING.md) to branch, open a PR, and get a review.
5. Stuck on a missing fact (copy, logo, dates)? Check [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md) before asking.

## What we're building

| Release | Window | What ships |
|---|---|---|
| **Phase 1** | 8 weeks, launch Dec 15, 2026 | Home, About, Events (filter, upcoming/past, add-to-calendar, Partiful RSVP link-out), Join, Team, Contact, 404, Privacy. Officer-only admin for events and team, plus a read-only submissions list. Join/newsletter/contact forms stored in the database. Dark mode, WCAG AA basics. |
| Phase 1 stretch | Week 7, only if under budget | Basic current California grid-mix widget (IF-6) |
| **Phase 2** | Winter + spring quarters (~19 weeks) | Member accounts, native RSVP with waitlist, QR check-in, full grid widget, Projects/Opportunities/Sponsors pages, full admin dashboard |
| **Phase 3** | After Phase 2 | 11 backlog epics (newsletter archive, directory, Discord bot, etc.) |

Phase 1 is **176 h** against a 180 h cap. Do not add scope to Phase 1. Put ideas in the Phase 3 backlog.

## Planned stack

Confirmed or changed by the architecture decision record in TS-1 (`docs/adr/`).

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript strict |
| Styling | Tailwind with design tokens exported from Figma (JSON); in-repo primitives, shadcn/ui style |
| Database | Postgres (staging + production, isolated) with Prisma migrations |
| Auth | Auth.js email magic link, officer allowlist only in Phase 1, sent via Resend |
| Validation | Zod on every server action and form |
| Tests | Vitest (unit), Playwright + axe (e2e and accessibility), Lighthouse CI (Home budget) |
| Hosting / CI | Vercel (preview per PR) + GitHub Actions |
| Monitoring | Sentry free tier with PII scrubbing, cookieless analytics, uptime monitor |
| Images | Object storage, validated upload, required alt text, `next/image` |
| Bot protection | Honeypot + rate limit in Phase 1; CAPTCHA (Turnstile proposed) in Phase 2 |

More detail in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Getting set up locally

The scaffold is created in TS-2 (week 1). Once it lands, this section is the source of truth. Expected shape:

```bash
git clone https://github.com/kayla0409/SoCET-website.git
cd SoCET-website
cp .env.example .env.local      # fill in values; never commit .env.local
npm install
npx prisma migrate dev          # local database
npm run seed                    # fake data only, no real PII
npm run dev                     # http://localhost:3000
```

Checks that CI also runs: `npm run lint`, `npm run typecheck`, `npm test`, `npm run e2e`.

The TS-2 owner must update this section with the real commands.

## Repository map

```
.
├── README.md                  you are here
├── CONTRIBUTING.md            how we work: branches, PRs, reviews, definition of done
├── .github/                   PR template, issue templates (CI workflows added in TS-3)
└── docs/
    ├── PLAN.md                phases, 8-week schedule, capacity, risks
    ├── PHASE-1-TASKS.md       task checklist by week (the working board)
    ├── OPEN-QUESTIONS.md      [TBD] tracker: facts officers must supply
    ├── ARCHITECTURE.md        stack, data model, security and privacy rules
    ├── adr/                   architecture decision records (TS-1 writes the first)
    └── plan/full-outline.md   the original full outline: all 326 tasks/subtasks with goals
```

Planned code layout (created in TS-2, adjust in the ADR): `src/app` routes, `src/components` UI primitives and sections, `src/server` actions, queries and auth helpers, `prisma/` schema, migrations and seed, `tests/` e2e.

## Work areas and owners

Every task ID starts with its area. Name a lead per area so people know who to ask.

| Prefix | Area | Lead |
|---|---|---|
| DC | Discovery and content (copy, decisions) | _unassigned_ |
| DS | Design (tokens, wireframes, mockups) | _unassigned_ |
| TS | Tech setup (repo, CI, environments, domain) | _unassigned_ |
| BE | Backend and data (schema, auth, APIs, forms) | _unassigned_ |
| PD | Page development (public pages) | _unassigned_ |
| IF | Interactive features (filters, admin, forms UI) | _unassigned_ |
| CP | Content population | _unassigned_ |
| QA | QA, security, accessibility | _unassigned_ |
| LA | Launch | _unassigned_ |
| PH | Post-launch and handoff | _unassigned_ |

## Ground rules

- **Privacy first.** Store only the fields officers approved in DC-4. No real personal data in seed data, tests, screenshots or logs.
- **Server-side checks always.** Hiding a button is not security. Every admin action calls `requireRole` on the server.
- **Accessibility is part of done.** Keyboard operable, visible focus, contrast, alt text. axe must report zero violations.
- **Mobile first.** Design and test at phone width before desktop.
- **No secrets in git.** Use Vercel env vars and `.env.example`. Service accounts belong to a club-owned login, not a personal one.

## Links

- Asana project: "SOCET Website Build" (SoCET UCLA team, private)
- Design file: location is open question #45
- Club contact: socet.ucla@gmail.com
