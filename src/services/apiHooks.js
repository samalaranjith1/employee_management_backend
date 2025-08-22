// hooks/useServiceMutation.js
import {
  useMutation,
  useQueryClient,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
// import axios from "./axiosInstance";
import axios from "axios";

const basePath = 'https://flavourheaven.in/costonomy-services/'

export function useApiQuery({
  key, // Array query key
  endpoint, // API endpoint string
  params = {}, // URL params
  config = {}, // axios config (headers, etc.)
  options = {}, // React Query options (select, enabled, etc.)
}) {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const { data } = await axios.get(`${basePath}${endpoint}`, {
        params,
        ...config,
      });
      return data;
    },
    ...options,
  });
}

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
