---
title: Quickstart
description: Clone the seed, install, and have a documented, deployable site in under five minutes.
order: 1
updated: 2026-11-11
tags: install, vite, pages
---

# Quickstart

Two dependencies matter here: Node 22 or newer, and a GitHub account. Everything else is
installed by `npm install`.

## Start from the seed

The repository is the generator: there is no separate CLI to keep in sync with it.

```bash
git clone https://github.com/james-gibson/le.gume my-site
cd my-site
npm install
npm run dev
```

Vite prints a local URL. Open it — that is the site you are reading, served from your machine.

## What you get

| Thing | Where | What it does |
| --- | --- | --- |
| Content | `src/content/<section>/*.md` | Markdown plus a four-field frontmatter |
| Routes | `src/App.tsx` | Five routes, one of them a wildcard |
| Chrome | `src/components/` | Header, footer, layout, Markdown styling |
| Design system | `src/pages/Design.tsx` | A live page of the components in use |
| Guard | `scripts/verify-publish.mjs` | Fails the build on unsafe or broken output |
| Deploy | `.github/workflows/deploy.yml` | GitHub Pages on every push to `main` |

## The three commands you will actually use

```bash
npm run dev     # local, with HMR
npm run build   # type-check, build, post-process, guard
npm run guard   # just the publish guard, against an existing dist/
```

`npm run build` is deliberately the same thing CI runs. If it passes locally, the deploy is
boring.

## Make it yours

1. Change the `homepage`, `name` and `base` (in `vite.config.ts`) if the repo is not called
   `le.gume`.
2. Replace the four sections in `src/lib/content.ts` if your docs are not docs/guides/pitch/writing.
3. Delete the content you do not want. The navigation follows the files, so an empty folder is an
   empty section — no dangling links.

That is the whole migration. There is no theme file, no plugin registration, no route table to
edit in two places.

## Next

- [Nuts and bolts](/docs/nuts-and-bolts) — how the pieces fit, and why each one is small.
- [Content model](/docs/content-model) — the frontmatter contract.
- [Adding a page](/guides/adding-a-page) — the four-minute version.
