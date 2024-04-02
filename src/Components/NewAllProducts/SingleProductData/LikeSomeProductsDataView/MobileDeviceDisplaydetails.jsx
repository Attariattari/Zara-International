import React from "react";
import { Link } from "react-router-dom";
import { ZaraProducts } from "../../../DummyData/Data";
import LikeSameWithProductData from "./LikeSameWithProductData";
import Footer from "../../../Footer/Footer";
function MobileDeviceDisplaydetails({
  womenProducts,
  isexpanded,
  toggleIsexpanded,
}) {
  const Media = (media) => {
    if (media.length > 0) {
      const firstMedia = media[0];
      if (firstMedia.endsWith(".mp4")) {
        return (
          <video autoPlay loop muted src={firstMedia} alt="Product video" />
        );
      } else {
        return <img width="300" src={firstMedia} alt="Product image" />;
      }
    }
    return null;
  };
  return (
    <div>
      <button className="sticky top-0 z-10 bg-white" onClick={toggleIsexpanded}>
        {isexpanded ? "ADD" : "ADD"}
      </button>
      <span>
        <span>
          <p>{womenProducts[0].title.substring(0, 32)}</p>
          <svg
            class="wishlist-icon wishlist-icon--productDetail"
            preserveAspectRatio="xMidYMid slice"
            width="16"
            heigth="16"
            height="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            stroke="inherit"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
            ></path>
          </svg>
        </span>
        <div className="Colors">
          <span className="color-box" style={{ backgroundColor: "white" }} />
          <span className="color-box" style={{ backgroundColor: "black" }} />
          <span className="color-box" style={{ backgroundColor: "blue" }} />
        </div>
      </span>
      <p className="WomenRealPRice">{womenProducts[0].price.RealPrice}</p>
      {isexpanded && (
        <>
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
              consumption of raw materials. It is certified to the Recycled
              Claim Standard (RCS), which verifies the recycled content and
              tracks it from source to final product.
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
              To keep your jackets and coats clean, you only need to freshen
              them up and go over them with a cloth or a clothes brush. If you
              need to dry clean a garment, look for a dry cleaner that uses
              technologies that are respectful of the environment.{" "}
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
        </>
      )}
    </div>
  );
}

export default MobileDeviceDisplaydetails;
