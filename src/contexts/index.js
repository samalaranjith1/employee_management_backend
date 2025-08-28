"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardContextProvider } from "./DashboardContext";
import { DepartmentContextProvider } from "./DepartmentContext";
import { AuthProvider } from "./AuthContext";
import { RoleProvider } from "./RoleContext";

export function GlobalDashboardProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RoleProvider>
          <DashboardContextProvider>
            <DepartmentContextProvider>{children}</DepartmentContextProvider>
          </DashboardContextProvider>
        </RoleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
// "use client";
// import { DashboardContextProvider } from "./DashboardContext";
// import { AuthProvider } from "./AuthContext";
// import { RoleProvider } from "./RoleContext";

// export function GlobalDashboardProvider({ children }) {
//   return (
//     <AuthProvider>
//       <RoleProvider>
//         <DashboardContextProvider>{children}</DashboardContextProvider>
//       </RoleProvider>
//     </AuthProvider>
//   );
// }
