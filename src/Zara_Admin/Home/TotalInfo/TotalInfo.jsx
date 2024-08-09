import React from "react";
import { IoWalletSharp } from "react-icons/io5";
import { FaChartLine, FaUserGroup } from "react-icons/fa6";
import { TbEyeglass } from "react-icons/tb";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import './Css.css'
function TotalInfo() {
  return (
    <div className="Dashboard_MainArea_TotalInfo">
      <div className="box-style">
        <div className="box-style-Firsts">
          <p>Revenue</p>
          <p>$75K</p>
          <p className="flex justify-center items-center">
            <MdArrowDropUp />
            $34 from last week
          </p>
        </div>
        <div className="box-style-Second">
          <IoWalletSharp className="box-style-Second-icon" />
        </div>
      </div>
      <div className="box-style">
        <div className="box-style-Firsts">
          <p>Total Customers</p>
          <p>8.4K</p>
          <p className="flex justify-center items-center">
            <MdArrowDropUp />
            1.6K from last week
          </p>
        </div>
        <div className="box-style-Second">
          <FaUserGroup className="box-style-Second-icon" />
        </div>
      </div>
      <div className="box-style">
        <div className="box-style-Firsts">
          <p>Store Visitors</p>
          <p>59K</p>
          <p className="flex justify-center items-center">
            <MdArrowDropUp />
            2.4K from last week
          </p>
        </div>
        <div className="box-style-Second">
          <TbEyeglass className="box-style-Second-icon" />
        </div>
      </div>
      <div className="box-style">
        <div className="box-style-Firsts">
          <p>Bounce Rate</p>
          <p>34.46%</p>
          <p className="flex justify-center items-center">
            <MdArrowDropDown />
            12.2% from last week
          </p>
        </div>
        <div className="box-style-Second">
          <FaChartLine className="box-style-Second-icon" />
        </div>
      </div>
    </div>
  );
}

export default TotalInfo;
