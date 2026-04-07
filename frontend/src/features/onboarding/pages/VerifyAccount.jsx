// src/features/onboarding/pages/VerifyAccount.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../layouts/AuthLayout';
import { Button } from '../../../components/ui/Button';
import { verifyOtp, resendOtp, verifyOtpParent, resendOtpParent } from '../../../services/auth';
import { toast } from 'react-toastify';
import OtpModal from '../components/OtpModal';

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  // Debug logs
  useEffect(() => {
    console.log('🔥 process.env.NODE_ENV:', process.env.NODE_ENV);
    console.log('🔥 storedEmail:', sessionStorage.getItem('signupEmail'));
    console.log('🔥 storedRole:', sessionStorage.getItem('signupRole'));
  }, []);

  useEffect(() => {
    console.log('🔥 showOtpModal:', showOtpModal);
    console.log('🔥 generatedOtp:', generatedOtp);
  }, [showOtpModal, generatedOtp]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('signupEmail');
    const storedRole = sessionStorage.getItem('signupRole') || 'student';
    
    if (storedEmail) {
      setEmail(storedEmail);
      setRole(storedRole);
      
      // In development, show OTP modal after signup
      if (process.env.NODE_ENV === 'development') {
        // Simulate OTP generation (in real app, this comes from backend)
        const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(mockOtp);
        setShowOtpModal(true);
      }
    } else {
      navigate('/signup');
    }
  }, [navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Verifying OTP for:', email, 'Role:', role);
      
      // Choose the right verification function based on role
      const verifyFunction = role === 'student' ? verifyOtp : verifyOtpParent;
      const response = await verifyFunction(email, otpValue);
      
      console.log('Verification response:', response);

      if (response?.status === 200 || response?.status === 201) {
        setSuccess('Account verified successfully!');
        toast.success('Email verified! You can now login.');
        
        // Clear session storage
        sessionStorage.removeItem('signupEmail');
        sessionStorage.removeItem('signupRole');
        
        // Redirect to signin after 2 seconds
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        setError(response?.data?.message || 'Verification failed');
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log('Resending OTP to:', email, 'Role:', role);
      
      // Choose the right resend function based on role
      const resendFunction = role === 'student' ? resendOtp : resendOtpParent;
      const response = await resendFunction(email);
      
      console.log('Resend response:', response);

      if (response?.status === 200 || response?.status === 201) {
        setSuccess('OTP resent successfully! Check your email.');
        toast.success('New OTP sent to your email');
        setCountdown(60); // Disable resend for 60 seconds
        
        // Update mock OTP for development
        if (process.env.NODE_ENV === 'development') {
          const newMockOtp = Math.floor(100000 + Math.random() * 900000).toString();
          setGeneratedOtp(newMockOtp);
          setShowOtpModal(true);
        }
      } else {
        setError(response?.data?.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('Resend error:', err);
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowOtpModal(false);
  };

  const handleUseOtp = (otpValue) => {
    // Split OTP into array of digits
    const otpArray = otpValue.split('');
    setOtp(otpArray);
    setShowOtpModal(false);
    toast.info('OTP filled automatically');
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-4xl font-extrabold text-[#001D66] mb-2 text-center">
          Verify Your Account
        </h1>
        <p className="text-gray-500 mb-2 text-sm text-center">
          Enter the 6-digit code sent to
        </p>
        <p className="text-[#001D66] font-semibold mb-2 text-center">{email}</p>
        <p className="text-sm text-gray-500 mb-8 text-center capitalize">
          Role: {role}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm">
            {success}
          </div>
        )}

        {/* OTP Input */}
        <div className="flex gap-2 justify-center mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading || resendLoading}
            />
          ))}
        </div>

        <Button
          onClick={handleVerify}
          disabled={loading || resendLoading}
          className="w-full py-4 mb-4"
        >
          {loading ? 'Verifying...' : 'Verify Account'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive code?
          </p>
          <button
            onClick={handleResendOtp}
            disabled={resendLoading || countdown > 0}
            className="text-[#001D66] font-bold underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? 'Sending...' : 
             countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
          </button>
        </div>
      </div>

      {/* OTP Modal for Development */}
      {showOtpModal && process.env.NODE_ENV === 'development' && (
        <OtpModal
          isOpen={showOtpModal}
          email={email}
          otpReceievd={generatedOtp}
          onVerify={(enteredOtp) => {
            console.log('OTP entered from modal:', enteredOtp);
            const otpArray = enteredOtp.split('');
            setOtp(otpArray);
            // Small delay to ensure state updates before verification
            setTimeout(() => handleVerify(), 100);
          }}
          onResend={handleResendOtp}
        />
      )}
    </AuthLayout>
  );
};

export default VerifyAccount;