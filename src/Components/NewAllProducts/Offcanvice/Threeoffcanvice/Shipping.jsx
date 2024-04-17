import { IconButton } from "@material-tailwind/react";
import React from "react";

function Shipping({closeDrawer}) {
  return (
      <div className="mb-6 flex items-center justify-between">
        <div style={{
         opacity:"0"
        }}> Shipping</div>
       
        <IconButton variant="text" onClick={closeDrawer}>
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
  );
}

export default Shipping;
