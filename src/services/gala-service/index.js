import { useApiQuery, useApiMutation } from "../apiHooks";

export function useUpsertSalesEnquiry() {
  return useApiMutation({
    method: "post",
    endpoint: `/delicia-meta/upsertsalesenquiry`,
    options: {
      invalidateKeys: [], // Add any keys you want to refetch
    },
  });
}

// Upsert Gala Enquiry
export function useUpsertGalaEnquiry() {
  return useApiMutation({
    method: "post",
    endpoint: `/delicia-meta/gala/upsertenquiry`,
    options: {
      invalidateKeys: [], // Add any keys you want to refetch
    },
  });
}
