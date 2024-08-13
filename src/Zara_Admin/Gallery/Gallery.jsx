import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import "./css.css";
import {
  MdOutlineGridView,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdClose,
} from "react-icons/md";
import { LiaGripHorizontalSolid } from "react-icons/lia";
import Spinner from "../../Spinner";

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
  const [loading, setLoading] = useState(false);
  const sortOrderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // "newest" or "oldest"
  const [sortOrder, setSortOrder] = useState("ascending");
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

  const handleDrop = async (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setIsLoading(true); // Start loading
      const result = await uploadImages(files);
      setIsLoading(false); // End loading
      console.log("Upload result:", result);
      if (result.success) {
        setMessage("Images uploaded successfully!");
        setMessageType("success");
        fetchImages();
      } else {
        setMessage("Failed to upload images.");
        setMessageType("error");
      }
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileInputChange = async (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setIsLoading(true); // Start loading
      const result = await uploadImages(files);
      setIsLoading(false); // End loading
      console.log("Upload result:", result);
      if (result.success) {
        setMessage("Images uploaded successfully!");
        setMessageType("success");
        fetchImages();
      } else {
        setMessage("Failed to upload images.");
        setMessageType("error");
      }
      setTimeout(() => setMessage(""), 5000);
    }

    fileInputRef.current.value = "";
  };

  const isValidImageURL = async (url) => {
    try {
      console.log(`Validating URL: ${url}`);
      const response = await fetch(url, { method: "HEAD" });
      console.log(`Response status for ${url}: ${response.status}`);
      if (!response.ok) throw new Error(`Failed to fetch HEAD for URL: ${url}`);
      const contentType = response.headers.get("Content-Type");
      console.log(`Content-Type for ${url}: ${contentType}`);
      return contentType && contentType.startsWith("image/");
    } catch (error) {
      console.error("Error validating image URL:", url, error);
      return false;
    }
  };
  const fetchImageAsFile = async (url) => {
    try {
      console.log(`Fetching image from URL: ${url}`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
      const blob = await response.blob();
      const fileName = url.split("/").pop() || "image";
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Error fetching image from URL:", url, error);
      return null;
    }
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const processImageURLs = async (urls) => {
    const validUrls = [];

    for (const url of urls) {
      if (url.trim() !== "") {
        const isValid = await isValidImageURL(url);
        if (isValid) validUrls.push(url);
        console.log(`URL is valid: ${isValid}`);
      }
    }

    if (validUrls.length === 0) {
      console.log("No valid URLs provided.");
      return { success: false, message: "No valid image URLs provided." };
    }

    const fetchedImages = [];

    for (const url of validUrls) {
      const image = await fetchImageAsFile(url);
      if (image) {
        fetchedImages.push(image);
        console.log(`Successfully fetched image from: ${url}`);
        await delay(1000); // Delay between fetches
      } else {
        console.error("Failed to fetch image from URL:", url);
      }
    }

    if (fetchedImages.length > 0) {
      setSelectedImages((prevImages) => [
        ...prevImages,
        ...fetchedImages.map((file) => URL.createObjectURL(file)),
      ]);

      const result = await uploadImages(fetchedImages);
      console.log("Upload result:", result);
      return result;
    } else {
      console.log("No valid images were fetched.");
      return { success: false, message: "No valid images were fetched." };
    }
  };

  const handleAddNow = async () => {
    setIsLoading(true);

    const urls = newInputText.split(/[\s,]+/);
    console.log("Processing URLs:", urls);

    const result = await processImageURLs(urls);

    if (result.success) {
      setMessage("Images added successfully!");
      setMessageType("success");
      setNewInputText("");
      setTimeout(() => setMessage(""), 5000);
    } else {
      setMessage(
        result.message || "Invalid URL(s) or failed to fetch image(s)."
      );
      setMessageType("error");
      setTimeout(() => setMessage(""), 10000);
    }

    setIsLoading(false);
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:1122/images/upload-gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("API response:", response);
      // Check the status and decide the result
      if (response.status === 201 || response.status === 200) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      return { success: false };
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

  const fetchImages = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:1122/images/");
      console.log(response);

      if (response.status === 200 && response.data.length > 0) {
        const images = response.data.flatMap((item) => item.images || []);
        setSelectedImages(images);
      } else {
        setMessage("No images found.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setMessage("Failed to fetch images.");
      setMessageType("error");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);
  // UseMemo for sorting images
  const sortedImages = useMemo(() => {
    // Clone the images array
    let images = [...selectedImages];

    console.log("Images before sorting:", images);

    // Sort by date
    if (sortBy === "newest") {
      images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      images.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    // Sort order
    if (sortOrder === "descending") {
      images.reverse();
    }

    console.log("Images after sorting:", images);

    return images;
  }, [selectedImages, sortBy, sortOrder]);

  // Handle sort by date
  const handleSortByChange = (option) => {
    setSortBy(option); // Update the sortBy state
    toggleDropdown("sortByDate");

    console.log("Sort by option changed:", option);
  };

  const handleSortOrderChange = (option) => {
    setSortOrder(option); // Update the sortOrder state
    toggleDropdown("sortOrder");

    // Apply sorting immediately after updating the sortOrder state
    const sorted = sortedImages(selectedImages, sortBy, option);
    console.log("Sorted images by order:", sorted);
    setSelectedImages(sorted); // Update the selected images with the sorted array
  };

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 80;

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;

  const paginatedImages = useMemo(() => {
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    return sortedImages.slice(indexOfFirstImage, indexOfLastImage);
  }, [sortedImages, currentPage, imagesPerPage]);

  const getImageIndex = (index) => {
    if (sortOrder === "ascending") {
      return indexOfFirstImage + index + 1;
    } else if (sortOrder === "descending") {
      return indexOfFirstImage + paginatedImages.length - index;
    }
    return indexOfFirstImage + index + 1; // Default to ascending
  };
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
            {isLoading && (
              <div className="spinner-overlay">
                <Spinner />
              </div>
            )}
            <div
              className={`Gallery_MainArea_File_Upload_Title ${
                isLoading ? "blurred" : ""
              }`}
            >
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
            <div
              className={`Gallery_MainArea_File_Upload_Title ${
                isLoading ? "blurred" : ""
              }`}
            >
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
                  {isLoading ? "Processing..." : "Add Now"}
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
              <div
                className="Second-nav-gallery cursor-not-allowed"
                ref={sortByDateRef}
              >
                <div
                  className="sort-by-date"
                  // onClick={() => toggleDropdown("sortByDate")}
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
                      <li onClick={() => handleSortByChange("newest")}>
                        Newest First
                      </li>
                      <li onClick={() => handleSortByChange("oldest")}>
                        Oldest First
                      </li>
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
                      <li onClick={() => handleSortOrderChange("ascending")}>
                        Ascending
                      </li>
                      <li onClick={() => handleSortOrderChange("descending")}>
                        Descending
                      </li>
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
          {loading && (
            <div className="loading-overlay">
              <Spinner /> {/* Display the spinner */}
            </div>
          )}
          {viewMode === "table" ? (
            <div className="gallery_table">
              {paginatedImages.length > 0 ? (
                paginatedImages.map((image, index) => (
                  <div
                    key={indexOfFirstImage + index}
                    className={`Gallery_Image_table ${
                      focusedImageIndex === indexOfFirstImage + index
                        ? "focused"
                        : ""
                    }`}
                    onClick={() => handleImageClick(indexOfFirstImage + index)} // Make the whole div clickable
                  >
                    <p className="image-index-number">{getImageIndex(index)}</p>
                    <img
                      src={image}
                      alt=""
                      className={
                        focusedImageIndex === indexOfFirstImage + index
                          ? "focused"
                          : ""
                      }
                    />
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
                paginatedImages.length > 0 ? "Grid_Gallery" : "Empty_Grid"
              }
            >
              {paginatedImages.length > 0 ? (
                paginatedImages.map((image, index) => (
                  <div key={index} className={`Gallery_Image ${viewMode}`}>
                    <p className="image-index-number-grid">
                      {getImageIndex(index)}
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
