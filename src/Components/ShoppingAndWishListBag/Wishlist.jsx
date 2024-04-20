import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Css.css";

function Wishlist() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("wishlist");

  const ShippingRoute = () => {
    setActiveButton("shoppingBag");
    navigate("/Shopping_Bag");
  };

  const WishListRoute = () => {
    setActiveButton("wishlist");
    navigate("/Wishlist");
  };

  return (
    <div>
      <div className="sticky top-0 z-10" style={{ marginTop: "-9px" }}>
        <div className="absolute w-full bg-white">
          <Navbar />
          <div className="text-black mt-6 ShippingFavoButton">
            <button
              className={activeButton === "shoppingBag" ? "activeButton ShippingButton" : "ShippingButton"}
              onClick={ShippingRoute}
            >
              SHOPPING BAG (2)
            </button>
            <button
              className={activeButton === "wishlist" ? "activeButton WishListButton" : "WishListButton"}
              onClick={WishListRoute}
            >
              FAVOURITES
              <svg
                className="layout-shopping-lists-navigation__lists-icon wishlist-icon"
                preserveAspectRatio="xMidYMid slice"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                stroke="inherit"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="pt-48">Wishlist</div>
    </div>
  );
}

export default Wishlist;