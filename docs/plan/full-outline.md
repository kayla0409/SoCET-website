# SOCET Website Build — Implementation Outline v3 (three releases; DRAFT, not yet in Asana)

Status: approved and created in Asana on 2026-10-20 (see "Asana status" at the bottom). This file is the reference copy of the plan.

## Releases

| Release | Window | Scope | Hours |
|---|---|---|---|
| **Phase 1** `[P1]` | 8 weeks, launch **Tue Dec 15, 2026** | Public pages (Home, About, Events, Join, Team, Contact, 404, Privacy). Event filter, upcoming/past, add-to-calendar, Partiful RSVP link-out. Simple officer-only admin for events and team, plus a read-only submissions list. Join/newsletter/contact forms stored in the DB. Core stack, CI/CD, preview deploys, dark mode, mobile-first, WCAG AA basics | **176 h** (cap 180, buffer 4 h) |
| Phase 1 stretch | Week 7, only if under the cap | Basic current grid-mix widget (IF-6) | +8 h (184 h total, over the cap unless Phase 1 runs ≥4 h under estimate) |
| **Phase 2** `[P2]` | Winter + spring quarters, ~19 weeks (P2 weeks 1–10 winter, 11–19 spring; calendar dates [TBD] from the UCLA academic calendar) | Member accounts, native RSVP with waitlist, QR check-in, full grid widget, Projects/Opportunities/Sponsors pages, full admin dashboard, plus everything Phase 1 simplified (see below) | **415 h** (~21.8 h/week) |
| **Phase 3** `[P3]` | After Phase 2 | The former Phase 2 backlog: 11 epics, no subtasks | 276–455 h |

## Setup decisions

| Item | Decision |
|---|---|
| Workspace / team | Humma.AI workspace → **SoCET UCLA** team (gid 1219718434864626) |
| Project | Exactly "SOCET Website Build", `private`, owner = requester, no other members. No links to, dependencies on, or reuse of any Humma project, task, custom field, template or portfolio |
| Labels | At the front of names: `[P1]`, `[P2]`, `[P3]`, `[Officer input]`. The stretch task is labeled `[P1]` and its name starts with "STRETCH:" |
| Sections | Sections 1–10 hold both Phase 1 and Phase 2 tasks, with Phase 1 tasks first. Section 11 is renamed **"Phase 3 Backlog"** (formerly "Phase 2 Backlog") |
| IDs | Phase 1 tasks are numbered first in each section, and Phase 2 continues the numbering (e.g., BE-1…BE-6 are Phase 1, BE-7…BE-15 are Phase 2). Phase 3 epics are P3-1…P3-11 |
| Dependencies | Native Asana dependencies plus the IDs in each description. Checked: no cycles, no Phase 1 task depends on Phase 2 or stretch work, and no Phase 1 task depends on work scheduled in a later week |
| Due dates | **Approved:** each Phase 1 week's final task gets that week's end date (8 tasks, listed in the week plan; LA-2 carries the Dec 15 launch date). No other task or subtask gets a due date. Phase 2 and Phase 3 have no due dates (the quarter plan is for guidance only) |
| Assignees | None |
| Team assumption | 2–3 student developers working part-time (~8 h/week each). (c) was not provided |
| Stack | No changes |

## Totals

| Section | P1 tasks | P1 subtasks | P1 h | P1 stretch h | P2 tasks | P2 subtasks | P2 h |
|---|---|---|---|---|---|---|---|
| Discovery & Content | 4 | 8 | 17 | – | 1 | 6 | 14 |
| Design (wireframes → mockups) | 3 | 7 | 18 | – | 3 | 13 | 44 |
| Tech Setup | 7 | 13 | 30 | – | 2 | 4 | 8 |
| Backend & Data | 6 | 11 | 28 | – | 9 | 33 | 97 |
| Page Development | 7 | 9 | 21 | – | 5 | 11 | 32 |
| Interactive Features | 5 | 11 | 29 | 8 | 7 | 31 | 89 |
| Content Population | 3 | 4 | 8 | – | 3 | 6 | 15 |
| QA, Security & Accessibility | 5 | 6 | 14 | – | 8 | 25 | 76 |
| Launch | 4 | 4 | 5 | – | 2 | 4 | 9 |
| Post-Launch/Handoff | 2 | 3 | 6 | – | 5 | 12 | 31 |
| **Total** | **46** | **76** | **176** | **8** | **45** | **145** | **415** |
| Phase 3 Backlog | 11 epics | 0 | – | – | – | – | 276–455 (P3) |

Items to create: **326 Asana tasks** (tasks, subtasks and epics). Items labeled `[Officer input]`: 33 tasks/epics and 36 subtasks.

## Phase 1: 8-week milestone plan (week-end due dates approved)

| Week | Dates (2026) | Tasks | Hours | Cumulative | Due date → task | Milestone at week end |
|---|---|---|---|---|---|---|
| 1 | Oct 21–27 | DC-1, DC-2, DC-4, TS-1, TS-2, TS-3 | 22 | 22 | 2026-10-27 → **DC-4** | Decisions logged (DC-1, DC-4); repo, CI and preview deploys live |
| 2 | Oct 28–Nov 3 | DC-3, DS-1, DS-2, TS-4, BE-1 | 22 | 44 | 2026-11-03 → **BE-1** | Copy approved, wireframes done, staging DB + Phase 1 schema migrated |
| 3 | Nov 4–10 | DS-3, TS-5, BE-2 | 24 | 68 | 2026-11-10 → **TS-5** | Designs approved; base layout, dark mode and primitives on preview; officer sign-in works |
| 4 | Nov 11–17 | BE-3, BE-4, BE-5, PD-1 | 22 | 90 | 2026-11-17 → **PD-1** | Events, team and forms backend done; Home on preview |
| 5 | Nov 18–24 | PD-2, PD-3, PD-4, PD-5, PD-6, PD-7, IF-1, IF-2 | 22 | 112 | 2026-11-24 → **IF-1** | All public pages on preview; filter and add-to-calendar working |
| 6 | Nov 25–Dec 1 | TS-6, IF-3, PH-2 | 21 | 133 | 2026-12-01 → **IF-3** | Simple admin live on staging; README/runbook/account inventory written. Thanksgiving is Thu Nov 26, so expect lower availability this week |
| 7 | Dec 2–8 | TS-7, BE-6, IF-4, IF-5, CP-1, CP-2, QA-4 | 22 | 155 | 2026-12-08 → **QA-4** | Forms live, domain configured, real content loaded, security/privacy check done; STRETCH decision |
| 8 | Dec 9–15 | CP-3, QA-1, QA-2, QA-3, QA-5, LA-1, LA-2, LA-3, LA-4, PH-1 | 21 | 176 | 2026-12-15 → **LA-2** | QA, officer acceptance, go/no-go, LAUNCH Tue Dec 15 |
| 7 (stretch) | Dec 2–8 | IF-6 | +8 | 184 | none | Build only if actuals are ≥4 h under estimate by end of week 6 |

**Capacity warnings**
- **Phase 1** needs about **22 h/week of total team time**, peaking at 24 h in week 3. That fits **3 developers at ~8 h/week**. With 2 developers, each needs ~11 h/week, or launch slips about 3 weeks. Officer-input subtasks partly use officer time, not developer time.
- **Phase 2** is **415 h** over ~19 weeks, about **21.8 h/week**. That's the same pace as Phase 1, so it needs the same ~3 developers at ~8 h/week. With 2 developers it would take ~26 weeks. Nothing has been cut.
- **Phase 2 ships once**, at the end of spring (LA-5). Winter work runs on staging. Releasing member accounts and native RSVP at the end of winter would add a release task (~5 h); that's your call.
- **PH-6's 2-week review** of Phase 1 (around Dec 29) falls in winter break. It's scheduled in the first Phase 2 block.
- **Week 8** (Dec 9–15) may overlap UCLA finals ([TBD], check the academic calendar). Option: keep the build schedule, but move announcements (LA-3) to the first week of winter quarter.

## Phase 2: quarter-level milestone plan

| Quarter | P2 weeks | Tasks | Hours | h/week | Cumulative | Milestone at block end |
|---|---|---|---|---|---|---|
| Winter | 1–3 | DC-5, DS-4, DS-5, TS-8, TS-9, BE-7, BE-8, PH-6 | 66 | 22.0 | 66 | Phase 2 decisions and privacy update approved; design system extended; wireframes done; Phase 2 schema migrated; member sign-up works on staging |
| Winter | 4–7 | DS-6, BE-9, BE-10, BE-11, BE-12, PD-11, PD-12, IF-7, IF-8 | 89 | 22.2 | 155 | Phase 2 designs approved; native RSVP with waitlist, QR tokens, search and member account pages working on staging; double opt-in sent to Phase 1 signups |
| Winter | 8–10 | BE-14, BE-15, IF-9, IF-10 | 62 | 20.7 | 217 | WINTER MILESTONE: full admin dashboard, RSVP management, QR check-in, audit log and CSV exports on staging; backend integration tests green |
| Spring | 11–14 | BE-13, PD-8, PD-9, PD-10, IF-11, IF-12, IF-13, CP-4, CP-5 | 83 | 20.8 | 300 | Grid data service and full widget, Projects/Opportunities/Sponsors pages, stat counters/animations and sponsor form on staging; content entered |
| Spring | 15–17 | CP-6, QA-6, QA-7, QA-8, QA-9, QA-10, QA-11, QA-12 | 70 | 23.3 | 370 | All Phase 2 QA done: e2e, devices, full WCAG 2.2 AA, performance, security, privacy, load test |
| Spring | 18–19 | QA-13, LA-5, LA-6, PH-3, PH-4, PH-5, PH-7 | 45 | 22.5 | 415 | SPRING MILESTONE: officer UAT passed, Phase 2 released to production and announced, full handoff docs, Phase 3 prioritized |
| **Total** | **1–19** | 45 tasks | **415** | **21.8** | | Winter 217 h (10 wks) · Spring 198 h (9 wks) |

