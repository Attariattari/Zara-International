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
  const [viewMode, setViewMode] = useState("table");
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // "newest" or "oldest"
  const [sortOrder, setSortOrder] = useState("ascending");
  const [focusedImageIndex, setFocusedImageIndex] = useState(null);
  const [focusedImageGridIndex, setFocusedImageGridIndex] = useState(null);
  const [isBulkSelect, setIsBulkSelect] = useState(false);
  const [bulkImages, setBulkImages] = useState([]);
  const [newInputText, setNewInputText] = useState("");
  const [uploadVisible, setUploadVisible] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "error" or "success"
  const [galleryName, setGalleryName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [galleryNameRequired, setGalleryNameRequired] = useState(false);
  const [currentStep, setCurrentStep] = useState("addName");
  const [conversionInProgress, setConversionInProgress] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sortByDateRef = useRef(null);
  const sortOrderRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const newInputRef = useRef(null);

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

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFiles(Array.from(files)); // Store files in state
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
      setSelectedFiles(Array.from(files)); // Store files in state
    }
    fileInputRef.current.value = "";
  };
  const areValidURLs = async (inputText) => {
    const urls = inputText.split(/[\s,]+/).filter((url) => url.trim() !== "");
    const validUrls = await Promise.all(urls.map(isValidImageURL));
    return validUrls.every((isValid) => isValid);
  };
  useEffect(() => {
    const checkURLs = async () => {
      if (newInputText.trim()) {
        const valid = await areValidURLs(newInputText);
        setButtonVisible(valid);
      } else {
        setButtonVisible(false);
      }
    };

    checkURLs();
  }, [newInputText]);
  // Function to validate image URLs
  const isValidImageURL = async (url) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (!response.ok) throw new Error("Failed to fetch HEAD for URL");
      const contentType = response.headers.get("Content-Type");
      return contentType && contentType.startsWith("image/");
    } catch (error) {
      console.error("Error validating image URL:", url, error);
      return false;
    }
  };
  // Function to fetch image from URL and convert to file
  const fetchImageAsFile = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch image");
      const blob = await response.blob();
      const fileName = url.split("/").pop() || "image";
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error("Error fetching image from URL:", url, error);
      return null;
    }
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // Process image URLs to validate and fetch images
  const processImageURLs = async (urls) => {
    const validUrls = [];
    const fetchedImages = [];

    // Validate URLs concurrently
    const validationPromises = urls.map(async (url) => {
      if (url.trim() !== "") {
        const isValid = await isValidImageURL(url);
        if (isValid) {
          validUrls.push(url);
        }
      }
    });

    await Promise.all(validationPromises);

    if (validUrls.length === 0) {
      return { success: false, message: "No valid image URLs provided." };
    }

    // Fetch images concurrently
    const fetchPromises = validUrls.map(async (url) => {
      const image = await fetchImageAsFile(url);
      if (image) {
        fetchedImages.push(image);
      }
    });

    await Promise.all(fetchPromises);

    if (fetchedImages.length > 0) {
      setSelectedFiles(fetchedImages);
      return { success: true, fetchedImages };
    } else {
      return { success: false, message: "No valid images were fetched." };
    }
  };

  const handleAddNow = async () => {
    if (!buttonVisible) return;

    if (currentStep === "addName") {
      // Check if galleryName is provided
      if (!galleryName.trim()) {
        setGalleryNameRequired(true);
        setMessage("Please enter a gallery name.");
        setMessageType("error");
        return;
      }

      // Move to the next step
      setCurrentStep("convert");
      setMessage("Gallery name added. Converting images...");
      return;
    }

    if (currentStep === "convert") {
      if (newInputText.trim()) {
        setConversionInProgress(true); // Indicate that conversion is in progress
        setMessage("Converting images...");

        const urls = newInputText.split(/[\s,]+/);
        const result = await processImageURLs(urls);

        if (!result.success) {
          setMessage(
            result.message || "Invalid URL(s) or failed to fetch image(s)."
          );
          setMessageType("error");
          setConversionInProgress(false);
          return;
        }

        setSelectedFiles(result.fetchedImages);
      }

      // Move to the next step after conversion
      setConversionInProgress(false);
      setCurrentStep("upload");
      setMessage("Images converted. Ready to upload.");
      return;
    }

    if (currentStep === "upload") {
      setIsLoading(true);

      try {
        const uploadResponse = await uploadImages();
        setMessage("Gallery created and images uploaded successfully!");
        setMessageType("success");
        // Reset input fields and state after successful upload
        setGalleryName("");
        setNewInputText("");
        setSelectedFiles([]);
        setGalleryNameRequired(false);
        setCurrentStep("addName"); // Reset step to initial state
        setButtonVisible(false);
      } catch (error) {
        console.error("Upload Error:", error);
        setMessage("Failed to upload images. Please try again.");
        setMessageType("error");
      } finally {
        setIsLoading(false);
        setCurrentStep("addName"); // Reset step to initial state
      }
    }
  };

  const uploadImages = async () => {
    // Check if files and gallery name are provided
    if (!selectedFiles.length || !galleryName.trim()) {
      setMessage("Please select files and enter a gallery name.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 5000);
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("galleryName", galleryName);

    // Append each file to the FormData object
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      // Send POST request to the server
      const response = await axios.post(
        "http://localhost:1122/images/upload-gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle successful response
      if (response.status === 200 || response.status === 201) {
        setMessage("Images uploaded successfully!");
        setMessageType("success");
        setSelectedFiles([]); // Clear selected files after upload
        setGalleryName(""); // Clear gallery name after upload
      } else {
        // Handle non-200 response
        setMessage("Failed to upload images.");
        setMessageType("error");
      }
    } catch (error) {
      // Handle error during the request
      console.error("Error uploading images:", error);
      setMessage("Failed to upload images. Please try again.");
      setMessageType("error");
    } finally {
      // Reset loading state and clear message after timeout
      setIsLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const toggleUploadVisibilityClose = () => {
    setUploadVisible(false);
    setSelectedFiles([]); // Clear selected files
    setGalleryName(""); // Clear gallery name
  };

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

  // Images bulk section
  const toggleBulkSelect = () => {
    setIsBulkSelect(!isBulkSelect);
    setBulkImages([]);
  };

  const handleImageSelect = (index) => {
    if (bulkImages.includes(index)) {
      setBulkImages(bulkImages.filter((i) => i !== index));
    } else {
      setBulkImages([...bulkImages, index]);
    }
  };

  const handleDeletePermanent = () => {
    // Handle delete logic here
  };

  const handleCancel = () => {
    setIsBulkSelect(false);
    setBulkImages([]);
  };

  useEffect(() => {
    setIsBulkSelect(false);
    setBulkImages([]);
  }, [viewMode]);

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
              {selectedFiles.length === 0 ? (
                <button
                  className="Gallery_MainArea_File_Upload_Button"
                  onClick={() => fileInputRef.current.click()}
                >
                  Select File
                </button>
              ) : (
                <div className="search-input-wrapper-file">
                  <input
                    type="text"
                    placeholder="Enter gallery name"
                    value={galleryName}
                    onChange={(e) => setGalleryName(e.target.value)}
                  />
                  <button
                    className="Gallery_MainArea_File_Upload_Add"
                    onClick={uploadImages}
                  >
                    {isLoading ? "Uploading..." : "Add Media"}
                  </button>
                </div>
              )}
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
                {galleryNameRequired && (
                  <div className="gallery-name-input-wrapper">
                    <input
                      type="text"
                      placeholder="Enter gallery name"
                      value={galleryName}
                      onChange={(e) => setGalleryName(e.target.value)}
                    />
                  </div>
                )}
                {buttonVisible && (
              <button
                className="Gallery_MainArea_File_Upload_Add"
                onClick={handleAddNow}
              >
                {isLoading
                  ? "Processing..."
                  : conversionInProgress
                  ? "Converting..."
                  : currentStep === "addName"
                  ? "Add Name"
                  : currentStep === "convert"
                  ? "Convert to File"
                  : "Add Now"}
              </button>
            )}
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
              {!isBulkSelect ? (
                <>
                  <div
                    className="Second-nav-gallery cursor-not-allowed"
                    ref={sortByDateRef}
                  >
                    <div
                      className="sort-by-date" /* onClick={() => toggleDropdown("sortByDate")} */
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
                          <li
                            onClick={() => handleSortOrderChange("ascending")}
                          >
                            Ascending
                          </li>
                          <li
                            onClick={() => handleSortOrderChange("descending")}
                          >
                            Descending
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="slect-bulk" onClick={toggleBulkSelect}>
                    Select Bulk
                  </div>
                </>
              ) : (
                <>
                  <div className="slect-bulk" onClick={handleDeletePermanent}>
                    Delete Permanent
                  </div>
                  <div className="slect-bulk" onClick={handleCancel}>
                    Cancel
                  </div>
                </>
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
                    onClick={() =>
                      isBulkSelect
                        ? handleImageSelect(indexOfFirstImage + index)
                        : handleImageClick(indexOfFirstImage + index)
                    }
                  >
                    {isBulkSelect ? (
                      <input
                        className="image-index-number-grid"
                        type="checkbox"
                        checked={bulkImages.includes(indexOfFirstImage + index)}
                        onChange={() =>
                          handleImageSelect(indexOfFirstImage + index)
                        }
                      />
                    ) : (
                      <p className="image-index-number">
                        {getImageIndex(index)}
                      </p>
                    )}
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
                    {isBulkSelect ? (
                      <input
                        className="image-index-number-grid"
                        type="checkbox"
                        checked={bulkImages.includes(indexOfFirstImage + index)}
                        onChange={() =>
                          handleImageSelect(indexOfFirstImage + index)
                        }
                      />
                    ) : (
                      <p className="image-index-number-grid">
                        {getImageIndex(index)}
                      </p>
                    )}
                    <img
                      src={image}
                      alt=""
                      onClick={() =>
                        isBulkSelect
                          ? handleImageSelect(indexOfFirstImage + index)
                          : handleImageGridClick(indexOfFirstImage + index)
                      }
                      className={
                        focusedImageGridIndex === indexOfFirstImage + index
                          ? "focused"
                          : ""
                      }
                      onError={(e) => (e.target.style.display = "none")}
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
