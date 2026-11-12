---
title: The hard parts
description: Making a difficult thing easy is mostly deciding what to remove, and then refusing to add it back.
order: 1
updated: 2026-11-11
tags: essay, craft
---

# The hard parts

Every tool that claims to make something easy is making one of two trades. Either it hides the
difficulty behind a bigger abstraction, or it removes the difficulty by narrowing the problem.
The first trade moves the cost to the person who has to debug it. The second one moves the cost
to the person who wanted something else.

This site tries the second trade, and the honesty of it lives in what was left out.

## Removing, not hiding

Consider the four things a documentation site must do: find content, render it, style it, publish
it. A conventional stack assigns each to a subsystem — a content source, a route manifest, a
theme, a deploy pipeline — and then adds the glue that keeps the four in agreement.

The glue is where the difficulty actually is. Not the rendering; the agreement.

So the design question was not "which theme", it was "what would make agreement unnecessary".
Three answers:

1. **Derive navigation from content.** Then it cannot disagree.
2. **Make the URL the path.** Then routes cannot disagree.
3. **Put the design system in a route.** Then the samples cannot disagree.

Each is a subtraction with a consequence. Derived navigation means no editorial control over
order beyond a number. Path-based routes mean no friendly URL for the page whose title is longer
than its slug. A live design system means the design page breaks when the components break —
which is the point, but it is still a bet.

## The cost of easy

Easy for the reader is usually expensive for the builder, and the honest version of this trade
is to say where the expense landed.

- The guard is extra code that exists only to say no.
- The absence of search means the information architecture has to be good enough to walk.
- The absence of MDX means a widget costs a route, not a snippet.

None of those are free. They are just cheaper than the alternatives *for this size of site*, at
this point in its life. A site that grows past that should change its answer, and the design
should not pretend otherwise.

## What "easy" is really promising

Not that the work disappears. That the work is **visible and bounded**: you can see the whole
thing, you can finish reading it, and you know where the edges are.

That is a smaller promise than most landing pages make. It is also the one that survives contact
with the second year.

## A test for any tool that claims it

Ask what happens when it is wrong. If the answer is "you debug an abstraction you did not
write", the difficulty was moved. If the answer is "a file tells you which check failed", the
difficulty was removed — at the price of someone having thought hard, once, about what could go
wrong.

Prefer the second. Then read the file.
