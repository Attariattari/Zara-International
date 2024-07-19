import { createContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false); // Use loading state
  const navigate = useNavigate();
  const logoutTimeoutRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(Admin));
  }, [Admin]);

  useEffect(() => {
    if (Admin && Admin.pageRoll !== 1) {
      Cookies.remove("token", { path: "/" });
      setAdmin(null);
    }
  }, [Admin]);

  const handleLogout = () => {
    setUser({ firstname: "" });
    setAdmin(null);
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    Cookies.remove("token", { path: "/" });
    navigate("/Admin/Autanticate");
  };

  const scheduleAutoLogout = (time) => {
    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }
    logoutTimeoutRef.current = setTimeout(() => {
      handleLogout();
    }, time);
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      setLoading(true); // Start loading
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
      } catch (error) {
        console.error("Token check failed:", error.message);
        handleLogout();
      } finally {
        setLoading(false); // End loading
      }
    };

    checkTokenValidity();

    const tokenCheckInterval = setInterval(checkTokenValidity, 300000); // Check every 5 minutes

    return () => clearInterval(tokenCheckInterval);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.post(
          "http://localhost:1122/user/getUserInfo",
          {},
          { withCredentials: true }
        );
        if (response.data.status === "success") {
          fetchUserData(response.data.userId, response.data.token);
        }
      } catch (error) {
        console.error("Failed to get user info:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    const fetchUserData = async (userId, token) => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://localhost:1122/user/Auth/${userId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          setUser(response.data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUserInfo();
  }, [setUser]);

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
      }}
    >
      {loading ? <Spinner /> : children}
    </userContext.Provider>
  );
}

// import { createContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";

// export const userContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem("user");
//     return storedUser ? JSON.parse(storedUser) : { firstname: "" };
//   });

//   const [Admin, setAdmin] = useState(() => {
//     const storedAdmin = localStorage.getItem("admin");
//     return storedAdmin ? JSON.parse(storedAdmin) : null;
//   });

//   const [authError, setAuthError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const logoutTimeoutRef = useRef(null); // UseRef to store the timeout ID

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(user));
//   }, [user]);

//   useEffect(() => {
//     localStorage.setItem("admin", JSON.stringify(Admin));
//   }, [Admin]);

//   useEffect(() => {
//     if (Admin && Admin.pageRoll !== 1) {
//       Cookies.remove("token", { path: "/" });
//       setAdmin(null);
//     }
//   }, [Admin]);

//   const handleLogout = () => {
//     setUser({ firstname: "" });
//     setAdmin(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("admin");
//     Cookies.remove("token", { path: "/" });
//     navigate("/Admin/Autanticate");
//   };

//   const scheduleAutoLogout = (time) => {
//     if (logoutTimeoutRef.current) {
//       clearTimeout(logoutTimeoutRef.current);
//     }
//     logoutTimeoutRef.current = setTimeout(() => {
//       handleLogout();
//     }, time);
//   };

//   useEffect(() => {
//     const checkTokenValidity = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:1122/user/checkToken",
//           {},
//           { withCredentials: true }
//         );
//         if (response.data.status !== "success") {
//           throw new Error("Token is invalid or expired");
//         }
//         scheduleAutoLogout(response.data.expiresIn); // Schedule auto-logout based on token expiration time
//       } catch (error) {
//         console.error("Token check failed:", error.message);
//         handleLogout();
//       }
//     };

//     checkTokenValidity(); // Initial token check

//     const tokenCheckInterval = setInterval(checkTokenValidity, 300000); // Check every 5 minutes

//     return () => clearInterval(tokenCheckInterval);
//   }, []);

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:1122/user/getUserInfo",
//           {},
//           { withCredentials: true }
//         );
//         // console.log("User Info:", response.data);
//         if (response.data.status === "success") {
//           fetchUserData(response.data.userId, response.data.token);
//         }
//       } catch (error) {
//         console.error("Failed to get user info:", error);
//       }
//     };

//     const fetchUserData = async (userId, token) => {
//       try {
//         const response = await axios.get(
//           `http://localhost:1122/user/Auth/${userId}`,
//           {
//             withCredentials: true,
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.status === "success") {
//           // console.log("User Data:", response.data.user);
//           setUser(response.data.user);
//         } else {
//           console.error("Failed to fetch user data");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserInfo();
//   }, [setUser]);

//   return (
//     <userContext.Provider
//       value={{
//         user,
//         setUser,
//         Admin,
//         setAdmin,
//         authError,
//         setAuthError,
//         loading,
//         setLoading,
//         handleLogout,
//       }}
//     >
//       {children}
//     </userContext.Provider>
//   );
// }
