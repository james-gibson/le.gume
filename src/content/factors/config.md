---
title: 3. Config
description: Settings live outside the code, so the same files can run in two places.
order: 4
updated: 2026-11-12
tags: factor, config, secrets
---

# 3. Config

> Anything that changes between places is a setting, not code. Settings live outside the program.

## The idea

The program is the same everywhere; the *place* is not. A web address, a database password, a
feature switch — these differ between your laptop and the public site. If they are written into the
source, you cannot deploy the same program to two places without editing it, which means the thing
you tested is not the thing you shipped.

Config is stored in the environment: values handed to the program when it starts, not committed
with it. Secrets in particular must never be in the repository, because repository history is
permanent and often public.

## A picture

```text
source (same everywhere)        environment (differs per place)
────────────────────────        ───────────────────────────────
reads process.env.API_URL  ←──  API_URL=https://api.example.com
reads process.env.BASE_PATH ←─  BASE_PATH=/le.gume/
```

The code asks a question; the place answers it.

## What it buys

- One build, many places. The artifact you tested can be the artifact you ship.
- Secrets stay out of git, so a repo can be shared, forked or made public.
- Changing a setting is not a code change, so it does not need a code review or a rebuild.

## What it costs

- **Invisibility.** A setting is not visible in the file you are reading. Undocumented environment
  variables are the most common cause of "works locally, blank page in production".
- **No types, no defaults.** A missing value is often an empty string, not an error. Validate at
  startup or pay for it later.
- **Two sources of truth** once a setting also lives in a config file or a CI secret store.

## Skip it when

There is only one place and no secrets — a personal static site, for instance. Even then, keep the
*rule*: anything that will differ later (a domain, a base path) belongs in configuration now, or it
becomes a refactor later.

## Where this site stands

**Partly applied, deliberately.** The base path is configuration (`base` in `vite.config.ts`,
mirrored by `homepage` in `package.json`), and the build reads `BASE_URL`. But this site has one
environment and no secrets, so most of what factor 3 protects against cannot happen. The publish
guard covers the one real risk: it refuses a build whose output contains a credential or an
absolute home path.

## Exercise

List every value you would have to change to move the project to a different domain. If any of them
is inside a source file you would edit by hand, that value is mislabelled.

Next: [4. Backing services](/factors/backing-services)
