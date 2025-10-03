"use client"
// hooks/useServiceMutation.js
import { getItem, setItem } from "@/utils/secureIdb";
import {
  useMutation,
  useQueryClient,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
// import axios from "./axiosInstance";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const basePath = "https://flavourheaven.in/costonomy-services/";

// export function useApiQuery({
//   key,
//   endpoint,
//   params = {},
//   config = {},
//   options = {},
// }) {
//   const queryClient = useQueryClient();

//   // Use full JSON string of params in stableKey for deep change detection
//   const stableKey = useMemo(
//     () => [...key, JSON.stringify(params)],
//     [key, params]
//   );

//   const cacheKey = stableKey.join("|"); // Or JSON.stringify(stableKey)

//   const [initialData, setInitialData] = useState();

//   useEffect(() => {
//     let mounted = true;
//     getItem(cacheKey).then((data) => {
//       if (mounted && data) setInitialData(data);
//     });
//     return () => {
//       mounted = false;
//     };
//   }, [cacheKey]);

//   return useQuery({
//     queryKey: stableKey,
//     queryFn: async () => {
//       const { data } = await axios.get(`${basePath}${endpoint}`, {
//         params,
//         ...config,
//       });
//       if (typeof window !== "undefined") await setItem(cacheKey, data);
//       return data;
//     },
//     initialData,
//     staleTime: 1000 * 60 * 20,
//     cacheTime: 1000 * 60 * 30,
//     refetchOnMount: "always",
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     retry: false,
//     ...options,
//   });
// }

// below version is with out any storage working perfectly
// export function useApiQuery({
//   key, // Array query key
//   endpoint, // API endpoint string
//   params = {}, // URL params
//   config = {}, // axios config (headers, etc.)
//   options = {}, // React Query options (select, enabled, etc.)
// }) {
//   return useQuery({
//     queryKey: key,
//     queryFn: async () => {
//       const { data } = await axios.get(`${basePath}${endpoint}`, {
//         params,
//         ...config,
//       });
//       return data;
//     },
//     ...options,
//   });
// }
export function useApiQuery({
  key, // Array query key
  endpoint, // API endpoint string
  params = {}, // URL params
  config = {}, // axios config (headers, etc.)
  options = {}, // React Query options (select, enabled, etc.)
}) {
  return useQuery({
    queryKey: [...key, params], // include params in the key to trigger refetch
    queryFn: async () => {
      const { data } = await axios.get(`${basePath}${endpoint}`, {
        params,
        ...config,
      });
      return data;
    },
    staleTime: 300000, // 5 minutes
    cacheTime: 600000, // 10 minutes
    refetchOnWindowFocus: true, // Refetch on window focus
    keepPreviousData: true, // ✅ Prevents UI flicker when params change
    ...options,
  });
}

//working for the first time later they are not working
//  export function useApiQuery({
//   key,
//   endpoint,
//   params = {},
//   config = {},
//   options = {},
// }) {
//   const queryClient = useQueryClient();

//   // Deep memoize all params (not just certain keys)
//   const memoParams = useMemo(() => ({ ...params }), [JSON.stringify(params)]);

//   // Stable key: must include all param values for reactivity
//   const stableKey = useMemo(
//     () => [...key, ...Object.values(memoParams)],
//     [key, memoParams]
//   );

//   const cacheKey = JSON.stringify(stableKey);

//   const [initialData, setInitialData] = useState(undefined);

//   // Load cached data from IndexedDB on mount
//   useEffect(() => {
//     let mounted = true;
//     getItem(cacheKey).then((data) => {
//       if (mounted && data) setInitialData(data);
//     });
//     return () => {
//       mounted = false;
//     };
//   }, [cacheKey]);

//   return useQuery({
//     queryKey: stableKey,
//     queryFn: async () => {
//       const { data } = await axios.get(`${basePath}${endpoint}`, {
//         params: memoParams,
//         ...config,
//       });
//       if (typeof window !== "undefined") await setItem(cacheKey, data);
//       return data;
//     },
//     initialData, // synchronous
//     staleTime: 1000 * 60 * 20,
//     cacheTime: 1000 * 60 * 30,
//     refetchOnMount: "always",
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     retry: false,
//     ...options,
//   });
// }

// export function useApiQuery({
//   key,
//   endpoint,
//   params = {},
//   config = {},
//   options = {},
// }) {
//   console.log(params,'ramarama params');
//   console.log(config, "ramarama configarams");
//   console.log(options, "ramarama options");

//   const queryClient = useQueryClient();
//   const stableKey = [...key, JSON.stringify(params)];
//   const cacheKey = JSON.stringify(stableKey);

//   const [initialData, setInitialData] = useState(undefined);

//   // Load cached data from IndexedDB on mount
//   useEffect(() => {
//     let mounted = true;
//     getItem(cacheKey).then((data) => {
//       if (mounted && data) setInitialData(data);
//     });
//     return () => {
//       mounted = false;
//     };
//   }, [cacheKey]);

//   return useQuery({
//     queryKey: stableKey,
//     queryFn: async () => {
//       const { data } = await axios.get(`${basePath}${endpoint}`, {
//         params,
//         ...config,
//       });
//       setItem(cacheKey, data); // encrypt + store
//       return data;
//     },
//     initialData,
//     staleTime: 1000 * 60 * 20, // 20 min
//     cacheTime: 1000 * 60 * 30, // 30 min
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     retry: false,
//     ...options,
//   });
// }
// export function useApiQuery({
//   key,
//   endpoint,
//   params = {},
//   config = {},
//   options = {},
// }) {
//   const queryClient = useQueryClient();
//   const stableKey = [...key, JSON.stringify(params)];

//   // Try to get cached data from localStorage
//   const cachedDataKey = JSON.stringify(stableKey);
//   const localStorageData =
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem(cachedDataKey) || "null")
//       : null;

