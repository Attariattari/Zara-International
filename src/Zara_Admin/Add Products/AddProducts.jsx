import React, { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddProductForm.css";
import { userContext } from "../../Context/UserContext";
import axios from "axios";
import Select from "react-select";
import { IoStorefrontSharp } from "react-icons/io5";
import { CgCopy } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";
import GallerySelect from "./Gallery-Select/GallerySelect";
import { MdClose } from "react-icons/md";

// Zod Schema for validation
const productSchema = z.object({
  Name: z.string().min(1, "Product name is required"),
  MainImage: z.string().url("Main image must be a valid URL"),
  Description: z.string().min(1, "Description is required"),
  variations: z
    .array(
      z.object({
        image: z.array(z.string().url("Each image URL must be valid")),
        color: z.string().min(1, "Color is required"),
        size: z.string().min(1, "Size is required"),
        dimensions: z
          .object({
            length: z.number().optional(),
            width: z.number().optional(),
            height: z.number().optional(),
          })
          .refine(
            (val) =>
              val.length !== undefined ||
              val.width !== undefined ||
              val.height !== undefined,
            {
              message:
                "At least one dimension (length, width, height) must be provided",
            }
          )
          .optional(),
        weight: z.number().optional(),
        stock: z.number().min(0, "Stock must be at least 0"),
        price: z.object({
          real: z.string().min(1, "Real price is required"),
          discount: z.string().optional(),
        }),
        status: z
          .enum(["In Stock", "Out of Stock", "Discontinued"])
          .default("In Stock"),
      })
    )
    .min(1, "At least one variation is required"),
  new: z.boolean().default(true),
  carousel: z.boolean().optional(),
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  childsubcategory: z.string().optional(),
  brand: z.string().optional(),
  tags: z.array(z.string()).optional(),
  careInstructions: z.string().optional(),
  availability: z.string().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().default(true),
  sale: z.boolean().default(false),
  meta: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
  materials: z
    .array(
      z.object({
        material: z.string().min(1, "Material is required"),
        percentage: z.number().min(0, "Percentage must be a positive number"),
      })
    )
    .optional(),
  publishStatus: z.enum(["Published", "Draft"]).default("Draft"),
});

const ProductForm = () => {
  // const [variations, setVariations] = useState([
  //   {
  //     image: [],
  //     color: "",
  //     size: "",
  //     price: { real: "", discount: "" },
  //     dimensions: { length: 0, width: 0, height: 0 },
  //     weight: 0,
  //     stock: 0,
  //     status: "In Stock",
  //   },
  // ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  const { token } = useContext(userContext);
  const [state, setState] = useState({
    categories: [],
    subcategories: [],
    childsubcategory: [],
    selectedCategory: null,
    selectedSubcategory: null,
    selectedhildsubcategory: null,
    gallery: false,
    selectedMainImage: null,
    variations: [
      {
        image: [],
        color: "",
        size: "",
        price: { real: "", discount: "" },
        dimensions: { length: 0, width: 0, height: 0 },
        weight: 0,
        stock: 0,
        status: "In Stock",
      },
    ],
    showVariationPopup: false, // For handling popup visibility
    activeVariationIndex: null,
  });
  // Convert comma-separated image URLs to array
  const handleImageChange = (e, index) => {
    const value = e.target.value;
    const imageArray = value.split(",").map((url) => url.trim());
    setValue(`variations.${index}.image`, imageArray);
  };

  const handleNumberChange = (e, index, field) => {
    const value = e.target.value;
    const numberValue = parseFloat(value); // Convert string to number
    setValue(`variations.${index}.${field}`, numberValue); // Update state
  };

  // Function to convert comma-separated tags string to array
  const handleTagChange = (e) => {
    const value = e.target.value;
    const tagsArray = value.split(",").map((tag) => tag.trim()); // Trimmed array of tags
    setValue("tags", tagsArray); // Set value as array
  };
  // Function to convert comma-separated meta keywords string to array
  const handleMetaKeywordsChange = (e) => {
    const value = e.target.value;
    const keywordsArray = value.split(",").map((keyword) => keyword.trim());
    setValue("meta.keywords", keywordsArray); // Set value as array
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1122/MainCategory/getAll",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setState((prevState) => ({
          ...prevState,
          categories: Array.isArray(response.data) ? response.data : [],
        }));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async (categoryId) => {
      try {
        const response = await axios.get(
          `http://localhost:1122/SubMainCategory/subcategories/maincategory/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setState((prevState) => ({
          ...prevState,
          subcategories: response.data.data,
        }));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setState((prevState) => ({
          ...prevState,
          subcategories: [],
        }));
      }
    };

    // Trigger subcategory fetch when a category is selected
    if (state.selectedCategory) {
      fetchSubcategories(state.selectedCategory);
    } else {
      setState((prevState) => ({
        ...prevState,
        subcategories: [], // Reset subcategories if no category is selected
      }));
    }
  }, [state.selectedCategory, token]);

  useEffect(() => {
    const fetchChildSubcategories = async (categoryId, subcategoryId) => {
      try {
        const response = await axios.get(
          `http://localhost:1122/ChildSubCategory/by-main-sub/${categoryId}/${subcategoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setState((prevState) => ({
          ...prevState,
          childsubcategory: response.data.data,
        }));
      } catch (error) {
        console.error("Error fetching childsubcategory:", error);
        setState((prevState) => ({
          ...prevState,
          childsubcategory: [], // Reset childsubcategory if an error occurs
        }));
      }
    };

    // Trigger fetch when both selectedCategory and selectedSubcategory are available
    if (state.selectedCategory && state.selectedSubcategory) {
      fetchChildSubcategories(
        state.selectedCategory,
        state.selectedSubcategory
      );
    } else {
      setState((prevState) => ({
        ...prevState,
        childsubcategory: [], // Reset childsubcategory if not selected
      }));
    }
  }, [state.selectedCategory, state.selectedSubcategory, token]);

  const getOptionFromValue = (value, options) => {
    return options.find((option) => option.value === value) || null;
  };

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      category: state.selectedCategory, // Ensure category is included
      subcategory: state.selectedSubcategory, // Ensure subcategory is included
      childsubcategory: state.selectedChildSubcategory, // Include selected childsubcategory
    };

    console.log("Submitting Data:", updatedData); // Debugging

    try {
      const response = await axios.post(
        "http://localhost:1122/Product/Create",
        updatedData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Product created successfully:", response.data);
      reset(); // Reset the form after submission
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleImageSelect = (imageURL) => {
    setValue("MainImage", imageURL); // Set the image URL
    setState((prevState) => ({
      ...prevState,
      selectedMainImage: imageURL, // Update selected main image
      gallery: false, // Close the gallery
    }));
  };
  const handleImageUnSelect = (imageURL) => {
    setState((prevState) => ({
      ...prevState,
      selectedMainImage: false,
      gallery: true,
    }));
  };

  const handleGallery = () => {
    if (!state.selectedMainImage) {
      setState((prevState) => ({
        ...prevState,
        gallery: true, // Open the gallery
      }));
    }
  };

  const handleVariationClick = (index) => {
    setState((prevState) => ({
      ...prevState,
      showVariationPopup: true,
      activeVariationIndex: index,
    }));
  };

  // Function to handle closing the popup
  const closePopup = () => {
    setState((prevState) => ({
      ...prevState,
      showVariationPopup: false,
      activeVariationIndex: null,
    }));
  };

  // Function to add a new variation card
  const addVariation = () => {
    setState((prevState) => ({
      ...prevState,
      variations: [
        ...prevState.variations,
        {
          image: [],
          color: "",
          size: "",
          price: { real: "", discount: "" },
          dimensions: { length: 0, width: 0, height: 0 },
          weight: 0,
          stock: 0,
          status: "In Stock",
        },
      ],
    }));
  };

  const removeVariation = (index) => {
    setState((prevState) => ({
      ...prevState,
      variations: prevState.variations.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="Product">
        <div className="Product-mainarea">
          <div className="Product-Title">
            <div className="Product-Title-first">
              <IoStorefrontSharp />
              <p>Add New Product</p>
            </div>
            <div className="Product-Title-second">
              <button className="Draf-button" title="Save Draf">
                <CgCopy className="draf-icon" />
                <p>Save Draf</p>
              </button>
              <button className="Add-button" title="Add Product">
                Add Product
              </button>
            </div>
          </div>
          <div className="Product-main-data">
            <div className="Product-from-area">
              <div>
                <label>Product Name.</label>
                <input
                  type="text"
                  {...register("Name")}
                  placeholder="Enter Product Name ....."
                />
                {errors.Name && <span>{errors.Name.message}</span>}
              </div>
              <div>
                <label>Description</label>
                <textarea
                  className="Product-from-area-textarea"
                  {...register("Description")}
                  placeholder="Enter Product Detailed Discription ....."
                  rows={7}
                />{" "}
                {errors.Description && (
                  <span className="Discription-error">
                    {errors.Description.message}
                  </span>
                )}
              </div>
              <div>
                <div className="Product-variation-area">
                  <p>Variations</p>
                  <p
                    className="Variation-Button-product"
                    type="button"
                    onClick={addVariation}
                  >
                    Add Variation
                  </p>
                </div>

                {/* Render cards for each variation */}
                <div className="variation-cards">
                  {state.variations.map((_, index) => (
                    <div key={index} className="variation-card">
                      <p>Variation {index + 1}</p>
                      <p onClick={() => handleVariationClick(index)}>
                        Click to edit details
                      </p>
                      <p onClick={() => removeVariation(index)}>Remove</p>{" "}
                    </div>
                  ))}
                </div>

                {/* Popup for editing variation */}
                {state.showVariationPopup && (
                  <div className="variation-popup">
                    <div className="popup-content">
                      <button onClick={closePopup}>Close</button>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <label>Color</label>
                        <input
                          type="text"
                          {...register(
                            `variations.${state.activeVariationIndex}.color`,
                            {
                              required: "Color is required",
                            }
                          )}
                          placeholder="Color"
                        />
                        {errors.variations?.[state.activeVariationIndex]
                          ?.color && (
                          <span>
                            {
                              errors.variations[state.activeVariationIndex]
                                .color.message
                            }
                          </span>
                        )}

                        <label>Size</label>
                        <input
                          type="text"
                          {...register(
                            `variations.${state.activeVariationIndex}.size`,
                            {
                              required: "Size is required",
                            }
                          )}
                          placeholder="Size"
                        />
                        {errors.variations?.[state.activeVariationIndex]
                          ?.size && (
                          <span>
                            {
                              errors.variations[state.activeVariationIndex].size
                                .message
                            }
                          </span>
                        )}

                        <label>Real Price</label>
                        <input
                          type="text"
                          {...register(
                            `variations.${state.activeVariationIndex}.price.real`,
                            {
                              required: "Real Price is required",
                            }
                          )}
                          placeholder="Real Price"
                        />
                        {errors.variations?.[state.activeVariationIndex]?.price
                          ?.real && (
                          <span>
                            {
                              errors.variations[state.activeVariationIndex]
                                .price.real.message
                            }
                          </span>
                        )}

                        <label>Discount Price (optional)</label>
                        <input
                          type="text"
                          {...register(
                            `variations.${state.activeVariationIndex}.price.discount`
                          )}
                          placeholder="Discount Price"
                        />

                        <label>Dimensions (L x W x H)</label>
                        <input
                          type="number"
                          placeholder="Length"
                          {...register(
                            `variations.${state.activeVariationIndex}.dimensions.length`
                          )}
                        />
                        <input
                          type="number"
                          placeholder="Width"
                          {...register(
                            `variations.${state.activeVariationIndex}.dimensions.width`
                          )}
                        />
                        <input
                          type="number"
                          placeholder="Height"
                          {...register(
                            `variations.${state.activeVariationIndex}.dimensions.height`
                          )}
                        />

                        <label>Weight (kg)</label>
                        <input
                          type="number"
                          {...register(
                            `variations.${state.activeVariationIndex}.weight`
                          )}
                          placeholder="Weight (kg)"
                        />

                        <label>Stock</label>
                        <input
                          type="number"
                          {...register(
                            `variations.${state.activeVariationIndex}.stock`
                          )}
                          placeholder="Stock"
                        />

                        <label>Status</label>
                        <select
                          {...register(
                            `variations.${state.activeVariationIndex}.status`
                          )}
                        >
                          <option value="In Stock">In Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                          <option value="Discontinued">Discontinued</option>
                        </select>

                        <button type="submit">Save Variation</button>
                      </form>
                    </div>
                  </div>
                )}
                {errors.variations && <span>{errors.variations.message}</span>}
              </div>
            </div>
            <div className="Product-detils-area">
              <div>
                <label>Select Main Image.</label>
                <div
                  className="Product-detils-area-main-image"
                  onClick={handleGallery} // Open gallery when clicked
                >
                  {state.selectedMainImage ? (
                    <>
                      <img
                        className="MainImageSlected"
                        src={state.selectedMainImage}
                        alt="Selected Main"
                      />
                      <p
                        className="MainImageunSlected"
                        onClick={handleImageUnSelect}
                      >
                        <MdClose />
                      </p>
                    </>
                  ) : (
                    <LuPlus className="Product-detils-area-main-Plus" />
                  )}
                </div>
                {errors.MainImage && <span>{errors.MainImage.message}</span>}
              </div>
              {state.variations.map((_, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder="Image URLs (comma-separated)"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  {errors.variations?.[index]?.image && (
                    <span>{errors.variations[index].image.message}</span>
                  )}{" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {state.gallery && (
        <GallerySelect
          handleGalleryfalse={() =>
            setState((prevState) => ({ ...prevState, gallery: false }))
          }
          onSelectImage={handleImageSelect}
        />
      )}
    </form>
  );
};

export default ProductForm;
{
  /*                 
              
              <div>
                <label>Is New?</label>
                <input type="checkbox" {...register("new")} defaultChecked />
              </div>
              <div>
                <label>Show in Carousel?</label>
                <input type="checkbox" {...register("carousel")} />
              </div>
              <label>Category:</label>
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  const categoryOptions = state.categories.map((cat) => ({
                    value: cat._id,
                    label: cat.MainCategoryName,
                  }));

                  return (
                    <Select
                      onChange={(option) => {
                        console.log("Selected Category:", option); // Debugging
                        onChange(option ? option.value : "");
                        const selectedCategoryId = option ? option.value : null;

                        // Set selected category and reset subcategories
                        setState((prevState) => ({
                          ...prevState,
                          selectedCategory: selectedCategoryId,
                          subcategories: [], // Reset subcategories when category changes
                        }));
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
              {/* Subcategory Select */
}
{
  /* <label>Subcategory:</label>
              <Controller
                name="subcategory"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  const subcategoryOptions = Array.isArray(state.subcategories)
                    ? state.subcategories.map((subcat) => ({
                        value: subcat._id,
                        label: subcat.SubMainCategory,
                      }))
                    : [];

                  return (
                    <Select
                      onChange={(option) => {
                        console.log("Selected Subcategory:", option); // Debugging
                        onChange(option ? option.value : "");
                        setState((prevState) => ({
                          ...prevState,
                          selectedSubcategory: option ? option.value : null, // Update state
                        }));
                      }}
                      onBlur={onBlur}
                      value={getOptionFromValue(value, subcategoryOptions)}
                      options={subcategoryOptions}
                      placeholder="Select Subcategory"
                      ref={ref}
                      isDisabled={!state.selectedCategory} // Disable if no category selected
                    />
                  );
                }}
              />
              {errors.subcategory && <p>{errors.subcategory.message}</p>}
              <label>Child-Subcategory:</label>
              <Controller
                name="childsubcategory"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  const childsubcategoryOptions = Array.isArray(
                    state.childsubcategory
                  )
                    ? state.childsubcategory.map((childsubcat) => ({
                        value: childsubcat._id,
                        label: childsubcat.ChildSubCategory,
                      }))
                    : [];

                  return (
                    <Select
                      onChange={(option) => {
                        console.log("Selected ChildSubCategory:", option); // Debugging
                        onChange(option ? option.value : "");
                        setState((prevState) => ({
                          ...prevState,
                          selectedChildSubcategory: option
                            ? option.value
                            : null, // Update state
                        }));
                      }}
                      onBlur={onBlur}
                      value={getOptionFromValue(value, childsubcategoryOptions)}
                      options={childsubcategoryOptions}
                      placeholder="Select Child Subcategory"
                      ref={ref}
                      isDisabled={!state.selectedSubcategory} // Disable if no subcategory selected
                    />
                  );
                }}
              />
              {errors.childsubcategory && (
                <p>{errors.childsubcategory.message}</p>
              )} */
}
{
  /* <div>
                <label>Brand</label>
                <input type="text" {...register("brand")} />
              </div>
              <div>
                <label>Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Tags (comma-separated)"
                  onChange={handleTagChange} // Call custom tag handler
                />
                {errors.tags && <span>{errors.tags.message}</span>}
              </div>
              <div>
                <label>Care Instructions</label>
                <textarea {...register("careInstructions")}></textarea>
              </div>
              <div>
                <label>Availability</label>
                <select {...register("availability")} defaultValue="In Stock">
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Limited Availability">
                    Limited Availability
                  </option>
                  <option value="Pre-order">Pre-order</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
                {errors.availability && (
                  <span className="error-message">
                    {errors.availability.message}
                  </span>
                )}
              </div>
              <div>
                <label>Featured</label>
                <input type="checkbox" {...register("featured")} />
              </div>
              <div>
                <label>Active</label>
                <input type="checkbox" {...register("active")} defaultChecked />
              </div>
              <div>
                <label>On Sale?</label>
                <input type="checkbox" {...register("sale")} />
              </div>
              <div>
                <label>Meta Title</label>
                <input type="text" {...register("meta.title")} />
              </div>
              <div>
                <label>Meta Description</label>
                <textarea {...register("meta.description")}></textarea>
              </div>
              <div>
                <label>Meta Keywords (comma-separated)</label>
                <input type="text" onChange={handleMetaKeywordsChange} />
                {errors.meta?.keywords && (
                  <span>{errors.meta.keywords.message}</span>
                )}
              </div>
              <div className="materials-container">
                <label htmlFor="material">Material</label>
                <input
                  type="text"
                  id="material"
                  placeholder="Material (e.g., Cotton)"
                  {...register("material", {
                    required: "Material is required",
                  })}
                />
                {errors.material && (
                  <span className="error-message">
                    {errors.material.message}
                  </span>
                )}

                <label htmlFor="percentage">Percentage</label>
                <input
                  type="number"
                  id="percentage"
                  placeholder="Percentage (e.g., 100)"
                  {...register("percentage", {
                    required: "Percentage is required",
                    min: 1,
                    max: 100,
                  })}
                />
                {errors.percentage && (
                  <span className="error-message">
                    {errors.percentage.message}
                  </span>
                )}
              </div>
              <div>
                <label>Publish Status</label>
                <select {...register("publishStatus")}>
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div> */
}
