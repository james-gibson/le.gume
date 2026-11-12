---
title: Boring is a feature
description: Why the least interesting part of a documentation stack is the part that decides whether it survives.
order: 2
updated: 2026-11-11
tags: essay, maintenance
---

# Boring is a feature

Nobody adopts a documentation system because the build is boring. They adopt it because a demo
looked good. Then they keep it, or do not, for a reason that has nothing to do with the demo: on
a wet Tuesday in year two, does publishing still work?

Boring is the property that answers that question.

## What boring actually means

Not "no design". Not "no motion". Boring means: the failure modes are known, the number of ways
to be wrong is small, and none of them require a person who has left.

A build that is one command, whose steps you can name from memory, is boring. A build that is
green because a cache was warm is not.

## The three boring properties

**One entry point.** `npm run build` does everything, including the part that says no. If a
step exists only in CI, it does not exist for the person debugging at 11pm.

**One source of truth per fact.** A page's URL lives in its path. A section's name lives in one
array. A colour lives in one token. Duplication is not a style problem; it is a scheduled
inconsistency.

**A visible edge.** The stack should be small enough that a newcomer can hit the boundary of
what it does and recognise it as a boundary, not a bug.

## Why teams reach for the opposite

Because boring does not demo. A live design system demos; a guard does not. A marquee demos; the
fact that the site needs no rebuild cache does not.

The tension is real, and the resolution is not "be boring everywhere". It is: spend the
interesting budget on the surface, and keep the machinery dull. Whimsy in the seams is a cost.
Whimsy in the surfaces — the header, the motion, the empty states — is the reason anyone reads
the page at all.

## The test

A year from now, someone opens the repository to change one paragraph. How many files do they
touch? How many commands do they run? How long until they trust the result?

If the answers are "one", "one" and "less than a minute", the site will still exist in another
year. If they are "three, but only if you remember the flag", it will not — not because anyone
decided to abandon it, but because everyone quietly stopped.

Boring is not the absence of care. It is care, made durable.
