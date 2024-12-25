import React, { useState, useEffect, useRef, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Home.css";
import Navbar from "../Components/Navbar/Navbar";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import SocialSlidepage from "../Components/SocialPageforHome/SocialSlidepage";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../Context/UserContext";

// Helper function to check if the URL is a video
const isVideo = (url) => {
  return /\.(mp4|webm|ogg|ogv)$/i.test(url);
};

// Helper function to generate slides based on image URLs
const getSlides = (category, products) => {
  if (!Array.isArray(products)) {
    console.error("Expected products to be an array, but got:", products);
    return []; // Return an empty array if products is not an array
  }

  return products.map((product, index) => (
    <SwiperSlide className="Swiper__Slide" key={`${category}-slide-${index}`}>
      {index === 0 && isVideo(product.MainImage) ? (
        <Link to="/New">
          <video
            autoPlay
            muted
            loop
            playsInline
            onEnded={() => handleVideoEnd()}
            className="video"
          >
            <source src={product.MainImage} type="video/mp4" />
          </video>
        </Link>
      ) : (
        <img
          src={product.MainImage}
          alt={product.Name} // Added alt text for accessibility
          className="Swiper_Slider_Images"
          onClick={() => navigate("/New")}
        />
      )}
    </SwiperSlide>
  ));
};

export default function Home() {
  const [state, setState] = useState({
    currentCategory: "women",
    autoplayEnabled: true,
    scrollTimeout: true,
    manualScroll: false,
    data: [],
    loading: false,
  });
  const { token } = useContext(userContext);

  const fetchproducts = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const response = await axios.get(
        `http://localhost:1122/Product/carousel-products`,
        {
          headers: {
            Authenticate: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log(response.data, "hello");

      setState((prevState) => ({
        ...prevState,
        data: Array.isArray(response.data) ? response.data : [],
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.message,
      }));
    }
  };

  useEffect(() => {
    fetchproducts();
  }, []);

  useEffect(() => {
    if (state.data && state.data.length > 0) {
      // Dynamically categories ko identify karenge
      const categories = {};

      // Har product ko loop karenge aur categories ko dynamically add karenge
      state.data.forEach((product) => {
        const categoryName = product.category.MainCategoryName;

        // Agar category already exist karti hai toh uske main images ko add karenge
        if (!categories[categoryName]) {
          categories[categoryName] = [];
        }

        // Main image ko add karenge
        categories[categoryName].push({
          MainImage: product.MainImage,
          Name: product.Name,
        });
      });

      // Categories ko unki length ke hisaab se sort karenge
      const sortedCategories = Object.entries(categories)
        .sort((a, b) => b[1].length - a[1].length) // Length ke hisaab se descending order
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      // Sorted categories ko state mein set karenge
      setState((prevState) => ({
        ...prevState,
        categories: sortedCategories,
      }));

      // Sorted categories ko console mein log karenge
      console.log("Sorted Categories:", sortedCategories);
    }
  }, [state.data]);

  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const handleCategoryChange = (category) => {
    setState((prevState) => ({
      ...prevState,
      currentCategory: category,
    }));

    const subcategories = state.categories[category];
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

    const timeout = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        manualScroll: false,
      }));
    }, 500);

    setState((prevState) => ({
      ...prevState,
      scrollTimeout: timeout,
    }));
  };

  const handleNextCategory = () => {
    const categoriesList = Object.keys(state.categories); // Dynamic categories list
    const currentIndex = categoriesList.indexOf(state.currentCategory);

    if (currentIndex === -1) return; // Agar current category nahi mili toh return karen

    const nextIndex = (currentIndex + 1) % categoriesList.length; // Next index
    handleCategoryChange(categoriesList[nextIndex]); // Next category pe switch
  };

  const handlePrevCategory = () => {
    const categoriesList = Object.keys(state.categories); // Dynamic categories list
    const currentIndex = categoriesList.indexOf(state.currentCategory);

    if (currentIndex === -1) return; // Agar current category nahi mili toh return karen

    const prevIndex =
      (currentIndex - 1 + categoriesList.length) % categoriesList.length; // Previous index
    handleCategoryChange(categoriesList[prevIndex]); // Previous category pe switch
  };

  const getCategoryButtons = () => {
    if (!state.categories || Object.keys(state.categories).length === 0) {
      return <p>Loading categories...</p>; // Fallback message agar categories load na hui ho
    }

    return Object.keys(state.categories).map((category) => (
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
    if (!state.categories || !state.currentCategory) {
      return []; // Agar categories ya currentCategory nahi hain toh khali array return karo
    }

    const subcategories = state.categories[state.currentCategory];

    if (!subcategories) {
      return []; // Agar currentCategory ke subcategories nahi hain toh khali array return karo
    }

    return Object.keys(subcategories)
      .flatMap((subcategory) => {
        const products = subcategories[subcategory];

        // Ensure products is always an array
        const productArray = Array.isArray(products) ? products : [products];

        return getSlides(
          `${state.currentCategory}-${subcategory}`,
          productArray
        );
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
