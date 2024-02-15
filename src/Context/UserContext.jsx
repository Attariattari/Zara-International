import { createContext, useEffect, useState } from "react";

export const userContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({});

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
