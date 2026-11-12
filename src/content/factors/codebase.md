---
title: 1. Codebase
description: One program, one folder with a diary, many deploys — and why a second repo is a decision, not a detail.
order: 2
updated: 2026-11-12
tags: factor, source-control
seeds: twelve-factors
---

# 1. Codebase

> One program lives in one repository. You deploy it many times from there.

## The idea

A repository is a folder that remembers. Every change is a dated entry, so you can see who changed
what, and go back to any earlier version. One program should have exactly one such folder. Deploys
are copies of it — many copies over time, all from the same diary.

The failure this prevents is the second repo: `app` and `app-final`, `site` and `site-new`. Two
diaries, no shared history, and eventually two different programs pretending to be one.

## A picture

```text
repo (one diary)
 ├── commit a1b2   deployed Monday    ← live last week
 ├── commit c3d4   deployed Tuesday   ← live now
 └── commit e5f6   not deployed yet   ← being tested
```

Three deploys, one history. Rolling back is choosing an earlier commit, not restoring a backup.

## What it buys

- One place to look when something is wrong, and one history to read.
- Rollback as a normal operation: pick an earlier commit, rebuild, done.
- Cheap branches: a change can be tried without touching what is live.

## What it costs

- **Discipline about what belongs in it.** Generated files and credentials in a repo are permanent
  pollution; removing them later rewrites history.
- **Monorepo decisions.** Two programs in one repo can share work, but they also share a release
  cadence unless you separate their builds.
- **Long-lived branches.** The longer a branch lives, the more the merge costs. A branch older
  than a week is usually a bill.

## Skip it when

Almost never — but be honest about what "one program" means. A site and the API it calls are two
programs even if one person writes both. Put them in one repo if you like; deploy them separately
and say so.

## Where this site stands

**Applied.** One repository, one deployable, deployed on every push to `main`. There is no release
branch, no `gh-pages` branch, and no build artifact stored anywhere else.

## Exercise

Find any project you own and answer in one line: *where does its live version come from?* If the
answer involves a folder that is not the repository, you have found the second copy.

Next: [2. Dependencies](/factors/dependencies)
