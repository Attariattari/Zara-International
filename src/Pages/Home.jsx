import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";
import Navbar from "../Components/Navbar/Navbar";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import SocialSlidepage from "../Components/SocialPageforHome/SocialSlidepage";
import { Link, useNavigate } from "react-router-dom";

// Helper function to check if the URL is a video
const isVideo = (url) => {
  return /\.(mp4|webm|ogg|ogv)$/i.test(url);
};

// Helper function to generate slides based on image URLs
const getSlides = (category, imageUrls) => {
  return imageUrls.map((imageUrl, index) => (
    <SwiperSlide className="Swiper__Slide" key={`${category}-slide-${index}`}>
      {index === 0 && isVideo(imageUrl) ? (
        <Link to="/New">
          <video
            autoPlay
            muted
            loop
            playsInline
            onEnded={() => handleVideoEnd()}
            className="video"
          >
            <source src={imageUrl} type="video/mp4" />
          </video>
        </Link>
      ) : (
        <img
          src={imageUrl}
          alt=""
          className="Swiper_Slider_Images"
          onClick={() => navigate("/New")}
        />
      )}
    </SwiperSlide>
  ));
};

export default function Home() {
  const categories = {
    women: {
      main: [
        "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?cs=srgb&dl=pexels-kowalievska-1126993.jpg&fm=jpg",
        "https://images.pexels.com/photos/1198178/pexels-photo-1198178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/1034859/pexels-photo-1034859.jpeg",
      ],
      shirts: [
        "https://c0.wallpaperflare.com/preview/710/671/653/people-girl-female-lady.jpg",
        "https://w0.peakpx.com/wallpaper/114/476/HD-wallpaper-gorgeous-girl-outdoors-wearing-sport-clothes-girls-model.jpg",
      ],
      shoes: [
        "https://images3.alphacoders.com/117/1174056.jpg",
        "https://www.hdwallpapers.in/download/girl_model_is_wearing_red_dress_4k_hd_girls-2560x1440.jpg",
      ],
      Blaouse: [
        "https://www.hdwallpapers.in/download/women_model_black_dress_4k_5k_hd-HD.jpg",
        "https://rare-gallery.com/mocahbig/82116-dress-girls-model-hd-4k-5k.jpg",
        "https://www.pixel4k.com/wp-content/uploads/2019/12/black-dress-clothing-girl_1575665766.jpg",
      ],
    },
    men: {
      main: [
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-man-new/subhome-xmedia-10//w/1360/IMAGE-landscape-fill-388c511e-0ae7-4fde-a636-e02f7e298861-default_0.jpg?ts=1709565857511",
      ],
      tshirt: [
        "https://static.zara.net/photos///2024/V/T/1/p/0686/140/144/2/w/1097/0686140144_15_3_1.jpg?ts=1708528064312",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-man-coats/subhome-xmedia-08//w/1360/IMAGE-landscape-fill-8254875b-8f3a-4892-9cbe-aaebd3704fbb-default_0.jpg?ts=1708606681952",
      ],
      halfpant: [
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-man-shoes/subhome-xmedia-08//w/1360/IMAGE-landscape-fill-d506e232-e46c-4a6b-b3a6-b825618a3d0e-default_0.jpg?ts=1708531602763",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-man-joinlife/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-e5f251d6-cf1a-4ea4-8980-4cbaa5b602c5-default_0.jpg?ts=1708507654789",
      ],
    },
  };

  const [state, setState] = useState({
    currentCategory: "women",
    autoplayEnabled: true,
    scrollTimeout: true,
    manualScroll: false,
    data: [],
    loading: false,
  });
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const handleCategoryChange = (category) => {
    setState((prevState) => ({
      ...prevState,
      currentCategory: category,
    }));

    const subcategories = categories[category];
    const defaultSubcategory = subcategories
      ? Object.keys(subcategories)[0]
      : null;

    const firstSlide = subcategories ? subcategories[defaultSubcategory] : [];
    const firstSlideIsVideo = isVideo(firstSlide);
    const swiper = swiperRef.current?.swiper;

    if (swiper) {
      swiper.slideTo(0);

      if (firstSlideIsVideo) {
        setState((prevState) => ({
          ...prevState,
          autoplayEnabled: true,
        }));
        swiper.autoplay.start();
      } else {
        setState((prevState) => ({
          ...prevState,
          autoplayEnabled: false,
        }));
        swiper.autoplay.stop();
      }
    }
    setState((prevState) => ({
      ...prevState,
      manualScroll: false,
    }));
  };

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    const handleSlideChange = () => {
      if (!state.manualScroll) {
        swiper.autoplay.start();
      }
    };

    if (swiper) {
      swiper.on("slideChange", handleSlideChange);
    }

    return () => {
      if (swiper) {
        swiper.off("slideChange", handleSlideChange);
      }
    };
  }, [state.manualScroll]);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    const activeIndex = swiper.activeIndex;

    if (activeIndex === 0 && !state.manualScroll) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [state.currentCategory, state.manualScroll]);

  const handleScroll = () => {
    setState((prevState) => ({
      ...prevState,
      manualScroll: true,
    }));
    if (state.scrollTimeout) {
      clearTimeout(state.scrollTimeout);
    }
    setState((prevState) => ({
      ...prevState,
      manualScroll: setTimeout(() => {
        state.manualScroll(false);
      }, 500),
    }));
  };

  const handleNextCategory = () => {
    const categoriesList = Object.keys(categories);
    const currentIndex = categoriesList.indexOf(state.currentCategory);
    const nextIndex = (currentIndex + 1) % categoriesList.length;
    handleCategoryChange(categoriesList[nextIndex]);
  };

  const handlePrevCategory = () => {
    const categoriesList = Object.keys(categories);
    const currentIndex = categoriesList.indexOf(state.currentCategory);
    const prevIndex =
      (currentIndex - 1 + categoriesList.length) % categoriesList.length;
    handleCategoryChange(categoriesList[prevIndex]);
  };

  const getCategoryButtons = () => {
    return Object.keys(categories).map((category) => (
      <button
        key={category}
        onClick={() => handleCategoryChange(category)}
        className={state.currentCategory === category ? "active" : "wmk"}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </button>
    ));
  };

  const getCategorySlides = () => {
    const subcategories = categories[state.currentCategory];

    return Object.keys(subcategories)
      .flatMap((subcategory) => {
        const imageUrls = subcategories[subcategory];
        return getSlides(`${state.currentCategory}-${subcategory}`, imageUrls);
      })
      .concat([
        <SwiperSlide key={`${state.currentCategory}-social-slide`}>
          <div className="social-slide-page w-full h-full flex justify-center items-center">
            <SocialSlidepage />
          </div>
        </SwiperSlide>,
      ]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Home">
      <div className="sticky top-0 z-10 Home_navbar ">
        <div className=" bg-transparent w-full">
          <Navbar />
        </div>
        <div className="CategoryButtons">
          <div className="categoriesButtons">{getCategoryButtons()}</div>
        </div>
      </div>
      <div className="SwiperArea">
        <div className="NavigationButtons">
          <div>
            <IoIosArrowBack
              onClick={handlePrevCategory}
              className="arrow-icon cursor-pointer"
            />
          </div>
          <div>
            <IoIosArrowForward
              onClick={handleNextCategory}
              className="arrow-icon cursor-pointer"
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
          className="mySwiper relative cursor-pointer"
          onSlideChange={() => {}}
          onTransitionEnd={() => {}}
          pagination={false}
          onScroll={() => handleScroll()}
          onClick={() => navigate("/New")}
        >
          {getCategorySlides()}
        </Swiper>
      </div>
    </div>
  );
}
