import React from "react";
import './css.css'
function User() {
  return (
    <div>
      <ul className="menu cf">
        <li>
          <a href>Menu item</a>
          <ul className="submenu">
            <li>
              <a href>Submenu item</a>
            </li>
            <li>
              <a href>Submenu item</a>
            </li>
          </ul>
        </li>
        <li>
          <a href>Menu item</a>
          <ul className="submenu">
            <li>
              <a href>Submenu item</a>
            </li>
            <li>
              <a href>Submenu item</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default User;
