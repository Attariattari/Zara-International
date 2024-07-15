import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import "./Authanticate.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { userContext } from "../../Context/UserContext.jsx";
import { useTheme } from "../Context/ThemeContext";
import Spinner from "../../Spinner";
import VerificationInput from "./VerificationInput.jsx";
import * as Yup from "yup";
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

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function Authanticate() {
  const [showPassword, setShowPassword] = useState(false);
  const [Email, setEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetTokenError, setResetTokenError] = useState(null);
  const [resetTokenSuccess, setResetTokenSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { setAdmin } = useContext(userContext);
  const [authSuccess, setAuthSuccess] = useState("");
  const [authError, setAuthError] = useState("");
  const { theme } = useTheme(); // Get the current theme

  const navigate = useNavigate();

  // Configure Axios to include credentials
  axios.defaults.withCredentials = true;
  const handleAuthenticate = async (values) => {
    const authenticateUser = async (email, password) => {
      try {
        const response = await axios.post(
          "http://localhost:1122/user/authenticate",
          {
            email,
            password,
          }
        );
        return response.data;
      } catch (error) {
        console.error("Authentication failed", error);
        throw new Error("Authentication failed. Please try again.");
      }
    };

    const checkAdminDetails = async (email) => {
      try {
        const response = await axios.post(
          "http://localhost:1122/user/checkDetails",
          {
            email,
          }
        );
        return response.data;
      } catch (error) {
        console.error("Admin check failed", error);
        throw new Error("Failed to check admin details. Please try again.");
      }
    };

    setLoading(true);

    try {
      const adminDetails = await checkAdminDetails(values.email);

      if (adminDetails.status !== "success") {
        setLoading(false);
        setAuthError(adminDetails.message);
        return;
      }

      const { pageRoll, verify } = adminDetails;

      if (pageRoll !== 1) {
        setLoading(false);
        setAuthError("Admin role does not allow login.");
        return;
      }

      if (!verify) {
        setLoading(false);
        setAuthError(
          "Admin account not verified. Please verify your email first."
        );
        return;
      }

      const loginResponse = await authenticateUser(
        values.email,
        values.password
      );

      if (loginResponse.status === "success") {
        const { token } = loginResponse;

        document.cookie = `token=${token}; path=/`;

        setAuthError(null);
        setAdmin(adminDetails);

        navigate("/Admin/Dashboard");
      } else {
        setAuthError(loginResponse.message);
      }
    } catch (error) {
      console.error(error.message);
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetToken = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1122/user/forgot-password",
        {
          email: values.email,
        }
      );

      if (response.data.success) {
        setResetTokenError(null);
        setEmail(values.email);
        const emailData = {
          email: values.email,
          timestamp: new Date().getTime(), // Current time in milliseconds
        };
        localStorage.setItem("resetEmail", JSON.stringify(emailData));
        setResetTokenSuccess(response.data.message);
      } else {
        setResetTokenSuccess(null);
        setResetTokenError(response.data.message);
      }
    } catch (err) {
      console.log("Send reset token failed", err);
      setResetTokenSuccess(null);
      setResetTokenError("Failed to send reset code. Please try again.");
    }
    setLoading(false);
  };
  const getEmailFromLocalStorage = () => {
    const emailData = JSON.parse(localStorage.getItem("resetEmail"));
    if (!emailData) {
      return null;
    }

    const currentTime = new Date().getTime();
    const tenMinutesInMillis = 10 * 60 * 1000;

    if (currentTime - emailData.timestamp > tenMinutesInMillis) {
      localStorage.removeItem("resetEmail");
      return null;
    }

    return emailData.email;
  };

  const handleVerifyResetToken = async (values) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:1122/user/verifyResetCode",
        {
          params: { verificationCode: values.verificationCode },
        }
      );

      if (response.data.success) {
        setResetTokenError(null);
        setResetTokenSuccess(
          "Verification successful. You can now reset your password."
        );
        setIsVerified(true); // Set verification status to true
      } else {
        setResetTokenSuccess(null);
        setResetTokenError(response.data.message);
      }
    } catch (err) {
      console.log("Verification failed", err);
      setResetTokenSuccess(null);
      setResetTokenError("Failed to verify the reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNewresetpassword = async (values) => {
    try {
      const email = getEmailFromLocalStorage();
      if (!email) {
        setAuthError("Email has expired. Please request a new reset link.");
        setAuthSuccess("");
        return;
      }
  
      const data = new URLSearchParams();
      data.append("email", email); // Use the email from localStorage
      data.append("newPassword", values.newPassword);
      data.append("confirmPassword", values.confirmPassword);
  
      const response = await axios.post("http://localhost:1122/user/Newreset", data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      if (response.data.success) {
        setAuthSuccess("Password has been reset successfully.");
        setAuthError("");
        localStorage.removeItem("resetEmail"); // Remove email after successful reset
      } else {
        setAuthError(response.data.message);
        setAuthSuccess("");
      }
    } catch (error) {
      console.error("Error in handleNewresetpassword:", error);
      setAuthError("Something went wrong. Please try again.");
      setAuthSuccess("");
    }
  };
  

  const inputFocusColor = theme === "light" ? "dark" : "dark";

  return (
    <div className="Authanticate">
      {loading && (
        <div className="overlay">
          <Spinner />
        </div>
      )}
      <div className={`Authanticate_Area ${loading ? "blurred" : ""}`}>
        <div className="Authanticate_Form_Area">
          <p className="Authanticate_text">ZARA ADMIN</p>
          {showForgotPassword ? (
            isVerified ? (
              <Formik
                initialValues={{ newPassword: "", confirmPassword: "" }}
                validationSchema={ResetPasswordSchema}
                onSubmit={(values) => {
                  handleNewresetpassword(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="Authanticateform">
                    <div className="inputs password-input-wrapper">
                      <Field name="newPassword">
                        {({ field }) => (
                          <div className="password-container">
                            <Input
                              {...field}
                              type={showNewPassword ? "text" : "password"}
                              variant="standard"
                              label="New Password"
                              placeholder="New Password"
                              className="custom-input"
                              style={{
                                "--tw-focus-ring-color": inputFocusColor,
                              }}
                            />
                            <div
                              className="show-password-toggle"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? <IoIosEyeOff /> : <IoIosEye />}
                            </div>
                          </div>
                        )}
                      </Field>
                      {errors.newPassword && touched.newPassword && (
                        <div className="error-message">
                          {errors.newPassword}
                        </div>
                      )}
                    </div>

                    <div className="inputs password-input-wrapper">
                      <Field name="confirmPassword">
                        {({ field }) => (
                          <div className="password-container">
                            <Input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              variant="standard"
                              label="Confirm Password"
                              placeholder="Confirm Password"
                              className="custom-input"
                              style={{
                                "--tw-focus-ring-color": inputFocusColor,
                              }}
                            />
                            <div
                              className="show-password-toggle"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <IoIosEyeOff />
                              ) : (
                                <IoIosEye />
                              )}
                            </div>
                          </div>
                        )}
                      </Field>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="error-message">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="submit-button">
                      Create New Password
                    </button>

                    {authError && (
                      <div className="error-message" style={{ color: "red" }}>
                        {authError}
                      </div>
                    )}
                    {authSuccess && (
                      <div
                        className="success-message"
                        style={{ color: "green" }}
                      >
                        {authSuccess}
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            ) : resetTokenSuccess ? (
              <div className="Resettoken_check">
                <Formik
                  initialValues={{ verificationCode: "" }}
                  onSubmit={(values) => handleVerifyResetToken(values)}
                >
                  {({ errors, touched }) => (
                    <Form className="verificationmain">
                      <p className="Verificationtitle">
                        Enter Your Verification Code
                      </p>
                      <Field name="verificationCode">
                        {({ field }) => (
                          <div className="input-container">
                            <VerificationInput
                              {...field}
                              onComplete={(value) => {
                                handleVerifyResetToken({
                                  verificationCode: value,
                                });
                              }}
                            />
                          </div>
                        )}
                      </Field>
                      <button type="submit" className="submit-button">
                        Submit
                      </button>
                      {resetTokenError && (
                        <div
                          className="error-message mt-2"
                          style={{ color: "red" }}
                        >
                          {resetTokenError}
                        </div>
                      )}
                      {resetTokenSuccess && (
                        <div
                          className="success-message mt-2"
                          style={{ color: "green" }}
                        >
                          {resetTokenSuccess}
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>
              </div>
            ) : (
              <Formik
                initialValues={{ email: "" }}
                onSubmit={(values) => {
                  handleSendResetToken(values);
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
                            style={{
                              "--tw-focus-ring-color": inputFocusColor,
                            }}
                          />
                        )}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <button type="submit" className="submit-button">
                      Send Reset Code
                    </button>
                    {resetTokenError && (
                      <div
                        className="error-message mt-2"
                        style={{ color: "red" }}
                      >
                        {resetTokenError}
                      </div>
                    )}
                    {resetTokenSuccess && (
                      <div
                        className="success-message mt-2"
                        style={{ color: "green" }}
                      >
                        {resetTokenSuccess}
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            )
          ) : (
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={(values) => {
                handleAuthenticate(values);
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
                          style={{
                            "--tw-focus-ring-color": inputFocusColor,
                          }}
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
                            style={{
                              "--tw-focus-ring-color": inputFocusColor,
                            }}
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
                  {authError && (
                    <div className="error-message" style={{ color: "red" }}>
                      {authError}
                    </div>
                  )}
                  <div className="ForgottPassword">
                    <Link to="#" onClick={() => setShowForgotPassword(true)}>
                      Forgot Password?
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authanticate;
