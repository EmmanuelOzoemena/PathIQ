import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "../../../components/ui/Button";
import StudentSidebar from "../components/StudentSidebar";
import Loading from "../../../components/ui/Loading";

import { login, loginParent, forgetPassword } from "../../../services/auth";
import { useAuth } from "../../../context/AuthContext";
import ResetPasswordModal from "../../../components/ui/ResetPasswordModal";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginRole, setLoginRole] = useState("student");
  const [showResetModal, setShowResetModal] = useState(false);

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response =
        loginRole === "student"
          ? await login(email, password)
          : await loginParent(email, password);

      if (response?.status === 200) {
        const { token, student, guardian } =
          response.data.message || response.data;
        const userData = student || guardian;

        if (token && userData) {
          authLogin(userData, loginRole, token);
          Cookies.set("auth_token", token, { expires: 1 });

          toast.success(`Welcome back, ${userData.name || "User"}!`);

          // Redirect based on role
          if (loginRole === "student") {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/parent", { replace: true });
          }
        }
      } else {
        toast.error(response?.data?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    if (!email) {
      return toast.error("Enter your email address first!");
    }
    setShowResetModal(true); // Open instantly!
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error(
        "Please enter your email address first so we know where to send the code.",
      );
      return;
    }

    try {
      const res = await forgetPassword(email);
      if (res?.status === 200 || res?.status === 201) {
        toast.success("Reset code sent to your email!");
        setShowResetModal(true); // <--- This opens the modal
      } else {
        toast.error(res?.data?.message || "User not found");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout customSidebarContent={<StudentSidebar />}>
      <Loading isLoading={isLoading} />
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-[#001D66] mb-2">
          Sign in to PathIQ
        </h1>
        <p className="text-gray-500 mb-8 text-sm font-medium">
          Welcome back! Your learning continues here.
        </p>

        {/* --- ROLE SWITCHER --- */}
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setLoginRole("student")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all border-2 ${
              loginRole === "student"
                ? "border-[#0A2684] text-[#0A2684] bg-blue-50/50"
                : "border-gray-100 text-gray-400 bg-transparent"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setLoginRole("parent")}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all border-2 ${
              loginRole === "parent"
                ? "border-[#0A2684] text-[#0A2684] bg-blue-50/50"
                : "border-gray-100 text-gray-400 bg-transparent"
            }`}
          >
            Parent
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label className="block text-[#001D66] text-xs font-bold mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johnnoah@email.com"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[#001D66] text-xs font-bold uppercase tracking-wide">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] font-bold text-blue-600 hover:underline"
                onClick={handleForgotPasswordClick}
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="****************"
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all pr-12"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#001D66]"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* The Reset Password Modal */}
        <ResetPasswordModal
          isOpen={showResetModal}
          onClose={() => setShowResetModal(false)}
          email={email}
        />

        {/* Divider & Footer remain the same... */}
        <div className="relative flex items-center my-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
            OR
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <p className="text-center text-sm text-gray-600 font-medium">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-[#001D66] font-bold underline cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
