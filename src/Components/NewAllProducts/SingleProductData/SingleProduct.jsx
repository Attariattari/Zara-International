import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./SingleProduct.css";
import Composetion from "./CompositionArea/Composetion";
import { ZaraProducts } from "../../DummyData/Data";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AllProductDataView from "./AllProductDataView/AllProductDataView";
import LikeSameWithProductData from "./LikeSomeProductsDataView/LikeSameWithProductData";

function SingleProduct() {
  const [expanded, setExpanded] = React.useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const swiperRef = useRef(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const womenProducts = [ZaraProducts.Women.LINEN_BLEND_ROLL_UP];

  const handleImageClick = (index) => {
    setActiveSlide(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
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
            <Composetion expanded={expanded} toggleExpanded={toggleExpanded} />
          </div>
          <div className="ImagesCarusalall">
            <Swiper
              ref={swiperRef}
              direction="vertical"
              slidesPerView={1}
              spaceBetween={0}
              mousewheel={true}
              modules={[Mousewheel, Autoplay]}
              className="CarosualArea mySwiper"
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSlideChange={(swiper) => {
                setActiveSlide(swiper.realIndex);
              }}
            >
              {womenProducts[0].images.map((imageUrl, index) => (
                <SwiperSlide key={index}>
                  <div className="ImagesCarosual">
                    <div className="imageWrapper">
                      <img src={imageUrl} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="ImagesForCarsualUpdates">
                {womenProducts[0].images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={`UpdaterImage ${
                      index === activeSlide ? "active" : ""
                    }`}
                    onClick={() => handleImageClick(index)} // Attach onClick event to update Swiper
                  >
                    <img src={imageUrl} alt="" />
                  </div>
                ))}
              </div>
            </Swiper>
          </div>
          <div className="AllProductDataView">
            <AllProductDataView womenProducts={womenProducts} />
          </div>
        </div>
      </div>
      <div className="JUST_SHOW_MOBILE">
        <button>ADD</button>
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
        <p>{womenProducts[0].price.RealPrice}</p>
      </div>
      <div className="LikeSameWithProductData LikeProduct">
        <LikeSameWithProductData />
      </div>
    </div>
  );
}

export default SingleProduct;
