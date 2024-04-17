// SHIPPING_AND_RETURNS.js
import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import "./Css.css";

function SHIPPING_AND_RETURNS({
  open,
  setOpen,
  Avail,
  setAvail,
  MEASURE,
  setMEASURE,
  drawerType,
}) {
  const closeDrawer = () => {
    setOpen(false);
    setAvail(false); // Close the other drawers as well
    setMEASURE(false);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (open || Avail || MEASURE) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [open, Avail, MEASURE]);
  return (
    <React.Fragment>
      <Drawer
        open={open || Avail || MEASURE}
        size={500}
        onClose={closeDrawer}
        placement="right"
        className="p-4 Custom-Drawer bg-white"
      >
        {open && (
          <div className="mb-6 flex items-center justify-between">
            Shipping
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
        )}
        {Avail && (
          <div className="mb-6 flex items-center justify-between">
            AVAIL
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
        )}
        {MEASURE && (
          <div className="mb-6 flex items-center justify-between">
            measure
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
        )}
      </Drawer>
    </React.Fragment>
  );
}

export default SHIPPING_AND_RETURNS;
