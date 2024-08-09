import React, { useState, useEffect, useRef, useContext } from "react";
import { BsJustify } from "react-icons/bs";
import {
  MdOutlineLightMode,
  MdDarkMode,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdCircleNotifications,
} from "react-icons/md";
import { useSidebar } from "../Context/SidebarContext";
import { useTheme } from "../Context/ThemeContext";
import "./Css.css";
import { userContext } from "../../Context/UserContext";
import { PiUserSwitchFill } from "react-icons/pi";
import axios from "axios";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState({
    createNew: false,
    notifications: false,
    userData: false,
  });
  const [notifications, setNotifications] = useState([]); // Add state for notifications
  const [loading, setLoading] = useState(false);
  const { toggleExpanded, toggleDrawer } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user, handleLogout } = useContext(userContext);
  const notificationsRef = useRef(null);
  const userDataRef = useRef(null);
  const [error, setError] = useState(null);
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
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target) &&
        userDataRef.current &&
        !userDataRef.current.contains(event.target)
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

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     if (!user?._id) return;

  //     setLoading(true);
  //     try {
        
  //       const response = await axios.get(
  //         `http://localhost:1122/Notification/${user._id}`
  //       );
  //       setNotifications(response.data.notifications);
  //       setError(null);
  //     } catch (error) {
  //       console.error("Failed to fetch notifications:", error);
  //       setError("Failed to fetch notifications. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (user && user._id) {
  //     fetchNotifications();
  //     const intervalId = setInterval(fetchNotifications, 5000); // Polling every 5 seconds

  //     return () => clearInterval(intervalId); // Clean up on unmount
  //   }
  // }, [user]);

  return (
    <div className="Nav">
      <div className="FirstMenu">
        <BsJustify onClick={handleSidebarToggle} className="icon" />
      </div>
      <div className="Second-Menu">
        <div className="Second-nav" ref={notificationsRef}>
          <div
            className="notifications"
            onClick={() => toggleDropdown("notifications")}
          >
            <MdCircleNotifications className="icon" />
            {dropdownVisible.notifications ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
          {dropdownVisible.notifications && (
            <div className="dropdown-menu overflow-y-auto">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <ul>
                  {notifications && notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <li key={notification._id}>
                        <p>{notification.type}</p>
                        <p>{notification.message}</p>
                      </li>
                    ))
                  ) : (
                    <li>No notifications</li>
                  )}
                </ul>
              )}
            </div>
          )}
        </div>
        <div className="Second-nav" ref={userDataRef}>
          <div className="user-data" onClick={() => toggleDropdown("userData")}>
            <div className="user-data-user">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" />
              ) : (
                <PiUserSwitchFill className="profileicon" />
              )}
            </div>
            {dropdownVisible.userData ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </div>
          {dropdownVisible.userData && (
            <div className="dropdown-menu">
              <ul>
                <li>{user.firstname}</li>
                <li>{user.email}</li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
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