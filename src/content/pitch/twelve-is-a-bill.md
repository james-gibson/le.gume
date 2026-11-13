---
title: Twelve is a bill
description: The factors are a menu with prices, not a maturity ladder. Applying all twelve to a static site buys a database, a port and a process model for files a CDN already serves.
order: 8
updated: 2026-11-13
tags: pitch, factors, cost
seeds: pitch, twelve-factors
---

# Twelve is a bill

The twelve factors are good advice for the thing they were written for: a long-running web
application, built by a team, operated by someone who is not the author. They are not a maturity
ladder, and treating them as one has a price.

This site is the receipt. It applies nine of them, declines three on the record, and the bill for
that subset is visible in its own build — a guard, fifty-odd route shells, a dependency tree, a
rebuild whenever one of them needs patching.

## What all twelve would add here

Every factor page ends with *what it costs* and *skip it when*. This is the same exercise for the
whole set, priced at the smallest honest sizes:

| Factor | What compliance would add | What it costs here |
| --- | --- | --- |
| 4 Backing services | a managed database for content that is already files | $15–25/month floor, plus backups, a credential to rotate, and a second source of truth |
| 7 Port binding | a container, a port, TLS termination, a health check | $5–20/month, plus a target that can be down when the CDN would not be |
| 8 Concurrency | a process model and workers for a workload served by a CDN | a runtime bill and a scaling story for something with no processes |
| 11 Logs | a log drain, retention, and an alert someone must read | $10–30/month once retention matters, plus the rota to read it |
| 10 Dev/prod parity | a staging copy kept in sync with production | doubles the hosting line, and adds the drift between two environments |
| 12 Admin processes | an authenticated admin surface for commands that run from a repo | auth, an audit trail, and a way to run it without breaking the site |
| 3 Config | environment variables for a base path and a build target | near zero — this one is genuinely cheap, and already done |
| 6 Processes | stateless processes to restart | already true in a stronger form: there is nothing to restart |

Add the floors and it is roughly **$40–80 a month**, plus the attention to patch, back up and
watch it — for a site whose content is Markdown in a repository. The invoice is the small half. The
large half is that each of those components is something that can leak, be exploited, or page
someone at 2am, and a documentation site has no reason to own any of it.

## This site is the receipt

At the time of writing, the honest subset costs: about fifty pages, seventy-odd files in the build,
2.9 MB, a guard of 400-odd lines, sixty-three prerendered shells, seven runtime dependencies, and a rebuild
and deploy whenever a dependency needs patching.

That is the bill for nine factors applied to a folder of Markdown. None of it is waste — the guard
is what keeps the claims true — but it is the *floor* of the discipline, not a rounding error. A
stack that followed all twelve would spend more than this to gain properties a static site cannot
use: a database to keep in sync with files, a port to defend, processes to restart.

The demonstration is not that this site is cheap. It is that even the subset has a receipt, and the
receipt is written down rather than discovered: [A cost centre, until a threshold](/pitch/cost-centres)
names the conditions and the expiry.

## Where the twelve earn their keep

If you have a long-running application, state that must survive a restart, a team, and someone on
call, then factors 4, 7 and 8 describe things you actually have. Skipping them there is the
expensive choice: a hand-rolled queue, a server patched by hand, a database without backups.

The rule is not "fewer factors". It is **pay for the ones whose subject exists**.

- Does the thing the factor protects exist here?
- What breaks if I ignore it, and who notices?
- If the answer is *nothing, and nobody*, skip it — and write the skip down, so the next person
  does not mistake the omission for an oversight.

That last step is the one people skip. An unwritten skip becomes an argument in six months; a
written one becomes a decision with a date on it.

## What this is not

- **Not an argument that the factors are wrong.** They are well-aimed at a shape this site is not.
- **Not a compliance claim.** The site is not twelve-factor compliant, and the pages say so where
  it matters. Claiming all twelve would be the brochure behaviour this pitch argues against.
- **Not free.** The subset still costs a guard, a rebuild and someone's attention —
  [Free, twice](/pitch/free) prices that honestly.

## The short version

- The twelve are a **menu with prices**, not a ladder to climb.
- Applying all twelve here buys a **database, a port and a process model** for files that a CDN
  already serves, for about **$40–80 a month** and a patching rota.
- This site is the **receipt**: nine applied, three declined, and even that has a visible bill.

A vendor selling twelve-factor compliance is selling infrastructure sized for someone else's
application. The useful question is not "are we compliant?" but "which of these does our shape
actually have, and what does the rest cost?"
