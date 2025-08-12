"use client";
import { DashboardContextProvider } from "./DashboardContext";
import { AuthProvider } from "./AuthContext";
import { RoleProvider } from "./RoleContext";

export function GlobalDashboardProvider({ children }) {
  return (
    <AuthProvider>
      <RoleProvider>
        <DashboardContextProvider>{children}</DashboardContextProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
