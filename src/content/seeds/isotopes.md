---
title: Isotopes
description: How to package a setup you only do occasionally, name it permanently, and hand it over with its questions.
order: 5
updated: 2026-11-12
tags: seed, isotopes, compounds
---

# Isotopes

The audience is anyone who keeps re-explaining a setup they do only occasionally. The assumption is
that you have written a runbook, or hated one. The entrance is
[What an isotope is](/isotopes/what-is-an-isotope).

## What is inside

- **The format** — four tests (runs, ships, minimal, liftable) and a fixed page shape.
- **The naming spec** — the pickle shelf, and the three rules that keep names permanent.
- **A whole system** — [Silverskin](/isotopes/silverskin), the documentation site as an isotope.
- **A compound** — [Cornichon](/isotopes/cornichon), a recurring job with three slots, a working
  kit in `examples/cornichon/`, and the recurrence logic that stops it becoming noise.
- **Shortcuts** — a QR code that carries the isotope and the slots already decided.

## Why it is shaped this way

A runbook fails in a specific way: it is written once for one context, and every later reader has to
work out which parts still apply. An isotope fixes that by separating the **procedure** (the page)
from the **decisions** (the slots), so the reader is asked for what they must decide and nothing
else.

The naming rule is the other half. An isotope is addressed by name — in URLs, in prompts, in QR
codes — so a name has to be permanent or the addresses rot. Numbers are positions; names are
identities.

## Lifting this seed

1. Copy the format page and the shelf section of the registry (`src/lib/isotopes.ts`).
2. Adopt the page shape exactly: proves, parts, costs, take/leave, what would break it.
3. Choose a name from the shelf, or extend the shelf with the same rules.
4. Declare `slots:` in frontmatter, even when it is `none`; the guard enforces it.
5. If the isotope has working files, put them in `examples/` and let the guard check they parse.

## What it costs to host

- **Permanence.** A published name cannot be reused, even if the isotope is retired. Addresses
  outlive pages.
- **Discipline about costs.** The format requires a "what it costs" section. An isotope without one
  is a demo, and the page says so.
- **Files that must run.** The rule is that an isotope is derived from something that runs; a page
  describing an untested kit is the failure mode this seed exists to prevent.

## What it does not cover

Distribution (packages, registries, versioning) or how to decide which setup deserves to become an
isotope. It covers the shape and the handoff once you have decided.
