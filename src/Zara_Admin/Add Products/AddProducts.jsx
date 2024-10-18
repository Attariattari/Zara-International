import React, { useCallback, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddProductForm.css";
import { userContext } from "../../Context/UserContext";
import axios from "axios";
import Select from "react-select";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { IoStorefrontSharp } from "react-icons/io5";
import { CgCopy } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";
import GallerySelect from "./Gallery-Select/GallerySelect";
import { MdClose } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { WithContext as ReactTags } from "react-tag-input";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// Zod Schema for validation
const productSchema = z.object({
  Name: z.string().min(1, "Product name is required"),
  MainImage: z.string().url("Main image must be a valid URL"),
  Description: z.string().min(1, "Description is required"),
  variations: z
    .array(
      z.object({
        image: z
          .array(z.string().url("Each image URL must be valid"))
          .refine((val) => val.length > 0, {
            message: "At least one image is required",
          }),
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
        stock: z.number().min(1, "Stock must be at least 0"),
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
    selectedChildSubcategory: null,
    gallery: false,
    galleryVariaton: false,
    selectedMainImage: null,
    selectedVariationimages: null,
    isVariation: false,
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
    activeVariationIndex: 0,
    defaultImage: null,
    tags: [], // First set of tags
    metaKeywords: [],
  });
  const delimiters = [188, 13]; // 188 = comma, 13 = enter key

  // ReactTag specific handlers for `tags`
  const handleDeleteTags = (i) => {
    setState((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((tag, index) => index !== i),
    }));
  };

  const handleAdditionTags = (tag) => {
    setState((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, tag],
    }));
  };

  // ReactTag specific handlers for `metaKeywords`
  const handleDeleteMetaKeywords = (i) => {
    setState((prevState) => ({
      ...prevState,
      metaKeywords: prevState.metaKeywords.filter((tag, index) => index !== i),
    }));
  };

  const handleAdditionMetaKeywords = (tag) => {
    setState((prevState) => ({
      ...prevState,
      metaKeywords: [...prevState.metaKeywords, tag],
    }));
  };

  const handleNumberChange = (e, index, field) => {
    const value = e.target.value;
    const numberValue = parseFloat(value); // Convert string to number
    setValue(`variations.${index}.${field}`, numberValue); // Update state
  };
  const handleNumberChangeStock = (e, index, field) => {
    const value = e.target.value;
    const numberValue = value ? parseFloat(value) : 0; // Convert string to number or set to 0
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
    console.log(data);
    try {
      // Agar data valid hai, toh API request karo
      const updatedData = {
        ...data,
        category: state.selectedCategory,
        subcategory: state.selectedSubcategory,
        childsubcategory: state.selectedChildSubcategory,
      };
      console.log("Product created successfully:", response.data);
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
      console.error("Error creating product:", error); // Console mein error dikhaye
    }
    console.log("Product created successfully:", response.data);
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

  const handleVariationImages = (imageURL) => {
    setState((prevState) => {
      console.log("Previous State:", prevState); // Debugging

      const currentVariation =
        prevState.variations[prevState.activeVariationIndex];

      const isImageSelected = currentVariation?.image.includes(imageURL);

      if (isImageSelected) {
        alert("This image is already selected. Kindly select another image."); // Show error message
        return prevState; // Do not update the state if image is already selected
      }

      const updatedImages = [...currentVariation.image, imageURL]; // Add new image to variation

      const updatedVariations = [...prevState.variations];
      updatedVariations[prevState.activeVariationIndex] = {
        ...currentVariation,
        image: updatedImages,
      };

      return {
        ...prevState,
        variations: updatedVariations,
        gallery: false,
      };
    });
  };

  const handleVariationImagesUnselect = (imageURL) => {
    setState((prevState) => {
      const updatedImages = prevState.variations[
        prevState.activeVariationIndex
      ]?.image.filter((img) => img !== imageURL); // Filter out the clicked image

      const updatedVariations = [...prevState.variations];
      updatedVariations[prevState.activeVariationIndex] = {
        ...updatedVariations[prevState.activeVariationIndex],
        image: updatedImages,
      };

      return {
        ...prevState,
        variations: updatedVariations, // Update variations in state
        selectedVariationimages: updatedImages, // Update selected images state if needed
      };
    });
  };

  const handleGallery = () => {
    if (!state.selectedMainImage) {
      setState((prevState) => ({
        ...prevState,
        gallery: true, // Open the gallery
      }));
    }
  };

  const handleGalleryVariation = (index) => {
    setState((prevState) => ({
      ...prevState,
      galleryVariaton: true, // Open the gallery
      activeVariationIndex: index, // Set the active variation index
    }));
  };

  const handleVariationClick = (index) => {
    setState((prevState) => ({
      ...prevState,
      showVariationPopup: true,
      activeVariationIndex: index, // Set the active index here
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
    setState((prevState) => {
      // If the removed variation is the one that is currently being edited in the popup, close the popup
      if (prevState.activeVariationIndex === index) {
        return {
          ...prevState,
          variations: prevState.variations.filter((_, i) => i !== index),
          showVariationPopup: false, // Close the popup
          activeVariationIndex: null, // Reset the active index
        };
      }

      // Close popup if any other variation is removed and active one becomes out of bounds
      const newVariations = prevState.variations.filter((_, i) => i !== index);
      if (prevState.activeVariationIndex >= newVariations.length) {
        return {
          ...prevState,
          variations: newVariations,
          showVariationPopup: false, // Close the popup
          activeVariationIndex: null, // Reset the active index
        };
      }

      // Default case, remove the variation without affecting the popup
      return {
        ...prevState,
        variations: newVariations,
      };
    });
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
              <button
                onClick={onSubmit}
                className="Add-button"
                title="Add Product"
              >
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
                <p className="variation-cards" style={{ position: "relative" }}>
                  <spn className="Cuttoooo">
                    <Swiper
                      spaceBetween={10} // Adjust the space between slides
                      slidesPerView={3} // Set how many variations show per view (adjust as needed)
                      freeMode={true}
                      modules={[FreeMode]}
                    >
                      {state.variations.map((variation, index) => (
                        <SwiperSlide key={index}>
                          <p
                            key={index}
                            className="variation-card"
                            style={{
                              backgroundImage:
                                variation.image && variation.image.length > 0
                                  ? `url(${variation.image[0]})` // Use the first image as background
                                  : "none", // No background if no image is available
                              backgroundSize: "cover",
                              backgroundPosition: "top", // Set background position to top
                            }}
                          >
                            <p
                              className="absolute variation-index"
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: "#333",
                                color: "white",
                                fontSize: "15px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              {" "}
                              {index + 1}
                            </p>

                            {!(
                              variation.image && variation.image.length > 0
                            ) && (
                              <PiUserCirclePlusFill
                                className="variation-icon"
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  width: "200px",
                                  height: "200px",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                }}
                              />
                            )}

                            <p className="variation-card-text">
                              <butto
                                className="Edit-Variation"
                                onClick={() => handleVariationClick(index)}
                              >
                                Click for edit
                                <CiEdit />
                              </butto>
                              <button onClick={() => removeVariation(index)}>
                                Remove
                              </button>
                            </p>
                          </p>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </spn>
                </p>
                <Popup
                  open={state.showVariationPopup}
                  onClose={closePopup}
                  closeOnDocumentClick
                  modal
                  lockScroll
                >
                  <div className="variation-popup">
                    <button title="Close Variation Items" onClick={closePopup}>
                      <MdClose />
                    </button>{" "}
                    <div className="popup-content">
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
                        {errors.variations?.[state.activeVariationIndex]?.price
                          ?.discount && (
                          <span>
                            {
                              errors.variations[state.activeVariationIndex]
                                .price.discount.message
                            }
                          </span>
                        )}
                        <label>Dimensions (L x W x H)</label>
                        <div className="Variation-Deimensisons">
                          <input
                            type="text"
                            placeholder="Length"
                            onChange={(e) =>
                              handleNumberChange(e, "dimensions.length")
                            }
                          />
                          {errors.variations?.[state.activeVariationIndex]
                            ?.dimensions?.length && (
                            <span>
                              {
                                errors.variations[state.activeVariationIndex]
                                  .dimensions.length.message
                              }
                            </span>
                          )}
                          <input
                            type="text"
                            placeholder="Width"
                            onChange={(e) =>
                              handleNumberChange(e, "dimensions.width")
                            }
                          />
                          <input
                            type="text"
                            placeholder="Height"
                            onChange={(e) =>
                              handleNumberChange(e, "dimensions.height")
                            }
                          />
                          {errors.variations?.dimensions && (
                            <span>{errors.variations.dimensions.message}</span>
                          )}
                        </div>
                        <label>Weight</label>
                        <input
                          type="text"
                          placeholder="Weight (kg)"
                          onChange={(e) => handleNumberChange(e, "weight")}
                        />
                        {errors.variations?.weight && (
                          <span>{errors.variations.weight.message}</span>
                        )}

                        <label>Stock</label>
                        <input
                          type="number"
                          {...register(
                            `variations.${state.activeVariationIndex}.stock`
                          )}
                          onChange={(e) =>
                            handleNumberChangeStock(
                              e,
                              state.activeVariationIndex,
                              "stock"
                            )
                          }
                          onBlur={(e) =>
                            handleNumberChangeStock(
                              e,
                              state.activeVariationIndex,
                              "stock"
                            )
                          } // Add onBlur
                          placeholder="Stock"
                        />
                        {errors.variations?.[state.activeVariationIndex]
                          ?.stock && (
                          <span>
                            {
                              errors.variations[state.activeVariationIndex]
                                .stock.message
                            }
                          </span>
                        )}

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
                      </form>
                    </div>
                  </div>
                </Popup>
                {errors.variations && <span>{errors.variations.message}</span>}
                <div className="Product-Checkboxes">
                  <div>
                    <label>Is New?</label>
                    <input
                      type="checkbox"
                      {...register("new")}
                      defaultChecked
                    />
                  </div>
                  <div>
                    <label>Show in Carousel?</label>
                    <input type="checkbox" {...register("carousel")} />
                  </div>
                  <div>
                    <label>Featured</label>
                    <input type="checkbox" {...register("featured")} />
                  </div>
                  <div>
                    <label>Active</label>
                    <input
                      type="checkbox"
                      {...register("active")}
                      defaultChecked
                    />
                  </div>
                  <div>
                    <label>On Sale?</label>
                    <input type="checkbox" {...register("sale")} />
                  </div>
                </div>
                <div className="Product-Categories">
                  <label>Category:</label>
                  <Controller
                    name="category"
                    className="Controller"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => {
                      const categoryOptions = state.categories.map((cat) => ({
                        value: cat._id,
                        label: cat.MainCategoryName,
                      }));

                      return (
                        <Select
                          onChange={(option) => {
                            console.log("Selected Category:", option);
                            onChange(option ? option.value : "");
                            const selectedCategoryId = option
                              ? option.value
                              : null;

                            setState((prevState) => ({
                              ...prevState,
                              selectedCategory: selectedCategoryId,
                              subcategories: [],
                            }));
                          }}
                          onBlur={onBlur}
                          value={getOptionFromValue(value, categoryOptions)}
                          options={categoryOptions}
                          placeholder="Select Category"
                          ref={ref}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: "#f0f0f0",
                              borderColor: "#333",
                              boxShadow: "none",
                              display: "flex",
                              fontSize: "15px",
                              alignItems: "center", // Vertically center the content
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected
                                ? "#4caf50"
                                : "white",
                              color: state.isSelected ? "white" : "#333",
                              padding: 5,
                              fontSize: "15px",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }),
                          }}
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
                      const subcategoryOptions = Array.isArray(
                        state.subcategories
                      )
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
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: "#f0f0f0",
                              borderColor: "#333",
                              boxShadow: "none",
                              display: "flex",
                              fontSize: "15px",
                              alignItems: "center", // Vertically center the content
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected
                                ? "#4caf50"
                                : "white",
                              color: state.isSelected ? "white" : "#333",
                              padding: 5,
                              fontSize: "15px",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }),
                          }}
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
                          value={getOptionFromValue(
                            value,
                            childsubcategoryOptions
                          )}
                          options={childsubcategoryOptions}
                          placeholder="Select Child Subcategory"
                          ref={ref}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              backgroundColor: "#f0f0f0",
                              borderColor: "#333",
                              boxShadow: "none",
                              fontSize: "15px",
                              display: "flex",
                              alignItems: "center", // Vertically center the content
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isSelected
                                ? "#4caf50"
                                : "white",
                              color: state.isSelected ? "white" : "#333",
                              padding: 5,
                              fontSize: "15px",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }),
                          }}
                          isDisabled={!state.selectedSubcategory} // Disable if no subcategory selected
                        />
                      );
                    }}
                  />
                  {errors.childsubcategory && (
                    <p>{errors.childsubcategory.message}</p>
                  )}
                </div>
                <div>
                  <label>Brand</label>
                  <input type="text" {...register("brand")} />
                </div>
                <div>
                  <label>Tags</label>
                  <ReactTags
                    tags={state.tags} // First set of tags
                    handleDelete={handleDeleteTags} // Delete handler for first set
                    handleAddition={handleAdditionTags} // Add handler for first set
                    delimiters={delimiters} // Comma and Enter for adding tags
                    placeholder="Add new tag"
                    inputFieldPosition="inline" // Input inline with tags
                    autocomplete // Enable suggestions
                  />
                  {errors.tags && <span>{errors.tags.message}</span>}
                </div>
                <div>
                  <label>Care Instructions</label>
                  <textarea
                    rows={7}
                    placeholder="Enter CareInstructions About Product....."
                    {...register("careInstructions")}
                  ></textarea>
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
                  <label>Meta Title</label>
                  <input type="text" {...register("meta.title")} />
                </div>
                <div>
                  <label>Meta Description</label>
                  <textarea
                    rows={7}
                    placeholder="Enter Meta Discription......"
                    {...register("meta.description")}
                  ></textarea>
                </div>
                <div>
                  <label>Meta Keywords (comma-separated)</label>
                  <ReactTags
                    tags={state.metaKeywords} // Second set for meta keywords
                    handleDelete={handleDeleteMetaKeywords} // Delete handler for second set
                    handleAddition={handleAdditionMetaKeywords} // Add handler for second set
                    delimiters={delimiters} // Comma and Enter for adding keywords
                    placeholder="Add new meta keyword"
                    inputFieldPosition="inline" // Input inline with keywords
                    autocomplete // Enable suggestions
                  />
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
                  <label>Publish Status</label>
                  <select {...register("publishStatus")}>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
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
                    <LuPlus
                      title="Add Mian Image"
                      className="Product-detils-area-main-Plus"
                    />
                  )}
                </div>
                {errors.MainImage && <span>{errors.MainImage.message}</span>}
              </div>
              <div className="variation-Images">
                <label htmlFor="">Variation Images</label>
                {state.variations.map((variation, index) => (
                  <div key={index} className="Variation-image-section">
                    {variation.image && variation.image.length > 0 ? (
                      <Swiper
                        slidesPerView={4}
                        spaceBetween={3}
                        freeMode={true}
                        modules={[FreeMode]}
                        className="mySwiper"
                      >
                        {variation.image.map((image, imgIndex) => (
                          <SwiperSlide key={imgIndex}>
                            <div className="image-wrapper">
                              <img
                                src={image}
                                alt={`Variation ${index} Image ${imgIndex + 1}`}
                                className="variation-image"
                                {...register(
                                  `variations.${index}.image.${imgIndex}`,
                                  {
                                    required: "Image is required",
                                  }
                                )}
                              />
                              <div className="remove-image-icon">
                                <MdClose
                                  onClick={() =>
                                    handleVariationImagesUnselect(image)
                                  }
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                        <SwiperSlide>
                          <div
                            className="add-variation-image"
                            onClick={() => handleGalleryVariation(index)}
                          >
                            <LuPlus className="variation-Images-main-Plus" />
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    ) : (
                      <p
                        className="add-variation-image"
                        onClick={() => handleGalleryVariation(index)}
                      >
                        <LuPlus className="variation-Images-main-Plus" />
                      </p>
                    )}
                  </div>
                ))}
                {errors.variations?.[state.activeVariationIndex]?.image && (
                  <span>
                    {
                      errors.variations[state.activeVariationIndex].image
                        .message
                    }
                  </span>
                )}
              </div>
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
          isVariation={false}
        />
      )}
      {state.galleryVariaton && (
        <GallerySelect
          handleGalleryfalse={() =>
            setState((prevState) => ({
              ...prevState,
              galleryVariaton: false,
            }))
          }
          onVariationSelectImage={handleVariationImages}
          isVariation={true}
          activeVariationIndex={state.activeVariationIndex}
        />
      )}
    </form>
  );
};

export default ProductForm;
{
  /*
   */
}
