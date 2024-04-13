// SHIPPING_AND_RETURNS.js
import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import './Css.css'

function SHIPPING_AND_RETURNS({ open, setOpen }) {
  const closeDrawer = () => setOpen(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (open) {
      // Prevent scrolling when the drawer is open
      body.style.overflow = "hidden";
    } else {
      // Allow scrolling when the drawer is closed
      body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow style when unmounting
    return () => {
      body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <React.Fragment>
      <Drawer
        open={open}
        size={500}
        onClose={closeDrawer}
        placement="right"
        className="p-4 Custom-Drawer"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Material Tailwind
          </Typography>
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
        <Typography color="gray" className="mb-8 pr-4 font-normal">
          Material Tailwind features multiple React and HTML components, all
          written with Tailwind CSS classes and Material Design guidelines.
        </Typography>
        <div className="flex gap-2">
          <Button size="sm" variant="outlined">
            Documentation
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default SHIPPING_AND_RETURNS;
