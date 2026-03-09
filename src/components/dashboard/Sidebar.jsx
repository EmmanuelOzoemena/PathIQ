import React from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineBookOpen,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineLogout,
  HiX,
} from "react-icons/hi";
import { HiOutlineTrophy } from "react-icons/hi2";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    { name: "Dashboard", icon: <HiOutlineViewGrid />, path: "/dashboard" },
    { name: "Courses", icon: <HiOutlineBookOpen />, path: "/unavailable" },
    {
      name: "Learning Path",
      icon: <HiOutlineAcademicCap />,
      path: "/unavailable",
    },
    { name: "Assessment", icon: <HiOutlineChartBar />, path: "/unavailable" },
    { name: "Progress", icon: <HiOutlineClock />, path: "/unavailable" },
    { name: "Planner", icon: <HiOutlineCalendar />, path: "/unavailable" },
    { name: "Reward", icon: <HiOutlineTrophy />, path: "/unavailable" },
    { name: "Subscription", icon: <HiOutlineUsers />, path: "/unavailable" },
  ];

  return (
    <>
      {/* Mobile Overlay (Darkens background when sidebar is open) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#F8F9FD] border-r border-gray-100 flex flex-col justify-between py-8 px-6 transition-transform duration-300 ease-in-out transform
        lg:translate-x-0 lg:static lg:inset-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div>
          <div className="flex items-center justify-between mb-12 px-4">
            <h1 className="text-xl font-bold text-[#0A2684]">Path IQ</h1>
            <button onClick={closeSidebar} className="lg:hidden text-gray-500">
              <HiX className="text-2xl" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeSidebar} // Close sidebar when a link is clicked
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

        <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition-colors font-medium text-sm cursor-pointer">
          <HiOutlineLogout className="text-xl" />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
