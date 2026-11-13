#!/usr/bin/env node
/**
 * The palette gate.
 *
 * `src/lib/palette.json` declares the pairs the site actually paints and the
 * minimum each must clear. The colour page renders the same numbers, so the
 * page and the build cannot disagree about what passes.
 */
import { readFileSync } from 'node:fs'

const channel = (value) => {
  const v = value / 255
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
}

const luminance = (hex) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return (
    0.2126 * channel((n >> 16) & 255) +
    0.7152 * channel((n >> 8) & 255) +
    0.0722 * channel(n & 255)
  )
}

const contrast = (a, b) => {
  const la = luminance(a)
  const lb = luminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

const palette = JSON.parse(readFileSync('src/lib/palette.json', 'utf8'))
const tokens = new Map(palette.tokens.map((token) => [token.name, token.hex]))

let failures = 0
let worst = { ratio: Infinity }

for (const pair of palette.pairs) {
  const fg = tokens.get(pair.fg)
  const bg = tokens.get(pair.bg)
  if (!fg || !bg) {
    console.error(`contrast: ${pair.fg} on ${pair.bg} names an unknown token`)
    failures += 1
    continue
  }
  const ratio = contrast(fg, bg)
  if (ratio < worst.ratio) worst = { ratio, label: `${pair.fg} on ${pair.bg}` }
  if (ratio < pair.min) {
    failures += 1
    console.error(
      `contrast: ${pair.fg} on ${pair.bg} is ${ratio.toFixed(2)}:1, below its floor of ${pair.min}`,
    )
  }
}

if (failures) {
  console.error(`\ncontrast: ${failures} declared pair(s) below the floor`)
  process.exit(1)
}

console.log(
  `contrast: ${palette.pairs.length} declared pairs pass · tightest ${worst.ratio.toFixed(2)}:1 (${worst.label})`,
)
