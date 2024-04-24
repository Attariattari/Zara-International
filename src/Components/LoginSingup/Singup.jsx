import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Singup.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
  firstname: Yup.string().min(4, "Too Short!").required("Required"),
  lastname: Yup.string().min(4, "Too Short!").required("Required"),
  receiveCommunications: Yup.boolean(),
  readPrivacyPolicy: Yup.boolean().oneOf(
    [true],
    "You must read and accept the Privacy Policy"
  ),
});

function Signup() {
  const navigate = useNavigate();
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedfirstname, setFocusedfirstname] = useState(false);
  const [focusedlastname, setFocusedlastname] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  async function handleSignup(values) {
    try {
      const response = await axios.post(
        "https://zarabackendserver-448d1df25aec.herokuapp.com/user/registerUser",
        {
          email: values.email,
          password: values.password,
          pageRoll: 0,
          firstname: values.firstname,
          lastname: values.lastname,
          commercialcommunications: values.receiveCommunications || false,
          Cookies: values.readPrivacyPolicy || false,
        }
      );
      console.log(response.data);

      navigate("/Login");
      resetForm();
    } catch (error) {
      console.error(error);
    }
  }
  const validate = async (fieldName, value, setFieldTouched) => {
    try {
      await SignupSchema.validateAt(fieldName, { [fieldName]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
      setFieldTouched(fieldName, true, false); // Set field as touched
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error.message,
      }));
    }
  };
  return (
    <div>
      <div className="sticky top-0 z-10"
      style={{
        marginTop:'-9px'
      }}
      >
        <div className="absolute w-full bg-white">
          <Navbar />
        </div>
      </div>
      <div className="signup">
        <div className="signuparea">
          <p className="signuptext font-extralight">PERSONAL DETAILS</p>
          <Formik
            initialValues={{
              email: "",
              password: "",
              firstname: "",
              lastname: "",
              receiveCommunications: false,
              readPrivacyPolicy: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm }) => {
              handleSignup(values);
              resetForm(); // This line resets the form
            }}
          >
            {({ values, handleChange, touched, errors, setFieldTouched }) => (
              <Form>
                <div
                  className={`mb-4 relative ${
                    errors.email && touched.email
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-xs transition-all duration-150 " +
                      (!focusedEmail ? "-z-10 top-5" : "")
                    }
                  >
                    Email
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-xs"
                    name="email"
                    type="email"
                    placeholder={!focusedEmail ? "Email" : ""}
                    onFocus={() => setFocusedEmail(true)}
                    onBlur={() => setFieldTouched("email", true)}
                    onChange={handleChange}
                    value={values.email}
                    style={{
                      borderBottom:
                        errors.email && touched.email
                          ? "1px solid red"
                          : "1px solid black",
                    }}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs absolute">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div
                  className={`mb-4 relative ${
                    errors.password && touched.password
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-xs transition-all duration-150 " +
                      (!focusedPassword ? "-z-10 top-5" : "")
                    }
                  >
                    Password
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-xs"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={!focusedPassword ? "Password" : ""}
                    onFocus={() => setFocusedPassword(true)}
                    onBlur={() => setFieldTouched("password", true)}
                    onChange={handleChange}
                    value={values.password}
                    style={{
                      borderBottom:
                        errors.password && touched.password
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
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs absolute">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div
                  className={`mb-4 relative ${
                    errors.firstname && touched.firstname
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-xs transition-all duration-150 " +
                      (!focusedfirstname ? "-z-10 top-5" : "")
                    }
                  >
                    First Name
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-xs"
                    name="firstname"
                    type="text"
                    placeholder={!focusedfirstname ? "First Name" : ""}
                    onFocus={() => setFocusedfirstname(true)}
                    onBlur={() => setFieldTouched("firstname", true)}
                    onChange={handleChange}
                    value={values.firstname}
                    style={{
                      borderBottom:
                        errors.firstname && touched.firstname
                          ? "1px solid red"
                          : "1px solid black",
                    }}
                  />
                  {errors.firstname && touched.firstname && (
                    <div className="text-red-500 text-xs absolute">
                      {errors.firstname}
                    </div>
                  )}
                </div>

                <div
                  className={`mb-4 relative ${
                    errors.lastname && touched.lastname
                      ? "border-b-1 border-red-500"
                      : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-xs transition-all duration-150 " +
                      (!focusedlastname ? "-z-10 top-5" : "")
                    }
                  >
                    Last Name
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-xs"
                    name="lastname"
                    type="text"
                    placeholder={!focusedlastname ? "Last Name" : ""}
                    onFocus={() => setFocusedlastname(true)}
                    onBlur={() => setFieldTouched("lastname", true)}
                    onChange={handleChange}
                    value={values.lastname}
                    style={{
                      borderBottom:
                        errors.lastname && touched.lastname
                          ? "1px solid red"
                          : "1px solid black",
                    }}
                  />
                  {errors.lastname && touched.lastname && (
                    <div className="text-red-500 text-xs absolute">
                      {errors.lastname}
                    </div>
                  )}
                </div>

                <div>
                  <div className="signupcheck">
                    <div className="checkbox">
                      <Field
                        type="checkbox"
                        name="receiveCommunications"
                        id="receiveCommunications"
                      />
                    </div>
                    <p className="signupchecktext">
                      I want to receive personalized commercial communications
                      from <b className="font-bold text-black">ZARA</b> by
                      email.
                    </p>
                  </div>
                  <div className="signupcookies">
                    <div className="checkbox">
                      <Field
                        type="checkbox"
                        name="readPrivacyPolicy"
                        id="readPrivacyPolicy"
                      />
                    </div>
                    <p className="signupcookiestext">
                      I have read and understand the Privacy and Cookies Policy
                    </p>
                  </div>
                </div>

                <button type="submit" className="Loginbutton">
                  CREATE ACCOUNT
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>\
        <Footer />
    </div>
  );
}

export default Signup;
