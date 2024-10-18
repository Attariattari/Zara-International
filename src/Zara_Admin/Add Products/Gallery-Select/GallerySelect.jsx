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

  const selectImage = (imageURL) => {
    onSelectImage(imageURL); // Pass selected image URL to parent
    handleGalleryfalse(); // Close the gallery popup
  };
  const toggleImageSelection = (imageURL) => {
    setState((prevState) => {
      const isAlreadySelected = prevState.selectedImageUrls.includes(imageURL);
      const updatedSelectedImages = isAlreadySelected
        ? prevState.selectedImageUrls.filter((url) => url !== imageURL) // Deselect
        : [...prevState.selectedImageUrls, imageURL]; // Select

      return { ...prevState, selectedImageUrls: updatedSelectedImages };
    });
  };

  // Handle the final add button click
  const handleAddSelectedImages = () => {
    if (state.selectedImageUrls.length > 0) {
      state.selectedImageUrls.forEach((imageUrl) => {
        if (isVariation) {
          onVariationSelectImage(imageUrl); // Handle variation images
        } else {
          onSelectImage(imageUrl); // Handle regular images
        }
      });
      handleGalleryfalse(); // Close the gallery after adding images
    } else {
      alert("No images selected!");
    }
  };

  return (
    <div className="Gallery-select">
      <div className="Gallery-select-mainarea">
        <p onClick={handleGalleryfalse}>
          <MdClose />
        </p>
        {state.loading ? (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) : state.message ? (
          <div className={state.messageType}>{state.message}</div>
        ) : (
          <div className="images-grid">
            {/* Check if it is a variation gallery */}
            {isVariation
              ? state.selectedImages.map((imageUrl, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={imageUrl}
                      alt={`image-${index}`}
                      onClick={() => toggleImageSelection(imageUrl)}
                      className={
                        state.selectedImageUrls.includes(imageUrl)
                          ? "selected"
                          : ""
                      }
                    />
                    <input
                      type="checkbox"
                      checked={state.selectedImageUrls.includes(imageUrl)}
                      onChange={() => toggleImageSelection(imageUrl)}
                    />
                  </div>
                ))
              : state.selectedImages.map((imageUrl, index) => (
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
            {isVariation && (
              <button onClick={handleAddSelectedImages}>
                Add Selected Images
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GallerySelect;
