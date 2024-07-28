import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import { userContext } from "./Context/UserContext.jsx";
import "./App.css";
import ProtectedRoutes from "./Context/ProtectedRoutes.jsx";
import Spinner from "./Spinner.jsx";

// Lazy load components
const FinalCartProductView = lazy(() =>
  import("./Components/FinalCartProductView/FinalCartProductView.jsx")
);
const SingleProduct = lazy(() =>
  import("./Components/NewAllProducts/SingleProductData/SingleProduct.jsx")
);
const InterCardData = lazy(() =>
  import("./Components/PaymentMethod/InterCardData/InterCardData")
);
const SelectCardsForPay = lazy(() =>
  import("./Components/PaymentMethod/SelectCardsForPay.jsx")
);
const ShoppingBag = lazy(() =>
  import("./Components/ShoppingAndWishListBag/ShoppingBag.jsx")
);
const Address_Conform = lazy(() =>
  import("./Components/BillingAddress/Address_Conform")
);
const Wishlist = lazy(() =>
  import("./Components/ShoppingAndWishListBag/Wishlist.jsx")
);
const Order_Summary = lazy(() =>
  import("./Components/Order_Summary/Order_Summary")
);
const UserOrder = lazy(() => import("./Components/UserOrder/UserOrder.jsx"));
const Signup = lazy(() => import("./Components/LoginSingup/Singup.jsx"));
const Login = lazy(() => import("./Components/LoginSingup/Login.jsx"));
const New = lazy(() => import("./Components/NewAllProducts/New.jsx"));
const Search = lazy(() => import("./Components/Search/Search.jsx"));
const Welcome = lazy(() => import("./Components/Welcome/Welcome"));
const Help = lazy(() => import("./Components/Help/Help.jsx"));
const Chat = lazy(() => import("./Components/Chat/Chat.jsx"));
const Home = lazy(() => import("./Pages/Home"));
const Authanticate = lazy(() =>
  import("./Zara_Admin/Authanticate/Authanticate")
);
const Dashboard = lazy(() => import("./Zara_Admin/Home/Dashboard"));
const NavLayout = lazy(() => import("./Zara_Admin/Home/NavLayout.jsx"));
const Product = lazy(() => import("./Zara_Admin/Home/Product.jsx"));
const User = lazy(() => import("./Zara_Admin/User/User.jsx"));
const ManageUsers = lazy(() =>
  import("./Zara_Admin/Manage Users/ManageUsers.jsx")
);
const Notification = lazy(() =>
  import("./Zara_Admin/Notification/Notification.jsx")
);
const Messages = lazy(() => import("./Zara_Admin/Messages/Messages.jsx"));
const FeaturedProduct = lazy(() =>
  import("./Zara_Admin/Featured Product/FeaturedProduct.jsx")
);
const SalesProduct = lazy(() =>
  import("./Zara_Admin/Sales Product/SalesProduct.jsx")
);
const MainCarousel = lazy(() => import("./Zara_Admin/Main/MainCarousel.jsx"));
const ProductsDetails = lazy(() =>
  import("./Zara_Admin/Products Details/ProductsDetails.jsx")
);
const Catgeory = lazy(() => import("./Zara_Admin/Catgeory/Catgeory.jsx"));
const AddProducts = lazy(() =>
  import("./Zara_Admin/Add Products/AddProducts.jsx")
);
const ShoppingCart = lazy(() =>
  import("./Zara_Admin/Shopping Cart/ShoppingCart.jsx")
);
const Order = lazy(() => import("./Zara_Admin/Order/Order.jsx"));
const OrderDetails = lazy(() =>
  import("./Zara_Admin/OrderDetails/OrderDetails.jsx")
);

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
        <Suspense
          fallback={
            <div>
              <div className="overlay">
                <Spinner />
              </div>
            </div>
          }
        >
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
            <Route path="/Admin/Autanticate" element={<Authanticate />} />
            <Route path="/Admin/*" element={<ProtectedRoutes />}>
              <Route element={<NavLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Users" element={<User />} />
                <Route path="Manage-Users" element={<ManageUsers />} />
                <Route path="Notifications" element={<Notification />} />
                <Route path="Messages" element={<Messages />} />
                <Route path="Product" element={<Product />} />
                <Route path="Featured-Product" element={<FeaturedProduct />} />
                <Route path="Sales-Product" element={<SalesProduct />} />
                <Route path="Main-Carousel" element={<MainCarousel />} />
                <Route path="Products-Details" element={<ProductsDetails />} />
                <Route path="Category" element={<Catgeory />} />
                <Route path="Add-Products" element={<AddProducts />} />
                <Route path="Shopping-Cart" element={<ShoppingCart />} />
                <Route path="Order" element={<Order />} />
                <Route path="Order-Details" element={<OrderDetails />} />
              </Route>
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
        </Suspense>
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