<script setup>
import { watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: '' },
  side: { type: String, default: 'right' }, // right | left
  width: { type: String, default: '420px' },
  gradientHeader: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)
function onKey(e) {
  if (e.key === 'Escape' && props.modelValue) close()
}
watch(
  () => props.modelValue,
  (open) => (open ? window.addEventListener('keydown', onKey) : window.removeEventListener('keydown', onKey)),
)
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="ft-drawer">
      <div v-if="modelValue" class="ft-drawer" @click.self="close">
        <aside
          class="ft-drawer__panel"
          :class="`ft-drawer__panel--${side}`"
          role="dialog"
          aria-modal="true"
          :style="{ width }"
        >
          <header :class="['ft-drawer__head', gradientHeader && 'ft-drawer__head--grad']">
            <span class="ft-drawer__title">{{ title }}</span>
            <div class="ft-drawer__actions">
              <slot name="header-actions" />
              <button type="button" class="ft-drawer__x" aria-label="Close" @click="close">✕</button>
            </div>
          </header>
          <div class="ft-drawer__body"><slot /></div>
          <footer v-if="$slots.footer" class="ft-drawer__foot"><slot name="footer" /></footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ft-drawer {
  position: fixed;
  inset: 0;
  z-index: var(--ft-z-drawer);
  display: flex;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(2px);
}
.ft-drawer__panel {
  display: flex;
  flex-direction: column;
  max-width: 92vw;
  height: 100%;
  background: var(--ft-surface-base);
  color: var(--ft-text);
  box-shadow: var(--ft-card-shadow);
}
.ft-drawer__panel--right { margin-left: auto; }
.ft-drawer__panel--left { margin-right: auto; }

.ft-drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--ft-space-4) var(--ft-space-5);
  border-bottom: 1px solid var(--ft-border);
}
.ft-drawer__head--grad {
  background: var(--ft-header-grad);
  border-bottom: none;
  color: #fff;
}
.ft-drawer__title { font-family: var(--ft-font-display); font-size: var(--ft-text-lg); font-weight: var(--ft-weight-semibold); letter-spacing: -0.01em; }
.ft-drawer__actions { display: flex; align-items: center; gap: var(--ft-space-2); }
.ft-drawer__x {
  width: 30px; height: 30px; border: none; border-radius: var(--ft-radius-sm);
  background: transparent; color: inherit; opacity: 0.8; cursor: pointer; font-size: 14px;
}
.ft-drawer__x:hover { background: rgba(127, 127, 127, 0.18); opacity: 1; }
.ft-drawer__body { flex: 1; overflow-y: auto; padding: var(--ft-space-5); }
.ft-drawer__foot {
  display: flex; justify-content: flex-end; gap: var(--ft-space-3);
  padding: var(--ft-space-4) var(--ft-space-5);
  background: var(--ft-surface-1); border-top: 1px solid var(--ft-border);
}

.ft-drawer-enter-active, .ft-drawer-leave-active { transition: opacity var(--ft-dur) var(--ft-ease); }
.ft-drawer-enter-active .ft-drawer__panel, .ft-drawer-leave-active .ft-drawer__panel { transition: transform var(--ft-dur-slow) var(--ft-ease-out); }
.ft-drawer-enter-from, .ft-drawer-leave-to { opacity: 0; }
.ft-drawer-enter-from .ft-drawer__panel--right, .ft-drawer-leave-to .ft-drawer__panel--right { transform: translateX(100%); }
.ft-drawer-enter-from .ft-drawer__panel--left, .ft-drawer-leave-to .ft-drawer__panel--left { transform: translateX(-100%); }
</style>
