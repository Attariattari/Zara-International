import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WishList.css";
import "./Css.css";
import WishListDrawer from "./WishListDrawers/WishListDrawer";
import Footer from "../Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import WishlistProducts from "./WishlistProducts/WishlistProducts";
import NavBar_Show_After_Cart from "../Navbar/NavBar_Show_After_Cart/NavBar_Show_After_Cart";

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
}

function Wishlist() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("wishlist");
  const [drawerType, setDrawerType] = useState(null);
  const [share, setShare] = useState(false);

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

  useEffect(() => {
    const handleOverflow = () => {
      const body = document.querySelector("body");
      if (drawerType || share) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    };

    handleOverflow();

    return () => {
      document.body.style.overflow = "auto"; // Ensure overflow is reset on unmount
    };
  }, [drawerType, share]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const closeDrawer = () => {
    setDrawerType(null);
  };

  const openDrawer = (drawer) => {
    setDrawerType(drawer);
  };

  const shareopen = () => {
    setShare(true);
  };

  const shareclose = () => {
    setShare(false);
  };

  const slides = ["Hello", "hidden", "Another long text here"];

  return (
    <div>
      <div className="sticky top-0 z-10" style={{ marginTop: "-9px" }}>
        <div
          className="absolute w-full"
          style={{
            backgroundColor: "var(--bg-color)",
          }}
        >
          <NavBar_Show_After_Cart />
          {token && (
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
                  shareopen();
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
          )}
          <div
            className={`text-black ShippingFavoButton ${
              token ? "padding-0" : "padding-top-20"
            }`}
          >
            <button
              className={
                activeButton === "shoppingBag"
                  ? "activeButton ShippingButton"
                  : "ShippingButton"
              }
              onClick={shippingRoute}
            >
              SHOPPING BAG (2)
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
          {token && (
            <div className="WishListName">
              <Swiper
                breakpoints={{
                  320: {
                    slidesPerView: 4,
                  },
                  480: {
                    slidesPerView: 4,
                  },
                  640: {
                    slidesPerView: 4,
                  },
                  768: {
                    slidesPerView: 6,
                  },
                  1024: {
                    slidesPerView: 8,
                  },
                }}
                spaceBetween={5}
                className="mySwiper"
              >
                {slides.map((text, index) => (
                  <SwiperSlide key={index} className="Swiperslidebutton">
                    {truncateText(text, 12)}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
      <div className="WishList">
        {token ? (
          <div className="WishListArea">
            <WishlistProducts />
            <div className="WhistlistcrateButtonin_mobile">
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openDrawer("create_list");
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  CREATE LIST
                </button>
                <button>SELECT</button>
              </div>
            </div>
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
      {share && (
        <div className="sharepopup">
          <div className="sharepop">
            <div className="shareclose">
              <div>SHARE GHULAM'S LIST</div>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  stroke="inherit"
                  onClick={shareclose}
                  className="zds-dialog-icon-button__icon zds-dialog-close-button__icon cursor-pointer"
                >
                  <path d="m12 12.707 6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707Z"></path>
                </svg>
              </div>
            </div>
            <p>
              Share this list with whoever you want: they will be able to see
              your list but not edit it.
            </p>
            <div className="sharecopy">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                stroke="inherit"
              >
                <path d="M9 3.5h10.3v13.3h1V2.5H9v1z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7 6.1H4.9v15.4h11.8V6.1zM5.9 20.5V7.1h9.8v13.4H5.9z"
                ></path>
              </svg>
              COPY LINK
            </div>
          </div>
        </div>
      )}
      <WishListDrawer drawerType={drawerType} closeDrawer={closeDrawer} />
      <Footer />
    </div>
  );
}

export default Wishlist;
