// hooks/useProducts.js
import { useApiQuery, useApiMutation } from "../apiHooks";

// Single product
export function useProduct(id, params) {
  return useApiQuery({
    key: ["products", id, params],
    endpoint: `/products/${id}`,
    params,
  });
}

export function useProductSummary(id, params) {
  return useApiQuery({
    key: ["products", id, "summary", params],
    endpoint: `/products/${id}/summary`,
    params,
  });
}

export function useProductSummaryWeekly(id, params) {
  return useApiQuery({
    key: ["products", id, "summary-weekly", params],
    endpoint: `/products/${id}/summary/weekly`,
    params,
  });
}

export function useProductSummaryMonthly(id, params) {
  return useApiQuery({
    key: ["products", id, "summary-monthly", params],
    endpoint: `/products/${id}/summary/monthly`,
    params,
  });
}

export function useProductSummaryDaily(id, params) {
  return useApiQuery({
    key: ["products", id, "summary-daily", params],
    endpoint: `/products/${id}/summary/daily`,
    params,
  });
}
export function useProductSummarySameDay(id, params) {
  return useApiQuery({
    key: ["products", id, "summary-daily", params],
    endpoint: `/products/${id}/summary/sameday`,
    params,
  });
}

export function useProductSalesForecastOfDay(id, params) {
  return useApiQuery({
    key: ["products", id, "salesforecastofday", params],
    endpoint: `/products/${id}/salesforecastofday`,
    params,
  });
}

export function useProductSalesForecast(id, params) {
  return useApiQuery({
    key: ["products", id, "salesforecast", params],
    endpoint: `/products/${id}/salesforecast`,
    params,
  });
}

export function useProductRefresh(id, params) {
  return useApiQuery({
    key: ["products", id, "refresh", params],
    endpoint: `/products/${id}/refresh`,
    params,
  });
}

export function useProductIngredients(id, params) {
  return useApiQuery({
    key: ["products", id, "ingredients", params],
    endpoint: `/products/${id}/ingredients`,
    params,
  });
}
export function useProductIngredientsUsage(id, params) {
  return useApiQuery({
    key: ["products", id, "ingredients", params],
    endpoint: `/products/${id}/ingredients/usage`,
    params,
  });
}
export function useProductDirectIngredients(id, params) {
  return useApiQuery({
    key: ["products", id, "directingredients", params],
    endpoint: `/products/${id}/directingredients`,
    params,
  });
}

// Lists
export function useProductsUsageList(params) {
  return useApiQuery({
    key: ["products", "usage", "list", params],
    endpoint: `/products/usage/list`,
    params,
  });
}

export function useProductsSalesForecastList(params) {
  return useApiQuery({
    key: ["products", "salesforecast", "list", params],
    endpoint: `/products/salesforecast/list`,
    params,
  });
}

export function useProductsSalesDistribution(params) {
  return useApiQuery({
    key: ["products", "sales", "distribution", params],
    endpoint: `/products/sales/distribution`,
    params,
  });
}

export function useProductsSalesBucketList(id, params) {
  return useApiQuery({
    key: ["products", "sales", "bucket", id, "list", params],
    endpoint: `/products/sales/bucket/${id}/list`,
    params,
  });
}

export function useProductsRefreshAll(params) {
  return useApiQuery({
    key: ["products", "refreshall", params],
    endpoint: `/products/refreshall`,
    params,
  });
}

export function useProductsRecipesSummary(params) {
  return useApiQuery({
    key: ["products", "recipes", "summary", params],
    endpoint: `/products/recipes/summary`,
    params,
  });
}

export function useProductsMakingCostList(params) {
  return useApiQuery({
    key: ["products", "makingcost", "list", params],
    endpoint: `/products/makingcost/list`,
    params,
  });
}

export function useProductsList(params) {
  return useApiQuery({
    key: ["products", "list", params],
    endpoint: `/products/list`,
    params,
  });
}

export function useProductsAll(params) {
  return useApiQuery({
    key: ["products", "all", params],
    endpoint: `/products/all`,
    params,
  });
}

// ----------- POST HOOKS -----------

export function useDeleteProductIngredients(id) {
  return useApiMutation({
    method: "post",
    endpoint: `/products/${id}/ingredients/delete`,
    options: {
      invalidateKeys: [["products", id, "ingredients"]],
    },
  });
}

export function useUpsertProduct() {
  return useApiMutation({
    method: "post",
    endpoint: `/products/upsert`,
    options: {
      invalidateKeys: [["products"]],
    },
  });
}

export function useUpsertProductIngredients() {
  return useApiMutation({
    method: "post",
    endpoint: `/products/ingredients/upsert`,
    options: {
      invalidateKeys: [["products"]],
    },
  });
}

export function useDeleteProduct() {
  return useApiMutation({
    method: "post",
    endpoint: `/products/delete`,
    options: {
      invalidateKeys: [["products"]],
    },
  });
}
