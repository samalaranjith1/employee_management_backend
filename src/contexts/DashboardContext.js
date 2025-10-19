"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";

const DashboardContext = createContext();

export function DashboardContextProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //dashboard filters startDate, endDate
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));
    const [dashboardFilter,setDashboardFilter]= useState({
      startDate:startDate,
      endDate:endDate
    })

     const [isMobile, setIsMobile] = useState(false);
    
      // detect mobile
      useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
      }, []);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const contextValues = {
    isSidebarOpen,
    setIsSidebarOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    toggleSidebar,
    dashboardFilter,
    isMobile, setIsMobile
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
    throw new Error("useDashboardContext must be used within AppProvider");
  }
  return context;
}
