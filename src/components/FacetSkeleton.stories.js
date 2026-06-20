import FacetSkeleton from './FacetSkeleton.vue'

export default {
  title: 'Components/Skeleton',
  component: FacetSkeleton,
  tags: ['autodocs'],
}

export const Default = {
  render: () => ({
    components: { FacetSkeleton },
    template: `<FacetSkeleton width="240px" height="16px" />`,
  }),
}

export const CardPlaceholder = {
  render: () => ({
    components: { FacetSkeleton },
    template: `
      <div style="display:flex;flex-direction:column;gap:10px;width:280px">
        <FacetSkeleton height="20px" width="60%" />
        <FacetSkeleton height="14px" />
        <FacetSkeleton height="14px" width="85%" />
      </div>`,
  }),
}
