import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { userContext } from "./Context/UserContext.jsx";
import "./App.css";
import ProtectedRoutes from "./Context/ProtectedRoutes.jsx";
import FinalCartProductView from "./Components/FinalCartProductView/FinalCartProductView.jsx";
import SingleProduct from "./Components/NewAllProducts/SingleProductData/SingleProduct.jsx";
import InterCardData from "./Components/PaymentMethod/InterCardData/InterCardData";
import SelectCardsForPay from "./Components/PaymentMethod/SelectCardsForPay.jsx";
import ShoppingBag from "./Components/ShoppingAndWishListBag/ShoppingBag.jsx";
import Address_Conform from "./Components/BillingAddress/Address_Conform";
import Wishlist from "./Components/ShoppingAndWishListBag/Wishlist.jsx";
import Order_Summary from "./Components/Order_Summary/Order_Summary";
import UserOrder from "./Components/UserOrder/UserOrder.jsx";
import Signup from "./Components/LoginSingup/Singup.jsx";
import Login from "./Components/LoginSingup/Login.jsx";
import New from "./Components/NewAllProducts/New.jsx";
import Search from "./Components/Search/Search.jsx";
import Welcome from "./Components/Welcome/Welcome";
import Help from "./Components/Help/Help.jsx";
import Chat from "./Components/Chat/Chat.jsx";
import Home from "./Pages/Home";
import Authanticate from "./Zara_Admin/Authanticate/Authanticate";
import Dashboard from "./Zara_Admin/Home/Dashboard";
import NavLayout from "./Zara_Admin/NavLayout/NavLayout.jsx";
import Product from "./Zara_Admin/Product/Product.jsx";
import User from "./Zara_Admin/User/User.jsx";
import ManageUsers from "./Zara_Admin/Manage Users/ManageUsers.jsx";
import Notification from "./Zara_Admin/Notification/Notification.jsx";
import Messages from "./Zara_Admin/Messages/Messages.jsx";
import FeaturedProduct from "./Zara_Admin/Featured Product/FeaturedProduct.jsx";
import SalesProduct from "./Zara_Admin/Sales Product/SalesProduct.jsx";
import MainCarousel from "./Zara_Admin/Main/MainCarousel.jsx";
import ProductsDetails from "./Zara_Admin/Products Details/ProductsDetails.jsx";
import Catgeory from "./Zara_Admin/Catgeory/Catgeory.jsx";
import AddProducts from "./Zara_Admin/Add Products/AddProducts.jsx";
import ShoppingCart from "./Zara_Admin/Shopping Cart/ShoppingCart.jsx";
import Order from "./Zara_Admin/Order/Order.jsx";
import OrderDetails from "./Zara_Admin/OrderDetails/OrderDetails.jsx";
import Gallery from "./Zara_Admin/Gallery/Gallery";
import Uploadimages from "./Zara_Admin/Gallery/Upload/Uploadimages.jsx";

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
            path="/Product/:name/:cid/:csid"
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
          <Route path="/Admin/Autanticate" element={<Authanticate />} />
          <Route path="/Admin/*" element={<ProtectedRoutes />}>
            <Route element={<NavLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Gallery" element={<Gallery />} />
              <Route path="Gallery/upload" element={<Uploadimages />} />
              <Route path="Users" element={<User />} />
              <Route path="Manage-Users" element={<ManageUsers />} />
              <Route path="Notifications" element={<Notification />} />
              <Route path="Messages" element={<Messages />} />
              <Route path="Product" element={<Product />} />
              <Route path="Featured-Product" element={<FeaturedProduct />} />
              <Route path="Sales-Product" element={<SalesProduct />} />
              <Route path="Main-Carousel" element={<MainCarousel />} />
              <Route
                path="Products-Details/:name/:id"
                element={<ProductsDetails />}
              />

              <Route path="Category" element={<Catgeory />} />
              <Route path="Add-Products" element={<AddProducts />} />
              <Route path="Shopping-Cart" element={<ShoppingCart />} />
              <Route path="Order" element={<Order />} />
              <Route path="Order-Details" element={<OrderDetails />} />
            </Route>
          </Route>
        </Routes>
        {/* {hasVisited && (
          <>
            {isChatVisible && (
              <div className="chat-component none">
                <Chat toggleChatUnVisibility={toggleChatUnVisibility} />
              </div>
            )}
            {!isChatVisible && (
              <div
                className="ChatPopupshow none"
                onClick={toggleChatVisibility}
              >
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
        )} */}
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
