<script setup>
defineProps({
  size: { type: [Number, String], default: 20 },
})
</script>

<template>
  <span
    class="ft-spinner"
    role="status"
    aria-label="Loading"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<style scoped>
.ft-spinner {
  display: inline-block;
  border-radius: 50%;
  border: 2px solid var(--ft-neutral-line);
  border-top-color: var(--ft-brand);
  animation: ft-spin 0.7s linear infinite;
}
@keyframes ft-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .ft-spinner { animation-duration: 1.6s; }
}
</style>
