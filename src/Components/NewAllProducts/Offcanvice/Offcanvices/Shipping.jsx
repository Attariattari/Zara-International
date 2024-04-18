import { Button, IconButton, Typography } from "@material-tailwind/react";
import React from "react";
import "../Css.css";
import { Link } from "react-router-dom";

function Shipping({ closeDrawer }) {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Typography
          variant="h5"
          color="blue-gray"
          className="opacity-0"
        ></Typography>
        <IconButton variant="text" onClick={closeDrawer}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="inherit"
            stroke="inherit"
            class="zds-dialog-icon-button__icon zds-dialog-close-button__icon"
          >
            <path d="m12 12.707 6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707Z"></path>
          </svg>
        </IconButton>
      </div>
      <Typography className="mt-20 text-black font-normal">
        <div>
          <div className="">Shipping</div>
          <div className="mt-6" style={{ fontSize: "11px" }}>
            HOME DELIVERY:
          </div>
          <p className="mt-3 circle-before">
            <span
              style={{
                fontSize: "12px",
                color: "black",
              }}
            >
              9.95 EUR
            </span>{" "}
            for shipping to Brunei, Maldives, Mozambique, Nigeria and Sierra
            Leone. Shipping will be free if your order includes non-discounted
            items worth over 150 EUR.
          </p>
          <p className="mt-5 circle-beforetwo">
            <span
              style={{
                fontSize: "12px",
                color: "black",
              }}
            >
              19.95 EUR
            </span>{" "}
            for shipping to any other market or region.
          </p>
          <div className="mt-10">EXCHANGES AND RETURNS</div>
          <p
            className="mt-3"
            style={{
              fontSize: "11px",
              color: "grey",
            }}
          >
            You have 30 days from the shipping date to return your purchase from
            Zara.com.
          </p>
          <div
            className="mt-8"
            style={{
              fontSize: "11px",
            }}
          >
            HOME COLLECTION - 19.95€
          </div>
          <p
            className="mt-3"
            style={{
              fontSize: "11px",
              color: "grey",
            }}
          >
            The cost of the return applies to each request and will be deducted
            from the refund amount.
          </p>
          <div
            className="mt-10"
            style={{
              fontSize: "11px",
            }}
          >
            For more information, we suggest you go to the{" "}
            <Link to="/Help" className="underline">
              Help
            </Link>{" "}
            section.
          </div>
        </div>
      </Typography>
    </>
  );
}

export default Shipping;
