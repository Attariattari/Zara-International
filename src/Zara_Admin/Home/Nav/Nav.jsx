import React, { useState, useEffect, useRef, useContext } from "react";
import { BsJustify } from "react-icons/bs";
import {
  MdOutlineLightMode,
  MdDarkMode,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { useSidebar } from "../../Context/SidebarContext";
import { useTheme } from "../../Context/ThemeContext";
import "../Nav/Css.css";
import axios from "axios";
import { userContext } from "../../../Context/UserContext";
import { PiUserSwitchFill } from "react-icons/pi";

function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState({
    createNew: false,
    notifications: false,
    userData: false,
  });
  const { toggleExpanded, toggleDrawer } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { user, setUser } = useContext(userContext);
  const createNewRef = useRef(null);
  const notificationsRef = useRef(null);
  const userDataRef = useRef(null);

  const getUserInfo = async () => {};

  // Example usage

  useEffect(() => {
    const fetchuserInfo = async () => {
      try {
        const response = await axios.post(
          "http://localhost:1122/user/getUserInfo",
          {
            withCredentials: true, // Ensure cookies are sent with the request
          }
        );
        console.log("User Info:", response.data);
        return response.data;
      } catch (error) {
        console.error("Failed to get user info", error);
        throw new Error("Failed to get user info. Please try again.");
      }
    };
    fetchuserInfo().then((data) => {
      if (data && data.status === "success") {
        fetchUserData(data.userId, data.token);
      }
    });
  }, []);

  const fetchUserData = async (userId, token) => {
    try {
      const response = await axios.get(
        `http://localhost:1122/user/Auth/${userId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        console.log("User Data:", response.data.user);
        setUser(response.data.user);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
        createNewRef.current &&
        !createNewRef.current.contains(event.target) &&
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

  return (
    <div className="Nav">
      <div className="FirstMenu">
        <BsJustify onClick={handleSidebarToggle} className="icon" />
        <div className="nav-First" ref={createNewRef}>
          <div
            className="create-new"
            onClick={() => toggleDropdown("createNew")}
          >
            Create New{" "}
            {dropdownVisible.createNew ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
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
        <div className="Second-nav" ref={notificationsRef}>
          <div
            className="notifications"
            onClick={() => toggleDropdown("notifications")}
          >
            Notifications{" "}
            {dropdownVisible.notifications ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
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
        <div className="Second-nav" ref={userDataRef}>
          <div className="user-data" onClick={() => toggleDropdown("userData")}>
          <div className="user-data-user">
          {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" />
              ) : (
                <PiUserSwitchFill className="profileicon" />
              )}
              <p>{user.firstname || "User Data"}</p>
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
