import React, { useEffect, useState } from "react";
import { Drawer } from "@material-tailwind/react";
import "./Css.css";
import Shipping from "./Offcanvices/Shipping";
import Avalibilty from "./Offcanvices/Avalibilty";
import MEASUREMENT from "./Offcanvices/MEASUREMENT";
import AddToCart from "./Offcanvices/AddToCart";
import MEASUREMENTBOTTOM from "./Offcanvices/MEASUREMENTBOTTOM";
import SizeViewDrawer from "./Offcanvices/SizeViewDrawer";

function SHIPPING_AND_RETURNS({
  drawerType,
  closeDrawer,
  MEASUREPENS,
  setMEASUREPENS,
  SizeView,
  setSizeView,
}) {
  const [lastDrawerSize, setLastDrawerSize] = useState(560);
  const [DrawerSize, setDrawerSize] = useState(435);

  const getDrawerSize = () => {
    switch (drawerType) {
      case "shipping":
        return 560;
      case "avail":
        return 300;
      case "measure":
        return 384;
      case "AddToCart":
        return 435;
      default:
        return lastDrawerSize;
    }
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

  const CloseSizeView = () => {
    setSizeView(false);
  };

  const closebottomdrawer = () => {
    setMEASUREPENS(false);
  };

  useEffect(() => {
    if (["shipping", "avail", "measure", "AddToCart"].includes(drawerType)) {
      setLastDrawerSize(300);
    } else if (drawerType === "SizeView") {
      setLastDrawerSize(435);
    }
  }, [drawerType]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (drawerType) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [drawerType]);

  useEffect(() => {
    if (SizeView) setDrawerSize(435);
  }, [SizeView]);

  return (
    <React.Fragment>
      <Drawer
        open={
          drawerType &&
          ["shipping", "avail", "measure", "AddToCart"].includes(drawerType)
        }
        size={getDrawerSize()}
        onClose={closeDrawer}
        placement="right"
        className="p-4 overflow-y-auto bg-custom-bg Custom-Drawer"
      >
        {drawerType === "shipping" && <Shipping closeDrawer={closeDrawer} />}
        {drawerType === "avail" && <Avalibilty closeDrawer={closeDrawer} />}
        {drawerType === "measure" && <MEASUREMENT closeDrawer={closeDrawer} />}
        {drawerType === "AddToCart" && <AddToCart closeDrawer={closeDrawer} />}
      </Drawer>
      <Drawer
        open={MEASUREPENS}
        size={getBottomDrawerSize()}
        onClose={closebottomdrawer}
        placement="bottom"
        className="p-4 overflow-y-auto bg-custom-bg Custom-Drawer"
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
