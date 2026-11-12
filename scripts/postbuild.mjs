#!/usr/bin/env node
/**
 * Post-build steps that GitHub Pages needs and Vite does not know about.
 *
 * 1. dist/404.html — a copy of the shell. Pages serves it for any unknown path,
 *    the SPA boots, React Router renders the 404 route.
 * 2. dist/<section>/<slug>/index.html — one shell per real route. Pages serves
 *    these with a 200 instead of falling through to 404.html, so a deep link is
 *    a found page rather than a missing one that happens to render.
 * 3. dist/.nojekyll — stops Pages from running Jekyll over the output.
 * 4. dist/robots.txt — explicit allow.
 */
import { copyFile, writeFile, mkdir, readdir, access } from 'node:fs/promises'
import { join, relative } from 'node:path'

const DIST = 'dist'
const CONTENT = 'src/content'
const index = join(DIST, 'index.html')

try {
  await access(index)
} catch {
  console.error('postbuild: dist/index.html is missing — run vite build first')
  process.exit(1)
}

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

// Routes are the content tree plus the two static ones. Keeping this derived
// means a new page gets its own 200 without editing this file.
const routes = [
  'design',
  ...(await walk(CONTENT))
    .filter((f) => f.endsWith('.md'))
    .map((f) => relative(CONTENT, f).replace(/\.md$/, '')),
]

for (const route of routes) {
  const dir = join(DIST, route)
  await mkdir(dir, { recursive: true })
  await copyFile(index, join(dir, 'index.html'))
}

await copyFile(index, join(DIST, '404.html'))
await writeFile(join(DIST, '.nojekyll'), '')
await writeFile(join(DIST, 'robots.txt'), ['User-agent: *', 'Allow: /', ''].join('\n'), 'utf8')

console.log(`postbuild: wrote ${routes.length} route shells, 404.html, .nojekyll, robots.txt`)
