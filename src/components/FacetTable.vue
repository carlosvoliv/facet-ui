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
  font-family: var(--ft-font-mono);
  font-size: 11.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
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
</style>
