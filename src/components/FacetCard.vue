<script setup>
defineProps({
  title: { type: String, default: '' },
  flat: { type: Boolean, default: false }, // border only, no elevation (dense panels)
})
</script>

<template>
  <section class="ft-card" :class="{ 'ft-card--flat': flat }">
    <header v-if="title || $slots.header" class="ft-card__head">
      <slot name="header"><h3 class="ft-card__title">{{ title }}</h3></slot>
    </header>
    <div class="ft-card__body"><slot /></div>
  </section>
</template>

<style scoped>
.ft-card {
  background: var(--ft-surface-base);
  border: 1px solid var(--ft-border);
  border-radius: var(--ft-radius);
  box-shadow: var(--ft-card-shadow);
  overflow: hidden;
}
.ft-card--flat {
  box-shadow: none;
}
.ft-card__head {
  padding: 14px 18px;
  border-bottom: 1px solid var(--ft-border);
  background: var(--ft-surface-1);
}
.ft-card__title {
  margin: 0;
  font-family: var(--ft-font-display);
  font-size: 15px;
  font-weight: 600;
  color: var(--ft-text);
}
.ft-card__body { padding: 18px; color: var(--ft-text); }
</style>
