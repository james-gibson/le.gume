---
title: Project seeds
description: Why this repository is a seed rather than a generator, what to keep, and what to throw away.
order: 1
updated: 2026-11-11
tags: templates, bootstrap
---

# Project seeds

A generator produces a project once and then disappears. A seed keeps producing: you can read
it, diff it, and take only the parts you need. This repository is the second kind.

## Why not a CLI

A `create-*` package has one advantage — a short command — and three costs:

- the template lives twice, once in the CLI and once in its own repo;
- the CLI has to be versioned, trusted and updated independently of the thing it produces;
- the generated project cannot be compared to its source, because the source is inside a
  package you did not read.

A seed has none of those. `git clone` is the short command. The diff you get on upgrade is the
diff you can read.

## What to keep

| Keep | Because |
| --- | --- |
| `src/lib/content.ts` | The whole content model is one file; replacing it means replacing the site |
| `src/lib/markdown.tsx` | Article typography is the site's voice |
| `scripts/verify-publish.mjs` | The guard is the reason a doc site can be public |
| `scripts/postbuild.mjs` | Two files that make Pages behave |
| `.github/workflows/deploy.yml` | The deploy is short on purpose |

## What to replace

- **Sections.** Four is a preference, not a law. Two sections and a flat list is a valid site.
- **Copy.** Every paragraph on this site is an argument about documentation. Yours will be
  about your product.
- **The palette.** Seven tokens in `src/index.css`. Changing them changes the whole site,
  including the fancy-ui components, because they read the same variables.
- **The design page.** Keep the idea, delete the samples you do not use.

## The seed checklist

1. `git clone` → `npm install` → `npm run dev`.
2. Rename: `package.json` (`name`, `homepage`), `vite.config.ts` (`base`), `index.html` (title,
   description, canonical).
3. Rewrite `SECTIONS` and the folders under `src/content/`.
4. Delete unused pages; the nav follows the files.
5. `npm run build` — the guard must pass before the first push.

## A warning worth printing

A seed you do not read is just a generator with worse ergonomics. The value here is that the
files are small enough to finish reading. If you skip that, you are trusting a stranger's
defaults with your public surface — which is the exact failure this repository is trying to
make harder.
