import React from "react";

const ParentSidebar = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-8">
        Path <br /> IQ
      </h1>
      <span className="inline-block border border-white/30 rounded-full px-4 py-1 text-sm mb-6">
        Parent Sign Up
      </span>

      <h2 className="text-6xl font-bold leading-tight mb-6">
        Stay close to <br /> their progress.
      </h2>

      <p className="text-blue-100 text-lg max-w-md mb-12">
        Create a parent account to monitor your child's learning, activity and
        exam preparation in real time.
      </p>

      {/* Access List Card */}
      <div className="bg-white rounded-xl p-6 text-gray-800 w-80 shadow-xl">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4 font-bold">
          YOU'LL GET ACCESS TO
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-sm text-[#001D66] font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            Live dashboard of your child's progress
          </li>
          <li className="flex items-center gap-3 text-sm text-[#001D66] font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            Weekly performance reports
          </li>
          <li className="flex items-center gap-3 text-sm text-[#001D66] font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            Set study goals & reminders
          </li>
          <li className="flex items-center gap-3 text-sm text-[#001D66] font-medium">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
            Activity & time-on-platform reports
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ParentSidebar;
