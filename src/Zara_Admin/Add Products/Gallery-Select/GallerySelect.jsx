import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import "./css.css";
import { userContext } from "../../../Context/UserContext";
import axios from "axios";

function GallerySelect({ handleGalleryfalse }) {
  const { token } = useContext(userContext);
  const [state, setState] = useState({
    selectedImages: [],
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

  return (
    <div className="Gallery-select">
      <div className="Gallery-select-mainarea">
        <p onClick={handleGalleryfalse}>X</p>
        {state.loading ? (
          <div>Loading...</div>
        ) : state.message ? (
          <div className={state.messageType}>{state.message}</div>
        ) : (
          <div className="images-grid">
            {state.selectedImages.map((imageUrl, index) => (
              <div key={index} className="image-item">
                <img src={imageUrl} alt={`image-${index}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GallerySelect;
