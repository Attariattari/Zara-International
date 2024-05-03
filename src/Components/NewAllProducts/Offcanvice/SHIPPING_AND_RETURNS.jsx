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
  MEASUREPENS,
  setMEASUREPENS,
  ADDTOCART,
  setADDTOCART,
}) {
  const closeDrawer = () => {
    setOpen(false);
    setAvail(false);
    setMEASURE(false);
    setADDTOCART(false);
    setMEASUREPENS(false);
  };

  const [lastDrawerSize, setLastDrawerSize] = useState(560);

  useEffect(() => {
    const body = document.querySelector("body");
    if (open || Avail || MEASURE || ADDTOCART || MEASUREPENS) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [open, Avail, MEASURE, ADDTOCART, MEASUREPENS]);

  const getDrawerSize = () => {
    if (open) return 560;
    if (Avail) return 300;
    if (MEASURE) return 384;
    if (MEASUREPENS) {
      return "100%";
    }
    if (ADDTOCART) return 435;
    return lastDrawerSize;
  };

  useEffect(() => {
    if (open) setLastDrawerSize(560);
    if (Avail || MEASURE || ADDTOCART) setLastDrawerSize(300);
    if (MEASUREPENS) setLastDrawerSize("100%");
  }, [open, Avail, MEASURE, ADDTOCART, MEASUREPENS]);

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
        {MEASUREPENS && (
          <div className="">
            <MEASUREMENT closeDrawer={closeDrawer} />
          </div>
        )}
      </Drawer>
    </React.Fragment>
  );
}

export default SHIPPING_AND_RETURNS;
{
  /* <Drawer
        open={MEASUREPENS}
        size={"100%"}
        onClose={closeDrawer}
        placement="bottom"
        className="p-4 Custom-Drawer bg-white overflow-y-scroll"
      >
        
      </Drawer> */
}
