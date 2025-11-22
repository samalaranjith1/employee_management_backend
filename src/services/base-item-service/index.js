import { useApiQuery, useApiMutation } from "../apiHooks";

export function useBaseItem(id, params) {
  return useApiQuery({
    key: ["baseItem", id, params],
    endpoint: `baseitems/${id}`,
    params,
  });
}

// Get Ingredients for a Base Item
export function useBaseItemIngredients(id, params) {
  return useApiQuery({
    key: ["baseItemIngredients", id, params],
    endpoint: `baseitems/${id}/ingredients`,
    params,
  });
}

// Purchase History
export function useBaseItemPurchaseHistory(params) {
  return useApiQuery({
    key: ["baseItemPurchaseHistory", params],
    endpoint: `baseitems/purchase/history`,
    params,
  });
}

// List Base Items
export function useBaseItemList(params) {
  return useApiQuery({
    key: ["baseItemList", params],
    endpoint: `baseitems/list`,
    params,
  });
}

/* ========================
   POST (Mutations)
   ======================== */

// Delete Ingredients from Base Item
export function useDeleteBaseItemIngredients(id) {
  return useApiMutation({
    method: "post",
    endpoint: `baseitems/${id}/ingredients/delete`,
    options: {
      invalidateKeys: [["baseItemIngredients", id]],
    },
  });
}

// Upsert Purchase
export function useUpsertBaseItemPurchase() {
  return useApiMutation({
    method: "post",
    endpoint: `baseitems/purchase/upsert`,
    options: {
      invalidateKeys: [["baseItemPurchaseHistory"]],
    },
  });
}

// Delete Purchase
export function useDeleteBaseItemPurchase() {
  return useApiMutation({
    method: "post",
    endpoint: `baseitems/purchase/delete`,
    options: {
      invalidateKeys: [["baseItemPurchaseHistory"]],
    },
  });
}

// Upsert Ingredients
export function useUpsertBaseItemIngredients() {
  return useApiMutation({
    method: "post",
    endpoint: `baseitems/ingredients/upsert`,
    options: {
      invalidateKeys: [["baseItemIngredients"]],
    },
  });
}
