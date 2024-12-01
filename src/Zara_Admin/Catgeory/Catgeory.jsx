import React, { useContext, useEffect, useState } from "react";
import { TbCategory2 } from "react-icons/tb";
import "./css.css";
import axios from "axios";
import { userContext } from "../../Context/UserContext";
import Add from "./Add/Add";
import Spinner from "../../Spinner";
import { MdOutlineEditNote } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
import Swal from "sweetalert2";
import Update from "./Update/Update";
function Category() {
  const [state, setState] = useState({
    category: [],
    sub_category: [],
    child_category: [],
    popupType: null,
    Update_popupType: null,
    select_Category: null,
    loading: {
      category: false,
      sub_category: false,
      child_category: false,
    },
  });

  const { token } = useContext(userContext);

  const openPopup = (type) => {
    setState((prevState) => ({
      ...prevState,
      popupType: type,
    }));
  };

  // Generalized data fetching function
  const fetchData = async (url, key) => {
    setState((prevState) => ({
      ...prevState,
      loading: { ...prevState.loading, [key]: true },
    }));
    try {
      const response = await axios.get(url, {
        headers: {
          Authenticate: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setState((prevState) => ({
        ...prevState,
        [key]: response.data.data || response.data || [],
        loading: { ...prevState.loading, [key]: false },
      }));
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
      setState((prevState) => ({
        ...prevState,
        loading: { ...prevState.loading, [key]: false },
      }));
    }
  };

  useEffect(() => {
    fetchData(`http://localhost:1122/MainCategory/getAll`, "category");
    fetchData(`http://localhost:1122/SubMainCategory/GetAll`, "sub_category");
    fetchData(
      `http://localhost:1122/ChildSubCategory/GetAll`,
      "child_category"
    );
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  const closePopup = (shouldRefetch = false) => {
    setState((prevState) => ({ ...prevState, popupType: null }));
    if (shouldRefetch) {
      fetchData(`http://localhost:1122/MainCategory/getAll`, "category");
      fetchData(`http://localhost:1122/SubMainCategory/GetAll`, "sub_category");
      fetchData(
        `http://localhost:1122/ChildSubCategory/GetAll`,
        "child_category"
      );
    }
  };

  const handle_delete = async (id, type, name) => {
    let url;
    let loadingKey;

    // Determine URL and loading key based on type
    if (type === "category") {
      url = `http://localhost:1122/MainCategory/DeleteById/${id}`;
      loadingKey = "category";
    } else if (type === "subcategory") {
      url = `http://localhost:1122/SubMainCategory/${id}`;
      loadingKey = "sub_category";
    } else if (type === "childcategory") {
      url = `http://localhost:1122/ChildSubCategory/${id}`;
      loadingKey = "child_category";
    } else {
      Swal.fire("Error", "Invalid type specified!", "error");
      return;
    }

    // Show confirmation dialog with dynamic name
    const result = await Swal.fire({
      title: `Are you sure you want to delete "${name}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    // If user cancels, exit
    if (!result.isConfirmed) {
      Swal.fire("Cancelled", `"${name}" is safe!`, "info");
      return;
    }

    // Set loading state to true
    setState((prevState) => ({
      ...prevState,
      loading: { ...prevState.loading, [loadingKey]: true },
    }));

    try {
      // API call
      const response = await axios.delete(url, {
        headers: {
          Authenticate: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Display success message from backend response
      Swal.fire(
        "Success",
        response.data.msg || response.data.message,
        "success"
      );

      // Refetch data after delete
      fetchData(`http://localhost:1122/MainCategory/getAll`, "category");
      fetchData(`http://localhost:1122/SubMainCategory/GetAll`, "sub_category");
      fetchData(
        `http://localhost:1122/ChildSubCategory/GetAll`,
        "child_category"
      );
    } catch (error) {
      // Display error message from backend response
      Swal.fire(
        "Error",
        error.response?.data?.msg ||
          error.response?.data?.error ||
          "An error occurred",
        "error"
      );
    } finally {
      // Set loading state to false
      setState((prevState) => ({
        ...prevState,
        loading: { ...prevState.loading, [loadingKey]: false },
      }));
    }
  };

  const handle_update = (
    category = null,
    subcategory = null,
    childCategory = null,
    type_Update
  ) => {
    const updatedState = {
      Update_popupType: type_Update,
      select_Category: null, // Reset initially
    };

    // Set `select_Category` conditionally
    if (type_Update === "category" && category) {
      updatedState.select_Category = category;
    } else if (type_Update === "subcategory" && subcategory) {
      updatedState.select_Category = subcategory;
    } else if (type_Update === "childcategory" && childCategory) {
      updatedState.select_Category = childCategory;
    }

    // Update state
    setState((prevState) => ({
      ...prevState,
      ...updatedState,
    }));
  };

  const close_Update_Popup = (shouldRefetch = false) => {
    setState((prevState) => ({ ...prevState, Update_popupType: null }));
    if (shouldRefetch) {
      fetchData(`http://localhost:1122/MainCategory/getAll`, "category");
      fetchData(`http://localhost:1122/SubMainCategory/GetAll`, "sub_category");
      fetchData(
        `http://localhost:1122/ChildSubCategory/GetAll`,
        "child_category"
      );
    }
  };

  return (
    <div className="Category">
      <div className="Category-Area">
        {/* Top Bar */}
        <div className="top-bar">
          <div className="top-bar-first">
            <TbCategory2 className="icon" />
            <p>Category</p>
          </div>
          <div className="top-bar-second">
            <button onClick={() => openPopup("category")}>
              <span>Add Category</span>
            </button>
            <button onClick={() => openPopup("subcategory")}>
              <span>Add Sub Category</span>
            </button>
            <button onClick={() => openPopup("childcategory")}>
              <span>Add Child Category</span>
            </button>
          </div>
        </div>

        {/* Category Data */}
        <div className="Category-data">
          {/* Main Categories */}
          <div className="Category-data-area">
            <div className="Category-data-area-top-bar">Category</div>
            <div className="data">
              {state.loading.category ? (
                <p className="data-Spinner">
                  <Spinner />
                </p>
              ) : state.category.length === 0 ? ( // Check if no data
                <div className="no-data">
                  <p>No categories available.</p>
                  <button onClick={() => openPopup("category")}>
                    <span>Add Category</span>
                  </button>
                </div>
              ) : (
                state.category.map((category, index) => (
                  <div key={category._id || index} className="Category-card">
                    <div className="data-area">
                      <div>{category.MainCategoryName}</div>
                      <div className="edit-delete">
                        <MdOutlineEditNote
                          className="edit"
                          onClick={() =>
                            handle_update(category, null, null, "category")
                          }
                        />

                        <MdOutlineDeleteSweep
                          className="delete"
                          onClick={() =>
                            handle_delete(
                              category._id,
                              "category",
                              category.MainCategoryName
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sub Categories */}
          <div className="Category-data-area">
            <div className="Category-data-area-top-bar">Sub Categories</div>
            <div className="data">
              {state.loading.sub_category ? (
                <p className="data-Spinner">
                  <Spinner />
                </p>
              ) : state.sub_category.length === 0 ? ( // Check if no data
                <div className="no-data">
                  <p> No subcategories available.</p>
                  <button onClick={() => openPopup("subcategory")}>
                    <span>Add Sub Category</span>
                  </button>
                </div>
              ) : (
                state.sub_category.map((subcategory) => (
                  <div key={subcategory._id} className="SubCategory-card">
                    <div className="data-area">
                      <div>{subcategory.SubMainCategory || "No Name"}</div>
                      <div className="edit-delete">
                        <MdOutlineEditNote
                          className="edit"
                          onClick={() =>
                            handle_update(
                              null,
                              subcategory,
                              null,
                              "subcategory"
                            )
                          }
                        />

                        <MdOutlineDeleteSweep
                          className="delete"
                          onClick={() =>
                            handle_delete(
                              subcategory._id,
                              "subcategory",
                              subcategory.SubMainCategory || "No Name"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Child Categories */}
          <div className="Category-data-area">
            <div className="Category-data-area-top-bar">Child Categories</div>
            <div className="data">
              {state.loading.child_category ? (
                <p className="data-Spinner">
                  <Spinner />
                </p>
              ) : state.child_category.length === 0 ? ( // Check if no data
                <div className="no-data">
                  <p> No child categories available.</p>
                  <button onClick={() => openPopup("childcategory")}>
                    <span>Add Child Category</span>
                  </button>
                </div>
              ) : (
                state.child_category.map((childCategory) => (
                  <div key={childCategory._id} className="ChildCategory-card">
                    <div className="data-area">
                      <div>{childCategory.ChildSubCategory || "No Name"}</div>
                      <div className="edit-delete">
                        <MdOutlineEditNote
                          className="edit"
                          onClick={() =>
                            handle_update(
                              null,
                              null,
                              childCategory,
                              "childcategory"
                            )
                          }
                        />

                        <MdOutlineDeleteSweep
                          className="delete"
                          onClick={() =>
                            handle_delete(
                              childCategory._id,
                              "childcategory",
                              childCategory.ChildSubCategory || "No Name"
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Show Popup Based on State */}
      {state.popupType && (
        <Add
          type={state.popupType}
          closePopup={(shouldRefetch) => closePopup(shouldRefetch)}
          fetchData={fetchData}
        />
      )}
      {state.Update_popupType && (
        <Update
          type_Update={state.Update_popupType} // Required
          close_Update_Popup={(shouldRefetch) =>
            close_Update_Popup(shouldRefetch)
          }
          fetchData={fetchData}
          category_select={state.select_Category}
          {...state.select_Category}
        />
      )}
    </div>
  );
}

export default Category;
