---
title: 8. Concurrency
description: Scale by starting more copies of the same program, not by making one copy cleverer.
order: 9
updated: 2026-11-12
tags: factor, scaling
---

# 8. Concurrency

> When traffic grows, run more copies. Do not rewrite one copy to handle everything.

## The idea

A program can only do so much at once. There are two ways to handle more visitors: make the single
program handle them in parallel, or start more copies of it. The factor prefers copies — "scale
out" — because copies are simple: they are identical, they fail independently, and they do not need
new code.

This only works if the copies share nothing important (factor 6). Statelessness and concurrency are
the same bargain seen from two angles.

## A picture

```text
one copy, many tricks        many copies, one trick
─────────────────────        ─────────────────────
threads, locks, queues  vs.  copy A ─┐
hard to debug                        ├─▶ shared store
one crash takes all                  │
                             copy B ─┘
```

## What it buys

- A mental model you can hold: every copy is the same.
- Failure is partial. One copy dying is a dent, not an outage.
- Scaling is a number, not a rewrite.

## What it costs

- **Memory per copy.** Ten copies of a 500MB program is 5GB, whether or not anyone is using them.
- **Coordination.** Anything shared — a job queue, a counter — needs a store designed for it.
- **Slow adapters.** When your limit is the database, more copies make it worse, not better.

## Skip it when

The platform scales for you. A static site on a CDN has no copy to manage: the host serves the same
files from many machines, and "how many copies" is not a question you can answer. For a nightly
batch job, one copy is correct; concurrency would only add contention.

## Where this site stands

**Out of scope, delegated.** GitHub Pages serves the same files from wherever it likes, at whatever
parallelism it likes. The site's contribution to this factor is being static, which makes the
question disappear.

## Exercise

For a service you operate, find the number of copies it runs. Then ask what would break if you
doubled it. If the answer is "the database", you have found the real bottleneck, and it is not
concurrency.

Next: [9. Disposability](/factors/disposability)
