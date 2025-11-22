// hooks/useMasterProducts.js
import { useApiQuery, useApiMutation } from "../apiHooks";

// Get a single master product by ID
export function useMasterProduct(id, params) {
  return useApiQuery({
    key: ["masterproducts", id, params],
    endpoint: `/masterproducts/${id}`,
    params,
  });
}

// Get summary
export function useMasterProductSummary(id, params) {
  return useApiQuery({
    key: ["masterproducts", id, "summary", params],
    endpoint: `/masterproducts/${id}/summary`,
    params,
  });
}

export function useMasterProductSummaryWeekly(id, params) {
  return useApiQuery({
    key: ["masterproducts", id, "summary-weekly", params],
    endpoint: `/masterproducts/${id}/summary/weekly`,
    params,
  });
}

export function useMasterProductSummaryMonthly(id, params) {
  return useApiQuery({
    key: ["masterproducts", id, "summary-monthly", params],
    endpoint: `/masterproducts/${id}/summary/monthly`,
    params,
  });
}

export function useMasterProductSummaryDaily(id, params) {
  return useApiQuery({
    key: ["masterproducts", id, "summary-daily", params],
    endpoint: `/masterproducts/${id}/summary/daily`,
    params,
  });
}

export function useMasterProductSalesForecast(id, params) {
  return useApiQuery({
    key: ["masterproducts", id, "salesforecast", params],
    endpoint: `/masterproducts/${id}/salesforecast`,
    params,
  });
}

export function useMasterProductProducts(id, params) {
  return useApiQuery({
    key: ["masterproducts", id, "products", params],
    endpoint: `/masterproducts/${id}/products`,
    params,
  });
}

export function useTopSellingMasterProducts(params) {
  return useApiQuery({
    key: ["masterproducts", "topselling", params],
    endpoint: `/masterproducts/topselling/list`,
    params,
  });
}

export function useMasterProductsRefreshAll(params) {
  return useApiQuery({
    key: ["masterproducts", "refreshall", params],
    endpoint: `/masterproducts/refreshall`,
    params,
  });
}

export function useMasterProductsList(params) {
  return useApiQuery({
    key: ["masterproducts", "list", params],
    endpoint: `/masterproducts/list`,
    params,
  });
}

export function useMasterProductsAll(params) {
  return useApiQuery({
    key: ["masterproducts", "all", params],
    endpoint: `/masterproducts/all`,
    params,
  });
}

// ----------- POST HOOKS -----------

export function useUpsertMasterProduct() {
  return useApiMutation({
    method: "post",
    endpoint: `/masterproducts/upsert`,
    options: {
      invalidateKeys: [["masterproducts"]],
    },
  });
}

export function useDeleteMasterProduct() {
  return useApiMutation({
    method: "post",
    endpoint: `/masterproducts/delete`,
    options: {
      invalidateKeys: [["masterproducts"]],
    },
  });
}
