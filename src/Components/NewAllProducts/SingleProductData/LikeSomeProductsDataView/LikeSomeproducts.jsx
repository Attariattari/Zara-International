import React from "react";
import { ZaraProducts } from "../../../DummyData/Data";
import { GoPlus } from "react-icons/go";
function LikeSomeproducts() {
  const womenProducts = [
    ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
    ZaraProducts.Women.SATINY_BLAZER,
    ZaraProducts.Women.FITTED_BLAZER,
    ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
    ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
  ];

  return (
    <div className="LikeSoneProducts">
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
                  <div className="Color">
                    <span
                      className="box_COLOR"
                      style={{ backgroundColor: "grey" }}
                    />
                    + 10
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LikeSomeproducts;
