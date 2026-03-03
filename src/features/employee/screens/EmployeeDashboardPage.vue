<script setup lang="ts">
import { onMounted } from "vue";
import { useEmployeeStore } from "../stores/employee";
import EmployeeTable from "../components/EmployeeTable.vue";

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
</script>

<template>
  <EmployeeTable
    :employees="store.employees"
    :loading="store.loading"
    :pagination="store.pagination"
    @search="handleSearch"
    @changePage="handlePageChange"
  />
</template>
