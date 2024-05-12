import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Order_Summary.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

const Order_Summary = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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

  const Totalviewshow = () => {
    setTotoalitemshow(true);
  };

  const Totalviewfalse = () => {
    setTotoalitemshow(false);
  };
  const Expendfortotal = () => {
    setExpendview(!expendview);
  };

  return (
    <div>
      <div className={`sticky top-0 z-10 ${isScrolled ? "bg-white" : ""}`}>
        <div className="absolute w-full">
          <Navbar />
        </div>
      </div>
      <div className="Order_Summary">
        <div className="Order_Summary_Main">
          <div className="Order_Summary_Title_Main">
            <p className="Order_Summary_Title">
              If import costs are not included in your order, you will need to
              pay them locally.
            </p>
          </div>
          <div className="Order_Summary_Data">
            <div className="Order_Summary_DELIVERY_Payment">
              <div className="Order_Summary_DELIVERY">
                <p>DELIVERY</p>
                <div className="Order_Summary_DELIVERY_Child">
                  <div className="Order_Summary_DELIVERY_Child_one">
                    <p>
                      EXPRESS HOME DELIVERY · THURSDAY 16, MAY - TUESDAY 21, MAY
                    </p>
                    <div className="Order_Summart_Edit">
                      <Link>EDIT</Link>
                    </div>
                  </div>
                  <div className="Order_Summary_DELIVERY_Child_Two">
                   
                  </div>
                </div>
              </div>
              <div>PAYMENT</div>
            </div>
            <div className="Order_Summary_Shipping">SHIPPING DETAILS </div>
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
                to="/Order_Summary"
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

export default Order_Summary;
