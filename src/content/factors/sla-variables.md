---
title: Every factor moves the number
description: The factors are switches, not commandments. Each one applied or declined changes availability along the request path — and every external service changes it in both directions.
order: 14
updated: 2026-11-13
tags: factors, reliability, sla
seeds: twelve-factors
---

# Every factor moves the number

The previous thirteen pages each end with a cost and a skip. This one is about the number those
decisions actually move: **availability**.

A factor applied or declined does not change how modern the stack looks. It changes how often the
site is down, and for how long. That is the variable the rest of this section has been quietly
arguing about, so it is worth writing down.

## Uptime multiplies

If a request passes through three services, and each is available 99.9% of the time, the path is
not 99.9%. It is:

> 0.999 × 0.999 × 0.999 = 0.997 — about **26 hours a year**, not the 8.8 hours each vendor
> advertises.

The product is always smaller than the smallest factor, and it gets smaller with every service you
put in the path:

| Path | Arithmetic | Downtime a year |
| --- | --- | --- |
| one service at 99.9% | 0.999 | 8.8 hours |
| three services at 99.9% | 0.999³ | 26.3 hours |
| five services at 99.9% | 0.999⁵ | 43.8 hours |
| three services at 99.99% | 0.9999³ | 2.6 hours |
| one service at 99.99% | 0.9999 | 53 minutes |

Nobody advertises the second row. The vendor's number is real, and so is the multiplication — they
are just measuring different things.

## An external service changes reliability — both ways

"Use a service" is not automatically less reliable, and "own it" is not automatically more. The
direction depends on what the service replaces:

- **A CDN usually raises the number.** You rent an edge network larger than any single server you
  would run, with more redundancy than you would pay for. The dependency is real; so is the gain.
- **A database, an API or an identity provider usually lowers it.** Each one is another
  multiplication, and each one fails for reasons you cannot fix. You inherit their incident
  reviews.
- **A shared dependency can fail for all of them at once.** Two services in the same region, behind
  the same DNS provider, authenticated by the same identity provider, are not three independent
  9s. They are one 9 with three invoices.

What changes most is not the percentage but the **failure mode**. A static site degrades: slow,
stale, a page that will not load. A stack with a database fails: a 500, a login loop, no content
at all. An availability number does not distinguish "degraded" from "gone", and your users do.

## The switches

Each factor moves the number in a direction, and the direction is not always the one the rule's
name suggests:

| Factor | Applied | Declined | What it does to the number |
| --- | --- | --- | --- |
| 2 Dependencies | pinned, built once | drift | an unpinned upgrade is an outage you scheduled |
| 3 Config | decided at build | a config service | runtime config is one more service in the path |
| 4 Backing services | none at runtime | a database or API | every service multiplies its uptime into yours |
| 5 Build, release, run | atomic artefact | edits in place | rollback is a revert, not an incident |
| 6 Processes | none to crash | restartable processes | a process is a thing that can be down |
| 7 Port binding | declined | your own socket | you own TLS, health checks and patching |
| 8 Concurrency | declined | workers | more parts, more partial failure |
| 9 Disposability | rebuild from source | pets | a lost host is a rebuild, not a loss |
| 10 Dev/prod parity | one command | staging drift | failures found in production are outages |
| 11 Logs | CI output | a log pipeline | visibility bought with another dependency |
| 12 Admin processes | one-off commands | an admin service | an admin surface is an attack surface |
| 1 Codebase | one repository | several | one deploy, one rollback, one truth |

Read the table as a set of switches, not a scoreboard. Flipping one changes the number and changes
what the system can do; there is no setting that wins on both.

## This site's number

The honest statement is short: **the host publishes no uptime figure for the free tier, so this
site cannot promise one.** What it can say is what it adds to the path — nothing. The request is
DNS, then the host's edge, then a file. There is no database to be down, no process to restart, no
API to time out.

That is the shortest path this project can have, and it still has two failure sources: the host,
and the deploy identity. The most likely outage this site will ever have is a bad push, and that
one is ours.

Route shells are part of the number too. A deep link that 404s on reload is an availability
failure, even when the edge is up — which is why the build writes a shell for every route.

## The arithmetic you can do before you buy

1. List every service in the request path — including DNS, identity and the CDN. They are all in
   the multiplication.
2. Multiply the published numbers. If a service publishes none, assume 99.9% and write the
   assumption down.
3. Compare the product with the promise you are making. If it is lower, remove a service or lower
   the promise. Those are the only two honest options.
4. Separate the failures that are yours from the ones that are theirs. You can fix yours; you can
   only explain theirs.

Step three is the one that changes decisions, and it is also the one that is cheapest to do: a
promise lowered before an incident costs nothing.

## What it costs

- **An afternoon and an awkward vendor call.** Counting services is easy; saying "your 99.9% makes
  our product 99.7%" is not.
- **Capability.** Removing a service improves the number and removes something a user wanted. The
  number is not the only variable.
- **Honesty about the ceiling.** Promising less than you hoped is free and unpopular.

## What this is not

- **Not "fewer services is always better".** One server you patch by hand is less reliable than a
  CDN, with fewer services. The CDN is the better trade, and it is still a dependency.
- **Not a guarantee.** No SLA is offered here. This page is arithmetic, not a contract.
- **Not an argument against the factors.** It is the reason to keep them: as switches whose
  positions you chose, rather than commandments whose positions were chosen for you.

## The short version

- Availability **multiplies** along the request path; the product is always the smallest number.
- An external service changes the number **in both directions**, and changes the failure mode from
  degraded to gone.
- The factors are the **switches**; the number is the result. Flipping one is a decision, and every
  decision has a price.

The prices are on [Start here](/factors/start-here); the whole set, totalled, is
[Twelve is a bill](/pitch/twelve-is-a-bill).
