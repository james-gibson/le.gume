/**
 * Isotopes as compounds.
 *
 * An isotope is a named procedure with slots — the parameters an agent cannot
 * guess. A QR code can therefore carry a *shortcut*: the isotope's address plus
 * whatever slots are already bound. The agent fetches the page, reads its Agent
 * prompt, fills the blanks by asking, and never needs the long instruction in
 * the code.
 *
 * The shortcut format is deliberately boring and absolute, so a phone camera
 * opens it and an agent can fetch it without a resolver service:
 *
 *   https://james-gibson.github.io/le.gume/isotopes/02-cspell-in-ci/?every=weekly
 */

export type IsotopeSlot = {
  /** query-string key used in a shortcut */
  name: string
  /** the question the agent should ask when this slot is unbound */
  question: string
  example?: string
}

export type Isotope = {
  /** two digits, ordered, stable */
  id: string
  /** the page slug, which is also the URL segment */
  slug: string
  title: string
  summary: string
  slots: IsotopeSlot[]
}

export const SITE_ORIGIN = 'https://james-gibson.github.io/le.gume'

export const ISOTOPES: Isotope[] = [
  {
    id: '01',
    slug: '01-documentation-site',
    title: 'A documentation site that ships itself',
    summary: 'Content as files, a derived navigation, a publish guard, and a deploy on push.',
    slots: [],
  },
  {
    id: '02',
    slug: '02-cspell-in-ci',
    title: 'Spell-check a repository on a schedule',
    summary: 'A recurring GitHub Actions job that fails loudly on typos, with a project dictionary.',
    slots: [
      { name: 'repo', question: 'Which repository should the job run against?', example: 'acme/api' },
      { name: 'dict', question: 'Which dictionary should carry your domain words?', example: 'acme-terms' },
      { name: 'every', question: 'How often should it run?', example: 'weekly' },
    ],
  },
]

export function isotopeShortcut(
  isotope: Isotope,
  bound: Partial<Record<string, string>> = {},
): string {
  const params = new URLSearchParams()
  for (const slot of isotope.slots) params.set(slot.name, bound[slot.name] ?? '')
  const query = params.toString()
  return `${SITE_ORIGIN}/isotopes/${isotope.slug}/${query ? `?${query}` : ''}`
}

/** Slots the shortcut leaves for the agent to ask about. */
export function unboundSlots(
  isotope: Isotope,
  bound: Partial<Record<string, string>> = {},
): IsotopeSlot[] {
  return isotope.slots.filter((slot) => !bound[slot.name])
}
