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
    if (Array.isArray(state.data) && state.data.length > 0) {
      // Dynamic category object
      const categories = {};
      let firstNewProduct = null; // Store the first new product

      state.data.forEach((product) => {
        const categoryName =
          product?.category?.MainCategoryName || "Uncategorized";

        if (!categories[categoryName]) {
          categories[categoryName] = [];
        }

        // Create reusable product object
        const productDetails = {
          MainImage: product?.MainImage,
          Name: product?.Name,
          id: product?._id,
          cid: product?.category?._id,
          cn: product?.category?.MainCategoryName,
          csid: product?.subcategory?._id,
        };

        // Check if it's the first 'new' product
        if (product?.new && !firstNewProduct) {
          firstNewProduct = productDetails;
        }

        // Add product to its category
        categories[categoryName].push(productDetails);
      });

      // Sort categories by product count
      const sortedCategories = Object.entries(categories)
        .sort((a, b) => b[1].length - a[1].length)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      // Update state with categories and first new product
      setState((prevState) => ({
        ...prevState,
        categories: sortedCategories,
        firstNewProduct, // Add the first new product directly to state
      }));

      if (firstNewProduct) {
        console.log("First New Product:", firstNewProduct);
      }
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
      return <div className="loader"></div>; // Fallback message agar categories load na hui ho
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

  useEffect(() => {
    if (!state.categories) return;

    // Automatically select the first category by default
    const defaultCategory = Object.keys(state.categories)[0]; // Pehla (0 index) category select karo

    // Update the state to set the default category
    if (defaultCategory && state.currentCategory !== defaultCategory) {
      handleCategoryChange(defaultCategory);
    }
  }, [state.categories]);

  const getCategorySlides = () => {
    if (!state.categories || !state.currentCategory) {
      return []; // Agar categories ya currentCategory nahi hain toh khali array return karo
    }

    const subcategories = state.categories[state.currentCategory];

    if (!subcategories) {
      return []; // Agar currentCategory ke subcategories nahi hain toh khali array return karo
    }

    const slides = [];

    // 🆕 **Sabse Pehle Category-wise Product Show Karo**
    let categoryProduct =
      state.data?.find(
        (product) =>
          product.new === true &&
          product.category.MainCategoryName === state.currentCategory
      ) ||
      state.data?.find(
        (product) => product.category.MainCategoryName === state.currentCategory
      );

    if (categoryProduct) {
      slides.push(
        <SwiperSlide
          key={`category-product-slide-${state.currentCategory}`}
          onClick={() => {
            if (
              categoryProduct.cn &&
              categoryProduct.cid &&
              categoryProduct.csid
            ) {
              navigate(
                `/Product/${categoryProduct.cn}/${categoryProduct.cid}/${categoryProduct.csid}`
              );
            } else {
              console.log("Product details are missing:", categoryProduct);
            }
          }}
        >
          <div className="relative w-full h-full">
            <div className="relative w-full h-full">
              <img
                src={categoryProduct.MainImage}
                alt="Category Product"
                className="w-full h-full object-cover"
              />
            </div>
            {categoryProduct.new === true && (
              <h3 className="absolute bottom-3 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm font-semibold">
                NEW
              </h3>
            )}
          </div>
        </SwiperSlide>
      );
    }

    // ✅ **Baaki Subcategories ke Products Show Karo**
    slides.push(
      ...Object.keys(subcategories).flatMap((subcategory) => {
        const products = subcategories[subcategory];

        const productArray = Array.isArray(products) ? products : [products];

        return getSlides(
          `${state.currentCategory}-${subcategory}`,
          productArray
        ).map((slide, index) => (
          <SwiperSlide
            key={`${state.currentCategory}-${subcategory}-${index}`}
            onClick={() =>
              navigate(
                `/Product/${productArray[index]?.cn}/${productArray[index]?.cid}/${productArray[index]?.csid}`
              )
            }
          >
            <div className="relative w-full h-full">
              <div className="relative w-full h-full">{slide}</div>
              <h3 className="absolute bottom-3 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-sm font-semibold">
                {productArray[index]?.Name || "No Name Available"}
              </h3>
            </div>
          </SwiperSlide>
        ));
      })
    );

    // 🌟 **Social Slide Add Karo**
    slides.push(
      <SwiperSlide
        key={`${state.currentCategory}-social-slide`}
        onClick={() => console.log("Social Slide Clicked")}
      >
        <div className="social-slide-page w-full h-full flex justify-center items-center">
          <SocialSlidepage />
        </div>
      </SwiperSlide>
    );

    return slides;
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
        >
          {getCategorySlides()}
        </Swiper>
      </div>
    </div>
  );
}
