"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const DepartmentContext = createContext(null);

export function DepartmentContextProvider({ children }) {
  const searchParams = useSearchParams();

  const [queryKey, setQueryKey] = useState(null);

  useEffect(() => {
    if (!searchParams) return;
    const firstKey = searchParams.keys().next().value;
    setQueryKey(firstKey || "default");
  }, [searchParams]);

  const defaultStart = formatDate(new Date());
  const defaultEnd = formatDate(new Date());

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [departments, setDepartments] = useState("");
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
        if (parsed.hasOwnProperty("departments")) {
          setDepartments(parsed.departments);
        }
      } else {
        // If nothing exists, set defaults and save
        const initialData = {
          startDate: defaultStart,
          endDate: defaultEnd,
          departments: "",
        };
        setStartDate(initialData.startDate);
        setEndDate(initialData.endDate);
        setDepartments(initialData.departments);
        sessionStorage.setItem(queryKey, JSON.stringify(initialData));
      }
    } catch (err) {
      console.error("Error parsing sessionStorage:", err);
      const initialData = {
        startDate: defaultStart,
        endDate: defaultEnd,
        departments: "",
      };
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate);
      setDepartments(initialData.departments);
      sessionStorage.setItem(queryKey, JSON.stringify(initialData));
    }
  }, [queryKey]);

  // Persist state and merge with existing keys in sessionStorage
  useEffect(() => {
    if (!queryKey) return;
    try {
      const existing = sessionStorage.getItem(queryKey);
      let dataToSave = { startDate, endDate };
      if (departments) dataToSave.departments = departments;

      if (existing) {
        const parsed = JSON.parse(existing);
        dataToSave = { ...parsed, ...dataToSave }; // merge existing with new values
      }

      sessionStorage.setItem(queryKey, JSON.stringify(dataToSave));
    } catch (err) {
      console.error("Error saving to sessionStorage:", err);
      sessionStorage.setItem(
        queryKey,
        JSON.stringify({ startDate, endDate, departments })
      );
    }
  }, [startDate, endDate, departments, queryKey]);

  if (startDate === null || endDate === null) return null;

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

// const DepartmentContext = createContext(null);

// export function DepartmentContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   const [queryKey, setQueryKey] = useState(null);

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default");
//   }, [searchParams]);

//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [departments, setDepartments] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Hydrate from sessionStorage
//   useEffect(() => {
//     if (!queryKey) return;

//     try {
//       const saved = sessionStorage.getItem(queryKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         setStartDate(parsed.startDate || defaultStart);
//         setEndDate(parsed.endDate || defaultEnd);

//         // Only set departments if it exists in storage
//         if (parsed.hasOwnProperty("departments")) {
//           setDepartments(parsed.departments);
//         }
//       } else {
//         // If nothing exists, set defaults including departments
//         const initialData = {
//           startDate: defaultStart,
//           endDate: defaultEnd,
//           departments: "",
//         };
//         setStartDate(initialData.startDate);
//         setEndDate(initialData.endDate);
//         setDepartments(initialData.departments);
//         sessionStorage.setItem(queryKey, JSON.stringify(initialData));
//       }
//     } catch (err) {
//       console.error("Error parsing sessionStorage:", err);
//       const initialData = {
//         startDate: defaultStart,
//         endDate: defaultEnd,
//         departments: "",
//       };
//       setStartDate(initialData.startDate);
//       setEndDate(initialData.endDate);
//       setDepartments(initialData.departments);
//       sessionStorage.setItem(queryKey, JSON.stringify(initialData));
//     }
//   }, [queryKey]);

//   // Persist only if departments is meaningful
//   useEffect(() => {
//     if (!queryKey) return;

//     const toSave = { startDate, endDate };
//     if (departments) {
//       toSave.departments = departments;
//     }

//     sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//   }, [startDate, endDate, departments, queryKey]);

//   if (startDate === null || endDate === null) return null;

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
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const DepartmentContext = createContext(null);

