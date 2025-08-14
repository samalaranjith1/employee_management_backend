// hooks/useUsers.js
import { useApiQuery, useApiMutation } from "../apiHooks";

// ----------- GET HOOKS -----------

export function useUser(id, params) {
  return useApiQuery({
    key: ["user", id, params],
    endpoint: `/user/${id}`,
    params,
    enabled: !!id,
  });
}

export function useUserRoles(params) {
  return useApiQuery({
    key: ["user", "roles", params],
    endpoint: `/user/roles`,
    params,
  });
}

export function useUserOutletRoleList(outletId, roleId, params) {
  return useApiQuery({
    key: ["user", "outlet", outletId, "role", roleId, "list", params],
    endpoint: `/user/outlet/${outletId}/role/${roleId}/list`,
    params,
    enabled: !!outletId && !!roleId,
  });
}

export function useUserList(params) {
  return useApiQuery({
    key: ["user", "list", params],
    endpoint: `/user/list`,
    params,
  });
}

// ----------- POST HOOKS -----------

export function useRegisterUser() {
  return useApiMutation({
    method: "post",
    endpoint: `/user/register`,
    options: {
      invalidateKeys: [["user", "list"]],
    },
  });
}

export function useRegisterUserList() {
  return useApiMutation({
    method: "post",
    endpoint: `/user/register/list`,
    options: {
      invalidateKeys: [["user", "list"]],
    },
  });
}

export function useDeleteUser() {
  return useApiMutation({
    method: "post",
    endpoint: `/user/delete`,
    options: {
      invalidateKeys: [["user", "list"]],
    },
  });
}

// // src/api/services/userService.js
// import axiosInstance from "../axiosInstance";

// export const fetchUsers = () => axiosInstance.get(endpoints.users);
// export const fetchUserById = (id) =>
//   axiosInstance.get(`${endpoints.users}/${id}`);
// export const createUser = (data) => axiosInstance.post(endpoints.users, data);
