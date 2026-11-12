# le.gume

A documentation site that documents itself. Four sections, one content model, one guard, one
deploy — and a live design system instead of a screenshot of one.

<p align="center">
  <a href="https://github.com/james-gibson/le.gume/actions/workflows/deploy.yml"><img src="https://shieldcn.dev/github/ci/james-gibson/le.gume.svg?workflow=deploy.yml&branch=main&variant=secondary" alt="deploy" /></a>
  <a href="https://github.com/james-gibson/le.gume/blob/main/LICENSE"><img src="https://shieldcn.dev/github/license/james-gibson/le.gume.svg?variant=secondary" alt="license" /></a>
  <a href="https://github.com/james-gibson/le.gume/commits/main"><img src="https://shieldcn.dev/github/last-commit/james-gibson/le.gume.svg?variant=secondary" alt="last commit" /></a>
</p>

**Live:** https://james-gibson.github.io/le.gume/

## What this is

A seed, not a generator. The repository is the template: clone it, read it, keep four files,
replace the rest with your own words.

- **Content is navigation.** `src/content/**/*.md` is the only place a page is declared; the nav,
  section indexes, table of contents, previous/next and page counts are all derived from it.
- **A guard, not a checklist.** `scripts/verify-publish.mjs` fails the build on placeholders,
  leaked local paths, a mismatched Pages base path, missing SPA fallback, or content that never
  reached the bundle.
- **A live design system.** `/design` renders the components the site ships, with the props
  actually used. Motion comes from [fancy-ui](https://fancy-ui.rama.app).
- **A smoke test for the React tree.** `npm run smoke` renders every route on the server and
  fails if one throws.

## Quickstart

```bash
git clone https://github.com/james-gibson/le.gume my-site
cd my-site
npm install
npm run dev
```

Node 22+. Nothing else is required.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | `tsc --noEmit`, Vite build, `404.html` + `.nojekyll`, then the publish guard |
| `npm run smoke` | Renders every route to a string; fails on a render error |
| `npm run guard` | The guard alone, against an existing `dist/` |
| `npm run preview` | Serve the production build locally |

## Layout

```text
src/content/<section>/<slug>.md   pages (frontmatter: title, description, order, updated, tags)
src/lib/content.ts                the content model: glob, ordering, headings, neighbours
src/lib/markdown.tsx              article typography
src/pages/Design.tsx              the live design system
src/App.tsx                       five routes
scripts/postbuild.mjs             404.html, .nojekyll, robots.txt
scripts/verify-publish.mjs        the publish guard
scripts/smoke.tsx                 the route smoke test
.github/workflows/deploy.yml      GitHub Pages on push
```

## Deploy

Push to `main`. The workflow runs `npm ci && npm run build`, uploads `dist/`, and publishes with
`actions/deploy-pages`. The base path lives in two places that must agree — `vite.config.ts`
(`base`) and `package.json` (`homepage`) — and the guard checks that they do.

## Adding content

Create `src/content/docs/your-page.md`, add frontmatter, run `npm run build`. The navigation
registers it; there is no nav array to edit. See `/guides/adding-a-page` on the live site, or the
`legume-content` skill in `.opencode/skills/`.

## License

MIT.
