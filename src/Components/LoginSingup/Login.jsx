import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { userContext } from "../../Context/UserContext.jsx";
import Navbar from "../Navbar/Navbar.jsx";

function validateEmail(value) {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
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

export default function Login() {
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { setUser } = useContext(userContext);
  const navigation = useNavigate();

  async function handleLogin(values) {
    await axios
      .post(
        "https://zarabackendserver-448d1df25aec.herokuapp.com/user/authenticate",
        {
          email: values.email,
          password: values.password,
          pageRoll: 0,
        }
      )
      .then((res) => {
        const { token, firstname, lastname, email, profileImage, phoneno } =
          res.data;
        setUser({
          firstname: firstname,
          lastname: lastname,
          email: email,
          profileImage: profileImage,
          phoneno: phoneno,
          token: token,
        });
        localStorage.setItem("token", token);
        navigation("/");
        return;
      })
      .catch((err) => {
        console.log("Login failed " + err);
      });
  }

  return (
    <div className="">
      <div className="sticky top-0 z-10">
        <div className="absolute w-full bg-white">
          <Navbar />
        </div>
      </div>{" "}
      <div className="login pt-36">
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          onSubmit={(values) => {
            handleLogin(values);
          }}
        >
          <Form>
            <div className="loginarea">
              <p className="logintext font-extralight">
                LOG IN TO YOUR ACCOUNT
              </p>

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
                <Field
                  className="pt-5 pb-2 outline-none w-full text-xs"
                  name="email"
                  type="email"
                  placeholder={!focusedEmail ? "Email" : ""}
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
                <Field
                  className="pt-5 pb-2 outline-none w-full text-xs"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={!focusedPassword ? "Password" : ""}
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
              <button className="Loginbutton" type="submit">
                Log in
              </button>
              <div className="Fogotten">
                <Link to="#">Have you forgotten your password?</Link>
              </div>
            </div>
          </Form>
        </Formik>
        <div className="singuparea">
          <p className="singuptext font-extralight">NEED AN ACCOUNT?</p>
          <Link className="Registerbutton" to="/Signup">
            REGISTER
          </Link>
        </div>
      </div>
    </div>
  );
}
