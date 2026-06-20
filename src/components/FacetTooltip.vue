<script setup>
import { ref, useId, onBeforeUnmount } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  placement: { type: String, default: 'top' }, // top | bottom
})

const triggerRef = ref(null)
const visible = ref(false)
const pos = ref({ top: 0, left: 0 })
const tipId = useId()

function place() {
  const el = triggerRef.value
  if (!el) return
  const r = el.getBoundingClientRect()
  pos.value = {
    top: props.placement === 'bottom' ? r.bottom + 6 : r.top - 6,
    left: r.left + r.width / 2,
  }
}

function show() {
  place()
  visible.value = true
  // Fixed coords go stale on scroll/resize while the bubble is open.
  window.addEventListener('scroll', place, true)
  window.addEventListener('resize', place)
}

function hide() {
  visible.value = false
  window.removeEventListener('scroll', place, true)
  window.removeEventListener('resize', place)
}

function onKeydown(e) {
  if (e.key === 'Escape') hide()
}

onBeforeUnmount(hide)
</script>

<template>
  <span
    ref="triggerRef"
    class="ft-tip"
    tabindex="0"
    :aria-describedby="visible ? tipId : undefined"
    @mouseenter="show"
    @mouseleave="hide"
    @focusin="show"
    @focusout="hide"
    @keydown="onKeydown"
  >
    <slot />
  </span>
  <Teleport to="body">
    <Transition name="ft-tip">
      <span
        v-if="visible"
        :id="tipId"
        :class="['ft-tip__bubble', `ft-tip__bubble--${placement}`]"
        :style="{ top: `${pos.top}px`, left: `${pos.left}px` }"
        role="tooltip"
      >
        {{ label }}
      </span>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ft-tip {
  display: inline-flex;
  outline: none;
}
</style>

<style>
/* Unscoped: the bubble is teleported to <body>, so it can't be clipped by any
 * ancestor's overflow/transform. Positioned in fixed (viewport) coordinates. */
.ft-tip__bubble {
  position: fixed;
  white-space: nowrap;
  background: var(--ft-text);
  color: var(--ft-surface-base);
  font-family: var(--ft-font-body);
  font-size: var(--ft-text-xs);
  font-weight: var(--ft-weight-medium);
  padding: 5px 9px;
  border-radius: var(--ft-radius-sm);
  box-shadow: var(--ft-card-shadow);
  z-index: var(--ft-z-tooltip);
  pointer-events: none;
}
.ft-tip__bubble--top { transform: translate(-50%, -100%); }
.ft-tip__bubble--bottom { transform: translate(-50%, 0); }

.ft-tip-enter-active,
.ft-tip-leave-active { transition: opacity 0.14s ease; }
.ft-tip-enter-from,
.ft-tip-leave-to { opacity: 0; }
</style>
