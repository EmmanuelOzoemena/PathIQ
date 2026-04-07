import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const OtpModal = ({
  isOpen,
  email,
  onVerifySuccess,
  otpReceievd,
  onResend,
  verifyService
}) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
    const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Backspace to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      toast.warn("Please enter the full 6-digit code");
      return;
    }

try {
    const response = await verifyService(email, finalOtp);

    if (response?.status === 200 || response?.status === 201) {
      if (onVerifySuccess) onVerifySuccess(); 
    } else {
      toast.error(response?.data?.message || "Invalid OTP");
    }
  } catch (error) {
    // This was likely triggering because of the navigation race
    console.error("Verification Error:", error);
    toast.error("An error occurred during verification");
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative scale-in-center">
        {/* DEV OTP DISPLAY */}
        <div className="absolute -top-4 -right-4 bg-orange-100 border-2 border-orange-400 text-orange-700 px-4 py-2 rounded-2xl shadow-lg z-[110] animate-bounce">
          <p className="text-[10px] font-black uppercase tracking-widest">
            Your OTP
          </p>
          <p className="text-xl font-mono font-bold text-center">
            {otpReceievd || "------"}
          </p>
        </div>

        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
            📩
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Verify your email
          </h2>
          <p className="text-sm text-gray-500 px-4">
            We've sent a 6-digit code to{" "}
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 border-2 border-gray-200 rounded-xl text-center text-xl font-bold text-[#0A2684] focus:border-[#4F46E5] outline-none transition-all"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#0A2684] text-white py-4 rounded-xl font-bold hover:bg-blue-900 transition-all shadow-md active:scale-[0.98]"
          >
            Verify Code
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onResend}
              className="text-sm text-gray-400 font-medium hover:text-[#4F46E5] transition-colors"
            >
              Didn't get a code? <span className="underline">Resend OTP</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
