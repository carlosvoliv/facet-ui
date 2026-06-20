import { ref } from 'vue'
import FacetCheckbox from './FacetCheckbox.vue'

export default {
  title: 'Components/Checkbox',
  component: FacetCheckbox,
  tags: ['autodocs'],
  argTypes: { label: { control: 'text' }, disabled: { control: 'boolean' } },
  args: { label: 'I agree to the terms', disabled: false },
  render: (args) => ({
    components: { FacetCheckbox },
    setup: () => ({ args, model: ref(true) }),
    template: `<FacetCheckbox v-bind="args" v-model="model" />`,
  }),
}

export const Checked = {}
export const Disabled = { args: { disabled: true } }
