<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  sub: { type: String, default: '' },
  accent: { type: String, default: 'total' }, // total | volume | accent | pending | error
})
</script>

<template>
  <div :class="['ft-kpi', `ft-kpi--${accent}`]">
    <div class="ft-kpi__top">
      <span class="ft-kpi__label">{{ label }}</span>
      <span class="ft-kpi__icon" aria-hidden="true"><slot name="icon" /></span>
    </div>
    <div class="ft-kpi__value">{{ value }}</div>
    <div v-if="sub" class="ft-kpi__sub">{{ sub }}</div>
  </div>
</template>

<style scoped>
.ft-kpi {
  --accent: var(--ft-kpi-total);
  --ring: var(--ft-kpi-total-ring);
  background: var(--ft-surface-base);
  border: 1px solid var(--ft-border);
  border-radius: var(--ft-radius);
  padding: 16px 20px 20px;
  box-shadow: var(--ft-card-shadow);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
.ft-kpi:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--ring), var(--ft-card-shadow);
}
.ft-kpi__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.ft-kpi__label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ft-text-soft);
}
.ft-kpi__icon {
  color: var(--accent);
  font-size: 20px;
  line-height: 1;
}
.ft-kpi__value {
  font-family: var(--ft-font-display);
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.01em;
  color: var(--accent);
}
.ft-kpi__sub {
  font-size: 12px;
  font-weight: 600;
  color: var(--ft-text-soft);
  margin-top: 6px;
}

.ft-kpi--total { --accent: var(--ft-kpi-total); --ring: var(--ft-kpi-total-ring); }
.ft-kpi--volume { --accent: var(--ft-kpi-volume); --ring: var(--ft-kpi-volume-ring); }
.ft-kpi--accent { --accent: var(--ft-kpi-accent); --ring: var(--ft-kpi-accent-ring); }
.ft-kpi--pending { --accent: var(--ft-kpi-pending); --ring: var(--ft-kpi-pending-ring); }
.ft-kpi--error { --accent: var(--ft-kpi-error); --ring: var(--ft-kpi-error-ring); }
</style>
