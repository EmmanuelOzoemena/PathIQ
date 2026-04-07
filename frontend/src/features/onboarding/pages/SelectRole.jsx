import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "../../../components/ui/Button";
import RoleCard from "../components/RoleCard";
// import  pathIqLogo  from "../../../assets/pathiq-logo.png";

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState("student");

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/signup/details", { state: { role: selectedRole } });
  };

  return (
    <AuthLayout
      customSidebarContent={
        <div>
          {/* Overriding the default sidebar content for this specific screen */}
          {/* <h1 className="text-2xl font-bold tracking-tight mb-8">
            Path <br /> IQ
          </h1> */}

          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
              P
              {/* <img src={pathIqLogo} alt="logo" /> */}
            </div>
            <span className="text-white text-2xl font-black tracking-tighter">
              Path<span className="text-blue-400">IQ</span>
            </span>
          </div>

          <span className="inline-block border border-white/30 rounded-full px-4 py-1 text-sm mb-6">
            Student Sign Up
          </span>
          <h2 className="text-6xl font-bold leading-tight mb-6">
            Who are you <br /> signing up as?
          </h2>
          <p className="text-blue-100 text-lg max-w-md mb-12">
            PathIQ works differently depending on your role. Choose the one that
            fits and we'll tailor your experience from the start.
          </p>

          <div className="bg-white rounded-xl p-6 text-gray-800 w-80 shadow-xl">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4">
              YOU'LL GET ACCESS TO
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-200 rounded"></div>
                <div>
                  <p className="text-xs font-bold text-[#001D66]">Student</p>
                  <p className="text-[10px] text-gray-500">
                    Learn, track and achieve your exam goals
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded"></div>
                <div>
                  <p className="text-xs font-bold text-[#001D66]">Parent</p>
                  <p className="text-[10px] text-gray-500">
                    Monitor your child's progress and activity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-[#001D66] mb-2">
          Create your account
        </h1>
        <p className="text-gray-500 mb-8 text-sm">
          Choose your role to get the right experience for you.
        </p>

        {/* Stepper Placeholder */}
        <div className="flex items-center gap-4 mb-10">
          <div className="w-8 h-8 rounded-full bg-[#001D66] text-white flex items-center justify-center text-sm font-bold">
            1
          </div>
          <div className="h-[1px] flex-grow bg-gray-200"></div>
          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm font-bold">
            2
          </div>
          <div className="h-[1px] flex-grow bg-gray-200"></div>
          <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-sm font-bold">
            3
          </div>
        </div>

        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
          SELECT YOUR ROLES
        </p>

        <RoleCard
          title="Student"
          description="I want to study, take quizzes and track my exam preparation."
          iconColor="bg-blue-200"
          selected={selectedRole === "student"}
          onClick={() => setSelectedRole("student")}
        />

        <RoleCard
          title="Parent / Guardian"
          description="I want to monitor my child's learning progress and activity."
          iconColor="bg-gray-300"
          selected={selectedRole === "parent"}
          onClick={() => setSelectedRole("parent")}
        />

        <div className="mt-10 space-y-4">
          <Button onClick={handleContinue}>
            Continue as{" "}
            {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </Button>
          <Button variant="outline">Sign in</Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SelectRole;
