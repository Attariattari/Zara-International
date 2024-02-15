import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import "./Singup.css";
import axios from "axios";

function Singup() {
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedFirstName, setFocusedFirstName] = useState(false);
  const [focusedLastName, setFocusedLastName] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    receiveCommunications: false,
    readPrivacyPolicy: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Required Field!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  };

  const validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Required Field!";
    } else if (value.length < 6) {
      error = "Enter at least 6 characters";
    }
    return error;
  };

  const validateFirstName = (value) => {
    let error;
    if (!value) {
      error = "Required Field!";
    } else if (value.length < 4) {
      error = "Enter at least 4 characters";
    }
    return error;
  };

  const validateLastName = (value) => {
    let error;
    if (!value) {
      error = "Required Field!";
    } else if (value.length < 4) {
      error = "Enter at least 4 characters";
    }
    return error;
  };

  const buttonclick = async (values, actions) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/register`,
        values
      );
      console.log(response.data); // Handle the response data here
      // Optionally, you can redirect the user or perform other actions based on the response
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error, you can set error state or show an error message to the user
    } finally {
      actions.setSubmitting(false); // Reset the form submission state
    }
  };

  return (
    <div className="singup">
      <div className="singuparea">
        <p className="singuptext font-extralight">PERSONAL DETAILS</p>
        <Formik initialValues={userData} onSubmit={buttonclick}>
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <div
                className={`mb-4 relative ${
                  errors.email ? "border-b-1 border-red-500" : "border-b-1"
                }`}
              >
                <label
                  className={
                    "absolute mb-3 text-xs transition-all duration-150 " +
                    (!focusedEmail ? "-z-10 top-5" : "top-1")
                  }
                >
                  Email
                </label>
                <input
                  className="pt-5 pb-2 outline-none w-full text-xs"
                  name="email"
                  type="email"
                  placeholder={!focusedEmail ? "Email" : ""}
                  value={formikProps.values.email}
                  onChange={formikProps.handleChange}
                  validate={validateEmail}
                  onFocus={() => setFocusedEmail(true)}
                  onBlur={(ev) => {
                    if (ev.target.value.length === 0) setFocusedEmail(false);
                    setErrors({
                      ...errors,
                      email: validateEmail(ev.target.value),
                    });
                  }}
                  style={{
                    borderBottom: errors.email
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                />
                {errors.email && (
                  <div className="text-red-500 text-xs absolute">
                    {errors.email}
                  </div>
                )}
              </div>
              <div
                className={`mb-4 relative ${
                  errors.password ? "border-b-1 border-red-500" : "border-b-1"
                }`}
              >
                <label
                  className={
                    "absolute mb-3 text-xs transition-all duration-150 " +
                    (!focusedPassword ? "-z-10 top-5" : "top-1")
                  }
                >
                  Password
                </label>
                <input
                  className="pt-5 pb-2 outline-none w-full text-xs"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={!focusedPassword ? "Password" : ""}
                  value={formikProps.values.password}
                  onChange={formikProps.handleChange}
                  validate={validatePassword}
                  onFocus={() => setFocusedPassword(true)}
                  onBlur={(ev) => {
                    if (ev.target.value.length === 0) setFocusedPassword(false);
                    setErrors({
                      ...errors,
                      password: validatePassword(ev.target.value),
                    });
                  }}
                  style={{
                    borderBottom: errors.password
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                />
                {showPassword ? (
                  <IoIosEyeOff
                    className="absolute right-0 top-6 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <IoIosEye
                    className="absolute right-0 top-6 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
                {errors.password && (
                  <div className="text-red-500 text-xs absolute">
                    {errors.password}
                  </div>
                )}
              </div>
              <div
                className={`mb-4 relative ${
                  errors.firstName ? "border-b-1 border-red-500" : "border-b-1"
                }`}
              >
                <label
                  className={
                    "absolute mb-3 text-xs transition-all duration-150 " +
                    (!focusedFirstName ? "-z-10 top-5" : "top-1")
                  }
                >
                  First Name
                </label>
                <input
                  className="pt-5 pb-2 outline-none w-full text-xs"
                  name="firstName"
                  type="text"
                  placeholder={!focusedFirstName ? "First Name" : ""}
                  value={formikProps.values.firstName}
                  onChange={formikProps.handleChange}
                  validate={validateFirstName}
                  onFocus={() => setFocusedFirstName(true)}
                  onBlur={(ev) => {
                    if (ev.target.value.length === 0) setFocusedFistName(false);
                    setErrors({
                      ...errors,
                      FistName: validateFirstName(ev.target.value),
                    });
                  }}
                  style={{
                    borderBottom: errors.firstName
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                />
                {errors.firstName && (
                  <div className="text-red-500 text-xs absolute">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div
                className={`mb-4 relative ${
                  errors.lastName ? "border-b-1 border-red-500" : "border-b-1"
                }`}
              >
                <label
                  className={
                    "absolute mb-3 text-xs transition-all duration-150 " +
                    (!focusedLastName ? "-z-10 top-5" : "top-1")
                  }
                >
                  Last Name
                </label>
                <input
                  className="pt-5 pb-2 outline-none w-full text-xs"
                  name="lastName"
                  type="text"
                  placeholder={!focusedLastName ? "Last Name" : ""}
                  value={formikProps.values.lastName}
                  onChange={formikProps.handleChange}
                  validate={validateLastName}
                  onFocus={() => setFocusedLastName(true)}
                  onBlur={(ev) => {
                    if (ev.target.value.length === 0)
                      setFocusedLastName(false);
                    setErrors({
                      ...errors,
                      LastName: validateLastName(ev.target.value),
                    });
                  }}
                  style={{
                    borderBottom: errors.lastName
                      ? "1px solid red"
                      : "1px solid black",
                  }}
                />
                {errors.lastName && (
                  <div className="text-red-500 text-xs absolute">
                    {errors.lastName}
                  </div>
                )}
              </div>
              <div>
                <div className="singupcheck">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="receiveCommunications"
                      id="receiveCommunications"
                      checked={formikProps.values.receiveCommunications}
                      onChange={formikProps.handleChange}
                    />
                  </div>
                  <p className="singupchecktext">
                    I want to receive personalized commercial communications
                    from <b className="font-bold text-black">ZARA</b> by email.
                  </p>
                </div>
                <div className="singupcookies">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="readPrivacyPolicy"
                      id="readPrivacyPolicy"
                      checked={formikProps.values.readPrivacyPolicy}
                      onChange={formikProps.handleChange}
                    />
                  </div>
                  <p className="singupcookiestext">
                    I have read and understand the Privacy and Cookies Policy
                  </p>
                </div>
              </div>
              <button type="submit" className="Loginbutton">
                CREATE ACCOUNT
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Singup;