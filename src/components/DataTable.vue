<script setup lang="ts">
import { computed } from "vue";

interface Props {
  columns: { key: string; label: string }[];
  items: any[];
  loading: boolean;
  emptyText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  emptyText: "No data found",
});

const skeletonRows = computed(() => props.items.length || 10);
</script>

<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">
            {{ col.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-if="loading">
          <tr v-for="n in skeletonRows" :key="'skeleton-' + n">
            <td colspan="3" class="skeleton-cell">
              <div class="skeleton"></div>
            </td>
          </tr>
        </template>

        <template v-else>
          <tr v-for="(item, index) in items" :key="index" v-memo="[item]">
            <td v-for="col in columns" :key="col.key">
              <slot :name="col.key" :item="item">
                {{ item[col.key] }}
              </slot>
            </td>
          </tr>

          <tr v-if="!items.length">
            <td :colspan="columns.length" class="empty">
              {{ emptyText }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; /* 🔥 important */
}

.table th,
.table td {
  padding: 10px 8px;
  border-bottom: 1px solid #f2f2f2;
  word-wrap: break-word;
}

.table th {
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}

.skeleton-cell {
  padding: 0;
}

.skeleton {
  width: 100%;
  height: 18px;
  background: #e5e5e5;
  border-radius: 4px;
  animation: pulse 1.2s ease-in-out infinite;
  margin: 4px 1px;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.empty {
  text-align: center;
  padding: 20px;
  color: #888;
}
</style>
