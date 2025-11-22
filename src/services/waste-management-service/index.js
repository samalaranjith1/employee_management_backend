import { useApiQuery, useApiMutation } from "../apiHooks";

// Waste Summary
export function useWasteSummary(params) {
  return useApiQuery({
    key: ["wasteSummary", params],
    endpoint: "waste/summary",
    params,
  });
}