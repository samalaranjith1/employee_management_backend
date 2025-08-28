import { useApiQuery, useApiMutation } from "../apiHooks";


export function useItem(id, params) {
  return useApiQuery({
    key: ["item", id, params],
    endpoint: `/items/${id}`,
    params,
  });
}

// Summaries
export function useItemSummary(id, params) {
  return useApiQuery({
    key: ["item-summary", id, params],
    endpoint: `/items/${id}/summary`,
    params,
  });
}
export function useItemSummaryWeekly(id, params) {
  return useApiQuery({
    key: ["item-summary-weekly", id, params],
    endpoint: `/items/${id}/summary/weekly`,
    params,
  });
}
export function useItemSummaryMonthly(id, params) {
  return useApiQuery({
    key: ["item-summary-monthly", id, params],
    endpoint: `/items/${id}/summary/monthly`,
    params,
  });
}
export function useItemSummaryDaily(id, params) {
  return useApiQuery({
    key: ["item-summary-daily", id, params],
    endpoint: `/items/${id}/summary/daily`,
    params,
  });
}

// Products for Item
export function useItemProductsList(id, params) {
  return useApiQuery({
    key: ["item-products", id, params],
    endpoint: `/items/${id}/products/list`,
    params,
  });
}

// Price Change
export function useItemPriceChangeHistory(id, params) {
  return useApiQuery({
    key: ["item-pricechange-history", id, params],
    endpoint: `/items/${id}/pricechange/history`,
    params,
  });
}
export function useItemsPriceChangeSummary(params) {
  return useApiQuery({
    key: ["items-pricechange-summary", params],
    endpoint: `/items/pricechange/summary`,
    params,
  });
}
export function useItemsPriceChangeRecentList(params) {
  return useApiQuery({
    key: ["items-pricechange-recent-list", params],
    endpoint: `/items/pricechange/recent/list`,
    params,
  });
}
export function useItemsPriceChangeFutureList(params) {
  return useApiQuery({
    key: ["items-pricechange-future-list", params],
    endpoint: `/items/pricechange/future/list`,
    params,
  });
}

// Leftover Stock
export function useItemLeftoverStockHistory(id, params) {
  return useApiQuery({
    key: ["item-leftoverstock-history", id, params],
    endpoint: `/items/${id}/leftoverstock/history`,
    params,
  });
}
export function useItemsLeftoverStockList(params) {
  return useApiQuery({
    key: ["items-leftoverstock-list", params],
    endpoint: `/items/leftoverstock/list`,
    params,
  });
}

// Usage
export function useItemsUsageMTD(params) {
  return useApiQuery({
    key: ["items-usage-mtd", params],
    endpoint: `/items/usage/mtd`,
    params,
  });
}
export function useItemsUsageList(params) {
  return useApiQuery({
    key: ["items-usage-list", params],
    endpoint: `/items/usage/list`,
    params,
  });
}
export function useItemsUsageListDepartments(params) {
  return useApiQuery({
    key: ["items-usage-list-departments", params],
    endpoint: `/items/usage/list/departments`,
    params,
  });
}

export function useItemsConsumptionClsoingTotal(params) {
  return useApiQuery({
    key: ["items-consumption-closing-total", params],
    endpoint: `/items/consumption/closing/total`,
    params,
  });
}

// Purchase
export function useItemsPurchaseMTDList(params) {
  return useApiQuery({
    key: ["items-purchase-mtd-list", params],
    endpoint: `/items/purchase/mtd/list`,
    params,
  });
}

export function useItemsPurchaseList(params) {
  return useApiQuery({
    key: ["items-purchase-list", params],
    endpoint: `/items/purchase/list`,
    params,
  });
}
export function useItemsPurchaseHistory(params) {
  return useApiQuery({
    key: ["items-purchase-history", params],
    endpoint: `/items/purchase/history`,
    params,
  });
}
export function useItemsPurchaseClosingHistory(params) {
  return useApiQuery({
    key: ["items-purchase-closing-history", params],
    endpoint: `/items/purchase/closing/history`,
    params,
  });
}

