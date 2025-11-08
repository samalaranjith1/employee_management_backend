import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // Sample API endpoint
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: "patient" | "provider";
  token?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// API functions
export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  // Using JSONPlaceholder as a mock API - in real app, this would be your actual login endpoint
  // For demo purposes, we'll fetch a user from JSONPlaceholder
  // In production, you would use credentials.email and credentials.password
  console.log("Login attempt with:", credentials.email);

  const response = await api.get<User>("/users/1");

  // Determine role based on email for demo
  const role: "patient" | "provider" =
    credentials.email.includes("provider") ||
    credentials.email.includes("doctor")
      ? "provider"
      : "patient";

  // Simulate login response
  return {
    id: response.data.id,
    name: response.data.name,
    email: response.data.email,
    role,
    token: "mock-jwt-token-" + Date.now(),
  };
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await api.get<User>(`/users/${userId}`);
  return response.data;
};

export default api;
