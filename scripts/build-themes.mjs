/* ----------------------------------------------------------------------------
 * Theme builder — maps each palette in src/themes.json onto the Facet token
 * contract and emits src/styles/themes.css. Run with: npm run build:themes
 *
 * The point of this script is the architecture it demonstrates: themes are
 * *data*, not hand-written CSS. A 16-colour terminal-style palette is enough
 * to drive the whole component library, because every component reads tokens.
 * -------------------------------------------------------------------------- */
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('..', import.meta.url)
const themes = JSON.parse(readFileSync(new URL('src/themes.json', root), 'utf8'))

// Parse #rgb or #rrggbb (with or without leading #) → [r, g, b] or null.
const parseHex = (hex) => {
  const s = String(hex || '').replace(/^#/, '')
  const full = s.length === 3 ? s.replace(/(.)/g, '$1$1') : s
  const m = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(full)
  return m ? [1, 2, 3].map((i) => parseInt(m[i], 16)) : null
}

const toHex = ([r, g, b]) =>
  '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')

const rgba = (hex, a) => {
  const c = parseHex(hex)
  return c ? `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})` : `rgba(127, 127, 127, ${a})`
}

// f < 1 darkens, f > 1 lightens — used to add depth to header gradients.
const shade = (hex, f) => {
  const c = parseHex(hex)
  return c ? toHex(c.map((v) => v * f)) : hex
}

// Mix a colour toward white by `amt` (0..1) — readable light tints on the
// gradient-header stepper, regardless of how dark the source hue is.
const lighten = (hex, amt) => {
  const c = parseHex(hex)
  return c ? toHex(c.map((v) => v + (255 - v) * amt)) : hex
}

