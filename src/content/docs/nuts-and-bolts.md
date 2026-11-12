---
title: Nuts and bolts
description: The five moving parts, the contract between them, and the places a documentation site usually goes wrong.
order: 2
updated: 2026-11-11
tags: architecture
seeds: starter
---

# Nuts and bolts

A documentation site fails in a few predictable ways: the navigation drifts from the content,
the deploy breaks on a path, someone ships a private note, or the design system is a screenshot
of a design system. This stack is shaped around those four failures.

## The pieces

```text
src/content/**.md   --raw glob-->  src/lib/content.ts  -->  nav + routes + TOC
                                        |
src/pages/*.tsx  -----------------------+-->  src/App.tsx  -->  build
                                                                    |
                                          scripts/postbuild.mjs --> 404.html, .nojekyll
                                          scripts/verify-publish.mjs  (fails the build)
```

**Content is the navigation.** `import.meta.glob` reads every Markdown file at build time and
`src/lib/content.ts` turns frontmatter into a sorted, sectioned list. The header, the footer,
the section indexes, the previous/next rail and the table of contents all read that one array.
There is no second place to edit.

**Routes are a shape, not a table.** `/`, `/design`, `/:section`, `/:section/:slug` and `*`.
A URL that does not resolve to a page renders the 404 with the real section list, so a bad link
still lands somewhere useful.

**The build has three post-steps.** `postbuild.mjs` writes one shell per real route
(`dist/docs/quickstart/index.html` and so on), a `dist/404.html` for everything else, and
`dist/.nojekyll` so nothing is silently dropped. `verify-publish.mjs` then refuses the output if
it is unsafe or obviously broken — including a route without its shell.

**Motion is a dependency, not an invention.** fancy-ui supplies the effects; the site supplies
the restraint. Components are used as shipped.

## The one rule that keeps it honest

The site never hand-maintains a list of its own pages. Everything derived — counts, nav trees,
prev/next, the footer columns, the section indexes — is computed from the content array. If you
add a file and it does not appear, the file is wrong (usually the frontmatter or the folder),
not the navigation.

## What the guard refuses

The guard is the difference between a demo and a publish pipeline. It fails when:

- `dist/index.html` is missing, or references a site root that does not match `base`;
- a required file (`404.html`, `.nojekyll`, the favicon) is absent;
- the output contains `TODO`, `lorem ipsum`, or an `example.com` placeholder;
- private-looking material is present: absolute home-directory paths, `localhost` URLs,
  obvious credential shapes, or a `.env`-style assignment;
- the bundle refers to `/src/` or ships a source map;
- the Markdown set and the rendered routes disagree.

Read it before you trust it: `scripts/verify-publish.mjs` is under 150 lines and every check
has a comment explaining the failure it prevents.

## Why the deploy is one workflow

There is no release branch, no `gh-pages` push, no artifact to keep. The workflow builds the
same command you run locally, uploads `dist/`, and lets GitHub Pages serve it. A rollback is a
revert commit.
