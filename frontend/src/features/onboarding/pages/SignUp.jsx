import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "../../../components/ui/Button";

const SignUp = () => {
  const navigate = useNavigate(); 

  const handleCreateAccount = () => {
    // Later, add API calls here
    navigate("/select-role");
  };

  return (
    <AuthLayout>
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-extrabold text-[#001D66] mb-2">
          Get started for free
        </h1>
        <p className="text-gray-500 mb-8">
          Join 50,000+ students already studying smarter.
        </p>

        {/* Social Buttons */}
        <div className="flex gap-4 mb-6">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 text-sm"
          >
            <span className="font-bold">G</span> Google
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 text-sm"
          >
            <span className="font-bold">f</span> Facebook
          </Button>
        </div>

        <div className="relative flex items-center mb-8">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">
            or continue with email
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Form */}
        <div className="mb-6">
          <label className="block text-[#001D66] text-sm font-bold mb-2">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-4 mb-10">
          <Button
            className="flex-[2]"
            onClick={handleCreateAccount}
          >
            Create Account
          </Button>
          <Button onClick={() => navigate('/signin')} variant="outline" className="flex-[1]">
            Sign in
          </Button>
        </div>

        {/* Features Info Box */}
        <div className="bg-[#E9EDF7] rounded-xl p-6 mb-8">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            What you'll get
          </p>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              Personalized learning path from your diagnostic
            </li>
            <li className="flex items-center gap-2">
              Real-time performance tracking by subject
            </li>
            <li className="flex items-center gap-2">
              Streaks, XP rewards and gamified progress
            </li>
            <li className="flex items-center gap-2">
              JAMB, WAEC, NECO exam countdown planner
            </li>
          </ul>
        </div>

        <p className="text-center text-[11px] text-gray-400">
          By continuing you agree to our{" "}
          <span className="underline cursor-pointer">Terms</span> &{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
