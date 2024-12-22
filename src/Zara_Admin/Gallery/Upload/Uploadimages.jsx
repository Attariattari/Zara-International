import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { userContext } from "../../../Context/UserContext";
import { MdDeleteOutline, MdClose } from "react-icons/md";
import { TbCloudUpload } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { FcFolder } from "react-icons/fc";
import "./css.css";
import { FcOpenedFolder } from "react-icons/fc";
import Swal from "sweetalert2";
import Spinner from "../../../Spinner";
import { RiUpload2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Uploadimages = ({ closeuploadpop }) => {
  const [galleryName, setGalleryName] = useState("Default Gallery");
  const [folderName, setFolderName] = useState("");
  const [images, setImages] = useState(Array(6).fill(null));
  const [altTexts, setAltTexts] = useState([]);
  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [tags, setTags] = useState([[]]);
  const [folder, setFolder] = useState(false);
  const [createfolder, setcreateFolder] = useState(false);
  const [galleryData, setGalleryData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isloading, setisLoading] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editFolderId, setEditFolderId] = useState(null);
  const [openFolderId, setOpenFolderId] = useState(null);
  const fileInputRefs = useRef([]);
  const [activeFolderId, setActiveFolderId] = useState(null);
  const { token } = useContext(userContext);
  const navigate = useNavigate();
  const createFolder = () => {
    setcreateFolder((prev) => !prev);
  };

  const closeFolder = () => {
    setcreateFolder(false);
    setGalleryName("");
    setNewFolderName("");
    setResponseMessage("");
    setErrorMessage("");
  };

  const handleGalleryNameChange = (e) => {
    setGalleryName(e.target.value);
  };

  const handleEditClick = (folderId, oldFolderName) => {
    setEditFolderId(folderId);
    setNewFolderName(oldFolderName);
    setActiveFolderId(folderId);
  };

  const handleCancel = () => {
    setEditFolderId(null);
    setActiveFolderId(null); // Reset active folder on cancel
    setNewFolderName("");
  };

  const handleFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };

  const handleFolderSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setErrorMessage("");
    setLoading(true);
    try {
      // API call to create folder
      const response = await axios.post(
        "http://localhost:1122/images/create-folder",
        {
          galleryName,
          folderName: newFolderName,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Folder Created:", response.data);
      setResponseMessage("Folder created successfully!");
      closeFolder(); // Close the form and reset fields
      fetchGalleryData();
      setLoading(false);
    } catch (error) {
      console.error("Error creating folder:", error);
      setErrorMessage("Failed to create folder. Please try again.");
      setLoading(false);
    }
  };

  const fetchGalleryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:1122/images/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.data && response.data.length > 0) {
        setFolder(response.data[0].folders); // Accessing the folders inside the first object in `data`
      } else {
        console.warn("No folders found in the response.");
        setFolder([]); // Fallback to empty array
      }
      setGalleryData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching gallery data:", err);
      setError("Failed to load gallery data. Please try again.");
      setLoading(false);
    }
  };
  console.log("Folder Name:", newFolderName);
  console.log("Payload:", {
    galleryName,
    folderName: newFolderName,
  });

  useEffect(() => {
    fetchGalleryData();
  }, [token]);

  const handleSave = async (galleryId, folderId) => {
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:1122/images/updateFolder",
        {
          oldFolderName: galleryData
            .find((g) => g._id === galleryId)
            .folders.find((f) => f._id === folderId).folderName,
          newFolderName: newFolderName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setGalleryData(
        galleryData.map((gallery) =>
          gallery._id === galleryId
            ? {
                ...gallery,
                folders: gallery.folders.map((folder) =>
                  folder._id === folderId
                    ? { ...folder, folderName: newFolderName }
                    : folder
                ),
              }
            : gallery
        )
      );
      setEditFolderId(null);
      setNewFolderName("");
      setActiveFolderId(null);
      setLoading(false);
    } catch (err) {
      console.error("Error updating folder:", err);
      setError("Failed to update folder. Please try again.");
      setLoading(false);
    }
  };

  const handleDelete = async (galleryId, folderId, folderName) => {
    try {
      // Swal for confirmation before deleting
      const result = await Swal.fire({
        title: `Are you sure?`,
        text: `You won't be able to revert this!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        setLoading(true);
        // API call to delete the folder
        const response = await axios.post(
          "http://localhost:1122/images/deleteFolder",
          { folderName } // Pass folderName in request body
        );
        setLoading(false);
        // Show response from backend in Swal, regardless of success or error
        if (response.status === 200) {
          // Success, show Swal with backend message
          Swal.fire(
            "Deleted!",
            response.data.message || "Your folder has been deleted.",
            "success"
          );

          // Update the gallery state
          setGalleryData((prevGalleryData) =>
            prevGalleryData.map((gallery) =>
              gallery._id === galleryId
                ? {
                    ...gallery,
                    folders: gallery.folders.filter(
                      (folder) => folder._id !== folderId
                    ),
                  }
                : gallery
            )
          );
        } else {
          // In case of any unexpected status code (not likely)
          Swal.fire(
            "Error!",
            response.data.error || "Failed to delete folder.",
            "error"
          );
        }
      }
    } catch (error) {
      // Handle any errors from the request
      setLoading(false);
      console.error("Error deleting folder:", error);

      // Show detailed error message from backend, if available
      if (error.response && error.response.data) {
        Swal.fire(
          "Error!",
          error.response.data.error || "An unexpected error occurred.",
          "error"
        );
      } else {
        Swal.fire("Error!", "Failed to delete folder.", "error");
      }
    }
  };

  // Function to handle folder click
  const handleFolderClick = (folder) => {
    setOpenFolderId((prevId) => (prevId === folder._id ? null : folder._id));
    setFolderName(folder.folderName); // Set folderName when a folder is clicked
  };

  const handleImageChange = (e, index) => {
    const selectedFiles = Array.from(e.target.files);
    const newImages = [...images];

    // Handle single image selection
    if (selectedFiles.length === 1 && images.length <= 1) {
      const file = selectedFiles[0];
      newImages[index] = {
        file: file,
        previewUrl: URL.createObjectURL(file),
      };
    }
    // Handle multiple image selection
    else if (selectedFiles.length > 1) {
      selectedFiles.forEach((file, i) => {
        // If the index + i exceeds the current newImages length, push the new image
        if (index + i >= newImages.length) {
          newImages.push({
            file: file,
            previewUrl: URL.createObjectURL(file),
          });
        } else {
          // Otherwise, just replace the existing image at that position
          newImages[index + i] = {
            file: file,
            previewUrl: URL.createObjectURL(file),
          };
        }
      });
    } else {
      // If single selection with existing images, just replace at the current index
      newImages[index] = {
        file: selectedFiles[0],
        previewUrl: URL.createObjectURL(selectedFiles[0]),
      };
    }

    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If no folder is selected, show error and return
    if (!openFolderId) {
      Swal.fire({
        icon: "error",
        title: "No folder selected",
        text: "Please open/select a folder before uploading.",
      });
      return;
    }

    setisLoading(true); // Start loading when request begins

    const formData = new FormData();
    formData.append("galleryName", galleryName);
    formData.append("folderName", folderName);

    images.forEach((image) => {
      if (image?.file) {
        formData.append("images", image.file); // Add image file to formData
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:1122/images/upload-gallery",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Gallery uploaded successfully!",
      });

      // Reset form fields and state
      setImages(Array(6).fill(null));
      setAltTexts([]);
      setTitles([]);
      setDescriptions([]);
      setTags([]);
      navigate("/Admin/Gallery");
      setOpenFolderId(false);
    } catch (error) {
      console.error("Error uploading gallery:", error);
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: "Failed to upload gallery. Please try again.",
      });
    } finally {
      setisLoading(false); // Stop loading after request is complete
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newAltTexts = altTexts.filter((_, i) => i !== index);
    const newTitles = titles.filter((_, i) => i !== index);
    const newDescriptions = descriptions.filter((_, i) => i !== index);
    const newTags = tags.filter((_, i) => i !== index);

    setImages(newImages);
    setAltTexts(newAltTexts);
    setTitles(newTitles);
    setDescriptions(newDescriptions);
    setTags(newTags);
  };

  const handleIconClick = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  return (
    <div className="Uploadimages">
      <div className="Uploadimages-mainArea">
        <div className="Uploadimages-mainArea-title">
          <p>Upload Gallery.</p>
        </div>
        <div className="Uploadimages-mainArea-data">
          <div className="Uploadimages-side">
            {loading && (
              <div className="loading-overlay-Uploadimages-side">
                <Spinner /> {/* Display the spinner */}
              </div>
            )}
            <div className="Uploadimages-side-title">
              <div className="Uploadimages-side-title-first">
                <p>Folders.</p>
                <p
                  className="cursor-pointer Gallery-Button"
                  onClick={createFolder}
                >
                  Create Folder
                </p>
              </div>
            </div>
            {!createfolder && (
              <div className="folders">
                {galleryData.length > 0 &&
                  galleryData.map((gallery) => (
                    <div key={gallery._id}>
                      {gallery.folders.length > 0 ? (
                        gallery.folders.map((folder) => (
                          <div key={folder._id} className="folder-item">
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                              onClick={() => handleFolderClick(folder)}
                            >
                              {openFolderId === folder._id ? (
                                <FcOpenedFolder
                                  style={{
                                    marginRight: "8px",
                                    width: "25px",
                                    height: "25px",
                                  }}
                                />
                              ) : (
                                <FcFolder
                                  style={{
                                    marginRight: "8px",
                                    width: "25px",
                                    height: "25px",
                                  }}
                                />
                              )}
                              <div className="folder-name">
                                {editFolderId === folder._id ? (
                                  <input
                                    type="text"
                                    value={newFolderName}
                                    onChange={handleFolderNameChange}
                                    autoFocus
                                  />
                                ) : (
                                  folder.folderName
                                )}
                              </div>
                            </div>
                            <div
                              className={`folder-actions ${
                                activeFolderId === folder._id
                                  ? "active"
                                  : "inactive"
                              }`}
                              style={{
                                display:
                                  editFolderId === null ||
                                  activeFolderId === folder._id
                                    ? "flex"
                                    : "none",
                              }}
                            >
                              {editFolderId === folder._id ? (
                                <>
                                  <TbCloudUpload
                                    onClick={() =>
                                      handleSave(gallery._id, folder._id)
                                    }
                                    title="Update"
                                  />
                                  <MdClose
                                    onClick={handleCancel}
                                    title="Cancel"
                                  />
                                </>
                              ) : (
                                <>
                                  <CiEdit
                                    onClick={() =>
                                      handleEditClick(
                                        folder._id,
                                        folder.folderName
                                      )
                                    }
                                    title="Edit Folder"
                                  />
                                  <MdDeleteOutline
                                    onClick={() =>
                                      handleDelete(
                                        gallery._id,
                                        folder._id,
                                        folder.folderName
                                      )
                                    }
                                    title="Delete Folder"
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No folders available in this gallery.</p>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {createfolder && (
              <div className="Uploadimages-create-folder">
                <form onSubmit={handleFolderSubmit}>
                  <div className="Uploadimages-create-folder-inputs">
                    <div>
                      <input
                        disabled
                        type="text"
                        id="galleryName"
                        value={galleryName}
                        onChange={handleGalleryNameChange}
                        placeholder="Gallery Name Is Your,s Choice...."
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        id="folderName"
                        value={newFolderName}
                        onChange={handleFolderNameChange}
                        placeholder="Folder Name Is Required...."
                        required
                      />
                    </div>
                  </div>
                  <div className="Uploadimages-create-folder-buttons">
                    <button type="submit">Create</button>
                    <button type="button" onClick={closeFolder}>
                      Cancel
                    </button>
                  </div>
                </form>
                {responseMessage && (
                  <p style={{ color: "green" }}>{responseMessage}</p>
                )}
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>
            )}
          </div>
          <div className="Uploadimages-main">
            {isloading && (
              <div className="loading-overlay-Uploadimages-side">
                <Spinner /> {/* Display the spinner */}
              </div>
            )}
            <div className="Uploadimages-side-title">
              <div className="Uploadimages-side-title-first">
                <p>Gallery.</p>
                <div className="Uploadimages-main-buttons">
                  {openFolderId && (
                    <p
                      className="cursor-pointer Gallery-Button"
                      onClick={() => {
                        if (images.length >= 24) {
                          // Show error message
                          Swal.fire({
                            icon: "error",
                            title: "Limit Reached",
                            text: "You can only add up to 24 images.",
                          });
                        } else {
                          // Add image if limit is not reached
                          setImages([...images, null]);
                        }
                      }}
                      disabled={isloading}
                    >
                      Add Image
                    </p>
                  )}
                  {images.length > 0 &&
                    images.some((image) => image !== null) && (
                      <p
                        className="cursor-pointer Gallery-Button"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isloading}
                      >
                        {isloading ? "Uploading..." : "Upload Gallery"}
                      </p>
                    )}
                </div>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="galleryfeilds"
              encType="multipart/form-data"
            >
              {!openFolderId ? (
                <div className="w-full h-full flex justify-center items-center">
                  <p>Please select a folder to start adding images.</p>
                </div>
              ) : (
                <div className="mapimages">
                  {images.map((image, index) => (
                    <div className="galleryfeilds-data" key={index}>
                      <div className="galleryfeilds-data-image">
                        <div className="galleryfeilds-data-image-section">
                          {image?.previewUrl ? (
                            <img
                              src={image.previewUrl}
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              onClick={() => handleIconClick(index)}
                              style={{ cursor: "pointer" }}
                            >
                              <RiUpload2Fill className="section-icon" />
                              <h4>{index + 1}</h4>
                            </div>
                          )}
                          <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[index] = el)}
                            onChange={(e) => handleImageChange(e, index)}
                            multiple={images.length > 1} // Multiple selection if more than one image exists
                            style={{ display: "none" }}
                          />
                        </div>
                        <span
                          onClick={() => handleRemoveImage(index)}
                          style={{ cursor: "pointer", color: "red" }}
                        >
                          <MdClose className="iconclose" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploadimages;
{
  /* <div className={`UploadImages ${folder ? "show" : "hide"}`}>
               
              </div> */
}
