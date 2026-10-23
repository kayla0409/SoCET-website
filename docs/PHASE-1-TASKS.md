# Phase 1 task board

The working checklist. Tasks are grouped by week; work top to bottom within a week. Update this file in the same PR that finishes a task (tick the box, fill **Owner**, log actual hours).

- **OI** = needs officer input (book officer time early).
- **Depends on** lists task IDs that must be done first. Full goals, in/out of scope and definition of done: [plan/full-outline.md](plan/full-outline.md) and the Asana task.
- Due dates exist only on the last task of each week (marked **DUE**).
- Estimates are in hours (h). Total 176 h; cap 180 h.

Legend: `[ ]` not started, `[~]` in progress, `[x]` done.

## Week 1: Oct 21 to 27 (22 h)

Milestone: decisions logged; repo, CI and preview deploys live.

| Done | ID | Task | h | OI | Depends on | Owner | Actual h |
|---|---|---|---|---|---|---|---|
| [ ] | DC-1 | Confirm club identity, positioning, naming/styling, audience and success metrics | 4 | OI | none | | |
| [ ] | DC-2 | Audit existing channels and assets; Phase 1 content inventory | 4 | OI | none | | |
| [ ] | DC-4 | Decide Phase 1 operations: admin access, join process, Partiful use, data and retention, budget. **DUE Oct 27** | 4 | OI | DC-1, TS-1 | | |
| [ ] | TS-1 | Architecture decision record: stack, paid services with costs and fallbacks, diagram | 2 | | none | | |
| [ ] | TS-2 | Repository, PR rules, ESLint/Prettier, TypeScript strict, test runners | 3 | | none | | |
| [ ] | TS-3 | CI/CD: GitHub Actions and Vercel preview deploys | 5 | | TS-2 | | |

Start with: TS-1 and DC-1.1 (officer kickoff). DC-4 waits on both.

## Week 2: Oct 28 to Nov 3 (22 h)

Milestone: copy approved, wireframes done, staging DB and Phase 1 schema migrated.

| Done | ID | Task | h | OI | Depends on | Owner | Actual h |
|---|---|---|---|---|---|---|---|
| [ ] | DC-3 | Write Phase 1 core copy (Home, About, Join, Contact, microcopy) | 5 | OI | DC-1, DC-2 | | |
| [ ] | DS-1 | Visual direction and design tokens (light/dark, accessible contrast) | 4 | OI | DC-1, DC-2 | | |
| [ ] | DS-2 | Mobile-first wireframes for Phase 1 pages and simple admin | 7 | | DC-2, DC-4 | | |
| [ ] | TS-4 | Environments: staging and production databases, secrets, migrations, seed | 3 | | TS-1, TS-3 | | |
| [ ] | BE-1 | Phase 1 database schema and migrations. **DUE Nov 3** | 3 | | TS-4, DC-4 | | |

## Week 3: Nov 4 to 10 (24 h)

Milestone: designs approved; base layout, dark mode and primitives on preview; officer sign-in works.

| Done | ID | Task | h | OI | Depends on | Owner | Actual h |
|---|---|---|---|---|---|---|---|
| [ ] | DS-3 | Hi-fi key templates, accessibility pre-check and officer approval | 7 | OI | DS-1, DS-2, DC-3 | | |
| [ ] | TS-5 | Base layout, nav, footer, dark mode, primitives, SEO/OG metadata, favicon. **DUE Nov 10** | 12 | | TS-2, DS-1, DS-2 | | |
| [ ] | BE-2 | Officer-only authentication and server-side role checks | 5 | | BE-1 | | |

## Week 4: Nov 11 to 17 (22 h)

Milestone: events, team and forms backend done; Home on preview.

| Done | ID | Task | h | OI | Depends on | Owner | Actual h |
|---|---|---|---|---|---|---|---|
| [ ] | BE-3 | Events API: CRUD and public queries | 5 | | BE-1, BE-2 | | |
| [ ] | BE-4 | Team CRUD and simple image upload | 5 | | BE-1, BE-2 | | |
| [ ] | BE-5 | Join, newsletter and contact forms stored in the database | 7 | | BE-1, DC-4 | | |
| [ ] | PD-1 | Home page. **DUE Nov 17** | 5 | | TS-5, BE-3, DS-3, DC-3 | | |

## Week 5: Nov 18 to 24 (22 h)

Milestone: all public pages on preview; filter and add-to-calendar working.

