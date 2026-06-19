<script setup>
defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '16px' },
  radius: { type: String, default: 'var(--ft-radius-sm)' },
})
</script>

<template>
  <span class="ft-skeleton" :style="{ width, height, borderRadius: radius }" aria-hidden="true" />
</template>

<style scoped>
.ft-skeleton {
  display: block;
  background: linear-gradient(
    100deg,
    var(--ft-neutral-bg) 30%,
    var(--ft-surface-1) 50%,
    var(--ft-neutral-bg) 70%
  );
  background-size: 200% 100%;
  animation: ft-shimmer 1.3s ease-in-out infinite;
}
@keyframes ft-shimmer {
  from { background-position: 200% 0; }
  to { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ft-skeleton { animation: none; }
}
</style>
