---
title: A dashboard, in production
description: A research team publishes OpenTTD study views on a child seed of this stack. What it cost, what it got, and why the next team would cite this seed rather than re-derive it.
order: 13
updated: 2026-11-13
tags: pitch, evidence, child-seed
seeds: pitch
---

# A dashboard, in production

The argument for this stack is usually made in the abstract: small, owned, guarded. Here is the
same argument with a live site attached.

[That Train Dashboard](https://james-gibson.github.io/that-train-dashboard/) is a research team's
record of economic studies run as OpenTTD simulations. It is a **child seed**: the same content
model, the same derived navigation, the same prerender and the same publish gate, with a different
question and a different design system. It has been running long enough to be evidence rather than a
demo.

## What the team needed

- One page per study, because a study is a document, not a row.
- Provenance on every claim: version, seed, scenario, commit.
- Publication without a service: no accounts, no database, no budget for either.
- A build that refuses to publish a broken link or a page that only exists after JavaScript.
- The freedom to change the design system without touching the pipeline.

## What the seed gave them

- **The content model.** One Markdown file per page, path equals URL. Eleven pages across four
  sections, navigation derived, nothing to keep in sync.
- **The prerender.** Seventeen routes rendered at build time, fifteen shells written from that
  output. A reader without JavaScript gets the study; so does an agent.
- **The gate.** A guard that refuses a missing shell, a broken internal link, a page absent from
  `llms.txt`, or a build that leaked the machine it was made on. It has been green since the first
  push, which is the only reason the claims are worth reading.
- **The exit.** The whole thing is a repository: 30 files in the build, about 780 KB, no service to
  cancel.

## What it cost them

- **Git as the authoring tool.** Every author is an engineer or has an engineer nearby.
- **No search.** At eleven pages, the section indexes and `llms.txt` are enough. At a hundred they
  would not be, and search would become a service to operate.
- **No analytics.** They do not know which study is read. That is the same absence the parent has,
  and here it is a real operational gap, not a purity claim.
- **A guard to keep green.** A broken link stops the publish, which is the point and also a chore.
- **Rules deferred upstream.** The child vendors this site's `rules.md` and records the one rule it
  replaces. That is a fetch on a cadence, and a cadence is a thing someone has to remember.

## The proof that matters

The child swapped the UI library — 1st-Pouf instead of the parent's components — and **the pipeline
did not change**. Same content model, same prerender, same guard, same `llms.txt`. That is the
claim this site makes about itself, tested by someone else's site: the pattern is the reusable part,
the components are not.

It also took the new upstream rule the same way any child would: the rule was published in
`/rules.md`, the child synced it by hash, and the effective list is published at the child's own
`/rules.md` with its override on the record.

## Why the next team would cite this seed

The dashboard is open-sourcing its study views: the pages are public, the repository is public, and
the shape is legible. A team building the next research dashboard has two options:

1. **Re-derive** the content model, the derived navigation, the guard, the prerender, the machine
   entry — a week or two, and the same bugs.
2. **Copy the seed**, cite where it came from, and spend the week on the research instead.

The second is cheaper, and it is the only reason a seed is worth publishing. The citation is the
payment: it tells the next reader that the pattern has a maintainer and a track record, and it tells
the parent when a child has outgrown it.

## Where this is the wrong choice

- A team that needs accounts, roles or a CMS: this stack declines all three, and a child that needs
  them should buy the platform instead.
- A team whose content must be private: the repository is the artefact, and a public seed is a
  public artefact.
- A team that wants the design system to be the product: the swap is proof the components are
  disposable, which is the opposite of a brand.

The rest is the same trade this site makes everywhere: fewer moving parts, a smaller bill, and the
attention moved from infrastructure to the writing — [and the writing is the same cost in every
system](/pitch/the-writing-cost).
