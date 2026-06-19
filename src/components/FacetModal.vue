<script setup>
import { watch, onBeforeUnmount } from 'vue'
import FacetButton from './FacetButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String, default: '' },
  confirmText: { type: String, default: 'Apply' },
  cancelText: { type: String, default: 'Cancel' },
  loading: { type: Boolean, default: false },
  maxWidth: { type: String, default: '500px' },
  gradientHeader: { type: Boolean, default: true },
  tone: { type: String, default: 'default' }, // default | danger
})
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

function close() {
  emit('update:modelValue', false)
  emit('cancel')
}
function confirm() {
  emit('confirm')
}
function onKey(e) {
  if (e.key === 'Escape' && props.modelValue) close()
}
watch(
  () => props.modelValue,
  (open) => {
    if (open) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  },
)
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="ft-modal">
      <div v-if="modelValue" class="ft-modal" @click.self="close">
        <div class="ft-modal__card" role="dialog" aria-modal="true" :style="{ maxWidth }">
          <header
            :class="[
              'ft-modal__head',
              tone === 'danger' ? 'ft-modal__head--danger' : gradientHeader && 'ft-modal__head--grad',
            ]"
          >
            <span class="ft-modal__title">{{ title }}</span>
            <div class="ft-modal__head-actions">
              <slot name="header-actions" />
              <button type="button" class="ft-modal__x" aria-label="Close" @click="close">✕</button>
            </div>
          </header>

          <div class="ft-modal__body">
            <slot />
          </div>

          <footer class="ft-modal__foot">
            <slot name="footer">
              <FacetButton variant="ghost" @click="close">{{ cancelText }}</FacetButton>
              <FacetButton :variant="tone === 'danger' ? 'danger' : 'primary'" :disabled="loading" @click="confirm">
                {{ loading ? '…' : confirmText }}
              </FacetButton>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ft-modal {
  position: fixed;
  inset: 0;
  z-index: var(--ft-z-modal);
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
}
.ft-modal__card {
  width: 100%;
  background: var(--ft-surface-base);
  color: var(--ft-text);
  border-radius: 18px;
  box-shadow: var(--ft-card-shadow);
  overflow: hidden;
}
.ft-modal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--ft-border);
}
.ft-modal__head--grad {
  background: var(--ft-header-grad);
  border-bottom: none;
  color: #fff;
}
.ft-modal__head--danger {
  background: var(--ft-header-grad-danger);
  border-bottom: none;
  color: #fff;
}
.ft-modal__title {
  font-family: var(--ft-font-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.ft-modal__head-actions { display: flex; align-items: center; gap: 8px; }
.ft-modal__x {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  opacity: 0.8;
  cursor: pointer;
  font-size: 14px;
}
.ft-modal__x:hover { background: rgba(127, 127, 127, 0.18); opacity: 1; }
.ft-modal__body { padding: 22px 20px; }
.ft-modal__foot {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  background: var(--ft-surface-1);
  border-top: 1px solid var(--ft-border);
}

.ft-modal-enter-active,
.ft-modal-leave-active {
  transition: opacity 0.2s ease;
}
.ft-modal-enter-active .ft-modal__card,
.ft-modal-leave-active .ft-modal__card {
  transition: transform 0.2s ease;
}
.ft-modal-enter-from,
.ft-modal-leave-to {
  opacity: 0;
}
.ft-modal-enter-from .ft-modal__card,
.ft-modal-leave-to .ft-modal__card {
  transform: translateY(12px) scale(0.98);
}
</style>
