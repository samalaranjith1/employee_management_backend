// hooks/useSuppliers.js
import { useApiQuery, useApiMutation } from "../apiHooks";

// ----------- GET HOOKS -----------

export function useSupplier(id, params) {
  return useApiQuery({
    key: ["suppliers", id, params],
    endpoint: `/suppliers/${id}`,
    params,
    enabled: !!id,
  });
}

export function useSupplierDues(params) {
  return useApiQuery({
    key: ["suppliers", "dues", params],
    endpoint: `/suppliers/dues`,
    params,
  });
}
export function useSupplierSummary(id, params) {
  return useApiQuery({
    key: ["suppliers", id, "summary", params],
    endpoint: `/suppliers/${id}/summary`,
    params,
    enabled: !!id,
  });
}

export function useSupplierSummaryWeekly(id, params) {
  return useApiQuery({
    key: ["suppliers", id, "summary", "weekly", params],
    endpoint: `/suppliers/${id}/summary/weekly`,
    params,
    enabled: !!id,
  });
}

export function useSupplierSummaryMonthly(id, params) {
  return useApiQuery({
    key: ["suppliers", id, "summary", "monthly", params],
    endpoint: `/suppliers/${id}/summary/monthly`,
    params,
    enabled: !!id,
  });
}

export function useSupplierSummaryDaily(id, params) {
  return useApiQuery({
    key: ["suppliers", id, "summary", "daily", params],
    endpoint: `/suppliers/${id}/summary/daily`,
    params,
    enabled: !!id,
  });
}

export function useSupplierSummarySameDay(id, params) {
  return useApiQuery({
    key: ["suppliers", id, "summary", "daily", params],
    endpoint: `/suppliers/${id}/summary/sameday`,
    params,
    enabled: !!id,
  });
}

export function useSuppliersUsage(params) {
  return useApiQuery({
    key: ["suppliers", "usage", params],
    endpoint: `/suppliers/usage`,
    params,
  });
}

export function useSuppliersUsageMTD(params) {
  return useApiQuery({
    key: ["suppliers", "usage", "mtd", params],
    endpoint: `/suppliers/usage/mtd`,
    params,
  });
}

export function useSuppliersUsageItemPurchase(params) {
  return useApiQuery({
    key: ["suppliers", "usage", "itempurchase", params],
    endpoint: `/suppliers/usage/itempurchase`,
    params,
  });
}

export function useSuppliersRefreshAll(params) {
  return useApiQuery({
    key: ["suppliers", "refreshall", params],
    endpoint: `/suppliers/refreshall`,
    params,
  });
}

export function useSuppliersPaymentsList(params) {
  return useApiQuery({
    key: ["suppliers", "payments", "list", params],
    endpoint: `/suppliers/payments/list`,
    params,
  });
}

export function useSuppliersPaymentHistory(params) {
  return useApiQuery({
    key: ["suppliers", "payment", "history", params],
    endpoint: `/suppliers/payment/history`,
    params,
  });
}

export function useSuppliersList(params) {
  return useApiQuery({
    key: ["suppliers", "list", params],
    endpoint: `/suppliers/list`,
    params,
  });
}

export function useSuppliersExpensesList(params) {
  return useApiQuery({
    key: ["suppliers", "expenses", "list", params],
    endpoint: `/suppliers/expenses/list`,
    params,
  });
}

export function useSuppliersExpenseHistory(params) {
  return useApiQuery({
    key: ["suppliers", "expense", "history", params],
    endpoint: `/suppliers/expense/history`,
    params,
  });
}

export function useSuppliersAll(params) {
  return useApiQuery({
    key: ["suppliers", "all", params],
    endpoint: `/suppliers/all`,
    params,
  });
}

// ----------- POST HOOKS -----------

export function useUpsertSupplier() {
  return useApiMutation({
    method: "post",
    endpoint: `/suppliers/upsert`,
    options: {
      invalidateKeys: [["suppliers"]],
    },
  });
}

export function useUpsertSupplierPayment() {
  return useApiMutation({
    method: "post",
    endpoint: `/suppliers/payment/upsert`,
    options: {
      invalidateKeys: [["suppliers", "payments"]],
    },
  });
}

export function useUpsertSupplierPaymentList() {
  return useApiMutation({
    method: "post",
    endpoint: `/suppliers/payment/upsert/list`,
    options: {
      invalidateKeys: [["suppliers", "payments"]],
    },
  });
}

export function useDeleteSupplierPayment() {
  return useApiMutation({
    method: "post",
    endpoint: `/suppliers/payment/delete`,
    options: {
      invalidateKeys: [["suppliers", "payments"]],
    },
  });
}

export function useUpsertSupplierExpense() {
  return useApiMutation({
    method: "post",
    endpoint: `/suppliers/expense/upsert`,
    options: {
      invalidateKeys: [["suppliers", "expenses"]],
    },
  });
}

export function useDeleteSupplierExpense() {
  return useApiMutation({
    method: "post",
    endpoint: `/suppliers/expense/delete`,
    options: {
      invalidateKeys: [["suppliers", "expenses"]],
    },
  });
}

export function useDeleteSupplier() {
  return useApiMutation({
    method: "post",
    endpoint: `/suppliers/delete`,
    options: {
      invalidateKeys: [["suppliers"]],
    },
  });
}
