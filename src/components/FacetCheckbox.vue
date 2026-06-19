<script setup>
import FacetIcon from './FacetIcon.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <label class="ft-check" :class="{ 'ft-check--disabled': disabled }">
    <button
      type="button"
      role="checkbox"
      :aria-checked="modelValue"
      :disabled="disabled"
      class="ft-check__box"
      :class="{ 'ft-check__box--on': modelValue }"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <FacetIcon v-if="modelValue" name="check" :size="13" />
    </button>
    <span v-if="label" class="ft-check__label">{{ label }}</span>
  </label>
</template>

<style scoped>
.ft-check { display: inline-flex; align-items: center; gap: var(--ft-space-2); cursor: pointer; }
.ft-check--disabled { opacity: 0.55; cursor: not-allowed; }
.ft-check__box {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: var(--ft-radius-xs);
  border: 1.5px solid var(--ft-border);
  background: var(--ft-surface-base);
  color: #fff;
  cursor: inherit;
  padding: 0;
  transition: background var(--ft-dur) var(--ft-ease), border-color var(--ft-dur) var(--ft-ease);
}
.ft-check__box--on {
  background: var(--ft-brand);
  border-color: var(--ft-brand);
}
.ft-check__box:focus-visible { outline: 2px solid var(--ft-brand); outline-offset: 2px; }
.ft-check__label { font-size: var(--ft-text-base); color: var(--ft-text); }
</style>
