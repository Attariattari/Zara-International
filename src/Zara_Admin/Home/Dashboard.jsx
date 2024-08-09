import React from "react";
import "./css.css";
import TotalInfo from "./TotalInfo/TotalInfo";
import FirstCharts from "./FirstCharts/FirstCharts";
import WeeklyVisits from "./WeeklyVisits/WeeklyVisits";
import OrderCharts from "./OrderCharts/OrderCharts";
import MainArea from "./MainArea/MainArea";
import OrderSummry from "./Order-Summry/OrderSummry";

const Dashboard = () => {
  return (
    <div className="Dashboard">
      <div className="Dashboard_MainArea">
        <TotalInfo />
        <FirstCharts />
        <WeeklyVisits />
        <OrderCharts />
        <MainArea />
        <OrderSummry/>
      </div>
    </div>
  );
};

export default Dashboard;
