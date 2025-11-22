// hooks/useHealthProbe.js
import { useApiQuery } from "../apiHooks";

// ----------- GET HOOKS -----------

export function useHealthPing(params) {
  return useApiQuery({
    key: ["healthprobe", "ping", params],
    endpoint: `/healthprobe/ping`,
    params,
  });
}
