import React, { useEffect, useState } from "react";
import "./Order_Summary.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { ZaraProducts } from "../DummyData/Data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import NavBar_Show_After_Cart from "../Navbar/NavBar_Show_After_Cart/NavBar_Show_After_Cart";
const Order_Summary = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [FullDisplayData, setFullDisplayData] = useState(
    window.innerWidth < 768
  );
  const [expendview, setExpendview] = useState();
  const [Totoalitemshow, setTotoalitemshow] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    const handleDataView = () => {
      setFullDisplayData(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleDataView);

    return () => {
      window.removeEventListener("resize", handleDataView);
    };
  }, []);

  const Totalviewshow = () => {
    setTotoalitemshow(true);
  };

  const Totalviewfalse = () => {
    setTotoalitemshow(false);
  };
  const Expendfortotal = () => {
    setExpendview(!expendview);
  };

  const womenProducts = [
    ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
    ZaraProducts.Women.SATINY_BLAZER,
    ZaraProducts.Women.FITTED_BLAZER,
    ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
    ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-10 ">
        <div className={`absolute w-full ${isScrolled ? "bg-white" : ""}`}>
          <NavBar_Show_After_Cart />
        </div>
      </div>

      {FullDisplayData ? (
        <div className="Order_Summary">
          <div className="Order_Summary_Main">
            <div className="Order_Summary_Title_Main">
              <p className="Order_Summary_Title">
                If import costs are not included in your order, you will need to
                pay them locally.
              </p>
            </div>
            <div className="Order_Summary_Data_Mobile">
              <div className="Order_Summary_Data_Mobile_Delivery">
                <p>DELIVERY THURSDAY 23, MAY - TUESDAY 28, MAY</p>
                <p>22 products</p>
              </div>
              <div className="Order_Summary_Data_Mobile_Product_Swiper">
                <Swiper
                  slidesPerView={6}
                  breakpoints={{
                    320: { slidesPerView: 2 },
                    480: { slidesPerView: 4 },
                    640: { slidesPerView: 4 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1200: { slidesPerView: 6 },
                  }}
                  spaceBetween={0}
                  className="mySwiper"
                >
                  {womenProducts.map((product, index) => (
                    <SwiperSlide key={index}>
                      <img
                        className="Order_Summary_Data_Mobile_Product_Swiper_Slide"
                        src={product.images}
                        alt=""
                      />
                      <div className="Order_Summary_Data_Mobile_Product_Quantity">
                        10
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="Order_Summary_Data_Mobile_Delivery_Type">
                <div>
                  <p>EXPRESS HOME DELIVERY</p>
                  <p>THURSDAY 23, MAY - TUESDAY 28, MAY</p>{" "}
                </div>
                <div>
                  <svg
                    class="order-summary-block__link-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="inherit"
                    stroke="inherit"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.336 12L8.624 4.33l.752-.66L16.665 12l-7.289 8.33-.752-.66L15.336 12z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="Order_Summary_Data_Mobile_Address_View">
                <div>
                  <p>GHULAM MUHYO DIN</p>
                  <p>
                    Theme park view lahore chung Adalat shah road theme park
                    view lahore
                  </p>
                  <p>chung</p>
                  <p>53720</p>
                  <p>Lahore</p>
                  <p>Punjab</p>
                  <p>Pakistan</p>
                  <p>+92 03224458481</p>
                </div>
                <div className="Order_Summary_Data_Mobile_Address_View_SVG">
                  <svg
                    class="order-summary-block__link-icon cursor-pointer"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="inherit"
                    stroke="inherit"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.336 12L8.624 4.33l.752-.66L16.665 12l-7.289 8.33-.752-.66L15.336 12z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="Order_Summary_Data_Mobile_Payment_Method">
                <div className="Order_Summary_Payment_Data">
                  <div className="Order_Summary_Payment_Image">
                    <img
                      src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-paypal_new.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p>PAYPAL</p>
                    <p>
                      You will be redirected to the PayPal website, where you
                      can finalise payment.
                    </p>
                  </div>
                </div>{" "}
                <svg
                  class="order-summary-block__link-icon cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="inherit"
                  stroke="inherit"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.336 12L8.624 4.33l.752-.66L16.665 12l-7.289 8.33-.752-.66L15.336 12z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="Order_Summary">
          <div className="Order_Summary_Main">
            <div className="Order_Summary_Data">
              <div className="Order_Summary_DELIVERY_Payment">
                <div className="Order_Summary_DELIVERY">
                  <p>DELIVERY</p>
                  <div className="Order_Summary_DELIVERY_Child">
                    <div className="Order_Summary_DELIVERY_Child_one">
                      <p>
                        EXPRESS HOME DELIVERY · THURSDAY 16, MAY - TUESDAY 21,
                        MAY
                      </p>
                      <div className="Order_Summart_Edit">
                        <Link>EDIT</Link>
                      </div>
                    </div>
                    <div className="Order_Summary_DELIVERY_Child_Two">
                      <p>GHULAM MUHYO DIN</p>
                      <p>
                        Theme park view lahore chung Adalat shah road theme park
                        view lahore
                      </p>
                      <p>chung</p>
                      <p>53720</p>
                      <p>Lahore</p>
                      <p>Punjab</p>
                      <p>Pakistan</p>
                      <p>+92 03224458481</p>
                      <div className="Order_Summart_Edit">
                        <Link>EDIT</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="Order_Summary_Payment_Method">
                  <p>PAYMENT</p>
                  <div className="Order_Summary_Payment_Main">
                    <div className="Order_Summary_Payment_Data">
                      <div className="Order_Summary_Payment_Image">
                        <img
                          src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-paypal_new.svg"
                          alt=""
                        />
                      </div>
                      <div>
                        <p>PAYPAL</p>
                        <p>
                          You will be redirected to the PayPal website, where
                          you can finalise payment.
                        </p>
                      </div>
                    </div>{" "}
                    <div className="Order_Summart_Edit">
                      <Link>EDIT</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Order_Summary_Shipping">
                <div className="Order_Summary_Shipping_Main">
                  <p> SHIPPING DETAILS</p>
                  <div className="Order_Summary_Shipping_Data">
                    <div className="Order_Summary_Shipping_Child">
                      <p>DELIVERY THURSDAY 16, MAY - TUESDAY 21, MAY</p>
                      <p>22 products</p>
                    </div>
                    <div className="Order_Summary_Shipping_Product_Swiper">
                      <Swiper
                        breakpoints={{
                          320: {
                            slidesPerView: 1,
                          },
                          480: {
                            slidesPerView: 2,
                          },
                          640: {
                            slidesPerView: 3,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1024: {
                            slidesPerView: 6,
                          },
                        }}
                        spaceBetween={0}
                        className="mySwiper"
                      >
                        {womenProducts.map((product, index) => (
                          <SwiperSlide key={index}>
                            <img
                              className="Order_Summary_Shipping_Product_Swiper_Slide"
                              src={product.images}
                              alt=""
                            />
                            <div className="Order_Summary_Shipping_Product_Quantity">
                              10
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
      {isMobile ? (
        <div className="sticky bottom-0 z-50">
          <div className="ExpendSVGButtonForCart">
            <div onClick={Expendfortotal}>
              <svg
                class="layout-shop-footer__swipe-icon"
                width="40"
                height="1"
                viewBox="0 0 40 0.5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 0h40v1H0V0z"
                ></path>
              </svg>
            </div>
          </div>
          {expendview && (
            <div className="Justshowinpayconform">
              <div>
                <p>22 Items</p>
                <p>718.98 EUR</p>
              </div>
              <div>
                <p>SHIPPING</p>
                <p>19.95 EUR</p>
              </div>
              <div>
                <p>TOTAL</p>
                <p>738.85 EUR</p>
              </div>
            </div>
          )}
          <div className="CartMobileDataCountinues">
            <div className="CartProccesses">
              {!expendview && (
                <div className="CartProccessesTotal">
                  <p>SHIPPING</p>
                  <p>19.95 EUR</p>
                </div>
              )}
              <Link
                className="Cartcontinuebutton"
                to="/InterCardData"
                style={{ width: "100%" }}
              >
                <button className="Contiun">CONTINUE</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="sticky bottom-0 z-50">
          <div
            className={`totalitems ${Totoalitemshow ? "show-totalitems" : ""}`}
            style={{ borderTop: Totoalitemshow ? "1px solid black" : "" }}
          >
            <div>
              {" "}
              <p>22 ITEMS</p>
              <p>SHIPPING</p>
            </div>
            <div>
              {" "}
              <p>718.90 EUR</p>
              <p>19.95 EUR</p>
            </div>
          </div>
          <div
            className={`CartProccessView`}
            style={{ borderTop: !Totoalitemshow ? "1px solid black" : "" }}
          >
            <div className="CartPropssesstitle opacity-0"></div>
            <div className="CartProccesses">
              <div>
                <p>SHIPPING</p>
                <div>
                  <p>19.95 EUR</p>
                  <div className="CardFinalViewDataanditem">
                    {!Totoalitemshow && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-2 h-2 cursor-pointer"
                        onClick={Totalviewshow}
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {Totoalitemshow && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-2 h-2 cursor-pointer"
                        onClick={Totalviewfalse}
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <Link className="Cartcontinuebutton" to="/InterCardData">
                <button className="Contiun">CONTINUE</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order_Summary;
