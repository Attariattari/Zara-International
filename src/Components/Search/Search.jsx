import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Search.css";
function Search() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className={`sticky top-0 z-10 ${isScrolled ? "bg-white" : ""}`}>
        <div className="absolute w-full">
          <Navbar />
        </div>
        <div className="SearchCatagory">
          <p>WOMAN</p>
          <p>MAN</p>
          <p>KIDS</p>
        </div>
        <div className="SearchInput">
          <input type="text" placeholder="Search for an item, colour, collection..." />
        </div>
      </div>

      <div className="Search">Search</div>
    </div>
  );
}

export default Search;
