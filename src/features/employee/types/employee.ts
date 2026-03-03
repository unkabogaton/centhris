export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  department: string;
}

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface EmployeeResponse {
  data: Employee[];
  meta: Pagination;
}
