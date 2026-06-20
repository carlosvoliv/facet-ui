import { ref } from 'vue'
import FacetRadioGroup from './FacetRadioGroup.vue'

const options = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
]

export default {
  title: 'Components/RadioGroup',
  component: FacetRadioGroup,
  tags: ['autodocs'],
  argTypes: { disabled: { control: 'boolean' } },
  args: { disabled: false },
  render: (args) => ({
    components: { FacetRadioGroup },
    setup: () => ({ args, options, model: ref('quarterly') }),
    template: `<FacetRadioGroup v-bind="args" :options="options" v-model="model" />`,
  }),
}

export const Default = {}
export const Disabled = { args: { disabled: true } }
