<script setup>
import FacetIcon from './FacetIcon.vue'

const props = defineProps({
  variant: { type: String, default: 'grey' }, // ok | err | blue | grey
  size: { type: String, default: 'md' }, // md | sm
  icon: { type: String, default: '' }, // override; defaults per variant
})
const DEFAULT_ICON = { ok: 'check', err: 'x', blue: 'info', grey: 'clock' }
const iconName = () => props.icon || DEFAULT_ICON[props.variant]
</script>

<template>
  <span :class="['ft-chip', `ft-chip--${variant}`, size === 'sm' && 'ft-chip--sm']">
    <FacetIcon v-if="iconName()" :name="iconName()" :size="size === 'sm' ? 11 : 13" />
    <slot />
  </span>
</template>

<style scoped>
.ft-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: var(--ft-font-body);
  font-size: 12.5px;
  font-weight: 550;
  letter-spacing: -0.005em;
  padding: 4px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
}
.ft-chip--sm {
  gap: 4px;
  font-size: 11.5px;
  padding: 2px 8px;
  border-radius: 7px;
}
.ft-chip--ok { background: var(--ft-chip-ok-bg); color: var(--ft-chip-ok-fg); border-color: var(--ft-chip-ok-line); }
.ft-chip--err { background: var(--ft-chip-err-bg); color: var(--ft-chip-err-fg); border-color: var(--ft-chip-err-line); }
.ft-chip--blue { background: var(--ft-chip-blue-bg); color: var(--ft-chip-blue-fg); border-color: var(--ft-chip-blue-line); }
.ft-chip--grey { background: var(--ft-chip-grey-bg); color: var(--ft-chip-grey-fg); border-color: var(--ft-chip-grey-line); }
</style>
