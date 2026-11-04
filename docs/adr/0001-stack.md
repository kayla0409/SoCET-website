# ADR-0001: Tech stack, hosted services and who owns them

- **Status:** accepted. Accepted when this PR is approved by the dev team. Items marked **officer decision** still go to Niteesh.
- **Date:** 2026-11-03
- **Deciders:** Kayla, Samantha (dev team); officers for the items marked below
- **Closes:** TS-1 (TS-1.1)

## Context

We are 2 to 3 part-time student developers (about 8 h/week each) building a club site that officers must be able to run and hand over every year. That gives us these constraints:

- **Cost:** \$0/month if possible. Paid services need officer approval (budget decided in DC-4.1, open question #20).
- **Handover:** every account belongs to a club-owned account, not a person's (login still [TBD], open question #29). Officers change every year, so we pick fewer services, and ones that are easy to understand.
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
| Neon (hosted Postgres) | Sleeps when idle and wakes up on the next request, so it never "pauses" for good. Database branches for previews | Database only: we would still need a separate login provider and file storage | Free: 1 GB per project (checked 2026-11-03) |
| Google Sheets | Officers already know it | No unique constraints (duplicate emails), no relations between tables, easy to leak a shared link | Free |

### Newsletter

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **Mailchimp** | Officers write and send newsletters themselves. Handles double opt-in, unsubscribe links and the legal footer. Already built in #7 | Another account to hand over. Free tier is small | Free: 250 contacts, 500 sends/month, 250 sends/day (checked 2026-11-03) |
| Store signups in our database and send with Resend | One fewer account | We would have to build unsubscribe, templates and sending tools. Not in Phase 1 budget | Free: 3,000 emails/month, 100/day |

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

### Analytics

Must be cookieless, collect no personal data and cost \$0.

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **Vercel Web Analytics** | Already in the Vercel account we use for hosting, so no new account. No cookies; visitors are a hash that is dropped after 24 hours. No IP address or personal identifier stored. Page-view URLs can be redacted before sending | Basic reports only. Data lives with Vercel. Counts events, with a monthly cap | Free (Hobby): 50K events/month. Pro: \$3 per 100K events |
| Plausible | Cookieless, no personal data, simple dashboard | **No free plan**, only a 30-day trial. A new account and a monthly bill for a \$0 budget | Starter \$9/month for 10K pageviews |

Plausible is ruled out: it has no free plan and the budget is \$0 until officers approve spending (open question #20).

### Uptime monitor

Must be free and alert on both the site and the daily Supabase keep-alive ping.

| Option | Pros | Cons | Cost |
|---|---|---|---|
| **Better Stack** | Free plan includes both monitors and heartbeats (10 combined), with email and Slack alerts. A heartbeat alerts if the daily keep-alive ping does not arrive. One free status page | Check interval on the free plan is [unverified]. Another account to hand over | Free: 10 monitors and heartbeats. Paid from \$29/month (yearly) per responder seat |
| UptimeRobot | 50 monitors, 5-minute checks, email alerts. Free plan allowed for commercial projects | Whether heartbeat monitoring is on the free plan is [unverified]; without it, the daily keep-alive ping cannot be watched | Free: 50 monitors. Paid from \$12/month (yearly) |

Both can watch the site. Only Better Stack is confirmed to cover heartbeats on its free plan, so it wins.

## Decision

| Concern | Choice | Why, in one line | Account owner |
|---|---|---|---|
| App | One Next.js App Router app with React and strict TypeScript, deployed to Vercel | One repo and one deploy for a small, rotating team | Code: club GitHub org. Vercel: club account ([TBD], open question #29) |
| Styling and design | Tailwind CSS with tokens from Figma | Fast responsive styling; tokens keep light and dark mode consistent | Figma: club account ([TBD], open questions #29 and #45) |
| Server code | Next.js server actions or route handlers in `src/server` | Keys and personal data stay on the server | n/a |
| Validation | Zod on every server action and form | Same checks on every input; already in use | n/a |
| Database | Supabase Postgres: one project for staging, one for production. Schema changes go through versioned migrations checked into the repo | Postgres prevents duplicate emails and links tables; Supabase also gives us login and file storage | club account ([TBD], open question #29) |
| Keeping the database awake | A daily scheduled ping (Vercel cron or a GitHub Actions schedule) to each project, which also pings a Better Stack heartbeat | Free projects pause after 1 week idle, and signups are occasional. Vercel Hobby cron runs once a day at most, which is enough. **Fallback:** move to Neon (wakes on request) or Supabase Pro if pings aren't enough | n/a |
| Officer login | Supabase Auth magic links, restricted to the officer allowlist (open question #21) | No extra service; replaces Auth.js | club account ([TBD], open question #29) |
| Officer access to data | A small admin page in the site (IF-3). Only the tech lead(s) get the Supabase dashboard | The dashboard gives full database access to anyone on it; an admin page limits what officers can do and is easier to hand over | n/a |
| Team photos | Supabase Storage | Same account as the database | club account ([TBD], open question #29) |
| Email | Resend: login emails (as Supabase's SMTP) and officer notifications for join and contact forms | Reliable delivery with a free tier | club account ([TBD], open question #29) |
| Newsletter | Mailchimp, double opt-in, through a server action (#7) | Officers can send newsletters without a developer | club account ([TBD], open question #29) |
| Events | One public "SoCET Events" Google Calendar. `getEvents()` reads its public feed on the server and feeds the existing homepage calendar. `src/content/events.ts` stays as the fallback until the feed is set up | Officers edit Google Calendar and the site updates itself; no iframe, no Google cookies on our site | club Google account ([TBD], open questions #29 and #56) |
| Community | Discord invite link | Where members already are | n/a |
| Tests and CI | Vitest unit tests; Playwright e2e with axe accessibility checks; GitHub Actions. Lighthouse CI Home budget still to add (TS-3.2) | Catches broken pages and accessibility regressions before merge | club GitHub org |
| Error tracking | Sentry free tier with PII scrubbing (TS-6) | Find errors without tracking visitors | club account ([TBD], open question #29) |
| Analytics | Vercel Web Analytics (TS-6) | Cookieless, no personal data, free, no new account | Same Vercel account: club account ([TBD], open question #29) |
| Uptime monitor | Better Stack free plan: one monitor on the site, one heartbeat for the keep-alive ping (TS-6). Alert channel is open question #25 | Free, and the only free option confirmed to alert on a missed ping | club account ([TBD], open question #29) |

### Costs and free-tier limits

Every number below was read from the vendor's own pricing page on **2026-11-03**. Anything we could not confirm says [unverified].

| Service | Free tier we rely on | Paid price | Checked |
|---|---|---|---|
| Vercel (Hobby) | Hosting for personal, non-commercial use. Cron jobs once per day at most. Web Analytics: 50K events/month | Pro: \$20/month per developer seat. Analytics on Pro: \$3 per 100K events | 2026-11-03 |
| Supabase | 2 active projects (staging and production use both, so no third for per-PR databases), 500 MB database per project, 1 GB file storage, 50,000 monthly active users. Projects pause after 1 week of inactivity | Pro: \$25/month | 2026-11-03 |
| Resend | 3,000 emails/month, 100/day, 3 domains | Pro: \$20/month for 50,000 emails | 2026-11-03 |
| Mailchimp | 250 contacts, 500 sends/month, 250 sends/day | Essentials: \$13/month (promotional price for the first 12 months; list price [unverified]) | 2026-11-03 |
| Google Calendar | Free with a Google account [unverified: no pricing page checked] | n/a | 2026-11-03 |
| Sentry | Developer plan: 5,000 errors/month, 1 user | Team: \$29/month (monthly billing) | 2026-11-03 |
| Vercel Web Analytics | 50K events/month (Hobby), cookieless | \$3 per 100K events (Pro) | 2026-11-03 |
| Better Stack (uptime) | 10 monitors and heartbeats combined, email and Slack alerts, 1 status page. Check interval [unverified] | \$29/month per responder seat (yearly billing), \$34 monthly | 2026-11-03 |
| GitHub (club org) | GitHub Free: unlimited private repos, 2,000 Actions minutes/month (free for public repos) | Team: \$4 per user/month | 2026-11-03 |
| Figma | Free Starter plan [file limits unverified]. Education plan is free for students and educators in a structured classroom; whether a club qualifies is [unverified] | Professional: \$16/month per Full seat | 2026-11-03 |
| Domain (TS-7) | Not free | [unverified]: depends on the registrar (open question #9) | n/a |

| Service | If we outgrow the free tier | Free-tier fallback | Paid fallback | Account owner |
|---|---|---|---|---|
| Vercel (Hobby) | Cron limit means no more than a daily ping. Non-commercial terms could be questioned | Another free host (for example Netlify or Cloudflare Pages) [unverified: not priced here] | Pro | club account ([TBD], open question #29) |
| Supabase | Project pauses or hits the size cap; a third project can't be created | Neon free (1 GB per project, wakes on request) for the database, with login and photo storage handled separately | Pro | club account ([TBD], open question #29) |
| Resend | Emails stop for the rest of the day or month | Supabase's built-in login email (testing use only) for sign-in; form notifications wait for the next day | Pro | club account ([TBD], open question #29) |
| Mailchimp | Can't add contacts or send | Store signups in our database and send through Resend's free tier (needs unsubscribe and templates built, not in Phase 1) | Essentials | club account ([TBD], open question #29) |
| Google Calendar | n/a | `src/content/events.ts` stays as the fallback list | n/a | club Google account ([TBD], open questions #29 and #56) |
| Sentry | Errors are dropped | Read errors in Vercel function logs | Team | club account ([TBD], open question #29) |
| Vercel Web Analytics | Counting stops or is limited [unverified] | Turn analytics off; the site does not depend on it | Pro rate | Same as Vercel: club account ([TBD], open question #29) |
| Better Stack | Over 10 monitors and heartbeats | UptimeRobot free plan (heartbeat support [unverified]) | Paid plan | club account ([TBD], open question #29) |
| GitHub | Actions minutes run out on a private repo | Keep the repo public (Actions minutes are free for public repos) | Team | Club GitHub org |
| Figma | File limits on Starter [unverified] | Keep tokens as JSON in the repo and edit there | Professional | club account ([TBD], open questions #29 and #45) |
| Domain (TS-7) | n/a | Use the `.vercel.app` URL | Registrar fee | [TBD], open questions #9 and #29 |

The budget for any paid row is decided in DC-4.1 (open question #20). Expected total: **\$0/month plus the domain**. Check these limits again when each account is created; they change.

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
- **Revisit:** after one month live, check whether Supabase stayed awake, and whether Mailchimp (250 contacts, 500 sends/month) and Resend usage fits the free tiers. Mailchimp's free tier is the smallest, so expect to hit it first.

## Not decided here (officer decisions)

These appeared in an earlier diagram but are **not** in Phase 1 scope. Officers decide whether to add them as tasks (open question #55):

- "Build With Us" project-idea form (new)
- Membership registration beyond the Phase 1 Join form
- Projects page (Phase 2, PD-8)
- Resources page (Phase 3)
