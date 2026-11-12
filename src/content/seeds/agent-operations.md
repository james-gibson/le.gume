---
title: Agent operations
description: The contract an LLM agent needs to take this repository over — machine entry, loop, guard, and the limits.
order: 8
updated: 2026-11-12
tags: seed, agents, operations
---

# Agent operations

The audience is an agent, or the person pointing one at a repository. The assumption is Node 22, a
shell, and the willingness to read a guard script. The entrance is [For agents](/docs/for-agents),
and the machine entry is [`/llms.txt`](/llms.txt) — generated at build time, so it cannot drift.

## What is inside

- **The contract** — what to read in what order, the loop, the invariants, and what "done" means.
- **The machine entry** — every route, the three commands, and the invariants, as plain text.
- **The guard as documentation** — `scripts/verify-publish.mjs` names each failure it prevents; an
  agent that reads it knows what the site cares about.
- **A handoff** — the QR on [/design#handoff](/design#handoff) carries the same instructions in a
  form a phone can start from.
- **Shortcut resolution** — how to expand an isotope code into a procedure and its questions.

## Why it is shaped this way

An agent that has to crawl a site to understand it will guess, and guesses in a build pipeline are
expensive. Two artifacts remove the guessing: a text file that lists everything, and a guard that
refuses what is wrong. Neither requires the agent to infer intent from prose.

The same reason drives the invariant list: "navigation is derived" is not a style note, it is an
instruction that prevents a whole class of edit. An agent that adds a nav array has misunderstood
the site, and the page says so first.

## Lifting this seed

1. Copy `src/content/docs/for-agents.md`.
2. Copy the `llms.txt` generator from `scripts/postbuild.mjs` (one function, no dependencies).
3. Adapt the invariants to your repository, and keep the guard named after the failures it prevents.
4. Add the shortcut protocol only if you have isotopes with slots.

## What it costs to host

- **Two artifacts to keep true.** `llms.txt` is generated, so it is free; `for-agents` is prose and
  rots like any prose.
- **A guard you cannot weaken.** The whole contract rests on the guard refusing. The first time it
  is relaxed for a release, this seed is fiction.
- **An honest "cannot infer".** Voice, judgement and which pages matter are not derivable from the
  repository. The page says so rather than pretending a checklist covers them.

## What it does not cover

Review, design judgement, or how to decide *what* to write. It covers how to operate the site
without breaking it, which is the part an agent can be trusted with.
