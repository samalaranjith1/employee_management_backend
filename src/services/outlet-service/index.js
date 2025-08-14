import {useApiQuery, useApiMutation } from "../apiHooks";

// Single Outlet
export function useOutlet(id, params) {
  return useApiQuery({
    key: ["outlet", id, params],
    endpoint: `outlet/${id}`,
    params,
  });
}

// Summary
export function useOutletSummary(id, params) {
  return useApiQuery({
    key: ["outletSummary", id, params],
    endpoint: `outlet/${id}/summary`,
    params,
  });
}

export function useOutletWeeklySummary(id, params) {
  return useApiQuery({
    key: ["outletWeeklySummary", id, params],
    endpoint: `outlet/${id}/summary/weekly`,
    params,
  });
}

export function useOutletSameDaySummary(id, params) {
  return useApiQuery({
    key: ["outletSameDaySummary", id, params],
    endpoint: `outlet/${id}/summary/sameday`,
    params,
  });
}

export function useOutletMonthlySummary(id, params) {
  return useApiQuery({
    key: ["outletMonthlySummary", id, params],
    endpoint: `outlet/${id}/summary/monthly`,
    params,
  });
}

export function useOutletDailySummary(id, params) {
  return useApiQuery({
    key: ["outletDailySummary", id, params],
    endpoint: `outlet/${id}/summary/daily`,
    params,
  });
}

// MTD Metrics
export function useOutletMtdMetrics(id, params) {
  return useApiQuery({
    key: ["outletMtdMetrics", id, params],
    endpoint: `outlet/${id}/mtdmetrics`,
    params,
  });
}

// Actionable Insights
export function useOutletActionableInsights(id, params) {
  return useApiQuery({
    key: ["outletActionableInsights", id, params],
    endpoint: `outlet/${id}/actionableinsights`,
    params,
  });
}


// // Read
// export function useUsersList(filters) {
//   return useApiQuery({
//     key: ["users", filters],
//     endpoint: "/users",
//     params: filters,
//   });
// }

// // Create
// export function useCreateUser() {
//   return useApiMutation({
//     method: "post",
//     endpoint: "/users",
//     options: {
//       invalidateKeys: [["users"]],
//     },
//   });
// }

// // Update
// export function useUpdateUser(id) {
//   return useApiMutation({
//     method: "put",
//     endpoint: `/users/${id}`,
//     options: {
//       invalidateKeys: [["users"]],
//     },
//   });
// }

// // Delete
// export function useDeleteUser(id) {
//   return useApiMutation({
//     method: "delete",
//     endpoint: `/users/${id}`,
//     options: {
//       invalidateKeys: [["users"]],
//     },
//   });
// }

// function UsersList() {
//   const { data: users, isLoading } = useUsersList({ page: 1 });
//   const createUser = useCreateUser();
//   const updateUser = useUpdateUser(1);
//   const deleteUser = useDeleteUser(2);

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <>
//       <ul>
//         {users?.map((u) => (
//           <li key={u.id}>{u.name}</li>
//         ))}
//       </ul>

//       <button onClick={() => createUser.mutate({ name: "New User" })}>
//         Add
//       </button>
//       <button onClick={() => updateUser.mutate({ name: "Updated Name" })}>
//         Update
//       </button>
//       <button onClick={() => deleteUser.mutate()}>Delete</button>
//     </>
//   );
// }

