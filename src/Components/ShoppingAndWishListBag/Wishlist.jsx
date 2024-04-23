import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Css.css";
import "./WishList.css";
import WishListDrawer from "./WishListDrawers/WishListDrawer";

function Wishlist() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("wishlist");
  const [createList, setCreateList] = useState(false);
  const [share, setShare] = useState(false);
  const [settings, setSettings] = useState(false);

  const shippingRoute = () => {
    setActiveButton("shoppingBag");
    navigate("/Shopping_Bag");
  };

  const wishListRoute = () => {
    setActiveButton("wishlist");
    navigate("/Wishlist");
  };

  const navigateLogIn = () => {
    navigate("/Login");
  };

  function getToken() {
    return localStorage.getItem("token") || null;
  }

  const token = getToken();
  localStorage.setItem("token", "Ghulam Muhyo Din");

  const openDrawer = (drawerType) => {
    if (drawerType === "create_list") setCreateList(true);
    else if (drawerType === "share") setShare(true);
    else if (drawerType === "setting") setSettings(true);
  };

  return (
    <div>
      <div className="sticky top-0 z-10" style={{ marginTop: "-9px" }}>
        <div className="absolute w-full bg-white">
          <Navbar />
          <div className="Wishlist_Buttons_For_Controls mt-6">
            <p
              onClick={(e) => {
                e.preventDefault();
                openDrawer("create_list");
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              CREATE LIST
            </p>
            .<p>SELECT</p>.
            <p
              onClick={(e) => {
                e.preventDefault();
                openDrawer("share");
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              SHARE
            </p>
            .
            <p
              onClick={(e) => {
                e.preventDefault();
                openDrawer("setting");
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            >
              SETTINGS
            </p>
          </div>
          <div className="text-black ShippingFavoButton">
            <button
              className={
                activeButton === "shoppingBag"
                  ? "activeButton ShippingButton"
                  : "ShippingButton"
              }
              onClick={shippingRoute}
            >
              SHOPPING BAG (2)s
            </button>
            <button
              className={
                activeButton === "wishlist"
                  ? "activeButton WishListButton"
                  : "WishListButton"
              }
              onClick={wishListRoute}
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
      <div className="WishList">
        {token ? (
          <div>
            <div>WishList</div>
          </div>
        ) : (
          <div className="WishListNoLogin">
            <div className="NoLogindata">
              <p>
                YOU MUST LOG IN TO VIEW AND SAVE ITEMS TO YOUR FAVOURITES LISTS.
              </p>
              <button onClick={navigateLogIn}>LOG IN</button>
              <p>
                Don’t have an account?{" "}
                <Link to="/Signup" className="LinkRig">
                  Register
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
      <div>
        <WishListDrawer
          createList={createList}
          setCreateList={setCreateList}
          share={share}
          setShare={setShare}
          settings={settings}
          setSettings={setSettings}
        />
      </div>
    </div>
  );
}

export default Wishlist;
