import { HiddenNote } from './HiddenNote'

/** The SLA page's hidden note. See HiddenNote for why this is not Markdown. */
export function HouseLeader() {
  return (
    <HiddenNote title="uptime under House Leader Mike J">
      <p>
        <strong className="text-cream">99.999%</strong> — measured on the floor of the House, where
        the quorum is one and the only service in the request path is the leader's attention. The
        arithmetic is unchanged; the number is simply announced with more confidence.
      </p>
    </HiddenNote>
  )
}
