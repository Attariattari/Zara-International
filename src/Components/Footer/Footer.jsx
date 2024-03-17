import React, { useState } from "react";
import "./Footer.css";

function Footer() {
  const [showAdditionalData, setShowAdditionalData] = useState(false);
  const [email, setEmail] = useState("");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [sectionsChecked, setSectionsChecked] = useState({
    woman: false,
    man: false,
    kids: false,
  });
  const [error, setError] = useState("");

  const handleInputClick = () => {
    setShowAdditionalData(true);
  };

  const handleCheckboxChange = (e) => {
    setPrivacyChecked(e.target.checked);
  };

  const handleSectionCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setError(""); // Reset error message

    setSectionsChecked((prevSectionsChecked) => ({
      ...prevSectionsChecked,
      [name]: checked,
    }));
  };

  const validateEmail = (email) => {
    // Regular expression for a valid email address
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribeClick = () => {
    if (!email) {
      setError("Please enter your email address.");
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    } else if (!privacyChecked) {
      setError("Please accept the Privacy and Cookies Policy.");
    } else if (!Object.values(sectionsChecked).some((checked) => checked)) {
      setError("Please select at least one section.");
    } else {
      // All data is valid, you can now proceed to subscribe
      console.log("Subscribing with data:", {
        email,
        privacyChecked,
        sectionsChecked,
      });
      setError("");
    }
  };

  return (
    <div className="Footer">
      <div className="Footerarea">
        <div className="Subscribearea">
          <p>JOIN OUR NEWSLETTER</p>
          <div className="emailarea">
            <label htmlFor="email">ENTER YOUR EMAIL ADDRESS HERE</label>
            <input
              type="text"
              id="email"
              placeholder="ENTER YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={handleInputClick}
            />
          </div>

          {showAdditionalData && (
            <>
              <div className="checkboxarea">
                <input
                  type="checkbox"
                  name="privacy"
                  id=""
                  checked={privacyChecked}
                  onChange={handleCheckboxChange}
                />
                <p>
                  I have read and understand the Privacy and Cookies Policy and
                  agree to receive personalised commercial communications from
                  Zara by email.
                </p>
              </div>
              <div className="slectsection">
                <p className="Section">SECTIONS</p>
                {Object.entries(sectionsChecked).map(([section, checked]) => (
                  <div key={section}>
                    <input
                      type="checkbox"
                      id={section}
                      name={section}
                      checked={checked}
                      onChange={handleSectionCheckboxChange}
                    />
                    <label htmlFor={section}>{section.toUpperCase()}</label>
                  </div>
                ))}
              </div>
              <div className="SUBSCRIBEButton">
                <button onClick={handleSubscribeClick}>
                  <span>SUBSCRIBE</span>
                </button>
              </div>
              {error && <p className="error-message">{error}</p>}
            </>
          )}
        </div>
        <div className="socialarea">
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
        <div className="companyarea">
          <div className="companyHelp">
            <p>Help</p>
            <ul>
              <li>MY ZARA ACCOUNT</li>
              <li>ITEMS AND SIZES</li>
              <li>SHIPPING</li>
              <li>PAYMENT AND INVOICES</li>
              <li>MY PURCHASES</li>
              <li>EXCHANGES, RETURNS, AND REFUNDS</li>
              <li>ZARA EXPERIENCES</li>
            </ul>
          </div>
          <div className="companyFollow_Us">
            <p>Follow Us</p>
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
          <div className="companyCompany">
            <p>Company</p>
            <ul>
              <li>ABOUT US</li>
              <li>JOIN LIFE</li>
              <li>OFFICES</li>
              <li>WORK WITH US</li>
              <li>CONTACT</li>
              <li>LEGAL NOTES</li>
            </ul>
          </div>
          <div className="companyPolicies">
            <p>Policies</p>
            <ul>
              <li>PRIVACY POLICY</li>
              <li>PURCHASE CONDITIONS</li>
              <li>COOKIES SETTINGS</li>
            </ul>
          </div>
        </div>
        <div className="Footerlastarea">
          <div>
            <div>ZARA / WOMAN / ///NEW</div>
            <div className="international">INTERNATIONAL</div>
          </div>
          <div>
            <div>ENGLISH</div>
            <div>NEDERLANDS</div>
            <div>FRANÇAIS</div>
            <div>ESPAÑOL</div>
            <div>PORTUGUÊS</div>
            <div>UNITED KINGDOM</div>
            <p>© ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

// import React, { useState } from "react";
// import "./Footer.css";

// function Footer() {
//   const [showAdditionalData, setShowAdditionalData] = useState(false);
//   const [email, setEmail] = useState("");
//   const [privacyChecked, setPrivacyChecked] = useState(false);
//   const [womanChecked, setWomanChecked] = useState(false);
//   const [manChecked, setManChecked] = useState(false);
//   const [kidsChecked, setKidsChecked] = useState(false);
//   const [error, setError] = useState("");

//   const handleInputClick = () => {
//     setShowAdditionalData(true);
//   };

//   const handleCheckboxChange = (e) => {
//     setPrivacyChecked(e.target.checked);
//   };

//   const handleSectionCheckboxChange = (e) => {
//     const { name, checked } = e.target;
//     setError(""); // Reset error message

//     switch (name) {
//       case "woman":
//         setWomanChecked(checked);
//         break;
//       case "man":
//         setManChecked(checked);
//         break;
//       case "kids":
//         setKidsChecked(checked);
//         break;
//       default:
//         break;
//     }
//   };

//   const validateEmail = (email) => {
//     // Regular expression for a valid email address
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleSubscribeClick = () => {
//     if (!email) {
//       setError("Please enter your email address.");
//     } else if (!validateEmail(email)) {
//       setError("Please enter a valid email address.");
//     } else if (!privacyChecked) {
//       setError("Please accept the Privacy and Cookies Policy.");
//     } else if (!womanChecked && !manChecked && !kidsChecked) {
//       setError("Please select at least one section.");
//     } else {
//       // All data is valid, you can now proceed to subscribe
//       console.log("Subscribing with data:", {
//         email,
//         privacyChecked,
//         womanChecked,
//         manChecked,
//         kidsChecked,
//       });
//       setError("");
//     }
//   };

//   return (
//     <div className="Footer">
//       <div className="Footerarea">
//         <div className="Subscribearea">
//           <p>JOIN OUR NEWSLETTER</p>
//           <div className="emailarea">
//             <label htmlFor="">ENTER YOUR EMAIL ADDRESS HERE</label>
//             <input
//               type="text"
//               placeholder="ENTER YOUR EMAIL"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onClick={handleInputClick}
//             />
//           </div>

//           {showAdditionalData && (
//             <>
// <div className="checkboxarea">
//   <input
//     type="checkbox"
//     name="privacy"
//     id=""
//     checked={privacyChecked}
//     onChange={handleCheckboxChange}
//   />
//   <p>
//     I have read and understand the Privacy and Cookies Policy and
//     agree to receive personalised commercial communications from
//     Zara by email.
//   </p>
// </div>
//               <div className="slectsection">
//                 <p className="Section">SECTIONS</p>
//                 <div>
//                   <input
//                     type="checkbox"
//                     name="woman"
//                     id=""
//                     checked={womanChecked}
//                     onChange={handleSectionCheckboxChange}
//                   />
//                   <p>WOMAN</p>
//                 </div>
//                 <div>
//                   <input
//                     type="checkbox"
//                     name="man"
//                     id=""
//                     checked={manChecked}
//                     onChange={handleSectionCheckboxChange}
//                   />
//                   <p>MAN</p>
//                 </div>
//                 <div>
//                   <input
//                     type="checkbox"
//                     name="kids"
//                     id=""
//                     checked={kidsChecked}
//                     onChange={handleSectionCheckboxChange}
//                   />
//                   <p>KIDS</p>
//                 </div>
//               </div>
//               <div className="SUBSCRIBEButton">
//                 <button onClick={handleSubscribeClick}>
//                   <span>SUBSCRIBE</span>
//                 </button>
//               </div>
//               {error && <p className="error-message">{error}</p>}
//             </>
//           )}
//         </div>
//         <div className="socialarea">
//           <a href="#" target="_blank">
//             TIKTOK
//           </a>
//           <a href="#" target="_blank">
//             FACEBOOK
//           </a>
//           <a href="#" target="_blank">
//             INSTAGRAM
//           </a>
//           <a href="#" target="_blank">
//             x
//           </a>
//           <a href="#" target="_blank">
//             PINTEREST
//           </a>
//           <a href="#" target="_blank">
//             YOUTUBE
//           </a>
//           <a href="#" target="_blank">
//             SPOTIFY
//           </a>
//           <a href="#" target="_blank">
//             LINKDIN
//           </a>
//         </div>
//         <div className="companyarea">
//           <div className="companyHelp">
//             <p>Help</p>
//             <ul>
//               <li>MY ZARA ACOUNT</li>
//               <li>ITEMS AND SIZES</li>
//               <li>SHIPPING</li>
//               <li>PAYMENT AND INVOICES</li>
//               <li>MY PURCHASES</li>
//               <li>EXCHANGES, RETURNS AND</li>
//               <li>REFUNDS</li>
//               <li>ZARA EXPERIENCIES</li>
//             </ul>
//           </div>
//           <div className="companyFollow_Us">
//             <p>Follow Us</p>
//             <a href="#" target="_blank">
//               TIKTOK
//             </a>
//             <a href="#" target="_blank">
//               FACEBOOK
//             </a>
//             <a href="#" target="_blank">
//               INSTAGRAM
//             </a>
//             <a href="#" target="_blank">
//               x
//             </a>
//             <a href="#" target="_blank">
//               PINTEREST
//             </a>
//             <a href="#" target="_blank">
//               YOUTUBE
//             </a>
//             <a href="#" target="_blank">
//               SPOTIFY
//             </a>
//             <a href="#" target="_blank">
//               LINKDIN
//             </a>
//           </div>
//           <div className="companyCompany">
//             <p>Company</p>
//             <ul>
//               <li>ABOUT US</li>
//               <li>JOIN LIFE</li>
//               <li>OFFICES</li>
//               <li>WORK WITH US</li>
//               <li>CONTACT</li>
//               <li>LEGAL NOTES</li>
//             </ul>
//           </div>
//           <div className="companyPolicies">
//             <p>Policies</p>
//             <ul>
//               <li>PRIVACY POLICY</li>
//               <li>PURCHASE CONDITIONS</li>
//               <li>COOKIES SETTINGS</li>
//             </ul>
//           </div>
//         </div>
//         <div className="Footerlastarea">
//           <div>
//             <div>ZARA / WOMAN / ///NEW</div>
//             <div className="international">INTERNATIONAL</div>
//           </div>
//           <div>
//             <div>ENGLISH</div>
//             <div>NEDERLANDS</div>
//             <div>FRANÇAIS</div>
//             <div>ESPAÑOL</div>
//             <div>PORTUGUÊS</div>
//             <div>UNITEDKINGDEN</div>
//             <p>© ALL RIGHTS RESERVED</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;
