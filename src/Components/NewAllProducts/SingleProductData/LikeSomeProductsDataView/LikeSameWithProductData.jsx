import React, { useState } from "react";
import { ZaraProducts } from "../../../DummyData/Data";
import { GoPlus } from "react-icons/go";
function LikeSameWithProductData() {
  const [wishlistStatus, setWishlistStatus] = useState({});
  const womenProducts = [
    ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
    ZaraProducts.Women.SATINY_BLAZER,
    ZaraProducts.Women.FITTED_BLAZER,
    ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
    ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
  ];

  const toggleWishlist = (index) => {
    setWishlistStatus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="YOU_MAY_LIKE">
      <p>YOU MAY ALSO LIKE</p>
      <div className="DetailedProducts">
        <div className="ProductArea  cursor-pointer">
          {womenProducts.map((product, index) => (
            <div className="ProductGridView" key={index}>
              <div className="Productproductimage">
                <img src={product.images} alt="" />
              </div>
              <div className="CartButtonArea">
                <div className="AddToCartIcon">
                  <GoPlus />
                </div>
              </div>
              <div className="Detailed">
                <div className="DetailedTitleandSVG">
                  <h4>
                    {product.title.length > 25
                      ? `${product.title.substring(0, 25)}...`
                      : product.title}
                  </h4>
                  {wishlistStatus[index] ? (
                    <svg
                      className="wishlist-icon wishlist-icon--productDetail"
                      preserveAspectRatio="xMidYMid slice"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="var(--text-color)"
                      stroke="inherit"
                      onClick={() => toggleWishlist(index)}
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
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="var(--text-color)"
                      stroke="inherit"
                      onClick={() => toggleWishlist(index)}
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
                      ></path>
                    </svg>
                  )}
                </div>
                <div className="PriceSection space-x-3">
                  <span>{product.price.RealPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LikeSameWithProductData;
