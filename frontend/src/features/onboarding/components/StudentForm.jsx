import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { toast } from "react-toastify";
import { register, resendOtp } from "../../../services/auth";
import { nigeriaData } from "../../../data/nigeriaData";
import { Button } from "../../../components/ui/Button";
import Loading from "../../../components/ui/Loading";
import OtpModal from "./OtpModal";
import { verifyOtp } from "../../../services/auth";

export const StudentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempOtp, setTempOtp] = useState("");
  const navigate = useNavigate();

  // Handle Nigeria Data filtering
  const stateObject = nigeriaData.find((item) => item.state === selectedState);
  const availableLGAs = stateObject ? stateObject.lgas : [];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedLga("");
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await register(name, email, password);

      if (response?.status === 201) {
        toast.success("Check your email for OTP");
        // Extract OTP from response for the dev badge
        setTempOtp(response?.data?.message?.otp || "");
        setShowOtpModal(true);
      } else if (response?.status === 409) {
        toast.error("This email is already registered. Try logging in!");
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    setShowOtpModal(false);
    toast.success("Account verified! Please login");
    navigate("/signin");
  };

  const handleResendOtp = async () => {
    setIsLoading(true); // Show our global spinner
    try {
      const response = await resendOtp(email);

      if (response?.data?.success) {
        setTempOtp(response.data.message);
        toast.success("A new OTP has been sent!");
      } else {
        toast.error(response?.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Loading isLoading={isLoading} />

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            required
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="****************"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm pr-10"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#001D66] transition-colors cursor-pointer"
            >
              {showPassword ? (
                <HiEyeOff className="text-xl" />
              ) : (
                <HiEye className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            required
          />
        </div>

        {/* Location Selection */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[#001D66] text-[11px] font-bold mb-1">
              State of Origin
            </label>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm cursor-pointer"
              required
            >
              <option value="">Select State</option>
              {nigeriaData.map((item) => (
                <option key={item.state} value={item.state}>
                  {item.state}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-[#001D66] text-[11px] font-bold mb-1">
              LGA
            </label>
            <select
              value={selectedLga}
              onChange={(e) => setSelectedLga(e.target.value)}
              disabled={!selectedState}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              required
            >
              <option value="">Select LGA</option>
              {availableLGAs.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button disabled={isLoading} className="w-full mt-4">
          {isLoading ? "Creating Account..." : "Create Student Account"}
        </Button>
      </form>

      <OtpModal
        isOpen={showOtpModal}
        email={email}
        otpReceievd={tempOtp}
        onResend={handleResendOtp}
        onVerifySuccess={handleVerifyOtp}
        verifyService={verifyOtp}
        onClose={() => setShowOtpModal(false)}
      />
    </div>
  );
};
