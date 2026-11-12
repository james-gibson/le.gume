import { CopyButton } from 'fancy-ui-react'
import { QRCodeSVG } from 'qrcode.react'

/**
 * The handoff.
 *
 * A QR code whose payload is an instruction for an agent — not a link to the
 * home page. Scanning it gives a phone (or a reader) the machine entry plus the
 * three commands that verify the site, so the agent starts from the contract
 * instead of crawling.
 *
 * Reusable by design: pass `instructions` for any handoff (a page, a repository,
 * a runbook). The payload is also printed beside the code, because a QR is not
 * accessible on its own and a desktop reader cannot scan its own screen.
 */
export function AgentHandoff({
  instructions,
  title = 'Hand this site to an agent',
  note = 'The code carries the same instructions printed beside it: where the contract lives, and the three commands that prove the site still works.',
  size = 220,
  id,
}: {
  instructions: string
  title?: string
  note?: string
  size?: number
  id?: string
}) {
  return (
    <section
      id={id}
      className="overflow-hidden rounded-2xl border border-line bg-surface"
      aria-labelledby={`${id ?? 'handoff'}-title`}
    >
      <div className="grid gap-0 sm:grid-cols-[auto_1fr]">
        <div className="flex items-center justify-center border-b border-line-soft bg-[#f4f1e8] p-6 sm:border-r sm:border-b-0">
          {/* Decorative duplicate: the same text is visible on the right. */}
          <div aria-hidden="true">
            <QRCodeSVG
              value={instructions}
              size={size}
              level="M"
              marginSize={2}
              bgColor="#f4f1e8"
              fgColor="#0a0b09"
              title="Instructions for an agent"
            />
          </div>
        </div>

        <div className="p-6">
          <p className="text-xs tracking-[0.16em] text-pulse uppercase">Take it with you</p>
          <h2 id={`${id ?? 'handoff'}-title`} className="mt-2 text-xl font-semibold text-cream">
            {title}
          </h2>
          <p className="mt-2 max-w-prose text-sm leading-6 text-muted">{note}</p>

          <div className="mt-4 flex items-start gap-3">
            <pre className="min-w-0 flex-1 overflow-x-auto rounded-xl border border-line-soft bg-[#0c0e0a] p-3 font-mono text-[12px] leading-6 break-words whitespace-pre-wrap text-cream/85">
              {instructions}
            </pre>
            <CopyButton value={instructions} label="Copy" copiedLabel="Copied" size="sm" />
          </div>

          <p className="mt-3 text-xs text-muted/70">
            Scan with a phone camera, or copy the text into whichever agent you already have open.
          </p>
        </div>
      </div>
    </section>
  )
}

/** The canonical handoff for this site. Kept short: a denser payload is a denser code. */
export const SITE_HANDOFF =
  'Read https://james-gibson.github.io/le.gume/llms.txt then npm ci && npm run build. Repo: https://github.com/james-gibson/le.gume'
