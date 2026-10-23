# Plan

Source: the full outline in [plan/full-outline.md](plan/full-outline.md). This page is the readable summary. The day-to-day board is [PHASE-1-TASKS.md](PHASE-1-TASKS.md).

## Releases

| Release | Window | Hours |
|---|---|---|
| Phase 1 | Oct 21 to **Tue Dec 15, 2026** (8 weeks) | 176 h (cap 180, buffer 4 h) |
| Phase 1 stretch (IF-6 grid widget) | Week 7, only if actuals are 4 h or more under estimate by end of week 6 | +8 h |
| Phase 2 | Winter + spring quarters, ~19 weeks, dates TBD from UCLA calendar | 415 h |
| Phase 3 | After Phase 2 | 276 to 455 h, 11 epics |

## Phase 1 week plan

| Week | Dates (2026) | Tasks | Hours | Milestone at week end |
|---|---|---|---|---|
| 1 | Oct 21 to 27 | DC-1, DC-2, DC-4, TS-1, TS-2, TS-3 | 22 | Decisions logged (DC-1, DC-4); repo, CI and preview deploys live. **DC-4 due Oct 27** |
| 2 | Oct 28 to Nov 3 | DC-3, DS-1, DS-2, TS-4, BE-1 | 22 | Copy approved, wireframes done, staging DB + schema migrated. **BE-1 due Nov 3** |
| 3 | Nov 4 to 10 | DS-3, TS-5, BE-2 | 24 | Designs approved; base layout, dark mode, primitives on preview; officer sign-in works. **TS-5 due Nov 10** |
| 4 | Nov 11 to 17 | BE-3, BE-4, BE-5, PD-1 | 22 | Events, team and forms backend done; Home on preview. **PD-1 due Nov 17** |
| 5 | Nov 18 to 24 | PD-2 to PD-7, IF-1, IF-2 | 22 | All public pages on preview; filter and add-to-calendar working. **IF-1 due Nov 24** |
| 6 | Nov 25 to Dec 1 | TS-6, IF-3, PH-2 | 21 | Simple admin live on staging; README/runbook/account inventory written. **IF-3 due Dec 1.** Thanksgiving Nov 26: expect low availability |
| 7 | Dec 2 to 8 | TS-7, BE-6, IF-4, IF-5, CP-1, CP-2, QA-4 | 22 | Forms live, domain configured, real content loaded, security/privacy check done; stretch decision. **QA-4 due Dec 8** |
| 8 | Dec 9 to 15 | CP-3, QA-1, QA-2, QA-3, QA-5, LA-1 to LA-4, PH-1 | 21 | QA, officer acceptance, go/no-go, **LAUNCH Tue Dec 15** (LA-2) |

## How Phase 1 was kept small

Phase 1 ships simpler versions; the full versions are Phase 2.

| Area | Phase 1 | Full version later |
|---|---|---|
| Auth | Officer magic link, allowlist only | Member accounts + roles (BE-8) |
| RSVP | Partiful link-out + add-to-calendar | Native RSVP, waitlist, QR (BE-9, IF-8, IF-10) |
| Admin | Events + team CRUD, read-only submissions with CSV | Full dashboard, audit log (IF-9, BE-14) |
| Images | Validated upload, required alt text | Resize pipeline, EXIF strip (BE-11) |
| Forms | Stored with consent timestamp, honeypot + rate limit, one officer email. **No newsletter sent in Phase 1** | Double opt-in, CAPTCHA, sponsor form (BE-12) |
| Events UX | Filter + upcoming/past | Search (IF-7) |
| Observability | Free tiers | Alert rules, scanning (TS-8) |

## Capacity and risks

| Risk | Detail | Mitigation |
|---|---|---|
| Team size | Needs ~22 h/week total, peaking at 24 h in week 3. That fits 3 developers at ~8 h/week. With 2 developers each needs ~11 h/week or launch slips ~3 weeks | Confirm team size and skill mix now (open question #32); assign area leads |
| Tiny buffer | 4 h of buffer on 176 h | Track actual vs estimate weekly; no scope additions; skip the stretch widget unless under budget |
| Week 1 is tight | Week started Oct 21; DC-4 is due Oct 27 and depends on TS-1 | Start TS-1 and the officer meeting (DC-1.1) first |
| Content environment gap | Content loads in week 7, but production is migrated in week 8 (open question #37) | Decide where officers enter content; recommend production on its Vercel URL before DNS cutover |
| Officer availability | Many tasks need officer input (33 tasks/epics, 36 subtasks) | Book officer sessions early; see OPEN-QUESTIONS |
| Thanksgiving | Week 6 | Plan lower output; IF-3 is 16 h and due Dec 1, so start early |
| Finals | Week 8 may overlap UCLA finals (#33) | Option: keep build, move announcement (LA-3) to first week of winter quarter |
| Domain and accounts | Club-owned registrar and service logins needed (#9, #29) | Do TS-1.1 account inventory in week 1 |
| Dependencies | Asana free tier can't set native dependencies | Dependencies are listed in each task description and in PHASE-1-TASKS.md |

## Phase 2 blocks (guidance only, no due dates)

| Quarter | P2 weeks | Milestone |
|---|---|---|
| Winter | 1 to 3 | Phase 2 decisions and privacy update approved; design system extended; schema migrated; member sign-up on staging |
| Winter | 4 to 7 | Designs approved; native RSVP with waitlist, QR tokens, search on staging |
| Winter | 8 to 10 | Full admin dashboard, RSVP management, QR check-in, audit log, CSV exports on staging |
| Spring | 11 to 14 | Grid data service and widget, Projects/Opportunities/Sponsors pages on staging |
| Spring | 15 to 17 | All Phase 2 QA: e2e, devices, WCAG 2.2 AA, performance, security, load test |
| Spring | 18 to 19 | Officer UAT, Phase 2 release, full handoff docs, Phase 3 prioritized |

Phase 2 ships once, at the end of spring (LA-5).

## Phase 3 backlog

Newsletter/blog archive, journal-club resource hub, event recaps and gallery, speaker inquiry form, social embeds, alumni directory, officer application flow, attendance leaderboard, Discord bot, multi-dataset climate dashboard, internationalization. Details and estimates: section 11 of the full outline.
