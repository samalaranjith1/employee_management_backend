"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ItemsContext = createContext(null);

export function ItemsContextProvider({ children }) {
  const searchParams = useSearchParams();

  // ✅ store queryKey in state to avoid hydration mismatch
  const [queryKey, setQueryKey] = useState("default_items");

  useEffect(() => {
    if (!searchParams) return;
    const firstKey = searchParams.keys().next().value;
    setQueryKey(firstKey || "default_items");
  }, [searchParams]);

  // default values
  const defaultStart = formatDate(new Date());
  const defaultEnd = formatDate(new Date());

  // state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [items, setItems] = useState("");

  // ✅ hydrate from localStorage when queryKey is ready
  useEffect(() => {
    if (!queryKey) return;
    try {
      const saved = localStorage.getItem(queryKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.startDate) setStartDate(parsed.startDate);
        if (parsed.endDate) setEndDate(parsed.endDate);
        if (parsed.items) setItems(parsed.items);
      }
    } catch (err) {
      console.error("Error parsing localStorage:", err);
    }
  }, [queryKey]);

  // ✅ persist whenever values change
  useEffect(() => {
    if (!queryKey) return;
    const toSave = { startDate, endDate, items };
    localStorage.setItem(queryKey, JSON.stringify(toSave));
  }, [startDate, endDate, items, queryKey]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const contextValues = {
    isSidebarOpen,
    setIsSidebarOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    items,
    setItems,
    toggleSidebar,
  };

  return (
    <ItemsContext.Provider value={contextValues}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItemsContext must be used within ItemsContextProvider");
  }
  return context;
}
// "use client";

// import { formatDate } from "@/utils";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const ItemsContext = createContext();

// export function ItemsContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // 👇 get the first query param key (e.g. items?xyz → "xyz")
//   const queryKey = searchParams?.keys().next().value || "default_items";

//   // localStorage key for items
//   const storageKey = queryKey;

//   // default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // state
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [items, setItems] = useState("");

//   // ✅ hydrate from localStorage
//   useEffect(() => {
//     try {
//       if (!storageKey) return;
//       const saved = localStorage.getItem(storageKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(parsed.startDate);
//         if (parsed.endDate) setEndDate(parsed.endDate);
//         if (parsed.items) setItems(parsed.items);
//       }
//     } catch (err) {
//       console.error("Error parsing localStorage:", err);
//     }
//   }, [storageKey]);

//   // ✅ persist to localStorage whenever filters change
//   useEffect(() => {
//     if (!storageKey) return;
//     const toSave = { startDate, endDate, items };
//     localStorage.setItem(storageKey, JSON.stringify(toSave));
//   }, [startDate, endDate, items, storageKey]);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const contextValues = {
//     isSidebarOpen,
//     setIsSidebarOpen,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     items,
//     setItems,
//     toggleSidebar,
//   };

//   return (
//     <ItemsContext.Provider value={contextValues}>
//       {children}
//     </ItemsContext.Provider>
//   );
// }

// export function useItemsContext() {
//   const context = useContext(ItemsContext);
//   if (!context) {
//     throw new Error("useItemsContext must be used within ItemsContextProvider");
//   }
//   return context;
// }
// "use client";

// import { formatDate } from "@/utils";
// import { createContext, useContext, useState } from "react";

// const ItemsContext = createContext();

// export function ItemsContextProvider({ children }) {
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
//     <ItemsContext.Provider value={contextValues}>
//       {children}
//     </ItemsContext.Provider>
//   );
// }

// export function useItemsContext() {
//   const context = useContext(ItemsContext);
//   if (!context) {
//     throw new Error("useItemsContext must be used within AppProvider");
//   }
//   return context;
// }