| Done | ID | Task | h | OI | Depends on | Owner | Actual h |
|---|---|---|---|---|---|---|---|
| [ ] | PD-2 | About page (mission, what we do, FAQ) | 3 | | TS-5, DC-3 | | |
| [ ] | PD-3 | Events list and event detail pages | 6 | | TS-5, BE-3, DS-3 | | |
| [ ] | PD-4 | Join page | 2 | | TS-5, DC-3 | | |
| [ ] | PD-5 | Team page (officers) | 2 | | TS-5, BE-4 | | |
| [ ] | PD-6 | Contact page | 1 | | TS-5 | | |
| [ ] | PD-7 | 404 and privacy pages | 2 | | TS-5, DC-4 | | |
| [ ] | IF-1 | Event type filter and upcoming/past toggle. **DUE Nov 24** | 3 | | PD-3, BE-3 | | |
| [ ] | IF-2 | Add-to-calendar (.ics and Google Calendar) | 3 | | PD-3 | | |

## Week 6: Nov 25 to Dec 1 (21 h)

Milestone: simple admin live on staging; README, runbook and account inventory written. Thanksgiving is Thu Nov 26.

| Done | ID | Task | h | OI | Depends on | Owner | Actual h |
|---|---|---|---|---|---|---|---|
| [ ] | TS-6 | Minimal observability: error tracking, analytics, uptime | 2 | | TS-3 | | |
| [ ] | IF-3 | Simple authenticated admin: events and team CRUD, submissions list. **DUE Dec 1** | 16 | | BE-2, BE-3, BE-4, BE-5, TS-5 | | |
| [ ] | PH-2 | Developer README, basic runbook and account inventory | 3 | | TS-4, TS-6 | | |

Start IF-3 early (it is 16 h). **End of week 6 decision:** if actual hours are 4 h or more under estimate, build the stretch widget in week 7.

## Week 7: Dec 2 to 8 (22 h)

Milestone: forms live, domain configured, real content loaded, security/privacy check done.

| Done | ID | Task | h | OI | Depends on | Owner | Actual h |
|---|---|---|---|---|---|---|---|
| [ ] | TS-7 | Domain, DNS, HTTPS | 3 | OI | TS-3 | | |
| [ ] | BE-6 | Phase 1 integration tests and seed data | 3 | | BE-3, BE-4, BE-5 | | |
| [ ] | IF-4 | Join, newsletter and contact forms (UI, validation, success/error states) | 5 | | BE-5, TS-5, PD-4, PD-6 | | |
| [ ] | IF-5 | Sticky mobile call-to-action and social links | 2 | | TS-5, PD-1 | | |
| [ ] | CP-1 | Load events (LA Tech Week event as a past event, after verification) | 2 | OI | IF-3 | | |
| [ ] | CP-2 | Officer profiles and photos (with written consent) | 3 | OI | IF-3 | | |
| [ ] | QA-4 | Security and privacy basics. **DUE Dec 8** | 4 | | IF-3, IF-4, DC-4 | | |
| [ ] | IF-6 | STRETCH (only if under budget): basic current California grid-mix widget | 8 | | TS-4, PD-1 | | |

Open item to resolve before this week: where officers enter content (open question #37).

## Week 8: Dec 9 to 15 (21 h)

Milestone: QA, officer acceptance, go/no-go, launch Tue Dec 15.

| Done | ID | Task | h | OI | Depends on | Owner | Actual h |
|---|---|---|---|---|---|---|---|
| [ ] | CP-3 | Final Phase 1 copy, images and outbound link check | 3 | OI | DC-3, PD-1, PD-2, PD-4, PD-6, PD-7, IF-5 | | |
| [ ] | QA-1 | Critical-flow e2e check and cross-device testing | 3 | | IF-1, IF-2, IF-3, IF-4 | | |
| [ ] | QA-2 | WCAG 2.2 AA basics audit | 3 | | PD-1, PD-3, IF-3, IF-4 | | |
| [ ] | QA-3 | Performance and SEO check | 2 | | PD-1, PD-3, CP-3 | | |
| [ ] | QA-5 | Officer acceptance test of the simple admin | 2 | OI | IF-3, CP-1 | | |
| [ ] | LA-1 | Launch checklist and go/no-go | 1 | OI | QA-1 to QA-5, TS-7, CP-3 | | |
| [ ] | LA-2 | Go-live: production migration, DNS cutover, update Linktree/bio links. **DUE Dec 15** | 2 | OI | LA-1 | | |
| [ ] | LA-3 | Announce Phase 1; request UCLA Sustainability listing update | 1 | OI | LA-2 | | |
| [ ] | LA-4 | Phase 1 smoke test and monitoring | 1 | | LA-2 | | |
| [ ] | PH-1 | Officer quick guide for the simple admin and training | 3 | OI | IF-3 | | |

## Totals check

| Week | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | Total |
|---|---|---|---|---|---|---|---|---|---|
| Hours | 22 | 22 | 24 | 22 | 22 | 21 | 22 | 21 | 176 |

If a task slips, note the new week here and in Asana, and flag any dependents.
