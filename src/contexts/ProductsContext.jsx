"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ProductsContext = createContext(null);

export function ProductsContextProvider({ children }) {
  const searchParams = useSearchParams();

  // ✅ keep queryKey in state to avoid SSR mismatch
  const [queryKey, setQueryKey] = useState("default_products");

  useEffect(() => {
    if (!searchParams) return;
    const firstKey = searchParams.keys().next().value;
    setQueryKey(firstKey || "default_products");
  }, [searchParams]);

  // default values
  const defaultStart = formatDate(new Date());
  const defaultEnd = formatDate(new Date());

  // state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  const [products, setProducts] = useState("");

  // ✅ hydrate from localStorage once queryKey is ready
  useEffect(() => {
    if (!queryKey) return;
    try {
      const saved = localStorage.getItem(queryKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.startDate) setStartDate(parsed.startDate);
        if (parsed.endDate) setEndDate(parsed.endDate);
        if (parsed.products) setProducts(parsed.products);
      }
    } catch (err) {
      console.error("Error parsing localStorage:", err);
    }
  }, [queryKey]);

  // ✅ persist whenever values change
  useEffect(() => {
    if (!queryKey) return;
    const toSave = { startDate, endDate, products };
    localStorage.setItem(queryKey, JSON.stringify(toSave));
  }, [startDate, endDate, products, queryKey]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const contextValues = {
    isSidebarOpen,
    setIsSidebarOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    products,
    setProducts,
    toggleSidebar,
  };

  return (
    <ProductsContext.Provider value={contextValues}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext must be used within ProductsContextProvider"
    );
  }
  return context;
}
// "use client";

// import { formatDate } from "@/utils";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const ProductsContext = createContext();

// export function ProductsContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // Get the first query param key from URL (e.g., products?abcd → "abcd")
//   const queryKey = searchParams?.keys().next().value || "default_products";

//   // localStorage key
//   const storageKey = queryKey;

//   // default start/end dates
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // state
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [products, setProducts] = useState("");

//   // Hydrate from localStorage if present
//   useEffect(() => {
//     try {
//       if (!storageKey) return;
//       const saved = localStorage.getItem(storageKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(parsed.startDate);
//         if (parsed.endDate) setEndDate(parsed.endDate);
//         if (parsed.products) setProducts(parsed.products);
//       }
//     } catch (err) {
//       console.error("Error parsing localStorage:", err);
//     }
//   }, [storageKey]);

//   // Persist to localStorage whenever filters change
//   useEffect(() => {
//     if (!storageKey) return;
//     const toSave = { startDate, endDate, products };
//     localStorage.setItem(storageKey, JSON.stringify(toSave));
//   }, [startDate, endDate, products, storageKey]);

//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

//   const contextValues = {
//     isSidebarOpen,
//     setIsSidebarOpen,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     products,
//     setProducts,
//     toggleSidebar,
//   };

//   return (
//     <ProductsContext.Provider value={contextValues}>
//       {children}
//     </ProductsContext.Provider>
//   );
// }

// export function useProductsContext() {
//   const context = useContext(ProductsContext);
//   if (!context) {
//     throw new Error(
//       "useProductsContext must be used within ProductsContextProvider"
//     );
//   }
//   return context;
// }
// "use client";

// import { formatDate } from "@/utils";
// import { createContext, useContext, useState } from "react";

// const ProductsContext = createContext();

// export function ProductsContextProvider({ children }) {
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
//     <ProductsContext.Provider value={contextValues}>
//       {children}
//     </ProductsContext.Provider>
//   );
// }

// export function useProductsContext() {
//   const context = useContext(ProductsContext);
//   if (!context) {
//     throw new Error("useProductsContext must be used within AppProvider");
//   }
//   return context;
// }
