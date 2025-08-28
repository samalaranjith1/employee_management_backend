"use client";

import { createContext, useContext, useState } from "react";

const DepartmentContext = createContext();

export function DepartmentContextProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  //dashboard filters startDate, endDate
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
    <DepartmentContext.Provider value={contextValues}>
      {children}
    </DepartmentContext.Provider>
  );
}

export function useDepartmentContext() {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error("useDepartmentContext must be used within AppProvider");
  }
  return context;
}
