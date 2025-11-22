import { useApiQuery, useApiMutation } from "../apiHooks";

// Waste Management Recommendations
export function useWasteManagementRecommendations(params) {
  return useApiQuery({
    key: ["recommendationsWasteManagement", params],
    endpoint: "recommendations/wastemanagement",
    params,
  });
}

// Stock Management Recommendations
export function useStockManagementRecommendations(params) {
  return useApiQuery({
    key: ["recommendationsStockManagement", params],
    endpoint: "recommendations/stockmanagement",
    params,
  });
}

// Recipe Management Recommendations
export function useRecipeManagementRecommendations(params) {
  return useApiQuery({
    key: ["recommendationsRecipeManagement", params],
    endpoint: "recommendations/recipemanagement",
    params,
  });
}

// Price Management Recommendations
export function usePriceManagementRecommendations(params) {
  return useApiQuery({
    key: ["recommendationsPriceManagement", params],
    endpoint: "recommendations/pricemanagement",
    params,
  });
}

//const { data, isLoading } = useWasteManagementRecommendations({ outletId: 5 });
