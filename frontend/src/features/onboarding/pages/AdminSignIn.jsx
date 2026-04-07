import { useState } from "react";
import Cookies from "js-cookie";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { ShieldCheck } from "lucide-react"; // Import for a specialized admin look
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "../../../components/ui/Button"; 
// import StudentSidebar from "../features/onboarding/components/StudentSidebar";
import AdminSidebar from "../components/AdminSidebar";
import Loading from "../../../components/ui/Loading";
// import { loginAdmin } from "../../../services/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { loginAdmin } from "../../../services/auth"; 

const AdminSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginAdmin(email, password);

      if (response?.status === 200) {
        const { token, admin } = response.data?.message || response.data;

        if (token && admin) {
          authLogin(admin, "admin", token);
          Cookies.set("auth_token", token, { expires: 1 });

          toast.success("Admin access granted");
          navigate("/admin", { replace: true });
        } else {
          toast.error("Unauthorized");
        }
      } else {
        toast.error(response?.data?.message || "Invalid Admin Credentials");
      }
    } catch (error) {
      console.error("Admin Login error:", error);
      toast.error("Access denied. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout customSidebarContent={<AdminSidebar />}>
      <Loading isLoading={isLoading} />
      <div className="w-full max-w-md">
        {/* Header with Admin Badge */}
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-8 h-8 text-[#001D66]" />
          <span className="bg-blue-100 text-[#001D66] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            System Admin
          </span>
        </div>

        <h1 className="text-4xl font-extrabold text-[#001D66] mb-2">
          Admin Portal
        </h1>
        <p className="text-gray-500 mb-10 text-sm font-medium">
          Secure access for PathIQ administrators only.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-[#001D66] text-[11px] font-bold mb-1 uppercase"
            >
              Admin Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="admin@pathiq.com"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-[#001D66] text-[11px] font-bold mb-1 uppercase"
            >
              Security Key
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="••••••••••••••••"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm pr-10"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#001D66] transition-colors"
              >
                {showPassword ? (
                  <HiEyeOff className="text-xl" />
                ) : (
                  <HiEye className="text-xl" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 shadow-lg shadow-blue-900/20 disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <button
            onClick={() => navigate("/signin")}
            className="text-gray-500 text-xs font-semibold hover:text-[#001D66] transition-colors"
          >
            ← Back to User Login
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AdminSignIn;