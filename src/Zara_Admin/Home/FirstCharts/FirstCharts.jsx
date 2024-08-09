import React from "react";
import {
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer,
    Legend,
    XAxis,
  } from "recharts";
  import { PieChart, Pie, Cell } from "recharts";
  import {
    MdArrowDownward,
    MdArrowUpward,
  } from "react-icons/md";
  import './Css.css'

  const data = [
    { months: "January", mt: 10, uv: 11, pv: 12, amt: 14 },
    { months: "February", mt: 15, uv: 17, pv: 19, amt: 21 },
    { months: "March", mt: 23, uv: 22, pv: 25, amt: 28 },
    { months: "April", mt: 18, uv: 29, pv: 27, amt: 30 },
    { months: "May", mt: 20, uv: 23, pv: 12, amt: 28 },
    { months: "June", mt: 31, uv: 12, pv: 23, amt: 11 },
    { months: "July", mt: 12, uv: 22, pv: 21, amt: 15 },
  ];
  
  const CustomLegend = ({ payload }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}
        >
          <div
            style={{
              width: "40px",
              height: "12px",
              backgroundColor: entry.color,
              marginRight: "8px",
            }}
          />
          <span style={{ color: "#ffffff", fontSize: "12px" }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
  
  const Piedata = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 200 },
    { name: "Group C", value: 150 },
  ];
  const COLORS = ["#e6e6e6", "#878b8f", "#595f66"];

function FirstCharts() {
  return (
    <div className="Dashboard_MainArea-Charts">
      <div className="Dashboard_MainArea_Charts_BigChart">
        <div className="Dashboard_MainArea_Charts_BigChart_Title">
          Performance
        </div>
        <div className="Dashboard_MainArea_Charts_BigChart_Summry">
          <div className="summaryItem">
            <span className="main">
              974
              <span className="percent">
                56%
                <MdArrowUpward />
              </span>
            </span>
            <p className="title">Page Views</p>
          </div>
          <div className="separator"></div>
          <div className="summaryItem">
            <span className="main">
              1,218
              <span className="percent">
                34%
                <MdArrowDownward />
              </span>
            </span>
            <p className="title">Total Sales</p>
          </div>
          <div className="separator"></div>
          <div className="summaryItem">
            <span className="main">
              42.8%
              <span className="percent">
                22%
                <MdArrowUpward />
              </span>
            </span>
            <p className="title">Conversion Rate</p>
          </div>
        </div>
        <div className="Dashboard_MainArea_Charts_BigChart_Chart">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} padding={0} barSize={8} barCategoryGap="20%">
              <XAxis
                dataKey="months"
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
              <Legend content={<CustomLegend />} />
              <Bar dataKey="pv" fill="#e6e6e6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="uv" fill="#878b8f" radius={[3, 3, 0, 0]} />
              <Bar dataKey="mt" fill="#595f66" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="Dashboard_MainArea_Charts_SmallChart">
        <div className="Dashboard_MainArea_Charts_SmallChart_Main">
          <div className="Dashboard_MainArea_Charts_BigChart_Title">
            Top Categories
          </div>
          <div className="Dashboard_MainArea_Charts_BigChart_Pei_Chart pie-chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: "#e6e6e6ac",
                    fontSize: "12px",
                    padding: "5px",
                  }}
                  position={{ y: 170, x: 154 }}
                  labelStyle={{ display: "none" }}
                  cursor={{ fill: "none" }} // Remove cursor if needed
                />
                <Pie
                  data={Piedata}
                  innerRadius={110}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {Piedata.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="none"
                      style={{ outline: "none" }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-chart-center-text">
              <p>8,452</p>
              <p>Total Sessions</p>
            </div>
          </div>
        </div>
        <div className="Pie_category_Quantity">
          <div className="Pie_category_Quantity_first">
            <p>Clothing</p>
            <p>558</p>
          </div>
          <div className="Pie_category_Quantity_second">
            <p>Electronics</p>
            <p>204</p>
          </div>
          <div className="Pie_category_Quantity_threed">
            <p>Furniture</p>
            <p>108</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstCharts;
