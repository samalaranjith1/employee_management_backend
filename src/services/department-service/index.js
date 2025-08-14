import { useApiQuery, useApiMutation } from "../apiHooks";

export function useDepartment(id, params) {
  return useApiQuery({
    key: ["departments", id, params],
    endpoint: `/departments/${id}`,
    params,
  });
}

// Summary
export function useDepartmentSummary(id, params) {
  return useApiQuery({
    key: ["departments", id, "summary", params],
    endpoint: `/departments/${id}/summary`,
    params,
  });
}

export function useDepartmentSummaryWeekly(id, params) {
  return useApiQuery({
    key: ["departments", id, "summary-weekly", params],
    endpoint: `/departments/${id}/summary/weekly`,
    params,
  });
}

export function useDepartmentSummaryMonthly(id, params) {
  return useApiQuery({
    key: ["departments", id, "summary-monthly", params],
    endpoint: `/departments/${id}/summary/monthly`,
    params,
  });
}

export function useDepartmentSummaryDaily(id, params) {
  return useApiQuery({
    key: ["departments", id, "summary-daily", params],
    endpoint: `/departments/${id}/summary/daily`,
    params,
  });
}

// Usage List
export function useDepartmentsUsageList(params) {
  return useApiQuery({
    key: ["departments-usage-list", params],
    endpoint: `/departments/usage/list`,
    params,
  });
}

// Refresh All
export function useDepartmentsRefreshAll(params) {
  return useApiQuery({
    key: ["departments-refreshall", params],
    endpoint: `/departments/refreshall`,
    params,
  });
}

// List
export function useDepartmentsList(params) {
  return useApiQuery({
    key: ["departments-list", params],
    endpoint: `/departments/list`,
    params,
  });
}

// Consumption List
export function useDepartmentsConsumptionList(params) {
  return useApiQuery({
    key: ["departments-consumption-list", params],
    endpoint: `/departments/consumption/list`,
    params,
  });
}

// Consumption Daily Trend
export function useDepartmentsConsumptionDailyTrend(params) {
  return useApiQuery({
    key: ["departments-consumption-daily-trend", params],
    endpoint: `/departments/consumption/daily/trend`,
    params,
  });
}

// Consumption Closing List
export function useDepartmentsConsumptionClosingList(params) {
  return useApiQuery({
    key: ["departments-consumption-closing-list", params],
    endpoint: `/departments/consumption/closing/list`,
    params,
  });
}

// Budget of Day
export function useDepartmentsBudgetOfDay(params) {
  return useApiQuery({
    key: ["departments-budgetofday", params],
    endpoint: `/departments/budgetofday`,
    params,
  });
}

// Budget Daily List
export function useDepartmentsBudgetDailyList(params) {
  return useApiQuery({
    key: ["departments-budget-daily-list", params],
    endpoint: `/departments/budget/daily/list`,
    params,
  });
}

// All
export function useDepartmentsAll(params) {
  return useApiQuery({
    key: ["departments-all", params],
    endpoint: `/departments/all`,
    params,
  });
}

// ===================== WRITE =====================

// Upsert Department
export function useUpsertDepartment() {
  return useApiMutation({
    method: "post",
    endpoint: `/departments/upsert`,
    options: {
      invalidateKeys: [["departments-list"], ["departments-all"]],
    },
  });
}

// Delete Department
export function useDeleteDepartment() {
  return useApiMutation({
    method: "post",
    endpoint: `/departments/delete`,
    options: {
      invalidateKeys: [["departments-list"], ["departments-all"]],
    },
  });
}
