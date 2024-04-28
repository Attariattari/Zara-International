import React, { useRef, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Link } from "react-router-dom";
import "./Css.css";
import { countries } from "./../DummyData/Data";
function validateName(value) {
  let error;
  if (!value) {
    error = "Required!";
  } else if (a) {
    error = "Invalid Name address";
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (value.length < 6) {
    error = "Invalid Password!";
  }
  return error;
}
function Address_Conform() {
  const [focusedFisrtName, setFocusedFisrtName] = useState(false);
  const [focusedLastName, setFocusedLastName] = useState(false);
  const [focusedADDRESS, setFocusedADDRESS] = useState(false);
  const [focusedADDRESSSECOND, setFocusedADDRESSSECOND] = useState(false);
  const [focusedCitytown, setFocusedCitytown] = useState(false);
  const [focusedStateprovince, setFocusedStateprovince] = useState(false);
  const [focusedPREFIX, setfocusedPREFIX] = useState(false);
  const [focusedPhoneNumber, setfocusedPhoneNumber] = useState(false);
  const [focusedZIPCODE, setfocusedZIPCODE] = useState(false);
  const [errors, setErrors] = useState({
    FirstName: "",
    Lastname: "",
    password: "",
    ADDRESS: "",
    ADDRESSSECOND: "",
    Citytown: "",
    Stateprovince: "",
    PREFIX: "",
    PhoneNumber: "",
    ZIPCODE: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleSelect = (event) => {
    setSelectedCountry(event.target.value);
  };
  return (
    <div>
      <div className="sticky top-0 z-50" style={{ marginTop: "-9px" }}>
        <div className="absolute w-full bg-white">
          <Navbar />
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
            <div className="BillingInputArea">
              <div className="BillingInputAreaFisrt">
                <div
                  className={`mb-4 relative ${
                    errors.FirstName
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedFisrtName ? "-z-10 top-5" : "")
                    }
                  >
                    FIRSTNAME
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="firstname"
                    type="text"
                    placeholder={!focusedFisrtName ? "FIRSTNAME" : ""}
                    onFocus={() => setFocusedFisrtName(true)}
                    onBlur={(ev) => {
                      if (ev.target.value.length === 0)
                        setFocusedFisrtName(false);
                      setErrors({
                        ...errors,
                        FirstName: validateName(ev.target.value),
                      });
                    }}
                    style={{
                      borderBottom: errors.FirstName
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                    autoComplete="given-name"
                  />
                  {errors.FirstName && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.FirstName}
                    </div>
                  )}
                </div>
                <div className="Privacyslect">
                  <label htmlFor="countrySelect">SEND TO</label>
                  <span className="select-container">
                    <select
                      id="country"
                      value={selectedCountry}
                      onChange={handleSelect}
                    >
                      {/* Render options for each country */}
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>
                <div
                  className={`mb-4 relative ${
                    errors.ADDRESS ? "border-b-1 border-red-500" : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedADDRESS ? "-z-10 top-5" : "")
                    }
                  >
                    ADDRESS
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="ADDRESS"
                    type="address"
                    placeholder={!focusedADDRESS ? "ADDRESS" : ""}
                    onFocus={() => setFocusedADDRESS(true)}
                    onBlur={(ev) => {
                      if (ev.target.value.length === 0)
                        setFocusedADDRESS(false);
                      setErrors({
                        ...errors,
                        ADDRESS: validateADDRESS(ev.target.value),
                      });
                    }}
                    style={{
                      borderBottom: errors.ADDRESS
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                  />
                  {errors.ADDRESS && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.ADDRESS}
                    </div>
                  )}
                </div>
                <div
                  className={`mb-4 relative ${
                    errors.Citytown ? "border-b-1 border-red-500" : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedCitytown ? "-z-10 top-5" : "")
                    }
                  >
                    CITY/TOWN
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="Citytown"
                    type="city"
                    placeholder={!focusedCitytown ? "CITY/TOWN" : ""}
                    onFocus={() => setFocusedCitytown(true)}
                    onBlur={(ev) => {
                      if (ev.target.value.length === 0)
                        setFocusedCitytown(false);
                      setErrors({
                        ...errors,
                        Citytown: validateCitytown(ev.target.value),
                      });
                    }}
                    style={{
                      borderBottom: errors.Citytown
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                  />
                  {errors.Citytown && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.Citytown}
                    </div>
                  )}
                </div>
                <div
                  className={`mb-4 relative ${
                    errors.Stateprovince
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedStateprovince ? "-z-10 top-5" : "")
                    }
                  >
                    STATE/PROVINCE
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="Stateprovince"
                    type="state"
                    placeholder={!focusedStateprovince ? "STATE/PROVINCE" : ""}
                    onFocus={() => setFocusedStateprovince(true)}
                    onBlur={(ev) => {
                      if (ev.target.value.length === 0)
                        setFocusedStateprovince(false);
                      setErrors({
                        ...errors,
                        Stateprovince: validateStateprovince(ev.target.value),
                      });
                    }}
                    style={{
                      borderBottom: errors.Stateprovince
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                  />
                  {errors.Stateprovince && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.Stateprovince}
                    </div>
                  )}
                </div>
                <span className="BillingAndnumberarea">
                  <div
                    className={`mb-4 relative ${
                      errors.PREFIX ? "border-b-1 border-red-500" : "border-b-1"
                    }`}
                  >
                    <label
                      className={
                        "absolute mb-3 text-[11px] transition-all duration-150 " +
                        (!focusedPREFIX ? "-z-10 top-5" : "")
                      }
                    >
                      PREFIX
                    </label>
                    <input
                      className="pt-5 pb-2 outline-none w-full text-[11px]"
                      name="countryCode"
                      type="text"
                      placeholder={!focusedPREFIX ? "PREFIX" : ""}
                      onFocus={() => setfocusedPREFIX(true)}
                      onBlur={(ev) => {
                        if (ev.target.value.length === 0)
                          setfocusedPREFIX(false);
                        setErrors({
                          ...errors,
                          PREFIX: validatefocusedPREFIX(ev.target.value),
                        });
                      }}
                      style={{
                        borderBottom: errors.PREFIX
                          ? "1px solid red"
                          : "1px solid black",
                      }}
                      autoComplete="country"
                    />
                    {errors.PREFIX && (
                      <div
                        className="text-red-500 text-[11px]"
                        style={{
                          marginTop: "1px",
                        }}
                      >
                        {errors.PREFIX}
                      </div>
                    )}
                  </div>
                  <div
                    className={`mb-4 relative ${
                      errors.PhoneNumber
                        ? "border-b-1 border-red-500"
                        : "border-b-1"
                    }`}
                  >
                    <label
                      className={
                        "absolute mb-3 text-[11px] transition-all duration-150 " +
                        (!focusedPhoneNumber ? "-z-10 top-5" : "")
                      }
                    >
                      TELEPHONE
                    </label>
                    <input
                      className="pt-5 pb-2 outline-none w-full text-[11px]"
                      name="PhoneNumber"
                      type="phone"
                      placeholder={!focusedPhoneNumber ? "TELEPHONE" : ""}
                      onFocus={() => setfocusedPhoneNumber(true)}
                      onBlur={(ev) => {
                        if (ev.target.value.length === 0)
                          setfocusedPhoneNumber(false);
                        setErrors({
                          ...errors,
                          PhoneNumber: validatePhoneNumber(ev.target.value),
                        });
                      }}
                      style={{
                        borderBottom: errors.PhoneNumber
                          ? "1px solid red"
                          : "1px solid black",
                      }}
                    />
                    {errors.PhoneNumber && (
                      <div
                        className="text-red-500 text-[11px]"
                        style={{
                          marginTop: "1px",
                        }}
                      >
                        {errors.PhoneNumber}
                      </div>
                    )}
                  </div>
                </span>
              </div>
              <div className="BillingInputAreaSecond">
                <div
                  className={`mb-4 relative ${
                    errors.Lastname ? "border-b-1 border-red-500" : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedLastName ? "-z-10 top-5" : "")
                    }
                  >
                    LASTNAME
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="lastname"
                    type="text"
                    placeholder={!focusedLastName ? "LASTNAME" : ""}
                    onFocus={() => setFocusedLastName(true)}
                    onBlur={(ev) => {
                      if (ev.target.value.length === 0)
                        setFocusedLastName(false);
                      setErrors({
                        ...errors,
                        Lastname: validateName(ev.target.value),
                      });
                    }}
                    style={{
                      borderBottom: errors.Lastname
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                    autoComplete="family-name"
                  />
                  {errors.Lastname && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.Lastname}
                    </div>
                  )}
                </div>
                <div className="Privacyslect opacity-0">
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
                    errors.ADDRESSSECOND
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedADDRESSSECOND ? "-z-10 top-5" : "")
                    }
                  >
                    ADDRESS 2
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="addresssecond"
                    type="text"
                    placeholder={!focusedADDRESSSECOND ? "ADDRESS 2" : ""}
                    onFocus={() => setFocusedADDRESSSECOND(true)}
                    onBlur={(ev) => {
                      if (ev.target.value.length === 0)
                        setFocusedADDRESSSECOND(false);
                      setErrors({
                        ...errors,
                        ADDRESSSECOND: validateADDRESS(ev.target.value),
                      });
                    }}
                    style={{
                      borderBottom: errors.ADDRESSSECOND
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                    autoComplete="address-line2" // This line adds Google Autofill support for the second address
                  />
                </div>
                <div
                  className={`mb-4 relative ${
                    errors.ZIPCODE ? "border-b-1 border-red-500" : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-[11px] transition-all duration-150 " +
                      (!focusedZIPCODE ? "-z-10 top-5" : "")
                    }
                  >
                    POSTCODE/ZIP
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-[11px]"
                    name="zipCode"
                    type="text"
                    placeholder={!focusedZIPCODE ? "POSTCODE/ZIP" : ""}
                    onFocus={() => setfocusedZIPCODE(true)}
                    onBlur={(ev) => {
                      if (ev.target.value.length === 0)
                        setfocusedZIPCODE(false);
                      setErrors({
                        ...errors,
                        ZIPCODE: validateADDRESS(ev.target.value),
                      });
                    }}
                    style={{
                      borderBottom: errors.ZIPCODE
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                    autoComplete="postal-code" // This line adds Google Autofill support for the second address
                  />
                  {errors.ZIPCODE && (
                    <div
                      className="text-red-500 text-[11px]"
                      style={{
                        marginTop: "1px",
                      }}
                    >
                      {errors.ZIPCODE}
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
          <div className="CartProccesses">
            <div>
              <div>TOTAL</div>
              <div className="flex-col">
                <div className="pl-4">899.50 EUR</div>
                <div
                  className="text-gray-700"
                  style={{
                    fontSize: "9px",
                  }}
                >
                  * BEFORE TAXES
                </div>
              </div>
            </div>
            <Link className="Cartcontinuebutton" to="/Address_Conform">
              <button className="Contiun">CONTINUE</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address_Conform;
