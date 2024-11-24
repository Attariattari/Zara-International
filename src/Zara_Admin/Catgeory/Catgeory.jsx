import React, { useContext, useEffect, useState } from "react";
import { TbCategory2 } from "react-icons/tb";
import "./css.css";
import axios from "axios";
import { userContext } from "../../Context/UserContext";
import Add from "./Add/Add";
import Spinner from "../../Spinner";

function Category() {
  const [state, setState] = useState({
    category: [],
    sub_category: [],
    child_category: [],
    popupType: null,
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

  const closePopup = () => {
    setState((prevState) => ({
      ...prevState,
      popupType: null,
    }));
  };

  const fetchCategory = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: { ...prevState.loading, category: true },
    }));
    try {
      const response = await axios.get(
        `http://localhost:1122/MainCategory/getAll`,
        {
          headers: {
            Authenticate: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setState((prevState) => ({
        ...prevState,
        category: Array.isArray(response.data) ? response.data : [],
        loading: { ...prevState.loading, category: false },
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      setState((prevState) => ({
        ...prevState,
        loading: { ...prevState.loading, category: false },
      }));
    }
  };

  const fetchSubCategory = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: { ...prevState.loading, sub_category: true },
    }));
    try {
      const response = await axios.get(
        `http://localhost:1122/SubMainCategory/GetAll`,
        {
          headers: {
            Authenticate: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setState((prevState) => ({
        ...prevState,
        sub_category: response.data.data || [],
        loading: { ...prevState.loading, sub_category: false },
      }));
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setState((prevState) => ({
        ...prevState,
        loading: { ...prevState.loading, sub_category: false },
      }));
    }
  };

  const fetchChildCategory = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: { ...prevState.loading, child_category: true },
    }));
    try {
      const response = await axios.get(
        `http://localhost:1122/ChildSubCategory/GetAll`,
        {
          headers: {
            Authenticate: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setState((prevState) => ({
        ...prevState,
        child_category: response.data.data || [],
        loading: { ...prevState.loading, child_category: false },
      }));
    } catch (error) {
      console.error("Error fetching child categories:", error);
      setState((prevState) => ({
        ...prevState,
        loading: { ...prevState.loading, child_category: false },
      }));
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchSubCategory();
    fetchChildCategory();
  }, []);

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
              ) : (
                state.category.map((category, index) => (
                  <div key={category._id || index} className="Category-card">
                    <div className="data-area">{category.MainCategoryName}</div>
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
              ) : (
                state.sub_category.map((subcategory) => (
                  <div key={subcategory._id} className="SubCategory-card">
                    <div className="data-area">
                      {subcategory.SubMainCategory || "No Name"}
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
              ) : (
                state.child_category.map((childCategory) => (
                  <div key={childCategory._id} className="ChildCategory-card">
                    <div className="data-area">
                      {childCategory.ChildSubCategory || "No Name"}
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
        <Add type={state.popupType} closePopup={closePopup} />
      )}
    </div>
  );
}

export default Category;
