import FacetStepper from './FacetStepper.vue'

export default {
  title: 'Components/Stepper',
  component: FacetStepper,
  tags: ['autodocs'],
}

// Stepper is designed to sit on the brand gradient header.
const onGradient = (template) => ({
  components: { FacetStepper },
  setup: () => ({}),
  template: `<div style="padding:24px;border-radius:16px;background:var(--ft-header-grad)">${template}</div>`,
})

export const Progress = {
  render: () =>
    onGradient(`<FacetStepper :steps="[
      { label: 'Submitted', state: 'done' },
      { label: 'Review', state: 'doing' },
      { label: 'Settled', state: 'idle' },
    ]" />`),
}

export const WithError = {
  render: () =>
    onGradient(`<FacetStepper :steps="[
      { label: 'Submitted', state: 'done' },
      { label: 'Validation', state: 'error' },
      { label: 'Settled', state: 'idle' },
    ]" />`),
}
