import FacetIconButton from './FacetIconButton.vue'

export default {
  title: 'Components/IconButton',
  component: FacetIconButton,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    variant: { control: 'select', options: ['default', 'danger'] },
    title: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { name: 'edit', variant: 'default', title: 'Edit', disabled: false },
  render: (args) => ({
    components: { FacetIconButton },
    setup: () => ({ args }),
    template: `<FacetIconButton v-bind="args" />`,
  }),
}

export const Default = {}
export const Danger = { args: { name: 'trash', variant: 'danger', title: 'Delete' } }
export const Disabled = { args: { disabled: true } }
