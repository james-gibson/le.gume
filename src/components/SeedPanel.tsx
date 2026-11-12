import { Link } from 'react-router-dom'
import { AgentHandoff } from './AgentHandoff'
import { SITE_ORIGIN } from '../lib/isotopes'
import { getSeed, seedMembers } from '../lib/seeds'
import { sectionMeta } from '../lib/content'

/**
 * The seed's front door: who it is for, what it assumes, and what is inside.
 * Rendered on a seed page from the registry plus frontmatter membership, so the
 * shelf cannot claim pages that do not declare it.
 */
export function SeedPanel({ seedId }: { seedId: string }) {
  const seed = getSeed(seedId)
  if (!seed) return null

  const members = seedMembers(seed.id)
  const entryUrl = `${SITE_ORIGIN}${seed.entry}`

  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-4 rounded-2xl border border-line bg-surface p-5 sm:grid-cols-3">
        <div>
          <p className="text-xs tracking-[0.14em] text-muted uppercase">Audience</p>
          <p className="mt-1 text-sm leading-6 text-cream">{seed.audience}</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.14em] text-muted uppercase">Assumes</p>
          <p className="mt-1 text-sm leading-6 text-cream">{seed.assumes}</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.14em] text-muted uppercase">Entrance</p>
          <Link
            to={seed.entry}
            className="mt-1 block font-mono text-sm text-pulse underline decoration-pulse/30 underline-offset-4 hover:decoration-pulse"
          >
            {seed.entry}
          </Link>
        </div>
      </div>

      <div>
        <p className="text-xs tracking-[0.14em] text-muted uppercase">
          What it teaches
        </p>
        <ul className="mt-2 space-y-1 text-sm text-muted">
          {seed.teaches.map((claim) => (
            <li key={claim} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pulse" />
              {claim}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs tracking-[0.14em] text-muted uppercase">
          What is inside — {members.length} {members.length === 1 ? 'page' : 'pages'}
        </p>
        <ul className="mt-2 divide-y divide-line-soft rounded-xl border border-line">
          {members.map((page) => (
            <li key={page.path}>
              <Link
                to={`/${page.section}/${page.slug}`}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-4 py-2.5 transition-colors hover:bg-surface-2"
              >
                <span className="font-mono text-[11px] text-muted/60">
                  {sectionMeta(page.section).label}
                </span>
                <span className="text-sm text-cream">{page.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <AgentHandoff
        id={`seed-${seed.id}`}
        instructions={entryUrl}
        title={`Share this seed`}
        note="One code for the entrance, not the whole shelf: whoever scans it lands at the start of the seed, with the audience and the assumptions in front of them."
        size={180}
      />
    </div>
  )
}
