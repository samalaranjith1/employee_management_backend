"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardContextProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //dashboard filters startDate, endDate
    const [startDate, setStartDate] = useState(formatDate(new Date()));
    const [endDate, setEndDate] = useState(formatDate(new Date()));

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const contextValues = {
    isSidebarOpen,
    setIsSidebarOpen,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    toggleSidebar,
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
