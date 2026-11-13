---
title: The starter
description: The documentation-site pattern itself — content model, derived navigation, guard, deploy — as a seed you can lift.
order: 7
updated: 2026-11-12
tags: seed, starter
---

# The starter

The audience is an engineer who needs a documentation site they can still run in two years. The
assumption is git and Node, with no documentation tooling experience. The entrance is
[Quickstart](/docs/quickstart).

## What is inside

- **The pattern** — quickstart, the architecture, the content model, the file map, the deploy,
  [what the web is for](/docs/philosophy), and [who owns what](/docs/licensing).
- **The tasks** — seed a project, add a page, colocate knowledge, ship it.
- **The proof** — [Silverskin](/isotopes/silverskin), which is this very site described as an
  isotope, with its costs written down.

## Why it is shaped this way

A starter that describes a stack without running it is a brochure. This seed's pages are the site's
own operating notes: the content model page is true of every page here, the deploy page describes
the workflow in `.github/workflows/`, and the costs listed in Silverskin are the costs you are
reading about right now.

That self-reference is the point, and it is also the risk — a fork inherits the claims without
inheriting the reasons. The last section of each page says where this site stands, so a new host
knows what to re-derive.

## Lifting this seed

1. Clone the repository; do not scrape the pages.
2. Run the checklist in [Project seeds](/guides/project-seeds) — rename, replace sections, delete.
3. Keep `src/lib/content.ts`, `src/lib/markdown.tsx`, `scripts/verify-publish.mjs`,
   `scripts/postbuild.mjs` and the workflow. Those five files are the pattern.
4. Replace the prose. It is about this site; yours is about yours.

## What it costs to host

- **The writing.** Every page here is an argument; yours has to be too, and no framework supplies
  one.
- **A guard you must read once.** It is the only reason a public doc site can be safe, and it is
  only worth something if you know what it refuses.
- **No search, no versions, no CMS.** Correct at this size; wrong later, and it will be a project
  when it is wrong.

## What it does not cover

Multi-language content, versioned documentation, or authoring by people without git access. Those
are different seeds, and pretending otherwise would be the brochure behaviour this one argues
against.
