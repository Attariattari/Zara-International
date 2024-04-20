import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import "./Css.css";

function ShoppingBag() {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("shoppingBag");
  const [count, setCount] = useState(1);
  const ShippingRoute = () => {
    setActiveButton("shoppingBag");
    navigate("/Shopping_Bag");
  };

  const WishListRoute = () => {
    setActiveButton("wishlist");
    navigate("/Wishlist");
  };

  const handleCountMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleCountPlus = () => {
    if (count < 10) {
      setCount(count + 1);
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
      }).then((value) => {
        if (value) {
        }
      });
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-10" style={{ marginTop: "-9px" }}>
        <div className="absolute w-full bg-white">
          <Navbar />
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
                fill="inherit"
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
            <div className="cartproductimage">
              <img
                src="https://static.zara.net/assets/public/8d6e/88db/ca8c42fbaf5b/3a757794edb1/02764637712-p/02764637712-p.jpg?ts=1711113921879&w=268"
                alt=""
              />
            </div>
            <div className="cartprdocutsdetailes">
              <div className="cartseconds">
                <div>
                  <div>ROUND NECK PIQUÉ BLAZER</div>
                  <div>349.65 EUR</div>
                  <div className="mt-2">EU M / US M|ECRU</div>
                </div>
                <div className="cartitemicons">
                  <svg
                    className="layout-shopping-lists-navigation__lists-icon wishlist-icon"
                    preserveAspectRatio="xMidYMid slice"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="inherit"
                    stroke="inherit"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
                    ></path>
                  </svg>
                  <svg
                    class="shop-cart-item-actions__action-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="inherit"
                    stroke="inherit"
                  >
                    <path d="M12 12.707l6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707z"></path>
                  </svg>
                </div>
              </div>
              <div className="cartitemquantity">
                <div className="cursor-pointer" onClick={handleCountMinus}>
                  -
                </div>
                <div className="cursor-default">{count}</div>
                <div className="cursor-pointer" onClick={handleCountPlus}>
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <div className="sticky bottom-0 z-10">
        <div className="CartpropccessOrder">dsadad</div>
      </div>
    </div>
  );
}

export default ShoppingBag;
