---
title: Cornichon — spell-check a repository on a schedule
description: Three files that compose into a recurring job, a worked example of slots, and why the baseline is the interesting part.
order: 3
updated: 2026-11-12
slots: repo, dict, every
presumes: github-actions, node-22, cspell-8, issues-write
tags: isotope, ci, cspell
seeds: isotopes, agent-operations
---

# Cornichon — spell-check a repository on a schedule

A repository accumulates typos the way a kitchen accumulates crumbs: nobody adds one on purpose,
and after a month the prose looks careless. Checking on every pull request catches them at the
source, but it also slows every push and blocks work on words nobody agreed on yet.

This isotope is the smaller, cheaper version: a **scheduled job** that checks the whole tree, says
what changed, and stays out of everyone's way until there is something to say.

The kit is in the repository at
[`examples/cornichon/`](https://github.com/james-gibson/le.gume/tree/main/examples/cornichon) —
three files, copy-paste install, nothing to compile.

## What it proves

A recurring quality check can be complete without being a gate: no blocked pull requests, no
per-push latency, and one place that asks "has our prose drifted?"

It also proves the compound shape — this is the isotope with **slots** (repository, dictionary,
cadence), and it is the reason a QR code can carry an instruction this long in 83 bytes.

## The parts

Three pieces combine. None of them is optional, and each one is small enough to read in a sitting.

| Piece | File | What it decides |
| --- | --- | --- |
| The clock | `spell.yml` → `on.schedule` | when it runs (`every` slot) |
| The dictionary | `cspell.json` | what counts as a word (`dict` slot) |
| The recurrence logic | `spell.yml` → baseline diff + issue upsert | what is worth telling anyone |
| The report | job summary + one issue | where a person already looks |

The `repo` slot is answered by where the files land.

## How they combine

```text
schedule (cron)
   └─▶ cspell over **/*.md …          "what does the dictionary not know?"
        └─▶ diff against the baseline  "what is new since we last accepted?"
             ├─ empty  → summary says "nothing new", no issue
             └─ words  → summary + one issue, updated not duplicated
```

The clock decides *when*, the dictionary decides *what*, and the diff decides *whether anyone is
told*. That third piece is the one most spell-check jobs omit, and it is why they get muted.

## The clock

```yaml
on:
  schedule:
    - cron: '17 6 * * 1' # Mondays 06:17 UTC
  workflow_dispatch:      # run it by hand while setting it up

concurrency:
  group: spell
  cancel-in-progress: false
```

Two details worth keeping: an off-the-hour minute (the top of the hour is congested on hosted
runners), and `concurrency` so a slow run cannot overlap the next one and report the same words
twice.

## The dictionary

```json
{
  "version": "0.2",
  "language": "en",
  "files": ["**/*.md", "**/*.ts", "**/*.tsx"],
  "ignorePaths": ["node_modules/**", "dist/**", "package-lock.json"],
  "allowCompoundWords": true,
  "words": ["cspell", "cornichon", "silverskin", "gherkin"]
}
```

`words` is the project's vocabulary: domain nouns, product names, the surname of everyone who
wrote a comment. Keep it curated and reviewed like code — this file is the difference between a
useful report and forty false alarms.

## The recurrence logic

```bash
# 1. one word per line, stdout only; a non-zero exit is normal (findings are the output)
npx cspell@8 '**/*.md' '**/*.ts' --no-progress --words-only --unique --no-summary > found.txt || true
sort -u -o found.txt found.txt

# 2. the baseline is accepted debt; only the difference is news
comm -23 found.txt <(sort -u spell-baseline.txt) > new.txt
```

Then one issue, not one per run:

```bash
if [ -s new.txt ]; then
  existing=$(gh issue list --state open --search '"Scheduled spell check: new words" in:title' \
             --json number --jq '.[0].number // empty')
  if [ -n "$existing" ]; then gh issue comment "$existing" --body "$body"
  else gh issue create --title 'Scheduled spell check: new words' --body "$body"; fi
fi
```

The baseline is the whole trick. A repository's unknown words are mostly legitimate — package
names, protocols, surnames — and reporting all of them weekly is how the report becomes noise. The
baseline records what was tolerated; the job reports only what appeared since. Each new line is
then a decision someone can make in ten seconds.

Verified behaviour, rehearsed end to end: empty baseline → the current findings; accept them →
zero; introduce `flurb` → exactly `flurb`. That is the entire mechanism.

## The slots

| Slot | Question | Example |
| --- | --- | --- |
| `repo` | Which repository should the job run against? | `acme/api` |
| `dict` | Which dictionary should carry your domain words? | `acme-terms` |
| `every` | How often should it run? | `weekly` |

A shortcut can bind some of them. `…?every=weekly` means "weekly, ask me the other two".

## Agent prompt

```text
You are implementing le.gume isotope cornichon (spell-check a repository on a schedule).

Bound slots: every=weekly
Ask for any slot that is not bound above, one question at a time:
  repo  — which repository should the job run against?
  dict  — which dictionary file should carry the project's domain words?
Then:
1. Copy examples/cornichon/spell.yml from james-gibson/le.gume into .github/workflows/spell.yml,
   and set the cron to `every`.
2. Copy examples/cornichon/cspell.json, seeding `words` from `dict`.
3. Create an empty spell-baseline.txt, run the workflow by hand once, and read the summary.
4. Decide each flagged word: dictionary (the project uses it) or baseline (tolerated noise).
5. Do not make it a required check. It reports; it does not block.
Report: files added, slot values used, and the first run's new-word count.
```

## What it costs

- **A dictionary to maintain.** Domain words change; a stale list produces false failures, and
  false failures are how a scheduled job gets muted.
- **A baseline that only grows.** Every "accept" is a small decision. Nobody prunes the baseline,
  so after a year it hides the typos you actually care about. Review it when it passes ~100 lines.
- **Schedule drift.** A weekly job on a busy repository finds forty typos and nobody fixes them. The
  useful cadence is the one where the report stays under ten items.
- **Notification fatigue.** A scheduled failure emails whoever last edited the workflow. Decide the
  owner before turning it on.
- **A false sense of correctness.** Spell check catches `teh`, not a sentence that says the opposite
  of what you meant.

## Take this, not that

**Take:** the schedule instead of the per-PR gate; the separate dictionary; the baseline diff; the
single updated issue.

**Leave:** a required status check, per-file overrides, and any spelling rule stricter than
"unknown word". A job that blocks merges over `kubectl` will be deleted within a month.

## What would break it

- Making it required. The first false positive then costs someone an afternoon, and the job loses
  its sponsor.
- Growing the dictionary by clicking "add to dictionary" on every failure. That is how a spell
  check becomes a list of every word the project has ever used.
- Never pruning the baseline. It is a debt ledger, not a permanent exemption.
- Running it on generated files. The report becomes noise, and noise is ignored before signal
  arrives.

## Why it is not enabled on this site

The kit is here and tested, but this repository does not run it. A recurring job needs an owner and
a cadence chosen for the repository's traffic; enabling it here would either be ignored or would
email one person about words they already know. That is a decision this site would rather state
than fake — and the same honesty the job itself is built to provide.

## Build it

- The kit: [`examples/cornichon/`](https://github.com/james-gibson/le.gume/tree/main/examples/cornichon)
- The operating contract: [/docs/for-agents](/docs/for-agents)
- The isotope format, and the pickle shelf: [/isotopes/what-is-an-isotope](/isotopes/what-is-an-isotope)
