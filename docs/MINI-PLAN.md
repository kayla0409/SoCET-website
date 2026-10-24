# Mini-plan: a working site by Fri Nov 6, 2026

**Goal:** in two weeks (Fri Oct 23 to Fri Nov 6), have a deployed, public-looking site that a student can open on a phone, read what SoCET is, see upcoming events, and find out how to join. It is the Phase 1 pages built on a **static-data** shortcut. No database, login or admin yet.

Assumes 3 developers at ~8 h/week, so about 48 h of team time. The list below is 47 h, which leaves almost no slack. If you are 2 developers, cut the Team page, Privacy page and FAQ accordion first.

## Where to find these tasks in Asana

The mini-plan reuses the existing Phase 1 task IDs, so there is no separate numbering.

- **Start at `MP-0 READ FIRST`** in the "SOCET Website Build" project (first section, due Nov 6). It lists every mini-plan task with a link and repeats the acceptance checklist.
- **Search by ID.** Task names begin with the ID, for example `TS-2` or `PD-3`. Type it into Asana search.
- **Each reused task has a pinned comment** starting "MINI-PLAN version", saying what to do by Nov 6 and what to skip. The full task description still applies for the Phase 1 launch.
- **One task is new:** `MP-1` (static content data, `getEvents()` and `getTeam()`).
- **Dependencies:** a few tasks list BE-3, BE-4 or DC-4 as dependencies. Ignore those until the database and decision log exist; the pinned comment says so.
- The repo docs deliberately don't contain Asana URLs. Search by ID instead.

## What "passable" means (acceptance checklist)

The mini-plan is done when every box is true on the **deployed Vercel URL**:

- [ ] Home, About, Events, Join, Team, Contact, 404 and Privacy pages all load without errors.
- [ ] Looks right at phone width (393 px) and on desktop; light and dark mode both work.
- [ ] Nav and footer work on every page; header has a skip link and keyboard-operable menu.
- [ ] Events page lists upcoming and past events (from a data file); each event links to its Partiful page.
- [ ] Join page tells a visitor exactly how to join (links to Discord, Instagram, Linktree or the sign-up form the officers pick). Contact page shows the club email and socials.
- [ ] Copy is real and officer-approved (no lorem ipsum, no invented facts). Anything unknown is hidden, not guessed.
- [ ] Repo has CI (lint, typecheck, tests) and every PR gets a preview URL; `main` requires 1 review.
- [ ] Privacy page states plainly that the site collects no personal data yet.
- [ ] README setup steps actually work for a new teammate on a clean machine.

## What we deliberately skip (these stay in the Phase 1 plan)

| Skipped | Why it's safe to skip | Comes back as |
|---|---|---|
| Database, Prisma, staging environment | Events and team are in a typed data file | TS-4, BE-1 |
| Officer login and admin | Officers send changes through a PR or a message to a developer | BE-2, IF-3 |
| Join / contact / newsletter forms stored in DB | Join page links out; contact shows email | BE-5, IF-4 |
| Event type filter, add-to-calendar | Plain list is enough | IF-1, IF-2 |
| Domain and DNS | Use the Vercel `.vercel.app` URL | TS-7 |
| Sentry, analytics, Lighthouse budgets | Not needed to look at the site | TS-6, TS-3.2 |
| Full wireframes and hi-fi designs | Use tokens plus a quick Home sketch | DS-2, DS-3 |

**Rule that keeps the shortcut cheap:** read events and team members only through functions (`getEvents()`, `getTeam()`) in one place, such as `src/server/content.ts`. When BE-3 and BE-4 land, you swap the function bodies for database queries and no page changes.

## Schedule

### Week A: Fri Oct 23 to Fri Oct 30 (foundations)

| ID | Task (trimmed) | h | OI | Depends on | Owner |
|---|---|---|---|---|---|
| DC-1 (lite) | One officer meeting: name styling (SOCET vs SoCET), one-line positioning, who approves copy, who owns accounts | 2 | OI | none | |
| TS-1 (lite) | One-page ADR: stack, costs (all free tier), club-owned accounts | 2 | | none | |
| TS-2 | Scaffold: Next.js App Router, TypeScript strict, ESLint/Prettier, Vitest, branch protection (CI + 1 review), PR template. **Fix README setup steps here** | 3 | | none | |
| TS-3 (lite) | GitHub Actions (lint, typecheck, test) and Vercel project with a preview URL per PR | 3 | | TS-2 | |
| DC-2 (lite) | Collect from officers: logo, social links, club email, Partiful links for each event, officer names and photos with permission | 2 | OI | none | |
| DC-3 (lite) | Write copy: Home hero and 3 mission pillars, About (what we do, short FAQ), Join steps, Contact text. Mark unknowns [TBD] and hide them | 4 | OI | DC-1 | |
| DS-1 (lite) | Tokens: 1 brand color pair, neutral scale, type, spacing, checked for AA contrast in light and dark. Quick Home sketch | 3 | | DC-1 | |
| TS-5 (part 1) | Tailwind theme from tokens, dark mode with no flash, header, mobile nav, footer, skip link | 5 | | TS-2, DS-1 | |

