---
title: Peas in a pod
description: Keeping pages, sections and components close enough to stay honest.
order: 3
updated: 2026-11-11
tags: structure, content
seeds: starter
---

# Peas in a pod

Documentation rots fastest where two things that describe each other live far apart: a route
table and a folder, a nav array and a page, a design system and the components it claims to
describe. Colocation is the defence.

## The three pairings this site keeps together

**Page and URL.** The file path *is* the route. There is no map from `quickstart.md` to
`/docs/quickstart` to update, which means there is no map that can go stale.

**Section and navigation.** `SECTIONS` is one short array. The header, the footer columns, the
section indexes, the 404 and `llms.txt` all read it. One edit, five surfaces.

**Design system and implementation.** `/design` imports the same modules the rest of the site
imports. The sample cannot quietly diverge from the product, because it *is* the product.

## When to split a page

Split when a page answers two different questions, not when it gets long. A 900-word page about
one decision is easier to keep correct than three 300-word pages that reference each other.

A useful test: if the table of contents has two headings that never appear in the same
paragraph, the page is probably two pages.

## When to merge

Merge when the second page exists only to hold a caveat. Caveats belong next to the thing they
qualify, where a reader cannot miss them.

## Naming that survives

- Prefer nouns for reference pages (`content-model`, `deploy`) and verbs for guides
  (`adding-a-page`, `shipping-day`).
- Never encode a version or a date in a slug. `v2-migration` becomes a lie; `migration` gets a
  history.
- Figures of speech are allowed, once, and only if the page still says what it means. A reader
  who does not get the joke should not lose the instruction.

## The failure this prevents

The classic documentation failure is not a missing page — it is a *confident* page that
describes last quarter's software. Colocation makes that failure expensive to commit and cheap
to notice: change the code, the sample changes; change the folder, the URL changes; change the
section, the navigation changes.
