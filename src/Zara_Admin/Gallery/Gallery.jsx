import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
import { userContext } from "../../Context/UserContext";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Gallery({ galleries }) {
  const { token } = useContext(userContext);
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
  const navigate = useNavigate();
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

  // const toggleUploadVisibility = () => {
  //   setUploadVisible((prev) => !prev);
  // };

  // const toggleUploadVisibility = () => {
  //   // Ye function route ko change karay ga jab button click hoga
  //   navigate("Gallery/upload"); // Specific route
  // };

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

      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        // Extract images with galleryId and folder information
        const imagesWithGalleryAndFolder = response.data.flatMap((gallery) =>
          gallery.folders.flatMap((folder) =>
            folder.images.map((image) => ({
              galleryId: gallery._id,
              galleryname: gallery.galleryName,
              folderName: folder.folderName, // Adding folder info
              imageobjectid: image._id,
              image: image.url, // Extract image URL from new schema
              altText: image.altText || "",
              title: image.title || "",
            }))
          )
        );
        // Set images to state
        setSelectedImages(imagesWithGalleryAndFolder);
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

      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        // Extract images with galleryId and folder information
        const imagesWithGalleryAndFolder = response.data.flatMap((gallery) =>
          gallery.folders.flatMap((folder) =>
            folder.images.map((image) => ({
              galleryId: gallery._id,
              folderName: folder.folderName, // Adding folder info
              image: image.url, // Extract image URL from new schema
              altText: image.altText || "",
              title: image.title || "",
            }))
          )
        );

        // Set images to state
        setSelectedImages(imagesWithGalleryAndFolder);
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
      setLoading(false); // End loading
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
    const image = paginatedImages[index]; // Assuming paginatedImages is your array

    setBulkImages((prevBulkImages) => {
      const updatedBulkImages = prevBulkImages.includes(index)
        ? prevBulkImages.filter((i) => i !== index)
        : [...prevBulkImages, index];

      // Update selectedImages with relevant data
      const updatedSelectedImages = updatedBulkImages.map((i) => ({
        galleryname: paginatedImages[i].galleryname,
        folderName: paginatedImages[i].folderName,
        imageId: paginatedImages[i].title, // Assuming 'title' is the correct ID, adjust if needed
        imageobjectid: paginatedImages[i]._id,
      }));

      return updatedBulkImages;
    });
  };

  const handleDeletePermanent = async () => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the selected images.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete them!",
      });

      if (result.isConfirmed) {
        // Start loading state
        setLoading(true);

        // Group images by gallery and folder
        const imagesGrouped = selectedImages
          .filter((image) =>
            bulkImages.includes(paginatedImages.indexOf(image))
          )
          .reduce((acc, image) => {
            const { galleryname, folderName, imageobjectid } = image;
            const key = `${galleryname}-${folderName}`;
            if (!acc[key]) {
              acc[key] = {
                galleryName: galleryname,
                folderName: folderName,
                imageIds: [],
              };
            }
            acc[key].imageIds.push(imageobjectid);
            return acc;
          }, {});

        // Create a list of requests to delete images
        const deleteRequests = Object.values(imagesGrouped).map(
          async ({ galleryName, folderName, imageIds }) => {
            try {
              const response = await axios({
                method: "delete",
                url: "http://localhost:1122/images/deleteImage",
                data: {
                  galleryName,
                  folderName,
                  imageIds, // Sending all image IDs for the gallery and folder
                },
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${token}`, // Include token if required
                  "Content-Type": "application/json", // Ensure proper content type
                },
              });

              // Debug: Check the response
              console.log("Response from server:", response.data);

              return response;
            } catch (error) {
              // If there's an error, reject the promise to stop further requests
              throw error; // This will trigger the catch block below
            }
          }
        );

        // Wait for all requests to complete
        await Promise.all(deleteRequests);

        Swal.fire(
          "Deleted!",
          "The selected images have been deleted.",
          "success"
        );

        // Optionally, refresh your image list or update state here
        fetchImages();
        setSelectedImages([]);
        setIsBulkSelect(false);
      }
    } catch (error) {
      // Handle any errors, including network issues, server errors, etc.
      console.error("Error deleting images:", error);

      // If error response exists, show it in the Swal
      const errorMessage = error.response
        ? error.response.data.error || "Failed to delete images."
        : error.message || "Unknown error occurred.";

      Swal.fire("Error!", errorMessage, "error");

      // Optionally, handle specific errors like token expiry
      if (error.response && error.response.status === 401) {
        Swal.fire("Error!", "Token expired. Please log in again.", "error");
      }
    } finally {
      // Stop loading state regardless of success or failure
      setLoading(false);
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
          <Link
            to="/Admin/Gallery/upload"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            title="Dashboard"
          >
            <button className="Gallery_MainArea_Fisrt_Button">
              Add New Media File
            </button>
          </Link>{" "}
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
        {/* <div className={`UploadImages ${uploadVisible ? "show" : "hide"}`}>
          <div className="UploadImages-popup">
            <Uploadimages closeuploadpop={closeuploadpop} />
          </div>
        </div> */}
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
//   // <UploadGallery
//   closeuploadpop={closeuploadpop}
//   fetchImages={fetchImages}
//   uploadVisible={uploadVisible}
//   setUploadVisible={setUploadVisible}
// />
