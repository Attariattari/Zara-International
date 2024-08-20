import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./css.css";
import {
  MdOutlineGridView,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdClose,
  MdSearch,
} from "react-icons/md";
import { LiaGripHorizontalSolid } from "react-icons/lia";
import Spinner from "../../Spinner";
import UploadGallery from "./Upload/UploadGallery";

function Gallery({ galleries }) {
  const [dropdownVisible, setDropdownVisible] = useState({
    sortByDate: false,
    sortOrder: false,
  });
  const [searchText, setSearchText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [focusedImageIndex, setFocusedImageIndex] = useState(null);
  const [focusedImageGridIndex, setFocusedImageGridIndex] = useState(null);
  const [isBulkSelect, setIsBulkSelect] = useState(false);
  const [bulkImages, setBulkImages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const sortByDateRef = useRef(null);
  const sortOrderRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimer = useRef(null);

  useEffect(() => {
    fetchImages(); // Fetch images on initial load
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
    setIsTyping(false);
    inputRef.current.focus();
    setHasSearched(false); // Reset the search state
    fetchImages(); // Fetch all images when search is cleared
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setIsTyping(true);

    // Clear the previous timer
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    // Start a new timer to check when the user stops typing
    typingTimer.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000); // 1 second delay
  };

  useEffect(() => {
    // Cleanup the timer on unmount
    return () => {
      if (typingTimer.current) {
        clearTimeout(typingTimer.current);
      }
    };
  }, []);

  const handleSearch = () => {
    if (searchText.length >= 3) {
      fetchImages(searchText);
      setHasSearched(true); // Mark that a search has been performed
    }
  };

  const toggleUploadVisibility = () => {
    setUploadVisible((prev) => !prev);
  };

  const closeuploadpop = () => {
    setUploadVisible(false);
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };
  const fetchImages = async (galleryName = "") => {
    setLoading(true); // Start loading
    try {
      const url =
        galleryName.length >= 3
          ? `http://localhost:1122/images/gallery/${encodeURIComponent(
              galleryName
            )}`
          : "http://localhost:1122/images/";

      const response = await axios.get(url);

      if (response.status === 200 && response.data.length > 0) {
        // Extract images and galleryId from each item
        const imagesWithGalleryId = response.data.flatMap((item) =>
          item.images.map((image) => ({
            galleryId: item._id || null,
            image: image,
          }))
        );

        // Extract images array with gallery ID
        setSelectedImages(imagesWithGalleryId);
        setMessage("");
      } else {
        setSelectedImages([]);
        setMessage("No images found.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setSelectedImages([]);
      setMessage("Failed to fetch images.");
      setMessageType("error");
    } finally {
      setLoading(false); // End loading
    }
  };

  const applyFilter = async (filter) => {
    setLoading(true);
    try {
      const url = `http://localhost:1122/images/galleries/filter?filter=${filter}`;
      const response = await axios.get(url);

      if (response.status === 200 && response.data.length > 0) {
        const imagesWithGalleryId = response.data.flatMap((item) =>
          item.images.map((image) => ({
            galleryId: item._id || null,
            image: image,
          }))
        );
        setSelectedImages(imagesWithGalleryId);
        setMessage("");
      } else {
        setSelectedImages([]);
        setMessage("No images found.");
        setMessageType("error");
      }

      // Close dropdown after selecting filter
      setDropdownVisible({ sortByDate: false });
      // Update selected filter text
      setSelectedFilter(filter);
    } catch (error) {
      console.error("Error fetching filtered images:", error);
      setSelectedImages([]);
      setMessage("Failed to fetch images.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const removeFilter = () => {
    // Filter ko reset karo aur dropdown ko band karo
    setSelectedFilter("");
    setDropdownVisible({ sortByDate: false });
    fetchImages(); // Default API se images ko fetch karo
  };

  const sortedImages = useMemo(() => {
    let images = [...selectedImages];

    if (sortOrder === "descending") {
      images.reverse();
    }

    return images;
  }, [selectedImages, sortOrder]);

  const handleSortOrderChange = (option) => {
    setSortOrder(option);
    toggleDropdown("sortOrder");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 60;

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;

  const paginatedImages = useMemo(() => {
    return sortedImages.slice(indexOfFirstImage, indexOfLastImage);
  }, [sortedImages, currentPage]);

  const getImageIndex = (index) => {
    if (sortOrder === "ascending") {
      return indexOfFirstImage + index + 1;
    } else if (sortOrder === "descending") {
      return indexOfFirstImage + paginatedImages.length - index;
    }
    return indexOfFirstImage + index + 1;
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

  const toggleBulkSelect = () => {
    setIsBulkSelect(!isBulkSelect);
    setBulkImages([]);
  };

  const handleImageClick = (index) => {
    setFocusedImageIndex(index);
    setFocusedImageGridIndex(null); // Reset grid focus
  };

  const handleImageGridClick = (index) => {
    setFocusedImageGridIndex(index);
    setFocusedImageIndex(null); // Reset table focus
  };

  const handleImageSelect = (index) => {
    if (bulkImages.includes(index)) {
      setBulkImages(bulkImages.filter((i) => i !== index));
    } else {
      setBulkImages([...bulkImages, index]);
    }
  };

  const handleDeletePermanent = async () => {
    setLoading(true);
    const galleriesToDelete = selectedImages
      .filter((_, index) => bulkImages.includes(index))
      .map((item) => {
        return item.galleryId;
      });

    const uniqueGalleryIds = [...new Set(galleriesToDelete)];

    if (uniqueGalleryIds.length === 0) {
      // Show error message using Toastify
      toast.error("Please select at least one image to delete.", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsBulkSelect(false);
      setLoading(false); // End loading
      return; // Stop further execution
    }

    try {
      // Replace with correct API endpoint and request body
      const response = await axios.post(
        "http://localhost:1122/images/delete-multiple-galleries",
        {
          ids: uniqueGalleryIds,
        }
      );

      if (response.status === 200) {
        setIsBulkSelect(false);
        fetchImages();
        toast.success("Galleries deleted successfully!", {
          autoClose: 3000,
        });
      } else {
        console.error("Failed to delete galleries.");
        toast.error("Failed to delete galleries.", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error deleting galleries:", error);
      toast.error("Error deleting galleries.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false); // End loading
    }
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
      <ToastContainer
        position="top-right" // Set position to top-right
        autoClose={3000} // Auto close after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false} // Close button removed
      />
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
          <UploadGallery
            closeuploadpop={closeuploadpop}
            fetchImages={fetchImages}
            uploadVisible={uploadVisible}
            setUploadVisible={setUploadVisible}
          />
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
                  <div className="Second-nav-gallery" ref={sortByDateRef}>
                    <div
                      className="sort-by-date"
                      onClick={() => toggleDropdown("sortByDate")}
                    >
                      <div className="sort-by-date-user">
                        {selectedFilter ? (
                          <>
                            {selectedFilter.charAt(0).toUpperCase() +
                              selectedFilter.slice(1)}
                            <MdClose
                              className="clear-filter-icon"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent dropdown toggle on icon click
                                removeFilter();
                              }}
                            />
                          </>
                        ) : (
                          "Filter by Date"
                        )}
                      </div>
                      {dropdownVisible.sortByDate ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </div>
                    {dropdownVisible.sortByDate && (
                      <div className="dropdown-menu-gallry">
                        <div onClick={() => applyFilter("today")}>Today</div>
                        <div onClick={() => applyFilter("7days")}>
                          Last 7 Days
                        </div>
                        <div onClick={() => applyFilter("older")}>Older</div>
                        <div onClick={() => applyFilter("newest")}>Newest</div>
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
                onChange={handleInputChange}
                ref={inputRef}
                placeholder="Enter Text Here"
              />
              {searchText && isTyping && (
                <MdClose
                  title="Clear Input."
                  className="clear-icon"
                  onClick={handleClearSearch}
                />
              )}
              {!hasSearched && searchText && !isTyping && (
                <MdSearch
                  title="Search..."
                  onClick={handleSearch}
                  className="clear-icon"
                />
              )}
              {hasSearched && (
                <MdClose
                  title="Clear Search."
                  className="clear-icon"
                  onClick={() => {
                    setSearchText(""); // Clear search text
                    setIsTyping(false); // Reset typing state
                    setHasSearched(false); // Reset search state
                    fetchImages(); // Fetch all images when search is cleared
                  }}
                />
              )}
            </div>
          </div>
        </div>
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
                paginatedImages.map((item, index) => (
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
                      src={item.image}
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
                paginatedImages.map((item, index) => (
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
                      src={item.image}
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
              {" "}
              {currentPage > 1 && (
                <button onClick={handlePreviousPage}>Previous</button>
              )}
              {currentPage <
                Math.ceil(selectedImages.length / imagesPerPage) && (
                <button onClick={handleNextPage}>Next</button>
              )}
              <span>Page {currentPage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
