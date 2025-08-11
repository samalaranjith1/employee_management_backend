// src/api/services/userService.js
import axiosInstance from "../axiosInstance";

export const fetchUsers = () => axiosInstance.get(endpoints.users);
export const fetchUserById = (id) =>
  axiosInstance.get(`${endpoints.users}/${id}`);
export const createUser = (data) => axiosInstance.post(endpoints.users, data);
