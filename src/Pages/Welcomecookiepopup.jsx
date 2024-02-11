import React from "react";

import { GrFormClose } from "react-icons/gr";
function Welcomecookiepopup({ handleCookieClose }) {
  return (
    <div className="cookiepolicy">
      <div className="cookie">
        We use first-party and third-party cookies to understand how our online
        store is used and to enable us to improve it, adapt the content to your
        preferences, and personalize our advertisements, marketing and
        publications on social media. For more information, please see our
        <a className="pl-2 underline" href="">
          Cookie Policy
        </a>
      </div>
      <div className="cookiepolicy__button">
        <GrFormClose
          className="text-2xl cursor-pointer"
          onClick={handleCookieClose}
        />
      </div>
    </div>
  );
}

export default Welcomecookiepopup;
