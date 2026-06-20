// Behavioural tests for the accessibility/correctness fixes.
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import FacetModal from '../FacetModal.vue'
import FacetInput from '../FacetInput.vue'
import FacetSelect from '../FacetSelect.vue'
import FacetTabs from '../FacetTabs.vue'

beforeEach(() => {
  document.body.innerHTML = ''
  document.body.style.overflow = ''
})
afterEach(() => {
  document.body.style.overflow = ''
})

describe('FacetModal', () => {
  it('closes on Escape', async () => {
    const w = mount(FacetModal, { props: { modelValue: true, title: 'X' }, attachTo: document.body })
    await flushPromises()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(w.emitted('update:modelValue')?.at(-1)).toEqual([false])
    expect(w.emitted('cancel')).toBeTruthy()
    w.unmount()
  })

  it('locks body scroll while open and restores on close', async () => {
    const w = mount(FacetModal, { props: { modelValue: true, title: 'X' }, attachTo: document.body })
    await flushPromises()
    expect(document.body.style.overflow).toBe('hidden')
    await w.setProps({ modelValue: false })
    expect(document.body.style.overflow).toBe('')
    w.unmount()
  })

  it('moves focus into the dialog on open and restores it on close', async () => {
    const trigger = document.createElement('button')
    document.body.appendChild(trigger)
    trigger.focus()
    expect(document.activeElement).toBe(trigger)

    const w = mount(FacetModal, { props: { modelValue: false, title: 'X' }, attachTo: document.body })
    await w.setProps({ modelValue: true })
    await flushPromises()
    expect(document.body.contains(document.activeElement)).toBe(true)
    expect(document.activeElement).not.toBe(trigger)

    await w.setProps({ modelValue: false })
    expect(document.activeElement).toBe(trigger)
    w.unmount()
  })

  it('labels the dialog with its title', async () => {
    const w = mount(FacetModal, { props: { modelValue: true, title: 'My title' }, attachTo: document.body })
    await flushPromises()
    const dialog = document.querySelector('[role="dialog"]')
    const labelId = dialog.getAttribute('aria-labelledby')
    expect(labelId).toBeTruthy()
    expect(document.getElementById(labelId).textContent).toBe('My title')
    w.unmount()
  })
})

describe('FacetInput attribute fallthrough', () => {
  it('forwards id/name/required to the <input>, not the <label>', () => {
    const w = mount(FacetInput, {
      props: { label: 'Email' },
      attrs: { id: 'email', name: 'email', required: true, autocomplete: 'email' },
    })
    const input = w.get('input')
    expect(input.attributes('id')).toBe('email')
    expect(input.attributes('name')).toBe('email')
    expect(input.attributes('required')).toBeDefined()
    expect(input.attributes('autocomplete')).toBe('email')
    // label points at the same input
    expect(w.get('label').attributes('for')).toBe('email')
  })

  it('wires aria-invalid + aria-describedby when in error', () => {
    const w = mount(FacetInput, { props: { label: 'Email', error: 'Required' } })
    const input = w.get('input')
    expect(input.attributes('aria-invalid')).toBe('true')
    const describedBy = input.attributes('aria-describedby')
    expect(w.get(`#${describedBy}`).text()).toBe('Required')
  })
})

describe('FacetSelect attribute fallthrough', () => {
  it('forwards id to the <select> and links the label', () => {
    const w = mount(FacetSelect, {
      props: { label: 'Pick', options: [{ value: '1', label: 'One' }] },
      attrs: { id: 'pick' },
    })
    expect(w.get('select').attributes('id')).toBe('pick')
    expect(w.get('label').attributes('for')).toBe('pick')
  })
})

describe('FacetTabs keyboard navigation', () => {
  const tabs = [
    { value: 'a', label: 'A' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
  ]

  it('uses roving tabindex (only the active tab is tabbable)', () => {
    const w = mount(FacetTabs, { props: { modelValue: 'b', tabs } })
    const btns = w.findAll('[role="tab"]')
    expect(btns.map((b) => b.attributes('tabindex'))).toEqual(['-1', '0', '-1'])
  })

  it('ArrowRight moves selection to the next tab and wraps', async () => {
    const w = mount(FacetTabs, { props: { modelValue: 'a', tabs }, attachTo: document.body })
    await w.findAll('[role="tab"]')[0].trigger('keydown', { key: 'ArrowRight' })
    expect(w.emitted('update:modelValue').at(-1)).toEqual(['b'])

    await w.setProps({ modelValue: 'c' })
    await w.findAll('[role="tab"]')[2].trigger('keydown', { key: 'ArrowRight' })
    expect(w.emitted('update:modelValue').at(-1)).toEqual(['a'])
  })

  it('Home/End jump to the first/last tab', async () => {
    const w = mount(FacetTabs, { props: { modelValue: 'b', tabs }, attachTo: document.body })
    await w.findAll('[role="tab"]')[1].trigger('keydown', { key: 'End' })
    expect(w.emitted('update:modelValue').at(-1)).toEqual(['c'])
    await w.findAll('[role="tab"]')[1].trigger('keydown', { key: 'Home' })
    expect(w.emitted('update:modelValue').at(-1)).toEqual(['a'])
  })
})
