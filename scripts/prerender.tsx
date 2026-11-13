/**
 * Prerender every route to static HTML.
 *
 * AgentReady AR-READ-01 is a MUST: the answer has to be in the initial HTML.
 * A single-page app fails it by construction, so each route is rendered to a
 * string here and `postbuild` writes the shells from this output. The
 * application still boots and replaces the markup; the markup is what a reader
 * that does not run JavaScript gets.
 *
 * Rendered with the real basename so every href in the static HTML is the URL
 * that actually resolves on Pages, not a dev-relative one.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { App } from '../src/App'
import { PAGES, SECTIONS } from '../src/lib/content'

const BASE = '/le.gume'
const OUT = 'dist/.prerender'

const routes = [
  { file: 'home', path: '/' },
  { file: 'design', path: '/design' },
  { file: 'palette', path: '/palette' },
  ...SECTIONS.map((section) => ({ file: section.id, path: `/${section.id}` })),
  ...PAGES.map((page) => ({
    file: `${page.section}/${page.slug}`.replace(/\//g, '__'),
    path: `/${page.section}/${page.slug}`,
  })),
  { file: '404', path: '/this-route-does-not-exist' },
]

await mkdir(OUT, { recursive: true })

let failures = 0
for (const route of routes) {
  try {
    const html = renderToString(
      <StaticRouter basename={BASE} location={`${BASE}${route.path}`}>
        <App />
      </StaticRouter>,
    )
    await writeFile(join(OUT, `${route.file}.html`), html, 'utf8')
  } catch (error) {
    failures += 1
    console.error(`prerender: ${route.path} failed — ${(error as Error).message}`)
  }
}

if (failures) {
  console.error(`prerender: ${failures} of ${routes.length} routes failed`)
  process.exit(1)
}

console.log(`prerender: ${routes.length} routes rendered to ${OUT}`)
