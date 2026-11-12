---
title: 12. Admin processes
description: Housekeeping tasks run as one-off commands from the same code, not as ad-hoc rituals.
order: 13
updated: 2026-11-12
tags: factor, operations
seeds: twelve-factors
---

# 12. Admin processes

> Maintenance runs as a short-lived command, using the same code and the same configuration as the app.

## The idea

Some jobs are not the product: database migrations, backfills, cache clears, index rebuilds,
one-off reports. The temptation is to do them by hand — a query pasted into a console, a script on
someone's laptop — because they happen rarely.

Admin processes are the opposite habit: put each job in the repository as a command, run it against
the same environment the app uses, and let it exit when it is done. No daemon, no long-lived
"admin server".

## A picture

```bash
npm run guard     # one check, exits with a code
npm run smoke     # renders every route once, exits
./index.sh        # rebuild the search index, exits
```

Each is boring, repeatable and reviewable.

## What it buys

- The task is documented by being code, and reviewed before it touches data.
- It can run in CI, on a schedule, or by hand — same result.
- Someone else can perform it without a meeting.

## What it costs

- **Tooling.** A command needs a home, a name and an entry in the docs.
- **Discipline.** The manual shortcut is always faster in the moment.
- **Guardrails.** A script that deletes data needs a confirmation flag; writing it is work.

## Skip it when

The task is genuinely one-time and irreversible — a migration you will never repeat. Then a
carefully reviewed one-off is correct; the factor's advice is that it still lives in the repository,
so the next person can read what happened.

## Where this site stands

**Applied.** `npm run guard`, `npm run smoke` and the vault's indexer are one-shot commands with
exit codes. None of them runs as a service, and each can be run by a stranger who has read the
README.

## Exercise

Write down the last three maintenance tasks you did by hand. For each, ask: *could this be a
command someone else runs?* The one you would be nervous to hand over is the one worth writing
down first.

Back to: [Start here](/factors/start-here)
