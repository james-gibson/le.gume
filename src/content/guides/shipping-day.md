---
title: Shipping day
description: The pre-flight list that catches the four mistakes this stack can still make.
order: 4
updated: 2026-11-11
tags: checklist, release
seeds: starter
---

# Shipping day

The guard catches mechanical failures. This list catches the human ones.

## Before the push

- [ ] `npm run build` passes from a clean checkout — `rm -rf node_modules dist && npm ci && npm run build`.
- [ ] Every new page opens at its real URL, not just from the nav.
- [ ] The "Edit this page" link on a new article resolves to a file that exists.
- [ ] No `TODO`, no `lorem ipsum`, no `example.com` left in prose.
- [ ] Dates in `updated` are real dates, and the pages you did not touch still say what they said.

## Accessibility pass, five minutes

- [ ] Tab through the header and the first screen: focus is visible on every link and button.
- [ ] Turn on reduced motion (macOS: System Settings → Accessibility → Display → Reduce motion).
      The page should still read; nothing should depend on an animation to become visible.
- [ ] Check one page at 200% zoom: no horizontal scroll on the article column.
- [ ] Heading order is `h1` → `h2` → `h3`, never skipped, never two `h1`s.
- [ ] Every image has an `alt` that says something, or an empty one if it is decorative.

## The deploy

- [ ] The Actions run is green, not "green-ish" — open the job and read the guard step.
- [ ] Load the deployed URL with a hard refresh, then load one deep link directly.
- [ ] Confirm the canonical URL in `index.html` matches the domain you actually published to.

## Rollback, if it comes to that

```bash
git revert <commit> && git push
```

A revert is faster than a fix and always available, because every deploy is a rebuild of a
commit.

## After

Write down what broke. A shipped page that was wrong is a documentation bug with a date on it,
and the next person to touch that file deserves the note.
