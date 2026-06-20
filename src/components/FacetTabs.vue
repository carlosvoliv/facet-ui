<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], required: true },
  tabs: { type: Array, required: true }, // [{ value, label, disabled? }]
})
const emit = defineEmits(['update:modelValue'])

const tabRefs = ref([])

function select(value) {
  if (value !== props.modelValue) emit('update:modelValue', value)
}

// Arrow-key roving focus per the WAI-ARIA tablist pattern.
function onKeydown(e, index) {
  const last = props.tabs.length - 1
  let next
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = index === last ? 0 : index + 1
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = index === 0 ? last : index - 1
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = last
  else return
  e.preventDefault()
  const tab = props.tabs[next]
  tabRefs.value[next]?.focus()
  if (tab) select(tab.value)
}
</script>

<template>
  <div class="ft-tabs" role="tablist">
    <button
      v-for="(t, i) in tabs"
      :id="`ft-tab-${t.value}`"
      :key="t.value"
      :ref="(el) => (tabRefs[i] = el)"
      type="button"
      role="tab"
      :aria-selected="modelValue === t.value"
      :tabindex="modelValue === t.value ? 0 : -1"
      :disabled="t.disabled"
      :class="['ft-tab', { 'ft-tab--active': modelValue === t.value }]"
      @click="select(t.value)"
      @keydown="onKeydown($event, i)"
    >
      {{ t.label }}
    </button>
  </div>
</template>

<style scoped>
/* Segmented control: a recessed track with a raised, sliding active segment. */
.ft-tabs {
  display: inline-flex;
  gap: 3px;
  padding: 3px;
  background: var(--ft-neutral-bg);
  border: 1px solid var(--ft-border);
  border-radius: 12px;
}
.ft-tab {
  font-family: var(--ft-font-body);
  font-size: var(--ft-text-sm);
  font-weight: var(--ft-weight-medium);
  letter-spacing: -0.005em;
  color: var(--ft-text-soft);
  background: transparent;
  border: none;
  border-radius: 9px;
  padding: 7px 16px;
  cursor: pointer;
  transition:
    color var(--ft-dur) var(--ft-ease),
    background var(--ft-dur) var(--ft-ease),
    box-shadow var(--ft-dur) var(--ft-ease);
}
.ft-tab:hover:not(:disabled) {
  color: var(--ft-text);
}
.ft-tab:disabled { opacity: 0.45; cursor: not-allowed; }
.ft-tab--active {
  background: var(--ft-surface-base);
  color: var(--ft-text);
  font-weight: var(--ft-weight-semibold);
  box-shadow:
    0 1px 2px rgba(16, 24, 40, 0.12),
    0 2px 6px rgba(16, 24, 40, 0.08);
}
.ft-tab:focus-visible {
  outline: 2px solid var(--ft-brand);
  outline-offset: 2px;
}
</style>
