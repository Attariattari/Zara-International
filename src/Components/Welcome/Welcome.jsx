import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { welcome } from "../../ZaraDummyData/ZaraData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Welcome.css";
import Welcomecookiepopup from "./Welcomecookiepopup";
function Welcome() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [countryError, setCountryError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    window.innerWidth > 768 ? welcome.pcimage : welcome.mobileimage
  );

  const countries = ["Pakistan", "India", "USA", "UAE"];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Hindi",
  ];

  const isNewUser = !localStorage.getItem("visited");

  const [showCookiePolicy, setShowCookiePolicy] = useState(isNewUser);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setCountryError(""); // Reset the error when the user makes a selection
  };
  
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    setLanguageError(""); // Reset the error when the user makes a selection
  };
  
  const handleGoClick = () => {
    setCountryError("");
    setLanguageError("");

    if (!selectedCountry && !selectedLanguage) {
      setCountryError("Select a country");
      setLanguageError("Select a language");
    } else if (!selectedCountry) {
      setCountryError("Select a country");
    } else if (!selectedLanguage) {
      setLanguageError("Select a language");
    } else {
      localStorage.setItem("visited", "true");
      localStorage.setItem("NotVisited", "false");
      localStorage.setItem("selectedCountry", selectedCountry);
      localStorage.setItem("selectedLanguage", selectedLanguage);

      setShowCookiePolicy(false);

      navigate("/Home");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCookieClose = () => {
    // Set a flag in local storage to indicate that the user has closed the cookie policy
    localStorage.setItem("cookiePolicyClosed", "true");

    // Hide the cookie policy
    setShowCookiePolicy(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setBackgroundImage(
        window.innerWidth > 768 ? welcome.pcimage : welcome.mobileimage
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [welcome.pcimage, welcome.mobileimage]);

  useEffect(() => {
    // Check if the user has closed the cookie policy
    const isCookiePolicyClosed = localStorage.getItem("cookiePolicyClosed");

    // Hide the cookie policy if the user has closed it
    setShowCookiePolicy(!isCookiePolicyClosed);
  }, []);

  return (
    <div
      className="Welcome-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="zaralogocontainer">
        <div className="zaralogo">
          <svg
            className="worldwide__logo"
            viewBox="0 0 132 55"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M105.673.035l19.557 53.338 6.77.002v.383h-21.548v-.383h6.344l-6.431-17.54H97.311v.007l.07.204c.521 1.548.78 3.17.764 4.803v6.575c0 3.382 1.494 6.81 4.347 6.81 1.675 0 3.012-.59 4.604-2.046l.227.211C105.594 54.224 103.5 55 100.36 55c-2.37 0-4.398-.57-6.03-1.693l-.309-.222c-2.148-1.624-3.542-4.278-4.142-7.89l-.096-.583-.1-.882-.01-.152-3.599 9.792h5.107v.384H80.496v-.384h5.162l3.951-10.753v-.023a34.924 34.924 0 0 1-.075-1.906v-4.693c0-5.77-4.29-9.08-11.771-9.08H70.41v26.458h6.371v.383h-24.9v-.383h6.345l-6.431-17.54H33.948l-6.371 17.346.266-.044c8.366-1.442 12.213-7.827 12.265-14.55h.388v15.171H0L30.06 2.185H17.972C7.954 2.185 3.42 9.922 3.35 17.635h-.387V1.8h36.488l-.222.385L9.396 53.373h15.695c.39 0 .778-.019 1.169-.05.26-.018.522-.044.788-.077l.095-.01L46.703 0h.387l.013.035 15.369 41.916V2.185h-6.328v-.39h21.778c10.467 0 17.774 5.372 17.774 13.068 0 5.612-5.005 10.27-12.45 11.595l-1.367.174 1.377.14c4.515.517 8.1 1.906 10.641 4.127l.017.016L105.273 0h.386l.014.035zm-8.552 35.32l.038.094h13.061l-8.773-23.928-7.221 19.67.039.037.367.364a11.876 11.876 0 0 1 2.489 3.762zM70.415 26.53V2.185h5.611c7.496 0 11.454 4.414 11.454 12.76 0 8.877-2.272 11.585-9.717 11.585h-7.348zM42.882 11.521L34.09 35.45h17.565L42.882 11.52z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="zara-input-container">
        <div className="zarainputs">
          <label style={{ width: "100%" }}>
            <select
              className={`zarainput outline-none ${
                countryError ? "error-border" : ""
              }`}
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option className="text-black" key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {countryError && (
              <div className="error-message">{countryError}</div>
            )}
          </label>

          <br />
          <label style={{ width: "100%" }}>
            <select
              className={`zarainput outline-none ${
                languageError ? "error-border" : ""
              }`}
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              <option value="">Select a language</option>
              {languages.map((language, index) => (
                <option className="text-black" key={index} value={language}>
                  {language}
                </option>
              ))}
            </select>
            {languageError && (
              <div className="error-message">{languageError}</div>
            )}
          </label>
        </div>
        <br />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
        <button onClick={handleGoClick} className="text-white">
          Go
        </button>
      </div>
      <div className="cookies_setting">
        <div>COOKIES SETTINGS</div>
      </div>
      {showCookiePolicy && (
        <Welcomecookiepopup handleCookieClose={handleCookieClose} />
      )}
    </div>
  );
}

export default Welcome;
