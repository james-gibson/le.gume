---
title: 01 — A documentation site that ships itself
description: The site you are reading, described as an isotope: what it proves, what it costs, and what to take.
order: 2
updated: 2026-11-12
tags: isotope, static, github-pages
---

# 01 — A documentation site that ships itself

This page is the first isotope in the collection, and it is self-referential on purpose: the system
described here is the system serving it. If the description drifts, the site is wrong — which is
the cheapest possible test of a claim.

## What it proves

A documentation site can be owned outright, deploy on push, refuse to publish bad output, and
document itself — with seven runtime dependencies and no server.

It also proves the limits: no search, no versions, no CMS, no per-page HTML. Those are listed at
the bottom, because an isotope that hides its costs is an advertisement.

## The parts

| Part | What it is | Why it is that size |
| --- | --- | --- |
| Content tree | `src/content/<section>/<slug>.md` | The file path is the URL; no route table |
| Content model | one module: glob, frontmatter, order, headings | Everything derived reads one array |
| Five routes | home, design, section, page, 404 | A docs site needs no more |
| Route shells | one HTML copy per route at build | Deep links answer 200, not 404 |
| Publish guard | ~180 lines of named checks | The gate between a build and the public |
| Deploy | one workflow: `npm ci && npm run build` → Pages | No release branch, no artifact store |
| Agent entry | generated `llms.txt` | An agent can take the site and go |

## What it costs

- **Two hours to make it yours**, then the writing. The writing is the real cost and no framework
  has ever shipped a sentence.
- **A build you must read once.** The guard is only worth something if you know what it checks.
- **No search.** Correct at fifteen pages; wrong at two hundred. The day it becomes wrong, a
  client-side index will not save you.
- **No per-page HTML.** Every route is the same shell: correct status codes, weak crawler results.
  Server-rendering each route is the upgrade path, and it is a real piece of work.
- **A subpath trap.** Project sites live under `/<repo>/`; the base path is configuration, and the
  guard is the only thing enforcing it.

## Take this, not that

**Take:**
- The derived navigation. It removes an entire class of drift.
- The guard. Any public site without one is trusting the last build.
- Route shells. Two hundred lines of build script remove every 404-on-reload.
- The generated `llms.txt`. It costs one function and makes the site legible to machines.

**Leave:**
- The palette and the motion. They are taste, and taste should be local.
- The four-section shape, if your content is one long guide.
- The void. This site deliberately has no analytics, no comments and no search; yours may earn
  them.

## What would break it

- Adding MDX for one interactive page, then six. Content stops being portable and the starter loses
  the property that made it a starter.
- Adding a CMS "to let writers publish". The moment publishing needs a service account, the site
  has an operator, and the operator is a dependency.
- Weakening the guard for one release. Every claim on this site rests on that check refusing.

## Read the source

- Live: [/](/)
- Repository: [james-gibson/le.gume](https://github.com/james-gibson/le.gume)
- The operating contract: [/docs/for-agents](/docs/for-agents)
- The rules it follows, taught: [/factors/start-here](/factors/start-here)
