import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiLockClosed, HiX } from "react-icons/hi";
import { resetPassword, forgetPassword } from "../../services/auth";
import { toast } from "react-toastify";
import { Button } from "./Button";

const ResetPasswordModal = ({ isOpen, onClose, email }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [debugOtp, setDebugOtp] = useState("");

  useEffect(() => {
    if (isOpen && email) {
      sendResetEmail();
    }
  }, [isOpen, email]);

  const sendResetEmail = async () => {
    setIsSendingEmail(true);
    try {
      const res = await forgetPassword(email);
      if (res?.status === 200 || res?.status === 201) {
        // Capture OTP for the debug badge
        const code = res.data?.otp || res.data?.message?.otp || res.data?.message;
        setDebugOtp(code);
        toast.success("Debug: OTP received!");
      } else {
        toast.error("User verification failed");
        onClose();
      }
    } catch (error) {
      toast.error("Connection error");
      onClose();
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && element.nextSibling) element.nextSibling.focus();
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    setIsLoading(true);
    try {
      const res = await resetPassword(email, finalOtp, newPassword);
      if (res?.status === 200 || res?.status === 201) {
        toast.success("Password Updated!");
        onClose();
      } else {
        toast.error(res?.data?.message || "Invalid Code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#001D66]/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
          >
            {/* --- THE DEBUG BADGE --- */}
            {debugOtp && (
              <div className="absolute -top-4 -right-4 bg-orange-100 border-2 border-orange-400 text-orange-700 px-4 py-2 rounded-2xl shadow-lg z-[110] animate-bounce">
                <p className="text-[10px] font-black uppercase tracking-widest text-center">
                  Your OTP
                </p>
                <p className="text-xl font-mono font-bold text-center">
                  {debugOtp}
                </p>
              </div>
            )}

            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
              <HiX className="text-2xl" />
            </button>

            {isSendingEmail ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-[#001D66] font-bold">Requesting PathIQ Code...</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                    <HiLockClosed />
                  </div>
                  <h2 className="text-2xl font-black text-[#001D66]">Reset Password</h2>
                  <p className="text-sm text-gray-500 mt-2">Check the floating badge for your code</p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                  <div className="flex justify-between gap-2">
                    {otp.map((data, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-12 h-14 border-2 border-gray-100 rounded-xl text-center text-xl font-bold focus:border-blue-500 outline-none transition-all"
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                      />
                    ))}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#001D66] uppercase tracking-wider">New Password</label>
                    <input
                      type="password"
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button disabled={isLoading} className="w-full py-4">
                    {isLoading ? "Updating..." : "Set New Password"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResetPasswordModal;