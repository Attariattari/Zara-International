import React from 'react';

const products = [
  {
    id: 1,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/14.png",
    title: "Yellow Tshirt",
    sales: "278 Sales",
    price: "$24K.00"
  },
  {
    id: 2,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/15.png",
    title: "Blue Jeans",
    sales: "200 Sales",
    price: "$40K.00"
  },
  {
    id: 3,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/16.png",
    title: "Red Hat",
    sales: "150 Sales",
    price: "$10K.00"
  },
  {
    id: 4,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/17.png",
    title: "Green Shoes",
    sales: "320 Sales",
    price: "$30K.00"
  },
  {
    id: 5,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/18.png",
    title: "White Shirt",
    sales: "180 Sales",
    price: "$22K.00"
  },
  {
    id: 6,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/19.png",
    title: "Black Jacket",
    sales: "400 Sales",
    price: "$60K.00"
  },
  {
    id: 7,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/10.png",
    title: "Orange Sweater",
    sales: "270 Sales",
    price: "$35K.00"
  },
  {
    id: 8,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/11.png",
    title: "Purple Scarf",
    sales: "100 Sales",
    price: "$12K.00"
  },
  {
    id: 9,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/12.png",
    title: "Pink Skirt",
    sales: "220 Sales",
    price: "$28K.00"
  },
  {
    id: 10,
    image: "https://codervent.com/dashtreme/demo/vertical/assets/images/products/13.png",
    title: "Brown Boots",
    sales: "310 Sales",
    price: "$50K.00"
  }
];

function TopProducts() {
  return (
    <div className="MainArea_Data_Table">
      <div className="Top_Products">
        <div className="Top_Products_Header">
          <p>Top Products</p>
        </div>
        <div className="Top_Products_Main_Data">
          {products.map(product => (
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

export default TopProducts;
