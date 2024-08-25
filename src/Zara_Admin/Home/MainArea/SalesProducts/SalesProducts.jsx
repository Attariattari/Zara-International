import React from "react";

const salesProducts = [
  {
    id: 1,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/14.png",
    title: "Stylish Sneakers",
    sales: "320 Sales",
    price: "$55K.00"
  },
  {
    id: 2,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/15.png",
    title: "Casual Jeans",
    sales: "280 Sales",
    price: "$45K.00"
  },
  {
    id: 3,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/16.png",
    title: "Leather Jacket",
    sales: "350 Sales",
    price: "$70K.00"
  },
  {
    id: 4,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/17.png",
    title: "Summer Dress",
    sales: "400 Sales",
    price: "$60K.00"
  },
  {
    id: 5,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/18.png",
    title: "Designer Handbag",
    sales: "220 Sales",
    price: "$150K.00"
  },
  {
    id: 6,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/19.png",
    title: "Running Shoes",
    sales: "270 Sales",
    price: "$80K.00"
  },
  {
    id: 7,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/20.png",
    title: "Woolen Scarf",
    sales: "180 Sales",
    price: "$15K.00"
  },
  {
    id: 8,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/21.png",
    title: "Formal Suit",
    sales: "240 Sales",
    price: "$200K.00"
  },
  {
    id: 9,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/22.png",
    title: "Sports Watch",
    sales: "310 Sales",
    price: "$90K.00"
  },
  {
    id: 10,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/23.png",
    title: "Casual Hat",
    sales: "150 Sales",
    price: "$25K.00"
  }
];

function SalesProducts({ title }) {
  return (
    <div className="MainArea_Data_Table">
      <div className="Top_Products">
        <div className="Top_Products_Header">
          <p>{title}</p>
        </div>
        <div className="Top_Products_Main_Data">
          {salesProducts.map(product => (
            <div key={product.id} className="Main_Data_Container_Top">
              <div className="Main_Product_Image">
                <img
                  src={product.image}
                  alt={product.title}
                />
              </div>
              <div className="Main_Product_Title_Sales">
                <p className="Main_Product_Title_Sales_Title">
                  {product.title}
                </p>
                <p className="Main_Product_Title_Sales_Sales">{product.sales}</p>
              </div>
              <div className="Main_Product_Title_Sales_Price">{product.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SalesProducts;
