import React, { useState, useEffect, useRef } from "react";
import { BsJustify } from "react-icons/bs";
import { useSidebar } from "../Context/SidebarContext";
import { useTheme } from "../Context/ThemeContext";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";

function Navbar({ handleClick }) {
  const [dropdownVisible, setDropdownVisible] = useState({
    createNew: false,
    notifications: false,
    userData: false,
  });
  const { toggleExpanded, toggleDrawer } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const createNewRef = useRef(null);
  const notificationsRef = useRef(null);
  const userDataRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => {
    if (isMobile) {
      toggleDrawer();
    } else {
      toggleExpanded();
    }
  };

  const toggleDropdown = (menu) => {
    setDropdownVisible((prevState) => {
      const newState = {
        createNew: false,
        notifications: false,
        userData: false,
      };
      return {
        ...newState,
        [menu]: !prevState[menu],
      };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        createNewRef.current && !createNewRef.current.contains(event.target) &&
        notificationsRef.current && !notificationsRef.current.contains(event.target) &&
        userDataRef.current && !userDataRef.current.contains(event.target)
      ) {
        setDropdownVisible({
          createNew: false,
          notifications: false,
          userData: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="Nav">
      <div className="FirstMenu">
        <BsJustify onClick={handleSidebarToggle} className="icon" />
        <div className="nav-First">
          <div
            className="create-new"
            onClick={() => toggleDropdown("createNew")}
            ref={createNewRef}
          >
            Create New
          </div>
          {dropdownVisible.createNew && (
            <div className="dropdown-menu">
              <ul>
                <li>Option 1</li>
                <li>Option 2</li>
                <li>Option 3</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="Second-Menu">
        <div className="Second-nav">
          <div
            className="notifications"
            onClick={() => toggleDropdown("notifications")}
            ref={notificationsRef}
          >
            Notifications
          </div>
          {dropdownVisible.notifications && (
            <div className="dropdown-menu">
              <ul>
                <li>Notification 1</li>
                <li>Notification 2</li>
                <li>Notification 3</li>
              </ul>
            </div>
          )}
        </div>
        <div className="Second-nav">
          <div
            className="user-data"
            onClick={() => toggleDropdown("userData")}
            ref={userDataRef}
          >
            User Data
          </div>
          {dropdownVisible.userData && (
            <div className="dropdown-menu">
              <ul>
                <li>User Info 1</li>
                <li>User Info 2</li>
                <li>User Info 3</li>
              </ul>
            </div>
          )}
        </div>
        <div className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
