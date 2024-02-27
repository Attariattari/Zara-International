import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";
import Navbar from "../Components/Navbar/Navbar";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
export default function Home() {
  const categories = {
    women: [
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-new/subhome-xmedia-08-3//w/1360/IMAGE-landscape-fill-58462023-91fd-4cd0-b4ee-9df9c4560aa1-default_0.jpg?ts=1708699752254",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-collection/subhome-xmedia-08-3//w/1360/IMAGE-landscape-fill-ec989a43-7be3-4053-b92f-4ba82ca485a1-default_0.jpg?ts=1708700575395",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-skirts/subhome-xmedia-08//w/1360/IMAGE-landscape-fill-931c9f86-8e80-44e5-a3f5-5ea2d12dca34-default_0.jpg?ts=1708700146372",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-join-life/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-448ca1e2-eb34-4a8e-8a83-635531c66fc0-default_0.jpg?ts=1708507401221",
    ],
    men: [
      "https://static.zara.net/photos///2024/V/T/1/p/0686/140/144/2/w/1097/0686140144_15_3_1.jpg?ts=1708528064312",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-man-coats/subhome-xmedia-08//w/1360/IMAGE-landscape-fill-8254875b-8f3a-4892-9cbe-aaebd3704fbb-default_0.jpg?ts=1708606681952",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-man-shoes/subhome-xmedia-08//w/1360/IMAGE-landscape-fill-d506e232-e46c-4a6b-b3a6-b825618a3d0e-default_0.jpg?ts=1708531602763",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-man-joinlife/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-e5f251d6-cf1a-4ea4-8980-4cbaa5b602c5-default_0.jpg?ts=1708507654789",
    ],

    kids: [
      "https://static.zara.net/photos///2024/V/0/3/p/1381/555/250/202/w/680/1381555250_15_1_1.jpg?ts=1707404521869",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-babygirl/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-d55e6a7d-2adf-41fa-a2a7-a75d3aa73810-default_0.jpg?ts=1708674688839",
      "https://static.zara.net/photos///2024/V/0/3/p/4551/601/400/102/w/680/4551601400_15_1_1.jpg?ts=1708333336700",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-babyboy/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-cb411d26-25e5-48ec-8ea1-19b9cdf37824-default_0.jpg?ts=1708674772320",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-boy/subhome-xmedia-8//w/1360/IMAGE-landscape-default-fill-b7fed291-ba37-46d4-810e-72d79817116f-default_0.jpg?ts=1708674246835",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-mini-newborn/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-d87712bf-5c3f-4d5e-b062-8bf9539aa911-default_0.jpg?ts=1708675587550",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-mini-baby/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-9096e347-f709-4820-b5de-4da08a298c6b-default_0.jpg?ts=1708674634462",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-shoes-bags/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-ebccf7f3-d14f-43cb-9f99-7732fab9ae36-default_0.jpg?ts=1708674252344",
      "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-join-life/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-b9e660c9-aad1-46c7-ae19-1e2b1ac59952-default_0.jpg?ts=1708517450733",
    ],
  };

  const [currentCategory, setCurrentCategory] = useState("women");
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [manualScroll, setManualScroll] = useState(false);
  const swiperRef = useRef(null);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setAutoplayEnabled(true);
    const swiper = swiperRef.current?.swiper;
    if (swiper) {
      swiper.slideTo(0);
    }
    setTimeout(() => {
      setManualScroll(false);
    }, 500);
  };

  const getSlides = (category, imageUrls) => {
    return imageUrls.map((imageUrl, index) => (
      <SwiperSlide key={`${category}-slide-${index}`}>
        <img src={imageUrl} alt="" />
      </SwiperSlide>
    ));
  };

  const getCategorySlides = () => {
    const imageUrls = categories[currentCategory] || [];
    return getSlides(currentCategory, imageUrls);
  };

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    const activeIndex = swiper.activeIndex;

    if (activeIndex === 0 && autoplayEnabled && !manualScroll) {
      swiper.autoplay.start(); // Start autoplay only if it's the first slide (active category) and not manually scrolled
    } else {
      swiper.autoplay.stop(); // Stop autoplay if manually scrolled
    }
  }, [currentCategory, autoplayEnabled, manualScroll]);

  const handleScroll = () => {
    setManualScroll(true);
    setTimeout(() => {
      setManualScroll(false);
    }, 500);
  };
  const handleNextCategory = () => {
    const categoriesList = Object.keys(categories);
    const currentIndex = categoriesList.indexOf(currentCategory);
    const nextIndex = (currentIndex + 1) % categoriesList.length;
    handleCategoryChange(categoriesList[nextIndex]);
  };

  const handlePrevCategory = () => {
    const categoriesList = Object.keys(categories);
    const currentIndex = categoriesList.indexOf(currentCategory);
    const prevIndex =
      (currentIndex - 1 + categoriesList.length) % categoriesList.length;
    handleCategoryChange(categoriesList[prevIndex]);
  };
  return (
    <div className="Home">
      <div className="sticky top-0 z-10">
        <div className="absolute w-full">
          <Navbar />
        </div>
        <div className="CategoryButtons">
          <div className="categoriesButtons">
            <button
              onClick={() => handleCategoryChange("men")}
              className={currentCategory === "men" ? "active" : "wmk"}
            >
              Men
            </button>
            <button
              onClick={() => handleCategoryChange("women")}
              className={currentCategory === "women" ? "active" : "wmk"}
            >
              Women
            </button>
            <button
              onClick={() => handleCategoryChange("kids")}
              className={currentCategory === "kids" ? "active" : "wmk"}
            >
              Kids
            </button>
          </div>
        </div>
      </div>
      <div className="SwiperArea">
        <div className="NavigationButtons">
          <div className=" z-20">
            <IoIosArrowBack
              onClick={handlePrevCategory}
              className="arrow-icon"
            />
          </div>
          <div className="z-20">
            <IoIosArrowForward
              onClick={handleNextCategory}
              className="arrow-icon"
            />
          </div>
        </div>
        <Swiper
          ref={swiperRef}
          direction={"vertical"}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Mousewheel, Autoplay, Pagination]}
          className="mySwiper relative"
          onSlideChange={() => {}}
          onTransitionEnd={() => {}}
          pagination={false}
          onScroll={() => handleScroll()}
        >
          {getCategorySlides()}
        </Swiper>
      </div>
    </div>
  );
}
{
  /* <div className="CategoryButtons">
        <button
          onClick={() => handleCategoryChange("men")}
          className={currentCategory === "men" ? "active" : "z-20"}
        >
          Men
        </button>
        <button
          onClick={() => handleCategoryChange("women")}
          className={currentCategory === "women" ? "active" : ""}
        >
          Women
        </button>
        <button
          onClick={() => handleCategoryChange("kids")}
          className={currentCategory === "kids" ? "active" : ""}
        >
          Kids
        </button>
      </div> */
}
