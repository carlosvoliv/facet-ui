import FacetSpinner from './FacetSpinner.vue'

export default {
  title: 'Components/Spinner',
  component: FacetSpinner,
  tags: ['autodocs'],
  argTypes: { size: { control: { type: 'number' } } },
  args: { size: 24 },
  render: (args) => ({
    components: { FacetSpinner },
    setup: () => ({ args }),
    template: `<FacetSpinner :size="args.size" />`,
  }),
}

export const Default = {}
