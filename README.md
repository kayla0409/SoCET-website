# SoCET Website

Public website and simple officer admin for the SoCET club at UCLA. Mobile-first, accessible (WCAG AA), cheap to run, and easy to hand to the next set of officers.

> **Status:** Next.js app scaffold is in place; Phase 1 integrations and pages are in progress. Target launch: **Tue Dec 15, 2026**.
> **New here? Read [Start here](#start-here-5-minutes) below.**

## Start here (5 minutes)

1. Read this README.
2. **Right now the target is the [mini-plan](docs/MINI-PLAN.md): a working site by Fri Nov 6.** Work from it first. After that, use [docs/PHASE-1-TASKS.md](docs/PHASE-1-TASKS.md) and find **this week's** section.
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

## Stack

Why we chose each piece, what we rejected, costs and who owns each account: [ADR-0001](docs/adr/0001-stack.md) (proposed, awaiting team sign-off).

**This is one Next.js app, not two.** Frontend and server code live in this repo and deploy together to Vercel. There is no separate API server.

| Layer | Concern | Choice | Why |
|---|---|---|---|
| **Frontend** | Framework | Next.js App Router (React), strict TypeScript | One app and one deploy for a small, rotating team |
| | Styling and design | Tailwind CSS, tokens from Figma | Fast responsive styling; consistent light and dark mode |
| | Images | `next/image`, alt text required | Optimized images; accessibility |
| **Server** (same app) | Server logic | Server actions or route handlers in `src/server` | API keys and personal data stay on the server |
| | Validation | Zod on every server action and form | Same checks on every input |
| | Officer login | Supabase Auth magic links, officer allowlist | Comes with Supabase; no passwords |
| | Email | Resend: login emails and officer notifications | Reliable delivery, free tier |
| **Data** | Database | Supabase (hosted Postgres), separate staging and production projects | Unlike Google Sheets, it rejects duplicate emails and links tables; also gives us login and photo storage |
| | Officer access | Small admin page (IF-3), not the Supabase dashboard | Limits what officers can change; easier to hand over |
| **Integrations** | Events | Public "SoCET Events" Google Calendar, read by `getEvents()` into our own calendar component (no iframe) | Officers just edit Google Calendar; keeps our styling, dark mode and privacy |
| | Newsletter | Mailchimp, double opt-in | Officers send newsletters without a developer |
| | Community | Discord invite link | Where members already are |
| **Infra and tooling** | Hosting | Vercel, preview per PR | Built for Next.js, free tier |
| | Version control and CI | Git, GitHub, GitHub Actions | Every PR is checked before merge |
| | Tests | Vitest (unit); Playwright + axe (e2e and accessibility); Lighthouse CI Home budget planned (TS-3.2) | Catch broken pages and accessibility regressions |
| | Monitoring | Sentry with PII scrubbing, cookieless analytics, uptime monitor (TS-6) | Find errors without tracking visitors |

In the two-week mini-plan, the database is skipped: pages read from a static data file. See [docs/MINI-PLAN.md](docs/MINI-PLAN.md).

More detail in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Getting set up locally

Requires Node 22.12 or newer (see `.nvmrc`).

```bash
git clone https://github.com/kayla0409/SoCET-website.git
cd SoCET-website
npm install
npx playwright install chromium # once, for the end-to-end tests
npm run dev                     # http://localhost:3000
```

Checks to run before opening a PR: `npm run lint`, `npm run typecheck`, `npm test`, `npm run e2e`, `npm run format:check`, and `npm run build`. GitHub Actions runs all of these on every PR, including the Playwright tests and axe accessibility scans. A Lighthouse CI Home budget is still to be added (TS-3.2).

- `npm test` runs Vitest unit and component tests (`src/**/*.test.ts(x)`).
- `npm run e2e` runs Playwright browser tests (`e2e/`) on a phone and a desktop viewport, including an axe accessibility scan of each page in light and dark mode. Add new pages to the `routes` list in `e2e/accessibility.spec.ts`. It starts the dev server for you, or reuses one already running on port 3000. Set `PLAYWRIGHT_BASE_URL` to test a deployed site instead.

There is no database yet. Events live in `src/content/events.ts` and pages read them through `getEvents()` in `src/server/content.ts`. Supabase (TS-4, BE-1) comes later; add any new environment variables to `.env.example` with a dummy value.

## Repository map

```
.
├── README.md                  you are here
├── CONTRIBUTING.md            how we work: branches, PRs, reviews, definition of done
├── .github/                   PR and issue templates, GitHub Actions CI
└── docs/
    ├── MINI-PLAN.md           two-week plan to a working site by Fri Nov 6, and what "passable" means
    ├── PLAN.md                phases, 8-week schedule, capacity, risks
    ├── PHASE-1-TASKS.md       task checklist by week (the working board)
    ├── OPEN-QUESTIONS.md      [TBD] tracker: facts officers must supply
    ├── ARCHITECTURE.md        stack, data model, security and privacy rules
    ├── adr/                   architecture decision records (0001: stack and why)
    └── plan/full-outline.md   the original full outline: all 326 tasks/subtasks with goals
```

Code layout: `src/app` routes and layouts, `src/components` UI primitives and sections, `src/server` server actions, route handlers, queries and auth helpers, `supabase/` migrations and seed (added in TS-4), and `e2e/` Playwright tests.

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

- Asana project: "SOCET Website Build" (SoCET UCLA team, private). Search tasks by ID (e.g. `TS-2`); start at `MP-0 READ FIRST` for the mini-plan
- Design file: location is open question #45
- Club contact: socet.ucla@gmail.com
