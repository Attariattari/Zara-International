// import React, { useState } from "react";
// import "./Login.css";
// import { Formik, Form, Field } from "formik";
// import { IoIosEye, IoIosEyeOff } from "react-icons/io";

// function Login() {
//   const [focusedEmail, setFocusedEmail] = useState(false);
//   const [focusedPassword, setFocusedPassword] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [errors, setErrors] = useState({ email: "", password: "" });

//   function validateEmail(value) {
//     let error;
//     if (!value) {
//       error = "Required";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//       error = "Invalid email address";
//     }
//     return error;
//   }

//   function validatePassword(value) {
//     let error;
//     if (!value) {
//       error = "Required";
//     } else if (value.length < 6) {
//       error = "Invalid Password!";
//     }
//     return error;
//   }

//   return (
//     <div className="login">
//       <div className="loginarea">
//         <p className="logintext font-extralight">LOG IN TO YOUR ACCOUNT</p>
//         <div
//           className={`mb-4 relative ${
//             errors.email ? "border-b-1 border-red-500" : "border-b-1"
//           }`}
//         >
//           <label
//             className={
//               "absolute mb-3 text-xs transition-all duration-150 " +
//               (!focusedEmail ? "-z-10 top-5" : "top-1")
//             }
//           >
//             Email
//           </label>
//           <input
//             className="pt-5 pb-2 outline-none w-full text-xs"
//             name="email"
//             type="email"
//             placeholder={!focusedEmail ? "Email" : ""}
//             validate={validateEmail}
//             onFocus={() => setFocusedEmail(true)}
//             onBlur={(ev) => {
//               if (ev.target.value.length === 0) setFocusedEmail(false);
//               setErrors({ ...errors, email: validateEmail(ev.target.value) });
//             }}
//             style={{
//               borderBottom: errors.email ? "1px solid red" : "1px solid black",
//             }}
//           />
//           {errors.email && (
//             <div className="text-red-500 text-xs absolute">{errors.email}</div>
//           )}
//         </div>
//         <div
//           className={`mb-4 relative ${
//             errors.password ? "border-b-1 border-red-500" : "border-b-1"
//           }`}
//         >
//           <label
//             className={
//               "absolute mb-3 text-xs transition-all duration-150 " +
//               (!focusedPassword ? "-z-10 top-5" : "top-1")
//             }
//           >
//             Password
//           </label>
//           <div className="relative">
//             <input
//               className="pt-5 pb-2 outline-none w-full text-xs"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder={!focusedPassword ? "Password" : ""}
//               validate={validatePassword}
//               onFocus={() => setFocusedPassword(true)}
//               onBlur={(ev) => {
//                 if (ev.target.value.length === 0) {
//                   setFocusedPassword(false);
//                 } else {
//                   setErrors({
//                     ...errors,
//                     password: validatePassword(ev.target.value),
//                   });
//                 }
//               }}
//               style={{
//                 borderBottom: errors.password
//                   ? "1px solid red"
//                   : "1px solid black",
//               }}
//             />
//             {showPassword ? (
//               <IoIosEyeOff
//                 className="absolute right-0 top-6 cursor-pointer"
//                 onClick={() => setShowPassword(false)}
//               />
//             ) : (
//               <IoIosEye
//                 className="absolute right-0 top-6 cursor-pointer"
//                 onClick={() => setShowPassword(true)}
//               />
//             )}
//           </div>
//           {errors.password && (
//             <div className="text-red-500 text-xs absolute">{errors.password}</div>
//           )}
//         </div>
//         <button className="Registerbutton">Log in</button>
//       </div>
//       <div className="singuparea">
//         <p className="logintext font-extralight">NEED AN ACCOUNT?</p>
//         <button className="Registerbutton">REGISTER</button>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import "./Login.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
function Login() {
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Required Feild!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
      validateEmail("");
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = "Required Feild!";
    } else if (value.length < 6) {
      error = "Enter at least 6 characters";
    }
    return error;
  }

  return (
    <div className="login">
      <div className="loginarea">
        <p className="logintext font-extralight">LOG IN TO YOUR ACCOUNT</p>
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
            validate={validateEmail}
            onFocus={() => setFocusedEmail(true)}
            onBlur={(ev) => {
              if (ev.target.value.length === 0) setFocusedEmail(false);
              setErrors({ ...errors, email: validateEmail(ev.target.value) });
            }}
            style={{
              borderBottom: errors.email ? "1px solid red" : "1px solid black",
            }}
          />
          {errors.email && (
            <div className="text-red-500 text-xs absolute">{errors.email}</div>
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
          <div className="relative">
            <input
              className="pt-5 pb-2 outline-none w-full text-xs"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={!focusedPassword ? "Password" : ""}
              validate={validatePassword}
              onFocus={() => setFocusedPassword(true)}
              onBlur={(ev) => {
                setFocusedPassword(false);
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
          </div>
          {errors.password && (
            <div className="text-red-500 text-xs absolute">{errors.password}</div>
          )}
        </div>
        <button className="Registerbutton">Log in</button>
      </div>
      <div className="singuparea">
        <p className="logintext font-extralight">NEED AN ACCOUNT?</p>
        <button className="Registerbutton">REGISTER</button>
      </div>
    </div>
  );
}

export default Login;
