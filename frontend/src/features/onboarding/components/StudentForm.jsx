import React from "react";
import { useNavigate } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import { Button } from "../../../components/ui/Button";

export const StudentForm = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-md py-4">
      <h1 className="text-3xl font-extrabold text-[#001D66] mb-2">
        Create Student Account
      </h1>

      {/* Role Switcher */}
      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-6">
        <span className="text-xs text-blue-800">Signing up as Student</span>
        <button
          onClick={() => navigate("/select-role")}
          className="text-xs font-bold text-blue-900 underline flex items-center gap-1 cursor-pointer"
        >
          Change{" "}
          <HiPencilAlt className="text-sm group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
          ✓
        </div>
        <div className="h-[1px] flex-grow bg-blue-600"></div>
        <div className="w-8 h-8 rounded-full bg-[#001D66] text-white flex items-center justify-center text-sm font-bold">
          2
        </div>
        <div className="h-[1px] flex-grow bg-gray-200"></div>
        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm font-bold">
          3
        </div>
      </div>

      {/* Socials */}
      <div className="flex gap-4 mb-6">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 text-xs py-2"
        >
          <span className="font-bold">G</span> Google
        </Button>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 text-xs py-2"
        >
          <span className="font-bold">f</span> Facebook
        </Button>
      </div>

      <div className="relative flex items-center mb-6">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-[10px] uppercase tracking-widest font-bold">
          or continue with email
        </span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      {/* Form Fields */}
      <form className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-[#001D66] text-[11px] font-bold mb-1">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-[#001D66] text-[11px] font-bold mb-1">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Noah"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="johnnoah@email.com"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Child's Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. Tasha Noah"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-[#001D66] text-[11px] font-bold mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="****************"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            required
          />

          {/* Strength Meter */}
          <div className="flex gap-1 mt-2">
            <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
            <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
            <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
            <div className="h-1 flex-1 bg-red-400 rounded-full"></div>
          </div>
          <p className="text-[10px] text-green-600 mt-1 font-bold">Strong ✓</p>
        </div>

        <Button className="mt-4">Create Student Account</Button>
      </form>
    </div>
  );
};
