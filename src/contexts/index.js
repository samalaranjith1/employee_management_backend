"use client";
import { DashboardContexProvider } from "./DashboardContext";
import { AuthProvider } from "./AuthContext";
import { RoleProvider } from "./RoleContext";

export function GlobalDashboardProvider({ children }) {
  return (
    <AuthProvider>
      <RoleProvider>
        <DashboardContexProvider>{children}</DashboardContexProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
