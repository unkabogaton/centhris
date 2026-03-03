import { defineStore } from "pinia";
import { ref } from "vue";
import { getEmployeesApi } from "@/features/employee/api/employee";

import type { Employee, Pagination } from "@/features/employee/types/employee";

export const useEmployeeStore = defineStore("employee", () => {
  const employees = ref<Employee[]>([]);
  const pagination = ref<Pagination>({
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 1,
  });
  const loading = ref(false);
  const error = ref<string | null>(null);

  const MAX_RETRIES = Number(import.meta.env.VITE_API_MAX_RETRIES) || 3;

  const RETRY_DELAY = Number(import.meta.env.VITE_API_RETRY_DELAY) || 800;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getEmployees = async (search = "", page = 1, perPage = 10) => {
    loading.value = true;
    error.value = null;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await getEmployeesApi(search, page, perPage);

        employees.value = response.data.data;
        pagination.value = response.data.meta;
        return;
      } catch (err: any) {
        if (attempt === MAX_RETRIES) {
          error.value =
            err?.response?.data?.message ||
            err.message ||
            "Failed to fetch employees";
        } else {
          await delay(RETRY_DELAY);
        }
      } finally {
        if (attempt === MAX_RETRIES || employees.value.length) {
          loading.value = false;
        }
      }
    }
  };

  return {
    employees,
    pagination,
    loading,
    error,
    getEmployees,
  };
});
