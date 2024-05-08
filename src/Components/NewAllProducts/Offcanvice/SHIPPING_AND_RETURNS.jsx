// SHIPPING_AND_RETURNS.js
import React, { useEffect, useState, useRef } from "react";
import { Drawer } from "@material-tailwind/react";
import "./Css.css";
import Shipping from "./Offcanvices/Shipping";
import Avalibilty from "./Offcanvices/Avalibilty";
import MEASUREMENT from "./Offcanvices/MEASUREMENT";
import AddToCart from "./Offcanvices/AddToCart";
import MEASUREMENTBOTTOM from "./Offcanvices/MEASUREMENTBOTTOM";
import SizeViewDrawer from "./Offcanvices/SizeViewDrawer";

function SHIPPING_AND_RETURNS({
  open,
  setOpen,
  Avail,
  setAvail,
  MEASURE,
  setMEASURE,
  ADDTOCART,
  setADDTOCART,
  MEASUREPENS,
  setMEASUREPENS,
  SizeView,
  setSizeView,
}) {
  const closeDrawer = () => {
    setOpen(false);
    setAvail(false);
    setMEASURE(false);
    setADDTOCART(false);
  };

  const closebottomdrawer = () => {
    setMEASUREPENS(false);
  };

  const CloseSizeView = () => {
    setSizeView(false);
  };

  const [lastDrawerSize, setLastDrawerSize] = useState(560);
  const [DrawerSize, setDrawerSize] = useState(435);

  useEffect(() => {
    const body = document.querySelector("body");
    if (open || Avail || MEASURE || ADDTOCART || MEASUREPENS || SizeView) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [open, Avail, MEASURE, ADDTOCART, MEASUREPENS, SizeView]);

  const getDrawerSize = () => {
    if (open) return 560;
    if (Avail) return 300;
    if (MEASURE) return 384;
    if (ADDTOCART) return 435;
    return lastDrawerSize;
  };

  const getBottomDrawerSize = () => {
    if (MEASUREPENS) return "100%";
  };
  const DrawerSizeView = () => {
    if (SizeView) {
      if (window.innerWidth <= 768) {
        return "100%";
      } else {
        return 435;
      }
    } else {
      return DrawerSize;
    }
  };

  useEffect(() => {
    if (open) setLastDrawerSize(560);
    if (Avail || MEASURE || ADDTOCART) setLastDrawerSize(300);
  }, [open, Avail, MEASURE, ADDTOCART]);

  useEffect(() => {
    if (SizeView) setDrawerSize(435);
  }, [SizeView]);

  return (
    <React.Fragment>
      <Drawer
        open={open || Avail || MEASURE || ADDTOCART}
        size={getDrawerSize()}
        onClose={closeDrawer}
        placement="right"
        className="p-4 Custom-Drawer bg-white"
      >
        {open && <Shipping closeDrawer={closeDrawer} />}
        {Avail && <Avalibilty closeDrawer={closeDrawer} />}
        {MEASURE && <MEASUREMENT closeDrawer={closeDrawer} />}
        {ADDTOCART && <AddToCart closeDrawer={closeDrawer} />}
      </Drawer>
      <Drawer
        open={MEASUREPENS}
        size={getBottomDrawerSize()}
        onClose={closebottomdrawer}
        placement="bottom"
        className="p-4 Custom-Drawer bg-white"
      >
        {MEASUREPENS && (
          <>
            <MEASUREMENTBOTTOM closebottomdrawer={closebottomdrawer} />
          </>
        )}
      </Drawer>
      <Drawer
        open={SizeView}
        size={DrawerSizeView()}
        onClose={CloseSizeView}
        placement="right"
        className="Custom-Drawer overflow-hidden"
      >
        {SizeView && (
          <>
            <div className="contentWrapper">
              <SizeViewDrawer CloseSizeView={CloseSizeView} />
            </div>
          </>
        )}
      </Drawer>
    </React.Fragment>
  );
}

export default SHIPPING_AND_RETURNS;
