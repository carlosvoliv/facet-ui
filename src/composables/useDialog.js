/* ----------------------------------------------------------------------------
 * useDialog — shared overlay behaviour for Modal and Drawer.
 *
 * Handles the four things every accessible dialog needs and that the components
 * previously lacked: Escape-to-close, a focus trap, returning focus to whatever
 * opened it, and locking background scroll. Scroll-lock is reference-counted so
 * stacked dialogs don't fight over `body.style`.
 * -------------------------------------------------------------------------- */
import { watch, onBeforeUnmount, nextTick } from 'vue'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

// Reference-counted body scroll lock (supports stacked overlays).
let lockCount = 0
let savedOverflow = ''
let savedPaddingRight = ''

function lockScroll() {
  if (typeof document === 'undefined') return
  if (lockCount === 0) {
    const sbw = window.innerWidth - document.documentElement.clientWidth
    savedOverflow = document.body.style.overflow
    savedPaddingRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    // Compensate for the removed scrollbar so the page doesn't shift.
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`
  }
  lockCount++
}

function unlockScroll() {
  if (typeof document === 'undefined') return
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow
    document.body.style.paddingRight = savedPaddingRight
  }
}

/**
 * @param isOpen   ref<boolean> — the dialog's open state
 * @param panelRef ref<HTMLElement|null> — the dialog panel (needs tabindex="-1")
 * @param onClose  () => void — called on Escape
 */
export function useDialog(isOpen, panelRef, onClose) {
  let lastActive = null

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key === 'Tab') trapTab(e)
  }

  function trapTab(e) {
    const panel = panelRef.value
    if (!panel) return
    const nodes = Array.from(panel.querySelectorAll(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    )
    const active = document.activeElement
    if (nodes.length === 0) {
      // Nothing focusable inside — keep focus on the panel itself.
      e.preventDefault()
      panel.focus()
      return
    }
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (e.shiftKey && (active === first || !panel.contains(active))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
      e.preventDefault()
      first.focus()
    }
  }

  async function activate() {
    if (typeof window === 'undefined') return
    lastActive = document.activeElement
    lockScroll()
    window.addEventListener('keydown', onKeydown, true)
    await nextTick()
    const panel = panelRef.value
    if (!panel) return
    const target = panel.querySelector('[autofocus]') || panel.querySelector(FOCUSABLE) || panel
    target?.focus?.()
  }

  function deactivate() {
    if (typeof window === 'undefined') return
    window.removeEventListener('keydown', onKeydown, true)
    unlockScroll()
    lastActive?.focus?.()
    lastActive = null
  }

  watch(isOpen, (open) => (open ? activate() : deactivate()), { immediate: true })
  onBeforeUnmount(() => {
    if (isOpen.value) deactivate()
  })
}
