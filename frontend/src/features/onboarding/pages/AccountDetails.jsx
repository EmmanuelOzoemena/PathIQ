import React from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { HiPencilAlt } from "react-icons/hi";
import AuthLayout from "../../../layouts/AuthLayout";
import ParentSidebar from "../components/ParentSidebar";
import StudentSidebar from "../components/StudentSidebar";
import { StudentForm } from "../components/StudentForm";
import { ParentForm } from "../components/ParentForm";

const AccountDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the role from navigation state (fallback to null to trigger redirect)
  const role = location.state?.role;

  // If no role is selected, redirect back to role selection
  if (!role) {
    return <Navigate to="/select-role" replace />;
  }

  // Sidebar logic
  const renderSidebar = () => {
    return role === "parent" ? <ParentSidebar /> : <StudentSidebar />;
  };

  return (
    <AuthLayout customSidebarContent={renderSidebar()}>
      <div className="w-full max-w-md py-4">
        <h1 className="text-3xl font-extrabold text-[#001D66] mb-2">
          Create {role === "parent" ? "Parent" : "Student"} Account
        </h1>

        {/* Role Switcher Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-6">
          <span className="text-xs text-blue-800 font-medium">
            Signing up as {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
          <button
            onClick={() => navigate("/select-role")}
            className="text-xs font-bold text-blue-900 underline flex items-center gap-1 cursor-pointer group"
          >
            Change{" "}
            <HiPencilAlt className="group-hover:scale-110 transition-transform" />
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

        {/* Conditional Form Rendering */}
        {role === "parent" ? (
          <ParentForm />
        ) : (
          <StudentForm />
        )}
      </div>
    </AuthLayout>
  );
};

export default AccountDetails;