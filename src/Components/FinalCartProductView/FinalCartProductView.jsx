import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const FinalCartProductView = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <div className={`sticky top-0 z-10 ${isScrolled ? "bg-white" : ""}`}>
        <div className="absolute w-full">
          <Navbar />
        </div>
      </div>
      FinalCartProductView
    </div>
  );
};

export default FinalCartProductView;
