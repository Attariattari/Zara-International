import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LikeSameWithProductData from "../NewAllProducts/SingleProductData/LikeSomeProductsDataView/LikeSameWithProductData";
import { ZaraProducts } from "../../../src/Components/DummyData/Data";
import Footer from "../Footer/Footer";
import "./Css.css";
import NavBar_Show_After_Cart from "../Navbar/NavBar_Show_After_Cart/NavBar_Show_After_Cart";

function ShoppingBag() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("shoppingBag");
  const [wishlistStatus, setWishlistStatus] = useState({});

  const womenProducts = [
    ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
    ZaraProducts.Women.SATINY_BLAZER,
    ZaraProducts.Women.FITTED_BLAZER,
    ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
    ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
    ZaraProducts.Women.OVERSIZE_CRINKLE,
  ];
  const [quantities, setQuantities] = useState(
    Array(womenProducts.length).fill(1)
  );
  const ShippingRoute = () => {
    setActiveButton("shoppingBag");
    navigate("/Shopping_Bag");
  };

  const WishListRoute = () => {
    setActiveButton("wishlist");
    navigate("/Wishlist");
  };

  useEffect(() => {
    const handleOverflow = () => {
      const body = document.querySelector("body");
      if (Swal.isVisible()) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    };

    handleOverflow();

    const observer = new MutationObserver(() => {
      handleOverflow();
    });

    observer.observe(document.body, { attributes: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCountMinus = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  const handleCountPlus = (index) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] < 10) {
        newQuantities[index] += 1;
      } else {
        Swal.fire({
          title: "Warning",
          text: "To add more units of this item, please contact our Customer Service team.",
          icon: "warning",
          buttons: {
            confirm: {
              className: "swal-btn",
              text: "OK",
              value: true,
              button: true,
              closeModal: true,
            },
          },
          customClass: {
            popup: "custom-size",
            confirmButton: "custom-swal-btn",
          },
        });
      }
      return newQuantities;
    });
  };

  const toggleWishlist = (index) => {
    setWishlistStatus((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      <div className="sticky top-0 z-50" style={{ marginTop: "-9px" }}>
        <div
          className="absolute w-full"
          style={{
            backgroundColor: "var(--bg-color)",
          }}
        >
          <NavBar_Show_After_Cart />
          <div className="text-black mt-6 ShippingFavoButton">
            <button
              className={
                activeButton === "shoppingBag"
                  ? "activeButton ShippingButton"
                  : "ShippingButton"
              }
              onClick={ShippingRoute}
            >
              SHOPPING BAG (2)
            </button>
            <button
              className={
                activeButton === "wishlist"
                  ? "activeButton WishListButton"
                  : "WishListButton"
              }
              onClick={WishListRoute}
            >
              FAVOURITES
              <svg
                className="layout-shopping-lists-navigation__lists-icon wishlist-icon"
                preserveAspectRatio="xMidYMid slice"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="var(--text-color)"
                stroke="inherit"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="ShoppingBAg">
        <div className="CartProducts">
          <div className="Cartdata">
            {womenProducts.map((product, index) => (
              <div className="CartGridView" key={index}>
                <div className="cartproductimage">
                  <img src={product.images} alt="" />
                </div>
                <div className="cartprdocutsdetailes">
                  <div className="cartseconds">
                    <div>
                      <div>
                        {product.title.length > 19
                          ? product.title.substring(0, 19) + "..."
                          : product.title}
                      </div>
                      <div>{product.price.RealPrice}</div>
                      <div className="mt-2">
                        {Array.isArray(product.size) && product.size.length > 0
                          ? product.size[0]
                          : product.size}{" "}
                        | ECRU
                      </div>
                    </div>
                    <div className="cartitemicons">
                      {wishlistStatus[index] ? (
                        <svg
                          className="wishlist-icon wishlist-icon--productDetail"
                          preserveAspectRatio="xMidYMid slice"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="var(--text-color)"
                          stroke="inherit"
                          onClick={() => toggleWishlist(index)}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 15.238L17 20V4H7v16l5-4.762z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="wishlist-icon wishlist-icon--productDetail"
                          preserveAspectRatio="xMidYMid slice"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="var(--text-color)"
                          stroke="inherit"
                          onClick={() => toggleWishlist(index)}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
                          ></path>
                        </svg>
                      )}
                      <svg
                        className="shop-cart-item-actions__action-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="var(--text-color)"
                        stroke="inherit"
                      >
                        <path d="M12 12.707l6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="cartitemquantity">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleCountMinus(index)}
                    >
                      -
                    </div>
                    <div className="cursor-default">
                      {quantities[index] || 1}
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => handleCountPlus(index)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="CartLikeProducts">
        <LikeSameWithProductData />
      </div>
      <Footer />
      <div className="sticky bottom-0 z-50">
        <div className="CartpropccessOrder">
          <div className="CartPropssesstitle">
            *By continuing, I declare that I have read and accept the Purchase
            Conditions and understand Zara's Privacy and Cookie Policy.
          </div>
          <div className="CartProccesses">
            <div className="CardTotalShow" style={{ padding: "0px" }}>
              <div>TOTAL</div>
              <div className="flex-col">
                <div className="">899.50 EUR</div>
                <div
                  className="text-gray-700"
                  style={{
                    fontSize: "9px",
                  }}
                >
                  * BEFORE TAXES
                </div>
              </div>
            </div>
            <Link className="Cartcontinuebutton" to="/Address_Conform">
              <button className="Contiun">CONTINUE</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingBag;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import LikeSameWithProductData from "../NewAllProducts/SingleProductData/LikeSomeProductsDataView/LikeSameWithProductData";
// import { ZaraProducts } from "../../../src/Components/DummyData/Data";
// import Footer from "../Footer/Footer";
// import "./Css.css";
// import NavBar_Show_After_Cart from "../Navbar/NavBar_Show_After_Cart/NavBar_Show_After_Cart";

// function ShoppingBag() {
//   const navigate = useNavigate();
//   const [activeButton, setActiveButton] = useState("shoppingBag");
//   const [wishlistStatus, setWishlistStatus] = useState({});
//   const [count, setCount] = useState(1);
//   const womenProducts = [
//     ZaraProducts.Women.LINEN_BLEND_ROLL_UP,
//     ZaraProducts.Women.SATINY_BLAZER,
//     ZaraProducts.Women.FITTED_BLAZER,
//     ZaraProducts.Women.ASYMMETRIC_TULLE_DRESS,
//     ZaraProducts.Women.MINIMALIST_FITTED_BLAZER,
//     ZaraProducts.Women.OVERSIZE_CRINKLE,
//   ];
//   const ShippingRoute = () => {
//     setActiveButton("shoppingBag");
//     navigate("/Shopping_Bag");
//   };

//   const WishListRoute = () => {
//     setActiveButton("wishlist");
//     navigate("/Wishlist");
//   };

//   useEffect(() => {
//     const handleOverflow = () => {
//       const body = document.querySelector("body");
//       if (Swal.isVisible()) {
//         body.style.overflow = "hidden";
//       } else {
//         body.style.overflow = "auto";
//       }
//     };

//     handleOverflow();

//     const observer = new MutationObserver((mutationsList, observer) => {
//       handleOverflow();
//     });

//     observer.observe(document.body, { attributes: true, subtree: true });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
//   const handleCountMinus = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };
//   const handleCountPlus = () => {
//     if (count < 10) {
//       setCount(count + 1);
//     } else {
//       Swal.fire({
//         title: "Warning",
//         text: "To add more units of this item, please contact our Customer Service team.",
//         icon: "warning",
//         buttons: {
//           confirm: {
//             className: "swal-btn",
//             text: "OK",
//             value: true,
//             button: true,
//             closeModal: true,
//           },
//         },
//         customClass: {
//           popup: "custom-size",
//           confirmButton: "custom-swal-btn",
//         },
//       }).then((value) => {
//         if (value) {
//         }
//       });
//     }
//   };

//   const toggleWishlist = (index) => {
//     setWishlistStatus((prevState) => ({
//       ...prevState,
//       [index]: !prevState[index],
//     }));
//   };

//   return (
//     <div>
//       <div className="sticky top-0 z-50" style={{ marginTop: "-9px" }}>
//         <div className="absolute w-full bg-white">
//           <NavBar_Show_After_Cart />
//           <div className="text-black mt-6 ShippingFavoButton">
//             <button
//               className={
//                 activeButton === "shoppingBag"
//                   ? "activeButton ShippingButton"
//                   : "ShippingButton"
//               }
//               onClick={ShippingRoute}
//             >
//               SHOPPING BAG (2)
//             </button>
//             <button
//               className={
//                 activeButton === "wishlist"
//                   ? "activeButton WishListButton"
//                   : "WishListButton"
//               }
//               onClick={WishListRoute}
//             >
//               FAVOURITES
//               <svg
//                 className="layout-shopping-lists-navigation__lists-icon wishlist-icon"
//                 preserveAspectRatio="xMidYMid slice"
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="var(--text-color)"
//                 stroke="inherit"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="ShoppingBAg">
//         <div className="CartProducts">
//           <div className="Cartdata">
//             {womenProducts.map((product, index) => (
//               <div className="CartGridView" key={index}>
//                 <div className="cartproductimage">
//                   <img src={product.images} alt="" />
//                 </div>
//                 <div className="cartprdocutsdetailes">
//                   <div className="cartseconds">
//                     <div>
//                       <div>
//                         {product.title.length > 19
//                           ? product.title.substring(0, 19) + "..."
//                           : product.title}
//                       </div>
//                       <div>{product.price.RealPrice}</div>
//                       <div className="mt-2">
//                         {Array.isArray(product.size) && product.size.length > 0
//                           ? product.size[0]
//                           : product.size}{" "}
//                         | ECRU
//                       </div>
//                     </div>
//                     <div className="cartitemicons">
//                       {wishlistStatus[index] ? (
//                         <svg
//                           className="wishlist-icon wishlist-icon--productDetail"
//                           preserveAspectRatio="xMidYMid slice"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="var(--text-color)"
//                           stroke="inherit"
//                           onClick={() => toggleWishlist(index)}
//                         >
//                           <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M12 15.238L17 20V4H7v16l5-4.762z"
//                           ></path>
//                         </svg>
//                       ) : (
//                         <svg
//                           className="wishlist-icon wishlist-icon--productDetail"
//                           preserveAspectRatio="xMidYMid slice"
//                           width="24"
//                           height="24"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="var(--text-color)"
//                           stroke="inherit"
//                           onClick={() => toggleWishlist(index)}
//                         >
//                           <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
//                           ></path>
//                         </svg>
//                       )}
//                       <svg
//                         class="shop-cart-item-actions__action-icon"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="var(--text-color)"
//                         stroke="inherit"
//                       >
//                         <path d="M12 12.707l6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707z"></path>
//                       </svg>
//                     </div>
//                   </div>
//                   <div className="cartitemquantity">
//                     <div className="cursor-pointer" onClick={handleCountMinus}>
//                       -
//                     </div>
//                     <div className="cursor-default">{count}</div>
//                     <div className="cursor-pointer" onClick={handleCountPlus}>
//                       +
//                     </div>
//                   </div>
//                 </div>{" "}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="CartLikeProducts">
//         <LikeSameWithProductData />
//       </div>
//       <Footer />
//       <div className="sticky bottom-0 z-50">
//         <div className="CartpropccessOrder">
//           <div className="CartPropssesstitle">
//             *By continuing, I declare that I have read and accept the Purchase
//             Conditions and understand Zara's Privacy and Cookie Policy.
//           </div>
//           <div className="CartProccesses">
//             <div className="CardTotalShow" style={{ padding: "0px" }}>
//               <div>TOTAL</div>
//               <div className="flex-col">
//                 <div className="">899.50 EUR</div>
//                 <div
//                   className="text-gray-700"
//                   style={{
//                     fontSize: "9px",
//                   }}
//                 >
//                   * BEFORE TAXES
//                 </div>
//               </div>
//             </div>
//             <Link className="Cartcontinuebutton" to="/Address_Conform">
//               <button className="Contiun">CONTINUE</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingBag;
