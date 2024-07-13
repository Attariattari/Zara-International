import React, { useState } from "react";
import { BsJustify } from "react-icons/bs";
import { useSidebar } from "./SidebarContext";
function Navbar({ handleClick }) {
  const [dropdownVisible, setDropdownVisible] = useState({
    createNew: false,
    notifications: false,
    userData: false,
  });
  const { toggleExpanded } = useSidebar();
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

  return (
    <div className="Nav">
      <div className="FirstMenu">
        <BsJustify onClick={() => toggleExpanded()} className="icon" />
        <div className="nav-First">
          <div
            className="create-new"
            onClick={() => toggleDropdown("createNew")}
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
          <div className="user-data" onClick={() => toggleDropdown("userData")}>
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
      </div>
    </div>
  );
}

export default Navbar;
