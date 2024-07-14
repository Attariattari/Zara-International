import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import "./Authanticate.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { userContext } from "../../Context/UserContext.jsx";

// Validation functions
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
    error = "Password must be at least 6 characters long";
  }
  return error;
}

function Authanticate() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  async function handleAuthanticate(values) {
    try {
      const response = await axios.post(
        "http://localhost:1122/user/authenticate",
        {
          email: values.email,
          password: values.password,
        }
      );

      const { token, user } = response.data;
      setUser(user);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      console.log("Authenticate failed", err);
    }
  }

  return (
    <div className="Authanticate">
      <div className="Authanticate_Area">
        <div className="Authanticate_Form_Area">
          <p className="Authanticate_text">ZARA ADMIN</p>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              handleAuthanticate(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="Authanticateform">
                <div className="inputs">
                  <Field
                    name="email"
                    validate={validateEmail}
                    render={({ field }) => (
                      <Input
                        {...field}
                        variant="standard"
                        label="Email"
                        placeholder="Email"
                        className="custom-input"
                        color="blue"
                      />
                    )}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-message"
                  />
                </div>
                <div className="inputs password-input-wrapper">
                  <Field
                    name="password"
                    validate={validatePassword}
                    render={({ field }) => (
                      <div className="password-container">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          variant="standard"
                          label="Password"
                          placeholder="Password"
                          className="custom-input"
                        color="blue"
                        />
                        <div
                          className="show-password-toggle"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                        </div>
                      </div>
                    )}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Authenticate
                </button>
              </Form>
            )}
          </Formik>
          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authanticate;

// export default function Authanticate() {
// const [focusedEmail, setFocusedEmail] = useState(false);
// const [focusedPassword, setFocusedPassword] = useState(false);
// const [showPassword, setShowPassword] = useState(false);
// const [errors, setErrors] = useState({ email: "", password: "" });
// const { setUser } = useContext(userContext);
// const navigation = useNavigate();

// async function handleAuthanticate(values) {
//   try {
//     const response = await axios.post(
//       "http://localhost:1122/user/authenticate",
//       {
//         email: values.email,
//         password: values.password,
//       }
//     );

//     const { token, user } = response.data;
//     setUser(user);
//     localStorage.setItem("token", token);
//     navigation("/");
//   } catch (err) {
//     console.log("Authanticate failed", err);
//   }
// }

// useEffect(() => {
//   const handleAutoFill = () => {
//     const form = document.getElementById("AuthanticateForm");
//     const inputs = form.querySelectorAll("input");

//     const allFieldsFilled = Array.from(inputs).every(
//       (input) => input.value !== ""
//     );

//     if (allFieldsFilled) {
//       setFocusedEmail("true");
//       setFocusedPassword("true");
//     }
//   };

//   // Listen for changes in the form
//   const form = document.getElementById("AuthanticateForm");
//   form.addEventListener("change", handleAutoFill);

//   // Clean up event listener
//   return () => {
//     form.removeEventListener("change", handleAutoFill);
//   };
// }, []);

// useEffect(() => {
//   window.scrollTo(0, 0);
// }, []);
//   return (
//     <div className="">
//       <div className="Authanticate">
//         <Formik
//           initialValues={{
//             password: "",
//             email: "",
//           }}
//           onSubmit={(values) => {
//             handleAuthanticate(values);
//           }}
//         >
//           <Form>
//             <div className="Authanticatearea" id="AuthanticateForm">
//               <p className="Authanticatetext font-extralight">
//                 LOG IN TO YOUR ACCOUNT
//               </p>

//               <div
//                 className={`mb-4 relative ${
//                   errors.email ? "border-b-1 border-red-500" : "border-b-1"
//                 }`}
//               >
//                 <label
//                   className={
//                     "absolute mb-3 text-xs transition-all duration-150 " +
//                     (!focusedEmail ? "-z-10 top-5" : "")
//                   }
//                 >
//                   Email
//                 </label>
//                 <Field
//                   className="pt-5 pb-2 outline-none w-full text-xs"
//                   name="email"
//                   type="email"
//                   placeholder={!focusedEmail ? "Email" : ""}
//                   onFocus={() => setFocusedEmail(true)}
//                   onBlur={(ev) => {
//                     if (ev.target.value.length === 0) setFocusedEmail(false);
//                     setErrors({
//                       ...errors,
//                       email: validateEmail(ev.target.value),
//                     });
//                   }}
//                   style={{
//                     borderBottom: errors.email
//                       ? "1px solid red"
//                       : "1px solid black",
//                   }}
//                 />
//                 {errors.email && (
//                   <div className="text-red-500 text-xs absolute">
//                     {errors.email}
//                   </div>
//                 )}
//               </div>
//               <div
//                 className={`mb-4 relative ${
//                   errors.password ? "border-b-1 border-red-500" : "border-b-1"
//                 }`}
//               >
//                 <label
//                   className={
//                     "absolute mb-3 text-xs transition-all duration-150 " +
//                     (!focusedPassword ? "-z-10 top-5" : "")
//                   }
//                 >
//                   Password
//                 </label>
//                 <Field
//                   className="pt-5 pb-2 outline-none w-full text-xs"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder={!focusedPassword ? "Password" : ""}
//                   onFocus={() => setFocusedPassword(true)}
//                   onBlur={(ev) => {
//                     if (ev.target.value.length === 0) setFocusedPassword(false);
//                     setErrors({
//                       ...errors,
//                       password: validatePassword(ev.target.value),
//                     });
//                   }}
//                   style={{
//                     borderBottom: errors.password
//                       ? "1px solid red"
//                       : "1px solid black",
//                   }}
//                 />
//                 {showPassword ? (
//                   <IoIosEyeOff
//                     className="absolute right-0 top-6 cursor-pointer"
//                     onClick={() => setShowPassword(false)}
//                   />
//                 ) : (
//                   <IoIosEye
//                     className="absolute right-0 top-6 cursor-pointer"
//                     onClick={() => setShowPassword(true)}
//                   />
//                 )}
//                 {errors.password && (
//                   <div className="text-red-500 text-xs absolute">
//                     {errors.password}
//                   </div>
//                 )}
//               </div>
//               <button className="Authanticatebutton" type="submit">
//                 Log in
//               </button>
//               <div className="Fogotten">
//                 <Link to="#">Have you forgotten your password?</Link>
//               </div>
//             </div>
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// }
