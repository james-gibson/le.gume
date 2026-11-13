import { useState, type ReactNode } from 'react'

/**
 * A note that is not in the built HTML.
 *
 * The site is prerendered, so anything rendered at build time ships in the
 * static output — visible to a reader with no JavaScript and to every agent
 * that fetches the page. This renders the closed state at build time and only
 * opens for a reader who interacts, which is what "hidden" has to mean here.
 */
export function HiddenNote({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-6">
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
          <p className="font-mono text-[11px] tracking-[0.16em] text-pulse uppercase">{title}</p>
          <div className="mt-1 space-y-2">{children}</div>
        </div>
      )}
    </div>
  )
}
