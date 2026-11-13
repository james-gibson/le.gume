import type { Components } from 'react-markdown'
import { slugify } from './content'

/**
 * Markdown -> site. The site styles its own docs with the same tokens the
 * chrome uses, so a page cannot drift from the frame around it.
 */
export const markdownComponents: Components = {
  h2: ({ node: _node, children, ...props }) => (
    <h2
      id={slugify(String(children))}
      className="mt-12 mb-4 scroll-mt-28 text-2xl font-semibold tracking-tight text-cream"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ node: _node, children, ...props }) => (
    <h3
      id={slugify(String(children))}
      className="mt-8 mb-3 scroll-mt-28 text-lg font-semibold text-cream"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ node: _node, ...props }) => (
    <p className="my-4 leading-7 text-muted [&_strong]:font-semibold [&_strong]:text-cream" {...props} />
  ),
  a: ({ node: _node, href, ...props }) => {
    const external = !!href && (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//'))
    // Content links are written root-absolute ("/docs/quickstart") because that
    // is how an author thinks about the site. Production serves from /le.gume/,
    // so the mount has to be prefixed here or every internal link 404s.
    const to =
      !external && href?.startsWith('/')
        ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${href}`
        : href
    return (
      <a
        href={to}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        className="text-pulse underline decoration-pulse/35 underline-offset-4 transition-colors hover:decoration-pulse"
        {...props}
      />
    )
  },
  ul: ({ node: _node, ...props }) => <ul className="my-4 list-disc space-y-2 pl-6 text-muted marker:text-pulse-deep" {...props} />,
  ol: ({ node: _node, ...props }) => <ol className="my-4 list-decimal space-y-2 pl-6 text-muted marker:text-pulse-deep" {...props} />,
  li: ({ node: _node, ...props }) => <li className="leading-7 [&>p]:my-0" {...props} />,
  strong: ({ node: _node, ...props }) => <strong className="font-semibold text-cream" {...props} />,
  em: ({ node: _node, ...props }) => <em className="text-cream/90" {...props} />,
  hr: () => <hr className="my-10 border-line-soft" />,
  blockquote: ({ node: _node, ...props }) => (
    <blockquote
      className="my-6 rounded-r-xl border-l-2 border-pulse/70 bg-surface/70 py-1 pr-4 pl-5 text-muted italic [&_p]:my-3"
      {...props}
    />
  ),
  table: ({ node: _node, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: ({ node: _node, ...props }) => <thead className="bg-surface-2 text-cream" {...props} />,
  th: ({ node: _node, ...props }) => <th className="border-b border-line px-4 py-3 font-semibold" {...props} />,
  td: ({ node: _node, ...props }) => <td className="border-b border-line-soft px-4 py-3 align-top text-muted" {...props} />,
  code: ({ node: _node, className, children, ...props }) => {
    const isBlock = typeof className === 'string' && className.includes('language-')
    if (isBlock) {
      return (
        <code className="font-mono text-[13px] leading-6 text-cream/90" {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-pulse" {...props}>
        {children}
      </code>
    )
  },
  pre: ({ node: _node, ...props }) => (
    <pre
      className="my-5 overflow-x-auto rounded-xl border border-line bg-[#0d0b0d] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
      {...props}
    />
  ),
  img: ({ node: _node, alt, ...props }) => (
    <img alt={alt ?? ''} loading="lazy" className="my-6 rounded-xl border border-line" {...props} />
  ),
}
