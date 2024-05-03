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
import ShoppingBag from "./Components/ShoppingAndWishListBag/ShoppingBag.jsx";
import UserOrder from "./Components/UserOrder/UserOrder.jsx";
import Search from "./Components/Search/Search.jsx";
import New from "./Components/NewAllProducts/New.jsx";
import SingleProduct from "./Components/NewAllProducts/SingleProductData/SingleProduct.jsx";
import Wishlist from "./Components/ShoppingAndWishListBag/Wishlist.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import "./App.css";
import ChatOne from "./Components/ChatOne/ChatOne.jsx";
import Address_Conform from "./Components/BillingAddress/Address_Conform";
function App() {
  const hasVisited = localStorage.getItem("visited") === "true";
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isChatOneVisible, setIsChatOneVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible((prevIsChatVisible) => !prevIsChatVisible);
    // setIsChatOneVisible(false);
  };
  const toggleChatUnVisibility = () => {
    setIsChatVisible(false);
  };
  const toggleChatOneVisibility = () => {
    setIsChatOneVisible((prevIsChatVisible) => !prevIsChatVisible);
    // setIsChatVisible(false);
  };
  const toggleChatOneUnVisibility = () => {
    setIsChatOneVisible(false);
  };
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
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/User/Order" element={<UserOrder />} />
          <Route path="/Search/Products" element={<Search />} />
          <Route path="/New" element={<New />} />
          <Route path="/SingleProduct" element={<SingleProduct />} />
          <Route path="/Address_Conform" element={<Address_Conform />} />

          <Route
            path="/welcome"
            element={<ProtectedRoute redirectTo="/Home" />}
          />
        </Routes>
        {isChatVisible && (
          <Chat toggleChatUnVisibility={toggleChatUnVisibility} />
        )}
        {!isChatVisible && (
          <div className="ChatPopupshow" onClick={toggleChatVisibility}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
              class="tray__button-icon"
              aria-label="_tray-icon_"
              alt="tray-icon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.7 3.7h16.6v13h-8.14L7.3 20.172V16.7H3.7v-13Zm1 1v11h3.6v2.528l3.54-2.528h7.46v-11H4.7Z"
              ></path>
            </svg>
            <span className="text-gray-400">Chat</span>
          </div>
        )}
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
{
  /* {isChatOneVisible && (
          <ChatOne toggleChatOneUnVisibility={toggleChatOneUnVisibility} />
        )}
        {!isChatOneVisible && (
          <div className="ChatOnePopupshow" onClick={toggleChatOneVisibility}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill="inherit"
              stroke="inherit"
              class="tray__button-icon"
              aria-label="_tray-icon_"
              alt="tray-icon"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.7 3.7h16.6v13h-8.14L7.3 20.172V16.7H3.7v-13Zm1 1v11h3.6v2.528l3.54-2.528h7.46v-11H4.7Z"
              ></path>
            </svg>
            <span className="text-gray-400">Chat One</span>
          </div>
        )} */
}
