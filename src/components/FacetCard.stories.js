import FacetCard from './FacetCard.vue'

export default {
  title: 'Components/Card',
  component: FacetCard,
  tags: ['autodocs'],
  argTypes: { title: { control: 'text' }, flat: { control: 'boolean' } },
  args: { title: 'Settlement summary', flat: false },
  render: (args) => ({
    components: { FacetCard },
    setup: () => ({ args }),
    template: `
      <FacetCard v-bind="args" style="width:320px">
        Net position cleared at 17:00. All 128 receivables settled.
      </FacetCard>`,
  }),
}

export const Default = {}
export const Flat = { args: { flat: true } }
