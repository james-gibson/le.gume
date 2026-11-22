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
package. The installable repository is [james-gibson/skillz](https://github.com/james-gibson/skillz);
the pattern is four tiers and a sealed manifest.

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

## Hired sources

An expert can be canon and still have an upstream. `sources.lock.json` pins the repository, ref,
commit, path and license for every skill in the group; each vendored `skill.json` carries the same
source. `hire --all` imports the set, and `skillz sync --check` resolves the repository/ref once for
the whole group. It reports `current`, `drift` or `unreachable`; `sync --update` refreshes the
copies and reseals them. Local edits are replaced by an update, so a deliberate fork removes the
source entry instead.

The MCP server advertises `sync` only while every pin is current. The optional `skillz-sync` alarm
target requires `sync/current`, so an upstream commit turns that light yellow. That is the
difference between a copy and an imported expert: the copy can drift silently; the pin cannot.

The worked example is [Matt Pocock's `ask-matt` set](https://github.com/mattpocock/skills), pinned
under MIT at a commit, not at a branch name that happens to be current. `ask-matt` is the router;
the rest of the set is what it routes to.

The source does not have to be a person: the official
[shadcn/ui skill](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn) is pinned from the
`shadcn-ui/ui` monorepo at `skills/shadcn`, one directory among many. The ledger records the path,
the commit and the MIT license; it does not assume an individual author.

### Authored adapters

Not every library ships a `SKILL.md`. GlassCN UI is a component library; its skill is an **authored
adapter**. It copies no upstream skill, records the repository and commit in `skill.json.source`,
and cites the README at that commit in `external.lock.json`. There is no `sync` pin, because there
is no upstream skill to pin; if the docs change, re-read them and re-seal the adapter.

A group does not have to be the whole catalog. A curated set from
[`github/awesome-copilot`](https://github.com/github/awesome-copilot) is pinned from a large
repository, one path at a time, under one repository pin; the rest of the catalog is not vendored.

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
- **An upstream to watch.** A hired skill is only as current as its pin. `sync --check` and the
  alarm tell you when the expert moved; they do not merge the change for you.
- **A service to keep alive.** The MCP surface is optional; an alarm without a running server is a
  red light, not a discovery.

## When not to use it

If you need per-caller permissions, a registry, version resolution or a search service, this is the
wrong layer. `skillz` is custody for one owner on one machine, with a read-only surface for the
processes that need to look. The [adoption guide](/guides/skillz-adoption) is the task; the
[service face](/docs/skillz-ingress) is the boundary.
