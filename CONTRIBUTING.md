# Contributing

Short version: pick a task, branch, open a PR, get one review, merge when CI is green.

## 1. Pick work

- Work from the current week in [docs/PHASE-1-TASKS.md](docs/PHASE-1-TASKS.md).
- A task is ready when everything in its **Depends on** list is done.
- Claim it: put your name in the **Owner** column (and as assignee in Asana) before you start, so two people don't build the same thing.
- Each task's full description (goal, in scope, out of scope, definition of done, reference) is in the Asana task and in [docs/plan/full-outline.md](docs/plan/full-outline.md). **Out of scope means out of scope.** Park extras in the backlog.
- Blocked on a missing fact? Check [docs/OPEN-QUESTIONS.md](docs/OPEN-QUESTIONS.md), then ask the area lead.

## 2. Branch and commit

Branch from `main`: `<task-id>-short-description`, e.g. `BE-3-events-crud`.

Commit messages: `type(scope): description`, e.g. `feat(events): add type filter chips`. Types: `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`.

Keep PRs small, ideally one subtask (1 to 4 h of work).

## 3. Open a PR

- Title starts with the task ID: `IF-1.1 Type filter chips and upcoming/past toggle`.
- Fill in the PR template. Link the Asana task.
- Every PR gets a Vercel preview URL. Click through it on a phone-width window before asking for review.
- Needs **CI green and 1 approving review**. Don't merge your own PR without one.
- Reviewers: check the task's definition of done, not just that the code runs.

## 4. Definition of done (every TS, BE, PD and IF task)

1. Tests written and passing in CI.
2. Deployed to a preview URL.
3. Reviewed and approved in a PR.

Plus whatever the task lists. For UI also:

- Works at phone width, light and dark mode.
- Keyboard only works; focus is visible; VoiceOver/screen reader announces state.
- axe reports zero violations on the page.
- Copy comes from approved text (DC-3), not invented.

## 5. Code standards

- TypeScript strict. No `any` without a comment saying why.
- Validate all external input with Zod, on the server.
- Admin server actions call `requireRole` first. Add a test for the denied path.
- No real personal data in seed data, fixtures, logs or screenshots.
- Never commit secrets. Add new variables to `.env.example` with a dummy value.
- Images need alt text. Interactive elements are real buttons/links.
- Use tokens and primitives from the design system; don't hard-code colors or spacing.

## 6. Changing the plan

- Scope change: discuss with the project lead first. Phase 1 has 4 h of buffer.
- Significant tech choice: add an ADR in `docs/adr/` (copy `0000-template.md`).
- When you answer a `[TBD]` item, update `docs/OPEN-QUESTIONS.md` and the decision log.

## 7. Weekly rhythm (suggested)

- **Start of week:** review that week's tasks, claim work, flag blockers.
- **Mid-week:** check open questions that block next week.
- **End of week:** mark tasks done, update hours vs estimate (this decides the week-7 stretch), tick off the week's milestone.
