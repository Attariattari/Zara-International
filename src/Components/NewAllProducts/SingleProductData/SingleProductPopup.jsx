import React, { useEffect, useRef } from "react";
import "./SingleProduct.css";

function SingleProductPopup({
  activeImageData,
  handleClosePopup,
  toggleScroll,
}) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleClosePopup();
      }
    };

    const bodyOverflow = document.body.style.overflow;
    if (toggleScroll) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = bodyOverflow;
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [toggleScroll, handleClosePopup]);

  return (
    <div
      className={`imagePopup ${toggleScroll ? "active" : ""}`}
      ref={popupRef}
    >
      <div>
        <img src={activeImageData} alt="" onClick={handleClosePopup} />
      </div>
    </div>
  );
}

export default SingleProductPopup;
