import { PAGES, type Page } from './content'

/**
 * Seeds.
 *
 * A seed is a body of knowledge with three things stated up front: who it is
 * for, what it assumes, and where it starts. That is the whole difference
 * between a seed and a folder — a folder is a pile, a seed is a pile with an
 * entrance and a claim about who can walk through it.
 *
 * Membership is derived from `seeds:` in page frontmatter, so a seed's contents
 * cannot drift from the pages that declare them. A page may belong to several
 * seeds: that is what "shared" means here, and it is why `starter` and
 * `agent-operations` overlap.
 */

export type Seed = {
  /** the slug of its page in /seeds, and the id used in frontmatter */
  id: string
  title: string
  /** who this is written for, in one line */
  audience: string
  /** what they must already know — "nothing" is a valid and useful answer */
  assumes: string
  /** three claims the seed makes good on */
  teaches: string[]
  /** the route a newcomer should open first */
  entry: string
}

export const SEEDS: Seed[] = [
  {
    id: 'twelve-factors',
    title: 'The twelve factors',
    audience: 'Someone who has never deployed software, and has to sound competent about it.',
    assumes: 'Nothing. Every term is defined on the first page.',
    teaches: [
      'what each of the twelve rules actually decides',
      'what the rule costs, and when to skip it',
      'why the right subset depends on the app and on who notices',
    ],
    entry: '/factors/start-here',
  },
  {
    id: 'agent-operations',
    title: 'Agent operations',
    audience: 'An LLM agent, or the person who points one at a repository.',
    assumes: 'Node 22, a shell, and the willingness to read a guard script.',
    teaches: [
      'where the machine entry is, and what it promises',
      'the build, smoke and guard loop, and what "done" means',
      'how to resolve an isotope shortcut and ask for its slots',
    ],
    entry: '/docs/for-agents',
  },
  {
    id: 'starter',
    title: 'The starter',
    audience: 'An engineer who needs a documentation site they can still run in two years.',
    assumes: 'Git and Node. No documentation tooling experience.',
    teaches: [
      'the file-is-the-route content model',
      'a navigation derived from the tree, so it cannot drift',
      'a publish guard as the gate, instead of a release checklist',
    ],
    entry: '/docs/quickstart',
  },
  {
    id: 'isotopes',
    title: 'Isotopes',
    audience: 'Anyone who keeps re-explaining a setup they only do occasionally.',
    assumes: 'You have written a runbook, or hated one.',
    teaches: [
      'the four tests that make a system an isotope',
      'why names beat numbers, and what a permanent name costs',
      'slots, compounds, and a QR code that expands into instructions',
    ],
    entry: '/isotopes/what-is-an-isotope',
  },
  {
    id: 'pitch',
    title: 'The commercial case',
    audience: 'The person who approves the time or the invoice.',
    assumes: 'You care about cost, risk and maintenance — not syntax.',
    teaches: [
      'what this stack costs to own, in money and in attention',
      'where it is the wrong answer, on the record',
      'what a publish guard is actually buying',
    ],
    entry: '/pitch/why-legume',
  },
  {
    id: 'voice',
    title: 'The voice',
    audience: 'Writers and editors working on technical material.',
    assumes: 'You write, and you have been edited.',
    teaches: [
      'cost-first prose: the trade, then the recommendation',
      'the difference between a claim and a receipt',
      'one house joke, told perfectly straight',
    ],
    entry: '/writing/the-hard-parts',
  },
]

export function getSeed(id: string): Seed | undefined {
  return SEEDS.find((seed) => seed.id === id)
}

/** Pages that declare this seed, in section order. */
export function seedMembers(id: string): Page[] {
  return PAGES.filter((page) => page.seeds.includes(id))
}

/** Seeds a page belongs to. */
export function seedsOf(page: Page): Seed[] {
  return page.seeds.map(getSeed).filter((seed): seed is Seed => !!seed)
}
