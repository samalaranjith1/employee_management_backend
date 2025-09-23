"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const DepartmentContext = createContext(null);

export function DepartmentContextProvider({ children }) {
  const searchParams = useSearchParams();

  // ✅ Safely resolve queryKey only on client after hydration
  const [queryKey, setQueryKey] = useState("default");

  useEffect(() => {
    if (!searchParams) return;
    const firstKey = searchParams.keys().next().value;
    setQueryKey(firstKey || "default");
  }, [searchParams]);

  // default values
  const defaultStart = formatDate(new Date());
  const defaultEnd = formatDate(new Date());

  // state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [departments, setDepartments] = useState("");

  // ✅ hydrate from localStorage after queryKey is ready
  useEffect(() => {
    if (!queryKey) return;
    try {
      const saved = localStorage.getItem(queryKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.startDate) setStartDate(parsed.startDate);
        if (parsed.endDate) setEndDate(parsed.endDate);
        if (parsed.departments) setDepartments(parsed.departments);
      }
    } catch (err) {
      console.error("Error parsing localStorage:", err);
    }
  }, [queryKey]);

  // ✅ persist whenever values change
  useEffect(() => {
    if (!queryKey) return;
    const toSave = { startDate, endDate, departments };
    localStorage.setItem(queryKey, JSON.stringify(toSave));
  }, [startDate, endDate, departments, queryKey]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const contextValues = {
    isSidebarOpen,
    setIsSidebarOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    departments,
    setDepartments,
    toggleSidebar,
  };

  return (
    <DepartmentContext.Provider value={contextValues}>
      {children}
    </DepartmentContext.Provider>
  );
}

export function useDepartmentContext() {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error(
      "useDepartmentContext must be used within DepartmentContextProvider"
    );
  }
  return context;
}
// "use client";

// import { formatDate } from "@/utils";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const DepartmentContext = createContext();

// export function DepartmentContextProvider({ children }) {
//   const searchParams = useSearchParams();
//   // 👇 get the first query param key (e.g. departments?abcde → "abcde")
//   const queryKey = searchParams?.keys().next().value || "default";

//   // localStorage key based on URL param
//   const storageKey = queryKey;

//   // default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // state
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [departments, setDepartments] = useState("");

//   // ✅ hydrate from localStorage if available
//   useEffect(() => {
//     try {
//       if (!storageKey) return;
//       const saved = localStorage.getItem(storageKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(parsed.startDate);
//         if (parsed.endDate) setEndDate(parsed.endDate);
//         if (parsed.departments) setDepartments(parsed.departments);
//       }
//     } catch (err) {
//       console.error("Error parsing localStorage:", err);
//     }
//   }, [storageKey]);

//   // ✅ persist whenever values change
//   useEffect(() => {
//     if (!storageKey) return;
//     const toSave = { startDate, endDate, departments };
//     localStorage.setItem(storageKey, JSON.stringify(toSave));
//   }, [startDate, endDate, departments, storageKey]);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const contextValues = {
//     isSidebarOpen,
//     setIsSidebarOpen,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     departments,
//     setDepartments,
//     toggleSidebar,
//   };

//   return (
//     <DepartmentContext.Provider value={contextValues}>
//       {children}
//     </DepartmentContext.Provider>
//   );
// }

// export function useDepartmentContext() {
//   const context = useContext(DepartmentContext);
//   if (!context) {
//     throw new Error(
//       "useDepartmentContext must be used within DepartmentContextProvider"
//     );
//   }
//   return context;
// }
// "use client";

// import { formatDate } from "@/utils";
// import { createContext, useContext, useState } from "react";

// const DepartmentContext = createContext();

// export function DepartmentContextProvider({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   //dashboard filters startDate, endDate
//     const [startDate, setStartDate] = useState(formatDate(new Date()));
//     const [endDate, setEndDate] = useState(formatDate(new Date()));

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
//   const contextValues = {
//     isSidebarOpen,
//     setIsSidebarOpen,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     toggleSidebar,
//   };

//   return (
//     <DepartmentContext.Provider value={contextValues}>
//       {children}
//     </DepartmentContext.Provider>
//   );
// }

// export function useDepartmentContext() {
//   const context = useContext(DepartmentContext);
//   if (!context) {
//     throw new Error("useDepartmentContext must be used within AppProvider");
//   }
//   return context;
// }
