---
title: One door for agents
description: The same call to action on every page, short enough for a small model and specific enough for a frontier one.
order: 8
updated: 2026-11-13
tags: agents, convention
seeds: agent-operations
---

# One door for agents

An agent arrives at a page without the context a person has. It may be a small model that can
follow one instruction, or a frontier model that will happily invent a plan from a hint. Both are
served by the same thing: **one short, stable door, in the same place on every page.**

That door is the footer strip. It says one sentence and points at one URL:

> **for agents** — One door: `/llms.txt` — every page, the commands, the invariants.

Nothing about it changes by page. A model does not have to work out whether *this* page has a
different handoff, and a person who notices the strip can follow it just as easily.

## Why one door, not a better paragraph

The failure modes are symmetric. Give a strong model a vague invitation and it will produce a plan
that is confidently wrong. Give a small one three paragraphs and it will truncate them, or quote the
first and ignore the rest. The only instruction that survives both is a **single sentence and a
single URL**, with depth available on request rather than in the way.

## Depth is opt-in, one link at a time

| Tier | What the agent does | What it gets |
| --- | --- | --- |
| 0 | reads the strip, nothing else | a URL and a promise: every page, the commands, the invariants |
| 1 | fetches `/llms.txt` | all routes, the build and guard commands, the invariants, isotope slots |
| 2 | fetches `/docs/for-agents` | the loop, the read order, what "done" means |
| 3 | reads the source | the guard, which names each failure it prevents |

Each tier is reachable from the one above with a single hop, and no tier requires the one below it.
That is what makes the same door work at every skill level: the strip is the floor, not the ceiling.

## What the strip must not become

- **Not a paragraph.** If it needs a comma-spliced explanation of the repository layout, it is
  documentation, and documentation belongs one link deeper.
- **Not a QR code.** A model cannot scan a code; a person can. The two audiences need two shapes,
  which is why the handoff card on [/design](/design) exists separately.
- **Not per page.** The moment one page invents its own agent instructions, the constant becomes a
  convention and the convention becomes a guess.
- **Not a claim it cannot verify.** The strip promises a file that exists in the build. The guard
  checks that file; the strip does not promise anything the build does not check.

## What it costs

- **One more element on every page.** It is a small one, but it is on all 40-odd of them, and that
  is a real tax on attention.
- **A payload that has to stay short.** Every future addition — a new artifact, a new protocol — is
  a temptation to widen the sentence. The rule is that new artifacts are linked *from* `llms.txt`,
  not added to the call to action.
- **A constant to police.** There is one canonical payload string; the guard refuses a second one.
  That is cheaper than a review meeting and much cheaper than drift.

## The rule for future edits

When you add anything an agent should use — a new static artifact, a machine-readable file, a
protocol — do this, in order:

1. Add it to `dist/llms.txt` (generated, so it cannot be forgotten).
2. Link it from `/docs/for-agents` if it needs explanation.
3. Leave the footer strip alone.

The strip is not a menu. It is a door.
