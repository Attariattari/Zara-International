import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Search.css";
import LikeSameWithProductData from "../NewAllProducts/SingleProductData/LikeSomeProductsDataView/LikeSameWithProductData";
import Footer from "../Footer/Footer";
import { ZaraProducts } from "../DummyData/Data";

function Search() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    filterProducts(value);
  };

  const clearInput = () => {
    setInputValue("");
    setFilteredProducts([]);
  };

  const filterProducts = (query) => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }

    const allProducts = [
      ...Object.values(ZaraProducts.Women),
      ...Object.values(ZaraProducts.Men),
      ...Object.values(ZaraProducts.Kids),
    ];

    const matchedProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(matchedProducts);
  };

  return (
    <div>
      <div
        className={`sticky top-0 z-10`}
        style={{
          backgroundColor: isScrolled ? "var(--bg-color)" : "transparent",
        }}
      >
        <div className="absolute w-full">
          <Navbar />
        </div>
        <div className="SearchCatagory">
          <p>WOMAN</p>
          <p>MAN</p>
          <p>KIDS</p>
        </div>
        <div className="SearchInput">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search for an item, colour, collection..."
          />
          {inputValue && (
            <svg
              data-qa-action="search-products-form-clear"
              className="search-products-form__input-clear-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="var(--text-color)"
              stroke="inherit"
              onClick={clearInput}
              style={{ cursor: "pointer" }}
            >
              <path d="M12 12.707l6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707z"></path>
            </svg>
          )}
        </div>
      </div>

      <div className="Search">
        {/* <div className="FilteredProducts">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="Product">
                <h3>{product.title}</h3>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div> */}

        <div className="LikeSameWithProductData">
          <LikeSameWithProductData />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;

// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import "./Search.css";
// import LikeSameWithProductData from "../NewAllProducts/SingleProductData/LikeSomeProductsDataView/LikeSameWithProductData";
// import Footer from "../Footer/Footer";
// import { ZaraProducts } from "../DummyData/Data";

// function Search() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [inputValue, setInputValue] = useState("");

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 0);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const clearInput = () => {
//     setInputValue("");
//   };

//   const womenProducts = [
//     ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
//     ZaraProducts.Women.SATINY_BLAZER,
//     ZaraProducts.Women.FITTED_BLAZER,
//     ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
//     ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
//     ZaraProducts.Women.OVERSIZE_CRINKLE,
//   ];

//   console.log(womenProducts);

//   return (
//     <div>
//       <div className={`sticky top-0 z-10 ${isScrolled ? "bg-white" : ""}`}>
//         <div className="absolute w-full">
//           <Navbar />
//         </div>
//         <div className="SearchCatagory">
//           <p>WOMAN</p>
//           <p>MAN</p>
//           <p>KIDS</p>
//         </div>
//         <div className="SearchInput">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={handleInputChange}
//             placeholder="Search for an item, colour, collection..."
//           />
//           {inputValue && (
//             <svg
//               data-qa-action="search-products-form-clear"
//               className="search-products-form__input-clear-icon"
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="inherit"
//               stroke="inherit"
//               onClick={clearInput}
//               style={{ cursor: "pointer" }}
//             >
//               <path d="M12 12.707l6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707z"></path>
//             </svg>
//           )}
//         </div>
//       </div>

//       <div className="Search">
//         <div></div>
//         <div className="LikeSameWithProductData">
//           <LikeSameWithProductData />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Search;
