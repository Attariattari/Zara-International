import React from "react";
import "./SocialSlidepage.css";
import { Link } from "react-router-dom";

function SocialSlidepage() {
  return (
    <div className="SocialSlidepage">
      <div className="servicesarea">
        <div>
          <Link to="#">JOIN OUR NEWSLETTER</Link>
        </div>
        <div className="socialmedia">
          <a href="#" target="_blank">
            TIKTOK
          </a>
          <a href="#" target="_blank">
            FACEBOOK
          </a>
          <a href="#" target="_blank">
            INSTAGRAM
          </a>
          <a href="#" target="_blank">
            x
          </a>
          <a href="#" target="_blank">
            PINTEREST
          </a>
          <a href="#" target="_blank">
            YOUTUBE
          </a>
          <a href="#" target="_blank">
            SPOTIFY
          </a>
          <a href="#" target="_blank">
            LINKDIN
          </a>
        </div>
        <div className="privacyarea">
          <Link className="LinkPrivacy" to="#">COOKIES SETTINGS</Link>
          <Link className="LinkPrivacy" to="#">PRIVACY AND COOKIES POLICY</Link>
          <Link className="LinkPrivacy" to="#">TERMS OR USE</Link>
        </div>
      </div>
    </div>
  );
}

export default SocialSlidepage;
