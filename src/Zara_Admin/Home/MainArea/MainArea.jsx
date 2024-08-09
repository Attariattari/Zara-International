import React from "react";
import "./css.css";
import NewCoustmer from "./NewCoustmer/NewCoustmer";
import TopProducts from "./TopProducts/TopProducts";
import SalesProducts from "./SalesProducts/SalesProducts";
import Users from "./Users/Users";

function MainArea() {
  return (
    <div className="MainArea">
      <div className="MainArea_Data">
        <NewCoustmer />
        <TopProducts />
        <SalesProducts />
        <Users />
      </div>
    </div>
  );
}

export default MainArea;
