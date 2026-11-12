import { PAGES, type Page } from './content'

/**
 * Seeds, on a scale.
 *
 * A seed is a body of knowledge with three things stated up front: who it is
 * for, what it assumes, and where it starts. The scale adds the fourth: **how
 * much of the machine the audience is willing to touch**.
 *
 *     rung 0  Decide      reads cost and risk, will not open a terminal
 *     rung 1  Understand  reads concepts, still will not deploy anything
 *     rung 2  Learn       runs it locally, breaks it on purpose
 *     rung 3  Operate     delegates the running, wants it repeatable
 *     rung 4  Package     designs systems other people will operate
 *
 * Rungs are about readiness, not seniority: a buyer at rung 0 is not a beginner,
 * and a beginner at rung 1 is not buying anything. The order matters because an
 * audience that does not want to deploy software must never be handed a page
 * that assumes a terminal — so it sits *below* the wanting-to-learn rung.
 *
 * `lateral` seeds are about register rather than readiness; they sit alongside
 * every rung instead of on it.
 *
 * Membership is derived from `seeds:` in page frontmatter, so a seed's contents
 * cannot drift from the pages that declare them. A page may belong to several
 * seeds: that is what "shared" means here.
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
  /** position on the readiness scale; absent for lateral seeds */
  rung?: number
  /** what this audience does with the machine */
  touches: string
  /** register, not readiness — sits alongside every rung */
  lateral?: boolean
}

export const SCALE = [
  { label: 'Decide', touches: 'reads cost and risk; will not open a terminal' },
  { label: 'Understand', touches: 'reads concepts; will not deploy anything' },
  { label: 'Learn', touches: 'runs it locally and breaks it on purpose' },
  { label: 'Operate', touches: 'delegates the running; wants it repeatable' },
  { label: 'Package', touches: 'designs systems other people will operate' },
] as const

export const SEEDS: Seed[] = [
  {
    id: 'pitch',
    title: 'The commercial case',
    audience: 'The person who approves the time or the invoice.',
    assumes: 'You care about cost, risk and maintenance — not syntax.',
    teaches: [
      'what a documentation site costs to own, in money and in attention',
      'what keeping the promise true is worth, and who notices when it stops',
      'when the cost centre changes, and what recertification looks like',
    ],
    entry: '/pitch/why-legume',
    rung: 0,
    touches: 'reads cost and risk; will not open a terminal',
  },
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
    rung: 1,
    touches: 'reads concepts; will not deploy anything',
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
    rung: 2,
    touches: 'runs it locally and breaks it on purpose',
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
    rung: 3,
    touches: 'delegates the running; wants it repeatable',
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
    rung: 4,
    touches: 'designs systems other people will operate',
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
    touches: 'writes for any of the rungs above',
    lateral: true,
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

/** Seeds that sit alongside every rung rather than on one. */
export function lateralSeeds(): Seed[] {
  return SEEDS.filter((seed) => seed.lateral)
}

/** The rungs, with the seeds that sit on each. */
export function scale(): { level: number; label: string; touches: string; seeds: Seed[] }[] {
  return SCALE.map((step, level) => ({
    level,
    ...step,
    seeds: SEEDS.filter((seed) => seed.rung === level),
  }))
}
