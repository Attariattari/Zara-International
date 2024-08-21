import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddProductForm.css";
import * as yup from "yup";
import Select from "react-select";
import { FaTimes } from "react-icons/fa";

// Validation schema
const schema = yup.object().shape({
  Name: yup
    .string()
    .required("Name is required")
    .max(100, "Name must be at most 100 characters"),
  MainImage: yup.string().required("Main Image is required"),
  Price: yup
    .object()
    .shape({
      real: yup.string().required("Real price is required"),
      discount: yup.string().required("Discount price is required"),
    })
    .required("Price is required"),
  Description: yup.string().required("Description is required"),
  variations: yup
    .array()
    .of(
      yup.object().shape({
        image: yup.array().of(yup.string().url("Invalid URL format")), // Array of image URLs or file names
        color: yup.string().required("Color is required"), // Single color string
        size: yup.string().required("Size is required"), // Single size string
      })
    )
    .required("Variations are required"),
  stock: yup
    .number()
    .required("Stock is required")
    .min(0, "Stock must be greater than or equal to 0"),
  minimumStock: yup
    .number()
    .min(0, "Minimum Stock must be greater than or equal to 0"),
  new: yup.boolean(),
  carousel: yup.boolean(),
  category: yup.string().required("Category is required"),
  subcategory: yup.string().required("Subcategory is required"),
  brand: yup.string(),
  tags: yup.array().of(yup.string()).min(1, "At least one tag is required"),
  careInstructions: yup.string(),
  availability: yup.string(),
  relatedProducts: yup.array().of(yup.string()),
  featured: yup.boolean(),
  active: yup.boolean(),
  sale: yup.boolean(),
  meta: yup.object().shape({
    title: yup.string(),
    description: yup.string(),
    keywords: yup
      .array()
      .of(yup.string())
      .min(1, "At least one keyword is required"),
  }),
  materials: yup.array().of(
    yup.object().shape({
      material: yup.string().required("Material is required"),
      percentage: yup
        .number()
        .required("Percentage is required")
        .min(0)
        .max(100),
    })
  ),
  dimensions: yup.object().shape({
    length: yup.number(),
    width: yup.number(),
    height: yup.number(),
  }),
  weight: yup.number(),
});

