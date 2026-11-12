---
title: The commercial case
description: The argument, the numbers and the limits, written for whoever approves the time or the invoice.
order: 5
updated: 2026-11-12
tags: seed, pitch
---

# The commercial case

The audience is the person who approves the time or the invoice. The assumption is that you care
about cost, risk and maintenance rather than syntax. The entrance is
[Why le.gume](/pitch/why-legume).

## What is inside

- **The business case** — the running cost, the failure mode, and what "keeping the promise true"
  is worth, with the numbers that back each one.
- **The limits** — [Let me spill the beans](/pitch/spill-the-beans): what it does not do, what it
  costs later, and where it is the wrong answer.
- **The expiry** — [A cost centre, until a threshold](/pitch/cost-centres): why neither option is
  wrong, what "free" is conditional on, and how the decision gets recertified instead of
  re-argued.

The engineering version of the same argument — ownership, the guard, derived navigation, and what
it costs an operator — is deliberately not here. It is [The operations case](/docs/operations-case),
in the starter seed, because it answers different objections for a different person.

## Why it is shaped this way

A pitch that lists only strengths is a brochure, and the first person to discover the missing
feature stops trusting the rest. So the second page is the counter-argument, written by the same
hand and just as specific. The pair is the seed: taking one without the other gives you either
marketing or a complaint.

The numbers are deliberately unflattering in places — six runtime dependencies became seven when
the site added a QR generator, and the page says so — because a number that only moves in your
favour is not evidence.

## Lifting this seed

1. Copy both pages.
2. Re-derive every number from your own repository: dependency count, build time, hosting cost.
3. Keep the "where it is the wrong answer" section. Delete it and you have a brochure.
4. Do not fold the engineering argument back in. If the reader will operate the system, they want
   [the operations case](/docs/operations-case), not a longer invoice page.
5. Replace the personal judgement with yours; the structure survives, the sentences should not.

## What it costs to host

- **You must mean it.** Publishing a limitations page is a commitment to keep it current; a stale
  limitation page is worse than none.
- **The numbers move.** Dependency counts, build times and hosting prices are all live values being
  written down as if they were facts. Date them.
- **It will lose you some deals.** Someone who needs versioned docs for a plugin ecosystem should
  read the limits page and leave. That is the point.

## What it does not cover

Pricing, contracts or support. It covers the technical and maintenance case, which is the part an
engineer can be held to.
