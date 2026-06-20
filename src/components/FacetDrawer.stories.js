import { ref } from 'vue'
import FacetDrawer from './FacetDrawer.vue'
import FacetButton from './FacetButton.vue'

export default {
  title: 'Components/Drawer',
  component: FacetDrawer,
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'select', options: ['right', 'left'] },
    gradientHeader: { control: 'boolean' },
  },
  args: { side: 'right', gradientHeader: true },
  render: (args) => ({
    components: { FacetDrawer, FacetButton },
    setup: () => ({ args, open: ref(false) }),
    template: `
      <div>
        <FacetButton @click="open = true">Open drawer</FacetButton>
        <FacetDrawer
          v-bind="args"
          v-model="open"
          title="Receivable #018"
          subtitle="Batch A · settled"
        >
          <p>Drag focus around — Tab is trapped, Escape closes, and focus returns to the trigger.</p>
          <template #footer>
            <FacetButton variant="ghost" @click="open = false">Close</FacetButton>
          </template>
        </FacetDrawer>
      </div>`,
  }),
}

export const Right = {}
export const Left = { args: { side: 'left' } }
