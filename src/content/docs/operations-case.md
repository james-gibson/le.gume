---
title: The operations case
description: The engineering argument — ownership, the guard, derived navigation, and what it costs the person who runs it.
order: 6
updated: 2026-11-12
tags: operations, engineering
seeds: starter, agent-operations
---

# The operations case

This is the case for whoever has to run the thing: the engineer, the operator, the agent pointed at
the repository. It is deliberately not the business case — that one is about what a site costs to
own over three years, and it is [one page over](/pitch/why-legume). Mixing the two is how technical
arguments get approved by people who were promised something else.

## What you are actually buying

**Ownership.** Every file is readable in an afternoon. Nothing in the stack requires a plugin whose
behaviour you have to infer.

**A guard.** The reason a public doc site can be safe is that something refuses unsafe output. Here
that is `scripts/verify-publish.mjs`, and it runs on every build — not in a review meeting.

**A navigation that cannot drift.** The nav is derived from the content tree. The usual drift
between "what exists" and "what is linked" is structurally impossible.

**A live design system.** The component page is the product page. Your readers see the thing
working, not a screenshot of it working.

## The honest comparison

If you need versioned docs for a dozen releases, a search index over 2,000 pages, and a
localisation pipeline, this is not the tool and no amount of polish changes that.

If you need a technical site that a small team can publish to for three years without a
maintenance project, the argument is simple: fewer moving parts, one guard, one build, one
push. The rest is writing.

## What it costs you

- **Node 22.** A current runtime, nothing exotic.
- **Git.** Markdown in a repository is the CMS.
- **A decision about sections.** Seven, or fewer. The shelf is a shape, not a law.
- **The willingness to delete.** A page nobody needs is a page that will be wrong eventually.
- **A guard you must read once.** It is a hundred and eighty lines, and it is the only reason the
  public build is safe to trust.

## What makes it cheap to operate

The parts that would otherwise become projects are already small and visible:

- **Publishing** is a push. There is no release branch, no artifact store, no promotion step.
- **Recovery** is `git revert`. The build rebuilds the previous state; there is no cache to clear.
- **Onboarding** is `npm ci && npm run dev`. A new maintainer is productive before lunch.
- **Deployment drift** is checked, not remembered: the guard refuses a build whose base path
  disagrees with `package.json`.

Those four are the operational claim, and each is verified by the same script that would stop the
build if it stopped being true.

What they do not do is remove the standing obligation: certificates, platform updates, dependency
advisories and traffic ceilings all still arrive on a schedule. That obligation is a
[cost centre with a threshold](/pitch/cost-centres), and it is worth naming even when the bill is
zero.

## Where to go next

- [The deploy](/docs/deploy) — the workflow and the guard in full.
- [Nuts and bolts](/docs/nuts-and-bolts) — the file map and the contract between parts.
- [For agents](/docs/for-agents) — the same argument, written for a machine.
