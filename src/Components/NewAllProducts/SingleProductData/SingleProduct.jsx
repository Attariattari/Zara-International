import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer.jsx";
import "swiper/css/pagination";
import "./SingleProduct.css";
import "swiper/css";
import { Mousewheel, Autoplay } from "swiper/modules";
import MobileDeviceDisplaydetails from "./LikeSomeProductsDataView/MobileDeviceDisplaydetails";
import LikeSameWithProductData from "./LikeSomeProductsDataView/LikeSameWithProductData";
import AllProductDataView from "./AllProductDataView/AllProductDataView";
import Composetion from "./CompositionArea/Composetion";
import { ZaraProducts } from "../../DummyData/Data";

function SingleProduct() {
  const womenProducts = [ZaraProducts.Women.SATINY_BLAZER];
  const [isexpanded, setIsexpanded] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
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
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-10">
        <div className={`absolute w-full ${isScrolled ? "bg-white" : ""}`}>
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
      <div
        className={`JUST_SHOW_MOBILE ${isexpanded ? "isexpanded" : "Noexpend"}`}
      >
        <MobileDeviceDisplaydetails
          womenProducts={womenProducts}
          isexpanded={isexpanded}
          toggleIsexpanded={toggleIsexpanded}
        />
      </div>
      <div className="LikeSameWithProductData LikeProduct">
        <LikeSameWithProductData />
      </div>
      <span className="One">
        <Footer />
      </span>
    </div>
  );
}

export default SingleProduct;
