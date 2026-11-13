---
description: Add one Markdown page to le.gume, verify it with the guard and smoke, and commit locally
---

Add one page to the le.gume site. The argument names the section, and may include a slug:

$ARGUMENTS

Follow `.opencode/skills/legume-content/SKILL.md` and `AGENTS.md`:

1. Pick the section the request actually belongs to, and say why in one line.
2. Write exactly one file: `src/content/<section>/<slug>.md`, with `title` and `description`
   frontmatter, and `order` where the section is ordered.
3. Write internal links root-absolute (`/docs/quickstart`); never hand-write the `/le.gume/` mount.
4. Keep the house voice: dry, specific, cost-first. The legume idioms are ordinary English and are
   never explained.
5. Run `npm run build` (the guard is the gate) and `npm run smoke`.
6. Commit locally. Push only when the request says publish, ship or deploy.

Report, in this order: the file you touched, the guard line, the smoke count, and whether the
change is live.
