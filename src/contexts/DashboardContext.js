"use client";

import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardContexProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <DashboardContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
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