const AddProducts = () => {
  const [imagePreviews, setImagePreviews] = useState({});
  const [mode, setMode] = useState(null);
  const [mainImageMode, setMainImageMode] = useState(null); // null, 'file' or 'url'
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [showMainImageOptions, setShowMainImageOptions] = useState(false);
  const [showMainImageButton, setShowMainImageButton] = useState(true);
  const categories = [
    { _id: 1, Name: "Women" },
    { _id: 2, Name: "Men" },
    { _id: 3, Name: "Kids" },
  ];

  const subcategories = [
    { _id: 1, categoryId: 1, Name: "Dresses" },
    { _id: 2, categoryId: 1, Name: "Tops" },
    { _id: 3, categoryId: 2, Name: "Shirts" },
    { _id: 4, categoryId: 2, Name: "Trousers" },
    { _id: 5, categoryId: 3, Name: "Toys" },
    { _id: 6, categoryId: 3, Name: "Shoes" },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      materials: [{ material: "", percentage: 0 }],
      tags: [],
    },
  });

  // Use useFieldArray to manage the dynamic fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });
  const {
    fields: variationFields,
    append: appendVariation,
    remove: removeVariation,
  } = useFieldArray({
    control,
    name: "variations",
  });

  const onSubmit = (data) => {
    // Handle form submission
    console.log(data);
  };

  const handleImageChange = (event, variationIndex) => {
    const files = Array.from(event.target.files); // Correct 'event' usage
    setValue(`variations[${variationIndex}].image`, files);

    console.log("Files selected for variation", variationIndex, files); // Check files

    // Updating image previews for UI
    setImagePreviews((prev) => ({
      ...prev,
      [variationIndex]: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  const handleUrlsChange = (event, variationIndex) => {
    const urls = event.target.value
      .split("\n")
      .map((url) => url.trim())
      .filter((url) => url);
    const previews = urls.map((url) => url);

    console.log("URLs:", urls);
    console.log("Previews:", previews);

    setImagePreviews((prev) => ({
      ...prev,
      [variationIndex]: previews,
    }));
  };

  // Function to handle removing image previews
  const handleRemoveImage = (index, isMainImage) => {
    if (isMainImage) {
      setMainImagePreview(""); // Remove main image preview
    } else {
      setMainImagePreview((prev) => {
        const updatedPreviews = { ...prev };
        updatedPreviews[index] = []; // Remove previews for the specific variation
        return updatedPreviews;
      });
    }
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files[0];
    const preview = file ? URL.createObjectURL(file) : "";
    setMainImagePreview(preview);
  };

  const handleMainImageUrlChange = (event) => {
    const url = event.target.value.trim();

    // URL validation regex
    const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;

    if (urlRegex.test(url)) {
      setMainImagePreview(url);
    } else {
      setMainImagePreview(""); // Clear the preview if URL is invalid
    }
  };

  const handleModeSelect = (mode) => {
    setMainImageMode(mode);
    setShowMainImageOptions(false);
    setShowMainImageButton(false);
  };

  const handleReset = () => {
    setMainImageMode(null);
    setShowMainImageOptions(true);
    setMainImagePreview("");
  };
  // Convert value to object format expected by react-select
  const getOptionFromValue = (value, options) =>
    options.find((option) => option.value === value) || null;

  const availabilityOptions = [
    { value: "in_stock", label: "In stock" },
    { value: "out_of_stock", label: "Out of stock" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-product-form">
      <label>Name:</label>
      <input {...register("Name")} />
      {errors.Name && <p>{errors.Name.message}</p>}

      {showMainImageButton && !showMainImageOptions && (
        <button type="button" onClick={() => setShowMainImageOptions(true)}>
          Add Main Image
        </button>
      )}

      {showMainImageOptions && !mainImageMode && (
        <div>
          <button type="button" onClick={() => handleModeSelect("file")}>
            Select File
          </button>
          <button type="button" onClick={() => handleModeSelect("url")}>
            Provide URL
          </button>
        </div>
      )}

      {mainImageMode === "file" && (
        <div>
          <input
            type="file"
            {...register("MainImage")}
            onChange={handleMainImageChange}
          />
          {mainImagePreview && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={mainImagePreview}
                alt="Main Image Preview"
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
              <FaTimes
                onClick={() => setMainImagePreview("")} // Clear the main image preview on close
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                  color: "red",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            </div>
          )}
        </div>
      )}

      {mainImageMode === "url" && (
        <div>
          <input
            type="text"
            {...register("MainImage")}
            placeholder="Paste image URL here"
            onChange={handleMainImageUrlChange}
          />
          {mainImagePreview && (
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={mainImagePreview} // Use mainImagePreview here
                alt="Main Image Preview"
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
              <FaTimes
                onClick={() => setMainImagePreview("")} // Clear the main image preview on close
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  cursor: "pointer",
                  color: "red",
                  background: "white",
                  borderRadius: "50%",
                }}
              />
            </div>
          )}
        </div>
      )}

      {mainImageMode !== null && (
        <button type="button" onClick={handleReset}>
          Add Another Main Image
        </button>
      )}
      {errors.MainImage && <p>{errors.MainImage.message}</p>}

      <label>Price:</label>
      <div>
        <input {...register("Price.real")} placeholder="Real Price" />
        <input {...register("Price.discount")} placeholder="Discount Price" />
        {errors.Price?.real && <p>{errors.Price.real.message}</p>}
        {errors.Price?.discount && <p>{errors.Price.discount.message}</p>}
      </div>

      <label>Description:</label>
      <textarea {...register("Description")} />
      {errors.Description && <p>{errors.Description.message}</p>}

      <label>Variations:</label>
      {variationFields.map((field, index) => (
        <div key={field.id}>
          <label>Color:</label>
          <input
            {...register(`variations.${index}.color`)}
            placeholder="Color"
            defaultValue={field.color} // Single string for color
          />
          {errors.variations?.[index]?.color && (
            <p>{errors.variations[index].color.message}</p>
          )}

          <label>Size:</label>
          <input
            {...register(`variations.${index}.size`)}
            placeholder="Size"
            defaultValue={field.size} // Single string for size
          />
          {errors.variations?.[index]?.size && (
            <p>{errors.variations[index].size.message}</p>
          )}

          {mode === null && (
            <div>
              <button type="button" onClick={() => setMode("file")}>
                Select Images
              </button>
              <button type="button" onClick={() => setMode("url")}>
                Provide URLs
              </button>
            </div>
          )}

          {mode && (
            <div>
              <button type="button" onClick={() => setMode(null)}>
                Change Mode
              </button>
            </div>
          )}

          {mode === "file" && (
            <div>
              <input
                type="file"
                multiple
                {...register(`variations.${index}.image`)}
                onChange={(e) => handleImageChange(e, index)}
              />
              {errors.variations?.[index]?.image && (
                <p>{errors.variations[index].image.message}</p>
              )}
              {imagePreviews[index] && (
                <div>
                  {imagePreviews[index].map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        src={image}
                        alt={`Preview ${index}-${imgIndex}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                        }}
                      />
                      <FaTimes
                        onClick={() => handleRemoveImage(index, imgIndex)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          cursor: "pointer",
                          color: "red",
                          background: "white",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {mode === "url" && (
            <div>
              <textarea
                placeholder="Paste image URLs here (one per line)"
                onChange={(e) => handleUrlsChange(e, index)}
                rows="4"
                cols="50"
                {...register(`variations.${index}.image`)}
              />
              {errors.variations?.[index]?.image && (
                <p>{errors.variations[index].image.message}</p>
              )}
              {imagePreviews[index] && (
                <div>
                  {imagePreviews[index].map((image, imgIndex) => (
                    <div
                      key={imgIndex}
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <img
                        src={image}
                        alt={`Preview ${index}-${imgIndex}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                        }}
                      />
                      <FaTimes
                        onClick={() => handleRemoveImage(index, imgIndex)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          cursor: "pointer",
                          color: "red",
                          background: "white",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <button type="button" onClick={() => removeVariation(index)}>
            Remove Variation
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendVariation({ color: "", size: "", image: [] })}
      >
        Add Variation
      </button>

      <label>Stock:</label>
      <input type="number" {...register("stock")} />
      {errors.stock && <p>{errors.stock.message}</p>}

      <label>Minimum Stock:</label>
      <input type="number" {...register("minimumStock")} />
      {errors.minimumStock && <p>{errors.minimumStock.message}</p>}

      <label>New:</label>
      <input type="checkbox" {...register("new")} />

      <label>Carousel:</label>
      <input type="checkbox" {...register("carousel")} />

      <label>Category:</label>
      <Controller
        name="category"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          const categoryOptions = (categories || []).map((cat) => ({
            value: cat._id,
            label: cat.Name,
          }));

          return (
            <Select
              onChange={(option) => {
                console.log("Selected Category:", option); // Debugging
                onChange(option ? option.value : ""); // Ensure it passes the correct value
              }}
              onBlur={onBlur}
              value={getOptionFromValue(value, categoryOptions)} // Convert value to object format
              options={categoryOptions}
              placeholder="Select Category"
              ref={ref}
            />
          );
        }}
      />
      {errors.category && <p>{errors.category.message}</p>}

      <label>Subcategory:</label>
      <Controller
        name="subcategory"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          const subcategoryOptions = (subcategories || []).map((subcat) => ({
            value: subcat._id,
            label: subcat.Name,
          }));

          return (
            <Select
              onChange={(option) => {
                console.log("Selected Subcategory:", option); // Debugging
                onChange(option ? option.value : ""); // Ensure it passes the correct value
              }}
              onBlur={onBlur}
              value={getOptionFromValue(value, subcategoryOptions)} // Convert value to object format
              options={subcategoryOptions}
              placeholder="Select Subcategory"
              ref={ref}
            />
          );
        }}
      />
      {errors.subcategory && <p>{errors.subcategory.message}</p>}

      <label>Brand:</label>
      <input {...register("brand")} />

      <label>Tags:</label>
      <input
        placeholder="Comma separated tags"
        {...register("tags", {
          setValueAs: (v) => {
            // Ensure v is a string before calling split
            if (typeof v === "string") {
              return v
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "");
            }
            return []; // Return an empty array if v is not a string
          },
        })}
      />
      {errors.tags && <p>{errors.tags.message}</p>}

      <label>Care Instructions:</label>
      <textarea {...register("careInstructions")} />

      <label>Availability:</label>
      <Controller
        name="availability"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Select
            onChange={(option) => {
              console.log("Selected Availability:", option); // Debugging
              onChange(option ? option.value : ""); // Ensure it passes the correct value
            }}
            onBlur={onBlur}
            value={getOptionFromValue(value, availabilityOptions)} // Convert value to object format
            options={availabilityOptions}
            placeholder="Select Availability"
            ref={ref}
          />
        )}
      />
      {errors.availability && <p>{errors.availability.message}</p>}

      <label>Featured:</label>
      <input type="checkbox" {...register("featured")} />

      <label>Active:</label>
      <input type="checkbox" {...register("active")} />

      <label>Sale:</label>
      <input type="checkbox" {...register("sale")} />

      <label>Meta Title:</label>
      <input {...register("meta.title")} />

      <label>Meta Description:</label>
      <textarea {...register("meta.description")} />

      <label>Meta Keywords:</label>
      <input
        {...register("meta.keywords", {
          setValueAs: (v) => {
            // Ensure v is a string before calling split
            if (typeof v === "string") {
              return v
                .split(",")
                .map((keyword) => keyword.trim())
                .filter((keyword) => keyword !== "");
            }
            return []; // Return an empty array if v is not a string
          },
        })}
        placeholder="Comma separated keywords"
      />
      {errors.meta?.keywords && <p>{errors.meta.keywords.message}</p>}

      <label>Materials:</label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            {...register(`materials.${index}.material`)}
            placeholder="Material"
            defaultValue={field.material} // Use defaultValue for initial values
          />
          <input
            type="number"
            {...register(`materials.${index}.percentage`)}
            placeholder="Percentage"
            defaultValue={field.percentage} // Use defaultValue for initial values
          />
          {errors.materials?.[index]?.material && (
            <p>{errors.materials[index].material.message}</p>
          )}
          {errors.materials?.[index]?.percentage && (
            <p>{errors.materials[index].percentage.message}</p>
          )}
          <button
            type="button"
            onClick={() => remove(index)} // Add remove functionality if needed
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ material: "", percentage: 0 })}
      >
        Add Material
      </button>

      <label>Dimensions:</label>
      <input {...register("dimensions.length")} placeholder="Length" />
      <input {...register("dimensions.width")} placeholder="Width" />
      <input {...register("dimensions.height")} placeholder="Height" />

      <label>Weight:</label>
      <input type="number" {...register("weight")} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProducts;
