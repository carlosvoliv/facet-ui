<script setup>
// steps: [{ label: string, state: 'idle' | 'doing' | 'done' | 'error' }]
defineProps({
  steps: { type: Array, required: true },
})
const glyph = { done: '✓', error: '!', doing: '●', idle: '' }
</script>

<template>
  <div class="ft-stepper">
    <div v-for="(s, i) in steps" :key="i" :class="['ft-step', `ft-step--${s.state}`]">
      <span class="ft-step__dot">{{ glyph[s.state] || i + 1 }}</span>
      <span class="ft-step__label">{{ s.label }}</span>
      <span v-if="i < steps.length - 1" class="ft-step__rail" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
/* Designed to sit on the brand gradient header (see demo). White-alpha states
 * read well over a coloured surface in any theme. */
.ft-stepper {
  display: flex;
  gap: 4px;
}
.ft-step {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  padding-right: 22px;
}
.ft-step__dot {
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid;
}
.ft-step__label {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}
.ft-step__rail {
  position: absolute;
  right: 4px;
  width: 14px;
  height: 2px;
  border-radius: 2px;
}

.ft-step--idle .ft-step__dot { background: var(--ft-stp-idle-bg); color: var(--ft-stp-idle-fg); border-color: var(--ft-stp-idle-border); }
.ft-step--idle .ft-step__label { color: var(--ft-stp-idle-fg); }
.ft-step--idle .ft-step__rail { background: var(--ft-stp-rail-idle); }

.ft-step--doing .ft-step__dot { background: var(--ft-stp-doing-bg); color: var(--ft-stp-doing-fg); border-color: var(--ft-stp-doing-border); }
.ft-step--doing .ft-step__label { color: var(--ft-stp-doing-fg); }
.ft-step--doing .ft-step__rail { background: var(--ft-stp-rail-doing); }

.ft-step--done .ft-step__dot { background: var(--ft-stp-done-bg); color: var(--ft-stp-done-fg); border-color: var(--ft-stp-done-border); }
.ft-step--done .ft-step__label { color: var(--ft-stp-done-fg); }
.ft-step--done .ft-step__rail { background: var(--ft-stp-rail-done); }

.ft-step--error .ft-step__dot { background: var(--ft-stp-error-bg); color: var(--ft-stp-error-fg); border-color: var(--ft-stp-error-border); }
.ft-step--error .ft-step__label { color: var(--ft-stp-error-fg); }
.ft-step--error .ft-step__rail { background: var(--ft-stp-rail-idle); }
</style>
