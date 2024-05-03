import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./Context/UserContext.jsx";
import { MeasureProvider } from "./Context/Drawer_state_controller.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <MeasureProvider>
        <App />
      </MeasureProvider>
    </UserContextProvider>
  </React.StrictMode>
);
