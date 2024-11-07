import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { AiOutlineProduct } from "react-icons/ai";
import { TiArrowRightOutline } from "react-icons/ti";
import "./css.css";
function ProductsDetails() {
  const { id, name } = useParams();
  const { token } = useContext(userContext);
  const [state, setState] = useState({
    data: null,
  });

  const fetchsingleproduct = async () => {
    try {
      const response = await axios.get(`http://localhost:1122/Product/${id}`, {
        header: {
          Authanticate: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setState((prevState) => ({
        ...prevState,
        data: response.data,
      }));
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching Products", error);
    }
  };

  useEffect(() => {
    fetchsingleproduct();
  }, [id]);

  return (
    <div className="ProductsDetails">
      <div className="ProductsDetails-area">
        <div className="ProductsDetails-area-topbar">
          <div className="ProductsDetails-area-topbar-title">
            <div>
              <AiOutlineProduct className="ProductsDetails-area-topbar-title-icon" />{" "}
              <p> Product Details</p>
            </div>
            <div>
              <TiArrowRightOutline className="ProductsDetails-area-topbar-title-icon" />
              <h3>{name}</h3>
            </div>
          </div>
          <div className="ProductsDetails-area-topbar-Button-parent">
            <button className="ProductsDetails-area-topbar-button">
              Edit Product
            </button>
            <button className="ProductsDetails-area-topbar-button">
              Delete Product
            </button>
          </div>
        </div>
        {state.data ? (
          <div className="Product-details-area-data">
            <div className="Product-details-area-data-area">
              <div className="Left">
                <img src={state.data.MainImage} alt="" />
              </div>
              <div className="Right">
                <p className="Right-title">{state.data.Name}</p>
              </div>
            </div>
            <div>hello</div>

            {/*  */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default ProductsDetails;
