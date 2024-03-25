import React, { useRef, useState } from "react";
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
    setActiveSlide(index); // Update the active slide index when an image is clicked
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index); // Update the Swiper to the clicked image
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
            </Swiper>{" "}
          </div>
          <div className="AllProductDataView">
            <AllProductDataView womenProducts={womenProducts} />
          </div>
        </div>
      </div>
      <div className="LikeSameWithProductData">
        <LikeSameWithProductData />
      </div>
    </div>
  );
}

export default SingleProduct;
