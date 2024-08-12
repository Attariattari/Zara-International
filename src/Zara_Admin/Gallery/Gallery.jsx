import React, { useState, useRef, useEffect } from "react";
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
  const [searchText, setSearchText] = useState("");
  const [newInputText, setNewInputText] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [uploadVisible, setUploadVisible] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"
  const fileInputRef = useRef(null);
  const sortByDateRef = useRef(null);
  const sortOrderRef = useRef(null);
  const inputRef = useRef(null);
  const newInputRef = useRef(null);
  const [focusedImageIndex, setFocusedImageIndex] = useState(null);
  const [focusedImageGridIndex, setFocusedImageGridIndex] = useState(null);

  const handleImageClick = (index) => {
    setFocusedImageIndex(index);
  };
  const handleImageGridClick = (index) => {
    setFocusedImageGridIndex(index);
  };

  useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode");
    if (savedViewMode) {
      setViewMode(savedViewMode);
    }
  }, []);

  const toggleDropdown = (menu) => {
    setDropdownVisible((prevState) => ({
      sortByDate: menu === "sortByDate" ? !prevState.sortByDate : false,
      sortOrder: menu === "sortOrder" ? !prevState.sortOrder : false,
    }));
  };

  const handleClearSearch = () => {
    setSearchText("");
    inputRef.current.focus();
  };

  const handleClearNewInput = () => {
    setNewInputText("");
    newInputRef.current.focus();
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  const toggleUploadVisibility = () => {
    setUploadVisible((prev) => !prev);
  };

  const toggleUploadVisibilityClose = () => {
    setUploadVisible(false);
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const isValidImageURL = (url) => {
    // Simple regex to check if the URL ends with common image file extensions
    return /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url);
  };

  const processFiles = (files) => {
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const processImageURLs = async (urls) => {
    // Filter out empty URLs and ensure each URL is unique
    const validUrls = Array.from(
      new Set(urls.filter((url) => url.trim() !== "" && isValidImageURL(url)))
    );

    if (validUrls.length === 0) {
      return { success: false };
    }

    const fetchedImages = await Promise.all(
      validUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        } catch (error) {
          console.error("Failed to fetch image:", url, error);
          return null;
        }
      })
    );

    // Filter out null values and add new images to the gallery
    const filteredImages = fetchedImages.filter((image) => image !== null);
    if (filteredImages.length > 0) {
      setSelectedImages((prevImages) => [...prevImages, ...filteredImages]);
      return { success: true };
    } else {
      return { success: false };
    }
  };

  const handleAddNow = async () => {
    const urls = newInputText.split(/[\s,]+/); // Split by space, comma, or newline
    const result = await processImageURLs(urls);

    if (result.success) {
      setMessage("Images added successfully!");
      setMessageType("success");
      setNewInputText(""); // Clear the input field after successful image processing
      setTimeout(() => setMessage(""), 5000); // Hide success message after 5 seconds
    } else {
      setMessage("Invalid URL(s) or failed to fetch image(s).");
      setMessageType("error");
      setTimeout(() => setMessage(""), 10000); // Hide error message after 10 seconds
    }
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

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 4; // Number of images to show per page

  // Pagination logic
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = selectedImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(selectedImages.length / imagesPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="Gallery">
      <div className="Gallery_MainArea">
        <div className="Gallery_MainArea_First">
          <p className="Gallery_MainArea_Fisrt_Title">Media Gallery</p>
          <button
            className="Gallery_MainArea_Fisrt_Button"
            onClick={toggleUploadVisibility}
          >
            Add New Media File
          </button>{" "}
          <div className="Gallery_MainArea_Second_Icon">
            <LiaGripHorizontalSolid
              className={`icons ${viewMode === "table" ? "active" : ""}`}
              onClick={() => handleViewChange("table")}
            />
            <MdOutlineGridView
              className={`icons ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => handleViewChange("grid")}
            />
          </div>
        </div>

        {uploadVisible && (
          <div
            className={`Gallery_MainArea_File_Upload ${
              uploadVisible ? "visible" : ""
            } ${isDragOver ? "drag-over" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="Gallery_MainArea_File_Upload_Title">
              <p className="title">Drop files to upload</p>
              <p className="or">or</p>
              <button
                className="Gallery_MainArea_File_Upload_Button"
                onClick={handleFileSelect}
              >
                Select File
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                multiple
                onChange={handleFileInputChange}
              />
            </div>
            <div className="Gallery_MainArea_File_Upload_Title">
              <p className="or">Maximum upload 20 Images</p>
              <div className="search-input-wrapper-file">
                <div className="search-input-wrapper-file-input">
                  <input
                    placeholder="Paste image URLs here."
                    type="text"
                    ref={newInputRef}
                    value={newInputText}
                    onChange={(e) => setNewInputText(e.target.value)}
                  />
                  {newInputText && (
                    <MdClose
                      className="clear-icon-file"
                      onClick={handleClearNewInput}
                    />
                  )}
                </div>
                <button
                  className="Gallery_MainArea_File_Upload_Add"
                  onClick={handleAddNow}
                >
                  Add Now
                </button>
              </div>
              {message && <p className={`message ${messageType}`}>{message}</p>}
            </div>
            <div className="PopupCloseButton">
              <MdClose
                onClick={toggleUploadVisibilityClose}
                className="Close"
              />
            </div>
          </div>
        )}

        <div className="Gallery_MainArea_Second">
          <div className="Gallery_MainArea_Second_Area">
            <div className="Gallery_MainArea_Second_Icons ">
              <LiaGripHorizontalSolid
                className={`icons ${viewMode === "table" ? "active" : ""}`}
                onClick={() => handleViewChange("table")}
              />
              <MdOutlineGridView
                className={`icons ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => handleViewChange("grid")}
              />
            </div>
            <div className="Second-nav-gallery-dropdowns">
              <div className="Second-nav-gallery" ref={sortByDateRef}>
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
                  <div className="dropdown-menu-gallry">
                    <ul>
                      <li>Newest First</li>
                      <li>Oldest First</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="Second-nav-gallery" ref={sortOrderRef}>
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
                  <div className="dropdown-menu-gallry">
                    <ul>
                      <li>Ascending</li>
                      <li>Descending</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="slect-bulk">Select Bulk</div>
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
                placeholder="Enter Text Here"
              />
              {searchText && (
                <MdClose className="clear-icon" onClick={handleClearSearch} />
              )}
            </div>
          </div>
        </div>
        {/* Image Gallery Area */}
        <div className="Gallery-title">
          <p>Images Section.</p>
        </div>
        <div className="gallery_area">
          {viewMode === "table" ? (
            <div className="gallery_table">
              {currentImages.length > 0 ? (
                currentImages.map((image, index) => (
                  <div
                    key={indexOfFirstImage + index}
                    className={`Gallery_Image_table ${viewMode}`}
                  >
                    <p className="image-index-number">
                      {indexOfFirstImage + index + 1}
                    </p>
                    <img
                      src={image}
                      alt=""
                      className={
                        focusedImageIndex === indexOfFirstImage + index
                          ? "focused"
                          : ""
                      }
                      onClick={() =>
                        handleImageClick(indexOfFirstImage + index)
                      }
                    />
                    <div>
                      <p className="Table-image-title">hello</p>
                      <button className="Table-image-Button">View</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="No_Images">
                  No images uploaded or fetched yet.
                </div>
              )}
            </div>
          ) : (
            <div
              className={
                currentImages.length > 0 ? "Grid_Gallery" : "Empty_Grid"
              }
            >
              {currentImages.length > 0 ? (
                currentImages.map((image, index) => (
                  <div key={index} className={`Gallery_Image ${viewMode}`}>
                    <p className="image-index-number-grid">
                      {indexOfFirstImage + index + 1}
                    </p>
                    <img
                      src={image}
                      alt=""
                      onClick={() =>
                        handleImageGridClick(indexOfFirstImage + index)
                      }
                      className={
                        focusedImageGridIndex === indexOfFirstImage + index
                          ? "focused"
                          : ""
                      }
                      onError={(e) => (e.target.style.display = "none")} // Hide image if it fails to load
                    />
                  </div>
                ))
              ) : (
                <div className="No_Images">
                  No images uploaded or fetched yet.
                </div>
              )}
            </div>
          )}

          {selectedImages.length > imagesPerPage && (
            <div className="pagination_controls">
              <span>Page {currentPage}</span>{" "}
              {currentPage > 1 && (
                <button onClick={handlePreviousPage}>Previous</button>
              )}
              {currentPage <
                Math.ceil(selectedImages.length / imagesPerPage) && (
                <button onClick={handleNextPage}>Next</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
