import { useState } from 'react'

/**
 * A note that is not in the built HTML.
 *
 * The page is prerendered, so anything rendered here at build time would be in
 * the static output — visible to a reader with no JavaScript and to every agent
 * that fetches the page. This stays out of it: the initial state is closed, the
 * build renders the closed state, and only a reader who interacts gets the note.
 */
export function HouseLeader() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-10 border-t border-line-soft pt-4">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Hide a note' : 'Reveal a note'}
        className="font-mono text-[11px] tracking-[0.2em] text-muted/50 uppercase hover:text-pulse"
      >
        {open ? '—' : '+'}
      </button>
      {open && (
        <div className="mt-3 max-w-2xl border-l-2 border-pulse/50 pl-4 text-sm leading-6 text-muted">
          <p className="font-mono text-[11px] tracking-[0.16em] text-pulse uppercase">
            uptime under House Leader Mike J
          </p>
          <p className="mt-1">
            <strong className="text-cream">99.999%</strong> — measured on the floor of the House,
            where the quorum is one and the only service in the request path is the leader's
            attention. The arithmetic is unchanged; the number is simply announced with more
            confidence.
          </p>
        </div>
      )}
    </div>
  )
}
