---
title: 2. Dependencies
description: Write down everything the program needs, with versions, so any machine can rebuild it.
order: 3
updated: 2026-11-12
tags: factor, dependencies
seeds: twelve-factors
---

# 2. Dependencies

> Everything the program needs is written down, including versions. Installing is one command.

## The idea

A program rarely stands alone. It borrows code — libraries — the way a recipe borrows ingredients.
"Declared dependencies" means the recipe lists the ingredients **and the amounts**, so a different
kitchen produces the same dish.

Two parts matter:

- **The list**: `package.json` names each library and the range of versions that work.
- **The lock**: `package-lock.json` records the exact version chosen on the day it was installed.

The list is the intention; the lock is the receipt. You want both, because "latest" is a moving
target and two machines installing on different days would otherwise get different programs.

## A picture

```bash
npm ci        # install exactly what the lockfile says — used in CI and in production
npm install   # resolve versions, possibly update the lock — used when changing a dependency
```

`npm ci` is the honest command: it refuses to invent versions.

## What it buys

- A rebuild a year from now produces the same program, not a mystery.
- CI and your laptop stop disagreeing. "Works on my machine" becomes reproducible instead of a
  shrug.
- Upgrading is a decision with a diff, not a side effect of someone else's release.

## What it costs

- **The upgrade treadmill.** Locks pin you to old code; old code gets security advisories. Someone
  must decide when to move.
- **Supply chain risk.** Every dependency is code you did not write, running with your permissions.
  Fewer is safer, and "fewer" is a design choice, not a cleanup task.
- **Size.** Dependencies are most of a modern bundle. This site ships seven runtime packages and that
  is already a considered number.

## Skip it when

You are writing a throwaway script for one afternoon. Then skip the ceremony — but do not copy the
throwaway into something you keep.

## Where this site stands

**Applied.** `package.json` declares seven runtime and eight build dependencies; `package-lock.json`
pins them; CI runs `npm ci`. The site assumes nothing is installed on the machine except Node 22.

## Exercise

Open a `package-lock.json` and count the entries. Compare that to the number of dependencies you
thought you had. The gap is transitive dependencies — code pulled in by code you chose. Ask whether
you would recognise all of it.

Next: [3. Config](/factors/config)
