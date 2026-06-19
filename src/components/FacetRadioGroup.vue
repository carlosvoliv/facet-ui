<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, required: true }, // [{ value, label }]
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="ft-radios" role="radiogroup">
    <label
      v-for="o in options"
      :key="o.value"
      class="ft-radio"
      :class="{ 'ft-radio--disabled': disabled }"
    >
      <button
        type="button"
        role="radio"
        :aria-checked="modelValue === o.value"
        :disabled="disabled"
        class="ft-radio__dot"
        :class="{ 'ft-radio__dot--on': modelValue === o.value }"
        @click="$emit('update:modelValue', o.value)"
      />
      <span class="ft-radio__label">{{ o.label }}</span>
    </label>
  </div>
</template>

<style scoped>
.ft-radios { display: flex; flex-direction: column; gap: var(--ft-space-2); }
.ft-radio { display: inline-flex; align-items: center; gap: var(--ft-space-2); cursor: pointer; }
.ft-radio--disabled { opacity: 0.55; cursor: not-allowed; }
.ft-radio__dot {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1.5px solid var(--ft-border);
  background: var(--ft-surface-base);
  cursor: inherit;
  padding: 0;
  transition: border-color var(--ft-dur) var(--ft-ease);
}
.ft-radio__dot--on { border-color: var(--ft-brand); }
.ft-radio__dot--on::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--ft-brand);
}
.ft-radio__dot:focus-visible { outline: 2px solid var(--ft-brand); outline-offset: 2px; }
.ft-radio__label { font-size: var(--ft-text-base); color: var(--ft-text); }
</style>
