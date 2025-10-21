"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const SuppliersContext = createContext(null);

export function SuppliersContextProvider({ children }) {
  const searchParams = useSearchParams();

  const [queryKey, setQueryKey] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  useEffect(() => {
    if (!searchParams) return;
    const firstKey = searchParams.keys().next().value;
    setQueryKey(firstKey || "default_suppliers");
  }, [searchParams]);

  const defaultStart = formatDate(new Date());
  const defaultEnd = formatDate(new Date());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [suppliers, setSuppliers] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hydrate from sessionStorage
  useEffect(() => {
    if (!queryKey) return;

    try {
      const saved = sessionStorage.getItem(queryKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setStartDate(parsed.startDate || defaultStart);
        setEndDate(parsed.endDate || defaultEnd);
        if (parsed.hasOwnProperty("suppliers")) setSuppliers(parsed.suppliers);
      } else {
        const initialData = {
          startDate: defaultStart,
          endDate: defaultEnd,
          suppliers: "",
        };
        setStartDate(initialData.startDate);
        setEndDate(initialData.endDate);
        setSuppliers(initialData.suppliers);
        sessionStorage.setItem(queryKey, JSON.stringify(initialData));
      }
    } catch (err) {
      console.error("Error parsing sessionStorage:", err);
      const initialData = {
        startDate: defaultStart,
        endDate: defaultEnd,
        suppliers: "",
      };
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setSuppliers(initialData.suppliers);
      sessionStorage.setItem(queryKey, JSON.stringify(initialData));
    }
  }, [queryKey]);

  // Persist state and merge with existing keys in sessionStorage
  useEffect(() => {
    if (!queryKey) return;

    try {
      const existing = sessionStorage.getItem(queryKey);
      let dataToSave = { startDate, endDate };
      if (suppliers) dataToSave.suppliers = suppliers;

      if (existing) {
        const parsed = JSON.parse(existing);
        dataToSave = { ...parsed, ...dataToSave }; // merge existing with new values
      }

      sessionStorage.setItem(queryKey, JSON.stringify(dataToSave));
    } catch (err) {
      console.error("Error saving to sessionStorage:", err);
      sessionStorage.setItem(
        queryKey,
        JSON.stringify({ startDate, endDate, suppliers })
      );
    }
  }, [startDate, endDate, suppliers, queryKey]);

  // if (startDate === null || endDate === null) return null;
  if (startDate === null) return null;

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
    isMobile, setIsMobile
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

// import { formatDate } from "@/utils";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const SuppliersContext = createContext(null);

// export function SuppliersContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // Query key for sessionStorage
//   const [queryKey, setQueryKey] = useState("default_suppliers");

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default_suppliers");
//   }, [searchParams]);

//   // Default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // States
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [suppliers, setSuppliers] = useState("");

//   // Hydrate from sessionStorage or set defaults
//   useEffect(() => {
//     if (!queryKey) return;

//     try {
//       const saved = sessionStorage.getItem(queryKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(parsed.startDate);
//         if (parsed.endDate) setEndDate(parsed.endDate);
//         if (parsed.suppliers) setSuppliers(parsed.suppliers);
//       } else {
//         const toSave = {
//           startDate: defaultStart,
//           endDate: defaultEnd,
//           suppliers: "",
//         };
//         sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//       }
//     } catch (err) {
//       console.error("Error parsing sessionStorage:", err);
//       const toSave = {
//         startDate: defaultStart,
//         endDate: defaultEnd,
//         suppliers: "",
//       };
//       sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//     }
//   }, [queryKey]);

//   // Persist whenever values change
//   useEffect(() => {
//     if (!queryKey) return;
//     const toSave = { startDate, endDate, suppliers };
//     sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//   }, [startDate, endDate, suppliers, queryKey]);

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

// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const SuppliersContext = createContext(null);

// export function SuppliersContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // ✅ keep queryKey in state to avoid SSR mismatch
//   const [queryKey, setQueryKey] = useState("default_suppliers");

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default_suppliers");
//   }, [searchParams]);

//   // state
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [suppliers, setSuppliers] = useState("");

//   // ✅ hydrate from localStorage only after queryKey is ready
//   useEffect(() => {
//     if (!queryKey) return;
//     try {
//       const saved = localStorage.getItem(queryKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(new Date(parsed.startDate));
//         if (parsed.endDate) setEndDate(new Date(parsed.endDate));
//         if (parsed.suppliers) setSuppliers(parsed.suppliers);
//       }
//     } catch (err) {
//       console.error("Error parsing localStorage:", err);
//     }
//   }, [queryKey]);

//   // ✅ persist whenever values change
//   useEffect(() => {
//     if (!queryKey) return;
//     const toSave = { startDate, endDate, suppliers };
//     localStorage.setItem(queryKey, JSON.stringify(toSave));
//   }, [startDate, endDate, suppliers, queryKey]);

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
