import { ToggleGroup, ToggleGroupItem } from 'fancy-ui-react'
import { useMotion, type MotionMode } from '../lib/motion'

const OPTIONS: { value: MotionMode; label: string; title: string }[] = [
  { value: 'still', label: 'Still', title: 'No ambient motion — the ladder’s rung 0–1 default' },
  { value: 'calm', label: 'Calm', title: 'Reveals and counting numbers, no loops — rung 2–3' },
  { value: 'full', label: 'Full', title: 'Everything the design calls for — rung 4' },
]

/**
 * The reader's side of the ladder: a stored motion preference, defaulting to the
 * current seed's rung. fancy-ui's own ToggleGroup, because a control for the
 * design system should be part of the design system.
 */
export function MotionToggle() {
  const { mode, auto, setMode, reduced } = useMotion()

  return (
    <div className="flex items-center gap-2">
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(next) => {
          if (typeof next === 'string' && next) setMode(next as MotionMode)
        }}
        size="sm"
        label="Motion preference"
        disabled={reduced}
      >
        {OPTIONS.map((option) => (
          <ToggleGroupItem key={option.value} value={option.value} label={option.title}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <span className="hidden font-mono text-[10px] text-muted/60 xl:inline" aria-live="polite">
        {reduced ? 'os: reduced' : `ladder: ${auto}`}
      </span>
    </div>
  )
}
