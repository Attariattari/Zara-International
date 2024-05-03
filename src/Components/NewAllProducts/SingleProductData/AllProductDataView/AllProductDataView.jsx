import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
import "../SingleProduct.css";
import { useMeasureContext } from "../../../../Context/Drawer_state_controller";

function AllProductDataView({ womenProducts }) {
  const [open, setOpen] = useState(false);
  const [Avail, setAvail] = useState(false);
  const { MEASURE, setMEASURE } = useMeasureContext(false);
  const [ADDTOCART, setADDTOCART] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(false);

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

    const observer = new MutationObserver((mutationsList, observer) => {
      handleOverflow();
    });

    observer.observe(document.body, { attributes: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const openDrawer = (drawerType) => {
    if (drawerType === "shipping") setOpen(true);
    else if (drawerType === "avail") setAvail(true);
    else if (drawerType === "measure") setMEASURE(true);
    else if (drawerType === "AddToCart" && selectedSize) {
      setADDTOCART(true);
      setSelectedSize(null); // Reset selectedSize after adding to cart
    } else {
      setError(true);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size, () => {
      // Callback function to execute after state update
      setError(false); // Reset error when a size is selected
    });
  };

  const showErrorModal = () => {
    Swal.fire({
      title: "NO ADD ITEM!",
      text: "Please first select a size.",
      icon: "error",
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
  };

  return (
    <div>
      <div className="Productdetails">
        <span>
          <p>{womenProducts[0].title.substring(0, 32)}</p>
          <svg
            className="wishlist-icon wishlist-icon--productDetail"
            preserveAspectRatio="xMidYMid slice"
            width="16"
            height="16"
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
        </span>
        <p>{womenProducts[0].price.RealPrice}</p>
        <p>{womenProducts[0].discription}</p>
        <Link
          onClick={(e) => {
            e.preventDefault();
            openDrawer("avail");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          CHECK IN-STORE AVAILABILITY
        </Link>
        <br />
        <Link
          onClick={(e) => {
            e.preventDefault();
            openDrawer("shipping");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          SHIPPING AND RETURNS
        </Link>
      </div>
      <div className="productcolorsandsize">
        <p>{womenProducts[0].color}</p>
        <div className="Colors">
          <span className="color-box" style={{ backgroundColor: "white" }} />
          <span className="color-box" style={{ backgroundColor: "black" }} />
          <span className="color-box" style={{ backgroundColor: "blue" }} />
        </div>
        <span className="product-sizes">
          {womenProducts[0].size.map((size, index) => (
            <button
              key={index}
              className={selectedSize === size ? "Size" : ""}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </span>
        <Link
          onClick={(e) => {
            e.preventDefault();
            openDrawer("measure");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
        >
          MEASUREMENT GUIDE
        </Link>
      </div>
      <button
        className={`AddButton ${selectedSize ? "selected" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          if (selectedSize) {
            openDrawer("AddToCart");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          } else {
            showErrorModal();
          }
        }}
      >
        ADD
      </button>
      <div>
        <SHIPPING_AND_RETURNS
          open={open}
          setOpen={setOpen}
          Avail={Avail}
          setAvail={setAvail}
          MEASURE={MEASURE}
          setMEASURE={setMEASURE}
          ADDTOCART={ADDTOCART}
          setADDTOCART={setADDTOCART}
        />
      </div>
    </div>
  );
}

export default AllProductDataView;
