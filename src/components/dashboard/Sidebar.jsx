import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineTrophy,
  HiOutlineUsers,
  HiOutlineLogout,
} from "react-icons/hi";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: <HiOutlineViewGrid />, path: "/dashboard" },
    { name: "Courses", icon: <HiOutlineBookOpen />, path: "/courses" },
    {
      name: "Learning Path",
      icon: <HiOutlineAcademicCap />,
      path: "/learning-path",
    },
    { name: "Assessment", icon: <HiOutlineChartBar />, path: "/assessment" },
    { name: "Progress", icon: <HiOutlineClock />, path: "/progress" },
    { name: "Planner", icon: <HiOutlineCalendar />, path: "/planner" },
    { name: "Reward", icon: <HiOutlineTrophy />, path: "/reward" },
    { name: "Subscription", icon: <HiOutlineUsers />, path: "/subscription" },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#F8F9FD] border-r border-gray-100 flex flex-col justify-between py-8 px-6">
      <div>
        <h1 className="text-xl font-bold text-[#0A2684] mb-12 px-4">Path IQ</h1>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[#EEEBFF] text-[#4F46E5] border-r-4 border-[#0A2684]"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors font-medium text-sm">
        <HiOutlineLogout className="text-xl" />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
