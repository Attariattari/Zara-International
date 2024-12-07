import { IconButton, Typography } from "@material-tailwind/react";
import "../Css.css";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../Css.css";

function MEASUREMENT({ closeDrawer }) {
  const [selectedSize, setSelectedSize] = useState("EU XS / US XS");

  const measurementData = {
    "EU XS / US XS": {
      "A - CHEST": { CM: 47.0, inch: 18.5 },
      "B - FRONT LENGTH": { CM: 49.5, inch: 19.5 },
      "C - SLEEVE LENGTH": { CM: 59.0, inch: 23.2 },
      "D - BACK WIDTH": { CM: 39.5, inch: 15.6 },
      "E - ARM WIDTH": { CM: 16.0, inch: 6.3 },
    },
    "EU S / US S": {
      "A - CHEST": { CM: 49.0, inch: 19.3 },
      "B - FRONT LENGTH": { CM: 50.5, inch: 19.9 },
      "C - SLEEVE LENGTH": { CM: 60.0, inch: 23.6 },
      "D - BACK WIDTH": { CM: 40.5, inch: 15.9 },
      "E - ARM WIDTH": { CM: 17.0, inch: 6.7 },
    },
    "EU M / US M": {
      "A - CHEST": { CM: 51.0, inch: 20.1 },
      "B - FRONT LENGTH": { CM: 51.5, inch: 20.3 },
      "C - SLEEVE LENGTH": { CM: 61.0, inch: 24.0 },
      "D - BACK WIDTH": { CM: 41.5, inch: 16.3 },
      "E - ARM WIDTH": { CM: 18.0, inch: 7.1 },
    },
    "EU L / US L": {
      "A - CHEST": { CM: 53.0, inch: 20.9 },
      "B - FRONT LENGTH": { CM: 52.5, inch: 20.7 },
      "C - SLEEVE LENGTH": { CM: 62.0, inch: 24.4 },
      "D - BACK WIDTH": { CM: 42.5, inch: 16.7 },
      "E - ARM WIDTH": { CM: 19.0, inch: 7.5 },
    },
    "EU XL / US XL": {
      "A - CHEST": { CM: 55.0, inch: 21.7 },
      "B - FRONT LENGTH": { CM: 53.5, inch: 21.1 },
      "C - SLEEVE LENGTH": { CM: 63.0, inch: 24.8 },
      "D - BACK WIDTH": { CM: 43.5, inch: 17.1 },
      "E - ARM WIDTH": { CM: 20.0, inch: 7.9 },
    },
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray"></Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={closeDrawer}
          className="sticky top-0 "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="var(--text-color)"
            stroke="inherit"
            class="zds-dialog-icon-button__icon zds-dialog-close-button__icon"
          >
            <path d="m12 12.707 6.846 6.846.708-.707L12.707 12l6.847-6.846-.707-.708L12 11.293 5.154 4.446l-.707.708L11.293 12l-6.846 6.846.707.707L12 12.707Z"></path>
          </svg>
        </IconButton>
      </div>
      <Typography className="mb-8 font-normal">
        <div className="mt-14">ITEM MEASUREMENTS</div>
        <div
          className="mt-5"
          style={{
            border: "1px solid var(--border-color)",
          }}
        >
          <img src="https://i.ibb.co/GM4XVJF/c0f442f96d55.jpg" alt="" />
        </div>
        <div className="">
          <div className="MeasureButtons">
            <Swiper slidesPerView={3} spaceBetween={0} className="mySwiper">
              <SwiperSlide
                className={`SlidesButtonsXS ${
                  selectedSize === "EU XS / US XS" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU XS / US XS")}
              >
                <p style={{ fontSize: "12px" }}>EU XS / US XS</p>
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsS ${
                  selectedSize === "EU S / US S" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU S / US S")}
              >
                <p style={{ fontSize: "12px" }}>EU S / US S</p>{" "}
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsM ${
                  selectedSize === "EU M / US M" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU M / US M")}
              >
                <p style={{ fontSize: "12px" }}>EU M / US M</p>
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsL ${
                  selectedSize === "EU L / US L" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU L / US L")}
              >
                <p style={{ fontSize: "12px" }}>EU L / US L</p>
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsXL ${
                  selectedSize === "EU XL / US XL" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU XL / US XL")}
              >
                <p style={{ fontSize: "12px" }}>EU XL / US XL</p>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="mt-6">
            <table
              className="w-full mr-5 text-left rtl:text-right "
              style={{ fontSize: "11px" }}
            >
              <thead
                className=""
                style={{ border: "1px solid var(--border-color)" }}
              >
                <tr>
                  <th scope="col" className="px-3 py-2 ">
                    AREA
                  </th>
                  <th scope="col" className="px-3 py-2">
                    CM
                  </th>
                  <th scope="col" className="px-3 py-2 ">
                    IN
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedSize &&
                  Object.entries(measurementData[selectedSize]).map(
                    ([key, value]) => (
                      <tr
                        key={key}
                        className=" "
                        style={{ border: "1px solid var(--border-color)" }}
                      >
                        <th
                          scope="row"
                          className="px-3 py-2 font-medium  whitespace-nowrap "
                        >
                          {key}
                        </th>
                        <td className="px-3 py-2">{value.CM}</td>
                        <td className="px-3 py-2">{value.inch}</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </Typography>
    </>
  );
}

export default MEASUREMENT;
