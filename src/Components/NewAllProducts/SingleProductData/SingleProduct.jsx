import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./SingleProduct.css";
import { Link } from "react-router-dom";

function SingleProduct() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <div className="sticky top-0 z-10">
        <div className="absolute w-full">
          <Navbar />
        </div>
      </div>
      <div className="SingleProduct">
        <div className="Main_Area">
          <div
            className={`COMPOSITIONAREA ${
              expanded ? "expanded" : "compact overflow-auto"
            }`}
          >
            <p>COMPOSITION & CARE</p>
            <p>COMPOSITION</p>
            <p>
              We work with monitoring programmes to ensure compliance with our
              social, environmental and health and safety standards for our
              products. To assess compliance, we have developed a programme of
              audits and continuous improvement plans.
            </p>
            {expanded && (
              <>
                <p>OUTER SHELL</p>
                <p>100% cotton</p>
                <p>LINING</p>
                <p>100% acetate</p>
                <p>Which contains at least:</p>
                <p>OUTER SHELL</p>
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
                <Link>More information</Link>
                {/* <video autoPlay muted loop playsInline className="video">
                  <source
                    src="https://zarabackendserver-448d1df25aec.herokuapp.com/uploads/1711278427819YouCut_20240324_154952515.mp4"
                    type="video/mp4"
                  />
                </video> */}
                <img
                  src="https://static.zara.net/assets/public/8d6e/88db/ca8c42fbaf5b/3a757794edb1/02764637712-p/02764637712-p.jpg?ts=1711113921879&w=750"
                  alt=""
                />
                <p>CARE</p>
                <p>Caring for your clothes is caring for the environment.</p>
                <p>
                  To keep your jackets and coats clean, you only need to freshen
                  them up and go over them with a cloth or a clothes brush. If
                  you need to dry clean a garment, look for a dry cleaner that
                  uses technologies that are respectful of the environment.{" "}
                </p>
                <Link>Clothing Care Guided</Link>
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
              </>
            )}
            <button onClick={toggleExpanded}>
              {expanded ? "Show less" : "See more"}
            </button>
          </div>
          <div className="CarosualArea">CAROSUAL AREA </div>
          <div className="AllProductDataView">PRODUCT DEATILED DATA </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
