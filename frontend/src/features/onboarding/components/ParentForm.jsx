import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Button } from "../../../components/ui/Button";
import { toast } from "react-toastify";
import {
  registerParent,
  resendOtpParent,
  verifyOtpParent,
} from "../../../services/auth";
import { nigeriaData } from "../../../data/nigeriaData";
import OtpModal from "./OtpModal";
import Loading from "../../../components/ui/Loading";

export const ParentForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueCode, setUniqueCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempOtp, setTempOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
    setIsLoading(true); // Start loading

    try {
      const response = await registerParent(name, email, password, uniqueCode);

      if (response?.status === 201) {
        toast.success("Check your email for OTP");
        setShowOtpModal(true);

        setTempOtp(response.data.message.otp);

        setIsLoading(false);
      } else if (response?.status === 409) {
        toast.error("This email is already registered. Try logging in!");
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
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
    setIsLoading(true);
    try {
      const response = await resendOtpParent(email);

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

      {/* Form Fields */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Tasha Noah"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            placeholder="johnnoah@email.com"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Password
          </label>
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

        {/* Child's Unique Code */}
        <div>
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Child's Unique Code
          </label>
          <input
            type="text"
            value={uniqueCode}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            onChange={(e) => setUniqueCode(e.target.value)}
            required
          />
        </div>

        {/* State selection */}
        <div className="flex-1">
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            State of Origin
          </label>
          <select
            value={selectedState}
            onChange={handleStateChange}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm cursor-pointer"
          >
            <option value="">Select State</option>
            {nigeriaData.map((item) => (
              <option key={item.state} value={item.state}>
                {item.state}
              </option>
            ))}
          </select>
        </div>

        {/* LGA Selection */}
        <div className="flex-1">
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            LGA
          </label>
          <select
            value={selectedLga}
            onChange={(e) => setSelectedLga(e.target.value)}
            disabled={!selectedState}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select LGA</option>
            {availableLGAs.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
        </div>

        <Button disabled={isLoading} className="mt-4">
          {isLoading ? "Creating Account..." : " Create Parent Account"}
        </Button>
      </form>

      {showOtpModal && (
        <OtpModal
          isOpen={showOtpModal}
          email={email}
          otpReceievd={tempOtp}
          onResend={handleResendOtp}
          verifyService={verifyOtpParent}
          onVerifySuccess={handleVerifyOtp}
          onClose={() => setShowOtpModal(false)}
          onVerify={async (otpValue) => {
            setIsLoading(true); // Start loading when verify is clicked
            try {
              const response = await verifyOtpParent(email, otpValue);

              if (response?.status === 200 || response?.status === 201) {
                toast.success("Verification successful! Please login");
                setShowOtpModal(false);
                navigate("/signin");
              } else {
                // Check if response exists before accessing data
                const errorMsg = response?.data?.message || "Invalid OTP";
                toast.error(errorMsg);
              }
            } catch (error) {
              toast.error("Something went wrong");
              console.error("Verification Error:", error);
            } finally {
              setIsLoading(false);
            }
          }}
        />
      )}
    </div>
  );
};
