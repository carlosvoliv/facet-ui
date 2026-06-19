<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="ft-field">
    <span v-if="label" class="ft-field__label">{{ label }}</span>
    <input
      class="ft-field__input"
      :class="{ 'ft-field__input--error': error }"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="error" class="ft-field__error">{{ error }}</span>
  </label>
</template>

<style scoped>
.ft-field { display: flex; flex-direction: column; gap: 6px; }
.ft-field__label {
  font-size: 12px;
  font-weight: 600;
  color: var(--ft-text-soft);
}
.ft-field__input {
  font-family: var(--ft-font-body);
  font-size: 14px;
  color: var(--ft-text);
  background: var(--ft-surface-base);
  border: 1px solid var(--ft-border);
  border-radius: 11px;
  padding: 10px 13px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.ft-field__input::placeholder { color: var(--ft-neutral-fg); opacity: 0.7; }
.ft-field__input:focus {
  outline: none;
  border-color: var(--ft-brand);
  box-shadow: 0 0 0 3px var(--ft-kpi-total-ring);
}
.ft-field__input:disabled { opacity: 0.55; cursor: not-allowed; }
.ft-field__input--error {
  border-color: var(--ft-error);
}
.ft-field__input--error:focus {
  box-shadow: 0 0 0 3px var(--ft-error-bg);
}
.ft-field__error { font-size: 12px; color: var(--ft-error-fg); }
</style>
