import { IconButton, Typography } from "@material-tailwind/react";
import "../Css.css";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../Css.css";

function MEASUREMENTBOTTOM({ closebottomdrawer }) {
  const [selectedSize, setSelectedSize] = useState("EU 32 / US 0");

  const measurementData = {
    "EU 32 / US 0": {
      "A - WAIST": { CM: 29.0, inch: 11.4 },
      "B - HIP LENGTH": { CM: 36.0, inch: 14.2 },
      "C - FRONT LENGTH": { CM: 112.0, inch: 44.1 },
      "D - FRONT RISE": { CM: 26.0, inch: 10.2 },
      "E - BACK RISE": { CM: 31.5, inch: 12.4 },
    },
    "EU 34 / US 2": {
      "A - WAIST": { CM: 30.5, inch: 12.0 },
      "B - HIP LENGTH": { CM: 37.5, inch: 14.8 },
      "C - FRONT LENGTH": { CM: 112.5, inch: 44.3 },
      "D - FRONT RISE": { CM: 27.0, inch: 10.6 },
      "E - BACK RISE": { CM: 32.5, inch: 12.8 },
    },
    "EU 36 / US 4": {
      "A - WAIST": { CM: 32.0, inch: 12.6 },
      "B - HIP LENGTH": { CM: 39.0, inch: 15.4 },
      "C - FRONT LENGTH": { CM: 113.0, inch: 44.5 },
      "D - FRONT RISE": { CM: 28.0, inch: 11.0 },
      "E - BACK RISE": { CM: 33.5, inch: 13.2 },
    },
    "EU 38 / US 6": {
      "A - WAIST": { CM: 35.5, inch: 13.2 },
      "B - HIP LENGTH": { CM: 40.5, inch: 15.9 },
      "C - FRONT LENGTH": { CM: 113.5, inch: 44.7 },
      "D - FRONT RISE": { CM: 29.0, inch: 11.4 },
      "E - BACK RISE": { CM: 34.5, inch: 13.6 },
    },
    "EU 40 / US 8": {
      "A - WAIST": { CM: 35.0, inch: 13.8 },
      "B - HIP LENGTH": { CM: 42.0, inch: 16.5 },
      "C - FRONT LENGTH": { CM: 114.0, inch: 44.9 },
      "D - FRONT RISE": { CM: 30.0, inch: 11.8 },
      "E - BACK RISE": { CM: 35.5, inch: 14.0 },
    },
    "EU 42 / US 10": {
      "A - WAIST": { CM: 36.5, inch: 14.4 },
      "B - HIP LENGTH": { CM: 43.5, inch: 17.1 },
      "C - FRONT LENGTH": { CM: 114.5, inch: 45.1 },
      "D - FRONT RISE": { CM: 31.0, inch: 12.2 },
      "E - BACK RISE": { CM: 36.5, inch: 14.4 },
    },
    "EU 44 / US 12": {
      "A - WAIST": { CM: 38.0, inch: 15.0 },
      "B - HIP LENGTH": { CM: 45.0, inch: 17.7 },
      "C - FRONT LENGTH": { CM: 115.0, inch: 45.3 },
      "D - FRONT RISE": { CM: 32.0, inch: 12.6 },
      "E - BACK RISE": { CM: 37.5, inch: 14.8 },
    },
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray"></Typography>
        <div
          variant="text"
          color="blue-gray"
          onClick={closebottomdrawer}
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
        </div>
      </div>
      <Typography className="mb-8 font-normal">
        <div className="mt-14">ITEM MEASUREMENTS</div>
        <div className="imageareameasurement">
          <img
            src="https://static.zara.net/photos///contents/sizes_guide/b5d6/529e/8afbc82c5ecb//w/341/6d1bce8d5fe5.jpg?ts=1585094400000"
            alt=""
          />
        </div>
        <div className="">
          <div className="MeasureButtons">
            <Swiper slidesPerView={3} spaceBetween={0} className="mySwiper">
              <SwiperSlide
                className={`SlidesButtonsXS ${
                  selectedSize === "EU 32 / US 0" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU 32 / US 0")}
              >
                EU 32 / US 0
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsS ${
                  selectedSize === "EU 34 / US 2" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU 34 / US 2")}
              >
                EU 34 / US 2
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsM ${
                  selectedSize === "EU 36 / US 4" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU 36 / US 4")}
              >
                EU 36 / US 4
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsL ${
                  selectedSize === "EU 38 / US 6" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU 38 / US 6")}
              >
                EU 38 / US 6
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsXL ${
                  selectedSize === "EU 40 / US 8" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU 40 / US 8")}
              >
                EU 40 / US 8
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsXL ${
                  selectedSize === "EU 42 / US 10" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU 42 / US 10")}
              >
                EU 42 / US 10
              </SwiperSlide>
              <SwiperSlide
                className={`SlidesButtonsXL ${
                  selectedSize === "EU 44 / US 12" ? "activeSize" : ""
                }`}
                onClick={() => handleSizeSelect("EU 44 / US 12")}
              >
                EU 44 / US 12
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="mt-6">
            <table
              className="w-full mr-5 text-left rtl:text-right "
              style={{ fontSize: "11px" }}
            >
              <thead className="" style={{ border: "1px solid black" }}>
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
                        className="bg-white dark:bg-gray-800"
                        style={{ border: "1px solid black" }}
                      >
                        <th
                          scope="row"
                          className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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

export default MEASUREMENTBOTTOM;
