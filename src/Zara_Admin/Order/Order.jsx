import React, { useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../../Context/UserContext";

const Order = () => {
  const [galleryName, setGalleryName] = useState("");
  const [folderName, setFolderName] = useState("");
  const [images, setImages] = useState([]);
  const [altTexts, setAltTexts] = useState([]);
  const [titles, setTitles] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [tags, setTags] = useState([[]]); // Array of arrays for tags
  const { token } = useContext(userContext);

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleAltTextChange = (e, index) => {
    const newAltTexts = [...altTexts];
    newAltTexts[index] = e.target.value;
    setAltTexts(newAltTexts);
  };

  const handleTitleChange = (e, index) => {
    const newTitles = [...titles];
    newTitles[index] = e.target.value;
    setTitles(newTitles);
  };

  const handleDescriptionChange = (e, index) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = e.target.value;
    setDescriptions(newDescriptions);
  };

  const handleTagsChange = (e, index) => {
    const newTags = [...tags];
    newTags[index] = e.target.value.split(",");
    setTags(newTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("galleryName", galleryName);
    formData.append("folderName", folderName);

    images.forEach((image) => {
      formData.append("images", image); // Ensure this matches the field name in Multer configuration
    });

    try {
      const response = await axios.post("http://localhost:1122/images/upload-gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      alert("Gallery uploaded successfully!");
    } catch (error) {
      console.error("Error uploading gallery:", error);
      alert("Failed to upload gallery.");
    }
  };


  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Gallery Name:</label>
        <input
          type="text"
          value={galleryName}
          onChange={(e) => setGalleryName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Folder Name:</label>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          required
        />
      </div>

      {images.map((_, index) => (
        <div key={index}>
          <h4>Image {index + 1}</h4>
          <input type="file" onChange={(e) => handleImageChange(e, index)} required />

          <div>
            <label>Alt Text:</label>
            <input
              type="text"
              value={altTexts[index] || ""}
              onChange={(e) => handleAltTextChange(e, index)}
            />
          </div>

          <div>
            <label>Title:</label>
            <input
              type="text"
              value={titles[index] || ""}
              onChange={(e) => handleTitleChange(e, index)}
            />
          </div>

          <div>
            <label>Description:</label>
            <textarea
              value={descriptions[index] || ""}
              onChange={(e) => handleDescriptionChange(e, index)}
            />
          </div>

          <div>
            <label>Tags (comma-separated):</label>
            <input
              type="text"
              value={tags[index]?.join(",") || ""}
              onChange={(e) => handleTagsChange(e, index)}
            />
          </div>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={() => {
            setImages([...images, null]);
            setAltTexts([...altTexts, ""]);
            setTitles([...titles, ""]);
            setDescriptions([...descriptions, ""]);
            setTags([...tags, []]);
          }}
        >
          Add Image
        </button>
      </div>

      <button type="submit">Upload Gallery</button>
    </form>
  );
};

export default Order;
