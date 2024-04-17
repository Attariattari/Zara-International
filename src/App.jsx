// App.jsx
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Welcome from "./Components/Welcome/Welcome";
import Home from "./Pages/Home";
import Login from "./Components/LoginSingup/Login.jsx";
import Help from "./Components/Help/Help.jsx";
import Signup from "./Components/LoginSingup/Singup.jsx";
import ShoppingBag from "./Components/ShoppingBag/ShoppingBag.jsx";
import UserOrder from "./Components/UserOrder/UserOrder.jsx";
import Search from "./Components/Search/Search.jsx";
import New from "./Components/NewAllProducts/New.jsx";
import SingleProduct from "./Components/NewAllProducts/SingleProductData/SingleProduct.jsx";

function App() {
  const hasVisited = localStorage.getItem("visited") === "true";

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              hasVisited ? (
                <Navigate to="/Home" replace />
              ) : (
                <Navigate to="/welcome" replace />
              )
            }
          />
          <Route
            path="/Home"
            element={<ProtectedHomeRoute redirectTo="/welcome" />}
          />

          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/Shopping_Bag" element={<ShoppingBag />} />
          <Route path="/User/Order" element={<UserOrder />} />
          <Route path="/Search/Products" element={<Search />} />
          <Route path="/New" element={<New />} />
          <Route path="/SingleProduct" element={<SingleProduct />} />

          <Route
            path="/welcome"
            element={<ProtectedRoute redirectTo="/Home" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

function ProtectedRoute({ redirectTo }) {
  const hasVisited = localStorage.getItem("visited") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    if (hasVisited) {
      navigate(redirectTo, { replace: true });
    }
  }, [hasVisited, navigate, redirectTo]);

  return <Welcome />;
}

function ProtectedHomeRoute({ redirectTo }) {
  const hasNotVisited = localStorage.getItem("NotVisited") !== "false";
  const navigate = useNavigate();

  useEffect(() => {
    if (hasNotVisited) {
      navigate(redirectTo, { replace: true });
    }
  }, [hasNotVisited, navigate, redirectTo]);

  return <Home />;
}

export default App;
