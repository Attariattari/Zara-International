import React from "react";
import "./css.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mo",
    uv: 4000,
    pv: 12,
    amt: 2400,
  },
  {
    name: "Tu",
    uv: 3000,
    pv: 25,
    amt: 2210,
  },
  {
    name: "We",
    uv: 2000,
    pv: 13,
    amt: 2290,
  },
  {
    name: "Th",
    uv: 2780,
    pv: 25,
    amt: 2000,
  },
  {
    name: "Fr",
    uv: 1890,
    pv: 14,
    amt: 2181,
  },
  {
    name: "Sa",
    uv: 2390,
    pv: 35,
    amt: 2500,
  },
  {
    name: "Su",
    uv: 3490,
    pv: 10,
    amt: 2100,
  },
];

function WeeklyVisits() {
  return (
    <div className="Dashboard_Weekly_Visits">
      <div className="Dashboard_Weekly_Visits_Mainarea">
        <div className="Dashboard_Weekly_Visits_Title">
          <p>Weekly Visits</p>
        </div>
        <div className="Dashboard_Weekly_Visits_Chart">
          <ResponsiveContainer width="100%" height={400} padding={0} margin={0}>
            <AreaChart
              width={500}
              height={200}
              data={data}
              syncId="anyId"
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                style={{ fontSize: "12px" }}
                tick={{ fill: "#ffffff" }}
              />
              
              <Tooltip
                contentStyle={{
                  background: "#3e3e3e",
                  borderRadius: "10px",
                }}
                labelStyle={{ display: "none" }}
                cursor={{ fill: "none" }}
              />
              <Area
                type="monotone"
                dataKey="pv"
                stroke="#e6e6e6"
                fill="#878b8f"
                strokeWidth={3}
                dot={{ stroke: "#e6e6e6", strokeWidth: 2, fill: "#878b8f" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default WeeklyVisits;
