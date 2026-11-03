# ADR-0001: Tech stack, hosted services and who owns them

- **Status:** proposed (needs a 👍 from the dev team on the PR; items marked **officer decision** go to Niteesh)
- **Date:** 2026-11-03
- **Deciders:** Kayla, Samantha (dev team); officers for the items marked below
- **Closes:** TS-1 (TS-1.1)

## Context

We are 2 to 3 part-time student developers (about 8 h/week each) building a club site that officers must be able to run and hand over every year. That gives us these constraints:

- **Cost:** \$0/month if possible. Paid services need officer approval (open question #20).
- **Handover:** every account belongs to a club login, not a person's (open question #29). Officers change every year, so we pick fewer services, and ones that are easy to understand.
- **Privacy first:** collect only the fields officers approve (DC-4), no third-party tracking, and personal data stays server-side.
- **Scope:** Phase 1 is 176 h against a 180 h cap. This ADR does not add pages or forms. See "Not decided here" at the end.

## Options considered

### Application shape

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **One Next.js app (frontend and server code together)** | One repo, one deploy, one set of env vars. Server actions keep API keys on the server. Most tutorials for students use it | Ties us to Next.js conventions | Free |
| Separate frontend and API server | Clear split | Two deploys, CORS, twice the setup to hand over. Overkill for a few forms | Free to low |

### Database

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **Supabase (hosted Postgres)** | Postgres plus login (Supabase Auth), file storage and row-level security in one account. Good dashboard. Two free projects cover staging and production | **Free projects pause after about 7 days with no activity**, and a paused project stays down until someone restores it. Easy to give too many people full access through the dashboard | Free: 500 MB database, 1 GB file storage. Pro is \$25/month |
| Neon (hosted Postgres) | Sleeps when idle and wakes up on the next request, so it never "pauses" for good. Database branches for previews | Database only: we would still need a separate login provider and file storage | Free: 0.5 GB per project |
| Google Sheets | Officers already know it | No unique constraints (duplicate emails), no relations between tables, easy to leak a shared link | Free |

### Newsletter

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **Mailchimp** | Officers write and send newsletters themselves. Handles double opt-in, unsubscribe links and the legal footer. Already built in #7 | Another account to hand over. Free tier is small | Free: about 500 contacts and 1,000 sends/month (check current limits on signup) |
| Store signups in our database and send with Resend | One fewer account | We would have to build unsubscribe, templates and sending tools. Not in Phase 1 budget | Free tier |

### Events calendar

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **Public Google Calendar feed read by `getEvents()`** | Officers keep using Google Calendar; the site updates on its own. Feeds the calendar and "Coming up" list already on the homepage (#2), so it keeps our styling, dark mode and accessibility | Needs a public "SoCET Events" calendar. If the feed is down we need a fallback | Free |
| Google Calendar iframe embed | No code | Would replace or duplicate the homepage calendar from #2. The club calendar is not public now (the public feed only shows "Busy" blocks), so it would look empty. Third-party iframe sets Google cookies, can't match our styling or dark mode, weaker accessibility | Free |
| Events in a database, edited through our admin page (BE-3, IF-3) | Full control | Officers enter events twice (Google Calendar and the site) | Free |

### Officer login

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **Supabase Auth email magic links, officer allowlist** | Comes with the Supabase account, no extra service. No passwords to manage | Its built-in email sender is rate-limited and meant for testing, so we point it at Resend (custom SMTP) | Free: 50,000 monthly active users |
| Auth.js magic links | Database-agnostic | One more library to set up and maintain alongside Supabase | Free |

## Decision

| Concern | Choice | Why, in one line | Account owner |
|---|---|---|---|
| App | One Next.js App Router app with React and strict TypeScript, deployed to Vercel | One repo and one deploy for a small, rotating team | club GitHub org |
| Styling and design | Tailwind CSS with tokens from Figma | Fast responsive styling; tokens keep light and dark mode consistent | club login (Figma, open question #45) |
| Server code | Next.js server actions or route handlers in `src/server` | Keys and personal data stay on the server | n/a |
| Validation | Zod on every server action and form | Same checks on every input; already in use | n/a |
| Database | Supabase Postgres: one project for staging, one for production. Schema changes go through versioned migrations checked into the repo | Postgres prevents duplicate emails and links tables; Supabase also gives us login and file storage | club login |
| Keeping the database awake | A daily scheduled ping (Vercel cron or a GitHub Actions schedule) to each project | Free projects pause after about a week idle, and signups are occasional. **Fallback:** move to Neon (wakes on request) or Supabase Pro if pings aren't enough | n/a |
| Officer login | Supabase Auth magic links, restricted to the officer allowlist (open question #21) | No extra service; replaces Auth.js | club login |
| Officer access to data | A small admin page in the site (IF-3). Only the tech lead(s) get the Supabase dashboard | The dashboard gives full database access to anyone on it; an admin page limits what officers can do and is easier to hand over | n/a |
| Team photos | Supabase Storage | Same account as the database | club login |
| Email | Resend: login emails (as Supabase's SMTP) and officer notifications for join and contact forms | Reliable delivery with a free tier | club login |
| Newsletter | Mailchimp, double opt-in, through a server action (#7) | Officers can send newsletters without a developer | club login |
| Events | One public "SoCET Events" Google Calendar. `getEvents()` reads its public feed on the server and feeds the existing homepage calendar. `src/content/events.ts` stays as the fallback until the feed is set up | Officers edit Google Calendar and the site updates itself; no iframe, no Google cookies on our site | club Google account |
| Community | Discord invite link | Where members already are | n/a |
| Tests and CI | Vitest unit tests; Playwright e2e with axe accessibility checks; GitHub Actions. Lighthouse CI Home budget still to add (TS-3.2) | Catches broken pages and accessibility regressions before merge | club GitHub org |
| Monitoring | Sentry free tier with PII scrubbing, cookieless analytics, uptime monitor (TS-6, unchanged) | Find errors without tracking visitors | club login |

### Costs and free-tier limits

| Service | Free tier we rely on | What happens if we outgrow it | Paid fallback |
|---|---|---|---|
| Vercel (Hobby) | Hosting, preview per PR, daily cron | Hobby plan is for non-commercial use; fine for a student club site | Pro, \$20/month per member |
| Supabase | 2 active projects per organization (staging and production use both, so there is no room for a third, e.g. per-PR databases), 500 MB database, 1 GB storage, 50,000 auth users; pauses after ~7 days idle | Project pauses or hits the size cap; a third project can't be created | Pro, \$25/month; or move to Neon (free) |
| Resend | 3,000 emails/month, 100/day | Emails stop for the rest of the day or month | Pro, \$20/month |
| Mailchimp | About 500 contacts, 1,000 sends/month | Can't add contacts or send | Paid plans from about \$13/month |
| Google Calendar | Free | n/a | n/a |
| Sentry | 5,000 errors/month | Errors are dropped | Team plan |
| Domain (TS-7) | Not free | n/a | About \$10 to \$20/year |

Check these limits when creating each account; they change. Expected total: **\$0/month plus the domain**.

## Consequences

- **Easier:** one place (Supabase) for data, login and photos. Officers manage events in Google Calendar and newsletters in Mailchimp, with no developer needed.
- **Harder:** the staging and production Supabase projects must be kept awake, and someone must notice if the ping fails (alert via TS-6).
- **Security work we now own:**
  - Turn on row-level security for every table.
  - Keep the Supabase service key server-side only. It never goes in a `NEXT_PUBLIC_` variable or in client code.
  - Only the tech lead(s) get dashboard access.
- **Before collecting membership data:** the privacy page (PD-7) and the officer decision on which fields to collect and how long to keep them (DC-4, open questions #24 and #41) must come first.
- **Plan text to read differently:** older task text in [plan/full-outline.md](../plan/full-outline.md) says Prisma (TS-4.1) and Auth.js (BE-2.1). Read those as Supabase migrations and Supabase Auth. Task IDs and names stay the same so they still match Asana.
- **Events admin may shrink:** if officers adopt the Google Calendar feed, event create/edit in BE-3 and IF-3 may not be needed. Decide that when BE-3 is picked up, and record the hours saved.
- **Revisit:** after one month live, check whether Supabase stayed awake, and whether Mailchimp and Resend usage fits the free tiers.

## Not decided here (officer decisions)

These appeared in an earlier diagram but are **not** in Phase 1 scope. Officers decide whether to add them as tasks (open question #55):

- "Build With Us" project-idea form (new)
- Membership registration beyond the Phase 1 Join form
- Projects page (Phase 2, PD-8)
- Resources page (Phase 3)
