import React from "react";
import { useNavigate } from "react-router-dom";
import { UserContextProvider } from "./UserContext"; // Adjust the path as needed

const UserContextWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <UserContextProvider navigate={navigate}>{children}</UserContextProvider>
  );
};

export default UserContextWrapper;
