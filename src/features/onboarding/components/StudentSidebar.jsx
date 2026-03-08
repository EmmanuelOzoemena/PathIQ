import React from "react";

const StudentSidebar = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-8">
        Path <br /> IQ
      </h1>
      <span className="inline-block border border-white/30 rounded-full px-4 py-1 text-sm mb-6">
        Student Sign Up
      </span>
      <h2 className="text-6xl font-bold leading-tight mb-6">
        Your journey <br /> starts here.
      </h2>
      <p className="text-blue-100 text-lg max-w-md mb-12">
        Set up your free account in under 2 minutes. No credit card required.
      </p>

      {/* Session Card */}
      <div className="bg-white rounded-xl p-6 text-gray-800 w-80 shadow-xl">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4 font-bold">
          YOUR LAST SESSION
        </p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#001D66] flex items-center justify-center text-white font-bold">
            TN
          </div>
          <div>
            <p className="text-xs font-bold text-[#001D66]">Tasha Noah</p>
            <p className="text-[10px] text-gray-500">
              Mathematics · Lesson 4 · 82% complete
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🔥</span>
          <div className="flex-grow">
            <p className="text-[10px] font-bold text-gray-700">
              7-day streak — don't lose it!
            </p>
            <div className="w-full bg-blue-100 h-1.5 rounded-full mt-1 overflow-hidden">
              <div className="bg-blue-600 h-full w-[70%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
