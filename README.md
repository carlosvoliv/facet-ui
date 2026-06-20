# Facet UI

A small, opinionated **Vue 3 design system**. The interesting part isn't the
components — it's the layer underneath them: **themes are data, not CSS.**

Every component reads CSS custom properties (`--ft-*`). Nothing hardcodes a
colour. So a complete palette swap is a single attribute:

```html
<html data-theme="tokyo-night">
```

…and the buttons, cards, chips, stepper and every surface re-theme at once —
light or dark, **19+ presets** included out of the box.

## Why it exists

Most "design systems" are a folder of components with colours baked in. The
moment you need a second theme, you're editing every file. Facet inverts that:

- **One token contract** — brand, semantic states (success / error / info /
  warn / neutral), surfaces, KPI accents, status chips and stepper states.
- **Themes are generated from a 16-colour palette.** A terminal-style palette
  (`background`, `foreground`, `accent`, 16 ANSI colours) is enough to drive the
  entire library. See [`src/themes.json`](src/themes.json) →
  [`scripts/build-themes.mjs`](scripts/build-themes.mjs) →
  `src/styles/themes.css`. The generator also audits **WCAG contrast** and warns
  on low-contrast palettes at build time.
- **Full dark mode** is just another theme, not a bolt-on — and `Facet Dark`
  applies automatically via `prefers-color-scheme` when no `data-theme` is set.

## Accessibility & quality

The interactive components are built to pass an audit, not just look the part:

- **Modal / Drawer**: focus trap, focus return to the trigger, `Escape` to
  close, reference-counted body scroll-lock, and `aria-labelledby`.
- **Tabs**: full WAI-ARIA roving-tabindex keyboard pattern (arrows / Home / End).
- **Tooltip**: `aria-describedby` wiring and live reposition on scroll/resize.
- **Inputs / Select**: `id`/`name`/`aria-*` fall through to the real form element
  (not the wrapper), with `label[for]` association and `aria-invalid` on error.
- Every component ships its own visible `:focus-visible` ring.

Backed by **Vitest + @vue/test-utils + axe-core** (structural a11y on all 21
components, plus behavioural tests for the above) and **ESLint** — both run in CI.

```bash
npm run lint
npm test
```

## Run the styleguide

```bash
npm install
npm run dev        # the living styleguide + theme switcher
npm run storybook  # component docs: per-prop controls + theme toolbar
```

Regenerate the theme CSS after editing palettes:

```bash
npm run build:themes
```

## Use it in an app

```bash
npm install facet-ui   # peer dep: vue ^3.4
```

```js
import { FacetButton, FacetKpiCard, FacetDrawer, FacetTable } from 'facet-ui'
import 'facet-ui/styles' // tokens + themes + component styles
```

Build the package yourself with `npm run build:lib` (outputs ESM + UMD + CSS to `dist/`).

```vue
<FacetKpiCard label="Commits" :value="538" sub="across 2 repos" accent="total" />
<FacetStepper :steps="[{ label: 'Submitted', state: 'done' }, { label: 'Settled', state: 'idle' }]" />
```

## Adding a theme

Drop a palette into `src/themes.json`:

```json
{ "name": "my-theme", "label": "My Theme", "dark": true,
  "colors": { "background": "#…", "foreground": "#…", "accent": "#…", "color0": "#…", "…": "" } }
```

Run `npm run build:themes`. Done — it's now selectable via `data-theme="my-theme"`.

## License

MIT
