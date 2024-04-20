// SHIPPING_AND_RETURNS.js
import React, { useEffect, useState } from "react";
import { Drawer } from "@material-tailwind/react";
import "./Css.css";
import Shipping from "./Offcanvices/Shipping";
import Avalibilty from "./Offcanvices/Avalibilty";
import MEASUREMENT from "./Offcanvices/MEASUREMENT";
import AddToCart from "./Offcanvices/AddToCart";

function SHIPPING_AND_RETURNS({
  open,
  setOpen,
  Avail,
  setAvail,
  MEASURE,
  setMEASURE,
  ADDTOCART,
  setADDTOCART,
}) {
  const closeDrawer = () => {
    setOpen(false);
    setAvail(false);
    setMEASURE(false);
    setADDTOCART(false);
  };

  const [lastDrawerSize, setLastDrawerSize] = useState(560);

  useEffect(() => {
    const body = document.querySelector("body");
    if (open || Avail || MEASURE || ADDTOCART) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [open, Avail, MEASURE, ADDTOCART]);

  const getDrawerSize = () => {
    if (open) return 560;
    if (Avail) return 300;
    if (MEASURE) return 384;
    if (ADDTOCART) return 435;
    return lastDrawerSize; // Default size for Shipping drawer
  };

  useEffect(() => {
    if (open) setLastDrawerSize(560);
    if (Avail || MEASURE || ADDTOCART) setLastDrawerSize(300);
  }, [open, Avail, MEASURE, ADDTOCART]);

  return (
    <React.Fragment>
      <Drawer
        open={open || Avail || MEASURE || ADDTOCART}
        size={getDrawerSize()}
        onClose={closeDrawer}
        placement="right"
        className="p-4 Custom-Drawer bg-white overflow-y-scroll"
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
          <div className="">
            <MEASUREMENT closeDrawer={closeDrawer} />
          </div>
        )}
        {ADDTOCART && (
          <>
            <AddToCart closeDrawer={closeDrawer} />
          </>
        )}
      </Drawer>
    </React.Fragment>
  );
}

export default SHIPPING_AND_RETURNS;
