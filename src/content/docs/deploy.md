---
title: Deploy
description: GitHub Pages on push, the base-path trap, and how to roll back in one commit.
order: 5
updated: 2026-11-11
tags: pages, ci, release
---

# Deploy

Deployment is a workflow, not a ritual: every push to `main` builds the site, runs the guard,
and publishes `dist/`.

## The workflow

```yaml
# .github/workflows/deploy.yml (abridged)
on:
  push: { branches: [main] }
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    environment: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Three properties of this shape are worth keeping:

- `npm ci` and the lockfile: the build you get is the build that was tested.
- The guard runs inside `npm run build`, so a failure stops the deploy rather than the reader.
- One artifact, one environment. There is no `gh-pages` branch to reconcile.

## The base-path trap

A project site is served from `https://<owner>.github.io/<repo>/`, not from the domain root.
Two places must agree:

```ts
// vite.config.ts
base: command === 'build' ? '/le.gume/' : '/'
```

```ts
// src/main.tsx
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
```

If the first changes and the second does not, every link lands one directory too high and the
first symptom is a blank page with a 200 response. Rename the repository and both lines change.

## Custom domain

1. Add `public/CNAME` containing the domain.
2. Set the domain in the repository's Pages settings.
3. Change `base` to `/` and rebuild.

The guard checks that `base` and the built asset paths agree, so a half-done domain migration
fails the build instead of half-working in production.

## Rollback

```bash
git revert <bad-commit>
git push
```

The workflow rebuilds the previous state. There is no artifact to restore and no cache to
clear — which is the entire argument for building on every push instead of publishing by hand.

## Where the vault fits

This site is part of a larger publishing cycle: the vault that holds the notes runs a sync step
that builds this repository and runs its guard, so a broken le.gume build surfaces there too.
The site does not import from the vault, and the vault does not inject content into it. The
coupling is one command and one exit code.
