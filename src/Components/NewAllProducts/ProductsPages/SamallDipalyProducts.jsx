import React from "react";
import "./MainCss.css";
import { ZaraProducts } from "../../DummyData/Data";

function SamallDipalyProducts() {
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
  return (
    <div className="DetailedProducts">
      <div className="ProductAreaSamllImages">
        {womenProducts.map((product, index) => (
          <div className="ProductData" key={index}>
            {renderMedia(product.images)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SamallDipalyProducts;
