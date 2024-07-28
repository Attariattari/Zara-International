import React from "react";
import "./css.css";
import { IoWalletSharp } from "react-icons/io5";
import { FaChartLine, FaUserGroup } from "react-icons/fa6";
import { TbEyeglass } from "react-icons/tb";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="Dashboard_MainArea">
        <div className="Dashboard_MainArea_TotalInfo">
          <div className="box-style">
            <div className="box-style-Firsts">
              <p>Revenue</p>
              <p>$75K</p>
              <p>$34 from last week</p>
            </div>
            <div className="box-style-Second">
            <IoWalletSharp className="box-style-Second-icon" />
            </div>
          </div>
          <div className="box-style">
            <div className="box-style-Firsts">
              <p>Total Customers</p>
              <p>8.4K</p>
              <p>1.6K from last week</p>
            </div>
            <div className="box-style-Second">
              <FaUserGroup className="box-style-Second-icon" />
            </div>
          </div>
          <div className="box-style">
            <div className="box-style-Firsts">
              <p>Store Visitors</p>
              <p>59K</p>
              <p>2.4K from last week</p>
            </div>
            <div className="box-style-Second">
              <TbEyeglass className="box-style-Second-icon" />
            </div>
          </div>
          <div className="box-style">
            <div className="box-style-Firsts">
              <p>Bounce Rate</p>
              <p>34.46%</p>
              <p>12.2% from last week</p>
            </div>
            <div className="box-style-Second">
              <FaChartLine className="box-style-Second-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
