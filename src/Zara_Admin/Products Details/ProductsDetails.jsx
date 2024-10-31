import React from "react";
import { useParams } from "react-router-dom";
function ProductsDetails() {
  const { id, name } = useParams();
  return (
    <div>
      <h1>Product ID: {id}</h1>
      <h2>Product Name: {name}</h2>
    </div>
  );
}

export default ProductsDetails;
