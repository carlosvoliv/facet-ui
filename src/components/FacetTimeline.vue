<script setup>
// events: [{ title, when?, state?: 'done'|'doing'|'idle'|'error', description? }]
defineProps({
  events: { type: Array, required: true },
})
const glyph = { done: '✓', error: '!', doing: '●', idle: '' }
</script>

<template>
  <ol class="ft-timeline">
    <li v-for="(e, i) in events" :key="i" :class="['ft-tl', `ft-tl--${e.state || 'idle'}`]">
      <span class="ft-tl__dot">{{ glyph[e.state] || i + 1 }}</span>
      <div class="ft-tl__body">
        <span v-if="e.when" class="ft-tl__when">{{ e.when }}</span>
        <h4 class="ft-tl__title">{{ e.title }}</h4>
        <p v-if="e.description" class="ft-tl__desc">{{ e.description }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.ft-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}
.ft-tl {
  position: relative;
  display: flex;
  gap: 14px;
  padding-bottom: 22px;
}
.ft-tl:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 12px;
  top: 26px;
  bottom: -2px;
  width: 2px;
  background: var(--ft-border);
}
.ft-tl__dot {
  flex: 0 0 auto;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: var(--ft-neutral-fg);
  z-index: 1;
}
.ft-tl--done .ft-tl__dot { background: var(--ft-success); box-shadow: 0 0 0 4px var(--ft-success-ring); }
.ft-tl--doing .ft-tl__dot { background: var(--ft-brand); box-shadow: 0 0 0 4px var(--ft-kpi-total-ring); }
.ft-tl--error .ft-tl__dot { background: var(--ft-error); }
.ft-tl__when {
  font-family: var(--ft-font-mono);
  font-size: 11.5px;
  font-weight: 500;
  color: var(--ft-brand-strong);
  display: block;
  margin-bottom: 2px;
}
.ft-tl__title {
  font-family: var(--ft-font-display);
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 3px;
  color: var(--ft-text);
}
.ft-tl__desc {
  font-size: 13px;
  color: var(--ft-text-soft);
  margin: 0;
}
</style>
