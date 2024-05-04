import React from "react";
import "./MainCss.css";
import { ZaraProducts } from "../../DummyData/Data";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Footer from "../../Footer/Footer";

function DetailsDisplayProduct() {
  const navigate = useNavigate();

  const womenProducts = [
    ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
    ZaraProducts.Women.SATINY_BLAZER,
    ZaraProducts.Women.FITTED_BLAZER,
    ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
    ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
  ];

  const renderMedia = (media) => {
    if (media.length > 0) {
      const firstMedia = media[0];
      if (firstMedia.endsWith(".mp4")) {
        return (
          <video autoPlay loop muted src={firstMedia} alt="Product video" />
        );
      } else {
        return <img src={firstMedia} alt="Product image" />;
      }
    }
    return null;
  };

  const Navigate = () => {
    navigate("/SingleProduct");
  };

  return (
    <div className="DetailedProducts">
      <div className="ProductArea cursor-pointer">
        {womenProducts.map((product, index) => (
          <div className="ProductGridView" key={index}>
            <div className="Productproductimage" >
              <img src={product.images} alt="" />
            </div>
            <div className="AddToCartIcon" onClick={Navigate}>
              <GoPlus />
            </div>
            <div className="Detailed">
              <div className="DetailedTitleandSVG">
                <h4>
                  {product.title.length > 25
                    ? `${product.title.substring(0, 25)}...`
                    : product.title}
                </h4>
                <svg
                  className="wishlist-icon wishlist-icon--grid"
                  preserveAspectRatio="xMidYMid slice"
                  width="18"
                  height="18"
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
              </div>
              <div className="PriceSection space-x-3">
                <span>{product.price.RealPrice}</span>
                <span>{product.price.discountprice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default DetailsDisplayProduct;
