import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./css.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";
import { userContext } from "../../../Context/UserContext";

// Validation Schema
const category_Schema = z.object({
  MainCategoryName: z.string().min(4, "Category name is required."),
});
const Sub_category_Schema = z.object({
  MainCategory_id: z.string().min(1, "Category id is required"),
  SubMainCategory: z.string().min(1, "Sub-Category id is required"),
});
const Child_category_Schema = z.object({
  SubMainCategory_id: z.string().min(1, "Sub-Category id is required"),
  ChildSubCategory: z.string().min(1, "Child-Category id is required"),
});

const Add = ({ closePopup, type }) => {
  const { token } = useContext(userContext);
  const [state, setState] = useState({
    Loading: false,
    data: [],
    selectedMainCategoryId: "",
    selectedSubCategoryId: "",
    schema: category_Schema, // Default schema
  });

  useEffect(() => {
    if (type === "subcategory") {
      setState((prevState) => ({
        ...prevState,
        schema: Sub_category_Schema,
      }));
    } else if (type === "childcategory") {
      setState((prevState) => ({
        ...prevState,
        schema: Child_category_Schema,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        schema: category_Schema,
      }));
    }
  }, [type]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(state.schema), // Use schema from state
  });

  // Data Fetching Function
  const data_fetch = async () => {
    try {
      setState((prevState) => ({ ...prevState, Loading: true }));

      let response;
      if (type === "subcategory") {
        response = await axios.get(
          "http://localhost:1122/MainCategory/getAll",
          {
            withCredentials: true,
            headers: { authenticate: `Bearer ${token}` },
          }
        );
      } else if (type === "childcategory") {
        response = await axios.get(
          `http://localhost:1122/SubMainCategory/getAll`,
          {
            withCredentials: true,
            headers: { authenticate: `Bearer ${token}` },
          }
        );
      }

      console.log("data View", response);

      // Dynamically handle data structure based on API response
      const responseData =
        type === "subcategory" ? response?.data : response?.data?.data; // Adjusted for childcategory

      setState((prevState) => ({
        ...prevState,
        Loading: false,
        data: Array.isArray(responseData) ? responseData : [],
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setState((prevState) => ({ ...prevState, Loading: false }));
    }
  };

  useEffect(() => {
    data_fetch(); // Call data_fetch when the component mounts
  }, []);

  // Submit Handler
  const onSubmit = async (data) => {
    setState((prevState) => ({
      ...prevState,
      Loading: true,
    }));
    try {
      let response;
      switch (type) {
        case "category":
          response = await axios.post(
            "http://localhost:1122/MainCategory/Create",
            data,
            {
              withCredentials: true,
              headers: { Authenticate: `Bearer ${token}` },
            }
          );
          break;

        case "subcategory":
          response = await axios.post(
            "http://localhost:1122/SubMainCategory/Create",
            { SubMainCategory: data.MainCategoryName }, // Adjust payload for subcategory
            {
              withCredentials: true,
              headers: { Authenticate: `Bearer ${token}` },
            }
          );
          break;

        case "childcategory":
          response = await axios.post(
            "http://localhost:1122/ChildSubCategory/Create",
            { ChildSubCategory: data.MainCategoryName }, // Adjust payload for child category

            {
              withCredentials: true,
              headers: { Authenticate: `Bearer ${token}` },
            }
          );
          break;
        default:
          throw new Error("Invalid type");
      }
      Swal.fire({
        icon: "success",
        title: `${
          type === "category"
            ? "Category"
            : type === "subcategory"
            ? "Sub Category"
            : "Child Category"
        } Added Successfully!`,
        text: `Name: ${data.MainCategoryName}`,
      });

      reset(); // Clear form
      closePopup(); // Close popup
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setState((prevState) => ({
        ...prevState,
        Loading: false,
      }));
    }
  };
  // Get Content for Popup
  console.log("Full State Data:", state.data);
  console.log("Nested Data:", state.data?.data);

  const getPopupContent = () => {
    const title =
      type === "category"
        ? "Add Main Category"
        : type === "subcategory"
        ? "Add Sub Category"
        : "Add Child Category";

    return (
      <div className="category-area">
        <div className="category-topbar">{title}</div>
        <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="category-body">
            <div>
              <label>
                {type === "category"
                  ? "Category Name"
                  : type === "subcategory"
                  ? "Sub Category Name"
                  : "Child Category Name"}
              </label>
              <Controller
                name="MainCategoryName"
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder="Enter Name" />
                )}
              />
              {errors.MainCategoryName && (
                <p className="error">{errors.MainCategoryName.message}</p>
              )}
            </div>
            {(type === "subcategory" || type === "childcategory") && (
              <div>
                <label>
                  {type === "subcategory"
                    ? "Select Main Category"
                    : "Select Sub Category"}
                </label>
                <select
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      [type === "subcategory"
                        ? "selectedMainCategoryId"
                        : "selectedSubCategoryId"]: e.target.value,
                    }));
                  }}
                  value={
                    type === "subcategory"
                      ? state.selectedMainCategoryId
                      : state.selectedSubCategoryId
                  }
                >
                  <option value="" disabled>
                    {type === "subcategory"
                      ? "Select Main Category"
                      : "Select Sub Category"}
                  </option>

                  {state.data?.length > 0 ? (
                    state.data.map((item) => {
                      console.log(
                        "Fetched Data:",
                        type === "subcategory" ? state.data : state.data?.data
                      );

                      const displayName =
                        type === "subcategory"
                          ? item.MainCategoryName
                          : item.SubMainCategory || "Unnamed Subcategory";

                      return (
                        <option key={item._id} value={item._id}>
                          {displayName}
                        </option>
                      );
                    })
                  ) : (
                    <option disabled>No Data Available</option>
                  )}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="Add-now-button"
              disabled={state.Loading} // Disable button while loading
            >
              {state.Loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="add">
      <Popup
        open={!!type} // Show popup if type is truthy
        onClose={closePopup}
        modal
        lockScroll
        overlayClassName="popup-overlay"
        contentStyle={{
          backgroundColor: "var(--bg-color)",
          color: "var(--text-color)",
          width: "400px",
          minWidth: "auto",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          height: "450px",
          borderRadius: "0px",
          overflowY: "auto",
          padding: "0px",
        }}
      >
        {state.Loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          getPopupContent()
        )}
      </Popup>
    </div>
  );
};

export default Add;
