import "./Css.css";
import React from "react";
import { useSidebar } from "./SidebarContext";
import Navbar from "./Nav";

function SideBar() {
  const { isexpanded } = useSidebar();

  return (
    <div className={`SideBar ${isexpanded ? "SmallSidebar" : "FullSidebar"}`}>
      Zara Admin
    </div>
  );
}

export default SideBar;
