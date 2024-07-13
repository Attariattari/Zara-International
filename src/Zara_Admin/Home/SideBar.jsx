import "./Css.css";
import React, { useState, useEffect, useRef } from "react";
import { useSidebar } from "../Context/SidebarContext";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { RiFunctionAddFill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";

function SideBar() {
  const { isexpanded } = useSidebar();
  const { openDrawer, toggleDrawer } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value on component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeDrawer = () => {
    toggleDrawer(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        closeDrawer();
      }
    };

    if (openDrawer) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDrawer]);

  return (
    <div
      ref={drawerRef}
      className={
        isMobile
          ? `Drawer ${openDrawer ? "DrawerOpen" : "DrawerClosed"}`
          : `SideBar ${isexpanded ? "SmallSidebar" : "FullSidebar"}`
      }
    >
      <div className="SideBarLogo">
        <div className="">
          <img
            src="https://res.cloudinary.com/dg5gwixf1/image/upload/v1720876108/1706786499282_yn2uls.jpg"
            alt=""
          />
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <p className="font-sans">Zara Admin</p>
          )}
        </div>
      </div>
      <div className="SideBar_Menu">
        <ul>
          <li data-tip="Dashboard">
            <MdOutlineDashboard className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li>Dashboard</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <AiOutlineProduct className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li>Products</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <RiFunctionAddFill className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li>Add Products</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <TbListDetails className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li>Products Details</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
