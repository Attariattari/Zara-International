import React, { useContext, useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { Slider } from "@material-tailwind/react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { BiSlider } from "react-icons/bi";
import { TbSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import "./css.css";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import axios from "axios";
import { userContext } from "../../Context/UserContext";
import Spinner from "../../Spinner";

function Product() {
  const { token } = useContext(userContext);
  const [state, setState] = useState({
    data: [],
    hasFetched: false,
    loading: false,
    search: "",
    isTyping: false,
    hasSearched: false,
  });

  const inputRef = useRef(null);

  const typingTimer = useRef(null);

  const fetchAllProducts = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true, // Set loading to true before fetching data
    }));

    try {
      const response = await axios.get(`http://localhost:1122/Product/getAll`, {
        headers: {
          Authenticate: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setState((prevState) => ({
        ...prevState,
        data: Array.isArray(response.data) ? response.data : [],
        hasFetched: true,
        loading: false, // Set loading to false after fetching data
      }));

      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Products", error);
      setState((prevState) => ({
        ...prevState,
        loading: false, // Set loading to false in case of error
      }));
    }
  };

  const searchProducts = async (searchTerm) => {
    setState((prevState) => ({
      ...prevState,
      loading: true, // Set loading to true before fetching data
    }));

    try {
      const response = await axios.post(
        `http://localhost:1122/Product/search`,
        {
          Name: searchTerm,
        },
        {
          headers: {
            Authenticate: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setState((prevState) => ({
        ...prevState,
        data: Array.isArray(response.data) ? response.data : [],
        hasFetched: true,
        loading: false, // Set loading to false after fetching data
      }));

      console.log(response.data);
    } catch (error) {
      console.log("Error searching Products", error);
      setState((prevState) => ({
        ...prevState,
        loading: false, // Set loading to false in case of error
      }));
    }
  };

  useEffect(() => {
    fetchAllProducts(); // Fetch all products on initial render
  }, []); // Run only once when component mounts

  const handleInputChange = (e) => {
    const value = e.target.value;

    setState((prevState) => ({
      ...prevState,
      search: value,
      isTyping: true,
      hasSearched: false, // Reset hasSearched when typing
    }));

    // Clear the previous timer
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }

    // Start a new timer to check when the user stops typing
    typingTimer.current = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isTyping: false,
      }));

      // Trigger search if input length is at least 3 characters
      if (value.length >= 3) {
        searchProducts(value); // Call searchProducts with search term
      } else if (value.length === 0) {
        fetchAllProducts(); // Fetch all products if input is cleared
      }
    }, 1000); // 1 second delay
  };

  const handleClearSearch = () => {
    setState((prevState) => ({
      ...prevState,
      search: "",
      isTyping: false,
      hasSearched: false,
    }));

    // Set focus after updating the state
    inputRef.current.focus();

    // Fetch all products when search is cleared
    fetchAllProducts(); // Fetch all products again
  };
  return (
    <div className="Product">
      <div className="Product-Area">
        <div className="Product-Area-Top-Bar">
          <Link
            to="/Admin/Add-Products"
            className="Product-Area-Top-Bar-button"
          >
            <CiSquarePlus className="Plus-product" />
            Add Prodcut
          </Link>
          <div>
            <div className="Search-Product-input-container">
              <input
                className="Search-Product-input"
                placeholder="Search Product ...."
                type="text"
                value={state.search}
                onChange={handleInputChange}
                ref={inputRef}
              />

              {state.search && !state.isTyping && !state.hasSearched && (
                <TbSearch
                  title="Search..."
                  onClick={() => searchProducts(state.search)} // Call search on click
                  className="Search-Product-input-icon"
                />
              )}

              {state.search && state.isTyping && (
                <MdClose
                  title="Clear Input."
                  className="Search-Product-input-icon"
                  onClick={handleClearSearch}
                />
              )}

              {state.hasSearched && (
                <MdClose
                  title="Clear Search."
                  className="Search-Product-input-icon"
                  onClick={() => {
                    setState((prevState) => ({
                      ...prevState,
                      search: "",
                      isTyping: false,
                      hasSearched: false,
                    }));
                    fetchAllProducts();
                  }}
                />
              )}
            </div>

            <Menu
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <MenuHandler>
                <button className="Menu-Button-Fillter">
                  <p>Sort by </p>
                  <div className="Menu-Button-Fillter-icon">
                    <MdKeyboardArrowDown className="Menu-Button-Fillter-icon-I" />
                  </div>
                </button>
              </MenuHandler>
              <MenuList>
                <MenuItem>Table View</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem>
              </MenuList>
            </Menu>
            <Menu
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <MenuHandler>
                <button className="Menu-Button-Fillter">
                  <p> Collection Type</p>
                  <div className="Menu-Button-Fillter-icon">
                    <HiOutlineViewGridAdd className="Menu-Button-Fillter-icon-I" />
                  </div>
                </button>
              </MenuHandler>
              <MenuList>
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem>
              </MenuList>
            </Menu>
            <Menu
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <MenuHandler>
                <button className="Menu-Button-Fillter">
                  <p> Price Range</p>
                  <div className="Menu-Button-Fillter-icon">
                    <BiSlider className="Menu-Button-Fillter-icon-I" />
                  </div>
                </button>
              </MenuHandler>
              <MenuList>
                <Slider defaultValue={50} />
              </MenuList>
            </Menu>
          </div>
        </div>

        <div className="Product-view-data">
          {state.loading ? (
            <div className="loader-product">
              <Spinner />
            </div>
          ) : (
            <div className="Product-view-area">
              {state.data.length === 0 ? (
                <p>No products available</p>
              ) : (
                state.data.map((product, index) => (
                  <div
                    key={index}
                    className="Product-view"
                    title="Show Product Detail."
                  >
                    <Link
                      to={`/Admin/Products-Details/${product.Name}/${product._id}`}
                    >
                      <img
                        src={product.MainImage}
                        alt="Product"
                        className="Product-image"
                      />
                      <div className="Product-content-overlay">
                        <div className="Product-discount">
                          {product.variations[0]?.price?.real &&
                          product.variations[0]?.price?.discount
                            ? `- ${Math.round(
                                ((product.variations[0].price.real -
                                  product.variations[0].price.discount) /
                                  product.variations[0].price.real) *
                                  100
                              )}% `
                            : null}
                        </div>
                        <div className="Product-details">
                          <div className="Product-name">
                            {product.Name.slice(0, 20)}
                            {product.Name.length > 20 && "..."}
                          </div>
                          <div className="product-details-price-sales">
                            <div className="Product-price">
                              <span className="Product-sales">134 Sales</span>
                            </div>
                            <div className="Product-price">
                              <span className="real">
                                PK
                                {product.variations[0]?.price?.real || "Price"}
                              </span>
                              <span className="discount">
                                PK
                                {product.variations[0]?.price?.discount ||
                                  "Price"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