// export function DepartmentContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // Query key for sessionStorage
//   const [queryKey, setQueryKey] = useState(null);

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default");
//   }, [searchParams]);

//   // Default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // States initialized as null; will be set after queryKey is ready
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [departments, setDepartments] = useState("");
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
//         setDepartments(parsed.departments || "");
//       } else {
//         // If nothing in storage, set defaults and save
//         setStartDate(defaultStart);
//         setEndDate(defaultEnd);
//         setDepartments("");
//         sessionStorage.setItem(
//           queryKey,
//           JSON.stringify({
//             startDate: defaultStart,
//             endDate: defaultEnd,
//             departments: "",
//           })
//         );
//       }
//     } catch (err) {
//       console.error("Error parsing sessionStorage:", err);
//       setStartDate(defaultStart);
//       setEndDate(defaultEnd);
//       setDepartments("");
//       sessionStorage.setItem(
//         queryKey,
//         JSON.stringify({
//           startDate: defaultStart,
//           endDate: defaultEnd,
//           departments: "",
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
//         JSON.stringify({ startDate, endDate, departments })
//       );
//     }
//   }, [startDate, endDate, departments, queryKey]);

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
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const DepartmentContext = createContext(null);

// export function DepartmentContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // Query key for sessionStorage
//   const [queryKey, setQueryKey] = useState("default");

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default");
//   }, [searchParams]);

//   // Default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // States
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [departments, setDepartments] = useState("");

//   // Hydrate from sessionStorage or set defaults
//   useEffect(() => {
//     if (!queryKey) return;

//     try {
//       const saved = sessionStorage.getItem(queryKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(parsed.startDate);
//         if (parsed.endDate) setEndDate(parsed.endDate);
//         if (parsed.departments) setDepartments(parsed.departments);
//       } else {
//         const toSave = {
//           startDate: defaultStart,
//           endDate: defaultEnd,
//           departments: "",
//         };
//         sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//       }
//     } catch (err) {
//       console.error("Error parsing sessionStorage:", err);
//       const toSave = {
//         startDate: defaultStart,
//         endDate: defaultEnd,
//         departments: "",
//       };
//       sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//     }
//   }, [queryKey]);

//   // Persist whenever values change
//   useEffect(() => {
//     if (!queryKey) return;
//     const toSave = { startDate, endDate, departments };
//     sessionStorage.setItem(queryKey, JSON.stringify(toSave));
//   }, [startDate, endDate, departments, queryKey]);

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
// import { createContext, useContext, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// const DepartmentContext = createContext(null);

// export function DepartmentContextProvider({ children }) {
//   const searchParams = useSearchParams();

//   // ✅ Safely resolve queryKey only on client after hydration
//   const [queryKey, setQueryKey] = useState("default");

//   useEffect(() => {
//     if (!searchParams) return;
//     const firstKey = searchParams.keys().next().value;
//     setQueryKey(firstKey || "default");
//   }, [searchParams]);

//   // default values
//   const defaultStart = formatDate(new Date());
//   const defaultEnd = formatDate(new Date());

//   // state
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [startDate, setStartDate] = useState(defaultStart);
//   const [endDate, setEndDate] = useState(defaultEnd);
//   const [departments, setDepartments] = useState("");

//   // ✅ hydrate from localStorage after queryKey is ready
//   useEffect(() => {
//     if (!queryKey) return;
//     try {
//       const saved = localStorage.getItem(queryKey);
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (parsed.startDate) setStartDate(parsed.startDate);
//         if (parsed.endDate) setEndDate(parsed.endDate);
//         if (parsed.departments) setDepartments(parsed.departments);
//       }
//     } catch (err) {
//       console.error("Error parsing localStorage:", err);
//     }
//   }, [queryKey]);

//   // ✅ persist whenever values change
//   useEffect(() => {
//     if (!queryKey) return;
//     const toSave = { startDate, endDate, departments };
//     localStorage.setItem(queryKey, JSON.stringify(toSave));
//   }, [startDate, endDate, departments, queryKey]);

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
