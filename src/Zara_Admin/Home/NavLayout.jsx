import React from 'react';
import Nav from './Nav';
import SideBar from './SideBar';

const NavLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ width: '100%' }}>
        <Nav />
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavLayout;
