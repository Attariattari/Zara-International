import React from "react";
import "./css.css";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Example order data
const totalOrders = 1000; // Fixed total number of orders
const actualOrders = 333; // Total actual orders

const orderData = [
  { name: "Pending", value: 72, color: "#e6e6e6" },
  { name: "Delivered", value: 87, color: "#e6e6e6" },
  { name: "Pay Pending", value: 174, color: "#e6e6e6" },
];

// Calculate the remaining orders to fit the total
const remainingOrders = totalOrders - actualOrders;

// Create a data array including the remaining orders
const data = [
  { name: "Actual Orders", value: actualOrders, color: "#e6e6e6" },
  { name: "Total Orders", value: totalOrders, color: "#595f66" },
];

// Calculate percentage data for each order category
const percentageData = orderData.map((order) => ({
  ...order,
  percentage: (order.value / actualOrders) * 100,
}));

// Custom Tooltip Component
const CustomTooltip = ({ payload }) => {
  if (!payload || payload.length === 0) return null;

  const { name, value } = payload[0].payload;
  return (
    <div
      className="custom-tooltip"
      style={{
        background: "#3e3e3e",
        borderRadius: "05px",
        padding: "5px",
        color: "#fff",
        border:"1px solid rgba(255, 255, 255, 0.2)"
      }}
    >
      <p>
        {name}: {value.toFixed(0)}%
      </p>
    </div>
  );
};

function OrderCharts() {
  return (
    <div className="Order_Charts">
      <div className="Order_Charts_Main_Area">
        {/* Pie Chart for Total Orders */}
        <div className="ChartsBorder">
          <ResponsiveContainer width="100%" height={172}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={entry.color}
                    stroke="none"
                    style={{ outline: "none" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <p className="ChartText">Total Orders: {totalOrders}</p>
        </div>

        {/* Pie Charts for Actual Orders */}
        {percentageData.map((order, index) => {
          const dataForChart = [
            { name: order.name, value: order.percentage },
            { name: "Remaining", value: 100 - order.percentage },
          ];
          return (
            <div key={index} className="ChartsBorder">
              <ResponsiveContainer width="100%" height={172}>
                <PieChart>
                  <Pie
                    data={dataForChart}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {dataForChart.map((entry, idx) => (
                      <Cell
                        key={`cell-${idx}`}
                        fill={idx === 0 ? "#e6e6e6" : "#595f66"}
                        stroke="none"
                        style={{ outline: "none" }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <p className="ChartText">
                {order.name} : {order.value} % 
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderCharts;
