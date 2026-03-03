<script setup lang="ts">
import { ref, computed } from "vue";

import type { Employee, Pagination } from "@/features/employee/types/employee";

import { employeeTableColumns } from "@/features/employee/utils/constants";

import SearchInput from "@/components/SearchInput.vue";
import DataTable from "@/components/DataTable.vue";
import Button from "@/components/Button.vue";

interface Props {
  employees: Employee[];
  loading: boolean;
  pagination: Pagination;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "changePage", page: number): void;
  (e: "search", value: string): void;
}>();

const search = ref("");

const formattedEmployees = computed(() =>
  props.employees?.map((employee: Employee) => ({
    ...employee,
    name: `${employee.first_name} ${employee.last_name}`,
  })),
);
</script>

<template>
  <div>
    <SearchInput v-model="search" @update:modelValue="emit('search', $event)" />

    <DataTable
      :columns="employeeTableColumns"
      :items="formattedEmployees"
      :loading="loading"
    />

    <div v-if="pagination.total_pages > 1" class="pagination">
      <Button
        v-memo="[pagination.page]"
        variant="secondary"
        :disabled="pagination.page === 1"
        @click="emit('changePage', pagination.page - 1)"
      >
        Prev
      </Button>

      <span> Page {{ pagination.page }} of {{ pagination.total_pages }} </span>

      <Button
        v-memo="[pagination.page]"
        variant="secondary"
        :disabled="pagination.page === pagination.total_pages"
        @click="emit('changePage', pagination.page + 1)"
      >
        Next
      </Button>
    </div>
  </div>
</template>
