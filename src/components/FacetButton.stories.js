import FacetButton from './FacetButton.vue'

export default {
  title: 'Components/Button',
  component: FacetButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'ghost', 'danger'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: { variant: 'primary', disabled: false, label: 'Button' },
  render: (args) => ({
    components: { FacetButton },
    setup: () => ({ args }),
    template: `<FacetButton :variant="args.variant" :disabled="args.disabled">{{ args.label }}</FacetButton>`,
  }),
}

export const Primary = { args: { variant: 'primary', label: 'Register' } }
export const Ghost = { args: { variant: 'ghost', label: 'Cancel' } }
export const Danger = { args: { variant: 'danger', label: 'Delete' } }
export const Disabled = { args: { disabled: true, label: 'Disabled' } }
