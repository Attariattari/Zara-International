import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";

function Search() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>
      <div className="sticky top-0 z-10"
      style={{
        marginTop:'-9px'
      }}
      >
        <div className="absolute w-full bg-white">
          <Navbar />
        </div>
      </div>
      <div className="pt-32">Search</div>
    </div>
  );
}

export default Search;
