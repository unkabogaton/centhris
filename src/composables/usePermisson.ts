import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";

export const usePermission = () => {
  const authStore = useAuthStore();

  const permissionSet = computed(() => new Set(authStore.permissions));

  const can = (permissionName: string): boolean => {
    return permissionSet.value.has(permissionName);
  };

  const canAny = (list: string[]): boolean => {
    return list.some((permissionName) =>
      permissionSet.value.has(permissionName),
    );
  };

  const canAll = (list: string[]): boolean => {
    return list.every((permissionName) =>
      permissionSet.value.has(permissionName),
    );
  };

  return {
    can,
    canAny,
    canAll,
  };
};
