import React from "react";
import "./css.css";
import NewCoustmer from "./NewCoustmer/NewCoustmer";
import TopProducts from "./TopProducts/TopProducts";
import SalesProducts from "./SalesProducts/SalesProducts";

function MainArea() {
  return (
    <div className="MainArea">
      <div className="MainArea_Data">
        <NewCoustmer />
        <TopProducts />
        <SalesProducts title="Sale Product" />
        <SalesProducts title="Featured Product" />
      </div>
    </div>
  );
}

export default MainArea;
