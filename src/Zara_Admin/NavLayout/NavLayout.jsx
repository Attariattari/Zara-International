import React, { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import SideBar from "../Sidebar/SideBar";
import { userContext } from "../../Context/UserContext";
import './css.css'

const NavLayout = () => {
  const { isTokenValid } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    const delayTime = 100; // 1 second delay

    const timer = setTimeout(() => {
      if (!isTokenValid) {
        navigate("/Admin/Autanticate");
      }
    }, delayTime);

    // Cleanup the timeout if the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [isTokenValid, navigate]);

  return (
    <div className="nav-layout">
      <SideBar className="sidebar" />
      <div className="main-content">
        <Nav className="navbar" />
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NavLayout;
