/**
 * Route smoke test.
 *
 * Builds the app for Node and renders every route to a string. This catches the
 * failure a green `vite build` cannot: a route that throws while rendering, a
 * component whose props changed shape, a page whose Markdown no longer parses.
 *
 *   npm run smoke
 *
 * It is intentionally not part of `npm run build` — the guard is about the
 * published output, this is about the React tree.
 */
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { App } from '../src/App'
import { PAGES } from '../src/lib/content'

const routes = [
  '/',
  '/design',
  ...PAGES.map((page) => `/${page.section}/${page.slug}`),
  '/this-route-does-not-exist',
]

let failures = 0

for (const route of routes) {
  try {
    const html = renderToString(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>,
    )
    const heading = /<h1[^>]*>([\s\S]*?)<\/h1>/i
      .exec(html)?.[1]
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (!heading) throw new Error('rendered without an <h1>')
    console.log(`  ok  ${route.padEnd(34)} ${heading.slice(0, 48)}`)
  } catch (error) {
    failures += 1
    console.error(`FAIL  ${route.padEnd(34)} ${(error as Error).message}`)
  }
}

console.log(
  failures
    ? `\nsmoke: ${failures} of ${routes.length} routes failed`
    : `\nsmoke: ${routes.length} routes rendered`,
)
process.exit(failures ? 1 : 0)
