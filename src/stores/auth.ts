import { defineStore } from "pinia";
import { ref } from "vue";

import type { Permission } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const permissions = ref<Permission[]>([
    "employee.view",
    "employee.update",
    "employee.delete",
  ]);

  const setPermissions = (list: Permission[]) => {
    permissions.value = list;
  };

  const clearPermissions = () => {
    permissions.value = [];
  };

  return {
    permissions,
    setPermissions,
    clearPermissions,
  };
});