// Consumption
export function useItemsConsumptionList(params) {
  return useApiQuery({
    key: ["items-consumption-list", params],
    endpoint: `/items/consumption/list`,
    params,
  });
}
export function useItemsConsumptionHistory(params) {
  return useApiQuery({
    key: ["items-consumption-history", params],
    endpoint: `/items/consumption/history`,
    params,
  });
}
export function useItemsConsumptionForecastList(params) {
  return useApiQuery({
    key: ["items-consumption-forecast-list", params],
    endpoint: `/items/consumption/forecast/list`,
    params,
  });
}
export function useItemsConsumptionDistribution(params) {
  return useApiQuery({
    key: ["items-consumption-distribution", params],
    endpoint: `/items/consumption/distribution`,
    params,
  });
}
export function useItemsConsumptionDailyTrend(params) {
  return useApiQuery({
    key: ["items-consumption-daily-trend", params],
    endpoint: `/items/consumption/daily/trend`,
    params,
  });
}
export function useItemsConsumptionClosingSuggestions(params) {
  return useApiQuery({
    key: ["items-consumption-closing-suggestions", params],
    endpoint: `/items/consumption/closing/suggestions`,
    params,
  });
}
export function useItemsConsumptionClosingHistory(params) {
  return useApiQuery({
    key: ["items-consumption-closing-history", params],
    endpoint: `/items/consumption/closing/history`,
    params,
  });
}
export function useItemsConsumptionBucketList(bucketId, params) {
  return useApiQuery({
    key: ["items-consumption-bucket-list", bucketId, params],
    endpoint: `/items/consumption/bucket/${bucketId}/list`,
    params,
  });
}

// Categories & MOQ
export function useItemsCategories(params) {
  return useApiQuery({
    key: ["items-categories", params],
    endpoint: `/items/categories`,
    params,
  });
}
export function useItemsBelowMOQSummary(params) {
  return useApiQuery({
    key: ["items-belowmoq-summary", params],
    endpoint: `/items/belowmoq/summary`,
    params,
  });
}
export function useItemsBelowMOQList(params) {
  return useApiQuery({
    key: ["items-belowmoq-list", params],
    endpoint: `/items/belowmoq/list`,
    params,
  });
}
export function useItemsBelowMOQStoreItems(params) {
  return useApiQuery({
    key: ["items-belowmoq-storeitems", params],
    endpoint: `/items/belowmoq/list/storeitems`,
    params,
  });
}
export function useItemsBelowMOQBaseItems(params) {
  return useApiQuery({
    key: ["items-belowmoq-baseitems", params],
    endpoint: `/items/belowmoq/list/baseitems`,
    params,
  });
}

// All Items
export function useItemsAll(params) {
  return useApiQuery({
    key: ["items-all", params],
    endpoint: `/items/all`,
    params,
  });
}

/* ===================== WRITE ===================== */

// Core
export function useUpsertItem() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/upsert`,
    options: { invalidateKeys: [["items-list"]] },
  });
}
export function useDeleteItem() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/delete`,
    options: { invalidateKeys: [["items-list"]] },
  });
}

// Purchase
export function useUpsertItemPurchase() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/purchase/upsert`,
    options: { invalidateKeys: [["items-purchase-list"]] },
  });
}
export function useDeleteItemPurchase() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/purchase/delete`,
    options: { invalidateKeys: [["items-purchase-list"]] },
  });
}
export function useUpsertItemPurchaseClosing() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/purchase/closing/upsert`,
    options: { invalidateKeys: [["items-purchase-closing-history"]] },
  });
}
export function useDeleteItemPurchaseClosing() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/purchase/closing/delete`,
    options: { invalidateKeys: [["items-purchase-closing-history"]] },
  });
}
export function useApplyItemPurchase() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/purchase/apply`,
    options: { invalidateKeys: [["items-purchase-list"]] },
  });
}

// Consumption
export function useUpsertItemConsumption() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/consumption/upsert`,
    options: { invalidateKeys: [["items-consumption-list"]] },
  });
}
export function useDeleteItemConsumption() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/consumption/delete`,
    options: { invalidateKeys: [["items-consumption-list"]] },
  });
}
export function useUpsertItemConsumptionClosing() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/consumption/closing/upsert`,
    options: { invalidateKeys: [["items-consumption-closing-history"]] },
  });
}
export function useRecommendItemConsumptionClosing() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/consumption/closing/recommendation`,
    options: { invalidateKeys: [["items-consumption-closing-suggestions"]] },
  });
}
export function useDeleteItemConsumptionClosing() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/consumption/closing/delete`,
    options: { invalidateKeys: [["items-consumption-closing-history"]] },
  });
}
export function useApplyItemConsumption() {
  return useApiMutation({
    method: "post",
    endpoint: `/items/consumption/apply`,
    options: { invalidateKeys: [["items-consumption-list"]] },
  });
}
