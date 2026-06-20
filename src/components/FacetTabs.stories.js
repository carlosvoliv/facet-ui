import { ref } from 'vue'
import FacetTabs from './FacetTabs.vue'

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'settings', label: 'Settings' },
]

export default {
  title: 'Components/Tabs',
  component: FacetTabs,
  tags: ['autodocs'],
}

export const Default = {
  render: () => ({
    components: { FacetTabs },
    setup: () => ({ tabs, model: ref('overview') }),
    template: `<FacetTabs :tabs="tabs" v-model="model" />`,
  }),
}

export const WithDisabled = {
  render: () => ({
    components: { FacetTabs },
    setup: () => ({
      tabs: [...tabs, { value: 'billing', label: 'Billing', disabled: true }],
      model: ref('overview'),
    }),
    template: `<FacetTabs :tabs="tabs" v-model="model" />`,
  }),
}
