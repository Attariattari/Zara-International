import React, { useState, useEffect, useRef, useContext } from "react";
import { useSidebar } from "../Context/SidebarContext";
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
import { GrGallery } from "react-icons/gr";
import { PiUserFocusDuotone } from "react-icons/pi";
import { FaOpencart } from "react-icons/fa6";
import { CgCarousel } from "react-icons/cg";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import "./Css.css";

function SideBar() {
  const { isexpanded } = useSidebar();
  const { openDrawer, toggleDrawer } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);
  const drawerRef = useRef(null);
  const { user, handleLogout } = useContext(userContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
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
          <li>
            <NavLink
              to="/Admin/Dashboard"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Dashboard"
            >
              <MdOutlineDashboard className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Dashboard</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Gallery"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Gallery"
            >
              <GrGallery className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Gallery</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Users"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Users"
            >
              <BiSolidUserAccount className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Users</span>
              )}
            </NavLink>
          </li>
        </ul>
        {/* <ul>
          <li>
            <NavLink
              to="/Admin/Manage-Users"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Manage Users"
            >
              <PiUserFocusDuotone className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Manage Users</span>
              )}
            </NavLink>
          </li>
        </ul> */}
        <ul>
          <li>
            <NavLink
              to="/Admin/Notifications"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Notification"
            >
              <MdEditNotifications className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Notification</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Messages"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Messages"
            >
              <SiGooglemessages className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Messages</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Add-Products"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Add Products"
            >
              <RiFunctionAddFill className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Add Products</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Product"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Products"
            >
              <AiOutlineProduct className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Products</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Featured-Product"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Featured Product"
            >
              <LuCombine className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Featured Product</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Sales-Product"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Sales Product"
            >
              <LuComponent className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Sales Product</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Main-Carousel"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Main Carousel"
            >
              <CgCarousel className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Main Carousel</span>
              )}
            </NavLink>
          </li>
        </ul>
        {/* <ul>
          <li>
            <NavLink
              to="/Admin/Products-Details/:name/:id"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Products Details"
            >
              <TbListDetails className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Products Details</span>
              )}
            </NavLink>
          </li>
        </ul> */}
        <ul>
          <li>
            <NavLink
              to="/Admin/Category"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Category"
            >
              <TbCategory2 className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Category</span>
              )}
            </NavLink>
          </li>
        </ul>

        {/* <ul>
          <li>
            <NavLink
              to="/Admin/Shopping-Cart"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Shopping Cart"
            >
              <FaOpencart className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Shopping Cart</span>
              )}
            </NavLink>
          </li>
        </ul> */}
        <ul>
          <li>
            <NavLink
              to="/Admin/Order"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Order"
            >
              <MdOutlineBorderColor className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Order</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Order-Details"
              className={({ isActive }) => (isActive ? "link active" : "link")}
              title="Order Details"
            >
              <TbListDetails className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Order Details</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
