---
title: One owner for every skill
description: Four tiers, a sealed manifest and a short loop — how a folder of agent skills becomes one canonical store.
order: 21
updated: 2026-11-21
tags: skills, agents, archives, provenance
seeds: skillz
---

# One owner for every skill

A skill is a claim about how to act, written down so a later agent can act the same way. The claim
is cheap to copy, which is why a machine ends up with the same skill in `~/.agents/skills`, a
project's `.opencode/skills`, a worktree's `.claude/skills`, and a cache. The copies are not the
problem; the missing answer to "which one is true?" is.

`skillz` is a repository with one job: answer that question once. It is the worked example, not a
package. The pattern is four tiers and a sealed manifest.

## The four tiers

| Tier | Path | Tracked | Lifetime | Holds |
| --- | --- | --- | --- | --- |
| Active | `skills/` | git | long-term | The canonical, currently usable skills |
| Archive | `archive/` | git | permanent | Retired skills at `archive/<name>/<date>/` |
| External | `external/` + `external.lock.json` | git + lock | long-term | Files a skill cites; owned or referenced |
| Cache | `cache/` | ignored | disposable | Downloads, fetched sources, previews |

`state/` is a fifth, runtime-only area: pids, ports, generated configs and logs. It is ignored and
never canon.

The distinction that matters is between the first three and the last. `cache/` can be emptied with
`skillz gc`; `archive/` cannot. A retired skill is kept because "why did we stop using this?" is
the question a future agent will ask, and a deleted directory cannot answer it.

## The manifest is the claim

Every active skill carries `skill.json`, written by `skillz adopt` or `skillz seal`:

```json
{
  "name": "pouf",
  "tier": "active",
  "source": { "type": "path", "location": "~/.agents/skills/pouf" },
  "tree_hash": "sha256:...",
  "files": { "SKILL.md": "sha256:...", "references/components.md": "sha256:..." },
  "external": []
}
```

The tree hash is canonical: SHA-256 over `relpath`, a NUL, the file's SHA-256, and a newline, for
every regular file in sorted order, excluding `skill.json` and junk. `verify` recomputes it and
names the skill when the bytes and the manifest disagree.

An archived skill keeps the same record inside its `ARCHIVE.json`, plus the retirement date and the
reason. The archive is append-only by convention: to change a retired skill, restore it, edit the
canon copy, seal it, and archive it again. Editing the archive in place destroys the only record of
what was retired.

## Sources are cited, not absorbed

A skill often depends on something it did not write: a component catalogue, a screenshot, a
vendor's specification. `external.lock.json` records the citation — origin, SHA-256, size, license,
which skills use it, and whether the bytes are **owned** or **referenced**.

Owned payloads live in `external/` and are committed. Referenced payloads live at their origin and
are materialised in `cache/external/` on demand; a cache miss is a warning, not a loss of canon.
`skillz external verify` checks every materialised copy against the recorded hash.

## The loop

| Act | Command | What it changes |
| --- | --- | --- |
| Inventory | `skillz inventory` | nothing; reports candidates, duplicates and drift |
| Adopt | `skillz adopt <path>` | copies into `skills/`, writes `skill.json` |
| Seal | `skillz seal <name>` | re-hashes after an intentional edit |
| Verify | `skillz verify` | checks frontmatter, hashes, links and citations |
| Link | `skillz link` | symlinks the canon into an agent surface |
| Archive | `skillz archive <name> --reason "..."` | moves to `archive/<name>/<date>/` |
| Restore | `skillz restore <name>` | moves back and reseals |
| Sweep | `skillz gc` | empties `cache/` |

A link is a view, not a second copy. If an installer recreates `~/.agents/skills/<name>` as a real
directory, the canon has not moved: `inventory` reports the drift, and `link --force` re-asserts the
view after you confirm the installer's copy is not newer.

## The service face

The MCP server answers five read-only methods:

| Method | Answers |
| --- | --- |
| `initialize` | the MCP handshake; advertises the `skills` capability |
| `skills/status` | counts, cache size and readiness |
| `skills/list` | active or archived skills with descriptions and hashes |
| `skills/read` | one skill's `SKILL.md`, file list and provenance |
| `skills/search` | a substring search across the active and archived tiers |

There are no write methods. Mutation is the CLI; the wire is read-only on purpose. The server binds
loopback on port 8090 and refuses a non-loopback bind unless `--allow-non-loopback` is passed
explicitly.

## What it costs

- **The second copy is the trigger.** A single skill in a single folder does not need a manifest,
  a hash and a loop. The ceremony pays when a second agent surface appears.
- **Hash, not trust.** A sealed skill can still be wrong. The hash proves the bytes did not change,
  not that the advice is good.
- **A repository to keep.** The canon is git history: back it up, review it, and do not let a cache
  become the only copy.
- **A service to keep alive.** The MCP surface is optional; an alarm without a running server is a
  red light, not a discovery.

## When not to use it

If you need per-caller permissions, a registry, version resolution or a search service, this is the
wrong layer. `skillz` is custody for one owner on one machine, with a read-only surface for the
processes that need to look. The [adoption guide](/guides/skillz-adoption) is the task; the
[service face](/docs/skillz-ingress) is the boundary.
