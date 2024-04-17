// SHIPPING_AND_RETURNS.js
import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import "./Css.css";
import Shipping from "./Threeoffcanvice/Shipping";
import Avalibilty from "./Threeoffcanvice/Avalibilty";
import MEASUREMENT from "./Threeoffcanvice/MEASUREMENT";

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
          <>
            <Shipping closeDrawer={closeDrawer} />
          </>
        )}
        {Avail && (
          <>
            <Avalibilty closeDrawer={closeDrawer} />
          </>
        )}
        {MEASURE && (
          <>
            <MEASUREMENT closeDrawer={closeDrawer} />
          </>
        )}
      </Drawer>
    </React.Fragment>
  );
}

export default SHIPPING_AND_RETURNS;
