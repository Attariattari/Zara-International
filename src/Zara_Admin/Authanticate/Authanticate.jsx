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
    error = "Invalid email address.";
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (value.length < 6) {
    error = "Password must be at least 6 characters long.";
  }
  return error;
}
function validateVarification(value) {
  let error;
  if (!value || value.length < 6) {
    error = "Check Your Email And Enter Correct Varification Code.";
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
  const [resetTokenSuccessSMS, setResetTokenSuccessSMS] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [Verified, setVerified] = useState(true);
  const { setUser, setAdmin, isTokenValid } = useContext(userContext);
  const [authSuccess, setAuthSuccess] = useState("");
  const [authError, setAuthError] = useState("");
  const { theme } = useTheme();
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [verifyNow, setVerifyNow] = useState(false);
  const [showForgotPasswordLink, setShowForgotPasswordLink] = useState(false);
  const [smsError, setSMSError] = useState(null);
  const [createNewVerifyCode, setCreateNewVerifyCode] = useState(false);
  const [isCodeExpired, setIsCodeExpired] = useState(false);
  const [timer, setTimer] = useState(120);
  const navigate = useNavigate();

  useEffect(() => {
    const delayTime = 0; // 1 second delay

    const timer = setTimeout(() => {
      if (isTokenValid) {
        window.history.back();
      }
    }, delayTime);

    // Cleanup the timeout if the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [isTokenValid, navigate]);

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
          },
          { withCredentials: true }
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
        setAuthError("Access Denied: Admin access required for login.");
        return;
      }

      if (!verify) {
        setLoading(false);
        setAuthError(
          "Admin account not verified. Please verify your email first."
        );
        setVerified(false);
        return;
      }

      const loginResponse = await authenticateUser(
        values.email,
        values.password
      );

      if (loginResponse.status === "success") {
        const { token, user } = loginResponse;
        document.cookie = `token=${token}; path=/`;
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setAuthError(null);
        setAdmin(adminDetails);
        setVerified(true);
        window.history.back();
        await fetchUserData();
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

  useEffect(() => {
    let timer;
    if (authError) {
      timer = setTimeout(() => {
        setAuthError(null);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [authError]);

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
        setResetTokenSuccessSMS(response.data.message);
        setResetTokenSuccess(response.data.message);
        // Set a timer to clear the success SMS after 10 seconds
        const successTimer = setTimeout(() => {
          setResetTokenSuccessSMS(null);
        }, 10000); // 10 seconds

        setTimer(successTimer);
      } else {
        setResetTokenSuccessSMS(null);
        setResetTokenSuccess(null);
        setResetTokenError(response.data.message);
      }
    } catch (err) {
      console.log("Send reset token failed", err);
      setResetTokenSuccess(null);
      setResetTokenSuccessSMS(null);
      setResetTokenError("Failed to send reset code. Please try again.");
    }
    setLoading(false);
  };
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const getEmailFromLocalStorage = () => {
    const emailData = JSON.parse(localStorage.getItem("resetEmail"));
    if (!emailData) {
      return null;
    }

    const currentTime = new Date().getTime();
    const tenMinutesInMillis = 1 * 60 * 1000;

    if (currentTime - emailData.timestamp > tenMinutesInMillis) {
      localStorage.removeItem("resetEmail");
      return null;
    }

    return emailData.email;
  };

  const handleVerifyResetCode = async (values) => {
    setLoading(true);
    setResponseMessage("");

    const email = getEmailFromLocalStorage();
    if (!email) {
      setLoading(false);
      setResponseMessage(
        "Email has expired or is missing. Please request a new reset code."
      );
      setIsVerified(false);
      setIsCodeExpired(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:1122/User/verify-reset-password-code",
        {
          email: email, // Use the email retrieved from local storage
          verificationCode: values.verificationCode,
        }
      );

      // Set verification status to true if backend response indicates success
      if (response.data.success) {
        setIsVerified(true);
        setResponseMessage(response.data.message); // Set response message from backend
        setIsCodeExpired(false);
      } else {
        setIsVerified(false);
        setResponseMessage(response.data.message); // Set response message from backend
        if (response.data.message.includes("expired")) {
          // Adjust this condition based on your backend response
          setIsCodeExpired(true); // Mark code as expired
        }
      }

      // Log entire response to console for debugging
      console.log("Backend Response:", response.data);
    } catch (err) {
      console.error("Verification failed", err);
      setResponseMessage("Failed to verify the reset code. Please try again.");
      setIsVerified(false); // Set verification status to false on catch error
      setIsCodeExpired(true);

      // Log error to console for debugging
      console.error("Backend Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewresetpassword = async (values) => {
    setLoading(true); // Set loading to true before the async operation
    try {
      const email = getEmailFromLocalStorage();
      if (!email) {
        setAuthError(
          "Reset Code has expired. Please request a new reset link."
        );
        setAuthSuccess("");
        setLoading(false); // Set loading to false if email is expired
        return;
      }

      const data = new URLSearchParams();
      data.append("email", email); // Use the email from localStorage
      data.append("newPassword", values.newPassword);
      data.append("confirmPassword", values.confirmPassword);

      const response = await axios.post(
        "http://localhost:1122/user/Newreset",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data.success) {
        setAuthSuccess("Password has been reset successfully.");
        setPasswordResetSuccess(true);
        setResetTokenSuccess(true);
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
    setLoading(false); // Set loading to false after the async operation completes
  };

  useEffect(() => {
    if (passwordResetSuccess) {
      setShowForgotPassword(false);
      setIsVerified(false);
      setResetTokenSuccess(false);
      setPasswordResetSuccess(false); // Reset the state after handling
    }
  }, [passwordResetSuccess]);

  const handleVerifyEmail = async (
    values,
    setSMSError,
    setLoading,
    setVerified,
    setSuccessMessage,
    setVerifyNow,
    setShowForgotPasswordLink
  ) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1122/User/verify-email",
        {
          email: values.email,
          verificationCode: values.verify,
        }
      );
      console.log("Response from server:", response.data);
      const { success, message } = response.data;

      if (success) {
        setSMSError(null);
        setVerified(true);
        setVerifyNow(false);
        setSuccessMessage(message);
        setShowForgotPasswordLink(false);
      } else {
        setVerified(false);
        setSMSError(message);
        setSuccessMessage("");
        setShowForgotPasswordLink(true);
        setTimeout(() => {
          setSMSError(null);
        }, 5000);
      }
    } catch (err) {
      console.error("Verification failed", err);
      setSMSError("Failed to verify the Email. Please try again.");
      setVerified(false);
      setSuccessMessage("");
      setShowForgotPasswordLink(true);
      setTimeout(() => {
        setSMSError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleresendVerifiyCode = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1122/user/resend-new-verification-code",
        {
          email: values.email,
        }
      );

      if (response.data.success) {
        setResetTokenError(null);
        setResetTokenSuccess(response.data.message);
        setCreateNewVerifyCode(false); // Show the verify email form
      } else {
        setResetTokenError(response.data.message);
        setResetTokenSuccess(null);
      }
    } catch (err) {
      console.error("Send verification code failed", err);
      setResetTokenError("Failed to send verification code. Please try again.");
      setResetTokenSuccess(null);
    } finally {
      setLoading(false);
    }
  };
  const handleNewVerificationCode = () => {
    setCreateNewVerifyCode(true);
    setShowForgotPasswordLink(false); // Optionally hide the link when creating new verification code
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
                    <p className="Verificationtitle">
                      Create Your New Password.
                    </p>
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
                  onSubmit={(values) => handleVerifyResetCode(values)}
                >
                  {({ errors, touched }) => (
                    <Form className="verificationmain">
                      <p className="Verificationtitle">
                        Enter Your Verification Code.
                      </p>
                      <Field name="verificationCode">
                        {({ field }) => (
                          <div className="input-container">
                            <VerificationInput
                              {...field}
                              onComplete={(value) => {
                                handleVerifyResetCode({
                                  verificationCode: value,
                                });
                              }}
                            />
                          </div>
                        )}
                      </Field>
                      <button
                        type="submit"
                        className="submit-button"
                        disabled={timer <= 0 || loading}
                      >
                        Submit
                      </button>

                      {resetTokenError && (
                        <div
                          className="error-message mt-4"
                          style={{ color: "red" }}
                        >
                          {resetTokenError}
                        </div>
                      )}
                      {resetTokenSuccessSMS && (
                        <div
                          className="success-message mt-2"
                          style={{ color: "green" }}
                        >
                          {resetTokenSuccessSMS}
                        </div>
                      )}
                      {responseMessage && (
                        <div
                          className={`message mt-4 ${
                            responseMessage.includes("successful")
                              ? "success-message"
                              : "error-message"
                          }`}
                          style={{
                            color: responseMessage.includes("successful")
                              ? "green"
                              : "red",
                          }}
                        >
                          {responseMessage}
                        </div>
                      )}
                      {isCodeExpired && (
                        <div className="ForgottPassword">
                          <Link
                            to="#"
                            onClick={() => {
                              setShowForgotPassword(true);
                              setResetTokenSuccess(false); // Reset the token success state
                            }}
                          >
                            Get New Reset Code?
                          </Link>
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
                    <p className="Verificationtitle">Send Reset Code.</p>
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
            <>
              {!verifyNow ? (
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => {
                    handleAuthenticate(
                      values,
                      setAuthError,
                      setLoading,
                      navigate,
                      setIsVerified
                    );
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="Authanticateform">
                      <p className="Verificationtitle">
                        Login Your Admin Acount.
                      </p>
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
                      {Verified ? (
                        <button type="submit" className="submit-button">
                          Authenticate
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="submit-button"
                          onClick={() => setVerifyNow(true)}
                        >
                          Verify Now
                        </button>
                      )}
                      {authError && (
                        <div className="error-message" style={{ color: "red" }}>
                          {authError}
                        </div>
                      )}
                      <div className="ForgottPassword">
                        <Link
                          to="#"
                          onClick={() => setShowForgotPassword(true)}
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <>
                  {createNewVerifyCode ? (
                    <Formik
                      initialValues={{ email: "" }}
                      onSubmit={(values) => {
                        handleresendVerifiyCode(values);
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form className="Authanticateform">
                          <p className="Verificationtitle">
                            Send Email Verify Code.
                          </p>
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
                            Send Verification Code
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
                  ) : (
                    <Formik
                      key="verify-form"
                      initialValues={{ email: "", verify: "" }}
                      onSubmit={(values, { resetForm }) => {
                        handleVerifyEmail(
                          values,
                          setSMSError,
                          setLoading,
                          setVerified,
                          setSuccessMessage,
                          setVerifyNow,
                          setShowForgotPasswordLink
                        );
                        resetForm();
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form className="Authanticateform">
                          <p className="Verificationtitle">
                            Verify Your Email.
                          </p>
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
                                  className={`custom-input ${
                                    showForgotPasswordLink
                                      ? "disabled-input"
                                      : ""
                                  }`}
                                  disabled={showForgotPasswordLink}
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
                              name="verify"
                              validate={validateVarification}
                              render={({ field }) => (
                                <div className="verification-code-container">
                                  <Input
                                    {...field}
                                    type="text"
                                    variant="standard"
                                    label="Verification Code"
                                    placeholder="Verification Code"
                                    className={`custom-input ${
                                      showForgotPasswordLink
                                        ? "disabled-input"
                                        : ""
                                    }`}
                                    autoComplete="new-password"
                                    disabled={showForgotPasswordLink}
                                  />
                                </div>
                              )}
                            />
                            <ErrorMessage
                              name="verify"
                              component="div"
                              className="error-message"
                            />
                          </div>
                          {!showForgotPasswordLink && (
                            <button
                              type="submit"
                              className="submit-button"
                              disabled={loading}
                            >
                              Verify Now
                            </button>
                          )}
                          {showForgotPasswordLink && (
                            <button
                              type="button"
                              className="submit-button"
                              disabled={loading}
                              onClick={handleNewVerificationCode}
                            >
                              Get New Verification Code?
                            </button>
                          )}
                          {successMessage && (
                            <div
                              className="success-message"
                              style={{ color: "green" }}
                            >
                              {successMessage}
                            </div>
                          )}
                          {smsError && (
                            <div
                              className="error-message"
                              style={{ color: "red" }}
                            >
                              {smsError}
                            </div>
                          )}
                          {!showForgotPasswordLink && (
                            <div className="ForgottPassword">
                              <Link to="#" onClick={handleNewVerificationCode}>
                                Get New Verification Code?
                              </Link>
                            </div>
                          )}
                        </Form>
                      )}
                    </Formik>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authanticate;
