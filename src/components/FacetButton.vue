<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | ghost | danger
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    :class="['ft-btn', `ft-btn--${variant}`, { 'ft-btn--loading': loading }]"
  >
    <span v-if="loading" class="ft-btn__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped>
.ft-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
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
.ft-btn:focus-visible {
  outline: 2px solid var(--ft-brand);
  outline-offset: 2px;
}
.ft-btn--loading { cursor: progress; }
.ft-btn__spinner {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: ft-btn-spin 0.6s linear infinite;
}
@keyframes ft-btn-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .ft-btn__spinner { animation-duration: 1.4s; }
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
