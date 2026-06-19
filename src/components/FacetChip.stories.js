import FacetChip from './FacetChip.vue'

export default {
  title: 'Components/Chip',
  component: FacetChip,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['ok', 'err', 'blue', 'grey'] },
    size: { control: 'select', options: ['md', 'sm'] },
    label: { control: 'text' },
  },
  args: { variant: 'ok', size: 'md', label: 'settled' },
  render: (args) => ({
    components: { FacetChip },
    setup: () => ({ args }),
    template: `<FacetChip :variant="args.variant" :size="args.size">{{ args.label }}</FacetChip>`,
  }),
}

export const Success = { args: { variant: 'ok', label: 'settled' } }
export const Error = { args: { variant: 'err', label: 'rejected' } }
export const Info = { args: { variant: 'blue', label: 'info' } }
export const Small = { args: { variant: 'ok', size: 'sm', label: 'settled' } }
