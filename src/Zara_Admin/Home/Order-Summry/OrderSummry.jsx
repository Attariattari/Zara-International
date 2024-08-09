import React from "react";
import "./css.css";

// Sample JSON data
const orders = [
  {
    id: 1,
    product: {
      name: "Product 1",
      image: "https://res.cloudinary.com/dg5gwixf1/image/upload/v1722342925/User-Data/wkgpoykyeaxnw3akmtxx.jpg",
    },
    customer: "John Doe",
    date: "2024-07-01",
    price: "$100",
    status: "Delivered",
  },
  {
    id: 2,
    product: {
      name: "Product 2",
      image: "https://res.cloudinary.com/dg5gwixf1/image/upload/v1722342925/User-Data/wkgpoykyeaxnw3akmtxx.jpg",
    },
    customer: "Jane Smith",
    date: "2024-07-02",
    price: "$200",
    status: "Pending",
  },
  {
    id: 2,
    product: {
      name: "Product 2",
      image: "https://res.cloudinary.com/dg5gwixf1/image/upload/v1722342925/User-Data/wkgpoykyeaxnw3akmtxx.jpg",
    },
    customer: "Jane Smith",
    date: "2024-07-02",
    price: "$200",
    status: "shipped",
  },
  {
    id: 2,
    product: {
      name: "Product 2",
      image: "https://res.cloudinary.com/dg5gwixf1/image/upload/v1722342925/User-Data/wkgpoykyeaxnw3akmtxx.jpg",
    },
    customer: "Jane Smith",
    date: "2024-07-02",
    price: "$200",
    status: "canceled",
  },
];
const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "status-pending";
    case "shipped":
      return "status-shipped";
    case "delivered":
      return "status-delivered";
    case "canceled":
      return "status-canceled";
    default:
      return "";
  }
};
function OrderSummary() {
  return (
    <div className="OrderSummry">
      <div className="OrderSummry_Mainarea_Title">
        <p>Order Summary</p>
      </div>
      <div className="separator_Order"></div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <div className="product-info">
                    <div>
                      <img src={order.product.image} alt={order.product.name} />
                    </div>
                    <span>{order.product.name}</span>
                  </div>
                </td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.price}</td>
                <td className={`status-cell ${getStatusClass(order.status)}`}>
                <div>{order.status}</div>
                </td>
                <td>
                  <button className="Order_Summary_Button">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderSummary;
