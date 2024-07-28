import React from "react";
import { UserContextProvider } from "./UserContext"; // Adjust the path as needed

const UserContextWrapper = ({ children }) => {
  return (
    <UserContextProvider>{children}</UserContextProvider>
  );
};

export default UserContextWrapper;
