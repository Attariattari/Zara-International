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
    <SwiperSlide key={`${category}-slide-${index}`}>
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
        <img src={imageUrl} alt="" onClick={() => navigate("/New")} />
      )}
    </SwiperSlide>
  ));
};

export default function Home() {
  const categories = {
    women: {
      main: [
        "https://static.zara.net/assets/public/272b/3c19/7fb7440491b6/a48f26e58815/02265186800-p/02265186800-p.jpg?ts=1708361181955&w=563,https://static.zara.net/assets/public/e656/5820/5d0b490193ab/4d653007c0f9/02265186800-a1/02265186800-a1.jpg?ts=1708361178090&w=563,https://static.zara.net/assets/public/d2f9/ce23/777c4e3f82a5/b35baf454260/02265186800-a2/02265186800-a2.jpg?ts=1708361188571&w=563,https://static.zara.net/assets/public/7eb6/5e1e/64764dde8c8b/aff31dc8f38e/02265186800-a3/02265186800-a3.jpg?ts=1708361173107&w=563,https://static.zara.net/assets/public/dd6c/0daf/5c9d4465b399/5aeab89ea735/02265186800-e1/02265186800-e1.jpg?ts=1708505692065&w=563,https://static.zara.net/assets/public/8a0d/d219/bffe46bf87d5/213182ae087d/02265186800-e2/02265186800-e2.jpg?ts=1708432031256&w=563,https://static.zara.net/assets/public/80ae/c1f7/2eef45d2b53e/9ece3aac94e7/02265186800-e3/02265186800-e3.jpg?ts=1708432087227&w=563,https://static.zara.net/assets/public/8d6d/e084/f4e146468665/412de0d69498/02265186800-e4/02265186800-e4.jpg?ts=1708432078845&w=563,https://static.zara.net/assets/public/afe1/1ac2/c8fd4df5a569/6d9600e41154/02265186800-e5/02265186800-e5.jpg?ts=1708432081013&w=563,https://static.zara.net/assets/public/b79b/4b99/d0e74d72a75d/1820a48a2548/02265186800-e6/02265186800-e6.jpg?ts=1708432081354&w=563,https://static.zara.net/assets/public/6779/1657/4fa54a80874a/62ba5019f90e/02265186800-e7/02265186800-e7.jpg?ts=1708432090718&w=563",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-new/subhome-xmedia-09-3//w/1360/IMAGE-landscape-fill-562e4cc7-7c05-45fb-99ad-58730d80dd2d-default_0.jpg?ts=1709378175316",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-new/subhome-xmedia-09-3//w/752/IMAGE-portrait-ipad-fill-7f7c51d7-9bf5-4005-9035-52b7872fc209-default_0.jpg?ts=1709378175254",
      ],
      shirts: [
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-collection/subhome-xmedia-09-3//w/1360/IMAGE-landscape-fill-867eefad-386e-4097-acd2-68f66a2348b7-default_0.jpg?ts=1709377968225",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-collection/subhome-xmedia-09-3//w/752/IMAGE-portrait-ipad-fill-db02bd1f-c8ce-475e-bdb6-23cec7d89601-default_0.jpg?ts=1709377968843",
      ],
      shoes: [
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-jackets/subhome-xmedia-09//w/1360/IMAGE-landscape-fill-d4a646af-9c1d-4491-9777-82a3e0d3677e-default_0.jpg?ts=1709378834738",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-woman-jackets/subhome-xmedia-09//w/752/IMAGE-portrait-ipad-fill-71f75e6b-3a79-4662-9127-4770c802d6c3-default_0.jpg?ts=1709378835559",
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
    kids: {
      main: [
        "https://static.zara.net/photos///2024/V/0/3/p/1381/555/250/202/w/680/1381555250_15_1_1.jpg?ts=1707404521869",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-join-life/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-b9e660c9-aad1-46c7-ae19-1e2b1ac59952-default_0.jpg?ts=1708517450733",
      ],
      babyshirts: [
        "https://static.zara.net/photos///2024/V/0/3/p/1381/555/250/202/w/680/1381555250_15_1_1.jpg?ts=1707404521869",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-babygirl/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-d55e6a7d-2adf-41fa-a2a7-a75d3aa73810-default_0.jpg?ts=1708674688839",
      ],
      babypants: [
        "https://static.zara.net/photos///2024/V/0/3/p/4551/601/400/102/w/680/4551601400_15_1_1.jpg?ts=1708333336700",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-babyboy/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-cb411d26-25e5-48ec-8ea1-19b9cdf37824-default_0.jpg?ts=1708674772320",
      ],
      babyjacket: [
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-boy/subhome-xmedia-8//w/1360/IMAGE-landscape-default-fill-b7fed291-ba37-46d4-810e-72d79817116f-default_0.jpg?ts=1708674246835",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-mini-newborn/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-d87712bf-5c3f-4d5e-b062-8bf9539aa911-default_0.jpg?ts=1708675587550",
      ],
      babyshoes: [
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-mini-baby/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-9096e347-f709-4820-b5de-4da08a298c6b-default_0.jpg?ts=1708674634462",
        "https://static.zara.net/photos///contents/mkt/spots/ss24-north-kids-shoes-bags/subhome-xmedia-08//w/1360/IMAGE-landscape-default-fill-ebccf7f3-d14f-43cb-9f99-7732fab9ae36-default_0.jpg?ts=1708674252344",
      ],
    },
  };

  const [currentCategory, setCurrentCategory] = useState("women");
  const [currentSubcategory, setCurrentSubcategory] = useState(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [manualScroll, setManualScroll] = useState(false);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);

    const subcategories = categories[category];
    const defaultSubcategory = subcategories
      ? Object.keys(subcategories)[0]
      : null;
    setCurrentSubcategory(defaultSubcategory);

    const firstSlide = subcategories ? subcategories[defaultSubcategory] : [];
    const firstSlideIsVideo = isVideo(firstSlide);
    const swiper = swiperRef.current?.swiper;

    if (swiper) {
      swiper.slideTo(0);

      if (firstSlideIsVideo) {
        setAutoplayEnabled(true);
        swiper.autoplay.start();
      } else {
        setAutoplayEnabled(false);
        swiper.autoplay.stop();
      }
    }
    setManualScroll(false);
  };

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    const handleSlideChange = () => {
      if (!manualScroll) {
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
  }, [manualScroll]);

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    const activeIndex = swiper.activeIndex;

    if (activeIndex === 0 && !manualScroll) {
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [currentCategory, manualScroll]);

  const handleScroll = () => {
    setManualScroll(true);
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    setScrollTimeout(
      setTimeout(() => {
        setManualScroll(false);
      }, 500)
    );
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

  const getCategoryButtons = () => {
    return Object.keys(categories).map((category) => (
      <button
        key={category}
        onClick={() => handleCategoryChange(category)}
        className={currentCategory === category ? "active" : "wmk"}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </button>
    ));
  };

  const getCategorySlides = () => {
    const subcategories = categories[currentCategory];

    return Object.keys(subcategories)
      .flatMap((subcategory) => {
        const imageUrls = subcategories[subcategory];
        return getSlides(`${currentCategory}-${subcategory}`, imageUrls);
      })
      .concat([
        <SwiperSlide key={`${currentCategory}-social-slide`}>
          <div className="social-slide-page w-full h-full flex justify-center items-center">
            <SocialSlidepage />
          </div>
        </SwiperSlide>,
      ]);
  };

  return (
    <div className="Home">
      <div className="sticky top-0 z-10">
        <div className="absolute w-full">
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
