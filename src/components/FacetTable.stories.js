import FacetTable from './FacetTable.vue'
import FacetChip from './FacetChip.vue'

export default {
  title: 'Components/Table',
  component: FacetTable,
  tags: ['autodocs'],
}

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Batch' },
  { key: 'status', label: 'Status' },
  { key: 'value', label: 'Value', align: 'right' },
]
const rows = [
  { id: '#018', name: 'Receivables A', status: 'ok', value: 'R$ 1.2M' },
  { id: '#019', name: 'Receivables B', status: 'blue', value: 'R$ 880k' },
  { id: '#020', name: 'Receivables C', status: 'err', value: 'R$ 410k' },
]

export const Basic = {
  render: () => ({
    components: { FacetTable, FacetChip },
    setup: () => ({ columns, rows }),
    template: `
      <FacetTable :columns="columns" :rows="rows" style="width:560px">
        <template #cell-status="{ value }">
          <FacetChip :variant="value" size="sm">{{ value === 'ok' ? 'settled' : value === 'err' ? 'rejected' : 'pending' }}</FacetChip>
        </template>
      </FacetTable>`,
  }),
}
