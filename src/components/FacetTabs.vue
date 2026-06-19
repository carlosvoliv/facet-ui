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
.ft-tabs {
  display: inline-flex;
  gap: var(--ft-space-1);
  border-bottom: 1px solid var(--ft-border);
}
.ft-tab {
  position: relative;
  font-family: var(--ft-font-body);
  font-size: var(--ft-text-base);
  font-weight: var(--ft-weight-medium);
  color: var(--ft-text-soft);
  background: transparent;
  border: none;
  padding: var(--ft-space-3) var(--ft-space-4);
  cursor: pointer;
  transition: color var(--ft-dur) var(--ft-ease);
}
.ft-tab::after {
  content: '';
  position: absolute;
  left: var(--ft-space-3);
  right: var(--ft-space-3);
  bottom: -1px;
  height: 2px;
  border-radius: 2px;
  background: var(--ft-brand);
  transform: scaleX(0);
  transition: transform var(--ft-dur) var(--ft-ease-out);
}
.ft-tab:hover { color: var(--ft-text); }
.ft-tab--active { color: var(--ft-brand); }
.ft-tab--active::after { transform: scaleX(1); }
</style>
