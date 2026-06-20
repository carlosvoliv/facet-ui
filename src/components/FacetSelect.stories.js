import { ref } from 'vue'
import FacetSelect from './FacetSelect.vue'

const options = [
  { value: 'eur', label: 'Euro' },
  { value: 'usd', label: 'US Dollar' },
  { value: 'brl', label: 'Real' },
]

export default {
  title: 'Components/Select',
  component: FacetSelect,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Currency', disabled: false },
  render: (args) => ({
    components: { FacetSelect },
    setup: () => ({ args, options, model: ref('eur') }),
    template: `<FacetSelect v-bind="args" :options="options" v-model="model" style="width:240px" />`,
  }),
}

export const Default = {}
export const Disabled = { args: { disabled: true } }
