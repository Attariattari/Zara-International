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
    kids: {
      main: [
        "https://wallpapercave.com/wp/wp8575693.jpg",
        "https://previews.123rf.com/images/olgagi/olgagi1805/olgagi180500032/101295477-collection-of-child-s-clothes-kid-s-summerclothing-set-isolated.jpg",
      ],
      babyshirts: [
        "https://t4.ftcdn.net/jpg/04/64/71/65/360_F_464716593_LD9IBzIJwlRMwQzjqVwHLL7XeupROIlS.jpg",
        "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkcyUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
      ],
      babypants: [
        "https://e1.pxfuel.com/desktop-wallpaper/760/61/desktop-wallpaper-kids-fashion-baby-clothes.jpg",
        "https://e1.pxfuel.com/desktop-wallpaper/500/124/desktop-wallpaper-kids%EE%80%81-fashion-clothes-clothing-cute-pinterest-kids-fashion.jpg",
      ],
      babyjacket: [
        "https://images.unsplash.com/photo-1560506840-ec148e82a604?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lkcyUyMGNsb3RoZXN8ZW58MHx8MHx8fDA%3D",
        "https://landing-page-backend.s3.ap-south-1.amazonaws.com/blog_page_prodimages/0efb2b7e-fd8d-41a4-a4d7-9007ecbd293f/Kids-Clothes_auto.png"
      ],
      babyshoes: [
        "https://images.pexels.com/photos/1094084/pexels-photo-1094084.jpeg?cs=srgb&dl=pexels-vika-glitter-392079-1094084.jpg&fm=jpg",
        "https://static.yfswebstatic.com/desktop/assets/img/better-product2.11a83cab.jpg",
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
