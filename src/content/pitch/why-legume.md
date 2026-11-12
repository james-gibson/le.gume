---
title: Why le.gume
description: The commercial case for a documentation site that is cheap to own and hard to let rot.
order: 1
updated: 2026-11-11
tags: pitch, roi
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

## What you are actually buying

**Ownership.** Every file is readable in an afternoon. Nothing in the stack requires a plugin
whose behaviour you have to infer.

**A guard.** The reason a public doc site can be safe is that something refuses unsafe output.
Here that is `scripts/verify-publish.mjs`, and it runs on every build — not in a review meeting.

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
- **A decision about sections.** Four, or fewer.
- **The willingness to delete.** A page nobody needs is a page that will be wrong eventually.

## The part that is hard to price

Documentation is a promise that the thing you describe still exists. A stack with one build, one
guard and one navigation makes keeping that promise cheap — and cheap promises get kept.
