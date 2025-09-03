"use client";

import { formatDate } from "@/utils";
import { createContext, useContext, useState } from "react";

const ItemsContext = createContext();

export function ItemsContextProvider({ children }) {
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
    <ItemsContext.Provider value={contextValues}>
      {children}
    </ItemsContext.Provider>
  );
}

export function useItemsContext() {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItemsContext must be used within AppProvider");
  }
  return context;
}
