"use client";
import { useState, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardContextProvider } from "./DashboardContext";
import { DepartmentContextProvider } from "./DepartmentContext";
import { ItemsContextProvider } from "./ItemsContext";
import { SuppliersContextProvider } from "./SuppliersContext";
import { ProductsContextProvider } from "./ProductsContext";
import { AuthProvider } from "./AuthContext";
import { RoleProvider } from "./RoleContext";

export function GlobalDashboardProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 min
        cacheTime: 10 * 60 * 1000, // 10 min
        retry: 1,
        keepPreviousData: true,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RoleProvider>
          <DashboardContextProvider>
            {/* ✅ Wrap contexts that rely on useSearchParams */}
            <Suspense fallback={<div>Loading...</div>}>
              <DepartmentContextProvider>
                <ItemsContextProvider>
                  <SuppliersContextProvider>
                    <ProductsContextProvider>
                      {children}
                    </ProductsContextProvider>
                  </SuppliersContextProvider>
                </ItemsContextProvider>
              </DepartmentContextProvider>
            </Suspense>
          </DashboardContextProvider>
        </RoleProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
// "use client";
// import { useState } from "react";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { DashboardContextProvider } from "./DashboardContext";
// import { DepartmentContextProvider } from "./DepartmentContext";
// import { ItemsContextProvider } from "./ItemsContext";
// import { SuppliersContextProvider } from "./SuppliersContext";
// import { ProductsContextProvider } from "./ProductsContext";

// import { AuthProvider } from "./AuthContext";
// import { RoleProvider } from "./RoleContext";

// export function GlobalDashboardProvider({ children }) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={queryClient}>
//       <AuthProvider>
//         <RoleProvider>
//           <DashboardContextProvider>
//             <DepartmentContextProvider>
//               <ItemsContextProvider>
//                 <SuppliersContextProvider>
//                   <ProductsContextProvider>{children}</ProductsContextProvider>
//                 </SuppliersContextProvider>
//               </ItemsContextProvider>
//             </DepartmentContextProvider>
//           </DashboardContextProvider>
//         </RoleProvider>
//       </AuthProvider>
//     </QueryClientProvider>
//   );
// }
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
