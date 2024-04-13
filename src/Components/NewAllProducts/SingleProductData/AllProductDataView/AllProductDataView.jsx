import React, { useState } from "react";
import { Link } from "react-router-dom";
import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
import "../SingleProduct.css";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

function AllProductDataView({ womenProducts }) {
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  // Remove the closeDrawer function as it's not needed here

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
        <Link>CHECK IN-STORE AVAILABILITY</Link>
        <br />
        <Link onClick={openDrawer}>SHIPPING AND RETURNS</Link>
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
            <button key={index}>{size}</button>
          ))}
        </span>
        <p>MEASUREMENT GUIDE</p>
      </div>
      <button className="AddButton">ADD</button>
      <div className="offcanvaceparent">
        <SHIPPING_AND_RETURNS open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

export default AllProductDataView;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import SHIPPING_AND_RETURNS from "../../Offcanvice/SHIPPING_AND_RETURNS";
// import "../SingleProduct.css";
// import {
//   Drawer,
//   Button,
//   Typography,
//   IconButton,
// } from "@material-tailwind/react";
// function AllProductDataView({ womenProducts }) {
//   const [open, setOpen] = React.useState(false);
 
//   const openDrawer = () => setOpen(true);
//   const closeDrawer = () => setOpen(false);
//   return (
//     <div>
//       <div className="Productdetails">
//         <span>
//           <p>{womenProducts[0].title.substring(0, 32)}</p>
//           <svg
//             class="wishlist-icon wishlist-icon--productDetail"
//             preserveAspectRatio="xMidYMid slice"
//             width="16"
//             heigth="16"
//             height="16"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="inherit"
//             stroke="inherit"
//           >
//             <path
//               fill-rule="evenodd"
//               clip-rule="evenodd"
//               d="M12 15.238L17 20V4H7v16l5-4.762zm-4 2.429l4-3.81 4 3.81V5H8v12.667z"
//             ></path>
//           </svg>
//         </span>
//         <p>{womenProducts[0].price.RealPrice}</p>
//         <p>{womenProducts[0].discription}</p>
//         <Link>CHECK IN-STORE AVAILABILITY</Link>
//         <br />
//         <Link onClick={openDrawer}>SHIPPING AND RETURNS</Link>
//       </div>
//       <div className="productcolorsandsize">
//         <p>{womenProducts[0].color}</p>
//         <div className="Colors">
//           <span className="color-box" style={{ backgroundColor: "white" }} />
//           <span className="color-box" style={{ backgroundColor: "black" }} />
//           <span className="color-box" style={{ backgroundColor: "blue" }} />
//         </div>
//         <span className="product-sizes">
//           {womenProducts[0].size.map((size, index) => (
//             <button key={index}>{size}</button>
//           ))}
//         </span>
//         <p>MEASUREMENT GUIDE</p>
//       </div>
//       <button className="AddButton">ADD</button>
//       {open && (
//         <div className="offcanvaceparent">
//           <SHIPPING_AND_RETURNS closeDrawer={closeDrawer} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default AllProductDataView;
