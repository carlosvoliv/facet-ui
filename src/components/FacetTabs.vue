<script setup>
defineProps({
  modelValue: { type: [String, Number], required: true },
  tabs: { type: Array, required: true }, // [{ value, label }]
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="ft-tabs" role="tablist">
    <button
      v-for="t in tabs"
      :key="t.value"
      type="button"
      role="tab"
      :aria-selected="modelValue === t.value"
      :class="['ft-tab', { 'ft-tab--active': modelValue === t.value }]"
      @click="$emit('update:modelValue', t.value)"
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
.ft-tab:hover {
  color: var(--ft-text);
}
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
