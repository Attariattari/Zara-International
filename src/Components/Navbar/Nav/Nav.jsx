import React from "react";
import Logo from "./Logo";
import { Outlet } from "react-router-dom";

function Nav({ show, children }) {
  return (
    <div
      className={
        (show ? "right-0 " : "-right-full ") +
        "top-0 z-10 text-gray-100 fixed lg:static md:w-52 min-h-screen transition-all "
      }
      style={{ maxWidth: "17rem", width: "21em", backgroundColor: "#041230" }}
    >
      <div
        className="w-full h-44  flex justify-center items-center"
        style={{
          borderBottom: "0.1px solid rgb(157, 154, 154)",
        }}
      >
        <div className=" relative flex justify-center w-full h-full items-center">
          <Logo show={show} />
          {children}
        </div>
      </div>

      <nav className="flex flex-col gap-2 overflow-hidden">
        <div className="flex flex-col gap-7 p-10  text-lg font-extralight">
          <div className="">hi</div>
        </div>
      </nav>
      <Outlet/>
    </div>
  );
}

export default Nav;
