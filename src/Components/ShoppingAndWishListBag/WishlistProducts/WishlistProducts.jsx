import React, { useState } from "react";
import { ZaraProducts } from "../../DummyData/Data";
import "./Css.css";
function WishlistProducts() {
  const womenProducts = [
    ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
    ZaraProducts.Women.SATINY_BLAZER,
    ZaraProducts.Women.FITTED_BLAZER,
    ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
    ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
  ];
  const [ShowSize, setShowSize] = useState();

  const ShowSizeandmeasurement = () => {
    setShowSize(true);
  };
  const HideSizeandmeasurement = () => {
    setShowSize(false);
  };

  return (
    <div className="Wish_List_Product">
      <div className="Wishdata">
        {womenProducts.map((product, index) => (
          <div className="WishGridView" key={index}>
            <div className="Wishproductimage">
              <img src={product.images} alt="" />
            </div>
            {!ShowSize && (
              <div className="Wishprdocutsdetailes">
                <div className="Wishseconds">
                  <div>
                    <div>
                      {product.title.length > 19
                        ? product.title.substring(0, 19) + "..."
                        : product.title}
                    </div>
                    <div>{product.price.RealPrice}</div>
                  </div>
                  <div className="Wishitemicons">
                    <svg
                      class="wishlist-icon wishlist-icon--grid"
                      preserveAspectRatio="xMidYMid slice"
                      width="20"
                      heigth="20"
                      height="20"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="inherit"
                      stroke="inherit"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 15.238L17 20V4H7v16l5-4.762z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            )}
            {ShowSize && (
              <div
                className="WishprdocutsdetailesForsize"
                onClick={(e) => {
                  e.preventDefault();
                  HideSizeandmeasurement();
                }}
              >
                <div className="Wishsecondssize">
                  {womenProducts[0].size.map((size, index) => (
                    <button key={index} className="WishButtons">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="wish_list_button_for_cart">
              {!ShowSize && (
                <button
                  className="WishButtonList"
                  onClick={(e) => {
                    e.preventDefault();
                    ShowSizeandmeasurement();
                  }}
                >
                  ADD
                </button>
              )}
              {ShowSize && (
                <button
                  className="WishButtonList"
                  onClick={(e) => {
                    e.preventDefault();
                    HideSizeandmeasurement();
                  }}
                >
                  MEASUREMENT GUIDE
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistProducts;
