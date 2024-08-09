import React, { useState, useEffect, useRef } from "react";
import "./css.css";
import {
  MdOutlineGridView,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdClose,
} from "react-icons/md";
import { LiaGripHorizontalSolid } from "react-icons/lia";

function Gallery() {
  const [dropdownVisible, setDropdownVisible] = useState({
    sortByDate: false,
    sortOrder: false,
  });
  const [searchText, setSearchText] = useState(""); // State for input text
  const [viewMode, setViewMode] = useState("table"); // Default view mode

  const sortByDateRef = useRef(null);
  const sortOrderRef = useRef(null);
  const inputRef = useRef(null); // Ref for the input field

  useEffect(() => {
    // Retrieve the saved view mode from localStorage on component mount
    const savedViewMode = localStorage.getItem("viewMode");
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  const toggleDropdown = (menu) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleClearSearch = () => {
    setSearchText(""); // Clear the input
    inputRef.current.focus(); // Focus back on the input after clearing
  };

  const handleViewChange = (mode) => {
    setViewMode(mode); // Set the view mode
    localStorage.setItem("viewMode", mode); // Save the selected view mode to localStorage
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortByDateRef.current &&
        !sortByDateRef.current.contains(event.target) &&
        sortOrderRef.current &&
        !sortOrderRef.current.contains(event.target)
      ) {
        setDropdownVisible({
          sortByDate: false,
          sortOrder: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          <div className="Gallery_MainArea_Second_Area">
            <div className="Gallery_MainArea_Second_Icons">
              <LiaGripHorizontalSolid
                className={`icons ${viewMode === "table" ? "active" : ""}`}
                onClick={() => handleViewChange("table")}
              />
              <MdOutlineGridView
                className={`icons ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => handleViewChange("grid")}
              />
            </div>
            <div className="Second-nav" ref={sortByDateRef}>
              <div
                className="sort-by-date"
                onClick={() => toggleDropdown("sortByDate")}
              >
                <div className="sort-by-date-user">Sort by Date</div>
                {dropdownVisible.sortByDate ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </div>
              {dropdownVisible.sortByDate && (
                <div className="dropdown-menu">
                  <ul>
                    <li>Newest First</li>
                    <li>Oldest First</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="Second-nav" ref={sortOrderRef}>
              <div
                className="sort-order"
                onClick={() => toggleDropdown("sortOrder")}
              >
                <div className="sort-order-user">Sort Order</div>
                {dropdownVisible.sortOrder ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </div>
              {dropdownVisible.sortOrder && (
                <div className="dropdown-menu">
                  <ul>
                    <li>Ascending</li>
                    <li>Descending</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="Gallery_MainArea_Second_Area_Second">
            <p>Search media</p>
            <div className="search-input-wrapper">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                ref={inputRef}
                placeholder="Enter Text"
              />
              {searchText && (
                <MdClose className="clear-icon" onClick={handleClearSearch} />
              )}
            </div>
          </div>
        </div>
        <div className="gallery_area">
          {viewMode === "table" ? (
            <div>Table Data</div>
          ) : (
            <div>Grid Data</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
