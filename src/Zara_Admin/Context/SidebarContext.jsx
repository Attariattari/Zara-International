// SidebarContext.js

import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isexpanded, setIsexpanded] = useState(false);

  const toggleExpanded = () => {
    setIsexpanded(!isexpanded);
  };

  return (
    <SidebarContext.Provider value={{ isexpanded, toggleExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
