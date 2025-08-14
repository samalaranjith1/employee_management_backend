// hooks/useStatement.js
import { useApiQuery, useApiMutation } from "../apiHooks";

export function useStatementSummary(params) {
  return useApiQuery({
    key: ["statement", "summary", params],
    endpoint: `/statement/summary`,
    params,
  });
}

export function useStatementList(params) {
  return useApiQuery({
    key: ["statement", "list", params],
    endpoint: `/statement/list`,
    params,
  });
}

// ----------- POST HOOKS -----------

export function useUploadStatement() {
  return useApiMutation({
    method: "post",
    endpoint: `/statement/upload`,
    options: {
      invalidateKeys: [["statement"]],
    },
  });
}
