import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineChevronRight,
  HiOutlineCalendar,
} from "react-icons/hi";
import { Button } from "../../../components/ui/Button";

const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex p-8 gap-8">
        {/* CENTER COLUMN: Main Content */}
        <div className="flex-[2] space-y-8">
          {/* Header Bar */}
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>

          {/* Welcome Section */}
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                Good Morning, Tasha 👋
              </h2>
              <p className="text-gray-400 text-sm">
                Ready to continue learning?
              </p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-gray-400 text-xs">
                  Exam Date:{" "}
                  <span className="font-bold text-gray-700">
                    14 April, 2026
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button className="py-2 px-4 text-xs bg-[#0A2684]">
                  Start Practice
                </Button>
                <Button variant="outline" className="py-2 px-4 text-xs">
                  Take a Quiz
                </Button>
              </div>
            </div>
          </div>

          {/* Top Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            {/* JAMB Readiness Card */}
            <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center">
              <p className="text-[10px] text-gray-400 font-bold mb-4 uppercase">
                JAMB Readiness Score
              </p>
              <div className="w-16 h-16 rounded-full border-4 border-blue-50 border-t-green-400 flex items-center justify-center mb-2">
                <span className="text-sm font-bold">67%</span>
              </div>
              <p className="text-[10px] text-green-500 font-bold">
                ● Good Progress
              </p>
            </div>
            {/* Add other cards similarly... */}
          </div>

          {/* Subject Progress Section */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Your JAMB Subjects</h3>
            <div className="grid grid-cols-4 gap-4">
              {["English", "Maths", "Physics", "Chemistry"].map((sub, i) => (
                <div
                  key={sub}
                  className="p-4 border border-gray-100 rounded-xl flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                      <HiOutlineBookOpen />
                    </span>
                    <HiOutlineChevronRight className="text-gray-300" />
                  </div>
                  <p className="font-bold text-sm">{sub}</p>
                  <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-blue-400`}
                      style={{ width: `${75 - i * 10}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-right text-gray-400">
                    {75 - i * 10}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Info Panel */}
        <div className="w-80 space-y-6">
          {/* User Profile Info */}
          <div className="flex items-center justify-end gap-4 mb-8">
            <HiOutlineCog className="text-xl text-gray-400" />
            <div className="flex items-center gap-1 text-gray-600 font-bold">
              <HiOutlineBell /> <span>5</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">Tasha Noah</p>
                <p className="text-[10px] text-gray-400">View profile</p>
              </div>
              {/* INSERT STUDENT IMAGE HERE: src/assets/student-avatar.png */}
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden"></div>
            </div>
          </div>

          {/* JAMB Countdown */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between mb-4">
              <p className="text-xs font-bold text-gray-800 uppercase">
                JAMB Countdown
              </p>
              <HiOutlineCalendar className="text-gray-400" />
            </div>
            <div className="bg-[#0A2684] text-white p-4 rounded-xl text-center">
              <p className="text-4xl font-bold">45</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-1">
                Days Left
              </p>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-4 font-medium uppercase tracking-wider">
              Exam: 14 April, 2026
            </p>
          </div>

          {/* Today's Tasks */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <p className="text-xs font-bold text-gray-800 mb-4 uppercase">
              Today's Tasks
            </p>
            <div className="space-y-4">
              {[
                "Math Quiz - 12:00 PM",
                "English Past Qs (10)",
                "Physics Reading",
              ].map((task) => (
                <div
                  key={task}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  {task}
                </div>
              ))}
            </div>
            <Button className="mt-6 text-xs bg-[#0A2684]">View Planner</Button>
          </div>

          {/* XP Banner */}
          <div className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between shadow-sm">
            <div className="flex gap-2 text-xl">🔥 🔥 🔥 🔥</div>
            <div className="bg-[#EEEBFF] text-[#4F46E5] px-3 py-1 rounded-lg text-xs font-bold">
              +10 XP
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
