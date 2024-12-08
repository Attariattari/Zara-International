import React, { useEffect, useState } from "react";
import "./FinalCartProductView.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { ZaraProducts } from "../DummyData/Data";
import SHIPPING_AND_RETURNS from "../NewAllProducts/Offcanvice/SHIPPING_AND_RETURNS";
import NavBar_Show_After_Cart from "../Navbar/NavBar_Show_After_Cart/NavBar_Show_After_Cart";
const FinalCartProductView = () => {
  const womenProducts = [
    ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
    ZaraProducts.Women.SATINY_BLAZER,
    ZaraProducts.Women.FITTED_BLAZER,
    ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
    ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [SizeView, setSizeView] = useState(false);

  const openSizeViewDrawer = () => setSizeView(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-10">
        <div
          className="absolute w-full"
          style={{
            backgroundColor: isScrolled ? "var(--bg-color)" : "transparent",
          }}
        >
          <NavBar_Show_After_Cart />
        </div>
      </div>
      <div className="FinalCartProductView">
        <div className="FinalView">
          <div className="FinalViewTitleFist">
            WHERE DO YOU WANT TO RECEIVE YOUR ORDER?
          </div>
          <div className="FinalViewTitleSecond">DELIVERY ADDRESS</div>
          <div className="FinalAdrees">
            <div className="FinalViewTitleForMobile">
              <p>THEME PARK VIEW LAHORE CHUNG</p>
              <Link onClick={openSizeViewDrawer}>EDIT</Link>
              <span onClick={openSizeViewDrawer}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="var(--text-color)"
                  stroke="inherit"
                  class="zds-selection-cell__selection-icon--default cursor-pointer"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.336 12 8.624 4.33l.752-.66L16.665 12l-7.289 8.33-.752-.66L15.336 12Z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="FinalDataAndDate">
            <div className="FinalData">
              <p>ITEMS</p>
              <div className="Finalslides">
                <Swiper slidesPerView={3} spaceBetween={0} className="mySwiper">
                  {womenProducts.map((product, index) => (
                    <SwiperSlide key={index} className="Swipe">
                      <img
                        className="FinalSlidesImg"
                        src={product.images}
                        alt=""
                      />
                      <div className="FinalSHowItemQuantity">10</div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="FinalDelevryTime">
                <div className="Detailsfinal">
                  <input type="checkbox" checked={true} name="" id="" />
                  <span>THURSDAY 09, MAY - TUESDAY 14, MAY</span>{" "}
                </div>
                <span>19.95 EUR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="sticky bottom-0 z-50">
        <div className={isMobile ? "formobile" : "CartpropccessOrder"}>
          <div className="CartPropssesstitle opacity-0">
            *By continuing, I declare that I have read and accept the Purchase
            Conditions and understand Zara's Privacy and Cookie Policy.
          </div>
          <div className="CartProccesses">
            <div>
              <p>TOTAL</p>
              <p>19.95 EUR</p>
            </div>
            <Link className="Cartcontinuebutton" to="/SelectCardsForPay">
              <button className="Contiun">CONTINUE</button>
            </Link>
          </div>
        </div>
      </div>
      <div style={{ overflow: SizeView ? "hidden" : "auto" }}>
        <SHIPPING_AND_RETURNS
          SizeView={SizeView} // Pass SizeView state to control drawer visibility
          setSizeView={setSizeView} // Pass setSizeView to control drawer state
        />
      </div>
    </div>
  );
};

export default FinalCartProductView;
