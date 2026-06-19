import { ref } from 'vue'
import FacetModal from './FacetModal.vue'
import FacetButton from './FacetButton.vue'

export default {
  title: 'Components/Modal',
  component: FacetModal,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: ['default', 'danger'] },
    title: { control: 'text' },
  },
  args: { tone: 'default', title: 'Register batch' },
  render: (args) => ({
    components: { FacetModal, FacetButton },
    setup() {
      const open = ref(false)
      return { args, open }
    },
    template: `
      <FacetButton @click="open = true">Open modal</FacetButton>
      <FacetModal v-model="open" :tone="args.tone" :title="args.title">
        <p style="margin:0;color:var(--ft-text-soft)">Modal body content goes here.</p>
      </FacetModal>`,
  }),
}

export const Default = {}
export const Danger = { args: { tone: 'danger', title: 'Delete batch' } }
