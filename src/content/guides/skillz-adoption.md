---
title: Adopt a skill collection
description: Turn scattered skill directories into one canonical store, leave the old locations as views, and prove it with a hash and a probe.
order: 6
updated: 2026-11-21
tags: skills, agents, migration
seeds: skillz
---

# Adopt a skill collection

The task starts with the same symptom: the same skill exists in several agent directories, and no
one knows which copy an agent will read. The end state is one canonical copy, the old locations
left as views, and a verification command that fails when the copies drift.

The worked example is `~/skillz`. The commands are the same if you rename the folder; the paths
below are the ones in this repository.

## Before you start

Inventory first. It reads; it does not move anything.

```sh
cd ~/skillz
bin/skillz inventory
```

The report has five statuses:

| Status | Meaning | Default move |
| --- | --- | --- |
| `canonical` | already under `skills/` | leave it |
| `linked` | a symlink into `skills/` | leave it |
| `duplicate` | same name and hash as the canon | pick one authoring home |
| `drift` | same name, different bytes | merge deliberately, then seal |
| `candidate` | not owned yet | adopt it |

Before adopting, check whether the source is tracked by another git repository. An untracked
source can be moved and linked back. A tracked source is copied and left in place; the repository
still owns its copy, and the canon is a fork that `inventory` will report as drift when they
diverge.

## 1. Create or repair the store

```sh
bin/skillz init
```

This creates `skills/`, `archive/`, `external/`, `cache/`, `state/`, and `external.lock.json` if it
is missing. It does not overwrite an existing file.

The tiers are the point; see [One owner for every skill](/docs/skillz) for what belongs in each.

## 2. Adopt one skill

```sh
bin/skillz adopt ~/.agents/skills/pouf --move --link
```

`--move --link` copies the skill into `skills/pouf/`, records its provenance in
`skills/pouf/skill.json`, removes the source, and replaces it with a symlink to the canon. That is
the one-copy model.

Without `--move`, the source stays where it is and you have two copies. That is the right choice
for a skill tracked by another repository, and the wrong choice if you wanted one owner.

Useful flags:

- `--name <name>` when the directory name is not the skill name.
- `--source <url>` and `--license <id>` to record provenance the path cannot tell you.
- `--replace` to move an existing canon copy into `cache/adopt-backup/` before adopting again.

## 3. Link the agent surfaces

```sh
bin/skillz link
bin/skillz link pouf --into ~/.agents/skills
bin/skillz unlink pouf
```

A link is a view. `link` refuses to replace a real directory unless `--force` is passed; with
`--force`, the old directory is moved into `cache/link-backup/` first. If an upstream installer
recreates a linked directory, `inventory` reports the drift. Confirm the installer's copy is not
newer, then re-assert the view:

```sh
bin/skillz link --force pouf
```

## 4. Seal and verify

```sh
bin/skillz verify
bin/skillz seal pouf
bin/skillz verify
```

`seal` recomputes the tree hash and the per-file map after an intentional edit. `verify` must end
with zero errors. Warnings are worth reading: they usually mean a relative link in `SKILL.md` no
longer resolves.

A skill that fails `verify` is not broken; it is unsealed. The distinction matters because a
hash mismatch is exactly the signal that the bytes an agent will read are not the bytes that were
adopted.

## 5. Record external files

```sh
bin/skillz external add brand-assets ~/Pictures/brand.png \
  --used-by pouf --retention owned
bin/skillz external add component-spec https://fancy-ui.rama.app/llms.txt \
  --used-by fancy-ui --retention referenced --fetch
bin/skillz external verify
```

`owned` copies the bytes into `external/<id>/` and commits them. `referenced` records the origin and
materialises a copy in `cache/external/`; the cache can be rebuilt. Both are recorded in
`external.lock.json` with a SHA-256 when the file is available.

## 6. Retire and restore

```sh
bin/skillz archive pouf --reason "superseded by pouf-2"
bin/skillz restore pouf
```

`archive` moves the canon to `archive/pouf/<date>/` and writes `ARCHIVE.json` with the reason, the
date and the hash. The archive is append-only by convention. `restore` moves the latest copy back
and reseals it. To change a retired skill, restore it, edit it, seal it, and archive it again.

## 7. Put it behind the alarm (optional)

```sh
ops/install.sh up --with-ingress
ops/install.sh doctor
```

This starts the read-only MCP server, a smoke-alarm, a dedicated adhd instance and the lab's
`wan-ingress`. All bind loopback. `doctor` runs the canon check, the MCP handshake, a signed border
probe, an unsigned refusal, a real ingress forward, and the alarm state. The boundary is
[A read-only surface behind an alarm](/docs/skillz-ingress).

If you do not need a remote reader, stop after step 6. The folder is the product; the service face
is an option.

## Done when

- `bin/skillz verify` reports zero errors.
- `bin/skillz inventory` shows the old locations as `linked`, or as an intentional tracked copy.
- `ops/install.sh doctor` passes, if the service face is on.
- `git status` is clean; `cache/` and `state/` are ignored.

## What can go wrong

| Symptom | Cause | Fix |
| --- | --- | --- |
| `verify`: tree hash mismatch | the skill changed without a seal | `bin/skillz seal <name>` |
| `inventory`: drift | a project copy or an installer changed | merge, then `seal` or `link --force` |
| `doctor`: signed probe fails | the server started without the border key | restart with `--border-key-file state/ops/border.key` |
| `doctor`: ingress forward fails | a token or border-key mismatch | regenerate `state/ops/secrets.env` and restart |
| alarm: degraded target | the surface answered but lacks the required capability | read `/status`, then run `doctor` |
| page 404s after a deploy | a hand-written `/le.gume/` link or a missing route shell | use a root-absolute Markdown link and rebuild |

The last row is the site's own failure mode, not the store's. It is here because the same habit —
hand-writing a path that the build already knows — is what makes a skill copy drift in the first
place.
