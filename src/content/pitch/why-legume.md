---
title: Why le.gume
description: The business case — what a documentation site costs to own, and what the promise is worth.
order: 1
updated: 2026-11-12
tags: pitch, roi
seeds: pitch
---

# Why le.gume

Most documentation sites are not expensive to build. They are expensive to *keep*: a theme, a
plugin graph, a search service, a build that only one person can run. The cost shows up eighteen
months later, when the person who could run it has moved on and the docs quietly fall behind the
product.

This site is the opposite trade: a small amount of code you own, a build that fails loudly, and
publication that costs nothing.

## The numbers

| | Typical docs platform | This |
| --- | --- | --- |
| Dependencies | 30–200 packages | 7 runtime, 8 build |
| Build time | 20–90s, incremental, fragile | under 3s locally |
| Hosting | managed, metered | GitHub Pages, free for public repos |
| Publish | a person, a runbook | a push |
| Failure mode | stale, silently | build fails, loudly |
| Search | a service to keep alive | none, until the site earns one |

Those are not marketing numbers. `npm run build` on this repository is a type-check, a Vite
build and two small scripts.

The business reading of that table is one line: **the recurring cost is a push, and the failure is
loud.** Neither column is wrong — a managed platform buys the same guarantees with an invoice instead
of attention, and [that trade has an expiry date](/pitch/cost-centres). Everything else — fewer packages, seconds instead of minutes, free hosting — is the same
claim about maintenance from different angles. A site whose upkeep fits in a minute gets updated; a
site whose upkeep needs a specialist gets stale, and stale documentation is a support cost wearing a
different hat.

## The part that is hard to price

Documentation is a promise that the thing you describe still exists. A stack with one build, one
guard and one navigation makes keeping that promise cheap — and cheap promises get kept.

That is the whole case. It is not that this stack makes better documents; it is that it makes
**keeping them true** affordable, and the second one is what an organisation is actually buying.

## Where the rest of the argument lives

The engineering reasoning — ownership, the guard, derived navigation, and what it costs an operator
— is [The operations case](/docs/operations-case). It is a different audience and a different set of
objections, and it does not belong in a page about money.

What this stack deliberately does not do is [on the next page](/pitch/spill-the-beans). Read it
before you approve anything; a pitch that lists only strengths is a brochure.
