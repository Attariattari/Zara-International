import { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Spinner from "../Spinner";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : { firstname: "" };
  });

  const [Admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });

  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [token, setToken] = useState(null); // Updated: No longer get token from cookies
  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(Admin));
    if (Admin) {
      checkTokenValidity();
      fetchUserData(); // Fetch user data immediately after setting Admin
    }
  }, [Admin]);

  const handleLogout = () => {
    console.log("Logging out...");
    setUser({ firstname: "" });
    setAdmin(null);
    setToken(null); // Clear token on logout
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    Cookies.remove("token", { path: "/" });
    setIsTokenValid(false);
  };

  const scheduleAutoLogout = (time) => {
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }
    logoutTimeoutRef.current = setTimeout(() => {
      handleLogout();
    }, time);
  };

  const checkTokenValidity = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1122/user/checkToken",
        {},
        { withCredentials: true }
      );
      if (response.data.status !== "success") {
        throw new Error("Token is invalid or expired");
      }
      scheduleAutoLogout(response.data.expiresIn);
      setIsTokenValid(true);
    } catch (error) {
      console.error("Token check failed:", error.message);
      setIsTokenValid(false);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:1122/user/getUserInfo",
        { withCredentials: true }
      );
      if (response.data.status === "success") {
        const userId = response.data.userId;
        const token = response.data.token;
        setToken(token); // Updated: Set the token state
        const userDataResponse = await axios.get(
          `http://localhost:1122/user/Auth/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        if (userDataResponse.data.status === "success") {
          setUser(userDataResponse.data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      }
    } catch (error) {
      console.error("Failed to get user info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Admin) {
      const tokenCheckInterval = setInterval(checkTokenValidity, 3600000); // Check token every 1 hour
      return () => clearInterval(tokenCheckInterval);
    }
  }, [Admin]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        Admin,
        setAdmin,
        authError,
        setAuthError,
        loading,
        setLoading,
        handleLogout,
        scheduleAutoLogout,
        isTokenValid,
        token, // Provide token in context
      }}
    >
      {loading ? (
        <div className="overlay">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </userContext.Provider>
  );
}
