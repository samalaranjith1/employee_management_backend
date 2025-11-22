import { useApiQuery, useApiMutation } from "../apiHooks";

export function useCustomer(id, params) {
  return useApiQuery({
    key: ["customer", id, params],
    endpoint: `customers/${id}`,
    params,
  });
}

// Refresh All Customers
export function useRefreshAllCustomers(params) {
  return useApiQuery({
    key: ["customersRefreshAll", params],
    endpoint: `customers/refreshall`,
    params,
  });
}

// List Customers
export function useCustomerList(params) {
  return useApiQuery({
    key: ["customerList", params],
    endpoint: `customers/list`,
    params,
  });
}

// All Customers (probably for dropdowns or full lists)
export function useAllCustomers(params) {
  return useApiQuery({
    key: ["allCustomers", params],
    endpoint: `customers/all`,
    params,
  });
}

/* ========================
   POST (Mutations)
   ======================== */

// Upsert Customer
export function useUpsertCustomer() {
  return useApiMutation({
    method: "post",
    endpoint: `customers/upsert`,
    options: {
      invalidateKeys: [["customerList"], ["allCustomers"]],
    },
  });
}

// Delete Customer
export function useDeleteCustomer() {
  return useApiMutation({
    method: "post",
    endpoint: `customers/delete`,
    options: {
      invalidateKeys: [["customerList"], ["allCustomers"]],
    },
  });
}
