---
title: The twelve factors
description: Thirteen pages that teach the rules as decisions, with the price and the exit on every one.
order: 2
updated: 2026-11-12
tags: seed, factors, teaching
---

# The twelve factors

The audience is someone who has never deployed software. The assumption is nothing — the first page
defines repository, deploy, build, environment, service, state and static site before it uses them.
The entrance is [Start here](/factors/start-here).

## What is inside

Thirteen pages: a hub and twelve lessons. Every lesson has the same shape, because the second
lesson should not require learning a new layout:

> the rule in one line → the idea in plain language → a picture → what it buys → **what it costs** →
> **skip it when** → where this site stands → a small exercise

The two bold sections are the ones that make it teaching rather than compliance. A rule with no
price tag is an advertisement.

## Why it is shaped this way

People do not adopt twelve rules at once, and they should not. They adopt the one that solves the
problem in front of them, and they need to know what it costs before they do. So each page is
self-contained: you can read one, apply it, and come back in a month.

The hub carries the argument the lessons imply: **the list is a menu, not a checklist.** Following
all twelve outside the shape they were written for buys infrastructure you do not need — the site
declines three of them on the record and explains why.

## Lifting this seed

1. Copy `src/content/factors/**` into your site.
2. Add `factors` to `SECTIONS` in `src/lib/content.ts` (label, blurb).
3. Replace the "where this site stands" lines with your own — that section is the seed's honesty,
   and it only works if it is true of the site hosting it.
4. Keep the lesson shape. If you drop "what it costs" and "skip it when", you have a summary, not a
   seed.

## What it costs to host

- **Thirteen pages to keep true.** The lessons reference the site's own checks; if the checks
  change, the lessons are wrong.
- **A point of view.** "Skip it when" is an opinion, and readers will disagree. That is the
  feature: a seed without a position teaches nothing.
- **Maintenance against your own stack.** The "where this site stands" lines are the first thing to
  rot. Re-read them when you change the build.

## What it does not cover

The history of the methodology, container platforms, or how to run a service at scale. It covers
the twelve decisions well enough that a newcomer can hold a conversation about them, and no further.
