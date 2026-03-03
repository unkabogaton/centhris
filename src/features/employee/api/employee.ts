import { api } from "@/api/axios";

import type { EmployeeResponse } from "@/features/employee/types/employee";

export const getEmployeesApi = (search = "", page = 1, perPage = 10) => {
  return api.get<EmployeeResponse>("/api/employees", {
    params: {
      search,
      page,
      per_page: perPage,
    },
  });
};
