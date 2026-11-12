---
title: Cornichon — spell-check a repository on a schedule
description: A recurring CI job that catches typos, and a worked example of an isotope with slots an agent must ask about.
order: 3
updated: 2026-11-12
slots: repo, dict, every
tags: isotope, ci, cspell
---

# Cornichon — spell-check a repository on a schedule

A repository accumulates typos the way a kitchen accumulates crumbs: nobody adds one on purpose,
and after a month the prose looks careless. Spell-checking on every pull request catches them at
the source, but it also slows every push and blocks work on words nobody agreed on yet.

This isotope is the smaller, cheaper version: a **scheduled job** that checks the whole tree, opens
an issue when it finds something, and stays out of everyone's way until then.

## What it proves

A recurring job can be a complete quality control without being a gate: no blocked pull requests,
no per-push latency, and one place that asks the question "has our prose drifted?"

It also proves the compound shape — this is the first isotope with **slots**, and it is the reason
a QR code can carry an instruction this long.

## The parts

| Part | What it is | Why it is that size |
| --- | --- | --- |
| Workflow | `.github/workflows/spell.yml`, `schedule:` trigger | One file; no runners to manage |
| Dictionary | `cspell.json` with a project word list | Domain nouns live here, not in the lint config |
| Target | the repository's Markdown, not every generated file | Noise is the reason spell checks get switched off |
| Report | a job failure plus the sorted word list | Cheapest signal that survives a week |
| Escape | an `ignored` list, reviewed like code | A dictionary nobody can edit becomes a blocker |

## The slots

Three values the job cannot guess. An agent should ask for each one, and only write the workflow
once it has an answer:

| Slot | Question | Example |
| --- | --- | --- |
| `repo` | Which repository should the job run against? | `acme/api` |
| `dict` | Which dictionary should carry your domain words? | `acme-terms` |
| `every` | How often should it run? | `weekly` |

A shortcut can bind some of them. `…?every=weekly` means "weekly, ask me the other two".

## Agent prompt

Copy this whole block into the agent, or hand it the QR on [/design](/design) — same thing.

```text
You are implementing le.gume isotope cornichon (spell-check a repository on a schedule).

Bound slots: every=weekly
Ask for any slot that is not bound above, one question at a time:
  repo  — which repository should the job run against?
  dict  — which dictionary file should carry the project's domain words?
Then:
1. Add .github/workflows/spell.yml with: checkout, setup-node, a scheduled trigger
   matching `every`, and `npx cspell "**/*.md" --no-progress --words-only`.
2. Add cspell.json with a `words` list seeded from `dict`, and an `ignorePaths`
   covering node_modules, dist and lockfiles.
3. Do not make it a required check. It reports; it does not block.
4. Run it once by hand and paste the first ten words it flags.
Report: the files added, the slot values used, and the first run's output.
```

## What it costs

- **A dictionary to maintain.** Domain words change; a stale list produces false failures, and
  false failures are how a scheduled job gets muted.
- **Schedule drift.** A weekly job on a busy repository finds forty typos and nobody fixes them. The
  useful cadence is the one where the report stays under ten items.
- **Notification fatigue.** By default a scheduled failure emails whoever last edited the workflow.
  Decide who owns it before you turn it on.
- **A false sense of correctness.** Spell check is not proofreading: it catches `teh`, not a
  sentence that says the opposite of what you meant.

## Take this, not that

**Take:** the schedule instead of the per-PR gate; the separated dictionary; the sorted word list.

**Leave:** a required status check, per-file overrides, and any spelling rule stricter than
"unknown word". A job that blocks merges over `kubectl` will be deleted within a month.

## What would break it

- Making it required. The first false positive then costs someone an afternoon, and the job loses
  its sponsor.
- Growing the word list by clicking "add to dictionary" on every failure. That is how a spell check
  becomes a list of every word the project has ever used.
- Running it on generated files. The report becomes noise, and noise gets ignored before signal
  arrives.

## Build it

The site's own operating instructions are at [/docs/for-agents](/docs/for-agents); the format for
isotopes is at [/isotopes/what-is-an-isotope](/isotopes/what-is-an-isotope).
