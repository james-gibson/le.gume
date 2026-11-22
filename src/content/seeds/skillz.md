---
title: The skill repository
description: One owner for a folder of agent skills — canon, archive, sources and cache, with a read-only surface and an alarm.
order: 75
updated: 2026-11-21
tags: seed, skills, agents, archives
---

# The skill repository

The audience is someone who owns a folder of agent skills and has noticed that the folder is now
several folders. The assumption is a shell, Python 3, and Markdown you already trust. The entrance
is [One owner for every skill](/docs/skillz).

## What is inside

- **The model** — [One owner for every skill](/docs/skillz): four tiers, a sealed manifest, and a
  loop that keeps a copy from becoming a second source of truth.
- **The service face** — [A read-only surface behind an alarm](/docs/skillz-ingress): loopback MCP,
  token admission, a signed border, and the checks that say it is still answering.
- **The task** — [Adopt a skill collection](/guides/skillz-adoption): inventory, adopt, link, seal,
  verify, archive, and the point at which the loop is done.

## Why it is shaped this way

An agent skill is a claim about how to act, written down. Once the same claim exists in
`~/.agents/skills`, a project's `.opencode/skills`, and a worktree's `.claude/skills`, "which one is
true?" has no answer that survives a new session. The repository answers it by making one tier
canonical and the other locations views.

The split is the argument:

| Tier | Path | Tracked | What it is for |
| --- | --- | --- | --- |
| Canon | `skills/` | yes | The skills an agent should read now |
| Apocrypha | `archive/` | yes | Retired skills, with the reason and the hash |
| Sources | `external/` + `external.lock.json` | yes | Files a skill cites, owned or referenced |
| Ephemera | `cache/` | no | Downloads and rebuildable copies |

Without the split, a downloaded archive, a retired experiment, a vendored font and the text an
agent must follow all look like "a skill". With it, `cache/` can be deleted without losing
knowledge, and `archive/` can be read without being mistaken for current.

## The claim is checkable

Every active skill carries `skill.json`: its source, adoption date, a tree hash and a hash per
file. `skillz verify` recomputes them. An archived skill carries `ARCHIVE.json` with the same hash
and the reason it was retired. The hash is not a signature; it is a receipt that the bytes an agent
is reading are the bytes that were adopted.

## What it costs

- **A manifest per skill.** Editing a skill without re-sealing it fails `verify`. That is the point,
  and it is also a step you can forget.
- **A loop.** Adopt, seal, verify, link, archive. A folder has none of these and is faster until it
  has a second copy.
- **A service face to keep alive.** The MCP server, alarm and ingress are optional, but once they
  are on, `doctor` is the difference between an alarm and a decoration.
- **No search, no registry, no permissions.** The store is a git repository and a read-only wire.
  Multi-user access control is a different system.

## What it does not cover

Whether a skill is any good, how to route a model to it, or how to publish it to a registry. Those
are authoring and distribution problems; this seed is about custody.

The worked example is `skillz` at `~/skillz`. Start with
[One owner for every skill](/docs/skillz).
