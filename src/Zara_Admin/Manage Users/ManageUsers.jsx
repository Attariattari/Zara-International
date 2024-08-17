import React, { useEffect, useRef, useState } from "react";
import Spinner from "../../Spinner";
import axios from "axios";
import { MdClose } from "react-icons/md";

function ManageUsers() {
  const [uploadVisible, setUploadVisible] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newInputText, setNewInputText] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [galleryName, setGalleryName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [galleryNameRequired, setGalleryNameRequired] = useState(false);
  const [currentStep, setCurrentStep] = useState("addName");
  const [conversionInProgress, setConversionInProgress] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const newInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleUploadVisibility = () => {
    setUploadVisible((prev) => !prev);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFiles(Array.from(files)); // Store files in state
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFiles(Array.from(files)); // Store files in state
    }
    fileInputRef.current.value = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleClearNewInput = () => {
    setNewInputText("");
    newInputRef.current.focus();
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
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

  // Delay function
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

  return (
    <>
      <button
        className="Gallery_MainArea_Fisrt_Button"
        onClick={toggleUploadVisibility}
      >
        Add New Media File
      </button>
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

            {/* Conditionally render buttons and gallery name input */}
            {selectedFiles.length === 0 ? (
              <button
                className="Gallery_MainArea_File_Upload_Button"
                onClick={() => fileInputRef.current.click()}
              >
                Select File
              </button>
            ) : (
              <div className="gallery-name-input-wrapper">
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

            {/* <button
              className="Gallery_MainArea_File_Upload_Add"
              onClick={handleAddNow}
            >
              {isLoading ? "Processing..." : "Add Now"}
            </button> */}
          </div>

          {message && <p className={`message ${messageType}`}>{message}</p>}
          <div className="PopupCloseButton">
            <MdClose onClick={toggleUploadVisibilityClose} className="Close" />
          </div>
        </div>
      )}
    </>
  );
}

export default ManageUsers;