## How Phase 1 was rescoped (simpler versions, not just fewer tasks)

| Area | Original plan | Phase 1 version | Rest lands in |
|---|---|---|---|
| Discovery | 5 tasks, 21 subtasks | One kickoff, one brief, Phase 1 copy only, one decision log | DC-5 |
| Design | Full Figma library, hi-fi for every page, light + dark | Tokens, mobile wireframes for Phase 1 screens, hi-fi for Home + event/team templates only. Other pages are built from tokens and components | DS-4 to DS-6 |
| Auth | Member accounts + 3-role RBAC | Officer magic link limited to an allowlist (admin, officer) | BE-8, PD-11 |
| RSVP | Native RSVP, capacity, waitlist, QR | Partiful link-out per event + add-to-calendar | BE-9, IF-8, IF-10 |
| Admin | Full dashboard, audit log, roles, settings | Events + team CRUD, read-only submissions list with CSV, allowlist editor | IF-9, IF-10, BE-14 |
| Images | Server resize pipeline, EXIF strip | Validated upload + required alt text + Next/Image optimization | BE-11 |
| Forms | Double opt-in, CAPTCHA, sponsor form, templates | Stored in DB with consent timestamp, honeypot + rate limit, one officer notification email. **No newsletter is sent in Phase 1.** Phase 1 signups must confirm via double opt-in (BE-12.2) before any newsletter goes out | BE-12, IF-13 |
| Events UX | Filter, search, toggle | Filter + upcoming/past toggle (no search) | IF-7 |
| Observability | Sentry, analytics, uptime, alert rules | Free tiers, one combined setup | TS-8 |
| CI quality | axe + Lighthouse on all templates, dependency scanning | axe in e2e, Lighthouse budget on Home | TS-8 |
| QA | Full audits, load test, full UAT | AA basics, quick OWASP/authz review, privacy check, 1 officer acceptance session | QA-6 to QA-13 |
| Handoff | Full docs, ownership doc, analytics reviews | README, runbook, account inventory, one-page officer guide | PH-3 to PH-7 |

## Example full description (Phase 1 subtask IF-1.1)

Every task and subtask gets this format: the seven headings in this order, each on its own line, sent as `html_notes` with `<strong>` headings inside `<body>`.

