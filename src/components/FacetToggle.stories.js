import { ref } from 'vue'
import FacetToggle from './FacetToggle.vue'

export default {
  title: 'Components/Toggle',
  component: FacetToggle,
  tags: ['autodocs'],
  argTypes: { label: { control: 'text' }, disabled: { control: 'boolean' } },
  args: { label: 'Notifications', disabled: false },
  render: (args) => ({
    components: { FacetToggle },
    setup: () => ({ args, model: ref(true) }),
    template: `<FacetToggle v-bind="args" v-model="model" />`,
  }),
}

export const On = { args: {} }
export const Disabled = { args: { disabled: true } }