Week A total: 24 h. **Checkpoint Fri Oct 30:** repo and CI live, preview URL works, layout shell with dark mode on the preview, copy and assets collected.

### Week B: Mon Nov 2 to Fri Nov 6 (pages and polish)

| ID | Task (trimmed) | h | OI | Depends on | Owner |
|---|---|---|---|---|---|
| TS-5 (part 2) | Primitives: button, card, badge; default metadata and favicon | 3 | | TS-5 part 1 | |
| (new) | `content.ts` with typed `getEvents()` and `getTeam()` plus seed entries from officers (real data only) | 2 | | DC-2 | |
| PD-1 | Home: hero with one Join CTA, mission pillars, next events or friendly empty state | 4 | | TS-5, DC-3 | |
| PD-2 | About with accessible FAQ accordion | 2 | | DC-3 | |
| PD-3 (lite) | Events list (upcoming first, past below) and event detail with Partiful link | 4 | | content.ts | |
| PD-4 (lite) | Join page: steps and link-outs | 1 | | DC-3 | |
| PD-5 (lite) | Team page (placeholder photo if no consent yet) | 2 | | content.ts | |
| PD-6 (lite) | Contact page: email and socials | 1 | | DC-3 | |
| PD-7 (lite) | 404 page and a "we collect no personal data yet" privacy page | 1 | | none | |
| QA (lite) | Phone and desktop check, keyboard walk-through, one axe run, fix what breaks, officer review of the preview URL | 3 | OI | all pages | |

Week B total: 23 h. Combined with week A that is about 47 h, so treat PD-5 and the Privacy page as the first things to cut if you fall behind. The core path is Home, Events, Join, Contact.

## Day-by-day for the first days

| Day | Do |
|---|---|
| Fri Oct 23 | Agree owners for each task above. Book the officer meeting (DC-1) for Mon or Tue. Start TS-2 and TS-1. |
| Mon Oct 26 | TS-2 done, TS-3 started. DC-1 meeting. DC-2 requests sent to officers. |
| Tue Oct 27 | TS-3 done (preview URL). DS-1 tokens. DC-3 copy drafted. |
| Wed to Fri Oct 28 to 30 | TS-5 part 1 (shell, dark mode). Officer approves copy. Checkpoint on Fri. |
| Mon Nov 2 | Primitives, `content.ts`, Home. |
| Tue Nov 3 | Events pages, About. |
| Wed Nov 4 | Join, Team, Contact, 404, Privacy. |
| Thu Nov 5 | QA pass and fixes, officer reviews preview. |
| Fri Nov 6 | Final fixes, tick the acceptance checklist, tag `mini-plan-v1`. |

## Risks specific to these two weeks

| Risk | What to do |
|---|---|
| Officers are slow to answer (name, logo, copy, photos) | Ask in week A day one. Use what exists (current Linktree/Instagram wording) as a draft for them to approve rather than starting blank. |
| Team is 2 people, not 3 | Cut Team page and QA time; skip the FAQ accordion; keep Home, Events, Join, Contact. |
| Unknown facts (founding year, meeting times, member counts) | Leave them out. Do not invent. |
| Photos without written consent | Use a placeholder and publish no names or photos until consent is on file. |
| Static data drifts from the real plan | Keep all reads behind `getEvents()` / `getTeam()`. Do not hard-code events in components. |
| Week A overruns | TS-5 part 1 is the only item that blocks week B; do it before DC-3 polish. |

## After Nov 6

Continue with the Phase 1 board in [PHASE-1-TASKS.md](PHASE-1-TASKS.md). The mini-plan already covers the layout shell and first versions of the pages in TS-2, TS-3, TS-5, PD-1 to PD-7, so the next work is the database and officer login (TS-4, BE-1, BE-2) and swapping the static content functions for real queries.

Note that the mini-plan pulls the public pages forward from weeks 4 and 5, so the original week-by-week dates for those tasks no longer apply. If you adopt this, update the week column in `PHASE-1-TASKS.md` and in Asana.
