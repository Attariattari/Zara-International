import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
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

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("admin", JSON.stringify(Admin));
  }, [Admin]);

  useEffect(() => {
    if (Admin && Admin.pageRoll !== 1) {
      document.cookie = "token=; Max-Age=0; path=/;";
      setAdmin(null);
    }
  }, [Admin]);
  useEffect(() => {
    if (Admin && Admin.pageRoll !== 1) {
      Cookies.remove("token", { path: "/" });
      setAdmin(null);
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
      }}
    >
      {children}
    </userContext.Provider>
  );
}
