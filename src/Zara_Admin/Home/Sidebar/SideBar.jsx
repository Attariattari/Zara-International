import "./Css.css";
import React, { useState, useEffect, useRef } from "react";
import { useSidebar } from "../../Context/SidebarContext";
import {
  MdEditNotifications,
  MdOutlineBorderColor,
  MdOutlineDashboard,
} from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { BiSolidUserAccount } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { RiFunctionAddFill } from "react-icons/ri";
import { TbCategory2, TbListDetails } from "react-icons/tb";
import { LuCombine, LuComponent } from "react-icons/lu";
import { PiUserFocusDuotone } from "react-icons/pi";
import { FaOpencart } from "react-icons/fa6";
import { CgCarousel } from "react-icons/cg";
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
            <li className="cursor-pointer">Dashboard</li>
          )}
        </ul>
        <ul>
          <li data-tip="Dashboard">
            <BiSolidUserAccount className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Users</li>
          )}
        </ul>
        <ul>
          <li data-tip="Dashboard">
            <PiUserFocusDuotone className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Manage Users</li>
          )}
        </ul>
        <ul>
          <li data-tip="Dashboard">
            <MdEditNotifications className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Notification</li>
          )}
        </ul>
        <ul>
          <li data-tip="Dashboard">
            <SiGooglemessages className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Messages</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <AiOutlineProduct className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Products</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <LuCombine className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Featured Product</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <LuComponent className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Sales Product</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <CgCarousel className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Main Carousel</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <TbListDetails className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Products Details</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <TbCategory2 className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Catgeory</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <RiFunctionAddFill className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Add Products</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <FaOpencart className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Shopping Cart</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <MdOutlineBorderColor className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Order</li>
          )}
        </ul>
        <ul>
          <li data-tip="Products">
            <TbListDetails className="icon" />
          </li>
          {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
            <li className="cursor-pointer">Order Details</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
