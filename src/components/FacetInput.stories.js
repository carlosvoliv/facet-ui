import { ref } from 'vue'
import FacetInput from './FacetInput.vue'

export default {
  title: 'Components/Input',
  component: FacetInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    type: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Email', placeholder: 'you@example.com', type: 'email', error: '', disabled: false },
  render: (args) => ({
    components: { FacetInput },
    setup: () => ({ args, model: ref('') }),
    template: `<FacetInput v-bind="args" v-model="model" style="width:280px" />`,
  }),
}

export const Default = {}
export const WithError = { args: { error: 'Enter a valid email' } }
export const Disabled = { args: { disabled: true } }