//   return useQuery({
//     queryKey: stableKey,
//     queryFn: async () => {
//       const { data } = await axios.get(`${basePath}${endpoint}`, {
//         params,
//         ...config,
//       });
//       if (typeof window !== "undefined") {
//         localStorage.setItem(cachedDataKey, JSON.stringify(data));
//       }
//       return data;
//     },
//     initialData: localStorageData ?? undefined,
//     staleTime: 1000 * 60 * 20, // 30 min
//     cacheTime: 1000 * 60 * 30, // 1 hour
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//     keepPreviousData: true,
//     retry: false,
//     ...options,
//   });
// }
// Generic Mutation hook (POST, PUT, PATCH, DELETE)
export function useApiMutation({
  method, // "post", "put", "patch", "delete"
  endpoint, // API endpoint string
  config = {}, // axios config
  options = {}, // React Query options
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const axiosConfig = { url: `${basePath}${endpoint}`, method, ...config };

      // GET/DELETE send payload as params, POST/PUT/PATCH send as data
      if (method === "get" || method === "delete") {
        axiosConfig.params = payload;
      } else {
        axiosConfig.data = payload;
      }

      const { data } = await axios(axiosConfig);
      return data;
    },
    onSuccess: (data, variables, context) => {
      if (options.invalidateKeys) {
        options.invalidateKeys.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: key })
        );
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
}

// export function useServiceMutation(method, options = {}) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ endpoint, payload }) => {
//       const { data } = await axios({
//         url: `${basePath}${endpoint}`,
//         method,
//         data: payload,
//       });
//       return data;
//     },
//     onSuccess: (data, variables, context) => {
//       if (options.invalidateKeys) {
//         options.invalidateKeys.forEach((key) => {
//           queryClient.invalidateQueries({ queryKey: [key] });
//         });
//       }
//       if (options.onSuccess) {
//         options.onSuccess(data, variables, context);
//       }
//     },
//     ...options,
//   });
// }

// export function useOutletServiceQuery(endpoint) {
//   return useQuery({
//     queryKey: [endpoint],
//     queryFn: async () => {
//       const { data } = await axios.get(`${basePath}${endpoint}`);
//       return data;
//     },
//     // ...options,
//   });
// }

// import { useServiceMutation } from "@/hooks/useServiceMutation";

// export default function CreateUser() {
//   const createUserMutation = useServiceMutation("/api/users", "POST", {
//     invalidateKeys: ["users"], // Refresh users list after creation
//     onSuccess: () => {
//     },
//   });

//   const handleCreate = () => {
//     createUserMutation.mutate({
//       endpoint: "", // No extra endpoint
//       payload: { name: "John Doe", email: "john@example.com" },
//     });
//   };

//   return (
//     <button onClick={handleCreate} disabled={createUserMutation.isLoading}>
//       Create User
//     </button>
//   );
// }
