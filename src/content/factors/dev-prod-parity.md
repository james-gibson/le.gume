---
title: 10. Dev/prod parity
description: Keep the place you develop close to the place you ship — same versions, same services, small gaps.
order: 11
updated: 2026-11-12
tags: factor, parity
seeds: twelve-factors
---

# 10. Dev/prod parity

> Development should resemble production: same runtime, same services, deploys not months apart.

## The idea

Bugs love gaps. If your laptop runs a different version, uses a fake database and was last deployed
three months ago, then "it worked on my machine" is not a joke — it is a measurement of the gap.

Parity has three dimensions:

- **Time**: how long code takes to reach production (minutes vs quarters).
- **People**: who writes it vs who deploys it (the same person, ideally).
- **Tools**: which runtime, database and services are on each side.

## A picture

```text
close:  laptop == CI == production      (same Node, same install command)
far:    laptop v20 + fake DB  ≠  prod v22 + real DB + hand-deploys
```

## What it buys

- Fewer bugs that only exist in one place — the most expensive kind to diagnose.
- Confidence that a local green build means something.
- Deploys become routine, which makes them smaller and safer.

## What it costs

- **Local resources.** Running the real database and services locally costs RAM, disk and patience.
- **Containers are not free.** Docker fixes version drift and adds a tool to learn and maintain.
- **Slower feedback** if every change needs the full stack.

## Skip it when

Production is *deliberately* different and cannot be reproduced — a phone, a GPU, a hardware
sensor. Then parity is a target, not an achievement: get as close as the physics allows and write
down the gap. It is also reasonable to skip strict parity for a project with one environment and
one user.

## Where this site stands

**Applied, with one documented gap.** Local and CI run the same command (`npm run build`), the same
Node major, and the same lockfile. The gap is the base path: development serves from `/`, GitHub
Pages from `/le.gume/`. Rather than trusting discipline, the publish guard compares the built asset
paths against `package.json` and refuses a mismatch. A trap that cannot be forgotten is better than
one everyone remembers.

## Exercise

Write down the three biggest differences between the machine where you write code and the machine
where it runs. Then mark each one: *fixed by tooling*, *accepted and documented*, or *unknown*. The
third column is the one that produces outages.

Next: [11. Logs](/factors/logs)
