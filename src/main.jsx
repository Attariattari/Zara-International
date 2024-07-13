import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./Context/UserContext.jsx";
import { MeasureProvider } from "./Context/Drawer_state_controller.jsx";
import { SidebarProvider } from "../src/Zara_Admin/Context/SidebarContext";
import { ThemeProvider } from "./Zara_Admin/Context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <MeasureProvider>
        <ThemeProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </ThemeProvider>
      </MeasureProvider>
    </UserContextProvider>
  </React.StrictMode>
);
