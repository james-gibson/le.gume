---
title: Twelve factors, one static site
description: The twelve-factor app applied to a documentation site — including the three factors that do not survive the translation.
order: 6
updated: 2026-11-11
tags: twelve-factor, architecture
---

# Twelve factors, one static site

The twelve-factor app is a methodology for building services that survive their operators. This
site is not a service. Most of the factors still apply, three of them do not, and saying which is
which is more useful than pretending all twelve landed.

This is the self-referential part: a documentation site that documents the rules it follows.

| # | Factor | Here |
| --- | --- | --- |
| 1 | Codebase | One repository, one deployable. Branches are deploys-in-waiting, `main` is released on push. |
| 2 | Dependencies | Declared in `package.json`, pinned by `package-lock.json`, installed with `npm ci`. Nothing is expected to be on the machine except Node 22. |
| 3 | Config | In the environment or the manifest, never in code: `base` in `vite.config.ts`, `homepage` in `package.json`, `BASE_URL` at build time. The guard fails the build if a credential or an absolute home path reaches the output. |
| 4 | Backing services | None at runtime. There is no database, no queue, no cache, no API. The Qdrant index that covers this content is an offline reader of the repository, not a dependency of the site. |
| 5 | Build, release, run | Strictly separated. Build produces `dist/`; a release is that directory plus a commit; run is GitHub Pages serving files. A rollback is `git revert` and a rebuild. |
| 6 | Processes | Stateless by construction. Every request is a file read from a CDN with no memory of the last one. |
| 7 | Port binding | **Does not apply.** The site does not export a port; the platform owns the socket and the certificate. |
| 8 | Concurrency | The process model is the CDN. Horizontal scale is the host's problem, and it is solved before the first request. |
| 9 | Disposability | The whole artifact is disposable. Builds finish in under a second, a deploy is an upload, and an instance can be replaced mid-request without losing anything, because nothing is held. |
| 10 | Dev/prod parity | The same command runs locally and in CI (`npm run build`), the same Node major, and the same base path — which the guard checks against `package.json`. The gap that remains is honest: `npm run dev` serves from `/`, production from `/le.gume/`. |
| 11 | Logs | Event streams, not files. Build output goes to the terminal; in production it is the Actions log. Nothing writes a log to disk, and the guard prints named checks rather than a wall of output. |
| 12 | Admin processes | One-off commands, never daemons: `npm run guard`, `npm run smoke`, and — in the vault — the indexer. They run against a checkout and exit. |

## Where it deviates, and why that is fine

Factor 7 is the interesting one. A static site has no process to bind a port, so the factor is not
weakened — it is out of scope. The same is true of factor 4: "treat backing services as attached
resources" is advice for a service that has them. Claiming compliance here would be a lie of the
kind this site argues against elsewhere.

Factor 10 is the one real cost. The base path differs between dev and production because GitHub
Pages serves a project site from a subdirectory. The mitigation is not discipline, it is a check:
`scripts/verify-publish.mjs` compares the built asset paths against `package.json.homepage` and
refuses a mismatch. A trap that cannot be forgotten is better than a trap everyone remembers.

## What the factors buy a documentation site

Two things that matter more than elegance:

- **A rollback you can perform at 2am.** Revert a commit, push, wait forty seconds. Factor 5 makes
  that the whole procedure.
- **A build that proves itself.** Factor 2 plus factor 10 means the artifact CI produces is the
  artifact you ran locally. The guard then checks the artifact rather than the intention.

Twelve factors are not a maturity ladder. They are a set of questions, and this site answers ten
of them out loud and declines three on the record. That is the same trade the rest of the site
makes: state the cost, then the recommendation.
