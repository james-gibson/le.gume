#!/usr/bin/env node
/**
 * Post-build steps that GitHub Pages needs and Vite does not know about.
 *
 * 1. dist/404.html — a copy of the shell. Pages serves it for any unknown path,
 *    the SPA boots, React Router renders the 404 route. Without it, every deep
 *    link is a GitHub 404 before our app ever runs.
 * 2. dist/.nojekyll — stops Pages from running Jekyll over the output.
 * 3. dist/robots.txt — explicit allow; a public doc site with no robots file
 *    inherits whatever the host defaults to.
 */
import { copyFile, writeFile, access } from 'node:fs/promises'
import { join } from 'node:path'

const dist = 'dist'
const index = join(dist, 'index.html')

try {
  await access(index)
} catch {
  console.error('postbuild: dist/index.html is missing — run vite build first')
  process.exit(1)
}

await copyFile(index, join(dist, '404.html'))
await writeFile(join(dist, '.nojekyll'), '')
await writeFile(
  join(dist, 'robots.txt'),
  ['User-agent: *', 'Allow: /', ''].join('\n'),
  'utf8',
)

console.log('postbuild: wrote 404.html, .nojekyll, robots.txt')
