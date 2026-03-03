<script setup lang="ts">
import { onMounted } from "vue";

import { useEmployeeStore } from "@/features/employee/stores/employee";
import { usePermission } from "@/composables/usePermisson";

import EmployeeTable from "@/features/employee/components/EmployeeTable.vue";
import Button from "@/components/Button.vue";

const store = useEmployeeStore();

onMounted(() => {
  store.getEmployees("", 1);
});

const handleSearch = (value: string) => {
  store.getEmployees(value, 1);
};

const handlePageChange = (page: number) => {
  store.getEmployees("", page);
};

const { can, canAny, canAll } = usePermission();
</script>

<template>
  <Button v-if="can('employee.add')">Add Employee</Button>
  <Button v-if="canAll(['employee.add', 'employee.assign'])"
    >Add and Assign Employee</Button
  >
  <EmployeeTable
    v-if="canAny(['employee.view', 'employee.update', 'employee.delete'])"
    :employees="store.employees"
    :loading="store.loading"
    :pagination="store.pagination"
    @search="handleSearch"
    @changePage="handlePageChange"
  />
</template>
