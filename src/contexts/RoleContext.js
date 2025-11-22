"use client";
import { createContext, useContext, useState } from "react";

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState("guest"); // default

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => useContext(RoleContext);
