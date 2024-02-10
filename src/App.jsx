// App.jsx
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Home from "./Pages/Home";

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
            path="/welcome"
            element={<ProtectedRoute redirectTo="/Home" />}
          />
          <Route
            path="/Home"
            element={<ProtectedHomeRoute redirectTo="/welcome" />}
          />
        </Routes>
      </Router>
    </div>
  );
}
// Custom wrapper component to protect routes
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
