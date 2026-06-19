<script setup>
import FacetIcon from './FacetIcon.vue'
defineProps({
  variant: { type: String, default: 'info' }, // success | error | info | warn
  title: { type: String, default: '' },
})
const icon = { success: 'check', error: 'x', info: 'info', warn: 'alert' }
</script>

<template>
  <div :class="['ft-alert', `ft-alert--${variant}`]" role="status">
    <span class="ft-alert__icon" aria-hidden="true"><FacetIcon :name="icon[variant]" :size="13" /></span>
    <div class="ft-alert__content">
      <strong v-if="title" class="ft-alert__title">{{ title }}</strong>
      <div class="ft-alert__msg"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.ft-alert {
  display: flex;
  gap: 12px;
  padding: 13px 15px;
  border-radius: 14px;
  border: 1px solid;
  font-size: 14px;
}
.ft-alert__icon {
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}
.ft-alert__title { display: block; font-weight: 700; margin-bottom: 2px; }
.ft-alert__msg { color: var(--ft-text-soft); }

.ft-alert--success { background: var(--ft-success-bg); border-color: var(--ft-success-line); color: var(--ft-success-fg); }
.ft-alert--success .ft-alert__icon { background: var(--ft-success); }
.ft-alert--error { background: var(--ft-error-bg); border-color: var(--ft-error-line); color: var(--ft-error-fg); }
.ft-alert--error .ft-alert__icon { background: var(--ft-error); }
.ft-alert--info { background: var(--ft-info-bg); border-color: var(--ft-info-line); color: var(--ft-info-fg); }
.ft-alert--info .ft-alert__icon { background: var(--ft-info); }
.ft-alert--warn { background: var(--ft-warn-bg); border-color: var(--ft-warn-line); color: var(--ft-warn-fg); }
.ft-alert--warn .ft-alert__icon { background: var(--ft-warn); }
</style>
