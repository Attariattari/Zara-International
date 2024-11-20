import React, { useState, useEffect, useContext } from "react";
import "./css.css"; // Add spinner styling here
import { userContext } from "../../../Context/UserContext";
import axios from "axios";
import { MdClose } from "react-icons/md";
import Spinner from "../../../Spinner";

function GallerySelect({
  handleGalleryfalse,
  onSelectImage,
  onVariationSelectImage,
  isVariation,
  allSelectedImages,
  activeVariationIndex,
  onSelectProfileImage,
  isprofileimage,
}) {
  const { token } = useContext(userContext);
  const [state, setState] = useState({
    selectedImages: [],
    selectedImageUrls: [],
    loading: false,
    message: "",
    messageType: "",
  });

  useEffect(() => {
    fetchImages();
  }, []);
  useEffect(() => {
    if (isVariation && allSelectedImages[activeVariationIndex]) {
      setState((prevState) => ({
        ...prevState,
        selectedImageUrls: allSelectedImages[activeVariationIndex] || [],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        selectedImageUrls: [], // Reset selection when changing variations
      }));
    }
  }, [activeVariationIndex, isVariation, allSelectedImages]);
  const fetchImages = async () => {
    setState((prevState) => ({ ...prevState, loading: true })); // Start loading
    try {
      const url = "http://localhost:1122/images/";

      const response = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        const imageUrls = response.data.flatMap((gallery) =>
          gallery.folders.flatMap((folder) =>
            folder.images.map((image) => image.url)
          )
        );
        setState({
          selectedImages: imageUrls,
          selectedImageUrls: [],
          loading: false,
          message: "",
          messageType: "",
        });
      } else {
        setState({
          selectedImages: [],
          loading: false,
          message: "No images found.",
          messageType: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setState({
        selectedImages: [],
        loading: false,
        message: "Failed to fetch images.",
        messageType: "error",
      });
    }
  };

  // Function to handle toggling of image selection
  const toggleImageSelection = (imageURL) => {
    setState((prevState) => {
      const isAlreadySelected = prevState.selectedImageUrls.includes(imageURL);
      const updatedSelectedImages = isAlreadySelected
        ? prevState.selectedImageUrls.filter((url) => url !== imageURL) // Deselect
        : [...prevState.selectedImageUrls, imageURL]; // Select

      return { ...prevState, selectedImageUrls: updatedSelectedImages };
    });
  };

  const handleAddSelectedImages = () => {
    if (state.selectedImageUrls.length > 0) {
      // Send all selected images at once to onVariationSelectImage
      onVariationSelectImage(state.selectedImageUrls); // Send array of images
      handleGalleryfalse(); // Close the gallery after adding images
    } else {
      alert("No images selected!");
    }
  };
  const sortedImages = isVariation
    ? state.selectedImages.sort((a, b) => {
        const isASelected =
          allSelectedImages.includes(a) || state.selectedImageUrls.includes(a);
        const isBSelected =
          allSelectedImages.includes(b) || state.selectedImageUrls.includes(b);

        if (isASelected && !isBSelected) {
          return -1; // Move A to the top if it's selected and B is not
        }
        if (!isASelected && isBSelected) {
          return 1; // Move B to the top if it's selected and A is not
        }
        return 0; // No change if both are selected or unselected
      })
    : state.selectedImages; // If isVariation is false, don't sort

  return (
    <div className="Gallery-select">
      <div className="Gallery-select-mainarea">
        <div className="Gallery-select-header">
          <div className="Gallery-select-header-title-button">
            <p>
              {isVariation ? (
                <p>Select Variation</p>
              ) : (
                !isprofileimage && <p>Select Main Image</p>
              )}
              {isprofileimage && <p>Select Profile Image</p>}
            </p>

            {isVariation && (
              <button onClick={handleAddSelectedImages}>
                Add Selected Images
              </button>
            )}
          </div>
          <span className="Gallery-close-button" onClick={handleGalleryfalse}>
            <MdClose />
          </span>
        </div>
        <div className="Gallery-images-area">
          {state.loading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : state.message ? (
            <div className={state.messageType}>{state.message}</div>
          ) : (
            <div className="images-grid">
              {isVariation
                ? sortedImages.map((imageUrl, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={imageUrl}
                        alt={`image-${index}`}
                        onClick={() => {
                          if (
                            !allSelectedImages.includes(imageUrl) &&
                            !state.selectedImageUrls.includes(imageUrl)
                          ) {
                            toggleImageSelection(imageUrl);
                          }
                        }}
                        className={
                          allSelectedImages.includes(imageUrl)
                            ? "matched-image disabled" // Mark matched images with a special class
                            : state.selectedImageUrls.includes(imageUrl)
                            ? "selected"
                            : ""
                        }
                        title={
                          allSelectedImages.includes(imageUrl)
                            ? "This image is already matched"
                            : state.selectedImageUrls.includes(imageUrl)
                            ? "Selected image"
                            : ""
                        }
                        style={{
                          opacity:
                            allSelectedImages.includes(imageUrl) ||
                            state.selectedImageUrls.includes(imageUrl)
                              ? 0.6
                              : 1,
                        }} // Optional: visually indicate selected/disabled images
                      />
                      <input
                        type="checkbox"
                        checked={
                          allSelectedImages.includes(imageUrl) ||
                          state.selectedImageUrls.includes(imageUrl)
                        }
                        onChange={() => {
                          if (
                            !allSelectedImages.includes(imageUrl) &&
                            !state.selectedImageUrls.includes(imageUrl)
                          ) {
                            toggleImageSelection(imageUrl);
                          }
                        }}
                        disabled={allSelectedImages.includes(imageUrl)} // Disable checkbox if image is already matched
                      />
                    </div>
                  ))
                : isprofileimage
                ? sortedImages.map((imageUrl, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={imageUrl}
                        alt={`image-${index}`}
                        onClick={() => {
                          onSelectProfileImage(imageUrl); // Pass to profile image handler
                        }}
                      />
                    </div>
                  ))
                : sortedImages.map((imageUrl, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={imageUrl}
                        alt={`image-${index}`}
                        onClick={() => {
                          onSelectImage(imageUrl); // Pass to main image handler
                          handleGalleryfalse(); // Close the gallery popup
                        }}
                      />
                    </div>
                  ))}

              {/* {isVariation
                ? sortedImages.map((imageUrl, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={imageUrl}
                        alt={`image-${index}`}
                        onClick={() => {
                          if (
                            !allSelectedImages.includes(imageUrl) &&
                            !state.selectedImageUrls.includes(imageUrl)
                          ) {
                            toggleImageSelection(imageUrl);
                          }
                        }}
                        className={
                          allSelectedImages.includes(imageUrl)
                            ? "matched-image disabled" // Mark matched images with a special class
                            : state.selectedImageUrls.includes(imageUrl)
                            ? "selected"
                            : ""
                        }
                        title={
                          allSelectedImages.includes(imageUrl)
                            ? "This image is already matched"
                            : state.selectedImageUrls.includes(imageUrl)
                            ? "Selected image"
                            : ""
                        }
                        style={{
                          opacity:
                            allSelectedImages.includes(imageUrl) ||
                            state.selectedImageUrls.includes(imageUrl)
                              ? 0.6
                              : 1,
                        }} // Optional: visually indicate selected/disabled images
                      />
                      <input
                        type="checkbox"
                        checked={
                          allSelectedImages.includes(imageUrl) ||
                          state.selectedImageUrls.includes(imageUrl)
                        }
                        onChange={() => {
                          if (
                            !allSelectedImages.includes(imageUrl) &&
                            !state.selectedImageUrls.includes(imageUrl)
                          ) {
                            toggleImageSelection(imageUrl);
                          }
                        }}
                        disabled={allSelectedImages.includes(imageUrl)} // Disable checkbox if image is already matched
                      />
                    </div>
                  ))
                : sortedImages.map((imageUrl, index) => (
                    <div key={index} className="image-item">
                      <img
                        src={imageUrl}
                        alt={`image-${index}`}
                        onClick={() => {
                          onSelectImage(imageUrl); // Pass to main image handler
                          handleGalleryfalse(); // Close the gallery popup
                        }}
                      />
                    </div>
                  ))} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GallerySelect;
