import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserContextWrapper from "./Context/UserContextWrapper.jsx";
import { MeasureProvider } from "./Context/Drawer_state_controller.jsx";
import { ThemeProvider } from "./Zara_Admin/Context/ThemeContext.jsx";
import { SidebarProvider } from "./Zara_Admin/Context/SidebarContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextWrapper>
      <MeasureProvider>
        <ThemeProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </ThemeProvider>
      </MeasureProvider>
    </UserContextWrapper>
  </React.StrictMode>
);
