// src/components/layout/Header.jsx
import React from 'react';
import { Search, Settings, Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, userRole } = useAuth();
  
  const userName = user?.name || 'User';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">PathIQ</h1>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden sm:block flex-1 max-w-md lg:max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, students..."
              className="w-full h-10 pl-10 pr-4 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 pl-9 pr-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Right side - Icons and Profile */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Settings Icon */}
          <button className="hidden xs:block p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors">
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Notification Icon */}
          <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors relative">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

          {/* Profile Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">{userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-100 dark:bg-indigo-900 rounded-full ring-2 ring-indigo-50 dark:ring-indigo-900/50 flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{userInitials}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;