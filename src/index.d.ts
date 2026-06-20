import type { DefineComponent } from 'vue'

/* Typed public surface for Facet UI. Props mirror each component's
 * `defineProps`; emits mirror `defineEmits`. Slots are documented per-component
 * in the styleguide. */

// ── Shared shapes ──────────────────────────────────────────────────────────
export interface SelectOption {
  value: string | number
  label: string
}
export interface TableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}
export interface TabItem {
  value: string | number
  label: string
  disabled?: boolean
}
export type StepState = 'idle' | 'doing' | 'done' | 'error'
export interface Step {
  label: string
  state: StepState
}
export interface TimelineEvent {
  title: string
  when?: string
  state?: StepState
  description?: string
}

// ── Components ──────────────────────────────────────────────────────────────
export declare const FacetButton: DefineComponent<{
  variant?: 'primary' | 'ghost' | 'danger'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
}>

export declare const FacetIcon: DefineComponent<{
  name: string
  size?: number | string
}>

export declare const FacetIconButton: DefineComponent<{
  name: string
  variant?: 'default' | 'danger'
  title?: string
  size?: number
  disabled?: boolean
}>

export declare const FacetKpiCard: DefineComponent<{
  label: string
  value: string | number
  sub?: string
  accent?: 'total' | 'volume' | 'accent' | 'pending' | 'error'
}>

export declare const FacetCard: DefineComponent<{
  title?: string
  flat?: boolean
}>

export declare const FacetChip: DefineComponent<{
  variant?: 'ok' | 'err' | 'blue' | 'grey'
  size?: 'md' | 'sm'
  icon?: string
}>

export declare const FacetStepper: DefineComponent<{
  steps: Step[]
}>

export declare const FacetTimeline: DefineComponent<{
  events: TimelineEvent[]
}>

export declare const FacetModal: DefineComponent<{
  modelValue: boolean
  title?: string
  confirmText?: string
  cancelText?: string
  loading?: boolean
  maxWidth?: string
  gradientHeader?: boolean
  tone?: 'default' | 'danger'
}>

export declare const FacetInput: DefineComponent<{
  modelValue?: string | number
  label?: string
  type?: string
  placeholder?: string
  error?: string
  disabled?: boolean
}>

export declare const FacetSelect: DefineComponent<{
  modelValue?: string | number
  label?: string
  options?: SelectOption[]
  disabled?: boolean
}>

export declare const FacetAlert: DefineComponent<{
  variant?: 'success' | 'error' | 'info' | 'warn'
  title?: string
}>

export declare const FacetToggle: DefineComponent<{
  modelValue?: boolean
  label?: string
  disabled?: boolean
}>

export declare const FacetTable: DefineComponent<{
  columns: TableColumn[]
  rows: Record<string, unknown>[]
}>

export declare const FacetDrawer: DefineComponent<{
  modelValue: boolean
  title?: string
  subtitle?: string
  side?: 'right' | 'left'
  width?: string
  gradientHeader?: boolean
}>

export declare const FacetTabs: DefineComponent<{
  modelValue: string | number
  tabs: TabItem[]
}>

export declare const FacetTooltip: DefineComponent<{
  label: string
  placement?: 'top' | 'bottom'
}>

export declare const FacetSpinner: DefineComponent<{
  size?: number | string
}>

export declare const FacetSkeleton: DefineComponent<{
  width?: string
  height?: string
  radius?: string
}>

export declare const FacetCheckbox: DefineComponent<{
  modelValue?: boolean
  label?: string
  disabled?: boolean
}>

export declare const FacetRadioGroup: DefineComponent<{
  modelValue?: string | number
  options: SelectOption[]
  disabled?: boolean
}>
