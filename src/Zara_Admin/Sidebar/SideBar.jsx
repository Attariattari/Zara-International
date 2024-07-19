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
          <li>
            <NavLink
              to="/Admin/Dashboard"
              className="link"
              activeClassName="active"
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
              to="/Admin/Users"
              className="link"
              activeClassName="active"
              title="Users"
            >
              <BiSolidUserAccount className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Users</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Manage-Users"
              className="link"
              activeClassName="active"
              title="Manage Users"
            >
              <PiUserFocusDuotone className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Manage Users</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Notifications"
              className="link"
              activeClassName="active"
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
              className="link"
              activeClassName="active"
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
              to="/Admin/Product"
              className="link"
              activeClassName="active"
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
              className="link"
              activeClassName="active"
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
              className="link"
              activeClassName="active"
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
              className="link"
              activeClassName="active"
              title="Main Carousel"
            >
              <CgCarousel className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Main Carousel</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Products-Details"
              className="link"
              activeClassName="active"
              title="Products Details"
            >
              <TbListDetails className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Products Details</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Category"
              className="link"
              activeClassName="active"
              title="Category"
            >
              <TbCategory2 className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Category</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Add-Products"
              className="link"
              activeClassName="active"
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
              to="/Admin/Shopping-Cart"
              className="link"
              activeClassName="active"
              title="Shopping Cart"
            >
              <FaOpencart className="icon" />
              {((!isexpanded && !isMobile) || (isMobile && openDrawer)) && (
                <span className="cursor-pointer">Shopping Cart</span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul>
          <li>
            <NavLink
              to="/Admin/Order"
              className="link"
              activeClassName="active"
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
              className="link"
              activeClassName="active"
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
