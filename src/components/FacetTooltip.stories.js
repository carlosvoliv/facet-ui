import FacetTooltip from './FacetTooltip.vue'
import FacetIconButton from './FacetIconButton.vue'

export default {
  title: 'Components/Tooltip',
  component: FacetTooltip,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom'] },
  },
  args: { label: 'Copy to clipboard', placement: 'top' },
  render: (args) => ({
    components: { FacetTooltip, FacetIconButton },
    setup: () => ({ args }),
    template: `
      <div style="padding:48px">
        <FacetTooltip :label="args.label" :placement="args.placement">
          <FacetIconButton name="copy" title="Copy" />
        </FacetTooltip>
      </div>`,
  }),
}

export const Top = {}
export const Bottom = { args: { placement: 'bottom' } }
