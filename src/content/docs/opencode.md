---
title: OpenCode, out of the box
description: Four files in the places OpenCode already reads — instructions, a skill, a config and one command. No plugin, no MCP server, nothing to install.
order: 12
updated: 2026-11-13
tags: agents, opencode, tooling
seeds: agent-operations
---

# OpenCode, out of the box

The repository is set up so an agent arriving with OpenCode needs no briefing beyond the files.
Nothing is installed, nothing is registered, and deleting `.opencode/` leaves a site that still
builds.

## What is in the standard places

| Path | What it is | How it is found |
| --- | --- | --- |
| `AGENTS.md` | project instructions: commands, content rules, design rules, the guard | read automatically |
| `.opencode/skills/legume-content/SKILL.md` | the content workflow — add, edit, restructure, verify, ship | discovered under `.opencode/skills/` |
| `opencode.json` | the schema, and an explicit pointer at `AGENTS.md` | project config discovery |
| `.opencode/commands/page.md` | `/page <section>` — one file, guard, smoke, local commit | discovered under `.opencode/commands/` |

No plugin, no MCP server, no custom loader. Four files, in the locations the tool already reads.

## The command

```text
/page docs
```

expands to a prompt that names the section, the one-file rule, the root-absolute link rule, the
voice, the build and the smoke, and the report order. It exists because those six steps were being
retyped every time, and a command is cheaper than a paragraph.

## Why the config is four lines

`opencode.json` carries the schema and one instruction path. Skills and commands are discovered from
their directories, so listing them in the config would create a second place to update — the drift
this site avoids everywhere else. The config is the only file here that is not self-describing,
which is why it is the smallest.

## What it costs

- **A second contract.** `AGENTS.md` and the skill restate rules the guard enforces. When they
  drift, an agent follows the wrong one: the guard catches the output, not the instructions.
- **A file per tool.** An agent that does not read `AGENTS.md` gets nothing from it. That is why
  [`/llms.txt`](/llms.txt) exists — the site's own entry point works without any tool's
  conventions.
- **No plugin, which is also a limit.** If a workflow is not a Markdown prompt, it is not here.
  Anything that needs a hook or a tool has to be written as one.

## What is not enforced

The guard does not read `AGENTS.md`, the skill or `opencode.json`. It checks the build. An
instruction file that contradicts the site is a documentation bug, and the only test is a reader
noticing — the same limit as the rest of the prose.

## Verify it

1. Open the repository in OpenCode.
2. Ask what the build command is. The answer should come from `AGENTS.md`, not from guesswork.
3. Run `/page docs`. It should write one file, run the guard and the smoke, and commit locally.

If step 3 pushes without being asked, the command is wrong.

The agent contract itself is [For agents](/docs/for-agents), and the obligations that come with the
code are [The licence, for agents](/docs/agent-licence).
