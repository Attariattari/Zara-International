import React from "react";
import "./css.css";
import { MdOutlineGridView } from "react-icons/md";
import { LiaGripHorizontalSolid } from "react-icons/lia";
function Gallery() {
  return (
    <div className="Gallery">
      <div className="Gallery_MainArea">
        <div className="Gallery_MainArea_First">
          <p className="Gallery_MainArea_Fisrt_Title">Media Gallery</p>
          <button className="Gallery_MainArea_Fisrt_Button">
            Add New Media File
          </button>
        </div>
        <div className="Gallery_MainArea_Second">
          <div className="Gallery_MainArea_Second_Icons">
            <LiaGripHorizontalSolid className="icons" />
            <MdOutlineGridView className="icons" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
