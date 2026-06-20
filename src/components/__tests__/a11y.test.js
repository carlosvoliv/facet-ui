// Structural accessibility smoke test: render every component with valid props
// and assert axe-core finds no violations. Colour-contrast is disabled because
// jsdom does no layout/painting (contrast is checked at build time instead —
// see scripts/build-themes.mjs).
import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import axe from 'axe-core'
import * as Facet from '../../index.js'

const cases = {
  FacetButton: { props: {}, slots: { default: 'Save' } },
  FacetIcon: { props: { name: 'check' } },
  FacetIconButton: { props: { name: 'edit', title: 'Edit' } },
  FacetKpiCard: { props: { label: 'Commits', value: 538 } },
  FacetChip: { props: { variant: 'ok' }, slots: { default: 'Done' } },
  FacetStepper: { props: { steps: [{ label: 'A', state: 'done' }, { label: 'B', state: 'idle' }] } },
  FacetTimeline: { props: { events: [{ title: 'Opened', when: 'today', state: 'done' }] } },
  FacetModal: { props: { modelValue: true, title: 'Confirm' }, slots: { default: 'Body' } },
  FacetInput: { props: { label: 'Name' } },
  FacetSelect: { props: { label: 'Pick', options: [{ value: '1', label: 'One' }] } },
  FacetAlert: { props: { variant: 'info', title: 'Heads up' }, slots: { default: 'Message' } },
  FacetCard: { props: { title: 'Panel' }, slots: { default: 'Body' } },
  FacetToggle: { props: { label: 'Wifi' } },
  FacetTable: {
    props: { columns: [{ key: 'a', label: 'A' }], rows: [{ a: '1' }] },
  },
  FacetDrawer: { props: { modelValue: true, title: 'Details' }, slots: { default: 'Body' } },
  FacetTabs: { props: { modelValue: 'a', tabs: [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }] } },
  FacetTooltip: { props: { label: 'Tip' }, slots: { default: 'hover me' } },
  FacetSpinner: { props: {} },
  FacetSkeleton: { props: {} },
  FacetCheckbox: { props: { label: 'Accept' } },
  FacetRadioGroup: { props: { options: [{ value: '1', label: 'One' }], modelValue: '1' } },
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('accessibility (axe-core)', () => {
  for (const [name, cfg] of Object.entries(cases)) {
    it(`${name} has no a11y violations`, async () => {
      const Comp = Facet[name]
      expect(Comp, `${name} is exported`).toBeTruthy()
      const w = mount(Comp, { props: cfg.props, slots: cfg.slots, attachTo: document.body })
      const results = await axe.run(document.body, {
        rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
      })
      const msg = results.violations.map((v) => `${v.id}: ${v.help}`).join('\n')
      expect(results.violations, msg).toHaveLength(0)
      w.unmount()
    })
  }
})
