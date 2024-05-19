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
    else if (drawerType === "setting") setSettings(true);
  };
  useEffect(() => {
    const handleOverflow = () => {
      const body = document.querySelector("body");
      if (share) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    };

    handleOverflow();

    const observer = new MutationObserver((mutationsList, observer) => {
      handleOverflow();
    });

    observer.observe(document.body, { attributes: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [share]);

  const shareopen = () => {
    setShare(true);
  };
  const shareclose = () => {
    setShare(false);
  };
  const slides = [
    "Hello",
    "hidden",
    "Another long text here",
  ];
  return (
    <div>
      <div className="sticky top-0 z-10" style={{ marginTop: "-9px" }}>
        <div className="absolute w-full bg-white">
          <NavBar_Show_After_Cart />
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
          <div className="text-black ShippingFavoButton">
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
          <div className="WishListName">
            <Swiper
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
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
        </div>
      </div>
      <div className="WishList">
        {token ? (
          <div className="WishListArea">
            <WishlistProducts />
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
                  class="zds-dialog-icon-button__icon zds-dialog-close-button__icon cursor-pointer"
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.7 6.1H4.9v15.4h11.8V6.1zM5.9 20.5V7.1h9.8v13.4H5.9z"
                ></path>
              </svg>
              COPY LINK
            </div>
          </div>
        </div>
      )}
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
      <Footer />
    </div>
  );
}

export default Wishlist;
