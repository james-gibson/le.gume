/**
 * Files that were never hosted as pages.
 *
 * "It's just a file" is only a claim until you can see the files that have no
 * route. These are imported as raw text at build time — not fetched — so what
 * the reader sees is the file that shipped, and the bundle is the only host.
 */
import readme from '../../README.md?raw'
import agents from '../../AGENTS.md?raw'
import license from '../../LICENSE?raw'
import spellWorkflow from '../../examples/cornichon/spell.yml?raw'

export type SourceFile = { path: string; text: string }

export const NON_HOSTED_FILES: SourceFile[] = [
  { path: 'README.md', text: readme },
  { path: 'AGENTS.md', text: agents },
  { path: 'LICENSE', text: license },
  { path: 'examples/cornichon/spell.yml', text: spellWorkflow },
]
