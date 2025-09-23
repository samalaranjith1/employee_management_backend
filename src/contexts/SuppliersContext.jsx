"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SuppliersContext = createContext(null);

export function SuppliersContextProvider({ children }) {
  const searchParams = useSearchParams();

  // ✅ keep queryKey in state to avoid SSR mismatch
  const [queryKey, setQueryKey] = useState("default_suppliers");

  useEffect(() => {
    if (!searchParams) return;
    const firstKey = searchParams.keys().next().value;
    setQueryKey(firstKey || "default_suppliers");
  }, [searchParams]);

  // state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [suppliers, setSuppliers] = useState("");

  // ✅ hydrate from localStorage only after queryKey is ready
  useEffect(() => {
    if (!queryKey) return;
    try {
      const saved = localStorage.getItem(queryKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.startDate) setStartDate(new Date(parsed.startDate));
        if (parsed.endDate) setEndDate(new Date(parsed.endDate));
        if (parsed.suppliers) setSuppliers(parsed.suppliers);
      }
    } catch (err) {
      console.error("Error parsing localStorage:", err);
    }
  }, [queryKey]);

  // ✅ persist whenever values change
  useEffect(() => {
    if (!queryKey) return;
    const toSave = { startDate, endDate, suppliers };
    localStorage.setItem(queryKey, JSON.stringify(toSave));
  }, [startDate, endDate, suppliers, queryKey]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const contextValues = {
    isSidebarOpen,
    setIsSidebarOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    suppliers,
    setSuppliers,
    toggleSidebar,
  };

  return (
    <SuppliersContext.Provider value={contextValues}>
      {children}
    </SuppliersContext.Provider>
  );
}

export function useSuppliersContext() {
  const context = useContext(SuppliersContext);
  if (!context) {
    throw new Error(
      "useSuppliersContext must be used within SuppliersContextProvider"
    );
  }
  return context;
}
// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const SuppliersContext = createContext();

// export function SuppliersContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // Get the first query param key from URL (e.g., suppliers?abcd → "abcd")
//   const queryKey = searchParams?.keys().next().value || "default_suppliers";

//   // localStorage key
//   const storageKey = queryKey;

//   // default start/end dates
//   const defaultStart = new Date();
//   const defaultEnd = new Date();

//   // state
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [suppliers, setSuppliers] = useState("");

//   // Hydrate from localStorage if present
//   useEffect(() => {
//     try {
//       if (!storageKey) return;
//       const saved = localStorage.getItem(storageKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(new Date(parsed.startDate));
//         if (parsed.endDate) setEndDate(new Date(parsed.endDate));
//         if (parsed.suppliers) setSuppliers(parsed.suppliers);
//       }
//     } catch (err) {
//       console.error("Error parsing localStorage:", err);
//     }
//   }, [storageKey]);

//   // Persist to localStorage whenever filters change
//   useEffect(() => {
//     if (!storageKey) return;
//     const toSave = { startDate, endDate, suppliers };
//     localStorage.setItem(storageKey, JSON.stringify(toSave));
//   }, [startDate, endDate, suppliers, storageKey]);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const contextValues = {
//     isSidebarOpen,
//     setIsSidebarOpen,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     suppliers,
//     setSuppliers,
//     toggleSidebar,
//   };

//   return (
//     <SuppliersContext.Provider value={contextValues}>
//       {children}
//     </SuppliersContext.Provider>
//   );
// }

// export function useSuppliersContext() {
//   const context = useContext(SuppliersContext);
//   if (!context) {
//     throw new Error(
//       "useSuppliersContext must be used within SuppliersContextProvider"
//     );
//   }
//   return context;
// }
// "use client";

// import { createContext, useContext, useState } from "react";

// const SuppliersContext = createContext();

// export function SuppliersContextProvider({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   //dashboard filters startDate, endDate
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());

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
//     <SuppliersContext.Provider value={contextValues}>
//       {children}
//     </SuppliersContext.Provider>
//   );
// }

// export function useSuppliersContext() {
//   const context = useContext(SuppliersContext);
//   if (!context) {
//     throw new Error("useSuppliersContext must be used within AppProvider");
//   }
//   return context;
// }
