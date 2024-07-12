// App.jsx
import FinalCartProductView from "./Components/FinalCartProductView/FinalCartProductView.jsx";
import SingleProduct from "./Components/NewAllProducts/SingleProductData/SingleProduct.jsx";
import InterCardData from "./Components/PaymentMethod/InterCardData/InterCardData";
import SelectCardsForPay from "./Components/PaymentMethod/SelectCardsForPay.jsx";
import ShoppingBag from "./Components/ShoppingAndWishListBag/ShoppingBag.jsx";
import Address_Conform from "./Components/BillingAddress/Address_Conform";
import Wishlist from "./Components/ShoppingAndWishListBag/Wishlist.jsx";
import Order_Summary from "./Components/Order_Summary/Order_Summary";
import React, { useContext, useEffect, useState } from "react";
import UserOrder from "./Components/UserOrder/UserOrder.jsx";
import { userContext } from "./Context/UserContext.jsx";
import Signup from "./Components/LoginSingup/Singup.jsx";
import Login from "./Components/LoginSingup/Login.jsx";
import New from "./Components/NewAllProducts/New.jsx";
import Search from "./Components/Search/Search.jsx";
import Welcome from "./Components/Welcome/Welcome";
import Help from "./Components/Help/Help.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import Home from "./Pages/Home";
import Nav from "./Zara_Admin/Home/Nav.jsx";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./Zara_Admin/Home/Dashboard";
import Navbar from "./Components/Navbar/Navbar.jsx";
import SideBar from "./Zara_Admin/Home/SideBar.jsx";
import NavLayout from "./Zara_Admin/Home/NavLayout.jsx";

function App() {
  const [hasVisited, setHasVisited] = useState(
    localStorage.getItem("visited") === "true"
  );
  const [isChatVisible, setIsChatVisible] = useState(false);
  const { setUser } = useContext(userContext);
  const toggleChatVisibility = () => {
    setIsChatVisible((prevIsChatVisible) => !prevIsChatVisible);
  };

  const toggleChatUnVisibility = () => {
    setIsChatVisible(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setHasVisited(localStorage.getItem("visited") === "true");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // UseEffect to handle quick update of isChatVisible state
  useEffect(() => {
    const handleChatToggle = (event) => {
      if (event.detail === "toggleChat") {
        setIsChatVisible((prev) => !prev);
      }
    };

    window.addEventListener("chatToggle", handleChatToggle);

    return () => {
      window.removeEventListener("chatToggle", handleChatToggle);
    };
  }, []);

  // useEffect(() => {
  //   const token = Cookies.get("token");

  //   if (token) {
  //     const { exp } = jwtDecode(token); // Decode the token to get the expiration time
  //     const expirationTime = exp * 1000; // Convert expiration time to milliseconds

  //     const logoutTimer = setTimeout(() => {
  //       Cookies.remove("token");
  //       setUser(null);

  //     }, expirationTime - Date.now());

  //     return () => clearTimeout(logoutTimer); // Cleanup function to clear the timer
  //   }
  // }, [ setUser]);

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
            path="/welcome"
            element={
              <ProtectedWelcomeRoute redirectTo="/Home">
                <Welcome />
              </ProtectedWelcomeRoute>
            }
          />
          <Route
            path="/Home"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Login"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Signup"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <Signup />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Help"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <Help />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Shopping_Bag"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <ShoppingBag />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Wishlist"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/User/Order"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <UserOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Search/Products"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/New"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <New />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SingleProduct"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <SingleProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Address_Conform"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <Address_Conform />
              </ProtectedRoute>
            }
          />
          <Route
            path="/method-selection"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <FinalCartProductView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SelectCardsForPay"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <SelectCardsForPay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/InterCardData"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <InterCardData />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Order_Summary"
            element={
              <ProtectedRoute redirectTo="/welcome">
                <Order_Summary />
              </ProtectedRoute>
            }
          />
          <Route path="/Dashboard" element={<NavLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Sidebar" element={<SideBar />} />
          </Route>
        </Routes>
        {hasVisited && (
          <>
            {isChatVisible && (
              <div className="chat-component">
                <Chat toggleChatUnVisibility={toggleChatUnVisibility} />
              </div>
            )}
            {!isChatVisible && (
              <div className="ChatPopupshow" onClick={toggleChatVisibility}>
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="inherit"
                  stroke="inherit"
                  className="tray__button-icon"
                  aria-label="_tray-icon_"
                  alt="tray-icon"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.7 3.7h16.6v13h-8.14L7.3 20.172V16.7H3.7v-13Zm1 1v11h3.6v2.528l3.54-2.528h7.46v-11H4.7Z"
                  ></path>
                </svg>
                <span className="text-gray-400">Chat</span>
              </div>
            )}
          </>
        )}
      </Router>
    </div>
  );
}

function ProtectedRoute({ children, redirectTo }) {
  const hasVisited = localStorage.getItem("visited") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasVisited) {
      navigate(redirectTo, { replace: true });
    }
  }, [hasVisited, navigate, redirectTo]);

  return hasVisited ? children : null;
}

function ProtectedWelcomeRoute({ children, redirectTo }) {
  const hasVisited = localStorage.getItem("visited") === "true";
  const navigate = useNavigate();

  useEffect(() => {
    if (hasVisited) {
      navigate(redirectTo, { replace: true });
    }
  }, [hasVisited, navigate, redirectTo]);

  return !hasVisited ? children : null;
}

export default App;
