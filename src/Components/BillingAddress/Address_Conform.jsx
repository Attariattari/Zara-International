import React, { useEffect, useRef, useState } from "react";
import Footer from "./../Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import "./Css.css";
import { countries } from "./../DummyData/Data";
import NavBar_Show_After_Cart from "../Navbar/NavBar_Show_After_Cart/NavBar_Show_After_Cart";

function Address_Conform() {
  const [focusedFields, setFocusedFields] = useState({
    firstName: false,
    lastName: false,
    address: false,
    addressSecond: false,
    cityTown: false,
    stateProvince: false,
    prefix: false,
    phoneNumber: false,
    zipCode: false,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    addressSecond: "",
    cityTown: "",
    stateProvince: "",
    prefix: "",
    phoneNumber: "",
    zipCode: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    addressSecond: "",
    cityTown: "",
    stateProvince: "",
    prefix: "",
    phoneNumber: "",
    zipCode: "",
  });

  useEffect(() => {
    const handleAutoFill = () => {
      const form = document.getElementById("billingForm");
      const inputs = form.querySelectorAll("input");

      const allFieldsFilled = Array.from(inputs).every(
        (input) => input.value !== ""
      );

      if (allFieldsFilled) {
        setFocusedFields({
          firstName: true,
          lastName: true,
          address: true,
          addressSecond: true,
          cityTown: true,
          stateProvince: true,
          prefix: true,
          phoneNumber: true,
          zipCode: true,
        });
      }
    };

    // Listen for changes in the form
    const form = document.getElementById("billingForm");
    form.addEventListener("change", handleAutoFill);

    // Clean up event listener
    return () => {
      form.removeEventListener("change", handleAutoFill);
    };
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (event) => {
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="sticky top-0 z-50" style={{ marginTop: "-9px" }}>
        <div
          className="absolute w-full "
          style={{
            backgroundColor: "var(--bg-color)",
          }}
        >
          <NavBar_Show_After_Cart />
        </div>
      </div>
      <div>
        <div className="Address_Conform">
          <div className="BillingArea">
            <div className="Billingtitle">
              <p>EDIT YOUR BILLING ADDRESS</p>
              <p>
                To place your order, you must first fill in your account
                details. You can change them in your account at any time.
              </p>
            </div>
            <div className="BillingInputArea" id="billingForm">
              <div className="BillingInputAreaFisrt">
                <div
                  className={`mb-4 relative ${
                    focusedFields.firstName
                      ? "border-b-1"
                      : "border-b-1 border-red-500"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.firstName ? "-z-10 top-5" : "")
                    }
                  >
                    FIRSTNAME
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="firstName"
                    type="text"
                    placeholder={!focusedFields.firstName ? "FIRSTNAME" : ""}
                    value={formData.firstName}
                    onFocus={() => handleInputFocus("firstName")}
                    onBlur={(ev) =>
                      handleInputBlur("firstName", ev.target.value)
                    }
                    onChange={handleInputChange}
                    style={{
                      borderBottom: focusedFields.firstName
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                    autoComplete="given-name"
                  />
                  {!focusedFields.firstName && errors.firstName && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.firstName}
                    </div>
                  )}
                </div>
                <div
                  className="Privacyslect"
                  style={{ borderBottom: "1px solid var(--border-color)" }}
                >
                  <label htmlFor="countrySelect">SEND TO</label>
                  <div className="select-container">
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={handleSelect}
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div
                  className={`mb-4 relative ${
                    focusedFields.address ? "" : "border-b-1 border-red-500"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.address ? "-z-10 top-5" : "")
                    }
                  >
                    ADDRESS
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="address"
                    type="text"
                    placeholder={!focusedFields.address ? "ADDRESS" : ""}
                    value={formData.address}
                    onFocus={() => handleInputFocus("address")}
                    onBlur={(ev) => handleInputBlur("address", ev.target.value)}
                    onChange={handleInputChange}
                    style={{
                      borderBottom: focusedFields.address
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                  />

                  {!focusedFields.address && errors.address && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.address}
                    </div>
                  )}
                </div>
                <div
                  className={`mb-4 relative ${
                    focusedFields.cityTown
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.cityTown ? "-z-10 top-5" : "")
                    }
                  >
                    CITY/TOWN
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="Citytown"
                    type="city"
                    placeholder={!focusedFields.cityTown ? "CITY/TOWN" : ""}
                    onFocus={() => handleInputFocus("cityTown")}
                    onChange={handleInputChange}
                    onBlur={(ev) =>
                      handleInputBlur("cityTown", ev.target.value)
                    }
                    style={{
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                      borderBottom: focusedFields.cityTown
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                    }}
                  />
                  {!focusedFields.cityTown && errors.cityTown && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.cityTown}
                    </div>
                  )}
                </div>
                <div
                  className={`mb-4 relative ${
                    focusedFields.stateProvince
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.stateProvince ? "-z-10 top-5" : "")
                    }
                  >
                    STATE/PROVINCE
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="Stateprovince"
                    type="text"
                    placeholder={
                      !focusedFields.stateProvince ? "STATE/PROVINCE" : ""
                    }
                    onFocus={() => handleInputFocus("stateProvince")}
                    onChange={handleInputChange}
                    onBlur={(ev) =>
                      handleInputBlur("stateProvince", ev.target.value)
                    }
                    style={{
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                      borderBottom: focusedFields.stateProvince
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                    }}
                  />
                  {!focusedFields.stateProvince && errors.stateProvince && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.stateProvince}
                    </div>
                  )}
                </div>
                <span className="BillingAndnumberarea">
                  <div
                    className={`mb-4 relative ${
                      focusedFields.prefix
                        ? "border-b-1 border-red-500"
                        : "border-b-1"
                    }`}
                  >
                    <label
                      className={
                        "absolute mb-3 text-[11px] transition-all duration-150 " +
                        (!focusedFields.prefix ? "-z-10 top-5" : "")
                      }
                    >
                      PREFIX
                    </label>
                    <input
                      className="pt-5 pb-2 outline-none w-full text-[11px]"
                      name="countryCode"
                      type="text"
                      placeholder={!focusedFields.prefix ? "PREFIX" : ""}
                      onFocus={() => handleInputFocus("prefix")}
                      onChange={handleInputChange}
                      onBlur={(ev) =>
                        handleInputBlur("prefix", ev.target.value)
                      }
                      style={{
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-color)",
                        borderBottom: focusedFields.prefix
                          ? "1px solid var(--border-color)"
                          : "1px solid var(--border-color)",
                      }}
                      autoComplete="country"
                    />
                    {!focusedFields.prefix && errors.prefix && (
                      <div
                        className="text-red-500 text-[11px]"
                        style={{
                          marginTop: "1px",
                        }}
                      >
                        {errors.prefix}
                      </div>
                    )}
                  </div>
                  <div
                    className={`mb-4 relative ${
                      focusedFields.phoneNumber
                        ? "border-b-1 border-red-500"
                        : "border-b-1"
                    }`}
                  >
                    <label
                      className={
                        "absolute mb-3 text-[11px] transition-all duration-150 " +
                        (!focusedFields.phoneNumber ? "-z-10 top-5" : "")
                      }
                    >
                      TELEPHONE
                    </label>
                    <input
                      className="pt-5 pb-2 outline-none w-full text-[11px]"
                      name="PhoneNumber"
                      type="phone"
                      placeholder={
                        !focusedFields.phoneNumber ? "TELEPHONE" : ""
                      }
                      onFocus={() => handleInputFocus("phoneNumber")}
                      onChange={handleInputChange}
                      onBlur={(ev) =>
                        handleInputBlur("phoneNumber", ev.target.value)
                      }
                      style={{
                        backgroundColor: "var(--bg-color)",
                        color: "var(--text-color)",
                        borderBottom: focusedFields.phoneNumber
                          ? "1px solid var(--border-color)"
                          : "1px solid var(--border-color)",
                      }}
                      autoComplete="phone"
                    />
                    {!focusedFields.phoneNumber && errors.phoneNumber && (
                      <div
                        className="text-red-500 text-[11px]"
                        style={{
                          marginTop: "1px",
                        }}
                      >
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>
                </span>
              </div>
              <div className="BillingInputAreaSecond">
                <div
                  className={`mb-4 relative ${
                    focusedFields.lastName
                      ? "border-b-1"
                      : "border-b-1 border-red-500"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.lastName ? "-z-10 top-5" : "")
                    }
                  >
                    LASTNAME
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="lastName"
                    type="text"
                    placeholder={!focusedFields.lastName ? "LASTNAME" : ""}
                    value={formData.lastName}
                    onFocus={() => handleInputFocus("lastName")}
                    onBlur={(ev) =>
                      handleInputBlur("lastName", ev.target.value)
                    }
                    onChange={handleInputChange}
                    style={{
                      borderBottom: focusedFields.lastName
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                    autoComplete="family-name"
                  />
                  {!focusedFields.lastName && errors.lastName && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.lastName}
                    </div>
                  )}
                </div>
                <div className="Privacyslecttwo opacity-0 disabled:true">
                  <label>SEND TO</label>
                  <select>
                    <option value="someOption">Aland Islands</option>
                    <option value="otherOption">Angola</option>
                    <option value="otherOption">Pakistan</option>
                    <option value="otherOption">India</option>
                    <option value="otherOption">Iran</option>
                    <option value="otherOption">Afganistan</option>
                    <option value="otherOption">China</option>
                    <option value="otherOption">Bangladash</option>
                  </select>
                </div>
                <div
                  className={`mb-4 relative ${
                    focusedFields.addressSecond
                      ? "border-b-1"
                      : "border-b-1 border-red-500"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.addressSecond ? "-z-10 top-5" : "")
                    }
                  >
                    ADDRESS 2
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="addressSecond"
                    type="text"
                    placeholder={
                      !focusedFields.addressSecond ? "ADDRESS 2" : ""
                    }
                    value={formData.addressSecond}
                    onFocus={() => handleInputFocus("addressSecond")}
                    onBlur={(ev) =>
                      handleInputBlur("addressSecond", ev.target.value)
                    }
                    onChange={handleInputChange}
                    style={{
                      borderBottom: focusedFields.addressSecond
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                    autoComplete="address-line2"
                  />
                  {!focusedFields.addressSecond && errors.addressSecond && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.addressSecond}
                    </div>
                  )}
                </div>
                <div
                  className={`mb-4 relative ${
                    focusedFields.zipCode
                      ? "border-b-1"
                      : "border-b-1 border-red-500"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFields.zipCode ? "-z-10 top-5" : "")
                    }
                  >
                    POSTCODE/ZIP
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="zipCode"
                    type="text"
                    placeholder={!focusedFields.zipCode ? "POSTCODE/ZIP" : ""}
                    value={formData.zipCode}
                    onFocus={() => handleInputFocus("zipCode")}
                    onBlur={(ev) => handleInputBlur("zipCode", ev.target.value)}
                    onChange={handleInputChange}
                    style={{
                      borderBottom: focusedFields.zipCode
                        ? "1px solid var(--border-color)"
                        : "1px solid var(--border-color)",
                      backgroundColor: "var(--bg-color)",
                      color: "var(--text-color)",
                    }}
                    autoComplete="postal-code"
                  />
                  {!focusedFields.zipCode && errors.zipCode && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.zipCode}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="sticky bottom-0 z-50">
        <div className="CartpropccessOrder">
          <div className="CartPropssesstitle opacity-0">
            *By continuing, I declare that I have read and accept the Purchase
            Conditions and understand Zara's Privacy and Cookie Policy.
          </div>
          <div className="CartProccesses">
            <div>
              <p>SHIPPING</p>
              <p>19.95 EUR</p>
            </div>
            <Link className="Cartcontinuebutton" to="/method-selection">
              <button className="Contiun">CONTINUE</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address_Conform;
