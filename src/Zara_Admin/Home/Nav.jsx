import React from "react";
import { Outlet } from "react-router-dom";

function Navbar() {
  return (
    <div className="Nav">
      Navbar Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit,
      in minima at non debitis voluptas similique autem, a doloremque explicabo
      illum quidem est. Dicta cumque corporis reiciendis ducimus neque ut.
      <Outlet />
    </div>
  );
}

export default Navbar;
