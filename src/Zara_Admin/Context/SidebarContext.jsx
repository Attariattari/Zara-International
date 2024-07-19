import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isexpanded, setIsexpanded] = useState(
    localStorage.getItem("isexpanded") === "true" ? true : false
  );
  const [openDrawer, setOpenDrawer] = useState(
    localStorage.getItem("openDrawer") === "true" ? true : false
  );

  const toggleExpanded = () => {
    const newState = !isexpanded;
    setIsexpanded(newState);
    localStorage.setItem("isexpanded", newState.toString());
  };

  const toggleDrawer = () => {
    const newState = !openDrawer;
    setOpenDrawer(newState);
    localStorage.setItem("openDrawer", newState.toString());
  };

  // Clear localStorage on component unmount if needed
  useEffect(() => {
    const handleStorageChange = () => {
      // Check if user has manually cleared localStorage
      if (
        localStorage.getItem("isexpanded") === null ||
        localStorage.getItem("openDrawer") === null
      ) {
        // If cleared, reset state to defaults
        setIsexpanded(false);
        setOpenDrawer(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{ isexpanded, toggleExpanded, openDrawer, toggleDrawer }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
