"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ProductsContext = createContext(null);

export function ProductsContextProvider({ children }) {
  const searchParams = useSearchParams();

  const [queryKey, setQueryKey] = useState(null);

  useEffect(() => {
    if (!searchParams) return;
    const firstKey = searchParams.keys().next().value;
    setQueryKey(firstKey || "default_products");
  }, [searchParams]);

  const defaultStart = formatDate(new Date());
  const defaultEnd = formatDate(new Date());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [products, setProducts] = useState("");
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
        if (parsed.hasOwnProperty("products")) setProducts(parsed.products);
      } else {
        const initialData = {
          startDate: defaultStart,
          endDate: defaultEnd,
          products: "",
        };
        setStartDate(initialData.startDate);
        setEndDate(initialData.endDate);
        setProducts(initialData.products);
        sessionStorage.setItem(queryKey, JSON.stringify(initialData));
      }
    } catch (err) {
      console.error("Error parsing sessionStorage:", err);
      const initialData = {
        startDate: defaultStart,
        endDate: defaultEnd,
        products: "",
      };
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setProducts(initialData.products);
      sessionStorage.setItem(queryKey, JSON.stringify(initialData));
    }
  }, [queryKey]);

  // Persist state and merge with existing keys in sessionStorage
  useEffect(() => {
    if (!queryKey) return;
    try {
      const existing = sessionStorage.getItem(queryKey);
      let dataToSave = { startDate, endDate };
      if (products) dataToSave.products = products;

      if (existing) {
        const parsed = JSON.parse(existing);
        dataToSave = { ...parsed, ...dataToSave }; // merge existing with new values
      }

      sessionStorage.setItem(queryKey, JSON.stringify(dataToSave));
    } catch (err) {
      console.error("Error saving to sessionStorage:", err);
      sessionStorage.setItem(
        queryKey,
        JSON.stringify({ startDate, endDate, products })
      );
    }
  }, [startDate, endDate, products, queryKey]);

  if (startDate === null || endDate === null) return null;

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

// const ProductsContext = createContext(null);

// export function ProductsContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // Query key for sessionStorage
//   const [queryKey, setQueryKey] = useState(null);

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default_products");
//   }, [searchParams]);

//   // Default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // States initialized as null; will be set after queryKey is ready
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [products, setProducts] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Hydrate from sessionStorage after queryKey is ready
//   useEffect(() => {
//     if (!queryKey) return;

//     try {
//       const saved = sessionStorage.getItem(queryKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         setStartDate(parsed.startDate || defaultStart);
//         setEndDate(parsed.endDate || defaultEnd);
//         setProducts(parsed.products ?? ""); // ✅ use nullish coalescing for safety
//       } else {
//         // If nothing in storage, set defaults and save
//         setStartDate(defaultStart);
//         setEndDate(defaultEnd);
//         setProducts("");
//         sessionStorage.setItem(
//           queryKey,
//           JSON.stringify({
//             startDate: defaultStart,
//             endDate: defaultEnd,
//             products: "",
//           })
//         );
//       }
//     } catch (err) {
//       console.error("Error parsing sessionStorage:", err);
//       setStartDate(defaultStart);
//       setEndDate(defaultEnd);
//       setProducts("");
//       sessionStorage.setItem(
//         queryKey,
//         JSON.stringify({
//           startDate: defaultStart,
//           endDate: defaultEnd,
//           products: "",
//         })
//       );
//     }
//   }, [queryKey]);

//   // Persist whenever values change
//   useEffect(() => {
//     if (!queryKey) return;
//     if (startDate && endDate) {
//       sessionStorage.setItem(
//         queryKey,
//         JSON.stringify({ startDate, endDate, products })
//       );
//     }
//   }, [startDate, endDate, products, queryKey]);

//   // Only provide context when states are initialized
//   if (startDate === null || endDate === null) return null;

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
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const ProductsContext = createContext(null);

// export function ProductsContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // Query key for sessionStorage
//   const [queryKey, setQueryKey] = useState("default_products");

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default_products");
//   }, [searchParams]);

//   // Default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // States
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [products, setProducts] = useState("");

//   // Hydrate from sessionStorage or set defaults
//   useEffect(() => {
//     if (!queryKey) return;

//     try {
//       const saved = sessionStorage.getItem(queryKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(parsed.startDate);
//         if (parsed.endDate) setEndDate(parsed.endDate);
//         if (parsed.products) setProducts(parsed.products);
//       } else {
//         const toSave = {
//           startDate: defaultStart,
//           endDate: defaultEnd,
//           products: "",
//         };
//         sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//       }
//     } catch (err) {
//       console.error("Error parsing sessionStorage:", err);
//       const toSave = {
//         startDate: defaultStart,
//         endDate: defaultEnd,
//         products: "",
//       };
//       sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//     }
//   }, [queryKey]);

//   // Persist whenever values change
//   useEffect(() => {
//     if (!queryKey) return;
//     const toSave = { startDate, endDate, products };
//     sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//   }, [startDate, endDate, products, queryKey]);

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
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const ProductsContext = createContext(null);

// export function ProductsContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // ✅ keep queryKey in state to avoid SSR mismatch
//   const [queryKey, setQueryKey] = useState("default_products");

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default_products");
//   }, [searchParams]);

//   // default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // state
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [products, setProducts] = useState("");

//   // ✅ hydrate from localStorage once queryKey is ready
//   useEffect(() => {
//     if (!queryKey) return;
//     try {
//       const saved = localStorage.getItem(queryKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(parsed.startDate);
//         if (parsed.endDate) setEndDate(parsed.endDate);
//         if (parsed.products) setProducts(parsed.products);
//       }
//     } catch (err) {
//       console.error("Error parsing localStorage:", err);
//     }
//   }, [queryKey]);

//   // ✅ persist whenever values change
//   useEffect(() => {
//     if (!queryKey) return;
//     const toSave = { startDate, endDate, products };
//     localStorage.setItem(queryKey, JSON.stringify(toSave));
//   }, [startDate, endDate, products, queryKey]);

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
