# The three pieces are the job

| Piece | File | What it decides |
| --- | --- | --- |
| The clock | `spell.yml` → `on.schedule` | when it runs (`every` slot) |
| The dictionary | `cspell.json` | what counts as a word (`dict` slot) |
| The recurrence logic | `spell.yml` → baseline diff + issue upsert | what is worth telling anyone |

Copy all three into a repository, seed `spell-baseline.txt` with the current findings, and the job
is complete. The `repo` slot is answered by where the files land.

## Install, three steps

```bash
# 1. the clock and the logic
mkdir -p .github/workflows
cp spell.yml .github/workflows/spell.yml

# 2. the dictionary — edit `words` with your domain nouns
cp cspell.json cspell.json

# 3. the baseline — start empty, or paste today's findings so the first run is quiet
touch spell-baseline.txt
```

Then run it once by hand (`Actions → spell → Run workflow`) and read the summary. If the baseline
is empty, the first run reports everything the dictionary does not know — that is the intended
"before" picture, not a failure.

## Why the baseline exists

A spell check over a whole repository always finds words: package names, surnames, protocol names.
Reporting all of them every week is how the job gets muted. The baseline is **accepted debt**: the
words currently tolerated. The job reports only what is *new* since the last acceptance, so the
weekly report stays small and each line is a decision someone can act on.

Two ways to retire a finding:

- **Not a typo, and used in the project** → add it to `cspell.json` `words` (the dictionary).
- **Not a typo, and not worth owning** → add it to `spell-baseline.txt` (tolerated noise).

## What it does not do

- It does not run on pull requests. If you want a gate, use cspell as a step in your existing CI and
  accept the merge delay — a different isotope.
- It does not fix anything. The output is a list, and the list is the point.
- It does not need any of the site's machinery. Three files, no dependencies to install in the
  repository: `npx cspell` is fetched by the runner.
