import FacetKpiCard from './FacetKpiCard.vue'
import FacetIcon from './FacetIcon.vue'

export default {
  title: 'Components/KpiCard',
  component: FacetKpiCard,
  tags: ['autodocs'],
  argTypes: {
    accent: { control: 'select', options: ['total', 'volume', 'accent', 'pending', 'error'] },
    label: { control: 'text' },
    value: { control: 'text' },
    sub: { control: 'text' },
  },
  args: { accent: 'total', label: 'Commits', value: '538', sub: 'across 2 repos' },
  render: (args) => ({
    components: { FacetKpiCard, FacetIcon },
    setup: () => ({ args }),
    template: `
      <FacetKpiCard :accent="args.accent" :label="args.label" :value="args.value" :sub="args.sub" style="width:220px">
        <template #icon><FacetIcon name="commit" :size="20" /></template>
      </FacetKpiCard>`,
  }),
}

export const Total = { args: { accent: 'total' } }
export const Volume = { args: { accent: 'volume', label: 'Lines', value: '~150k', sub: 'added' } }
export const Pending = { args: { accent: 'pending', label: 'Pending', value: '3', sub: 'in review' } }
