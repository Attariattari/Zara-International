import React, { useEffect, useState } from "react";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { Field } from "formik";

function WishListDrawer({
  createList,
  setCreateList,
  share,
  setShare,
  settings,
  setSettings,
}) {
  const closeDrawer = () => {
    setCreateList(false);
    setShare(false);
    setSettings(false);
  };
  const [focusedName, setFocusedName] = useState(false);
  const [errors, setErrors] = useState({ Name: "" });
  useEffect(() => {
    const body = document.querySelector("body");
    if (createList || share || settings) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [createList, share, settings]);

  return (
    <React.Fragment>
      <Drawer
        open={createList || share || settings}
        size={384}
        onClose={closeDrawer}
        placement="right"
        className="p-4 Custom-Drawer bg-white overflow-y-scroll"
      >
        {createList && (
          <div>
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
            <Typography>
              <div>CREATE LIST</div>
            </Typography>
            <Typography>
              <div className="mt-16 ">
                <div
                  className={`mb-4 relative ${
                    errors.Name ? "border-b-1 border-red-500" : "border-b-1"
                  }`}
                >
                  <label
                    className={
                      "absolute mb-3 text-xs transition-all duration-150 " +
                      (!focusedName ? "-z-10 top-5" : "top-1")
                    }
                  >
                    Name
                  </label>
                  <input
                    className="pt-5 pb-2 outline-none w-full text-xs"
                    name="Name"
                    type="Name"
                    placeholder={!focusedName ? "Name" : ""}
                    onFocus={() => setFocusedName(true)}
                    onBlur={(ev) => {
                      if (ev.target.value.length === 0) setFocusedName(false);
                      setErrors({
                        ...errors,
                      });
                    }}
                    style={{
                      borderBottom: errors.Name
                        ? "1px solid red"
                        : "1px solid black",
                    }}
                  />
                  {errors.Name && (
                    <div className="text-red-500 text-xs absolute">
                      {errors.Name}
                    </div>
                  )}
                </div>
                <button>CREATE</button>
              </div>
            </Typography>
          </div>
        )}
        {share && <div>SHARE</div>}
        {settings && (
          <div>
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
          </div>
        )}
      </Drawer>
    </React.Fragment>
  );
}

export default WishListDrawer;
