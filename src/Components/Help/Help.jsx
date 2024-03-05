import React from "react";
import "./Help.css";
import Navbar from "../Navbar/Navbar";
function Help() {
  return (
    <div className="Help">
      <div className="sticky top-0 z-10"
      style={{
        marginTop:'-9px'
      }}
      >
        <div className="absolute w-full bg-white">
          <Navbar />
        </div>
      </div>
      <div className="pt-32">Help</div>
    </div>
  );
}

export default Help;
