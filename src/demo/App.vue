<script setup>
import { ref } from 'vue'
import themes from '../themes.json'
import FacetButton from '../components/FacetButton.vue'
import FacetIcon from '../components/FacetIcon.vue'
import FacetIconButton from '../components/FacetIconButton.vue'
import FacetKpiCard from '../components/FacetKpiCard.vue'
import FacetChip from '../components/FacetChip.vue'
import FacetStepper from '../components/FacetStepper.vue'
import FacetTimeline from '../components/FacetTimeline.vue'
import FacetModal from '../components/FacetModal.vue'
import FacetInput from '../components/FacetInput.vue'
import FacetSelect from '../components/FacetSelect.vue'
import FacetAlert from '../components/FacetAlert.vue'
import FacetCard from '../components/FacetCard.vue'
import FacetToggle from '../components/FacetToggle.vue'
import FacetTable from '../components/FacetTable.vue'
import FacetDrawer from '../components/FacetDrawer.vue'
import FacetTabs from '../components/FacetTabs.vue'
import FacetTooltip from '../components/FacetTooltip.vue'
import FacetSpinner from '../components/FacetSpinner.vue'
import FacetSkeleton from '../components/FacetSkeleton.vue'
import FacetCheckbox from '../components/FacetCheckbox.vue'
import FacetRadioGroup from '../components/FacetRadioGroup.vue'

const theme = ref('')
function setTheme(name) {
  theme.value = name
  if (name) document.documentElement.dataset.theme = name
  else delete document.documentElement.dataset.theme
}
const presets = [
  { name: '', label: 'Facet Light' },
  { name: 'facet-dark', label: 'Facet Dark' },
  ...themes.map((t) => ({ name: t.name, label: t.label })),
]

const steps = [
  { label: 'Submitted', state: 'done' },
  { label: 'Processing', state: 'done' },
  { label: 'Registering', state: 'doing' },
  { label: 'Settled', state: 'idle' },
]
const events = [
  { when: 'Oct 2025', title: 'Promoted to developer', state: 'done', description: 'Took over the full pipeline, end to end.' },
  { when: 'Now', title: 'Shipping in production', state: 'doing', description: '538 commits, 8 product fronts.' },
  { when: 'Next', title: 'Open source', state: 'idle' },
]
const tableCols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Batch' },
  { key: 'status', label: 'Status' },
  { key: 'value', label: 'Value', align: 'right' },
  { key: 'actions', label: '', align: 'right' },
]
const tableRows = [
  { id: '#018', name: 'Receivables A', status: 'ok', value: 'R$ 1.2M' },
  { id: '#019', name: 'Receivables B', status: 'blue', value: 'R$ 880k' },
  { id: '#020', name: 'Receivables C', status: 'err', value: 'R$ 410k' },
]

const name = ref('')
const role = ref('full-stack')
const notify = ref(true)
const modalOpen = ref(false)
const dangerOpen = ref(false)
const drawerOpen = ref(false)
const tab = ref('overview')
const agree = ref(true)
const plan = ref('pro')

const swatches = ['--ft-brand', '--ft-success', '--ft-error', '--ft-info', '--ft-warn', '--ft-kpi-accent']
</script>