> **Name:** `[P1] IF-1.1 Type filter chips and upcoming/past toggle synced to URL, with tests`
>
> **Goal:** Let a student on a phone find the kind of event they care about (e.g., workshops) in one or two taps, and share that filtered view as a link.
> **In scope:** A filter bar above the Events list with one chip per event type (speaker, workshop, journal club, site tour, hackathon, social), single-select plus "All", and an Upcoming / Past toggle that defaults to Upcoming. State lives in URL search params (`?type=workshop&when=past`) and is read server-side using the BE-3.2 query, so a filtered URL renders correctly on first load. Chips are real buttons with `aria-pressed`, are keyboard operable, and have ≥24×24 px targets. The list shows a "No events match" empty state with a reset link. Includes unit tests for param parsing and one Playwright test per filter combination class.
> **Out of scope:** Free-text search (IF-7, Phase 2). Multi-select filters. Date-range pickers. Saving filter preferences. Client-side caching libraries.
> **Definition of done:** (1) Opening `/events?type=workshop&when=past` on a cold load shows only past workshops. (2) Every chip and the toggle work with keyboard only and announce their pressed state in VoiceOver. (3) Invalid params fall back to All/Upcoming without an error. (4) axe reports zero violations on the filtered page. (5) Tests are written and passing in CI. (6) Deployed to a Vercel preview URL. (7) Reviewed and approved in a PR by one reviewer.
> **Dependencies:** PD-3, BE-3.2
> **Estimate:** 3
> **Reference:** Yale SOM Business & Environment Club (https://groups.som.yale.edu/env/home/), upcoming events on the homepage. MVP feature "filter by type, upcoming/past toggle". Stack: Next.js App Router, Tailwind.

Every TS, BE, PD and IF item's Definition of done ends with the same three items: tests written and passing in CI, deployed to a preview URL, and reviewed in a PR.

## Full outline

## 1. Discovery & Content (DC)

#### Phase 1 — 4 tasks, 8 subtasks, 17 h

**DC-1 Confirm club identity, positioning, naming/styling, audience and success metrics** — [P1] [Officer input]  ·  4 h  ·  depends on: None  ·  **Week:** 1  
Goal: Lock the club facts every Phase 1 page depends on, in one officer meeting.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DC-1.1 | Prepare and run officer kickoff: SOCET vs SoCET, positioning, audiences, goals, metrics | [P1] [Officer input] | Get officer decisions on the [TBD] identity items and 2-3 numeric goals. | 2 | None |
| DC-1.2 | Write one-page project brief incl. Phase 1 scope and get officer sign-off | [P1] [Officer input] | Give every later task one approved reference. | 2 | DC-1.1 |

**DC-2 Audit existing channels and assets; Phase 1 content inventory** — [P1] [Officer input]  ·  4 h  ·  depends on: None  ·  **Week:** 1  
Goal: Reuse what exists and know who supplies each missing Phase 1 item.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DC-2.1 | Audit channels (Linktree, Instagram, Discord, LinkedIn, Partiful, UCLA listing) and build Phase 1 content inventory | [P1] | One sheet: every Phase 1 content block, source, owner, [TBD] flag. | 2 | None |
| DC-2.2 | Collect logo, photos, photo permissions and channel-owner info from officers | [P1] [Officer input] | Gather [TBD] assets and record who controls each channel. | 2 | DC-2.1 |

**DC-3 Write Phase 1 core copy (Home, About, Join, Contact, microcopy)** — [P1] [Officer input]  ·  5 h  ·  depends on: DC-1, DC-2  ·  **Week:** 2  
Goal: Give developers approved real copy for every Phase 1 page.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DC-3.1 | Draft mission pillars, What We Do, About FAQ, Join steps, Contact text, footer and form/empty/404 microcopy | [P1] | All Phase 1 copy in one doc, unknown facts marked [TBD]. | 4 | None |
| DC-3.2 | Officer review and written approval of Phase 1 copy | [P1] [Officer input] | Approved copy, with [TBD]s either resolved or assigned. | 1 | DC-3.1 |

**DC-4 Decide Phase 1 operations: admin access, join process, Partiful use, data and retention, budget** — [P1] [Officer input]  ·  4 h  ·  depends on: DC-1, TS-1  ·  **Week:** 1  ·  **Due: 2026-10-27**  
Goal: Turn club rules into written decisions the Phase 1 backend enforces.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DC-4.1 | Decide officer admin allowlist, join process, Partiful RSVP use, form fields, retention periods, paid services | [P1] [Officer input] | Decision log covering each item, approved by officers. | 2 | None |
| DC-4.2 | Write the privacy policy text from those decisions; officer approval | [P1] [Officer input] | Plain-language policy matching exactly what Phase 1 collects. | 2 | DC-4.1 |

#### Phase 2 — 1 tasks, 6 subtasks, 14 h

**DC-5 Phase 2 content and operations decisions (members, RSVP, sponsors, privacy update)** — [P2] [Officer input]  ·  14 h  ·  depends on: LA-2, TS-9  ·  **Block:** W1  
Goal: Decide the rules and content Phase 2 features depend on before they are built.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DC-5.1 | Phase 2 content inventory: Projects, Opportunities, Sponsors, member account pages | [P2] | Every new content block has an owner and [TBD] flag. | 2 | None |
| DC-5.2 | Draft sponsor pitch, Projects/Opportunities intros and member-account microcopy; officer approval | [P2] [Officer input] | Approved Phase 2 copy, sponsor tiers/benefits marked [TBD]. | 3 | DC-5.1 |
| DC-5.3 | Define roles matrix (admin, officer, member) and member sign-up policy (UCLA email preferred) | [P2] [Officer input] | Written permissions per role and who may sign up. | 2 | None |
| DC-5.4 | Define RSVP policy: default capacity, waitlist, cancellation cutoff, check-in | [P2] [Officer input] | Rules BE-9 implements, with numbers. | 2 | None |
| DC-5.5 | Update data inventory, retention and privacy text for accounts, RSVPs and check-ins | [P2] [Officer input] | Updated policy approved before any member data is collected. | 3 | DC-5.3, DC-5.4 |
| DC-5.6 | Review TS-9 cost update and record budget decision | [P2] [Officer input] | Paid services approved or free-tier fallbacks chosen. | 2 | None |


## 2. Design (wireframes → mockups) (DS)

#### Phase 1 — 3 tasks, 7 subtasks, 18 h

**DS-1 Visual direction and design tokens (light/dark, accessible contrast)** — [P1] [Officer input]  ·  4 h  ·  depends on: DC-1, DC-2  ·  **Week:** 2  
Goal: Define one consistent visual foundation, fast.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DS-1.1 | Moodboard and one proposed direction from inspiration sites and existing assets; officer pick | [P1] [Officer input] | An approved direction in one review. | 1 | None |
| DS-1.2 | Color (light/dark, WCAG AA), type, spacing and motion tokens exported as JSON for Tailwind | [P1] | Token file developers import directly. | 3 | DS-1.1 |

**DS-2 Mobile-first wireframes for Phase 1 pages and simple admin** — [P1]  ·  7 h  ·  depends on: DC-2, DC-4  ·  **Week:** 2  
Goal: Agree on structure for every Phase 1 screen before building.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DS-2.1 | Sitemap, 7-item-max nav, and wireframes: Home, About, Join, Contact, 404, Privacy | [P1] | Mobile-first wireframes with one primary CTA per page. | 4 | None |
| DS-2.2 | Wireframes: Events list/detail (Partiful link-out), Team, admin event/team forms and submissions list | [P1] | Mobile-first wireframes for data-driven screens. | 3 | DS-2.1 |

**DS-3 Hi-fi key templates, accessibility pre-check and officer approval** — [P1] [Officer input]  ·  7 h  ·  depends on: DS-1, DS-2, DC-3  ·  **Week:** 3  
Goal: Polish the templates that set the look; build other pages from tokens and components.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DS-3.1 | Hi-fi Home (mobile + desktop, light + dark) | [P1] | The flagship page fully designed. | 3 | None |
| DS-3.2 | Hi-fi event card, event detail and team card (mobile, light + dark) | [P1] | The reusable content templates fully designed. | 2 | None |
| DS-3.3 | Accessibility pre-check (contrast, focus, target size) and officer written approval | [P1] [Officer input] | Approved designs with a11y annotations. | 2 | DS-3.1, DS-3.2 |

#### Phase 2 — 3 tasks, 13 subtasks, 44 h

**DS-4 Extend the design system for Phase 2** — [P2]  ·  10 h  ·  depends on: DC-5  ·  **Block:** W1  
Goal: Add the components Phase 2 features need, with all states.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DS-4.1 | Tables, tabs, pagination, filter chips, modal/sheet/confirm dialog, empty/error/loading states | [P2] | Components for member, admin and content pages. | 4 | None |
| DS-4.2 | Grid widget chart spec: colors plus patterns, legend, tooltip, focus, data-table alternative | [P2] | Accessible chart spec. | 3 | None |
| DS-4.3 | Stat counter, entrance and page-transition motion specs with reduced-motion alternatives | [P2] | Every animation has a non-motion equivalent. | 3 | None |

**DS-5 Wireframes for Phase 2 pages, member pages and full admin** — [P2]  ·  13 h  ·  depends on: DC-5  ·  **Block:** W1  
Goal: Agree on structure for Phase 2 screens before hi-fi.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DS-5.1 | Wireframes: Projects, Opportunities, Sponsors (with inquiry form) | [P2] | Mobile-first wireframes for the three new pages. | 3 | None |
| DS-5.2 | Wireframes: sign up/log in, profile, my RSVPs, email preferences | [P2] | Member account pages. | 3 | None |
| DS-5.3 | Wireframes: native RSVP states and event-day QR check-in flow | [P2] | RSVP/waitlist/cancel states and the check-in screen. | 3 | None |
| DS-5.4 | Wireframes: full admin (RSVP management, inbox, audit log, users/roles, settings, new content CRUD) | [P2] | Every new admin screen. | 4 | None |

**DS-6 Phase 2 hi-fi mockups, accessibility pre-check and officer approval** — [P2] [Officer input]  ·  21 h  ·  depends on: DS-4, DS-5  ·  **Block:** W2  
Goal: Pixel-level specs for Phase 2, approved in writing.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| DS-6.1 | Hi-fi: Projects, Opportunities, Sponsors | [P2] | Mobile + desktop. | 4 | None |
| DS-6.2 | Hi-fi: member pages and RSVP states | [P2] | Mobile + desktop. | 4 | None |
| DS-6.3 | Hi-fi: admin RSVP management, check-in, inbox | [P2] | Check-in designed for one-handed phone use. | 4 | None |
| DS-6.4 | Hi-fi: full grid widget view | [P2] | Current mix and 24-hour view. | 3 | None |
| DS-6.5 | Dark-mode pass across all Phase 2 screens with contrast check | [P2] | Every screen has a passing dark variant. | 3 | DS-6.1, DS-6.2, DS-6.3, DS-6.4 |
| DS-6.6 | Accessibility pre-check, officer review and written approval | [P2] [Officer input] | Approved Phase 2 designs. | 3 | DS-6.5 |


## 3. Tech Setup (TS)

#### Phase 1 — 7 tasks, 13 subtasks, 30 h

**TS-1 Architecture decision record: stack, paid services with costs and free-tier fallbacks, diagram** — [P1]  ·  2 h  ·  depends on: None  ·  **Week:** 1  
Goal: Record the stack, its cost and who owns each account.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-1.1 | ADR: stack choices, paid-service cost table with fallbacks, simple system diagram, club-owned accounts | [P1] | One merged ADR future officers can read. | 2 | None |

**TS-2 Repository, PR rules, ESLint/Prettier, TypeScript strict, test runners** — [P1]  ·  3 h  ·  depends on: None  ·  **Week:** 1  
Goal: Same guardrails for every contributor from commit one.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-2.1 | Next.js App Router + TS strict scaffold, ESLint/Prettier, branch protection (CI + 1 review), PR template | [P1] | Repo with enforced PR rules. | 2 | None |
| TS-2.2 | Vitest and Playwright set up with one passing example each | [P1] | Both runners work locally and in CI. | 1 | TS-2.1 |

**TS-3 CI/CD: GitHub Actions and Vercel preview deploys** — [P1]  ·  5 h  ·  depends on: TS-2  ·  **Week:** 1  
Goal: Block broken changes automatically and preview every PR.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-3.1 | Actions: lint, typecheck, unit; Vercel preview per PR and production branch | [P1] | Every PR gets checks and a preview URL. | 3 | None |
| TS-3.2 | Playwright e2e with axe checks against the preview; Lighthouse CI budget on Home | [P1] | A11y violations and budget misses fail CI. | 2 | TS-3.1 |

**TS-4 Environments: staging and production databases, secrets, migrations, seed** — [P1]  ·  3 h  ·  depends on: TS-1, TS-3  ·  **Week:** 2  
Goal: Test without ever touching production data.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-4.1 | Staging + production Postgres, Vercel env secrets, .env.example, Prisma migrate workflow, guarded seed | [P1] | Two isolated environments with versioned migrations. | 3 | None |

**TS-5 Base layout, nav, footer, dark mode, primitives, SEO/OG metadata, favicon** — [P1]  ·  12 h  ·  depends on: TS-2, DS-1, DS-2  ·  **Week:** 3  ·  **Due: 2026-11-10**  
Goal: Build the shell and components every Phase 1 page reuses.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-5.1 | Tailwind theme from tokens, fonts, dark mode with system preference and no flash | [P1] | Tokens live in code; theme never flashes. | 3 | None |
| TS-5.2 | Accessible header, mobile nav, footer with social links, skip link, landmarks | [P1] | Keyboard and screen-reader friendly shell. | 3 | TS-5.1 |
| TS-5.3 | In-house primitives: button, input, form field with errors, card, badge, toast | [P1] | shadcn/ui-style primitives owned in the repo. | 4 | TS-5.1 |
| TS-5.4 | SEO baseline: metadata, default OG image, favicon, sitemap, robots | [P1] | Every route has valid metadata by default. | 2 | TS-5.1 |

**TS-6 Minimal observability: error tracking, analytics, uptime** — [P1]  ·  2 h  ·  depends on: TS-3  ·  **Week:** 6  
Goal: Know about errors and outages from day one, without tracking people.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-6.1 | Sentry free tier with PII scrubbing, cookieless analytics, uptime monitor on a health route | [P1] | Errors and downtime alert a named [TBD] channel. | 2 | None |

**TS-7 Domain, DNS, HTTPS ([TBD] domain)** — [P1] [Officer input]  ·  3 h  ·  depends on: TS-3  ·  **Week:** 7  
Goal: Serve the site on a club-owned domain over HTTPS.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-7.1 | Officers choose the domain and club-owned registrar account | [P1] [Officer input] | Domain bought under a club account. | 1 | None |
| TS-7.2 | Configure DNS for Vercel, HTTPS, www redirect, email records (SPF/DKIM/DMARC) | [P1] | Domain resolves over HTTPS; email authenticates. | 2 | TS-7.1 |

#### Phase 2 — 2 tasks, 4 subtasks, 8 h

**TS-8 Observability and CI hardening for Phase 2** — [P2]  ·  6 h  ·  depends on: LA-2  ·  **Block:** W1  
Goal: Raise the quality bar as member data arrives.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-8.1 | Sentry alert rules, PII scrubbing review, analytics goal events for sign-up and RSVP | [P2] | Alerts and goals configured for new flows. | 2 | None |
| TS-8.2 | Dependency and secret scanning in CI | [P2] | Vulnerable deps and secrets are flagged automatically. | 2 | None |
| TS-8.3 | Lighthouse CI 95+ budgets on every page template | [P2] | All four categories enforced for all templates. | 2 | None |

**TS-9 Update ADR and cost table for Phase 2 services** — [P2]  ·  2 h  ·  depends on: LA-2  ·  **Block:** W1  
Goal: Show officers what Phase 2 adds to the bill.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| TS-9.1 | Update ADR and costs: email volume, cron jobs, storage, EIA/CAISO keys, free-tier fallbacks | [P2] | Updated cost table merged. | 2 | None |


## 4. Backend & Data (BE)

#### Phase 1 — 6 tasks, 11 subtasks, 28 h

**BE-1 Phase 1 database schema and migrations** — [P1]  ·  3 h  ·  depends on: TS-4, DC-4  ·  **Week:** 2  ·  **Due: 2026-11-03**  
Goal: Model only Phase 1 data, with constraints.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-1.1 | Schema: officer users/roles, events (type, times, location, Partiful URL), team members, submissions, newsletter signups, created/updated-by | [P1] | Migration applied to staging; constraints in place. | 3 | None |

**BE-2 Officer-only authentication and server-side role checks** — [P1]  ·  5 h  ·  depends on: BE-1  ·  **Week:** 3  
Goal: Only allowlisted officers can reach admin actions.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-2.1 | Auth.js email magic link restricted to the officer allowlist (Resend) | [P1] | Non-allowlisted emails cannot sign in. | 3 | None |
| BE-2.2 | requireRole helpers (admin, officer) on every admin server action, with tests | [P1] | Each admin action rejects non-officers on the server. | 2 | BE-2.1 |

**BE-3 Events API: CRUD and public queries** — [P1]  ·  5 h  ·  depends on: BE-1, BE-2  ·  **Week:** 4  
Goal: Let officers manage events and visitors browse them.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-3.1 | Event CRUD server actions with Zod (incl. Partiful RSVP URL) | [P1] | Validated create/edit/delete. | 3 | None |
| BE-3.2 | Public queries: upcoming/past and type filter | [P1] | Server queries PD-3 and IF-1 consume. | 2 | BE-3.1 |

**BE-4 Team CRUD and simple image upload** — [P1]  ·  5 h  ·  depends on: BE-1, BE-2  ·  **Week:** 4  
Goal: Let officers manage team profiles with photos safely.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-4.1 | Team members CRUD with ordering and Zod | [P1] | Validated CRUD plus sort order. | 2 | None |
| BE-4.2 | Image upload to object storage: type/size validation, required alt text, Next/Image optimization | [P1] | Safe uploads; no image without alt text. | 3 | None |

**BE-5 Join, newsletter and contact forms stored in the database** — [P1]  ·  7 h  ·  depends on: BE-1, DC-4  ·  **Week:** 4  
Goal: Collect only approved fields safely and tell officers about new messages.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-5.1 | Handlers with Zod; store submissions and newsletter signups with consent text and timestamp | [P1] | Only DC-4.1 fields stored. | 3 | None |
| BE-5.2 | Honeypot and rate limiting on all public forms and sign-in | [P1] | Bots and floods are rejected. | 2 | None |
| BE-5.3 | Officer notification email for join and contact submissions | [P1] | Officers get an email per submission. | 2 | BE-5.1 |

**BE-6 Phase 1 integration tests and seed data** — [P1]  ·  3 h  ·  depends on: BE-3, BE-4, BE-5  ·  **Week:** 7  
Goal: Prove Phase 1 backend works end to end.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-6.1 | Integration tests for events, team, forms, auth; fake seed data (no real PII) | [P1] | Allowed and denied paths covered. | 3 | None |

#### Phase 2 — 9 tasks, 33 subtasks, 97 h

**BE-7 Phase 2 schema migrations** — [P2]  ·  8 h  ·  depends on: DC-5, BE-1  ·  **Block:** W1  
Goal: Extend the Phase 1 schema without breaking live data.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-7.1 | Member role, email preferences, member profile fields (DC-5.5-approved only) | [P2] | Migration safe on production data. | 2 | None |
| BE-7.2 | RSVPs (status enum, waitlist position) and check-in tokens | [P2] | Supports capacity, waitlist and check-in. | 3 | None |
| BE-7.3 | Projects, opportunities, sponsors, site settings, audit log, grid cache | [P2] | Remaining Phase 2 tables with indexes. | 3 | None |

**BE-8 Member accounts and full role-based access control** — [P2]  ·  9 h  ·  depends on: BE-7, BE-2  ·  **Block:** W1  
Goal: Open accounts to members while keeping least privilege.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-8.1 | Member sign-up with UCLA email preferred and verification | [P2] | Policy from DC-5.3 enforced. | 3 | None |
| BE-8.2 | Extend requireRole to member; protect member routes | [P2] | Every member route checks the session server-side. | 3 | BE-8.1 |
| BE-8.3 | Authorization tests per role per protected action | [P2] | Each role is proven allowed/denied per action. | 3 | BE-8.2 |

**BE-9 Native RSVP: capacity, waitlist, cancellation, QR check-in, search** — [P2]  ·  12 h  ·  depends on: BE-7, BE-8, BE-3  ·  **Block:** W2  
Goal: Run RSVPs natively and correctly under load.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-9.1 | RSVP creation with race-safe capacity check and waitlist placement | [P2] | No event is ever overbooked. | 4 | None |
| BE-9.2 | Cancellation and automatic waitlist promotion with notification trigger | [P2] | Freed seats go to the next person. | 3 | BE-9.1 |
| BE-9.3 | Signed QR check-in tokens and idempotent officer check-in endpoint | [P2] | Unguessable tokens; double scans harmless. | 3 | BE-9.1 |
| BE-9.4 | Event search query | [P2] | Search by title/description for IF-7. | 2 | None |

**BE-10 Content APIs: projects, opportunities, sponsors, site settings** — [P2]  ·  12 h  ·  depends on: BE-7, BE-8  ·  **Block:** W2  
Goal: Let officers manage all new content through validated actions.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-10.1 | Projects CRUD with Zod | [P2] | Validated CRUD. | 2 | None |
| BE-10.2 | Opportunities CRUD with expiry date | [P2] | Expired items hide automatically. | 3 | None |
| BE-10.3 | Sponsors CRUD with tier and logo | [P2] | Tier list configurable [TBD]. | 2 | None |
| BE-10.4 | Site settings API: stat counter values and social links | [P2] | Editable without a deploy. | 2 | None |
| BE-10.5 | Draft/published status and cache revalidation for all content | [P2] | Only published content is public; updates on save. | 3 | BE-10.1, BE-10.2, BE-10.3, BE-10.4 |

**BE-11 Image pipeline upgrade: server-side variants and EXIF stripping** — [P2]  ·  3 h  ·  depends on: BE-4  ·  **Block:** W2  
Goal: Serve faster images and remove location metadata.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-11.1 | Server-side resize to variants and EXIF/GPS strip on upload | [P2] | All new uploads produce variants without metadata. | 3 | None |

**BE-12 Forms and email upgrade: sponsor inquiry, newsletter double opt-in, templates, CAPTCHA** — [P2]  ·  12 h  ·  depends on: BE-7, BE-5  ·  **Block:** W2  
Goal: Bring forms to the full spec before any newsletter is sent.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-12.1 | Sponsor inquiry handler with officer notification | [P2] | Sponsor inquiries stored and emailed. | 2 | None |
| BE-12.2 | Newsletter double opt-in incl. one-time confirmation request to Phase 1 signups; unsubscribe | [P2] | No one gets a newsletter without confirming. | 4 | BE-12.3 |
| BE-12.3 | Transactional email templates: RSVP, waitlist, promotion, confirm-subscription | [P2] | Branded templates with plain-text fallback. | 4 | None |
| BE-12.4 | Server-verified CAPTCHA on public forms | [P2] | Bot submissions rejected server-side. | 2 | None |

**BE-13 Grid data service: EIA/CAISO clients, scheduled refresh, cache, fallback** — [P2]  ·  20 h  ·  depends on: BE-7  ·  **Block:** S1  
Goal: Serve reliable 24-hour California grid data even when upstream fails.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-13.1 | Document EIA and CAISO endpoints, fields, limits, keys and terms; define 'clean' [TBD] | [P2] | Source and definition decided before coding. | 3 | None |
| BE-13.2 | EIA client with Zod validation (extends IF-6 if the stretch shipped) | [P2] | Typed, validated EIA fetches. | 4 | BE-13.1 |
| BE-13.3 | CAISO client or documented fallback source | [P2] | Second source for resilience. | 4 | BE-13.1 |
| BE-13.4 | Normalize to a common model (timestamp, source, MW, clean %) | [P2] | Both clients give the same shape. | 3 | BE-13.2, BE-13.3 |
| BE-13.5 | Scheduled refresh job writing the cache table | [P2] | Data refreshes without user traffic. | 3 | BE-13.4 |
| BE-13.6 | Read API with last-good-data fallback and staleness flag | [P2] | Widget always gets data and its age. | 3 | BE-13.5 |

**BE-14 Audit log, CSV exports and retention job** — [P2]  ·  11 h  ·  depends on: BE-9, BE-10, BE-12  ·  **Block:** W3  
Goal: Make admin changes traceable and enforce retention.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-14.1 | Audit log helper wired into every admin mutation | [P2] | Actor, action, entity and diff recorded. | 3 | None |
| BE-14.2 | Audit log query API | [P2] | Filterable, paginated reads. | 2 | BE-14.1 |
| BE-14.3 | CSV exports: RSVPs per event and subscribers (CSV-injection safe) | [P2] | Exports safe to open in spreadsheets. | 3 | None |
| BE-14.4 | Scheduled retention purge and member account deletion | [P2] | Data past retention is deleted automatically. | 3 | None |

**BE-15 Phase 2 integration tests and seed data** — [P2]  ·  10 h  ·  depends on: BE-9, BE-10, BE-12  ·  **Block:** W3  
Goal: Prove the Phase 2 backend end to end.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| BE-15.1 | Integration tests: RSVP, waitlist, cancel, check-in | [P2] | Every RSVP state transition covered. | 4 | None |
| BE-15.2 | Integration tests: member auth, RBAC, content APIs, forms | [P2] | Allowed and denied paths covered. | 4 | None |
| BE-15.3 | Update seed data for Phase 2 entities | [P2] | Realistic fake data for staging. | 2 | None |


## 5. Page Development (PD)

#### Phase 1 — 7 tasks, 9 subtasks, 21 h

**PD-1 Home page** — [P1]  ·  5 h  ·  depends on: TS-5, BE-3, DS-3, DC-3  ·  **Week:** 4  ·  **Due: 2026-11-17**  
Goal: Turn a phone visitor from a QR code into a member in one tap.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-1.1 | Hero with single Join CTA and mission pillars | [P1] | Matches DS-3.1 with one primary CTA. | 3 | None |
| PD-1.2 | Upcoming events section with empty state; metadata and smoke test | [P1] | Shows next events or a friendly empty state. | 2 | None |

**PD-2 About page (mission, what we do, FAQ)** — [P1]  ·  3 h  ·  depends on: TS-5, DC-3  ·  **Week:** 5  
Goal: Explain the club and answer first-timer questions.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-2.1 | Mission and What We Do sections plus accessible FAQ accordion | [P1] | Keyboard-operable FAQ from approved copy. | 3 | None |

**PD-3 Events list and event detail pages** — [P1]  ·  6 h  ·  depends on: TS-5, BE-3, DS-3  ·  **Week:** 5  
Goal: Let anyone find an event and RSVP on Partiful.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-3.1 | Events list page with event cards | [P1] | Server-rendered list, upcoming first. | 3 | None |
| PD-3.2 | Event detail with Partiful RSVP link-out and schema.org Event structured data | [P1] | All event info plus a working RSVP link. | 3 | None |

**PD-4 Join page** — [P1]  ·  2 h  ·  depends on: TS-5, DC-3  ·  **Week:** 5  
Goal: Make joining obvious for students of any major.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-4.1 | Join steps, form slot, Discord/Instagram links and next-steps confirmation | [P1] | Visitor knows exactly what happens after joining. | 2 | None |

**PD-5 Team page (officers)** — [P1]  ·  2 h  ·  depends on: TS-5, BE-4  ·  **Week:** 5  
Goal: Show who runs the club, with consented photos.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-5.1 | Team grid from the database with no-photo placeholder | [P1] | Officer cards in admin-defined order. | 2 | None |

**PD-6 Contact page** — [P1]  ·  1 h  ·  depends on: TS-5  ·  **Week:** 5  
Goal: Give one clear way to reach the club.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-6.1 | Contact page with email, social links and form slot | [P1] | socet.ucla@gmail.com, social links and the IF-4 form. | 1 | None |

**PD-7 404 and privacy pages** — [P1]  ·  2 h  ·  depends on: TS-5, DC-4  ·  **Week:** 5  
Goal: Handle dead links and publish the privacy policy.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-7.1 | Custom 404/error pages and privacy page from approved DC-4.2 text | [P1] | Branded errors; policy published as approved. | 2 | None |

#### Phase 2 — 5 tasks, 11 subtasks, 32 h

**PD-8 Projects/initiatives showcase** — [P2]  ·  6 h  ·  depends on: BE-10, DS-6  ·  **Block:** S1  
Goal: Show what the club builds and does.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-8.1 | Projects showcase grid | [P2] | Visual grid of published projects. | 3 | None |
| PD-8.2 | Project detail page | [P2] | One page per project. | 3 | PD-8.1 |

**PD-9 Opportunities board** — [P2]  ·  5 h  ·  depends on: BE-10, DS-6  ·  **Block:** S1  
Goal: Connect students with climate/energy opportunities.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-9.1 | Opportunities list with type and deadline, expired hidden | [P2] | Current opportunities, soonest deadline first. | 3 | None |
| PD-9.2 | Outbound apply links and empty state | [P2] | Safe outbound links. | 2 | PD-9.1 |

**PD-10 Sponsors/partners page** — [P2]  ·  5 h  ·  depends on: BE-10, DS-6  ·  **Block:** S1  
Goal: Help sponsors see the value and get in touch.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-10.1 | Sponsor logo grid by tier with pitch section | [P2] | Tiers and pitch from approved copy. | 3 | None |
| PD-10.2 | Sponsor inquiry form slot and no-sponsors-yet state | [P2] | Page works before any sponsor exists. | 2 | PD-10.1 |

**PD-11 Member account pages (sign up/log in, profile, my RSVPs, email preferences)** — [P2]  ·  13 h  ·  depends on: BE-8, BE-9, DS-6  ·  **Block:** W2  
Goal: Let members manage their data and RSVPs.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-11.1 | Member sign-up and log-in pages with magic-link states | [P2] | Sent, expired and error states. | 3 | None |
| PD-11.2 | Profile page limited to approved fields | [P2] | Only DC-5.5 fields editable. | 3 | PD-11.1 |
| PD-11.3 | My RSVPs: upcoming/past, cancel, QR code display | [P2] | Members show their QR at the door. | 4 | PD-11.1 |
| PD-11.4 | Email preferences and account deletion request | [P2] | Members control emails and can delete their account. | 3 | PD-11.1 |

**PD-12 Home and Events upgrades for Phase 2** — [P2]  ·  3 h  ·  depends on: BE-9, BE-10, DS-6  ·  **Block:** W2  
Goal: Make room for native RSVP, stats and the grid widget.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PD-12.1 | Event detail native-RSVP slot; Home stat-counter and grid-widget slots; nav update (7 items max) | [P2] | Pages ready for IF-8, IF-11 and IF-12. | 3 | None |


## 6. Interactive Features (IF)

#### Phase 1 — 5 tasks, 11 subtasks, 29 h

**IF-1 Event type filter and upcoming/past toggle** — [P1]  ·  3 h  ·  depends on: PD-3, BE-3  ·  **Week:** 5  ·  **Due: 2026-11-24**  
Goal: Let visitors find relevant events in seconds.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-1.1 | Type filter chips and upcoming/past toggle synced to URL, with tests | [P1] | Shareable filtered URLs, covered by tests. | 3 | None |

**IF-2 Add-to-calendar (.ics and Google Calendar)** — [P1]  ·  3 h  ·  depends on: PD-3  ·  **Week:** 5  
Goal: Turn interest into attendance.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-2.1 | .ics endpoint and Google Calendar link on event detail, with tests | [P1] | Events import correctly into calendars. | 3 | None |

**IF-3 Simple authenticated admin: events and team CRUD, submissions list** — [P1]  ·  16 h  ·  depends on: BE-2, BE-3, BE-4, BE-5, TS-5  ·  **Week:** 6  ·  **Due: 2026-12-01**  
Goal: Let non-developer officers update events and team without help.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-3.1 | Admin shell with sign-in guard and reusable list + form pattern | [P1] | Only allowlisted officers reach /admin. | 3 | None |
| IF-3.2 | Events CRUD screens (type, times, location, Partiful URL, image) | [P1] | Officers create and edit events unaided. | 3 | IF-3.1 |
| IF-3.3 | Team CRUD screens with photo upload, required alt text and reorder | [P1] | Officers manage team cards unaided. | 3 | IF-3.1 |
| IF-3.4 | Read-only submissions and newsletter-signup list with CSV export | [P1] | Officers read and export submissions. | 3 | IF-3.1 |
| IF-3.5 | Officer allowlist management (admin only) | [P1] | Admins add/remove officers at rotation. | 2 | IF-3.1 |
| IF-3.6 | E2E tests for admin CRUD and access denial | [P1] | Admin flows and denial paths covered. | 2 | IF-3.2, IF-3.3, IF-3.4, IF-3.5 |

**IF-4 Join, newsletter and contact forms (UI, validation, success/error states)** — [P1]  ·  5 h  ·  depends on: BE-5, TS-5, PD-4, PD-6  ·  **Week:** 7  
Goal: Clear validation and honest feedback on every form.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-4.1 | Shared form component with Zod schemas shared with the server | [P1] | One schema validates on client and server. | 3 | None |
| IF-4.2 | Join, newsletter and contact forms wired up, with e2e tests | [P1] | All three forms submit and show states. | 2 | IF-4.1 |

**IF-5 Sticky mobile call-to-action and social links** — [P1]  ·  2 h  ·  depends on: TS-5, PD-1  ·  **Week:** 7  
Goal: Keep the primary action within thumb reach.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-5.1 | Sticky mobile CTA that never covers content or inputs; social links component | [P1] | One CTA per page on mobile. | 2 | None |

#### Phase 1 stretch (only if under the cap) — 1 tasks, 2 subtasks, 8 h

**IF-6 STRETCH: basic current California grid-mix widget** — [P1]  ·  8 h  ·  depends on: TS-4, PD-1  ·  **Week:** 7  
Goal: Show live clean-energy share on Home if Phase 1 has room under the cap.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-6.1 | EIA current-mix fetch with Zod, 15-minute cache revalidation and fallback text | [P1] | Server returns current mix or a fallback. | 4 | None |
| IF-6.2 | Accessible current-mix display on Home (text headline + simple bar with screen-reader text), tests | [P1] | Readable without the visual bar. | 4 | IF-6.1 |

#### Phase 2 — 7 tasks, 31 subtasks, 89 h

**IF-7 Event search** — [P2]  ·  3 h  ·  depends on: BE-9  ·  **Block:** W2  
Goal: Find a specific event fast.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-7.1 | Debounced search with no-results state, synced with filters, tests | [P2] | Search combines with type and upcoming/past. | 3 | None |

**IF-8 Native RSVP flow with confirmation email (Partiful link-out remains per event)** — [P2]  ·  10 h  ·  depends on: BE-9, BE-12, PD-12  ·  **Block:** W2  
Goal: RSVP in one tap with capacity and waitlist.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-8.1 | RSVP button states: RSVP, waitlist, full, cancel, sign-in required, Partiful mode | [P2] | Button always shows the correct state. | 4 | None |
| IF-8.2 | Confirmation and waitlist-promotion emails with .ics attached | [P2] | Members get confirmations automatically. | 3 | None |
| IF-8.3 | E2E tests for the RSVP flow | [P2] | RSVP, waitlist and cancel covered. | 3 | IF-8.1, IF-8.2 |

**IF-9 Full admin dashboard: all content CRUD, users/roles, settings, audit log** — [P2]  ·  24 h  ·  depends on: BE-8, BE-10, BE-11, BE-14, IF-3  ·  **Block:** W3  
Goal: Officers run the whole site after rotation.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-9.1 | Upgrade admin table: filters, pagination, unsaved-change guard | [P2] | Shared table for all screens. | 3 | None |
| IF-9.2 | Projects CRUD screens | [P2] | Officers manage projects. | 3 | IF-9.1 |
| IF-9.3 | Opportunities CRUD screens | [P2] | Officers manage opportunities. | 3 | IF-9.1 |
| IF-9.4 | Sponsors CRUD screens | [P2] | Officers manage sponsors. | 3 | IF-9.1 |
| IF-9.5 | Users and roles screen (replaces Phase 1 allowlist) | [P2] | Admins manage admin/officer/member roles. | 3 | IF-9.1 |
| IF-9.6 | Site settings screen: stat counters and social links | [P2] | Officers edit stats and links. | 2 | IF-9.1 |
| IF-9.7 | Audit log viewer | [P2] | Who changed what and when. | 3 | IF-9.1 |
| IF-9.8 | E2E tests for new admin screens and role gating | [P2] | Each screen and denial path covered. | 4 | IF-9.2, IF-9.3, IF-9.4, IF-9.5, IF-9.6, IF-9.7 |

**IF-10 Admin RSVP management, QR check-in, submissions inbox, CSV export** — [P2]  ·  17 h  ·  depends on: IF-9, BE-9, BE-14  ·  **Block:** W3  
Goal: Fast event-day and inbox handling on phones.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-10.1 | RSVP list per event with status filter and manual promote/cancel | [P2] | Officers manage attendance. | 4 | None |
| IF-10.2 | Event-day check-in: camera QR scan with manual search fallback | [P2] | Works even if the camera fails. | 4 | None |
| IF-10.3 | Check-in feedback and duplicate-scan handling | [P2] | Clear success/duplicate/invalid feedback. | 2 | IF-10.2 |
| IF-10.4 | Upgrade submissions list to inbox with new/handled status (incl. sponsor inquiries) | [P2] | Every submission triaged. | 2 | None |
| IF-10.5 | CSV export for RSVPs and subscribers | [P2] | One-click exports. | 2 | None |
| IF-10.6 | E2E tests for check-in and exports | [P2] | Covered end to end. | 3 | IF-10.1, IF-10.2, IF-10.3, IF-10.4, IF-10.5 |

**IF-11 Full live California grid widget (current + 24-hour, accessible chart)** — [P2]  ·  20 h  ·  depends on: BE-13, DS-6, PD-12  ·  **Block:** S1  
Goal: Show real climate data in an accessible, memorable way.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-11.1 | Accessible chart component with keyboard-navigable points | [P2] | Fully keyboard operable with ARIA. | 4 | None |
| IF-11.2 | Current mix view: clean % headline and breakdown by source | [P2] | Replaces the IF-6 stretch display if it shipped. | 3 | IF-11.1 |
| IF-11.3 | 24-hour view with keyboard scrub and tooltip | [P2] | Explore 24 hours by mouse, touch or keys. | 4 | IF-11.1 |
| IF-11.4 | Screen-reader data table and text summary | [P2] | Same information without the chart. | 2 | IF-11.2, IF-11.3 |
| IF-11.5 | Loading, stale-data and fallback states | [P2] | Never blank or broken. | 2 | IF-11.2 |
| IF-11.6 | Home preview variant with source attribution and methodology note | [P2] | Compact Home version [TBD full-view location]. | 2 | IF-11.2 |
| IF-11.7 | Unit, axe and e2e tests | [P2] | States and accessibility tested. | 3 | IF-11.4, IF-11.5, IF-11.6 |

**IF-12 Stat counters and homepage animations (prefers-reduced-motion)** — [P2]  ·  10 h  ·  depends on: BE-10, DS-4, PD-12  ·  **Block:** S1  
Goal: Tasteful motion that never hurts performance or accessibility.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-12.1 | Stat counter with admin-editable values and reduced-motion fallback | [P2] | Values [TBD] from site settings. | 3 | None |
| IF-12.2 | Hero and section entrance animations | [P2] | Framer Motion per DS-4.3. | 3 | None |
| IF-12.3 | Page transitions | [P2] | Route transitions per DS-4.3. | 2 | None |
| IF-12.4 | Verify no LCP/CLS regression; tests | [P2] | Lighthouse and tests confirm. | 2 | IF-12.1, IF-12.2, IF-12.3 |

**IF-13 Sponsor inquiry form UI and newsletter confirmation pages** — [P2]  ·  5 h  ·  depends on: BE-12, IF-4, PD-10  ·  **Block:** S1  
Goal: Complete the remaining form journeys.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| IF-13.1 | Sponsor inquiry form UI with states | [P2] | Uses the IF-4.1 component. | 3 | None |
| IF-13.2 | Newsletter check-email, confirmed and unsubscribed pages; e2e tests | [P2] | Every double opt-in step has a page. | 2 | None |


## 7. Content Population (CP)

#### Phase 1 — 3 tasks, 4 subtasks, 8 h

**CP-1 Load events (LA Tech Week event as a past event, after verification)** — [P1] [Officer input]  ·  2 h  ·  depends on: IF-3  ·  **Week:** 7  
Goal: Launch with real, verified events.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| CP-1.1 | Verify and enter 'Climate Tech Unsolved: Powering the AI Boom Cleanly' (past) plus upcoming events [TBD] | [P1] [Officer input] | Every known event live and verified. | 2 | None |

**CP-2 Officer profiles and photos ([TBD], with consent)** — [P1] [Officer input]  ·  3 h  ·  depends on: IF-3  ·  **Week:** 7  
Goal: Publish officers only with consent.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| CP-2.1 | Collect officer names, roles, bios, photos and written publishing consent | [P1] [Officer input] | Consent on record per officer. | 2 | None |
| CP-2.2 | Enter consented profiles with alt text | [P1] | All consented profiles live. | 1 | CP-2.1 |

**CP-3 Final Phase 1 copy, images and outbound link check** — [P1] [Officer input]  ·  3 h  ·  depends on: DC-3, PD-1, PD-2, PD-4, PD-6, PD-7, IF-5  ·  **Week:** 8  
Goal: No placeholder or broken link at launch.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| CP-3.1 | Load approved copy and permitted images with alt text; verify Discord/Instagram/LinkedIn/Linktree/email links; [TBD] sweep | [P1] [Officer input] | Zero '[TBD]' strings visible; every link resolves. | 3 | None |

#### Phase 2 — 3 tasks, 6 subtasks, 15 h

**CP-4 Projects, opportunities and sponsors content ([TBD])** — [P2] [Officer input]  ·  7 h  ·  depends on: IF-9  ·  **Block:** S1  
Goal: Fill new pages with real, approved content.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| CP-4.1 | Collect project/initiative content | [P2] [Officer input] | Write-ups and images [TBD]. | 2 | None |
| CP-4.2 | Collect opportunities and sponsor list with logo permissions | [P2] [Officer input] | Approved lists [TBD]. | 2 | None |
| CP-4.3 | Enter all in admin | [P2] | All collected content live. | 3 | CP-4.1, CP-4.2 |

**CP-5 Images with permissions and alt text for Phase 2 pages** — [P2] [Officer input]  ·  5 h  ·  depends on: IF-9  ·  **Block:** S1  
Goal: Use only images the club has rights to.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| CP-5.1 | Collect images with permission records | [P2] [Officer input] | Credit and consent recorded. | 3 | None |
| CP-5.2 | Upload, crop and write alt text | [P2] | Every image described. | 2 | CP-5.1 |

**CP-6 Load Phase 2 copy, [TBD] sweep and link check** — [P2] [Officer input]  ·  3 h  ·  depends on: CP-4, PD-8, PD-9, PD-10  ·  **Block:** S2  
Goal: No placeholder ships in Phase 2.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| CP-6.1 | Load approved Phase 2 copy; [TBD] sweep; verify outbound links | [P2] [Officer input] | Zero '[TBD]' strings; links resolve. | 3 | None |


## 8. QA, Security & Accessibility (QA)

#### Phase 1 — 5 tasks, 6 subtasks, 14 h

**QA-1 Phase 1 critical-flow e2e check and cross-device testing** — [P1]  ·  3 h  ·  depends on: IF-1, IF-2, IF-3, IF-4  ·  **Week:** 8  
Goal: Prove Phase 1 works on students' phones.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-1.1 | E2E gap check plus manual run on iOS Safari, Android Chrome, desktop Chrome/Safari/Firefox | [P1] | Each critical flow passes on each target. | 3 | None |

**QA-2 WCAG 2.2 AA basics audit** — [P1]  ·  3 h  ·  depends on: PD-1, PD-3, IF-3, IF-4  ·  **Week:** 8  
Goal: Meet AA basics on every Phase 1 page.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-2.1 | Keyboard, focus, VoiceOver spot check, contrast, alt text, 400% zoom; fix findings | [P1] | Zero serious axe issues; keyboard-complete flows. | 3 | None |

**QA-3 Performance and SEO check** — [P1]  ·  2 h  ·  depends on: PD-1, PD-3, CP-3  ·  **Week:** 8  
Goal: Fast on phones and findable.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-3.1 | Lighthouse mobile on each template, fix to 95+; validate sitemap, OG and Event structured data | [P1] | All four categories 95+ on each template. | 2 | None |

**QA-4 Security and privacy basics** — [P1]  ·  4 h  ·  depends on: IF-3, IF-4, DC-4  ·  **Week:** 7  ·  **Due: 2026-12-08**  
Goal: Ship secure by default with minimal data.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-4.1 | OWASP quick review of auth and forms, admin authz tests, security headers, secrets audit | [P1] | Each item has a verdict and evidence. | 3 | None |
| QA-4.2 | Verify stored data matches the DC-4 decisions and privacy page | [P1] | No field collected beyond policy. | 1 | QA-4.1 |

**QA-5 Officer acceptance test of the simple admin** — [P1] [Officer input]  ·  2 h  ·  depends on: IF-3, CP-1  ·  **Week:** 8  
Goal: Confirm officers can update the site alone.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-5.1 | Officers create an event, edit the team and export submissions unaided; fix blockers | [P1] [Officer input] | Officers complete each task unaided. | 2 | None |

#### Phase 2 — 8 tasks, 25 subtasks, 76 h

**QA-6 Phase 2 functional test plan and e2e coverage** — [P2]  ·  11 h  ·  depends on: IF-8, IF-9, IF-10, IF-13  ·  **Block:** S2  
Goal: Prove every Phase 2 flow works.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-6.1 | Test plan for member, RSVP, check-in and admin flows | [P2] | Each flow, role and expected result listed. | 3 | None |
| QA-6.2 | Close e2e gaps: sign up, RSVP, waitlist | [P2] | Planned cases automated. | 4 | QA-6.1 |
| QA-6.3 | Close e2e gaps: check-in, admin CRUD, sponsor and newsletter forms | [P2] | Planned cases automated. | 4 | QA-6.1 |

**QA-7 Cross-browser and device testing incl. QR scanning** — [P2]  ·  7 h  ·  depends on: QA-6  ·  **Block:** S2  
Goal: Works on the phones officers and students use.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-7.1 | Test matrix incl. camera QR scan on iOS Safari and Android Chrome | [P2] | Each flow passes on each target. | 4 | None |
| QA-7.2 | File bugs and verify fixes | [P2] | Every failure fixed or deferred explicitly. | 3 | QA-7.1 |

**QA-8 Full WCAG 2.2 AA audit** — [P2]  ·  15 h  ·  depends on: IF-9, IF-11, PD-11  ·  **Block:** S2  
Goal: AA across member pages, admin and the chart.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-8.1 | Automated axe sweep with fix list | [P2] | Zero serious/critical issues. | 2 | None |
| QA-8.2 | Keyboard-only and focus audit | [P2] | Every flow keyboard-complete. | 3 | None |
| QA-8.3 | Screen reader audit (VoiceOver, NVDA) incl. grid chart | [P2] | All flows understandable by screen reader. | 4 | None |
| QA-8.4 | Contrast, alt text, reflow and target-size audit | [P2] | All pass AA. | 3 | None |
| QA-8.5 | Verify remediations | [P2] | Every issue re-checked. | 3 | QA-8.1, QA-8.2, QA-8.3, QA-8.4 |

**QA-9 Performance and SEO for Phase 2 pages** — [P2]  ·  8 h  ·  depends on: CP-6, IF-12  ·  **Block:** S2  
Goal: Keep 95+ as pages and motion are added.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-9.1 | Lighthouse on every template; fix to 95+ | [P2] | All templates 95+. | 3 | None |
| QA-9.2 | Core Web Vitals: images, fonts, bundle | [P2] | LCP < 2.5s, CLS < 0.1, INP < 200ms on mid-range mobile. | 3 | None |
| QA-9.3 | SEO validation for new pages | [P2] | Sitemap, OG and structured data valid. | 2 | None |

**QA-10 Full security review: OWASP Top 10, per-role authz, dependencies, secrets** — [P2]  ·  13 h  ·  depends on: IF-9, IF-10, BE-12  ·  **Block:** S2  
Goal: Least privilege verified with member data present.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-10.1 | OWASP Top 10 checklist review | [P2] | Each item has a verdict and evidence. | 4 | None |
| QA-10.2 | Authorization tests per role on every action and route (IDOR) | [P2] | No role reaches data it should not. | 4 | None |
| QA-10.3 | Security headers, CSRF and cookie flags re-check | [P2] | Configured and verified. | 3 | None |
| QA-10.4 | Dependency scan and git-history secrets audit | [P2] | No high vulns; no secrets. | 2 | None |

**QA-11 Privacy verification for member data** — [P2] [Officer input]  ·  7 h  ·  depends on: DC-5, BE-14  ·  **Block:** S2  
Goal: Collect and keep only what DC-5.5 allows.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-11.1 | Data flow map vs. policy for every field | [P2] | Storage, viewers and retention match. | 3 | None |
| QA-11.2 | Verify retention purge, account deletion, analytics and Sentry scrubbing | [P2] | Each control shown working. | 3 | QA-11.1 |
| QA-11.3 | Officer sign-off on updated privacy page | [P2] [Officer input] | Written approval. | 1 | QA-11.2 |

**QA-12 Load test the RSVP flow for a popular event** — [P2]  ·  6 h  ·  depends on: IF-8  ·  **Block:** S2  
Goal: RSVPs stay correct under a spike.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-12.1 | k6 RSVP burst script on staging | [P2] | Realistic spike simulated. | 3 | None |
| QA-12.2 | Run, analyze, fix and report | [P2] | No overbooking; acceptable latency. | 3 | QA-12.1 |

**QA-13 Officer acceptance test of the full dashboard and bug triage** — [P2] [Officer input]  ·  9 h  ·  depends on: IF-9, IF-10  ·  **Block:** S3  
Goal: Officers run Phase 2 features alone.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| QA-13.1 | UAT script of real officer tasks | [P2] | Covers RSVP management, check-in, exports, roles. | 2 | None |
| QA-13.2 | Run UAT session with officers | [P2] [Officer input] | Officers complete each task unaided. | 3 | QA-13.1 |
| QA-13.3 | Triage and fix-verify UAT bugs | [P2] | Release-blocking bugs fixed. | 4 | QA-13.2 |


## 9. Launch (LA)

#### Phase 1 — 4 tasks, 4 subtasks, 5 h

**LA-1 Phase 1 launch checklist and go/no-go** — [P1] [Officer input]  ·  1 h  ·  depends on: QA-1, QA-2, QA-3, QA-4, QA-5, TS-7, CP-3  ·  **Week:** 8  
Goal: Launch deliberately with a rollback plan.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| LA-1.1 | Launch checklist, rollback plan and officer go/no-go | [P1] [Officer input] | Recorded go decision. | 1 | None |

**LA-2 Phase 1 go-live: production migration, DNS cutover, update Linktree/bio links** — [P1] [Officer input]  ·  2 h  ·  depends on: LA-1  ·  **Week:** 8  ·  **Due: 2026-12-15**  
Goal: Make the site live on the club domain.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| LA-2.1 | Production migration and deploy, DNS cutover, update Linktree/Instagram/Discord/LinkedIn links | [P1] [Officer input] | Site live over HTTPS; channels point to it. | 2 | None |

**LA-3 Announce Phase 1; request UCLA Sustainability listing update ([TBD] content)** — [P1] [Officer input]  ·  1 h  ·  depends on: LA-2  ·  **Week:** 8  
Goal: Tell members the site exists.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| LA-3.1 | Post officer-approved announcements and request the listing link update | [P1] [Officer input] | Posts live; request sent. | 1 | None |

**LA-4 Phase 1 smoke test and monitoring** — [P1]  ·  1 h  ·  depends on: LA-2  ·  **Week:** 8  
Goal: Catch launch-day problems fast.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| LA-4.1 | Production smoke test and first-48-hour Sentry/uptime check | [P1] | Critical flows pass in production. | 1 | None |

#### Phase 2 — 2 tasks, 4 subtasks, 9 h

**LA-5 Phase 2 release: checklist, production migration, smoke test, monitoring** — [P2] [Officer input]  ·  7 h  ·  depends on: QA-6, QA-7, QA-8, QA-9, QA-10, QA-11, QA-12, QA-13  ·  **Block:** S3  
Goal: Ship Phase 2 safely on live data.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| LA-5.1 | Release checklist, rollback plan and officer go/no-go | [P2] [Officer input] | Recorded go decision. | 2 | None |
| LA-5.2 | Production migration and deploy | [P2] | Migrations applied without data loss. | 2 | LA-5.1 |
| LA-5.3 | Smoke test and 72-hour monitoring | [P2] | Critical flows pass; errors reviewed daily. | 3 | LA-5.2 |

**LA-6 Announce Phase 2 features ([TBD] content)** — [P2] [Officer input]  ·  2 h  ·  depends on: LA-5  ·  **Block:** S3  
Goal: Get members to create accounts and RSVP natively.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| LA-6.1 | Draft and post officer-approved announcements | [P2] [Officer input] | Posts live on all channels. | 2 | None |


## 10. Post-Launch/Handoff (PH)

#### Phase 1 — 2 tasks, 3 subtasks, 6 h

**PH-1 Officer quick guide for the simple admin and training** — [P1] [Officer input]  ·  3 h  ·  depends on: IF-3  ·  **Week:** 8  
Goal: Officers update events and team without developers.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PH-1.1 | Write a one-page admin quick guide with screenshots | [P1] | Covers every Phase 1 admin task. | 2 | None |
| PH-1.2 | 30-minute officer training | [P1] [Officer input] | Each officer completes one edit live. | 1 | PH-1.1 |

**PH-2 Developer README, basic runbook and account inventory** — [P1]  ·  3 h  ·  depends on: TS-4, TS-6  ·  **Week:** 6  
Goal: Nothing is lost if a developer leaves.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PH-2.1 | README (setup, env vars), deploy/rollback runbook, inventory of club-owned accounts and renewal dates | [P1] | A new dev can run the app from the README. | 3 | None |

#### Phase 2 — 5 tasks, 12 subtasks, 31 h

**PH-3 Full officer admin guide and training** — [P2] [Officer input]  ·  6 h  ·  depends on: LA-5  ·  **Block:** S3  
Goal: Officers run every Phase 2 feature after rotation.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PH-3.1 | Extend the guide to all Phase 2 admin features | [P2] | Step-by-step for every task. | 4 | None |
| PH-3.2 | Officer training session | [P2] [Officer input] | Officers complete each task live. | 2 | PH-3.1 |

**PH-4 Developer handoff: architecture docs, full runbook, onboarding** — [P2]  ·  11 h  ·  depends on: LA-5  ·  **Block:** S3  
Goal: A new club developer is productive in one afternoon.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PH-4.1 | Update README for Phase 2 | [P2] | Fresh clone to running app. | 3 | None |
| PH-4.2 | Architecture docs and ADR index | [P2] | Current architecture documented. | 3 | None |
| PH-4.3 | Runbook: migrations, incidents, grid API outage, cron failures | [P2] | Each procedure step by step. | 3 | None |
| PH-4.4 | Onboarding guide and good-first-issues | [P2] | Labeled starter backlog. | 2 | None |

**PH-5 Ownership handoff doc and officer-rotation checklist** — [P2] [Officer input]  ·  5 h  ·  depends on: LA-5  ·  **Block:** S3  
Goal: No account or domain is lost at graduation.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PH-5.1 | Expand account/access/billing/renewal inventory | [P2] | Every service listed with a club-owned login. | 3 | None |
| PH-5.2 | Officer-rotation checklist and sign-off | [P2] [Officer input] | Annual handover approved. | 2 | PH-5.1 |

**PH-6 Phase 1 analytics and feedback review (2 and 4 weeks after launch)** — [P2] [Officer input]  ·  4 h  ·  depends on: LA-2  ·  **Block:** W1  
Goal: Measure Phase 1 against DC-1 goals and feed Phase 2.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PH-6.1 | 2-week review: metrics vs. goals and feedback | [P2] [Officer input] | Written review shared with officers. | 2 | None |
| PH-6.2 | 4-week review and recommendations | [P2] [Officer input] | Recommendations recorded. | 2 | PH-6.1 |

**PH-7 Prioritize Phase 3 backlog** — [P2] [Officer input]  ·  5 h  ·  depends on: PH-6, LA-5  ·  **Block:** S3  
Goal: Choose what to build next from evidence.

| ID | Subtask | Labels | Goal | h | Depends on |
|---|---|---|---|---|---|
| PH-7.1 | Phase 3 prioritization workshop with officers | [P2] [Officer input] | Ranked Phase 3 list. | 2 | None |
| PH-7.2 | Break top Phase 3 epics into 1-4h subtasks | [P2] | Top epics ready to build. | 3 | PH-7.1 |


## 11. Phase 3 Backlog (P3) — 11 epics, no subtasks, 276–455 h

These are epics only. They get subtasks when promoted (PH-7), and each still gets the full seven-heading description and an hours range.

| ID | Epic | Labels | Goal | Estimate (h) | Depends on |
|---|---|---|---|---|---|
| P3-1 | Newsletter/blog archive with rich-text editor | [P3] | Publish and archive newsletters/posts (Ref: Yale B&E Past Newsletters). | 40–60 | LA-5, PH-7 |
| P3-2 | Journal-club reading list and resource hub | [P3] | Curate journal-club readings and resources. | 20–35 | LA-5, PH-7 |
| P3-3 | Event recaps and photo gallery | [P3] [Officer input] | Show what happened at past events, with photo consent. | 25–40 | LA-5, PH-7 |
| P3-4 | Speaker/panelist inquiry form | [P3] | Let prospective speakers contact the club. | 8–14 | LA-5, PH-7 |
| P3-5 | Social feed embeds | [P3] | Show recent social posts without heavy third-party tracking. | 8–16 | LA-5, PH-7 |
| P3-6 | Alumni/member directory (consent required) | [P3] [Officer input] | Opt-in directory for networking. | 30–50 | LA-5, PH-7 |
| P3-7 | Officer application flow with review workflow | [P3] [Officer input] | Run officer applications on the site. | 30–45 | LA-5, PH-7 |
| P3-8 | Points/attendance leaderboard | [P3] [Officer input] | Recognize attendance using check-in data. | 20–35 | LA-5, PH-7 |
| P3-9 | Discord bot integration (announcements, RSVP from Discord) | [P3] [Officer input] | Reach members where they already are. | 30–50 | LA-5, PH-7 |
| P3-10 | Multi-dataset climate dashboard | [P3] | Expand beyond grid mix to more climate datasets. | 40–70 | LA-5, PH-7 |
| P3-11 | Internationalization | [P3] | Support languages beyond English [TBD which]. | 25–40 | LA-5, PH-7 |

## [TBD] items SOCET must supply

| # | [TBD] item | Collected in |
|---|---|---|
| 1 | Name styling: "SOCET" vs "SoCET" | DC-1.1 |
| 2 | Positioning: environmental science vs clean energy / climate tech / sustainable innovation | DC-1.1 |
| 3 | Primary audiences and numeric success-metric targets | DC-1.1, DC-1.2 |
| 4 | Founding year | DC-3.1 |
| 5 | Officer names, roles, bios, photos and written publishing consent | CP-2.1 |
| 6 | Meeting schedule and location | DC-3.1 |
| 7 | Member counts and other stat-counter values | BE-10.4, IF-12.1 |
| 8 | Logo and brand assets | DC-2.2 |
| 9 | Domain name and the club-owned registrar account | TS-7.1 |
| 10 | Confirmation that no existing website exists | DC-2.1 |
| 11 | Past-event archive beyond the LA Tech Week event | CP-1.1 |
| 12 | LA Tech Week event verification (details, panelists, recap, photos) | CP-1.1 |
| 13 | Upcoming events | CP-1.1 |
| 14 | Sponsors/partners, tier structure and sponsor benefits | DC-5.2, CP-4.2 |
| 15 | Projects/initiatives content | CP-4.1 |
| 16 | Opportunities and their categories | CP-4.2 |
| 17 | Who maintains each channel (Linktree, Instagram, Discord, LinkedIn, email) | DC-2.2 |
| 18 | Mailing-list tool currently used, and whether an existing list must be migrated (with consent) | DC-4.1 |
| 19 | Photo permissions | DC-2.2, CP-5.1 |
| 20 | Budget and approval of paid services | DC-4.1 (Phase 1), DC-5.6 (Phase 2) |
| 21 | Names/emails on the officer admin allowlist at launch; who holds admin | DC-4.1 |
| 22 | Join process, including whether non-UCLA emails may sign up | DC-4.1, DC-5.3 |
| 23 | RSVP policy values: default capacity, waitlist, cancellation cutoff | DC-5.4 |
| 24 | Data retention periods per data type | DC-4.1, DC-5.5 |
| 25 | Channel for uptime and error alerts | TS-6.1 |
| 26 | Definition of "clean energy" for the grid widget (e.g., whether nuclear and large hydro count) | BE-13.1 (and IF-6.1 if the stretch is built) |
| 27 | Where the full grid widget lives (expand on Home vs. a section on another page) | DS-6.4 |
| 28 | Launch announcement content | LA-3.1, LA-6.1 |
| 29 | Club-owned login for service accounts (is socet.ucla@gmail.com the owner?) | TS-1.1, PH-2.1 |
| 30 | Whether the Discord invite link is permanent | CP-3.1 |
| 31 | Phase 2 calendar dates for winter and spring quarter (P2 weeks 1–19) | UCLA academic calendar |
| 32 | Assignees, team size and skill mix | Before creation |
| 33 | UCLA finals-week dates vs. the week-8 launch | Before creation |
| 34 | Whether to build the Phase 1 stretch widget | IF-6 (decided end of week 6) |
| 35 | Whether to release member accounts and native RSVP at the end of winter (adds a release task) | Before Phase 2 starts |
| 36 | Languages for internationalization | P3-11 |

## Additional [TBD] items found while writing task descriptions (2026-10-20)

| # | [TBD] item | Where it is used |
|---|---|---|
| 37 | Which environment officers enter launch content into: production on its Vercel URL before DNS cutover, or staging and then re-entered. **This is a real scheduling gap:** content is loaded in week 7, but LA-2.1 migrates production in week 8 | CP-1.1, LA-2.1 |
| 38 | Confirm the final event-type list (the plan uses speaker, workshop, journal club, site tour, hackathon, social), and the type for the LA Tech Week panel | BE-1.1, CP-1.1 |
| 39 | Officer-approved description of the LA Tech Week event and the panelist names | CP-1.1 |
| 40 | Inbox that receives officer notifications for join, contact and sponsor inquiries; the "from" address for site email; the mailbox for DMARC reports | DC-4.1, BE-5.3, BE-12.1, BE-2.1, TS-7.2 |
| 41 | Exact fields for the join, contact and sponsor-inquiry forms; approved member-profile fields; email-preference categories | DC-4.1, DC-5.5, BE-5.1, BE-7.1, BE-12.1, IF-13.1 |
| 42 | Whether membership costs anything (About FAQ) | DC-3.1 |
| 43 | Numeric target values for the success metrics | DC-1.1 |
| 44 | Location of the club-owned shared folder for the logo, photos and consent/permission records | DC-2.2, CP-2.1 |
| 45 | Which design tool to use, and the location of the design file | DS-1.1 |
| 46 | UCLA Sustainability listing URL and its update process | DC-2.1, LA-3.1 |
| 47 | Which officers attend go/no-go meetings, acceptance tests and training sessions, and who has final say | LA-1.1, LA-5.1, QA-5.1, QA-13.2, PH-1.2, PH-3.2 |
| 48 | Who owns the website after officer rotation, and the yearly date for the rotation checklist | PH-5.2 |
| 49 | EIA API key registered under a club-owned account | IF-6.1, BE-13.1 |
| 50 | RSVP edge cases: whether unlimited capacity is allowed, and whether officers may promote past capacity | BE-9.1, IF-10.1, DC-5.4 |
| 51 | Expected peak RSVPs for a popular event, which sets the load-test target | QA-12.1 |
| 52 | How long the newsletter confirmation link stays valid | BE-12.2, IF-13.2 |
| 53 | CAPTCHA provider (Cloudflare Turnstile proposed) and the Vercel plan, which limits how often cron jobs run | BE-12.4, BE-13.5, BE-14.4, DC-5.6 |
| 54 | Phase 3 items: photo policy (P3-3); speaker-inquiry retention (P3-4); social account type and API token owner (P3-5); directory fields and whether non-UCLA alumni can join (P3-6); officer positions, selection process and application retention (P3-7); points rules (P3-8); Discord admin and bot approval (P3-9); which datasets (P3-10); translators (P3-11); how many epics to promote (PH-7.1) | P3-3 to P3-11, PH-7.1 |

## Asana status (2026-10-20)

- Project: https://app.asana.com/1/1207141395241534/project/1219718974335878 (private, SoCET UCLA team, owner Samantha Ortiz, no other members)
- Created and verified: 103 tasks (including the 11 Phase 3 epics) and 223 subtasks. All have the seven headings, none has an assignee, and due dates are on exactly 8 tasks.
- Native dependencies are not set. Asana returned "Task Dependencies are not available for free users or guests." Dependency IDs are in every description.
- Section order and the empty "Untitled section" must be fixed by hand in Asana. The API tools can't reorder or delete sections.
