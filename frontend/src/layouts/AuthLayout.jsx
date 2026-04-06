import React from "react";
import DefaultSidebar from "./DefaultSidebar";
import { useNavigate, useLocation } from "react-router-dom"; // 1. Added useLocation

const AuthLayout = ({ children, customSidebarContent }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 2. Initialize the hook

  // 3. Logic to check if we are on the sign-in page
  const isSignInPage = location.pathname === "/signin";

  return (
    <div className="flex min-h-screen font-sans">
      {/* LEFT SIDE: Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0035B9] text-white p-16 flex-col justify-between">
        {customSidebarContent || <DefaultSidebar />}

        <div className="flex items-center gap-2">
          {/* 4. Conditional Rendering based on the route */}
          {isSignInPage ? (
            <p className="text-sm">
              New to PathIQ?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="font-bold underline cursor-pointer"
              >
                Create a free account
              </span>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="font-bold underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE: Form Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
