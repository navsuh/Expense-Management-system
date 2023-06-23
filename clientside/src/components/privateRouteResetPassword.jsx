import React from "react";
import { Navigate } from "react-router-dom";
// import { useBoundStore } from "../store";

export default function PrivateRouteResetPassword({ children }) {
  
  if (!sessionStorage.getItem("OTP")) {
    return <Navigate to="/login" />;
  }
  return children;
}
