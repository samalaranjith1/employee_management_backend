// hooks/useServiceMutation.js
import {
  useMutation,
  useQueryClient,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios from "@/services/axiosInstance"; // ✅ using centralized instance

const basePath = 'https://flavourheaven.in/costonomy-services/outlet'
export function useServiceMutation(method, options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ endpoint, payload }) => {
      const { data } = await axios({
        url: `${basePath}${endpoint}`,
        method,
        data: payload,
      });
      return data;
    },
    onSuccess: (data, variables, context) => {
      if (options.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key] });
        });
      }
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
}

export function useOutletServiceQuery(endpoint) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const { data } = await axios.get(`${basePath}${endpoint}`);
      return data;
    },
    // ...options,
  });
}

// import { useServiceMutation } from "@/hooks/useServiceMutation";

// export default function CreateUser() {
//   const createUserMutation = useServiceMutation("/api/users", "POST", {
//     invalidateKeys: ["users"], // Refresh users list after creation
//     onSuccess: () => {
//       console.log("User created successfully!");
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
