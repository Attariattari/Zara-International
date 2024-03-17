import React from "react";
import "./New.css";
import Navbar from "../Navbar/Navbar";
import { NewData } from "../DummyData/Data";
const NewDataImages = [NewData];
function New() {
  return (
    <div>
      <div className="sticky top-0 z-10" style={{}}>
        <div className="absolute w-full">
          <Navbar />
        </div>
        <div className="FlterView">
          <div>
            <svg
              class="view-option-selector-button__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.4 4.6H4.6v14.8h14.8V4.6zm-15.8-1v16.8h16.8V3.6H3.6z"
              ></path>
            </svg>
          </div>
          <div>
            <svg
              class="view-option-selector-button__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z"
              ></path>
            </svg>
          </div>
          <div>
            <svg
              class="view-option-selector-button__icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="New">
        <div>
          {NewData.img.map((imageUrl, index) => (
            <div
              className="flex flex-row justify-center items-center"
              key={index}
            >
              <img src={imageUrl} alt={`img ${index + 1}`} />
            </div>
          ))}
        </div>
        <div>{NewData.text}</div>
      </div>
    </div>
  );
}

export default New;
