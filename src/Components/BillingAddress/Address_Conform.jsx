import React, { useEffect, useRef, useState } from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "./../Footer/Footer";
import { Link } from "react-router-dom";
import "./Css.css";
import { countries } from "./../DummyData/Data";

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
                        ? "1px solid black"
                        : "1px solid black",
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
                    focusedFields.address
                      ? "border-b-1"
                      : "border-b-1 border-red-500"
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
                        ? "1px solid black"
                        : "1px solid black",
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
                      borderBottom: focusedFields.cityTown
                        ? "1px solid black"
                        : "1px solid black",
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
                      borderBottom: focusedFields.stateProvince
                        ? "1px solid black"
                        : "1px solid black",
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
                        borderBottom: focusedFields.prefix
                          ? "1px solid black"
                          : "1px solid black",
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
                      placeholder={!focusedFields.phoneNumber ? "TELEPHONE" : ""}
                      onFocus={() => handleInputFocus("phoneNumber")}
                      onChange={handleInputChange}
                      onBlur={(ev) =>
                        handleInputBlur("phoneNumber", ev.target.value)
                      }
                      style={{
                        borderBottom: focusedFields.phoneNumber
                          ? "1px solid black"
                          : "1px solid black",
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
                    FIRSTNAME
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
                        ? "1px solid black"
                        : "1px solid black",
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
                    placeholder={!focusedFields.addressSecond ? "ADDRESS 2" : ""}
                    value={formData.addressSecond}
                    onFocus={() => handleInputFocus("addressSecond")}
                    onBlur={(ev) => handleInputBlur("addressSecond", ev.target.value)}
                    onChange={handleInputChange}
                    style={{
                      borderBottom: focusedFields.addressSecond
                        ? "1px solid black"
                        : "1px solid black",
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
                        ? "1px solid black"
                        : "1px solid black",
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

// import React, { useRef, useState } from "react";
// import Navbar from "./../Navbar/Navbar";
// import Footer from "./../Footer/Footer";
// import { Link } from "react-router-dom";
// import "./Css.css";
// import { countries } from "./../DummyData/Data";
// function validateName(value) {
//   let error;
//   if (!value) {
//     error = "Required!";
//   } else if (a) {
//     error = "Invalid Name address";
//   }
//   return error;
// }

// function validatePassword(value) {
//   let error;
//   if (value.length < 6) {
//     error = "Invalid Password!";
//   }
//   return error;
// }
// function Address_Conform() {
//   const [focusedFisrtName, setFocusedFisrtName] = useState(false);
//   const [focusedLastName, setFocusedLastName] = useState(false);
//   const [focusedADDRESS, setFocusedADDRESS] = useState(false);
//   const [focusedADDRESSSECOND, setFocusedADDRESSSECOND] = useState(false);
//   const [focusedCitytown, setFocusedCitytown] = useState(false);
//   const [focusedStateprovince, setFocusedStateprovince] = useState(false);
//   const [focusedPREFIX, setfocusedPREFIX] = useState(false);
//   const [focusedPhoneNumber, setfocusedPhoneNumber] = useState(false);
//   const [focusedZIPCODE, setfocusedZIPCODE] = useState(false);
//   const [errors, setErrors] = useState({
//     FirstName: "",
//     Lastname: "",
//     password: "",
//     ADDRESS: "",
//     ADDRESSSECOND: "",
//     Citytown: "",
//     Stateprovince: "",
//     PREFIX: "",
//     PhoneNumber: "",
//     ZIPCODE: "",
//   });
//   const [selectedCountry, setSelectedCountry] = useState("");

//   const handleSelect = (event) => {
//     setSelectedCountry(event.target.value);
//   };
//   return (
//     <div>
//       <div className="sticky top-0 z-50" style={{ marginTop: "-9px" }}>
//         <div className="absolute w-full bg-white">
//           <Navbar />
//         </div>
//       </div>
//       <div>
//         <div className="Address_Conform">
//           <div className="BillingArea">
//             <div className="Billingtitle">
//               <p>EDIT YOUR BILLING ADDRESS</p>
//               <p>
//                 To place your order, you must first fill in your account
//                 details. You can change them in your account at any time.
//               </p>
//             </div>
//             <div className="BillingInputArea">
//               <div className="BillingInputAreaFisrt">
//                 <div
//                   className={`mb-4 relative ${
//                     errors.FirstName
//                       ? "border-b-1 border-red-500"
//                       : "border-b-1"
//                   }`}
//                 >
//                   <label
//                     className={
//                       "absolute mb-3 text-[11px] transition-all duration-150 " +
//                       (!focusedFisrtName ? "-z-10 top-5" : "")
//                     }
//                   >
//                     FIRSTNAME
//                   </label>
//                   <input
//                     className="pt-5 pb-2 outline-none w-full text-[11px]"
//                     name="firstname"
//                     type="text"
//                     placeholder={!focusedFisrtName ? "FIRSTNAME" : ""}
//                     onFocus={() => setFocusedFisrtName(true)}
//                     onBlur={(ev) => {
//                       if (ev.target.value.length === 0)
//                         setFocusedFisrtName(false);
//                       setErrors({
//                         ...errors,
//                         FirstName: validateName(ev.target.value),
//                       });
//                     }}
//                     style={{
//                       borderBottom: errors.FirstName
//                         ? "1px solid red"
//                         : "1px solid black",
//                     }}
//                     autoComplete="given-name"
//                   />
//                   {errors.FirstName && (
//                     <div
//                       className="text-red-500 text-[11px]"
//                       style={{
//                         marginTop: "1px",
//                       }}
//                     >
//                       {errors.FirstName}
//                     </div>
//                   )}
//                 </div>
//                 <div className="Privacyslect">
//                   <label htmlFor="countrySelect">SEND TO</label>
//                   <span className="select-container">
//                     <select
//                       id="country"
//                       value={selectedCountry}
//                       onChange={handleSelect}
//                     >
//                       {/* Render options for each country */}
//                       {countries.map((country) => (
//                         <option key={country.code} value={country.code}>
//                           {country.name}
//                         </option>
//                       ))}
//                     </select>
//                   </span>
//                 </div>
//                 <div
//                   className={`mb-4 relative ${
//                     errors.ADDRESS ? "border-b-1 border-red-500" : "border-b-1"
//                   }`}
//                 >
//                   <label
//                     className={
//                       "absolute mb-3 text-[11px] transition-all duration-150 " +
//                       (!focusedADDRESS ? "-z-10 top-5" : "")
//                     }
//                   >
//                     ADDRESS
//                   </label>
//                   <input
//                     className="pt-5 pb-2 outline-none w-full text-[11px]"
//                     name="ADDRESS"
//                     type="address"
//                     placeholder={!focusedADDRESS ? "ADDRESS" : ""}
//                     onFocus={() => setFocusedADDRESS(true)}
//                     onBlur={(ev) => {
//                       if (ev.target.value.length === 0)
//                         setFocusedADDRESS(false);
//                       setErrors({
//                         ...errors,
//                         ADDRESS: validateADDRESS(ev.target.value),
//                       });
//                     }}
//                     style={{
//                       borderBottom: errors.ADDRESS
//                         ? "1px solid red"
//                         : "1px solid black",
//                     }}
//                   />
//                   {errors.ADDRESS && (
//                     <div
//                       className="text-red-500 text-[11px]"
//                       style={{
//                         marginTop: "1px",
//                       }}
//                     >
//                       {errors.ADDRESS}
//                     </div>
//                   )}
//                 </div>
//                 <div
//                   className={`mb-4 relative ${
//                     errors.Citytown ? "border-b-1 border-red-500" : "border-b-1"
//                   }`}
//                 >
//                   <label
//                     className={
//                       "absolute mb-3 text-[11px] transition-all duration-150 " +
//                       (!focusedCitytown ? "-z-10 top-5" : "")
//                     }
//                   >
//                     CITY/TOWN
//                   </label>
//                   <input
//                     className="pt-5 pb-2 outline-none w-full text-[11px]"
//                     name="Citytown"
//                     type="city"
//                     placeholder={!focusedCitytown ? "CITY/TOWN" : ""}
//                     onFocus={() => setFocusedCitytown(true)}
//                     onBlur={(ev) => {
//                       if (ev.target.value.length === 0)
//                         setFocusedCitytown(false);
//                       setErrors({
//                         ...errors,
//                         Citytown: validateCitytown(ev.target.value),
//                       });
//                     }}
//                     style={{
//                       borderBottom: errors.Citytown
//                         ? "1px solid red"
//                         : "1px solid black",
//                     }}
//                   />
//                   {errors.Citytown && (
//                     <div
//                       className="text-red-500 text-[11px]"
//                       style={{
//                         marginTop: "1px",
//                       }}
//                     >
//                       {errors.Citytown}
//                     </div>
//                   )}
//                 </div>
//                 <div
//                   className={`mb-4 relative ${
//                     errors.Stateprovince
//                       ? "border-b-1 border-red-500"
//                       : "border-b-1"
//                   }`}
//                 >
//                   <label
//                     className={
//                       "absolute mb-3 text-[11px] transition-all duration-150 " +
//                       (!focusedStateprovince ? "-z-10 top-5" : "")
//                     }
//                   >
//                     STATE/PROVINCE
//                   </label>
//                   <input
//                     className="pt-5 pb-2 outline-none w-full text-[11px]"
//                     name="Stateprovince"
//                     type="state"
//                     placeholder={!focusedStateprovince ? "STATE/PROVINCE" : ""}
//                     onFocus={() => setFocusedStateprovince(true)}
//                     onBlur={(ev) => {
//                       if (ev.target.value.length === 0)
//                         setFocusedStateprovince(false);
//                       setErrors({
//                         ...errors,
//                         Stateprovince: validateStateprovince(ev.target.value),
//                       });
//                     }}
//                     style={{
//                       borderBottom: errors.Stateprovince
//                         ? "1px solid red"
//                         : "1px solid black",
//                     }}
//                   />
//                   {errors.Stateprovince && (
//                     <div
//                       className="text-red-500 text-[11px]"
//                       style={{
//                         marginTop: "1px",
//                       }}
//                     >
//                       {errors.Stateprovince}
//                     </div>
//                   )}
//                 </div>
//                 <span className="BillingAndnumberarea">
//                   <div
//                     className={`mb-4 relative ${
//                       errors.PREFIX ? "border-b-1 border-red-500" : "border-b-1"
//                     }`}
//                   >
//                     <label
//                       className={
//                         "absolute mb-3 text-[11px] transition-all duration-150 " +
//                         (!focusedPREFIX ? "-z-10 top-5" : "")
//                       }
//                     >
//                       PREFIX
//                     </label>
//                     <input
//                       className="pt-5 pb-2 outline-none w-full text-[11px]"
//                       name="countryCode"
//                       type="text"
//                       placeholder={!focusedPREFIX ? "PREFIX" : ""}
//                       onFocus={() => setfocusedPREFIX(true)}
//                       onBlur={(ev) => {
//                         if (ev.target.value.length === 0)
//                           setfocusedPREFIX(false);
//                         setErrors({
//                           ...errors,
//                           PREFIX: validatefocusedPREFIX(ev.target.value),
//                         });
//                       }}
//                       style={{
//                         borderBottom: errors.PREFIX
//                           ? "1px solid red"
//                           : "1px solid black",
//                       }}
//                       autoComplete="country"
//                     />
//                     {errors.PREFIX && (
//                       <div
//                         className="text-red-500 text-[11px]"
//                         style={{
//                           marginTop: "1px",
//                         }}
//                       >
//                         {errors.PREFIX}
//                       </div>
//                     )}
//                   </div>
//                   <div
//                     className={`mb-4 relative ${
//                       errors.PhoneNumber
//                         ? "border-b-1 border-red-500"
//                         : "border-b-1"
//                     }`}
//                   >
//                     <label
//                       className={
//                         "absolute mb-3 text-[11px] transition-all duration-150 " +
//                         (!focusedPhoneNumber ? "-z-10 top-5" : "")
//                       }
//                     >
//                       TELEPHONE
//                     </label>
//                     <input
//                       className="pt-5 pb-2 outline-none w-full text-[11px]"
//                       name="PhoneNumber"
//                       type="phone"
//                       placeholder={!focusedPhoneNumber ? "TELEPHONE" : ""}
//                       onFocus={() => setfocusedPhoneNumber(true)}
//                       onBlur={(ev) => {
//                         if (ev.target.value.length === 0)
//                           setfocusedPhoneNumber(false);
//                         setErrors({
//                           ...errors,
//                           PhoneNumber: validatePhoneNumber(ev.target.value),
//                         });
//                       }}
//                       style={{
//                         borderBottom: errors.PhoneNumber
//                           ? "1px solid red"
//                           : "1px solid black",
//                       }}
//                     />
//                     {errors.PhoneNumber && (
//                       <div
//                         className="text-red-500 text-[11px]"
//                         style={{
//                           marginTop: "1px",
//                         }}
//                       >
//                         {errors.PhoneNumber}
//                       </div>
//                     )}
//                   </div>
//                 </span>
//               </div>
//               <div className="BillingInputAreaSecond">
//                 <div
//                   className={`mb-4 relative ${
//                     errors.Lastname ? "border-b-1 border-red-500" : "border-b-1"
//                   }`}
//                 >
//                   <label
//                     className={
//                       "absolute mb-3 text-[11px] transition-all duration-150 " +
//                       (!focusedLastName ? "-z-10 top-5" : "")
//                     }
//                   >
//                     LASTNAME
//                   </label>
//                   <input
//                     className="pt-5 pb-2 outline-none w-full text-[11px]"
//                     name="lastname"
//                     type="text"
//                     placeholder={!focusedLastName ? "LASTNAME" : ""}
//                     onFocus={() => setFocusedLastName(true)}
//                     onBlur={(ev) => {
//                       if (ev.target.value.length === 0)
//                         setFocusedLastName(false);
//                       setErrors({
//                         ...errors,
//                         Lastname: validateName(ev.target.value),
//                       });
//                     }}
//                     style={{
//                       borderBottom: errors.Lastname
//                         ? "1px solid red"
//                         : "1px solid black",
//                     }}
//                     autoComplete="family-name"
//                   />
//                   {errors.Lastname && (
//                     <div
//                       className="text-red-500 text-[11px]"
//                       style={{
//                         marginTop: "1px",
//                       }}
//                     >
//                       {errors.Lastname}
//                     </div>
//                   )}
//                 </div>
//                 <div className="Privacyslect opacity-0">
//                   <label>SEND TO</label>
//                   <select>
//                     <option value="someOption">Aland Islands</option>
//                     <option value="otherOption">Angola</option>
//                     <option value="otherOption">Pakistan</option>
//                     <option value="otherOption">India</option>
//                     <option value="otherOption">Iran</option>
//                     <option value="otherOption">Afganistan</option>
//                     <option value="otherOption">China</option>
//                     <option value="otherOption">Bangladash</option>
//                   </select>
//                 </div>
//                 <div
//                   className={`mb-4 relative ${
//                     errors.ADDRESSSECOND
//                       ? "border-b-1 border-red-500"
//                       : "border-b-1"
//                   }`}
//                 >
//                   <label
//                     className={
//                       "absolute mb-3 text-[11px] transition-all duration-150 " +
//                       (!focusedADDRESSSECOND ? "-z-10 top-5" : "")
//                     }
//                   >
//                     ADDRESS 2
//                   </label>
//                   <input
//                     className="pt-5 pb-2 outline-none w-full text-[11px]"
//                     name="addresssecond"
//                     type="text"
//                     placeholder={!focusedADDRESSSECOND ? "ADDRESS 2" : ""}
//                     onFocus={() => setFocusedADDRESSSECOND(true)}
//                     onBlur={(ev) => {
//                       if (ev.target.value.length === 0)
//                         setFocusedADDRESSSECOND(false);
//                       setErrors({
//                         ...errors,
//                         ADDRESSSECOND: validateADDRESS(ev.target.value),
//                       });
//                     }}
//                     style={{
//                       borderBottom: errors.ADDRESSSECOND
//                         ? "1px solid red"
//                         : "1px solid black",
//                     }}
//                     autoComplete="address-line2" // This line adds Google Autofill support for the second address
//                   />
//                 </div>
//                 <div
//                   className={`mb-4 relative ${
//                     errors.ZIPCODE ? "border-b-1 border-red-500" : "border-b-1"
//                   }`}
//                 >
//                   <label
//                     className={
//                       "absolute mb-3 text-[11px] transition-all duration-150 " +
//                       (!focusedZIPCODE ? "-z-10 top-5" : "")
//                     }
//                   >
//                     POSTCODE/ZIP
//                   </label>
//                   <input
//                     className="pt-5 pb-2 outline-none w-full text-[11px]"
//                     name="zipCode"
//                     type="text"
//                     placeholder={!focusedZIPCODE ? "POSTCODE/ZIP" : ""}
//                     onFocus={() => setfocusedZIPCODE(true)}
//                     onBlur={(ev) => {
//                       if (ev.target.value.length === 0)
//                         setfocusedZIPCODE(false);
//                       setErrors({
//                         ...errors,
//                         ZIPCODE: validateADDRESS(ev.target.value),
//                       });
//                     }}
//                     style={{
//                       borderBottom: errors.ZIPCODE
//                         ? "1px solid red"
//                         : "1px solid black",
//                     }}
//                     autoComplete="postal-code"
//                   />
//                   {errors.ZIPCODE && (
//                     <div
//                       className="text-red-500 text-[11px]"
//                       style={{
//                         marginTop: "1px",
//                       }}
//                     >
//                       {errors.ZIPCODE}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//       <div className="sticky bottom-0 z-50">
//         <div className="CartpropccessOrder">
//           <div className="CartProccesses">
//             <div>
//               <div>TOTAL</div>
//               <div className="flex-col">
//                 <div className="pl-4">899.50 EUR</div>
//                 <div
//                   className="text-gray-700"
//                   style={{
//                     fontSize: "9px",
//                   }}
//                 >
//                   * BEFORE TAXES
//                 </div>
//               </div>
//             </div>
//             <Link className="Cartcontinuebutton" to="/Address_Conform">
//               <button className="Contiun">CONTINUE</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Address_Conform;
