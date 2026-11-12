---
title: 5. Build, release, run
description: Making the files, labelling the files, and serving the files are three different jobs.
order: 6
updated: 2026-11-12
tags: factor, deploy
---

# 5. Build, release, run

> Turning source into files, naming that set, and serving it are three separate steps.

## The idea

- **Build** turns source code into something runnable: `dist/`.
- **Release** is that output plus a label — usually a commit — that can be named and repeated.
- **Run** is serving it: files on a CDN, a process on a server.

The rule is that you never edit the running thing. You build, you label, you deploy that exact
label. If a fix is needed, it goes back to source, builds again, and becomes a new label.

## A picture

```bash
npm run build          # build   → dist/
git commit -m "…"      # release → a named, repeatable artifact
git push               # run     → Pages serves it
```

Rollback is not a special procedure; it is releasing an earlier label.

## What it buys

- The thing you tested is the thing you shipped, because both are the same build.
- Rollback is routine, and takes as long as a deploy.
- Two people can tell what is live by reading one commit.

## What it costs

- **Ceremony.** Small changes go through the same three steps as large ones.
- **No hotfixes by hand.** Editing a file in production is forbidden, which feels slow the first
  time and saves you the second.
- **Artifacts.** Someone must keep the labels; in this site's case, git is the registry.

## Skip it when

You are the only user and the thing is a document. But keep the habit of building rather than
editing what is live: the moment a second person reads it, an untracked edit becomes a mystery.

## Where this site stands

**Applied.** `npm run build` produces `dist/`; a release is that output at a commit; `run` is
GitHub Pages serving the uploaded files. There is no release branch and nothing to promote, so
rollback is `git revert` plus the automatic rebuild.

## Exercise

Find something you have edited "just in production" — a theme file, a config on a server, a
document with no history. Write down what you would have to do to reproduce that edit exactly.
That answer is the cost this factor removes.

Next: [6. Processes](/factors/processes)
