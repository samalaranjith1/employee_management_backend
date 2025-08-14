import { useApiQuery, useApiMutation } from "../apiHooks";

export function useInvoice(id, params) {
  return useApiQuery({
    key: ["invoices", id, params],
    endpoint: `/invoices/${id}`,
    params,
  });
}

// Invoices List
export function useInvoicesList(params) {
  return useApiQuery({
    key: ["invoices-list", params],
    endpoint: `/invoices/list`,
    params,
  });
}

// ===================== WRITE =====================

// Upsert Invoice
export function useUpsertInvoice() {
  return useApiMutation({
    method: "post",
    endpoint: `/invoices/upsert`,
    options: {
      invalidateKeys: [["invoices-list"]],
    },
  });
}

// Delete Invoice
export function useDeleteInvoice() {
  return useApiMutation({
    method: "post",
    endpoint: `/invoices/delete`,
    options: {
      invalidateKeys: [["invoices-list"]],
    },
  });
}
