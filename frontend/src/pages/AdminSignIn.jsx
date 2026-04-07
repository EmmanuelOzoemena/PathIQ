// src/features/onboarding/pages/AdminSignIn.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { loginAdmin } from "../../../services/auth";

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting admin login with email:", email);
      const response = await loginAdmin(email, password);
      console.log("Admin login response:", response);

      // Check if login was successful
      if (response?.status === 200) {
        const responseData = response.data;
        
        let token, adminData;
        
        // Try different response structures
        if (responseData?.token) {
          token = responseData.token;
          adminData = responseData.admin || responseData.user;
        } else if (responseData?.data?.token) {
          token = responseData.data.token;
          adminData = responseData.data.admin || responseData.data.user;
        } else if (responseData?.message?.token) {
          token = responseData.message.token;
          adminData = responseData.message.admin;
        }

        if (token && adminData) {
          const adminWithRole = { 
            ...adminData, 
            role: "admin",
            isAdmin: true 
          };
          
          console.log("Setting admin data:", adminWithRole);
          console.log("Setting admin token:", token);
          
          // Store admin in auth context
          authLogin(adminWithRole, "admin", token);
          
          toast.success("Admin access granted");
          navigate("/admin/dashboard", { replace: true });
        } else {
          setError("Invalid response from server");
          console.error("Response structure:", responseData);
        }
      } else {
        setError(response?.data?.message || "Invalid admin credentials");
      }
    } catch (error) {
      console.error("Admin Login error:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-full">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-2">Secure access for PathIQ administrators</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="admin@pathiq.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <HiEyeOff className="w-5 h-5" /> : <HiEye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 font-medium"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Admin Credentials Hint */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            Demo Admin Credentials:<br />
            Email: admin@pathiq.com<br />
            Password: admin@pathiq001
          </p>
        </div>

        {/* Back to Student Login */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/signin")}
            className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
          >
            ← Back to Student Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;