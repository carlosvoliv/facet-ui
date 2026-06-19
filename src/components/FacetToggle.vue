<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="ft-toggle" :class="{ 'ft-toggle--on': modelValue, 'ft-toggle--disabled': disabled }">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      class="ft-toggle__track"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span class="ft-toggle__thumb" />
    </button>
    <span v-if="label" class="ft-toggle__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.ft-toggle { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
.ft-toggle--disabled { opacity: 0.55; cursor: not-allowed; }
.ft-toggle__track {
  width: 42px;
  height: 24px;
  border-radius: 999px;
  border: none;
  background: var(--ft-neutral-line);
  position: relative;
  cursor: inherit;
  transition: background 0.18s ease;
  padding: 0;
}
.ft-toggle--on .ft-toggle__track { background: var(--ft-success); }
.ft-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  transition: transform 0.18s ease;
}
.ft-toggle--on .ft-toggle__thumb { transform: translateX(18px); }
.ft-toggle__label { font-size: 14px; color: var(--ft-text); }
</style>
