import { useApiQuery, useApiMutation } from "../apiHooks";

export function useEmployee(id, params) {
  return useApiQuery({
    key: ["employees", id, params],
    endpoint: `/employees/${id}`,
    params,
  });
}

// Employee Salary
export function useEmployeeSalary(id, params) {
  return useApiQuery({
    key: ["employees", id, "salary", params],
    endpoint: `/employees/${id}/salary`,
    params,
  });
}

// Employee Payroll
export function useEmployeePayroll(id, params) {
  return useApiQuery({
    key: ["employees", id, "payroll", params],
    endpoint: `/employees/${id}/payroll`,
    params,
  });
}

// Payroll List
export function useEmployeesPayrollList(params) {
  return useApiQuery({
    key: ["employees-payroll-list", params],
    endpoint: `/employees/payroll/list`,
    params,
  });
}

// Employee List
export function useEmployeesList(params) {
  return useApiQuery({
    key: ["employees-list", params],
    endpoint: `/employees/list`,
    params,
  });
}

// Employee Leaves List
export function useEmployeesLeavesList(params) {
  return useApiQuery({
    key: ["employees-leaves-list", params],
    endpoint: `/employees/leaves/list`,
    params,
  });
}

// Employee Designations
export function useEmployeesDesignations(params) {
  return useApiQuery({
    key: ["employees-designations", params],
    endpoint: `/employees/designations`,
    params,
  });
}

// ===================== WRITE =====================

// Upsert Employee
export function useUpsertEmployee() {
  return useApiMutation({
    method: "post",
    endpoint: `/employees/upsert`,
    options: {
      invalidateKeys: [["employees-list"]],
    },
  });
}

// Upsert Employee Leave
export function useUpsertEmployeeLeave() {
  return useApiMutation({
    method: "post",
    endpoint: `/employees/leave/upsert`,
    options: {
      invalidateKeys: [["employees-leaves-list"]],
    },
  });
}
