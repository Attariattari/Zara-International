import React, { useState, useEffect } from "react";
import "./New.css";
import Navbar from "../Navbar/Navbar";
import FullDisplayWithOutDetails from "../NewAllProducts/ProductsPages/FullDisplayWithOutDetails";
import SamallDipalyProducts from "../NewAllProducts/ProductsPages/SamallDipalyProducts";
import DetailsDisplayProduct from "../NewAllProducts/ProductsPages/DetailsDisplayProduct";

function New() {
  const [selectedComponent, setSelectedComponent] = useState(
    localStorage.getItem("selectedComponent") || "FullDisplay"
  );

  const [isIconsVisible, setIsIconsVisible] = useState(true);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
    localStorage.setItem("selectedComponent", component);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      setIsIconsVisible(currentPosition < prevScrollPosition);
      setPrevScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPosition]);

  useEffect(() => {
    const storedComponent = localStorage.getItem("selectedComponent");
    if (storedComponent) {
      setSelectedComponent(storedComponent);
    }
  }, []);

  useEffect(() => {
    const flterViewElement = document.querySelector(".FlterView");

    if (flterViewElement) {
      if (!isIconsVisible) {
        flterViewElement.style.transition = "opacity 0.2s ease";
        flterViewElement.style.opacity = 0;
      } else {
        flterViewElement.style.transition = "opacity 0.2s ease";
        flterViewElement.style.opacity = 1;
      }
    }
  }, [isIconsVisible]);

  return (
    <div>
      <div className="sticky top-0 z-10">
        <div className="absolute w-full">
          <Navbar />
        </div>
        <div className="Productfilterveiw">
          <div>
            <svg
              className={`view-option-selector-button__icon ${
                selectedComponent === "FullDisplay" ? "activeIcon" : ""
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
              onClick={() => handleComponentChange("FullDisplay")}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.4 4.6H4.6v14.8h14.8V4.6zm-15.8-1v16.8h16.8V3.6H3.6z"
              ></path>
            </svg>
          </div>
          <div>
            <svg
              className={`view-option-selector-button__icon ${
                selectedComponent === "DetailsDisplay" ? "activeIcon" : ""
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
              onClick={() => handleComponentChange("DetailsDisplay")}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"
              ></path>
            </svg>
          </div>
          <div>
            <svg
              className={`view-option-selector-button__icon ${
                selectedComponent === "SamallDipaly" ? "activeIcon" : ""
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
              onClick={() => handleComponentChange("SamallDipaly")}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="New">
        {selectedComponent === "FullDisplay" && <FullDisplayWithOutDetails />}
        {selectedComponent === "DetailsDisplay" && <DetailsDisplayProduct />}
        {selectedComponent === "SamallDipaly" && <SamallDipalyProducts />}
      </div>
    </div>
  );
}

export default New;
