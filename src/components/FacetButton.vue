<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | ghost | danger
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
})
</script>

<template>
  <button :type="type" :disabled="disabled" :class="['ft-btn', `ft-btn--${variant}`]">
    <slot />
  </button>
</template>

<style scoped>
.ft-btn {
  font-family: var(--ft-font-body);
  font-size: 14px;
  font-weight: 590;
  letter-spacing: -0.01em;
  line-height: 1;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.1s ease;
}
.ft-btn:active {
  transform: translateY(1px);
}
.ft-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.ft-btn--primary {
  background: var(--ft-success);
  color: #fff;
}
.ft-btn--primary:hover:not(:disabled) {
  background: var(--ft-success-hover);
}

.ft-btn--ghost {
  background: var(--ft-btn-ghost-bg);
  color: var(--ft-btn-ghost-fg);
  border-color: var(--ft-btn-ghost-line);
}
.ft-btn--ghost:hover:not(:disabled) {
  border-color: var(--ft-brand);
  color: var(--ft-brand);
}

.ft-btn--danger {
  background: var(--ft-error-bg);
  color: var(--ft-error-fg);
  border-color: var(--ft-error-line);
}
.ft-btn--danger:hover:not(:disabled) {
  background: var(--ft-error);
  color: #fff;
}
</style>
