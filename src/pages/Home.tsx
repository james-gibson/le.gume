import { Link, useNavigate } from 'react-router-dom'
import {
  BentoGrid,
  BentoGridCard,
  Button,
  CopyButton,
  GradientButton,
  Marquee,
  RainbowButton,
} from 'fancy-ui-react'
import { PAGES, SECTIONS, pagesIn } from '../lib/content'
import { MotionBeam, MotionReveal, MotionTicker, useMotion } from '../lib/motion'
import { usePageMeta } from '../lib/usePageMeta'

const base = import.meta.env.BASE_URL
const INSTALL = 'git clone https://github.com/james-gibson/le.gume my-site\ncd my-site && npm install && npm run dev'

export function Home() {
  usePageMeta(undefined, 'A documentation site that documents itself: content model, routing, deploy and design system in one small stack.')
  const navigate = useNavigate()
  const { mode } = useMotion()
  const still = mode === 'still'
  const full = mode === 'full'

  const facts = [
    { k: 'Pages', v: PAGES.length },
    { k: 'Sections', v: SECTIONS.length },
    { k: 'Dependencies', v: 7 },
  ]

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="plot-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <MotionReveal preset="fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs tracking-wide text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-pulse" />
                v0.1 · the hard parts, already handled
              </p>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={60}>
              <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-cream sm:text-6xl">
                Difficult things,
                <br />
                made <span className="text-pulse">uneventful</span>.
              </h1>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={120}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
                A documentation site for a stack that refuses to make you learn it first.
                Routing, content, motion, deploy and the publish guard — visible, small, and
                documented by the pages you are reading.
              </p>
            </MotionReveal>

            <MotionReveal preset="fade-up" delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                {full ? (
                  <>
                    <RainbowButton href={`${base}docs/quickstart`}>
                      Go<span className="sr-only"> — read the quickstart</span>
                    </RainbowButton>
                    <GradientButton onClick={() => navigate('/pitch/why-legume')}>
                      The commercial case
                    </GradientButton>
                  </>
                ) : (
                  <>
                    <Button href={`${base}docs/quickstart`} variant="primary">
                      Go<span className="sr-only"> — read the quickstart</span>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/pitch/why-legume')}>
                      The commercial case
                    </Button>
                  </>
                )}
              </div>
            </MotionReveal>

            <p className="mt-6 text-xs text-muted/70">
              No CLI to install, no plugin order to memorise, no theme file to reconcile.
            </p>
          </div>

          <MotionReveal preset="fade-up" delay={140}>
            <div className="relative overflow-hidden rounded-2xl border border-line bg-surface/90 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
              <MotionBeam colorFrom="#b6f24a" colorTo="#a78bfa" duration={11} size={220} glow={0.5} />
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs tracking-[0.16em] text-muted uppercase">Start a site</p>
                <CopyButton value={INSTALL} label="Copy" copiedLabel="Copied" size="sm" />
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-line-soft bg-[#0c0e0a] p-4 font-mono text-[13px] leading-6 text-cream/90">
                <code>{INSTALL}</code>
              </pre>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pulse" />
                  One source of truth for navigation: the file tree.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pulse" />
                  A publish guard that fails the build, loudly.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                  Motion that stops for reduced-motion readers.
                </li>
              </ul>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="border-b border-line/70 bg-surface/30">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-3 gap-6 px-5 py-10 sm:px-8">
          {facts.map((fact) => (
            <div key={fact.k}>
              <p className="font-mono text-3xl font-semibold text-cream sm:text-4xl">
                <MotionTicker value={fact.v} />
              </p>
              <p className="mt-1 text-xs tracking-[0.14em] text-muted uppercase">{fact.k}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
              Every section, one contract
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Each section is a folder. Each page is a file. The navigation builds itself from
              both, which is why nothing here can drift out of date quietly.
            </p>
          </div>
          <Link
            to="/docs/content-model"
            className="text-sm text-pulse underline decoration-pulse/30 underline-offset-4 hover:decoration-pulse"
          >
            Read the content model
          </Link>
        </div>

        <MotionReveal preset="fade-up" className="mt-8">
          <BentoGrid accent="#b6f24a" className="w-full" reveal={!still}>
            {SECTIONS.map((section) => (
              <BentoGridCard
                key={section.id}
                name={section.label}
                description={section.blurb}
                href={`${base}${section.id}`}
                cta={`${pagesIn(section.id).length} pages`}
                icon={<span className="font-mono text-xs text-pulse">{section.id}</span>}
              />
            ))}
          </BentoGrid>
        </MotionReveal>
      </section>

      <section className="overflow-hidden border-y border-line/70 bg-surface/40 py-6">
        {still ? (
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {['project seeds', 'nuts and bolts', 'peas in a pod', 'the guide spills the beans'].map((phrase) => (
              <span key={phrase} className="text-xs tracking-[0.24em] text-muted/70 uppercase">
                {phrase}
              </span>
            ))}
          </div>
        ) : (
          <Marquee repeat={3} speed={0.8} fade pauseOnHover>
            {['project seeds', 'nuts and bolts', 'peas in a pod', 'the guide spills the beans'].map((phrase) => (
              <span key={phrase} className="mx-7 text-xs tracking-[0.24em] text-muted/70 uppercase">
                {phrase}
              </span>
            ))}
          </Marquee>
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="text-xs tracking-[0.16em] text-pulse uppercase">Self-documenting</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-cream">
              The design system is a page, not a PDF
            </h2>
            <p className="mt-3 text-muted">
              Every component this site ships is on{' '}
              <Link to="/design" className="text-pulse underline decoration-pulse/30 underline-offset-4">
                the design page
              </Link>{' '}
              — live, with the props that were actually used. If a sample breaks, the site is
              broken, and the build says so before a reader ever sees it.
            </p>
            <p className="mt-4 text-sm text-muted/80">
              The motion comes from fancy-ui: border beams, reveal-on-scroll, a number ticker, a
              marquee. Whimsy in service of a serious point — the site is the demo.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-7">
            <p className="text-xs tracking-[0.16em] text-violet uppercase">Read the site to learn the site</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-cream">
              Every route has an explanation
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <Link to="/docs/site-anatomy" className="text-cream hover:text-pulse">
                  Site anatomy
                </Link>{' '}
                — the file map behind this page.
              </li>
              <li>
                <Link to="/docs/deploy" className="text-cream hover:text-pulse">
                  Deploy
                </Link>{' '}
                — the Pages workflow and the guard that gates it.
              </li>
              <li>
                <Link to="/guides/adding-a-page" className="text-cream hover:text-pulse">
                  Adding a page
                </Link>{' '}
                — the four-minute version.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
