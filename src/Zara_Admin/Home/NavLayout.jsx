import React from 'react';
import Nav from '../Nav/Nav';
import { Outlet } from 'react-router-dom';
import SideBar from '../Sidebar/SideBar';

const NavLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ width: '100%' }}>
        <Nav />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default NavLayout;
