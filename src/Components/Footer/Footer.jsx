import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [showAdditionalData, setShowAdditionalData] = useState(false);

  const handleInputClick = () => {
    setShowAdditionalData(true);
  };

  return (
    <div className="Footer">
      <div className="Footerarea">
        <div className="Subscribearea">
          <p>JOIN OUR NEWSLETTER</p>
          <div className="emailarea">
            <label htmlFor="">ENTER YOUR EMAIL ADDRESS HERE</label>
            <input
              type="text"
              placeholder="ENTER YOUR EMAIL"
              onClick={handleInputClick}
            />
          </div>

          {showAdditionalData && (
            <>
              <div className="checkboxarea">
                <input type="checkbox" name="" id="" />
                <p>
                  I have read and understand the Privacy and Cookies Policy and
                  agree to receive personalised commercial communications from
                  Zara by email.
                </p>
              </div>
              <div className="slectsection">
                <p className="Section">SECTIONS</p>
                <div>
                  <input type="checkbox" name="" id="" />
                  <p>WOMAN</p>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                  <p>MAN</p>
                </div>
                <div>
                  <input type="checkbox" name="" id="" />
                  <p>KIDS</p>
                </div>
              </div>
              <div className="SUBSCRIBEButton">
                <button>
                  <span>SUBSCRIBE</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;