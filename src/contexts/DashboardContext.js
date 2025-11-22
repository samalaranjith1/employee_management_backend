"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext();

export function DashboardContextProvider({ children }) {
  const defaultStart = formatDate(new Date());
  const defaultEnd = formatDate(new Date());

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  // ✅ 1. Detect mobile screen
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ 2. Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dashboardFilters");
      if (saved) {
        const parsed = JSON.parse(saved);
        setStartDate(parsed.startDate || defaultStart);
        setEndDate(parsed.endDate || defaultEnd);
      } else {
        // Initialize with defaults
        const initialData = { startDate: defaultStart, endDate: defaultEnd };
        localStorage.setItem("dashboardFilters", JSON.stringify(initialData));
        setStartDate(defaultStart);
        setEndDate(defaultEnd);
      }
    } catch (err) {
      console.error("Error reading dashboard filters:", err);
      setStartDate(defaultStart);
      setEndDate(defaultEnd);
    }
  }, []);

  // ✅ 3. Save to localStorage whenever dates change
  useEffect(() => {
    if (!startDate || !endDate) return;
    try {
      const saved = localStorage.getItem("dashboardFilters");
      const existing = saved ? JSON.parse(saved) : {};
      const dataToSave = { ...existing, startDate, endDate };
      localStorage.setItem("dashboardFilters", JSON.stringify(dataToSave));
    } catch (err) {
      console.error("Error saving dashboard filters:", err);
      localStorage.setItem(
        "dashboardFilters",
        JSON.stringify({ startDate, endDate })
      );
    }
  }, [startDate, endDate]);

  // ✅ Prevent rendering before dates are ready
  if (startDate === null || endDate === null) return null;

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const contextValues = {
    isSidebarOpen,
    setIsSidebarOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    toggleSidebar,
    isMobile,
    setIsMobile,
    activeTab,
    setActiveTab,
  };

  return (
    <DashboardContext.Provider value={contextValues}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within DashboardContextProvider");
  }
  return context;
}
// "use client";

// import { formatDate } from "@/utils";
// import { createContext, useContext, useEffect, useState } from "react";

// const DashboardContext = createContext();

// export function DashboardContextProvider({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   //dashboard filters startDate, endDate
//   const [startDate, setStartDate] = useState(formatDate(new Date()));
//   const [endDate, setEndDate] = useState(formatDate(new Date()));
//   const [activeTab, setActiveTab] = useState("home");

//   const [dashboardFilter, setDashboardFilter] = useState({
//     startDate: startDate,
//     endDate: endDate
//   })

//   const [isMobile, setIsMobile] = useState(false);

//   // detect mobile
//   useEffect(() => {
//     const checkScreen = () => setIsMobile(window.innerWidth < 768);
//     checkScreen();
//     window.addEventListener("resize", checkScreen);
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);
//   const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
//   const contextValues = {
//     isSidebarOpen,
//     setIsSidebarOpen,
//     startDate,
//     setStartDate,
//     endDate,
//     setEndDate,
//     toggleSidebar,
//     dashboardFilter,
//     isMobile, setIsMobile,
//     activeTab, setActiveTab
//   };

//   return (
//     <DashboardContext.Provider value={contextValues}>
//       {children}
//     </DashboardContext.Provider>
//   );
// }

// export function useDashboardContext() {
//   const context = useContext(DashboardContext);
//   if (!context) {
//     throw new Error("useDashboardContext must be used within AppProvider");
//   }
//   return context;
// }
