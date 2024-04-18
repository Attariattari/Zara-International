import React, { useState } from "react";
import { Link } from "react-router-dom";
import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
import "../SingleProduct.css";

function AllProductDataView({ womenProducts }) {
  const [open, setOpen] = useState(false);
  const [Avail, setAvail] = useState(false);
  const [MEASURE, setMEASURE] = useState(false);
  const [ADDTOCART, setADDTOCART] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(false);

  const openDrawer = (drawerType) => {
    if (drawerType === "shipping") setOpen(true);
    else if (drawerType === "avail") setAvail(true);
    else if (drawerType === "measure") setMEASURE(true);
    else if (drawerType === "AddToCart" && selectedSize) {
      setADDTOCART(true);
    } else {
      setError(true);
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setError(false); // Reset error when a size is selected
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
              className={selectedSize === size ? "selectedSize" : ""}
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
        className="AddButton"
        onClick={(e) => {
          e.preventDefault();
          openDrawer("AddToCart");
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        ADD
      </button>
      <div className="offcanvaceparent">
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
      </div>{error && <p>Please first select a size.</p>}
    </div>
  );
}

export default AllProductDataView;