<template>
  <header class="hero">
    <div class="hero__inner">
      <div class="hero__bar">
        <div class="eyebrow">facet-ui · design system</div>
        <label class="picker">
          theme
          <select :value="theme" @change="setTheme($event.target.value)">
            <option v-for="p in presets" :key="p.name" :value="p.name">{{ p.label }}</option>
          </select>
        </label>
      </div>
      <h1>One token layer.<br />Twenty-one themes.</h1>
      <p class="sub">
        A small Vue 3 design system where every component reads CSS custom
        properties — so a whole palette swaps with a single <code>data-theme</code>.
      </p>
      <div class="hero__stepper"><FacetStepper :steps="steps" /></div>
    </div>
  </header>

  <main class="wrap">
    <section>
      <h2 class="lead">KPI cards</h2>
      <div class="grid">
        <FacetKpiCard label="Commits" :value="538" sub="across 2 repos" accent="total">
          <template #icon><FacetIcon name="commit" :size="20" /></template>
        </FacetKpiCard>
        <FacetKpiCard label="Lines" value="~150k" sub="added" accent="volume">
          <template #icon><FacetIcon name="code" :size="20" /></template>
        </FacetKpiCard>
        <FacetKpiCard label="Fronts" :value="8" sub="end to end" accent="accent">
          <template #icon><FacetIcon name="layers" :size="20" /></template>
        </FacetKpiCard>
        <FacetKpiCard label="Pending" :value="3" sub="in review" accent="pending">
          <template #icon><FacetIcon name="clock" :size="20" /></template>
        </FacetKpiCard>
      </div>
    </section>

    <section>
      <h2 class="lead">Buttons &amp; chips</h2>
      <div class="row">
        <FacetButton variant="primary">Primary</FacetButton>
        <FacetButton variant="ghost">Ghost</FacetButton>
        <FacetButton variant="danger">Danger</FacetButton>
        <FacetButton variant="primary" disabled>Disabled</FacetButton>
      </div>
      <div class="row" style="margin-top: 14px">
        <FacetChip variant="ok">success</FacetChip>
        <FacetChip variant="err">error</FacetChip>
        <FacetChip variant="blue">info</FacetChip>
        <FacetChip variant="grey">pending</FacetChip>
      </div>
    </section>

    <section>
      <h2 class="lead">Alerts</h2>
      <div class="stack">
        <FacetAlert variant="success" title="Registered">Batch #018 settled successfully.</FacetAlert>
        <FacetAlert variant="warn" title="Heads up">3 items are still awaiting review.</FacetAlert>
        <FacetAlert variant="error" title="Failed">Batch #020 was rejected by the registry.</FacetAlert>
      </div>
    </section>

    <section class="cols">
      <FacetCard title="Form controls">
        <div class="stack">
          <FacetInput v-model="name" label="Full name" placeholder="Jane Doe" />
          <FacetSelect
            v-model="role"
            label="Role"
            :options="[
              { value: 'full-stack', label: 'Full-stack' },
              { value: 'backend', label: 'Backend' },
              { value: 'frontend', label: 'Frontend' },
            ]"
          />
          <FacetToggle v-model="notify" label="Email notifications" />
          <div class="row">
            <FacetButton variant="primary" @click="modalOpen = true">Open modal</FacetButton>
            <FacetButton variant="danger" @click="dangerOpen = true">Delete…</FacetButton>
          </div>
        </div>
      </FacetCard>

      <FacetCard title="Timeline">
        <FacetTimeline :events="events" />
      </FacetCard>
    </section>

    <section>
      <h2 class="lead">Table</h2>
      <FacetTable :columns="tableCols" :rows="tableRows">
        <template #cell-status="{ value }">
          <FacetChip :variant="value" size="sm">{{ value === 'ok' ? 'settled' : value === 'err' ? 'rejected' : 'pending' }}</FacetChip>
        </template>
        <template #cell-actions>
          <div class="ft-row-actions">
            <FacetIconButton name="eye" title="Details" />
            <FacetIconButton name="edit" title="Edit" />
            <FacetIconButton name="trash" variant="danger" title="Delete" />
          </div>
        </template>
      </FacetTable>
    </section>

    <section class="cols">
      <FacetCard title="Tabs &amp; loading">
        <FacetTabs
          v-model="tab"
          :tabs="[
            { value: 'overview', label: 'Overview' },
            { value: 'activity', label: 'Activity' },
            { value: 'settings', label: 'Settings' },
          ]"
        />
        <div style="margin-top: var(--ft-space-4)">
          <div v-if="tab === 'overview'" class="stack">
            <FacetSkeleton width="60%" height="18px" />
            <FacetSkeleton />
            <FacetSkeleton width="80%" />
          </div>
          <div v-else-if="tab === 'activity'" class="row">
            <FacetSpinner :size="22" />
            <span style="color: var(--ft-text-soft)">Loading activity…</span>
          </div>
          <div v-else style="color: var(--ft-text-soft)">Settings panel content.</div>
        </div>
      </FacetCard>

      <FacetCard title="Selection &amp; overlays">
        <div class="stack">
          <FacetCheckbox v-model="agree" label="I agree to the terms" />
          <FacetRadioGroup
            v-model="plan"
            :options="[
              { value: 'free', label: 'Free' },
              { value: 'pro', label: 'Pro' },
              { value: 'team', label: 'Team' },
            ]"
          />
          <div class="row">
            <FacetTooltip label="Opens a side panel">
              <FacetButton variant="ghost" @click="drawerOpen = true">Open drawer</FacetButton>
            </FacetTooltip>
            <FacetTooltip label="Tooltip on a chip" placement="bottom">
              <FacetChip variant="blue">hover me</FacetChip>
            </FacetTooltip>
          </div>
        </div>
      </FacetCard>
    </section>

    <section>
      <h2 class="lead">Tokens</h2>
      <div class="grid">
        <div v-for="s in swatches" :key="s" class="swatch">
          <span class="swatch__chip" :style="{ background: `var(${s})` }" />
          <code>{{ s }}</code>
        </div>
      </div>
    </section>
  </main>

  <FacetModal v-model="modalOpen" title="Register batch" confirm-text="Register" @confirm="modalOpen = false">
    <p style="margin: 0; color: var(--ft-text-soft)">
      This sends batch <strong>#018</strong> to the receivables registry. You can track progress in the timeline.
    </p>
  </FacetModal>

  <FacetModal
    v-model="dangerOpen"
    tone="danger"
    title="Delete batch"
    confirm-text="Delete"
    @confirm="dangerOpen = false"
  >
    <p style="margin: 0; color: var(--ft-text-soft)">
      This permanently deletes batch <strong>#020</strong>. This action cannot be undone.
    </p>
  </FacetModal>

  <FacetDrawer v-model="drawerOpen" title="Batch #018">
    <div class="stack">
      <FacetAlert variant="info">Receivables batch details and registration status.</FacetAlert>
      <FacetTimeline :events="events" />
    </div>
    <template #footer>
      <FacetButton variant="ghost" @click="drawerOpen = false">Close</FacetButton>
      <FacetButton variant="primary" @click="drawerOpen = false">Register</FacetButton>
    </template>
  </FacetDrawer>
