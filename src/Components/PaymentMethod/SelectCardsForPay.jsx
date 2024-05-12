import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./SelectCardsForPay.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const SelectCardsForPay = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [Totoalitemshow, setTotoalitemshow] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expendview, setExpendview] = useState();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle card selection
  const handleCardClick = (card) => {
    setSelectedCard(card === selectedCard ? null : card);
  };

  const Totalviewshow = () => {
    setTotoalitemshow(true);
  };

  const Totalviewfalse = () => {
    setTotoalitemshow(false);
  };
  const Expendfortotal = () => {
    setExpendview(!expendview);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className={`sticky top-0 z-10 ${isScrolled ? "bg-white" : ""}`}>
        <div className="absolute w-full">
          <Navbar />
        </div>
      </div>
      <div className="SelectCardsForPay">
        <div className="CardDataArea">
          <p className="TitleCard">CHOOSE A PAYMENT METHOD</p>
          <div className="CardAbout">
            <p>
              If import costs are not included in your order, you will need to
              pay them locally.
            </p>
          </div>
          <div className="CardArea">
            <div
              className={selectedCard === "VISA" ? "selected" : ""}
              onClick={() => handleCardClick("VISA")}
            >
              <img
                src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-visa_new.svg"
                alt=""
              />
              <p>VISA</p>
            </div>
            <div
              className={selectedCard === "MASTERCARD" ? "selected" : ""}
              onClick={() => handleCardClick("MASTERCARD")}
            >
              <img
                src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-mastercard.svg"
                alt=""
              />
              <p>MASTERCARD</p>
            </div>
            <div
              className={selectedCard === "AMEX" ? "selected" : ""}
              onClick={() => handleCardClick("AMEX")}
            >
              <img
                src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-amex.svg"
                alt=""
              />
              <p>AMEX</p>
            </div>
            <div
              className={selectedCard === "PAYPAL" ? "selected" : ""}
              onClick={() => handleCardClick("PAYPAL")}
            >
              <img
                src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-paypal_new.svg"
                alt=""
              />
              <p>PAYPAL</p>
            </div>
          </div>
        </div>
      </div>
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
          {expendview && <div>hello</div>}

          <div className="CartMobileDataCountinues">
            <div className="CartProccesses">
              {!expendview && (
                <div className="CartProccessesTotal">
                  <p>TOTAL</p>
                  <p>19.95 EUR</p>
                </div>
              )}
              <Link
                className="Cartcontinuebutton"
                to="/SelectCardsForPay"
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
              <Link className="Cartcontinuebutton" to="/Order_Summary">
                <button className="Contiun">CONTINUE</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectCardsForPay;
