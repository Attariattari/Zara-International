import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import "./SingleProduct.css";
import { Link } from "react-router-dom";
import { IoVolumeMuteOutline, IoVolumeHighOutline } from "react-icons/io5"; // Import volume icons
import Composetion from "./CompositionArea/Composetion";

function SingleProduct() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="sticky top-0 z-10">
        <div className="absolute w-full">
          <Navbar />
        </div>
      </div>
      <div className="SingleProduct">
        <div className="Main_Area">
          <div
            className={`COMPOSITIONAREA ${
              expanded ? "expanded" : "compact overflow-auto"
            }`}
          >
            <Composetion expanded={expanded} toggleExpanded={toggleExpanded} />
          </div>
          <div className="CarosualArea">CAROSUAL AREA </div>
          <div className="AllProductDataView">PRODUCT DEATILED DATA </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
