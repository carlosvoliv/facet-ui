<script setup>
// steps: [{ label: string, state: 'idle' | 'doing' | 'done' | 'error' }]
// Pipeline stepper: a row of equal-width tiles (glyph over a short label),
// joined by thin rails. Tiles flex to share the row, so no single step grows
// wide. Designed to sit on the brand gradient header (white-alpha tokens).
defineProps({
  steps: { type: Array, required: true },
})
const glyph = { done: '✓', error: '!', doing: '●', idle: '' }
</script>

<template>
  <div class="ft-stepper">
    <template v-for="(s, i) in steps" :key="i">
      <div
        :class="['ft-step', `ft-step--${s.state}`, { 'ft-step--current': s.state === 'doing' }]"
        :title="s.label"
      >
        <span class="ft-step__glyph">{{ glyph[s.state] || i + 1 }}</span>
        <span class="ft-step__label">{{ s.label }}</span>
      </div>
      <span
        v-if="i < steps.length - 1"
        :class="['ft-step__rail', `ft-step__rail--${s.state}`]"
        aria-hidden="true"
      />
    </template>
  </div>
</template>

<style scoped>
/* Tuned for the brand gradient header: white-alpha surfaces read well over a
 * coloured background in any theme (see --ft-stp-* tokens). */
.ft-stepper {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0;
}

/* Equal-width tile: glyph stacked over a compact uppercase label. */
.ft-step {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 6px;
  border: 1px solid;
  border-radius: var(--ft-radius-sm);
  transition: background-color var(--ft-dur) var(--ft-ease),
    border-color var(--ft-dur) var(--ft-ease), box-shadow var(--ft-dur) var(--ft-ease),
    transform var(--ft-dur) var(--ft-ease);
}
.ft-step__glyph {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  background: rgba(255, 255, 255, 0.12);
}
.ft-step__label {
  max-width: 100%;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Connector rail — inherits the left step's state colour. */
.ft-step__rail {
  flex: 0 0 12px;
  height: 2px;
  border-radius: 2px;
  transition: background-color var(--ft-dur) var(--ft-ease);
}

/* States */
.ft-step--idle  { background: var(--ft-stp-idle-bg);  border-color: var(--ft-stp-idle-border);  color: var(--ft-stp-idle-fg); }
.ft-step--doing { background: var(--ft-stp-doing-bg); border-color: var(--ft-stp-doing-border); color: var(--ft-stp-doing-fg); }
.ft-step--done  { background: var(--ft-stp-done-bg);  border-color: var(--ft-stp-done-border);  color: var(--ft-stp-done-fg); }
.ft-step--error { background: var(--ft-stp-error-bg); border-color: var(--ft-stp-error-border); color: var(--ft-stp-error-fg); }

/* Current step: soft glow + slight lift. */
.ft-step--current {
  box-shadow: 0 0 14px 2px var(--ft-stp-doing-border), 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.ft-step__rail--done  { background: var(--ft-stp-rail-done); }
.ft-step__rail--doing { background: var(--ft-stp-rail-doing); }
.ft-step__rail--idle  { background: var(--ft-stp-rail-idle); }
.ft-step__rail--error { background: var(--ft-stp-rail-idle); }

@media (prefers-reduced-motion: reduce) {
  .ft-step { transition: none; }
}
</style>
