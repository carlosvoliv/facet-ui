import FacetTimeline from './FacetTimeline.vue'

export default {
  title: 'Components/Timeline',
  component: FacetTimeline,
  tags: ['autodocs'],
}

export const Default = {
  render: () => ({
    components: { FacetTimeline },
    setup: () => ({
      events: [
        { title: 'Batch submitted', when: '09:24', state: 'done', description: '128 receivables uploaded' },
        { title: 'Validation', when: '09:25', state: 'done' },
        { title: 'Settlement', when: 'in progress', state: 'doing', description: 'Awaiting clearing house' },
        { title: 'Reconciliation', state: 'idle' },
      ],
    }),
    template: `<FacetTimeline :events="events" style="width:360px" />`,
  }),
}
