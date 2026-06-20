import FacetIcon from './FacetIcon.vue'

const names = [
  'check', 'x', 'info', 'alert', 'commit', 'layers', 'code', 'clock',
  'eye', 'trash', 'edit', 'copy', 'refresh', 'download',
]

export default {
  title: 'Components/Icon',
  component: FacetIcon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: names },
    size: { control: { type: 'number' } },
  },
  args: { name: 'commit', size: 24 },
  render: (args) => ({
    components: { FacetIcon },
    setup: () => ({ args }),
    template: `<FacetIcon :name="args.name" :size="args.size" />`,
  }),
}

export const Single = {}

export const Gallery = {
  render: () => ({
    components: { FacetIcon },
    setup: () => ({ names }),
    template: `
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:18px;color:var(--ft-text)">
        <div v-for="n in names" :key="n" style="display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11px">
          <FacetIcon :name="n" :size="22" />{{ n }}
        </div>
      </div>`,
  }),
}
