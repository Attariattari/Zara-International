import React, { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddProductForm.css";
import { userContext } from "../../Context/UserContext";
import axios from "axios";
import Select from "react-select";

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
  const [variations, setVariations] = useState([
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
  ]);

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
    selectedCategory: null,
    selectedSubcategory: null, // Initialize as null or empty
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
        ); // Your API call here
        // Ensure the response is an array
        setState((prevState) => ({
          ...prevState,
          categories: Array.isArray(response.data) ? response.data : [], // Ensure it's an array
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
          subcategories: response.data.data, // Ensure data access is correct
        }));
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setState((prevState) => ({
          ...prevState,
          subcategories: [], // Reset on error
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

  const getOptionFromValue = (value, options) => {
    return options.find((option) => option.value === value) || null;
  };

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      category: state.selectedCategory, // Ensure this is set
      subcategory: state.selectedSubcategory, // Ensure this is set
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

  // Handler for adding new variation
  const addVariation = () => {
    setVariations([
      ...variations,
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
    ]);
  };

  // Handler for removing a variation
  const removeVariation = (index) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Product</h2>

      <div>
        <label>Product Name</label>
        <input type="text" {...register("Name")} />
        {errors.Name && <span>{errors.Name.message}</span>}
      </div>

      <div>
        <label>Main Image URL</label>
        <input type="text" {...register("MainImage")} />
        {errors.MainImage && <span>{errors.MainImage.message}</span>}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register("Description")}></textarea>
        {errors.Description && <span>{errors.Description.message}</span>}
      </div>

      <h3>Variations</h3>
      {variations.map((_, index) => (
        <div key={index}>
          <label>Variation {index + 1} Image URLs (comma-separated)</label>
          <input
            type="text"
            placeholder="Image URLs (comma-separated)"
            onChange={(e) => handleImageChange(e, index)}
          />
          {errors.variations?.[index]?.image && (
            <span>{errors.variations[index].image.message}</span>
          )}

          <label>Color</label>
          <input
            type="text"
            {...register(`variations.${index}.color`)}
            placeholder="Color"
          />
          {errors.variations?.[index]?.color && (
            <span>{errors.variations[index].color.message}</span>
          )}

          <label>Size</label>
          <input
            type="text"
            {...register(`variations.${index}.size`)}
            placeholder="Size"
          />
          {errors.variations?.[index]?.size && (
            <span>{errors.variations[index].size.message}</span>
          )}

          <label>Real Price</label>
          <input
            type="text"
            {...register(`variations.${index}.price.real`)}
            placeholder="Real Price"
          />
          {errors.variations?.[index]?.price?.real && (
            <span>{errors.variations[index].price.real.message}</span>
          )}

          <label>Discount Price (optional)</label>
          <input
            type="text"
            {...register(`variations.${index}.price.discount`)}
            placeholder="Discount Price"
          />

          <label>Dimensions (L x W x H)</label>
          <input
            type="number"
            placeholder="Length"
            onChange={(e) => handleNumberChange(e, index, "dimensions.length")}
          />
          <input
            type="number"
            placeholder="Width"
            onChange={(e) => handleNumberChange(e, index, "dimensions.width")}
          />
          <input
            type="number"
            placeholder="Height"
            onChange={(e) => handleNumberChange(e, index, "dimensions.height")}
          />
          {errors.variations?.[index]?.dimensions && (
            <span>{errors.variations[index].dimensions.message}</span>
          )}

          <label>Weight</label>
          <input
            type="number"
            placeholder="Weight (kg)"
            onChange={(e) => handleNumberChange(e, index, "weight")}
          />
          {errors.variations?.[index]?.weight && (
            <span>{errors.variations[index].weight.message}</span>
          )}

          <label>Stock</label>
          <input
            type="number"
            placeholder="Stock"
            onChange={(e) => handleNumberChange(e, index, "stock")}
          />
          {errors.variations?.[index]?.stock && (
            <span>{errors.variations[index].stock.message}</span>
          )}

          <label>Status</label>
          <select {...register(`variations.${index}.status`)}>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Discontinued">Discontinued</option>
          </select>

          <button type="button" onClick={() => removeVariation(index)}>
            Remove Variation
          </button>
          <hr />
        </div>
      ))}

      <button type="button" onClick={addVariation}>
        Add Variation
      </button>

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

      {/* Subcategory Select */}
      <label>Subcategory:</label>
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

      <div>
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
          <option value="Limited Availability">Limited Availability</option>
          <option value="Pre-order">Pre-order</option>
          <option value="Discontinued">Discontinued</option>
        </select>
        {errors.availability && (
          <span className="error-message">{errors.availability.message}</span>
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
        {errors.meta?.keywords && <span>{errors.meta.keywords.message}</span>}
      </div>
      <div className="materials-container">
        <label htmlFor="material">Material</label>
        <input
          type="text"
          id="material"
          placeholder="Material (e.g., Cotton)"
          {...register("material", { required: "Material is required" })}
        />
        {errors.material && (
          <span className="error-message">{errors.material.message}</span>
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
          <span className="error-message">{errors.percentage.message}</span>
        )}
      </div>

      <div>
        <label>Publish Status</label>
        <select {...register("publishStatus")}>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
