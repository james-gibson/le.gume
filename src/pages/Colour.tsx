import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'
import { contrast, grade } from '../lib/contrast'
import palette from '../lib/palette.json'

const { tokens, pairs } = palette as {
  tokens: { name: string; hex: string; role: string }[]
  pairs: { fg: string; bg: string; min: number; note: string }[]
}

const byName = new Map(tokens.map((token) => [token.name, token]))
const hexOf = (name: string) => byName.get(name)?.hex ?? '#000000'

const gradeClass: Record<string, string> = {
  AAA: 'text-violet',
  AA: 'text-cream',
  'AA large': 'text-muted',
  fail: 'text-pulse',
}

/**
 * The colour page: every shade against every other, and the gradients the site
 * actually paints. The point is to see a pair before it reaches a contrast
 * audit, so a palette change is a decision with numbers attached rather than a
 * surprise in a Lighthouse run.
 */
export function Colour() {
  usePageMeta(
    'Colour',
    'Every shade against every other, with the contrast ratio and grade, plus the gradients the site paints.',
  )

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs tracking-[0.18em] text-pulse uppercase">Colour</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        Every shade, one page.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        The palette as a matrix: each foreground against each background, the ratio computed with the
        WCAG formula, and the grade it would earn. The build refuses a declared pair below its
        minimum, so a shade that fights the contrast tests is caught here rather than in an audit.
      </p>

      <section className="mt-12">
        <h2 className="text-xs tracking-[0.18em] text-muted uppercase">The tokens</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {tokens.map((token) => (
            <li key={token.name} className="rounded-xl border border-line bg-surface p-3">
              <span
                className="block h-12 w-full rounded-lg border border-line-soft"
                style={{ backgroundColor: token.hex }}
              />
              <p className="mt-2 font-mono text-xs text-cream">{token.name}</p>
              <p className="font-mono text-[11px] text-muted">{token.hex}</p>
              <p className="mt-1 text-[11px] leading-4 text-muted/80">{token.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xs tracking-[0.18em] text-muted uppercase">Foreground against background</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs">
            <thead>
              <tr className="bg-surface">
                <th scope="col" className="px-3 py-2 font-mono text-[11px] text-muted">
                  text ↓ / ground →
                </th>
                {tokens.map((token) => (
                  <th
                    key={token.name}
                    scope="col"
                    className="px-2 py-2 font-mono text-[10px] font-normal text-muted"
                  >
                    {token.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tokens.map((fg) => (
                <tr key={fg.name} className="border-t border-line-soft">
                  <th scope="row" className="px-3 py-1.5 font-mono text-[11px] font-normal text-cream">
                    {fg.name}
                  </th>
                  {tokens.map((bg) => {
                    const ratio = contrast(fg.hex, bg.hex)
                    const mark = grade(ratio)
                    return (
                      <td
                        key={bg.name}
                        className="px-2 py-1.5 font-mono text-[11px]"
                        style={{ backgroundColor: bg.hex }}
                      >
                        <span className={gradeClass[mark]} title={`${fg.name} on ${bg.name}`}>
                          {ratio.toFixed(1)}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted/70">
          Grade is from the ratio: 7.0+ AAA, 4.5+ AA, 3.0+ AA for large text only, below that a
          failure. The colour of the number is the grade, not the text colour being measured.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xs tracking-[0.18em] text-muted uppercase">Declared pairs</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          These are the combinations the site actually paints, each with the minimum it must clear.
          <code className="mx-1 rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-pulse">
            npm run contrast
          </code>
          fails the build when one drops below its floor.
        </p>
        <ul className="mt-4 divide-y divide-line-soft rounded-xl border border-line bg-surface">
          {pairs.map((pair) => {
            const ratio = contrast(hexOf(pair.fg), hexOf(pair.bg))
            const mark = grade(ratio)
            const passes = ratio >= pair.min
            return (
              <li
                key={`${pair.fg}-${pair.bg}`}
                className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 text-sm"
              >
                <span className="font-mono text-xs text-cream">
                  {pair.fg} on {pair.bg}
                </span>
                <span className="font-mono text-xs text-muted">{ratio.toFixed(1)}:1</span>
                <span className="font-mono text-[11px] text-muted/70">min {pair.min}</span>
                <span className={`font-mono text-[11px] ${passes ? 'text-violet' : 'text-pulse'}`}>
                  {passes ? mark : 'BELOW FLOOR'}
                </span>
                <span className="ml-auto text-xs text-muted/70">{pair.note}</span>
              </li>
            )
          })}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xs tracking-[0.18em] text-muted uppercase">Gradients</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          A gradient has no single ratio. The number below is the worse of its two stops, which is the
          one an audit will find first.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: 'accent sweep',
              style: { backgroundImage: 'linear-gradient(90deg, #ff2d95, #ffc2dd)' },
              fg: '#0b0a0b',
              stops: ['#ff2d95', '#ffc2dd'],
            },
            {
              label: 'code block',
              style: { backgroundColor: '#0c0a0c' },
              fg: '#d9d3c6',
              stops: ['#0c0a0c', '#0c0a0c'],
            },
            {
              label: 'surface wash',
              style: { backgroundImage: 'linear-gradient(180deg, #121013, #191619)' },
              fg: '#d9d3c6',
              stops: ['#121013', '#191619'],
            },
          ].map((sample) => {
            const worst = Math.min(...sample.stops.map((stop) => contrast(sample.fg, stop)))
            const mark = grade(worst)
            return (
              <div key={sample.label} className="overflow-hidden rounded-xl border border-line">
                <div className="flex h-24 items-center justify-center p-3" style={sample.style}>
                  <span className="font-mono text-xs" style={{ color: sample.fg }}>
                    {sample.label}
                  </span>
                </div>
                <p className="bg-surface px-3 py-2 font-mono text-[11px] text-muted">
                  worst {worst.toFixed(1)}:1 · <span className={gradeClass[mark]}>{mark}</span>
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <p className="mt-12 text-sm text-muted">
        The components and their props are on <Link className="text-pulse underline decoration-pulse/30 underline-offset-4" to="/design">/design</Link>;
        the decision behind this palette is <a className="text-pulse underline decoration-pulse/30 underline-offset-4" href="/docs/palette">Ivory, dimmed</a>.
      </p>
    </div>
  )
}
