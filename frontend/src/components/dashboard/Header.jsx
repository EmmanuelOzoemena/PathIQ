import React from "react";
import {
  HiOutlineSearch,
  HiOutlineBell,
  HiOutlineCog,
  
  HiMenuAlt2,
} from "react-icons/hi";
import profilePic from "../../assets/avatar.jpg";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <HiMenuAlt2 className="text-2xl" />
        </button>

        {/* Search Bar - Hidden on very small screens, or resized */}
        <div className="relative hidden sm:block w-48 lg:w-72">
          <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-3 lg:gap-6">
        <div className="hidden md:flex items-center gap-4 text-gray-400 border-r border-gray-100 pr-6">
          <button className="hover:text-[#0A2684] cursor-pointer transition-colors">
            <HiOutlineCog className="text-2xl" />
          </button>
          <div className="relative cursor-pointer hover:text-[#0A2684] transition-colors">
            <HiOutlineBell className="text-2xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white"></span>
          </div>
          <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
            <span className="text-black">5</span>
            <span>🔥</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden xs:block">
            <p className="text-sm font-bold text-[#0A2684]">Tasha Noah</p>
            <p className="text-[10px] text-gray-400 font-medium cursor-pointer hover:underline">
              View profile
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
