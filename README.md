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
  `src/styles/themes.css`.
- **Full dark mode** is just another theme, not a bolt-on.

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
