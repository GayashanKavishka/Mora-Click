import React from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { isTokenExpired } from "./authUser";


const ProtectedUserRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token);

  if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
    // return <Navigate to="/" />
    return children;
  }

  return children;
};

export default ProtectedUserRoute;
