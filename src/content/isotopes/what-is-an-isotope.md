---
title: What an isotope is
description: The smallest working system that demonstrates one pattern completely — and why "smallest" is the hard part.
order: 1
updated: 2026-11-12
tags: isotopes, format
---

# What an isotope is

An **MVP isotope** is a minimal viable system built to prove one thing by running, not by arguing.
It is the smallest version that still does the whole job: it builds, it ships, and it can be lifted
into another project without a rewrite.

The name is deliberate. An isotope is a specific, identifiable form of something — the same element,
a particular configuration, a measurable signature. Two systems built to the same pattern should be
recognisably the same isotope, the way two samples of the same element are.

## What makes something an isotope

Four tests, in order. Fail one and it is a demo, a snippet or a sketch — all useful, none liftable.

1. **It runs.** There is a live URL or a single command. Not a screenshot, not a branch.
2. **It ships.** The path from source to public is one command, and it is checked.
3. **It is minimal.** Every part earns its place; nothing is there because a tutorial included it.
4. **It is liftable.** The parts are separable, and the costs are written down, so you can take
   three of them or all of them.

## The page format

Every isotope page answers the same questions in the same order, so two of them can be compared:

> **What it proves** · **The parts** · **What it costs** · **Take this, not that** ·
> **What would break it**

The middle two are the ones that do the work. "What it costs" is where a demo becomes a decision;
"take this, not that" is where a pattern stops being a religion.

## Why minimum, and why viable

- **Minimum** because anything more is a product, and a product is not a lesson. A lesson you cannot
  finish reading is a lesson nobody learns.
- **Viable** because a fragment that cannot ship teaches a shape without its consequences. The
  consequences — the deploy, the guard, the empty state, the rollback — are the curriculum.

## Compounds — isotopes with slots

Some isotopes cannot be applied without decisions only you can make: which repository, which
dictionary, how often. Those pages declare **slots** instead of pretending there is one right
answer.

A slot is a question with a name. The page lists them, the agent asks them, and the shortcut below
carries the answers that are already known.

## Shortcuts — a QR that expands into the compound

An isotope page is long on purpose; a QR code is small on purpose. The bridge is a **shortcut**: the
isotope's address plus whatever slots are already bound.

```text
https://james-gibson.github.io/le.gume/isotopes/02-cspell-in-ci/?every=weekly
```

An empty value is a question still to ask. Given the line above, the agent should fetch the page,
read the *Agent prompt*, and ask about `repo` and `dict` — then write the job. No resolver service,
no database: the URL is the whole protocol, and the page is the expansion.

That is why the molar mass of the code matters: a compact address beats a paragraph of instructions,
and a paragraph of instructions beats a code nobody can scan. The shortcut is the compromise —
short enough to scan, complete after one fetch.

## What an isotope is not

- **Not a template.** A template is copied before you understand it. An isotope is read first.
- **Not a framework.** Frameworks make decisions for you; an isotope shows you the decisions.
- **Not a benchmark.** "Fast" without a budget is marketing. The cost line is the benchmark.

## The collection

This section starts with two: [01 — A documentation site that ships itself](/isotopes/01-documentation-site),
which is the site you are reading, and [02 — Spell-check a repository on a schedule](/isotopes/02-cspell-in-ci),
the first compound with slots. Each new isotope is one page, and each page is derived from a
repository that actually runs — the same rule the rest of this site follows, applied to the
catalogue itself.
