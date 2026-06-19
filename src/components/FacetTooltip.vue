<script setup>
defineProps({
  label: { type: String, required: true },
  placement: { type: String, default: 'top' }, // top | bottom
})
</script>

<template>
  <span class="ft-tip" tabindex="0">
    <slot />
    <span :class="['ft-tip__bubble', `ft-tip__bubble--${placement}`]" role="tooltip">{{ label }}</span>
  </span>
</template>

<style scoped>
.ft-tip {
  position: relative;
  display: inline-flex;
  outline: none;
}
.ft-tip__bubble {
  position: absolute;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  white-space: nowrap;
  background: var(--ft-text);
  color: var(--ft-surface-base);
  font-family: var(--ft-font-body);
  font-size: var(--ft-text-xs);
  font-weight: var(--ft-weight-medium);
  padding: 5px 9px;
  border-radius: var(--ft-radius-sm);
  box-shadow: var(--ft-card-shadow);
  opacity: 0;
  pointer-events: none;
  z-index: var(--ft-z-tooltip);
  transition: opacity var(--ft-dur) var(--ft-ease), transform var(--ft-dur) var(--ft-ease-out);
}
.ft-tip__bubble--top { bottom: calc(100% + 6px); }
.ft-tip__bubble--bottom { top: calc(100% + 6px); }
.ft-tip:hover .ft-tip__bubble,
.ft-tip:focus-visible .ft-tip__bubble {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
