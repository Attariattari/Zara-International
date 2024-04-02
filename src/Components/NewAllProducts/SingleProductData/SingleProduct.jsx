import MobileDeviceDisplaydetails from "./LikeSomeProductsDataView/MobileDeviceDisplaydetails";
import LikeSameWithProductData from "./LikeSomeProductsDataView/LikeSameWithProductData";
import AllProductDataView from "./AllProductDataView/AllProductDataView";
import Composetion from "./CompositionArea/Composetion";
import { Mousewheel, Autoplay } from "swiper/modules";
import { ZaraProducts } from "../../DummyData/Data";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState } from "react";
import Footer from "../../Footer/Footer.jsx";
import Navbar from "../../Navbar/Navbar";
import "swiper/css/pagination";
import "./SingleProduct.css";
import "swiper/css";
function SingleProduct() {
  const womenProducts = [ZaraProducts.Women.LINEN_BLEND_ROLL_UP];
  const [activeImageData, setActiveImageData] = useState(null);
  const [isexpanded, setIsexpanded] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const swiperRef = useRef(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const toggleIsexpanded = () => {
    setIsexpanded(!isexpanded);
  };

  const handleImageClick = (index) => {
    setActiveSlide(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };
  const ImageClick = (imageData) => {
    setActiveImageData(imageData);
    setShowPopup(true);
    console.log("Active Image Data:", imageData);
  };
  const handleClosePopup = () => {
    setShowPopup(false); // Close the popup
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
                      <img
                        src={imageUrl}
                        alt=""
                        onClick={() => ImageClick(imageUrl)}
                      />
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
      {/* Just Mobile Show */}
      <div
        className={`JUST_SHOW_MOBILE ${isexpanded ? "isexpanded" : "Noexpend"}`}
      >
        <MobileDeviceDisplaydetails
          womenProducts={womenProducts}
          isexpanded={isexpanded}
          toggleIsexpanded={toggleIsexpanded}
        />
      </div>
      {/* Just Mobile Show */}
      <div className="LikeSameWithProductData LikeProduct">
        <LikeSameWithProductData />
      </div>
      {showPopup && (
        <div className="imagePopup cursor-zoom-out">
          <img src={activeImageData} alt="" onClick={handleClosePopup} />
        </div>
      )}
      <span className="One">
        <Footer />
      </span>
    </div>
  );
}

export default SingleProduct;
