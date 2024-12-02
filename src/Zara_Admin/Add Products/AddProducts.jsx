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
import { FreeMode } from "swiper/modules";
import { WithContext as ReactTags } from "react-tag-input";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import colorNames from "color-name";
import Swal from "sweetalert2";
import Spinner from "../../Spinner";
const productSchema = z.object({
  Name: z.string().min(1, "Product name is required"),
  MainImage: z
    .string()
    .url("Main image must be a valid URL")
    .nonempty("Main image is required"),
  Description: z.string().min(1, "Description is required"),
  variations: z
    .array(
      z.object({
        image: z
          .array(z.string().url("Each image URL must be valid"))
          .nonempty("At least one image URL is required"), // Ensuring array is not empty

        color: z.object({
          name: z.string().min(1, "Color name is required"),
          code: z.string().optional(), // Color code is optional
        }),
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
        material: z
          .object({
            material: z.string().optional(),
            percentage: z
              .number()
              .min(1, "Percentage must be at least 1")
              .max(100, "Percentage cannot exceed 100")
              .optional(),
          })
          .optional(), // Add optional here

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
        color: { name: "", code: "" },
        size: "",
        price: { real: "", discount: "" },
        material: undefined,
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
    loading: false,
  });
  const delimiters = [188, 13]; // 188 = comma, 13 = enter key
  useEffect(() => {
    // Scroll position ko top pe set karta hai jab component render ho
    window.scrollTo(0, 0);
  }, []);

  const hexToColorName = (hex) => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    let closestColorName = "Unknown Color"; // Initial value
    let minDistance = Infinity;

    for (const [name, rgbValues] of Object.entries(colorNames)) {
      const distance = Math.sqrt(
        Math.pow(rgbValues[0] - r, 2) +
          Math.pow(rgbValues[1] - g, 2) +
          Math.pow(rgbValues[2] - b, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestColorName = name; // Set the name
      }
    }

    console.log("Generated Color Name:", closestColorName); // Check color name
    return closestColorName;
  };

  const handleColorChange = (event) => {
    const selectedHex = event.target.value; // Get the selected hex color
    const colorName = hexToColorName(selectedHex); // Get the color name based on hex

    // Directly update the variations array with color code and name
    setState((prevState) => {
      const updatedVariations = [...prevState.variations];
      updatedVariations[prevState.activeVariationIndex] = {
        ...updatedVariations[prevState.activeVariationIndex],
        color: { name: colorName, code: selectedHex }, // Update both color name and code
      };

      return {
        ...prevState,
        variations: updatedVariations,
      };
    });

    // Manually set the value for color name in the registered field to ensure validation
    setValue(`variations.${state.activeVariationIndex}.color.name`, colorName);
  };

  const handleDeleteTags = (i) => {
    setState((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((tag, index) => index !== i),
    }));
  };

  const handleAdditionTags = (tag) => {
    setState((prevState) => {
      const updatedTags = [...prevState.tags, tag];

      // Extract only the `text` values from the tags array
      const tagTexts = updatedTags.map((t) => t.text);

      // Update form with the extracted tag text array
      setValue("tags", tagTexts);

      return {
        ...prevState,
        tags: updatedTags,
      };
    });
  };

  // ReactTag specific handlers for `metaKeywords`
  const handleDeleteMetaKeywords = (i) => {
    setState((prevState) => ({
      ...prevState,
      metaKeywords: prevState.metaKeywords.filter((tag, index) => index !== i),
    }));
  };

  const handleAdditionMetaKeywords = (tag) => {
    setState((prevState) => {
      const updatedmeta = [...prevState.metaKeywords, tag];

      // Extract only the `text` values from the tags array
      const tagTexts = updatedmeta.map((t) => t.text);

      // Update form with the extracted tag text array
      setValue("meta.keywords", tagTexts);

      return {
        ...prevState,
        metaKeywords: updatedmeta,
      };
    });
  };

  const handleNumberChangeStock = (e, index, field) => {
    const value = e.target.value;
    const numberValue = value ? parseFloat(value) : 0; // Convert string to number or set to 0
    setValue(`variations.${index}.${field}`, numberValue); // Update state
  };
  const handleNumberChange = (e, index, field) => {
    const value = e.target.value;
    const numberValue = value ? parseFloat(value) : undefined; // Convert to number or set to undefined
    setValue(`variations.${index}.${field}`, numberValue); // Update field value
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

  // Helper function to reset the state
  const resetState = () => {
    setState((prevState) => ({
      ...prevState,
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
          color: { name: "", code: "" },
          size: "",
          price: { real: "", discount: "" },
          material: undefined,
          dimensions: { length: 0, width: 0, height: 0 },
          weight: 0,
          stock: 0,
          status: "In Stock",
        },
      ],
      showVariationPopup: false,
      activeVariationIndex: 0,
      defaultImage: null,
      tags: [],
      metaKeywords: [],
      loading: false,
    }));
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();

    // Loading state set karein
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const updatedData = {
        Name: data.Name,
        MainImage: data.MainImage,
        Description: data.Description,
        variations: data.variations,
        new: data.new,
        carousel: data.carousel,
        category: data.category,
        subcategory: data.subcategory,
        childsubcategory: data.childsubcategory,
        brand: data.brand,
        tags: data.tags,
        careInstructions: data.careInstructions,
        availability: data.availability,
        featured: data.featured,
        active: data.active,
        sale: data.sale,
        meta: data.meta,
        publishStatus: data.publishStatus,
      };

      console.log("Final Data to be Sent:", updatedData);

      // API call with await to ensure it completes before moving forward
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
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response.data.message || "Product created successfully!",
        confirmButtonText: "OK",
      });

      // Call resetState function to clear all states on success
      resetState();
      reset();
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.error || "Something went wrong!",
        confirmButtonText: "OK",
      });
    } finally {
      // Loading reset after response is received
      setState((prevState) => ({
        ...prevState,
        loading: false,
      }));
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

  const handleVariationImages = (imageURLs) => {
    const currentVariationIndex = state.activeVariationIndex;

    setState((prevState) => {
      const updatedVariations = prevState.variations.map((variation, index) => {
        if (index === currentVariationIndex) {
          // Initialize image array if it doesn't exist
          const newImagesArray = variation.image ? [...variation.image] : [];

          // Loop through each imageURL in the array
          imageURLs.forEach((imageURL) => {
            if (!newImagesArray.includes(imageURL)) {
              newImagesArray.push(imageURL); // Add new image
            } else {
              console.log(
                `${imageURL} is already selected. Skipping this image.`
              );
            }
          });

          // Update the state
          setValue(`variations.${currentVariationIndex}.image`, newImagesArray); // Update form value

          return {
            ...variation,
            image: newImagesArray, // Update the images array
          };
        }
        return variation;
      });

      console.log(
        "Updated Images Array:",
        updatedVariations[currentVariationIndex].image
      );
      return {
        ...prevState,
        variations: updatedVariations,
      };
    });
  };

  const handleVariationImagesUnselect = (imageURL) => {
    setState((prevState) => {
      // Loop through all variations to find and remove the image
      const updatedVariations = prevState.variations.map((variation) => {
        // Check if the current variation contains the image
        if (variation.image.includes(imageURL)) {
          return {
            ...variation,
            image: variation.image.filter((img) => img !== imageURL), // Remove the image from this variation
          };
        }
        return variation; // If image not found, return variation as is
      });

      return {
        ...prevState,
        variations: updatedVariations, // Update variations in state
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
      // activeVariationIndex ko yahan par na change karein
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
          color: { name: "", code: "" },
          size: "",
          price: { real: "", discount: "" },
          material: { material: "", percentage: 0 },
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
      // Agar sirf 1 variation reh jaye, to delete na karein
      if (prevState.variations.length === 1) {
        return prevState; // Kuch bhi nahi badlega, delete nahi karega
      }

      // Agar active variation ko delete karna ho, to popup band kardo
      if (prevState.activeVariationIndex === index) {
        return {
          ...prevState,
          variations: prevState.variations.filter((_, i) => i !== index),
          showVariationPopup: false, // Popup close
          activeVariationIndex: null, // Active index reset
        };
      }

      // Agar koi aur variation delete ho aur active wala out of bounds ho jaye
      const newVariations = prevState.variations.filter((_, i) => i !== index);
      if (prevState.activeVariationIndex >= newVariations.length) {
        return {
          ...prevState,
          variations: newVariations,
          showVariationPopup: false, // Popup close
          activeVariationIndex: null, // Active index reset
        };
      }

      // Default case, variation ko delete karo bina popup ke effect ke
      return {
        ...prevState,
        variations: newVariations,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="Product">
        {state.loading && (
          <div className="spinner-container-for-product">
            <Spinner />
          </div>
        )}
        <div className="Product-mainarea">
          <div className="Product-Title">
            <div className="Product-Title-first">
              <IoStorefrontSharp />
              <p>Add New Product</p>
            </div>
            <div className="Product-Title-second">
              <button
                onClick={(e) => onSubmit}
                className="Add-button"
                title="Add Product"
              >
                {state.loading ? "Loading..." : "Submit"}
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
                  overlayClassName="popup-overlay"
                >
                  <div className="variation-popup">
                    <button title="Close Variation Items" onClick={closePopup}>
                      <MdClose />
                    </button>{" "}
                    <div className="popup-content-data">
                      <div className="popup-content-area">
                        <div>
                          <label>Color</label>
                          <input
                            type="color"
                            style={{ paddingRight: "0px" }}
                            {...register(
                              `variations.${state.activeVariationIndex}.color.code`, // Registering color code
                              {
                                required: "Color code is required", // Required message for color code
                              }
                            )}
                            onChange={handleColorChange} // Call handleColorChange to set both name and code
                            value={
                              state.variations[state.activeVariationIndex]
                                ?.color.code || ""
                            }
                          />
                          {errors.variations?.[state.activeVariationIndex]
                            ?.color?.code && (
                            <span>
                              {
                                errors.variations[state.activeVariationIndex]
                                  .color.code.message
                              }
                            </span>
                          )}
                        </div>
                        <div>
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
                        </div>
                      </div>

                      <div className="popup-content-area">
                        <div>
                          <label htmlFor="material">Length</label>
                          <input
                            type="text"
                            {...register(
                              `variations.${state.activeVariationIndex}.dimensions.length`,
                              {
                                valueAsNumber: true,
                                required: "Length is required",
                              }
                            )}
                            placeholder="Length"
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
                        </div>
                        <div>
                          <label htmlFor="percentage">Width</label>
                          <input
                            type="text"
                            {...register(
                              `variations.${state.activeVariationIndex}.dimensions.width`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            placeholder="Width"
                          />
                        </div>
                        <div>
                          <label>Height</label>
                          <input
                            type="text"
                            {...register(
                              `variations.${state.activeVariationIndex}.dimensions.height`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            placeholder="Height"
                          />
                        </div>
                      </div>

                      <div className="Variation-Price">
                        <div>
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
                          {errors.variations?.[state.activeVariationIndex]
                            ?.price?.real && (
                            <span>
                              {
                                errors.variations[state.activeVariationIndex]
                                  .price.real.message
                              }
                            </span>
                          )}
                        </div>
                        <div>
                          <label>Discount Price (optional)</label>
                          <input
                            type="text"
                            {...register(
                              `variations.${state.activeVariationIndex}.price.discount`
                            )}
                            placeholder="Discount Price"
                          />
                          {errors.variations?.[state.activeVariationIndex]
                            ?.price?.discount && (
                            <span>
                              {
                                errors.variations[state.activeVariationIndex]
                                  .price.discount.message
                              }
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="popup-content-area">
                        <div>
                          <label htmlFor="material">Material</label>
                          <input
                            type="text"
                            id="material"
                            placeholder="Material (e.g., Cotton)"
                            {...register(
                              `variations.${state.activeVariationIndex}.material.material`,
                              {
                                required: "Material is required",
                              }
                            )}
                          />
                          {errors.variations?.[state.activeVariationIndex]
                            ?.material?.material && (
                            <span>
                              {
                                errors.variations[state.activeVariationIndex]
                                  .material.material.message
                              }
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="percentage">Percentage</label>
                          <input
                            type="number"
                            placeholder="Percentage (e.g., 100)"
                            {...register(
                              `variations.${state.activeVariationIndex}.material.percentage`,
                              {
                                required: "Percentage is required",
                                min: {
                                  value: 1,
                                  message: "Percentage must be at least 1",
                                },
                                max: {
                                  value: 100,
                                  message: "Percentage cannot exceed 100",
                                },
                              }
                            )}
                            onChange={(e) =>
                              handleNumberChange(
                                e,
                                state.activeVariationIndex,
                                "material.percentage"
                              )
                            }
                            onBlur={(e) =>
                              handleNumberChange(
                                e,
                                state.activeVariationIndex,
                                "material.percentage"
                              )
                            } // Optional: update on blur
                          />

                          {errors.variations?.[state.activeVariationIndex]
                            ?.material?.percentage && (
                            <span>
                              {
                                errors.variations[state.activeVariationIndex]
                                  .material.percentage.message
                              }
                            </span>
                          )}
                        </div>
                        <div>
                          <label>Weight</label>
                          <input
                            type="text"
                            {...register(
                              `variations.${state.activeVariationIndex}.weight`,
                              {
                                valueAsNumber: true,
                              }
                            )}
                            placeholder="Weight (kg)"
                          />
                          {errors.variations?.[state.activeVariationIndex]
                            ?.weight && (
                            <span>
                              {
                                errors.variations[state.activeVariationIndex]
                                  .weight.message
                              }
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="popup-content-area">
                        <div>
                          <label>Size</label>
                          <select
                            defaultValue=""
                            {...register(
                              `variations.${state.activeVariationIndex}.size`,
                              {
                                required: "Size is required",
                              }
                            )}
                          >
                            <option value="" disabled hidden>
                              Select size
                            </option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                          </select>
                          {errors.variations?.[state.activeVariationIndex]
                            ?.size && (
                            <span>
                              {
                                errors.variations[state.activeVariationIndex]
                                  .size.message
                              }
                            </span>
                          )}
                        </div>

                        <div>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </Popup>
                {errors.variations && <span>{errors.variations.message}</span>}
              </div>
              <div className="Product-Checkboxes">
                <div>
                  <label>Is New?</label>
                  <input type="checkbox" {...register("new")} defaultChecked />
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
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    const categoryOptions = state.categories.map((cat) => ({
                      value: cat._id,
                      label: cat.MainCategoryName,
                    }));

                    return (
                      <Select
                        onChange={(option) => {
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
                        className="Controller"
                        value={getOptionFromValue(value, categoryOptions)}
                        options={categoryOptions}
                        placeholder="Select Category"
                        ref={ref}
                        styles={{
                          control: (provided) => ({
                            ...provided,
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
                {errors.category && <span>{errors.category.message}</span>}
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
                          onChange(option ? option.value : "");
                          setState((prevState) => ({
                            ...prevState,
                            selectedSubcategory: option ? option.value : null, // Update state
                          }));
                        }}
                        onBlur={onBlur}
                        className="Controller"
                        value={getOptionFromValue(value, subcategoryOptions)}
                        options={subcategoryOptions}
                        placeholder="Select Subcategory"
                        ref={ref}
                        styles={{
                          control: (provided) => ({
                            ...provided,
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
                {errors.subcategory && (
                  <span>{errors.subcategory.message}</span>
                )}
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
                          onChange(option ? option.value : "");
                          setState((prevState) => ({
                            ...prevState,
                            selectedChildSubcategory: option
                              ? option.value
                              : null, // Update state
                          }));
                        }}
                        onBlur={onBlur}
                        className="Controller"
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
                  <span>{errors.childsubcategory.message}</span>
                )}
              </div>
              <div>
                <label>Brand</label>
                <input
                  placeholder="Enter Your Company Brand......."
                  type="text"
                  {...register("brand")}
                />
              </div>
              <div>
                <label>Tags</label>
                <ReactTags
                  tags={state.tags}
                  handleDelete={handleDeleteTags}
                  handleAddition={handleAdditionTags}
                  delimiters={delimiters}
                  placeholder="Add new tag"
                  inputFieldPosition="inline"
                  autocomplete
                  autofocus={false}
                  {...register("tags")} // Ensure proper registration
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
              <div>
                <label>Meta Title</label>
                <input
                  className="Enter "
                  type="text"
                  placeholder="Meta Title......."
                  {...register("meta.title")}
                />
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
                <label>Meta Keywords</label>
                <ReactTags
                  tags={state.metaKeywords}
                  handleDelete={handleDeleteMetaKeywords}
                  handleAddition={handleAdditionMetaKeywords}
                  delimiters={delimiters}
                  placeholder="Add new meta keyword"
                  inputFieldPosition="inline"
                  autocomplete
                  autofocus={false}
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
                <div className="variation-Images-main-area">
                  {state.variations.map((variation, index) => (
                    <div key={index} className="Variation-image-section">
                      {variation.image && variation.image.length > 0 ? (
                        <Swiper
                          slidesPerView={4}
                          spaceBetween={3}
                          freeMode={true}
                          modules={[FreeMode]}
                          className="mySwiper p-1"
                        >
                          {variation.image.map((image, imgIndex) => (
                            <SwiperSlide key={imgIndex}>
                              <div className="image-wrapper">
                                <img
                                  src={image}
                                  alt={`Variation ${index} Image ${
                                    imgIndex + 1
                                  }`}
                                  className="variation-image"
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
                </div>
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
          allSelectedImages={state.variations[state.activeVariationIndex].image}
        />
      )}
    </form>
  );
};

export default ProductForm;
