<script setup>
// columns: [{ key, label, align? }]   rows: [{ ...cells }]
defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
})
</script>

<template>
  <div class="ft-table-wrap">
    <table class="ft-table">
      <thead>
        <tr>
          <th
            v-for="c in columns"
            :key="c.key"
            :style="{ textAlign: c.align || 'left' }"
          >
            {{ c.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, i) in rows" :key="i">
          <td
            v-for="c in columns"
            :key="c.key"
            :style="{ textAlign: c.align || 'left' }"
          >
            <slot :name="`cell-${c.key}`" :row="r" :value="r[c.key]">{{ r[c.key] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.ft-table-wrap {
  border: 1px solid var(--ft-border);
  border-radius: var(--ft-radius);
  overflow: hidden;
  box-shadow: var(--ft-card-shadow);
  background: var(--ft-surface-base);
}
.ft-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: var(--ft-text);
}
.ft-table thead th {
  font-family: var(--ft-font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--ft-text-soft);
  background: var(--ft-surface-1);
  padding: 12px 16px;
  border-bottom: 1px solid var(--ft-border);
}
.ft-table tbody td {
  padding: 13px 16px;
  border-bottom: 1px solid var(--ft-border);
}
.ft-table tbody tr:last-child td { border-bottom: none; }
.ft-table tbody tr:hover { background: var(--ft-surface-1); }

/* Row actions: hidden until the row is hovered or keyboard-focused. */
.ft-table tbody td :deep(.ft-row-actions) {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}
.ft-table tbody tr:hover :deep(.ft-row-actions),
.ft-table tbody tr:focus-within :deep(.ft-row-actions) {
  opacity: 1;
  pointer-events: auto;
}
</style>
