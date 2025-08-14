// hooks/useSales.js
import { useApiQuery, useApiMutation } from "../apiHooks";

export function useSalesProductsDailyList(params) {
  return useApiQuery({
    key: ["sales", "products", "daily", "list", params],
    endpoint: `/sales/products/daily/list`,
    params,
  });
}

export function useSalesHourly(params) {
  return useApiQuery({
    key: ["sales", "hourly", params],
    endpoint: `/sales/hourly`,
    params,
  });
}

// ----------- POST HOOKS -----------

export function useUploadSales() {
  return useApiMutation({
    method: "post",
    endpoint: `/sales/upload`,
    options: {
      invalidateKeys: [["sales"]],
    },
  });
}
