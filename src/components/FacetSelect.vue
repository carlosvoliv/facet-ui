<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  options: { type: Array, default: () => [] }, // [{ value, label }]
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="ft-field">
    <span v-if="label" class="ft-field__label">{{ label }}</span>
    <div class="ft-select">
      <select
        class="ft-select__el"
        :value="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-for="o in options" :key="o.value" :value="o.value">{{ o.label }}</option>
      </select>
      <span class="ft-select__chevron" aria-hidden="true">▾</span>
    </div>
  </label>
</template>

<style scoped>
.ft-field { display: flex; flex-direction: column; gap: 6px; }
.ft-field__label { font-size: 12px; font-weight: 600; color: var(--ft-text-soft); }
.ft-select { position: relative; }
.ft-select__el {
  width: 100%;
  appearance: none;
  font-family: var(--ft-font-body);
  font-size: 14px;
  color: var(--ft-text);
  background: var(--ft-surface-base);
  border: 1px solid var(--ft-border);
  border-radius: 9px;
  padding: 10px 34px 10px 12px;
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.ft-select__el:focus {
  outline: none;
  border-color: var(--ft-brand);
  box-shadow: 0 0 0 3px var(--ft-kpi-total-ring);
}
.ft-select__chevron {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--ft-text-soft);
  font-size: 12px;
}
</style>