</template>

<style scoped>
.hero {
  background: var(--ft-header-grad);
  color: #fff;
  padding: 40px 28px 56px;
  border-radius: 0 0 28px 28px;
}
.hero__inner { max-width: 980px; margin: 0 auto; }
.hero__bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 26px; }
.eyebrow { font-family: var(--ft-font-mono); font-size: 12.5px; opacity: 0.85; }
.picker { font-family: var(--ft-font-mono); font-size: 12px; display: inline-flex; align-items: center; gap: 8px; }
.picker select {
  font-family: var(--ft-font-mono);
  font-size: 12.5px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}
.picker select option { color: #111; }
.hero h1 { font-family: var(--ft-font-display); font-weight: 700; font-size: clamp(30px, 5vw, 50px); line-height: 1.06; letter-spacing: -0.021em; margin: 0 0 12px; }
.hero .sub { max-width: 560px; font-size: 16px; opacity: 0.94; }
.hero .sub code { font-family: var(--ft-font-mono); font-size: 13px; background: rgba(255, 255, 255, 0.18); padding: 1px 6px; border-radius: 5px; }
.hero__stepper { margin-top: 30px; }

.wrap { max-width: 980px; margin: 0 auto; padding: 8px 28px 80px; }
section { margin-top: 44px; }
.lead { font-family: var(--ft-font-display); font-size: 12.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.045em; color: var(--ft-text-soft); margin: 0 0 18px; }
.row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
.ft-row-actions { display: inline-flex; gap: 2px; justify-content: flex-end; }
.stack { display: flex; flex-direction: column; gap: 14px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
.cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
.swatch { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: var(--ft-surface-1); border: 1px solid var(--ft-border); border-radius: 10px; }
.swatch__chip { width: 26px; height: 26px; border-radius: 7px; border: 1px solid var(--ft-border); }
.swatch code { font-family: var(--ft-font-mono); font-size: 12px; color: var(--ft-text-soft); }
</style>
