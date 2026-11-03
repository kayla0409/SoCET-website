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

## Planned stack

The selected stack is recorded in TS-1; the ADR will capture implementation details, costs and fallbacks.

**This is one Next.js app, not two.** The frontend and backend live in the same repo and deploy together to Vercel. There is no separate API server. Pages are React components; backend logic runs on the server through Next.js server-side functionality.

| Layer | Concern | Choice |
|---|---|---|
| **Frontend** | Framework | Next.js (React), frontend and backend in one application |
| | Language | TypeScript, for type-safe development |
| | Styling | Tailwind CSS, for responsive styling |
| | Design | Figma, for UI/UX design and prototyping |
| **Backend** (inside the same Next.js app) | Server logic | Next.js server-side functionality for newsletter signup, membership registration, and email forms; no separate backend needed |
| | Email forms | Resend, sends "Build With Us" submissions to the club email |
| **Data** | Database | Supabase (hosted PostgreSQL), stores membership information and scales as the club grows |
| | Database vs. host | PostgreSQL is the database itself; Supabase is the service that hosts it in the cloud and makes it easier to manage |
| | Connection | The Next.js site connects to the database through APIs |
| | Why not Google Sheets | A database prevents duplicate emails for us, and relational tables can link to each other |
| **Integrations** | Events calendar | Google Calendar embed, automatically displays upcoming club events |
| | Newsletter | Mailchimp, automatically manages newsletter subscriptions |
| | Community | Discord invite link, directs visitors to the club's Discord server |
| **Infra and tooling** | Hosting | Vercel, a cloud hosting and deployment platform optimized for Next.js with minimal configuration |
| | Version control | Git + GitHub, for team collaboration and code management |

In the two-week mini-plan, database-backed features are deferred: pages read from a static data file inside this same Next.js app. There is no separate API server. See [docs/MINI-PLAN.md](docs/MINI-PLAN.md).

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

Checks to run before opening a PR: `npm run lint`, `npm run typecheck`, `npm test`, `npm run e2e`, `npm run format:check`, and `npm run build`. GitHub Actions runs lint, typecheck, formatting, unit tests and build; browser tests are included when the Playwright configuration is present. The target CI suite also includes axe checks and a Lighthouse CI Home budget.

- `npm test` runs Vitest unit and component tests (`src/**/*.test.ts(x)`).
- `npm run e2e` runs Playwright browser tests (`e2e/`) on a phone and a desktop viewport. It starts the dev server for you, or reuses one already running on port 3000. Set `PLAYWRIGHT_BASE_URL` to test a deployed site instead.

Postgres, Prisma, Auth.js and the email/storage integrations are planned but not wired into the current scaffold. TS-4 and BE-1 establish isolated staging/production databases and migrations; add required environment variables to `.env.example`.

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
    ├── adr/                   architecture decision records (TS-1 writes the first)
    └── plan/full-outline.md   the original full outline: all 326 tasks/subtasks with goals
```

Code layout: `src/app` routes and layouts, `src/components` UI primitives and sections, `src/server` server actions, route handlers, queries and auth helpers, `prisma/` schema/migrations/seed, and `e2e/` Playwright tests. These are parts of one Next.js app and deploy together to Vercel.

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
