import type { ReactNode } from 'react'
import {
  BentoGrid,
  BentoGridCard,
  BorderBeam,
  CopyButton,
  GradientButton,
  Marquee,
  NumberTicker,
  RainbowButton,
  Reveal,
} from 'fancy-ui-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

function Sample({
  title,
  library,
  props,
  note,
  children,
}: {
  title: string
  library: string
  props: string
  note: ReactNode
  children: ReactNode
}) {
  return (
    <section className="border-t border-line-soft py-10">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-cream">{title}</h2>
        <p className="font-mono text-xs text-muted/70">{library}</p>
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{note}</p>
      <p className="mt-3 font-mono text-xs text-pulse/80">{props}</p>
      <div className="mt-6 rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">{children}</div>
    </section>
  )
}

export function Design() {
  usePageMeta(
    'Design',
    'The live design system: every component this site ships, shown with the props it actually uses.',
  )

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs tracking-[0.18em] text-pulse uppercase">Design</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        The design system is this page.
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
        Nothing below is a screenshot. Each sample is the same import the rest of the site uses,
        with the same props, rendered by the same bundle. If a sample stops working, the site is
        wrong — which is the point of keeping the documentation and the demo in one file tree.
      </p>
      <p className="mt-3 max-w-2xl text-sm text-muted/80">
        Motion is provided by{' '}
        <a
          href="https://fancy-ui.rama.app"
          target="_blank"
          rel="noreferrer noopener"
          className="text-pulse underline decoration-pulse/30 underline-offset-4"
        >
          fancy-ui
        </a>
        . Components are used as shipped:{' '}
        <code className="rounded border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-pulse">
          className
        </code>{' '}
        only appears where the component's props table declares it.
      </p>

      <div className="mt-12">
        <h2 className="text-xs tracking-[0.18em] text-muted uppercase">Palette</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['ink', '#0a0b09'],
            ['surface', '#11130f'],
            ['line', '#272b22'],
            ['cream', '#f2efe4'],
            ['muted', '#a7aa9d'],
            ['pulse', '#b6f24a'],
            ['violet', '#a78bfa'],
          ].map(([name, hex]) => (
            <li key={name} className="rounded-xl border border-line bg-surface p-3">
              <span
                className="block h-10 w-full rounded-lg border border-line-soft"
                style={{ backgroundColor: hex }}
              />
              <span className="mt-2 block font-mono text-xs text-cream">{name}</span>
              <span className="block font-mono text-[11px] text-muted/70">{hex}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-14">
        <Sample
          title="BorderBeam"
          library="fancy-ui-react · effects"
          props="colorFrom · colorTo · duration · size · glow"
          note={
            <>
              A comet that rides the border of a card. It fills its nearest positioned parent, so
              the parent is <code className="font-mono text-pulse">relative overflow-hidden</code>{' '}
              — the same contract the hero card uses.
            </>
          }
        >
          <div className="relative max-w-md overflow-hidden rounded-xl border border-line bg-[#0c0e0a] p-6">
            <BorderBeam colorFrom="#b6f24a" colorTo="#a78bfa" duration={9} size={180} glow={0.55} />
            <p className="text-sm font-medium text-cream">Deploy in progress</p>
            <p className="mt-1 text-xs text-muted">main · build 1482 · 41s</p>
          </div>
        </Sample>

        <Sample
          title="RainbowButton"
          library="fancy-ui-react · buttons"
          props="href · speed"
          note={
            <>
              The primary call to action. Here <code className="font-mono text-pulse">href</code>{' '}
              renders an anchor, which is why every section link on this site survives a hard
              reload.
            </>
          }
        >
          <div className="flex flex-wrap items-center gap-4">
            <RainbowButton href="https://fancy-ui.rama.app/docs" speed={2}>
              Read the library docs
            </RainbowButton>
            <RainbowButton href="https://fancy-ui.rama.app/docs" speed={2} disabled>
              Disabled
            </RainbowButton>
          </div>
        </Sample>

        <Sample
          title="GradientButton"
          library="fancy-ui-react · buttons"
          props="colors · duration · borderRadius · blur · bgColor"
          note={
            <>
              The secondary action: a dark face with a beam travelling its border. It takes no{' '}
              <code className="font-mono text-pulse">className</code>, so any spacing belongs to
              the wrapper, not the button.
            </>
          }
        >
          <GradientButton
            colors={['#b6f24a', '#a78bfa', '#f2efe4']}
            duration={3400}
            borderRadius={12}
            blur={5}
          >
            Ship it
          </GradientButton>
        </Sample>

        <Sample
          title="CopyButton"
          library="fancy-ui-react · actions"
          props="value · label · copiedLabel · size"
          note={
            <>
              Used for every command on the site. It writes to the clipboard and then says so —
              no toast, no state to wire up at the call site.
            </>
          }
        >
          <div className="flex flex-wrap items-center gap-4">
            <CopyButton value="npm run build" label="Copy build" size="sm" />
            <CopyButton value="npm run guard" label="Copy guard" size="sm" />
          </div>
        </Sample>

        <Sample
          title="NumberTicker"
          library="fancy-ui-react · text"
          props="value · duration"
          note={
            <>
              Counts up when a stat scrolls into view. The homepage uses it for three real
              numbers, not decoration.
            </>
          }
        >
          <div className="flex flex-wrap gap-10">
            <p className="font-mono text-3xl text-cream">
              <NumberTicker value={156} duration={1200} />
              <span className="ml-2 text-sm text-muted">components in the library</span>
            </p>
          </div>
        </Sample>

        <Sample
          title="Marquee"
          library="fancy-ui-react · layout"
          props="repeat · speed · fade · pauseOnHover"
          note={
            <>
              The band between sections. It pauses on hover and focus, which is the difference
              between a flourish and a distraction.
            </>
          }
        >
          <Marquee repeat={3} speed={0.7} fade pauseOnHover>
            {['documented', 'guarded', 'deployed', 'readable'].map((word) => (
              <span key={word} className="mx-6 text-xs tracking-[0.24em] text-muted/70 uppercase">
                {word}
              </span>
            ))}
          </Marquee>
        </Sample>

        <Sample
          title="BentoGrid"
          library="fancy-ui-react · cards"
          props="accent · className"
          note={
            <>
              The section grid on the homepage. Tiles fade up on first scroll, and the accent
              colour drives the hover glow, the lit edge and the icon ring.
            </>
          }
        >
          <BentoGrid accent="#a78bfa" className="w-full">
            <BentoGridCard
              name="One accent"
              description="A single colour token keeps the grid quiet at rest."
              href="https://fancy-ui.rama.app/docs/components/bento-grid"
              cta="Docs"
              icon={<span className="font-mono text-xs text-violet">01</span>}
            />
            <BentoGridCard
              name="Two states"
              description="Hover lifts the tile; focus keeps it reachable by keyboard."
              href="https://fancy-ui.rama.app/docs/components/bento-grid"
              cta="Docs"
              icon={<span className="font-mono text-xs text-violet">02</span>}
            />
          </BentoGrid>
        </Sample>

        <Sample
          title="Reveal"
          library="fancy-ui-react · effects"
          props="preset · delay · duration · once"
          note={
            <>
              Every section on the homepage enters this way. It respects reduced motion, so the
              page stays still for readers who ask for still.
            </>
          }
        >
          <Reveal preset="fade-up" delay={120} className="rounded-xl border border-line bg-surface p-5">
            <p className="text-sm text-muted">
              This block faded up once, when it entered the viewport, and will not animate again.
            </p>
          </Reveal>
        </Sample>
      </div>

      <div className="mt-14 rounded-2xl border border-line bg-surface p-6">
        <p className="text-sm text-muted">
          Want the same page in your project? The install is one dependency and two CSS imports —
          see{' '}
          <Link to="/docs/quickstart" className="text-pulse underline decoration-pulse/30 underline-offset-4">
            the quickstart
          </Link>
          . Want to change this page? It lives at{' '}
          <code className="font-mono text-xs text-pulse">src/pages/Design.tsx</code>.
        </p>
      </div>
    </div>
  )
}
