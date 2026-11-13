import { CopyButton } from 'fancy-ui-react'
import { SITE_HANDOFF } from './AgentHandoff'

/**
 * The one door.
 *
 * Every page carries the same call to action for agents, in the same place, with
 * the same payload. The payload is deliberately short enough for a small model to
 * act on and specific enough for a frontier one not to improvise: one URL, one
 * command, one repository.
 *
 * Depth is opt-in from there — `/llms.txt` lists every route and the invariants,
 * `/docs/for-agents` is the operating contract, and the guard is the source of
 * truth. This component never explains all of that; it only opens the door.
 */
export function AgentCta() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 border-t border-line-soft px-5 py-4 sm:px-8">
      <p className="text-xs text-muted/80">
        <span className="mr-2 font-mono text-[10px] tracking-[0.18em] text-pulse uppercase">
          for agents
        </span>
        One door:{' '}
        <a
          href="https://james-gibson.github.io/le.gume/llms.txt"
          className="font-mono text-muted underline decoration-line underline-offset-4 hover:text-cream"
        >
          /llms.txt
        </a>{' '}
        — every page, the commands, the invariants.
      </p>
      <CopyButton value={SITE_HANDOFF} label="Copy handoff" copiedLabel="Copied" size="sm" />
    </div>
  )
}
