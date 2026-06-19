<script setup>
import FacetIcon from './FacetIcon.vue'

defineProps({
  name: { type: String, required: true },
  variant: { type: String, default: 'default' }, // default | danger
  title: { type: String, default: '' },
  size: { type: Number, default: 17 },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <button
    type="button"
    :class="['ft-iconbtn', `ft-iconbtn--${variant}`]"
    :title="title"
    :aria-label="title"
    :disabled="disabled"
  >
    <FacetIcon :name="name" :size="size" />
  </button>
</template>

<style scoped>
.ft-iconbtn {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 9px;
  background: transparent;
  color: var(--ft-text-soft);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}
.ft-iconbtn:hover {
  background: var(--ft-neutral-bg);
  color: var(--ft-text);
}
.ft-iconbtn--danger:hover {
  background: var(--ft-error-bg);
  color: var(--ft-error-fg);
}
.ft-iconbtn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.ft-iconbtn:focus-visible {
  outline: 2px solid var(--ft-brand);
  outline-offset: 2px;
}
</style>
