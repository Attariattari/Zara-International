import React, { useEffect, useState } from "react";
import "./InterCardData.css";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import NavBar_Show_After_Cart from "../../Navbar/NavBar_Show_After_Cart/NavBar_Show_After_Cart";

const InterCardData = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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

  // Input Code Functions
  const handleInputFocus = (fieldName) => {
    setFocusedFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [fieldName]: "",
    }));
  };

  const handleInputBlur = (fieldName, value) => {
    if (!value) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: "Required!",
      }));
      setFocusedFields((prev) => ({
        ...prev,
        [fieldName]: false,
      }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [focusedFields, setFocusedFields] = useState({
    cardNumber: false,
    cardHolder: false,
    cardCVC: false,
  });

  useEffect(() => {
    // Other useEffect code...

    // Set a default value for cardYear if it's not already set
    if (!formData.cardYear) {
      setFormData((prev) => ({
        ...prev,
        cardYear: "", // Set an empty string as default to show "Select Year"
      }));
    }
  }, []);

  useEffect(() => {
    const handleAutoFill = () => {
      const form = document.getElementById("billingForm");
      const inputs = form.querySelectorAll("input, select");

      const allFieldsFilled = Array.from(inputs).every(
        (input) => input.value !== ""
      );

      if (allFieldsFilled) {
        setFocusedFields({
          cardNumber: true,
          cardHolder: true,
          cardCVC: true,
        });
      }
    };

    const form = document.getElementById("billingForm");
    form.addEventListener("change", handleAutoFill);

    return () => {
      form.removeEventListener("change", handleAutoFill);
    };
  }, []);

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardCVC: "",
    cardHolder: "",
    cardMonth: "",
    cardYear: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    cardCVC: "",
    cardMonth: "",
    cardHolder: "",
    cardYear: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const months = Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return { value: month, label: month };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { value: year, label: year };
  });
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
      <div className="InterCardData">
        <div className="InterCardData_Main_Area">
          <div className="InterCardData_Main_Area_Title">
            ENTER YOUR CARD DETAILS
          </div>
          <div className="InterCardData_Main_Area_Card">
            <div className="InterCardData_Main_Area_Card_Data" id="billingForm">
              <div className="InterCardData_Main_Area_Card_Data_First_Inputs">
                <div
                  className={`relative CARDNUMBER_INPUT i${
                    errors.cardNumber ? "border-red-500" : "border-b-1"
                  }`}
                >
                  <label
                    className={`absolute mb-3 text-[11px] transition-all duration-150 ${
                      focusedFields.cardNumber ? "" : "-z-10 top-5"
                    }`}
                  >
                    CARD NUMBER
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px] CARDNUMBERINPUT pr-10"
                    name="cardNumber"
                    type="text"
                    autoComplete="cc-number"
                    placeholder={focusedFields.cardNumber ? "" : "CARD NUMBER"}
                    value={formData.cardNumber}
                    onFocus={() => handleInputFocus("cardNumber")}
                    onBlur={(ev) =>
                      handleInputBlur("cardNumber", ev.target.value)
                    }
                    onChange={handleInputChange}
                    style={{
                      borderBottom: "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                  />
                  {!focusedFields.cardNumber && errors.cardNumber && (
                    <div className="text-red-500 text-[11px] flex gap-1 justify-start items-center mt-1">
                      <svg
                        className="form-input-error__icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        stroke="inherit"
                      >
                        <path d="M11.5 16.8v-1.2h1v1.2h-1zm0-9.6v7.2h1V7.2h-1z"></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 21.6a9.6 9.6 0 0 0 9.6-9.6 9.6 9.6 0 1 0-19.2 0 9.6 9.6 0 0 0 9.6 9.6zm0-1a8.6 8.6 0 1 0 0-17.2 8.6 8.6 0 0 0 0 17.2z"
                        ></path>
                      </svg>
                      {errors.cardNumber}
                    </div>
                  )}
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <img
                      src="https://static.zara.net/static/images/payment/NewIcon/Icons_Payment_Methods/Payments/SVG/icon-payment-visa_new.svg"
                      alt="Visa"
                      className="w-6 h-6"
                    />
                  </div>
                </div>
                <div className="InterCardData_Main_Area_Card_Data_MONTH_YEAR">
                  <div
                    className={`relative CARDMONTH_INPUT C${
                      focusedFields.cardMonth
                        ? "border-b-1"
                        : "border-b-1 border-red-500"
                    }`}
                  >
                    <label
                      className={
                        "absolute mb-3 text-[11px] transition-all duration-150 " +
                        (!focusedFields.cardMonth ? "-z-10 top-5" : "")
                      }
                    >
                      EXPIRY MONTH
                    </label>
                    <select
                      className="pt-5 pb-2 outline-none w-full text-[11px]"
                      name="cardMonth"
                      value={formData.cardMonth}
                      onChange={handleInputChange}
                      style={{
                        borderBottom: focusedFields.cardMonth
                          ? "1px solid var(--border-color)"
                          : "1px solid var(--border-color)",
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-color)",
                      }}
                    >
                      <option value="">Select Month</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    {!focusedFields.cardMonth && errors.cardMonth && (
                      <div
                        className="text-red-500 text-[11px]"
                        style={{
                          marginTop: "1px",
                        }}
                      >
                        {errors.cardMonth}
                      </div>
                    )}
                  </div>
                  <div
                    className={`relative CARDMONTH_INPUT C${
                      focusedFields.cardYear
                        ? "border-b-1"
                        : "border-b-1 border-red-500"
                    }`}
                  >
                    <label
                      className={
                        "absolute mb-3 text-[11px] transition-all duration-150 " +
                        (!focusedFields.cardYear ? "-z-10 top-5" : "")
                      }
                    >
                      EXPIRY YEAR
                    </label>
                    <select
                      className="pt-5 pb-2 outline-none w-full text-[11px]"
                      name="cardYear"
                      value={formData.cardYear}
                      onChange={handleInputChange}
                      style={{
                        borderBottom: focusedFields.cardYear
                          ? "1px solid var(--border-color)"
                          : "1px solid var(--border-color)",
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-color)",
                      }}
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                    {!focusedFields.cardYear && errors.cardYear && (
                      <div
                        className="text-red-500 text-[11px]"
                        style={{
                          marginTop: "1px",
                        }}
                      >
                        {errors.cardYear}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="InterCardData_Main_Area_Card_Data_Inputs_Second">
                <div
                  className={`relative Inputs_Seconds i${
                    focusedFields.cardHolder
                      ? "border-b-1"
                      : "border-b-1 border-red-500"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.cardHolder ? "-z-10 top-5" : "")
                    }
                  >
                    CARD HOLDER
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="cardHolder" // Set a unique name for the input field
                    autoComplete="email"
                    type="email"
                    placeholder={!focusedFields.cardHolder ? "CARD HOLDER" : ""}
                    value={formData.cardHolder}
                    onFocus={() => handleInputFocus("cardHolder")}
                    onBlur={(ev) =>
                      handleInputBlur("cardHolder", ev.target.value)
                    }
                    onChange={handleInputChange}
                    style={{
                      borderBottom: focusedFields.cardHolder
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                  />

                  {!focusedFields.cardHolder && errors.cardHolder && (
                    <div
                      className="text-red-500 text-[11px] flex gap-1 justify-start items-center"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      <svg
                        class="form-input-error__icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        stroke="inherit"
                      >
                        <path d="M11.5 16.8v-1.2h1v1.2h-1zm0-9.6v7.2h1V7.2h-1z"></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 21.6a9.6 9.6 0 0 0 9.6-9.6 9.6 9.6 0 1 0-19.2 0 9.6 9.6 0 0 0 9.6 9.6zm0-1a8.6 8.6 0 1 0 0-17.2 8.6 8.6 0 0 0 0 17.2z"
                        ></path>
                      </svg>
                      {errors.cardHolder}
                    </div>
                  )}
                </div>
                <div
                  className={`relative Inputs_Second i${
                    focusedFields.cardCVC
                      ? "border-b-1"
                      : "border-b-1 border-red-500"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.cardCVC ? "-z-10 top-5" : "")
                    }
                  >
                    CVV2 SECURITY CODE
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="cardCVC"
                    type="text"
                    autoComplete="cc-csc"
                    placeholder={
                      !focusedFields.cardCVC ? "CVV2 SECURITY CODE" : ""
                    }
                    value={formData.cardCVC}
                    onFocus={() => handleInputFocus("cardCVC")}
                    onBlur={(ev) => handleInputBlur("cardCVC", ev.target.value)}
                    onChange={handleInputChange}
                    style={{
                      borderBottom: focusedFields.cardCVC
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                  />
                  {!focusedFields.cardCVC && errors.cardCVC && (
                    <div
                      className="text-red-500 text-[11px] flex gap-1 justify-start items-center"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      <svg
                        class="form-input-error__icon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        stroke="inherit"
                      >
                        <path d="M11.5 16.8v-1.2h1v1.2h-1zm0-9.6v7.2h1V7.2h-1z"></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 21.6a9.6 9.6 0 0 0 9.6-9.6 9.6 9.6 0 1 0-19.2 0 9.6 9.6 0 0 0 9.6 9.6zm0-1a8.6 8.6 0 1 0 0-17.2 8.6 8.6 0 0 0 0 17.2z"
                        ></path>
                      </svg>
                      {errors.cardCVC}
                    </div>
                  )}
                </div>
              </div>
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
                to="#"
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
              <Link className="Cartcontinuebutton" to="#">
                <button className="Contiun">CONTINUE</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterCardData;
