import FacetAlert from './FacetAlert.vue'

export default {
  title: 'Components/Alert',
  component: FacetAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'info', 'warn'] },
    title: { control: 'text' },
    body: { control: 'text' },
  },
  args: { variant: 'success', title: 'Registered', body: 'Batch #018 settled successfully.' },
  render: (args) => ({
    components: { FacetAlert },
    setup: () => ({ args }),
    template: `<FacetAlert :variant="args.variant" :title="args.title" style="min-width:320px">{{ args.body }}</FacetAlert>`,
  }),
}

export const Success = {}
export const Warning = { args: { variant: 'warn', title: 'Heads up', body: '3 items awaiting review.' } }
export const ErrorState = { args: { variant: 'error', title: 'Failed', body: 'Rejected by the registry.' } }
