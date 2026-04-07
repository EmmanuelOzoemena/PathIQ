import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = Cookies.get("auth_token");

  // Check if token exists
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  try {
    // Ensure token is a string and has 3 parts before decoding
    if (typeof token !== "string" || token.split(".").length !== 3) {
      throw new Error("Invalid format");
    }

    // Check if token is expired
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      Cookies.remove("auth_token");
      return <Navigate to="/signin?error=expired" replace />;
    }

    // If everything is fine, show the dashboard (Outlet)
    return <Outlet />;
  } catch (error) {
    // If token is invalid/corrupt
    console.error("Token decode failed:", error.message);
    Cookies.remove("auth_token");
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;
