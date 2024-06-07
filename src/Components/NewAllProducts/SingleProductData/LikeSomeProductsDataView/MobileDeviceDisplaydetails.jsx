import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LikeSameWithProductData from "./LikeSameWithProductData";
import Footer from "../../../Footer/Footer";
import "../SingleProduct.css";
import { Drawer } from "@material-tailwind/react";
import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
import LikeSomeproducts from "./LikeSomeproducts";

function MobileDeviceDisplaydetails({ womenProducts }) {
  const [ProductSizeBottom, setProductSizeBottom] = useState(false);
  const [Successaddtocart, setSuccessaddtocart] = useState(false);
  const [MEASUREPENS, setMEASUREPENS] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const mobileDisplayRef = useRef(null);
  const Navigate = useNavigate();

  const closedrawers = () => {
    setProductSizeBottom(false);
    setSuccessaddtocart(false);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setProductSizeBottom(false); // Close the product size button
    setSuccessaddtocart(true); // Show the success cart
    setSelectedSize(null); // Reset the selected size
  };

  const openDrawers = (drawerType) => {
    if (drawerType === "SizeDrawer") {
      setProductSizeBottom(true);
    } else if (drawerType === "AddtocartSucces") {
      setSuccessaddtocart(true);
    }
  };

  const Navigatetocart = () => {
    Navigate("/Shopping_Bag");
  };

  const toggleWishlist = () => {
    setIsInWishlist((prev) => !prev);
  };
  
  return (
    <div ref={mobileDisplayRef}>
      <div className="NoExpendArea">
        <div className="NoExpendArea_Title">
          <p>{womenProducts[0].title}</p>
          <p className="WomenRealPRice">{womenProducts[0].price.RealPrice}</p>
        </div>
        <div className="NoExpendArea_Buttons">
          <button
            className="sticky top-0 z-10 bg-white NoExpendArea_Add"
            onClick={(e) => {
              e.preventDefault();
              openDrawers("SizeDrawer");
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            ADD
          </button>
          <button
            className="sticky top-0 z-10 bg-white NoExpendArea_Wishlist"
            onClick={toggleWishlist}
          >
            {isInWishlist ? (
              <svg
                className="wishlist-icon wishlist-icon--productDetail"
                preserveAspectRatio="xMidYMid slice"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                stroke="inherit"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 15.238L17 20V4H7v16l5-4.762z"
                ></path>
              </svg>
            ) : (
              <svg
                className="wishlist-icon wishlist-icon--productDetail"
                preserveAspectRatio="xMidYMid slice"
                width="24"
                height="24"
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
            )}
          </button>
        </div>
      </div>
      {/* {isexpanded && ( */}
      <div className="ExpendArea">
        <p className="Womendiscription">{womenProducts[0].discription}</p>
        <p className="Womencolor">{womenProducts[0].color}</p>
        <div className="compoinmobile">
          <p>COMPOSITION & CARE</p>
          <p>COMPOSITION</p>
          <span style={{ padding: "0px 0px 20px 0px" }}>
            We work with monitoring programmes to ensure compliance with our
            social, environmental and health and safety standards for our
            products. To assess compliance, we have developed a programme of
            audits and continuous improvement plans.
          </span>
          <span style={{ padding: "0px" }}>OUTER SHELL</span>
          <span style={{ padding: "0px" }}>100% cotton</span>
          <p>LINING</p>
          <p>100% acetate</p>
          <p>Which contains at least:</p>
          <p className="WomenOUTESHELL">OUTER SHELL</p>
          <p>100% RCS certified recycled cotton</p>
          <p>CERTIFIED MATERIALS</p>
          <p>
            RCS CERTIFIED RECYCLED COTTON This fibre is made from recycled
            cotton textile waste. Using recycled materials helps limit the
            consumption of raw materials. It is certified to the Recycled Claim
            Standard (RCS), which verifies the recycled content and tracks it
            from source to final product.
          </p>
          <p>Certified by Intertek 193341</p>
          <Link className="underline">More information</Link>
          <video autoPlay muted loop playsInline className="video">
            <source
              src="../../../../public/My Web Data/YouCut_20240324_154952515.mp4"
              type="video/mp4"
            />
          </video>

          <p>CARE</p>
          <p>Caring for your clothes is caring for the environment.</p>
          <p>
            To keep your jackets and coats clean, you only need to freshen them
            up and go over them with a cloth or a clothes brush. If you need to
            dry clean a garment, look for a dry cleaner that uses technologies
            that are respectful of the environment.{" "}
          </p>
          <Link className="underline">Clothing Care Guided</Link>
          <div className="space-x-5">
            <img
              src="https://static.zara.net/photos///contents/cm/product-cares-9-icon_0.svg?ts=1604343299129"
              alt=""
              width="20"
            />
            <p>Do not wash</p>
          </div>
          <div className="space-x-5">
            <img
              src="https://static.zara.net/photos///contents/cm/product-cares-14-icon_0.svg?ts=1604343289322"
              alt=""
              width="20"
            />
            <p>Do not use bleach</p>
          </div>
          <div className="space-x-5">
            <img
              src="https://static.zara.net/photos///contents/cm/product-cares-18-icon_0.svg?ts=1604343283533"
              alt=""
              width="20"
            />
            <p>Iron at a maximum of 110ºC/230ºF</p>
          </div>
          <div className="space-x-5">
            <img
              src="https://static.zara.net/photos///contents/cm/product-cares-125-icon_0.svg?ts=1604671818114"
              alt=""
              width="20"
            />
            <p>Dry clean with tetrachloroethylene</p>
          </div>
          <div className="space-x-5">
            <img
              src="https://static.zara.net/photos///contents/cm/product-cares-35-icon_0.svg?ts=1604343281266"
              alt=""
              width="20"
            />
            <p>Do not tumble dry</p>
          </div>
        </div>
        <div className="LikeSameWithProductData">
          <LikeSameWithProductData />
        </div>
        <Footer />
      </div>
      {/* )} */}

      {ProductSizeBottom && (
        <span className="JustmobileSize p-0 text=[11px]">
          <Drawer
            placement="bottom"
            open={ProductSizeBottom}
            size={360}
            onClose={closedrawers}
            className="BottomDraver p-0"
          >
            <div className="DrawerSizeData">
              <div className="Drawer_Size_Title">
                <div>SELECT A SIZE</div>
                <div>This product is longer than usual.</div>
              </div>
              <div className="Drawer_Size_Data" style={{ fontSize: "11px" }}>
                {womenProducts[0].size.map((size, index) => (
                  <button
                    key={index}
                    className={selectedSize === size ? "Size" : ""}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="Drawer_Size_Measure">
                <div
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setMEASUREPENS(true);
                    closeDrawerBottom(false);
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  MEASUREMENT GUIDE
                </div>

                <div></div>
              </div>
            </div>
          </Drawer>
        </span>
      )}
      {Successaddtocart && (
        <span className="JustmobileSize p-0">
          <Drawer
            placement="bottom"
            open={Successaddtocart}
            size={360}
            onClose={closedrawers}
            className="BottomDraver p-0 overflow-y-auto"
          >
            <div className="SucccessAddTocartArea">
              <div className="details">
                <div>SIZE EU 36 / US 4 ADDED TO YOUR SHOPPING BAG</div>
                <div onClick={Navigatetocart}>VIEW</div>
              </div>
              <div>
                <LikeSomeproducts />
              </div>
            </div>
          </Drawer>
        </span>
      )}
      <SHIPPING_AND_RETURNS
        MEASUREPENS={MEASUREPENS}
        setMEASUREPENS={setMEASUREPENS}
      />
    </div>
  );
}

export default MobileDeviceDisplaydetails;

// const handleDragStart = (e) => {
//   const clientY = e.clientY || (e.touches && e.touches[0].clientY); // Handle touch events
//   setInitialY(clientY);
//   if (isexpanded) {
//     toggleIsexpanded();
//   }
// };

// const handleDragEnd = (e) => {
//   const clientY =
//     e.clientY || (e.changedTouches && e.changedTouches[0].clientY); // Handle touch events
//   const deltaY = clientY - initialY;
//   if (deltaY < 0) {
//     toggleIsexpanded();
//   }
//   setInitialY(null);
// };