// ── WCAG contrast (sRGB relative luminance) ───────────────────────────────
const luminance = (hex) => {
  const c = parseHex(hex)
  if (!c) return 0
  const [r, g, b] = c.map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a, b) => {
  const l1 = luminance(a)
  const l2 = luminance(b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

// Linear mix between two hex colours. t=0 → a, t=1 → b.
const mix = (a, b, t) => {
  const ca = parseHex(a)
  const cb = parseHex(b)
  return ca && cb ? toHex(ca.map((v, i) => v + (cb[i] - v) * t)) : a
}

// Nudge `fg` toward `toward` until it clears `target` contrast against `bg`.
// Guarantees a legibility floor for muted text regardless of the source palette.
const ensureContrast = (fg, bg, toward, target = 4.5) => {
  if (contrast(fg, bg) >= target) return fg
  for (let t = 0.1; t <= 1.0001; t += 0.1) {
    const c = mix(fg, toward, t)
    if (contrast(c, bg) >= target) return c
  }
  return toward
}

function tokens(c, dark) {
  const brand = c.accent || c.color4
  const brandStrong = c.color12 || c.color4 || brand
  const shadow = dark
    ? '0 1px 1px rgba(0,0,0,0.2), 0 12px 30px -12px rgba(0,0,0,0.4), 0 34px 64px -28px rgba(0,0,0,0.6)'
    : '0 1px 1px rgba(16,24,40,0.02), 0 10px 28px -12px rgba(16,24,40,0.10), 0 30px 60px -28px rgba(16,24,40,0.16)'
  return {
    '--ft-brand': brand,
    '--ft-brand-hover': c.color4 || brand,
    '--ft-brand-strong': brandStrong,
    '--ft-header-grad': `linear-gradient(135deg, ${shade(brand, 0.8)} 0%, ${brandStrong} 100%)`,
    '--ft-header-grad-danger': `linear-gradient(135deg, ${shade(c.color1, 0.78)} 0%, ${c.color9 || c.color1} 100%)`,

    '--ft-success': c.color2,
    '--ft-success-hover': c.color2,
    '--ft-success-fg': c.color10 || c.color2,
    '--ft-success-bg': rgba(c.color2, 0.15),
    '--ft-success-line': rgba(c.color2, 0.32),
    '--ft-success-ring': rgba(c.color2, 0.28),

    '--ft-error': c.color1,
    '--ft-error-fg': c.color9 || c.color1,
    '--ft-error-bg': rgba(c.color1, 0.15),
    '--ft-error-line': rgba(c.color1, 0.32),

    '--ft-info': c.color4,
    '--ft-info-fg': c.color12 || c.color4,
    '--ft-info-bg': rgba(c.color4, 0.14),
    '--ft-info-line': rgba(c.color4, 0.32),

    '--ft-warn': c.color3,
    '--ft-warn-fg': c.color11 || c.color3,
    '--ft-warn-bg': rgba(c.color3, 0.16),
    '--ft-warn-line': rgba(c.color3, 0.4),

    // Muted foregrounds get a guaranteed WCAG-AA contrast floor: if the palette's
    // grey is too faint on its own background, blend it toward the body text.
    '--ft-neutral-fg': ensureContrast(c.color7 || c.foreground, c.background, c.foreground),
    '--ft-neutral-bg': rgba(c.color8 || c.color7, 0.18),
    '--ft-neutral-line': rgba(c.color8 || c.color7, 0.5),

    '--ft-surface-base': c.background,
    '--ft-surface-1': rgba(c.foreground, 0.05),
    '--ft-border': rgba(c.color8 || c.color7, 0.5),
    '--ft-text': c.foreground,
    '--ft-text-soft': ensureContrast(c.color7 || c.foreground, c.background, c.foreground),

    '--ft-btn-ghost-bg': c.background,
    '--ft-btn-ghost-fg': rgba(c.foreground, 0.74),
    '--ft-btn-ghost-line': rgba(c.color8 || c.foreground, 0.45),

    '--ft-kpi-total': brand,
    '--ft-kpi-total-ring': rgba(brand, 0.25),
    '--ft-kpi-volume': c.color2,
    '--ft-kpi-volume-ring': rgba(c.color2, 0.25),
    '--ft-kpi-accent': c.color6 || c.color4,
    '--ft-kpi-accent-ring': rgba(c.color6 || c.color4, 0.25),
    '--ft-kpi-pending': c.color3,
    '--ft-kpi-pending-ring': rgba(c.color3, 0.25),
    '--ft-kpi-error': c.color1,
    '--ft-kpi-error-ring': rgba(c.color1, 0.25),

    '--ft-chip-ok-bg': rgba(c.color2, 0.15), '--ft-chip-ok-fg': c.color10 || c.color2, '--ft-chip-ok-line': rgba(c.color2, 0.32),
    '--ft-chip-err-bg': rgba(c.color1, 0.15), '--ft-chip-err-fg': c.color9 || c.color1, '--ft-chip-err-line': rgba(c.color1, 0.32),
    '--ft-chip-blue-bg': rgba(c.color4, 0.14), '--ft-chip-blue-fg': c.color12 || c.color4, '--ft-chip-blue-line': rgba(c.color4, 0.32),
    '--ft-chip-grey-bg': rgba(c.color8 || c.color7, 0.16), '--ft-chip-grey-fg': c.color7 || c.foreground, '--ft-chip-grey-line': rgba(c.color8 || c.color7, 0.4),

    '--ft-card-shadow': shadow,

    // Stepper — hue-matched to the theme. Sits on the brand gradient header, so
    // surfaces are alpha and foregrounds are tinted toward white for legibility.
    '--ft-stp-idle-bg': 'rgba(255, 255, 255, 0.10)', '--ft-stp-idle-fg': 'rgba(255, 255, 255, 0.55)', '--ft-stp-idle-border': 'rgba(255, 255, 255, 0.15)',
    '--ft-stp-doing-bg': rgba(brand, 0.30), '--ft-stp-doing-fg': lighten(brand, 0.6), '--ft-stp-doing-border': rgba(brand, 0.55),
    '--ft-stp-done-bg': rgba(c.color2, 0.22), '--ft-stp-done-fg': lighten(c.color2, 0.55), '--ft-stp-done-border': rgba(c.color2, 0.4),
    '--ft-stp-error-bg': rgba(c.color1, 0.22), '--ft-stp-error-fg': lighten(c.color1, 0.55), '--ft-stp-error-border': rgba(c.color1, 0.45),
    '--ft-stp-rail-done': rgba(c.color2, 0.45), '--ft-stp-rail-doing': rgba(brand, 0.45), '--ft-stp-rail-idle': 'rgba(255, 255, 255, 0.15)',
  }
}

// Flag low-contrast theme combinations (WCAG AA = 4.5 for body text). Soft text
// is checked post-adjustment, so this only fires when even the body text colour
// can't reach AA on its own background — a genuine palette problem.
function auditContrast(t) {
  const c = t.colors
  const softAdjusted = ensureContrast(c.color7 || c.foreground, c.background, c.foreground)
  const checks = [
    ['text/surface', c.foreground, c.background],
    ['soft-text/surface', softAdjusted, c.background],
  ]
  for (const [name, fg, bg] of checks) {
    const ratio = contrast(fg, bg)
    if (ratio < 4.5) {
      console.warn(`  ⚠ ${t.name}: ${name} contrast ${ratio.toFixed(2)} < 4.5 (WCAG AA)`)
    }
  }
}

const block = (sel, map) =>
  `${sel} {\n` +
  Object.entries(map).map(([k, v]) => `  ${k}: ${v};`).join('\n') +
  `\n}\n`

const indent = (s) => s.replace(/^(?=.)/gm, '  ')

/* Facet Dark — the one curated default dark theme (not derived from a palette).
 * Kept here as the single source of truth so it can be emitted twice: as an
 * explicit `[data-theme='facet-dark']` and as the automatic
 * `prefers-color-scheme: dark` default. No hand-maintained duplicate, no drift. */
const FACET_DARK = {
  '--ft-brand': '#6366f1',
  '--ft-brand-hover': '#818cf8',
  '--ft-brand-strong': '#818cf8',
  '--ft-header-grad': 'linear-gradient(135deg, #4338ca 0%, #818cf8 100%)',
  '--ft-header-grad-danger': 'linear-gradient(135deg, #b91c1c 0%, #fb7185 100%)',

  '--ft-success': '#22c55e',
  '--ft-success-hover': '#16a34a',
  '--ft-success-fg': '#86efac',
  '--ft-success-bg': 'rgba(34, 197, 94, 0.15)',
  '--ft-success-line': 'rgba(34, 197, 94, 0.32)',
  '--ft-success-ring': 'rgba(34, 197, 94, 0.28)',

  '--ft-error': '#f87171',
  '--ft-error-fg': '#fca5a5',
  '--ft-error-bg': 'rgba(248, 113, 113, 0.15)',
  '--ft-error-line': 'rgba(248, 113, 113, 0.34)',

  '--ft-info': '#60a5fa',
  '--ft-info-fg': '#93c5fd',
  '--ft-info-bg': 'rgba(96, 165, 250, 0.14)',
  '--ft-info-line': 'rgba(96, 165, 250, 0.32)',

  '--ft-warn': '#fbbf24',
  '--ft-warn-fg': '#fcd34d',
  '--ft-warn-bg': 'rgba(251, 191, 36, 0.18)',
  '--ft-warn-line': 'rgba(251, 191, 36, 0.40)',

  '--ft-neutral-fg': 'rgba(248, 250, 252, 0.70)',
  '--ft-neutral-bg': 'rgba(148, 163, 184, 0.12)',
  '--ft-neutral-line': 'rgba(71, 85, 105, 0.5)',

  '--ft-surface-base': '#1e1e22',
  '--ft-surface-1': 'rgba(42, 42, 48, 0.5)',
  '--ft-border': 'rgba(71, 85, 105, 0.5)',
  '--ft-text': '#f8fafc',
  '--ft-text-soft': 'rgba(248, 250, 252, 0.70)',

  '--ft-btn-ghost-bg': '#2a2a30',
  '--ft-btn-ghost-fg': 'rgba(248, 250, 252, 0.72)',
  '--ft-btn-ghost-line': 'rgba(71, 85, 105, 0.6)',

  '--ft-kpi-total': '#818cf8', '--ft-kpi-total-ring': 'rgba(129, 140, 248, 0.25)',
  '--ft-kpi-volume': '#4ade80', '--ft-kpi-volume-ring': 'rgba(74, 222, 128, 0.25)',
  '--ft-kpi-accent': '#22d3ee', '--ft-kpi-accent-ring': 'rgba(34, 211, 238, 0.25)',
  '--ft-kpi-pending': '#fbbf24', '--ft-kpi-pending-ring': 'rgba(251, 191, 36, 0.25)',
  '--ft-kpi-error': '#f87171', '--ft-kpi-error-ring': 'rgba(248, 113, 113, 0.25)',

  '--ft-chip-ok-bg': 'rgba(34, 197, 94, 0.15)', '--ft-chip-ok-fg': '#86efac', '--ft-chip-ok-line': 'rgba(34, 197, 94, 0.32)',
  '--ft-chip-err-bg': 'rgba(248, 113, 113, 0.15)', '--ft-chip-err-fg': '#fca5a5', '--ft-chip-err-line': 'rgba(248, 113, 113, 0.34)',
  '--ft-chip-blue-bg': 'rgba(96, 165, 250, 0.14)', '--ft-chip-blue-fg': '#93c5fd', '--ft-chip-blue-line': 'rgba(96, 165, 250, 0.32)',
  '--ft-chip-grey-bg': 'rgba(148, 163, 184, 0.12)', '--ft-chip-grey-fg': 'rgba(248, 250, 252, 0.70)', '--ft-chip-grey-line': 'rgba(71, 85, 105, 0.5)',

  '--ft-card-shadow': '0 1px 1px rgba(0, 0, 0, 0.2), 0 12px 30px -12px rgba(0, 0, 0, 0.4), 0 34px 64px -28px rgba(0, 0, 0, 0.6)',
}

let out =
  `/* GENERATED by scripts/build-themes.mjs from src/themes.json — do not edit by hand.\n` +
  ` * ${themes.length} theme presets. Apply with <html data-theme="tokyo-night">. */\n\n`

themes.forEach(auditContrast)

// Curated default dark: explicit opt-in + automatic system-preference default.
out += block(`[data-theme='facet-dark']`, FACET_DARK) + '\n'
out +=
  `@media (prefers-color-scheme: dark) {\n` +
  indent(block(`:root:not([data-theme])`, { 'color-scheme': 'dark', ...FACET_DARK })) +
  `}\n\n`

out += themes.map((t) => block(`[data-theme='${t.name}']`, tokens(t.colors, t.dark))).join('\n')

writeFileSync(new URL('src/styles/themes.css', root), out)
console.log(`Built ${themes.length} themes + facet-dark -> src/styles/themes.css`)
