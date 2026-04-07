// src/components/dashboard/admin/AdminSidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ShieldCheck, Activity, Users, Zap, 
  LayoutDashboard, BookOpen, BarChart3, 
  FileText, Calendar, Settings, LogOut 
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Grading Events', path: '/admin/events', icon: Calendar }, // ← ADDED
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Reports', path: '/admin/reports', icon: FileText },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/admin/signin');
  };

  return (
    <div className="text-white p-6">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight leading-tight">
          Path <br /> IQ
        </h1>
      </div>

      {/* Badge */}
      <span className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">
        Administrative Console
      </span>

      {/* Main Heading */}
      <h2 className="text-5xl font-bold leading-tight mb-6">
        Control the <br /> ecosystem.
      </h2>
      <p className="text-blue-100 text-lg max-w-md mb-8">
        Manage users, track system performance, and oversee educational paths
        from one central hub.
      </p>

      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
              isActive(item.path)
                ? 'bg-white/20 text-white'
                : 'text-blue-100 hover:bg-white/10'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Admin Quick-Stats Card */}
      <div className="mt-8 bg-white rounded-2xl p-4 text-gray-800">
        <div className="flex justify-between items-center mb-4">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">
            System Overview
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-600">LIVE</span>
          </div>
        </div>

        {/* Metric 1: Active Users */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#001D66]">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#001D66]">1,284 Active Users</p>
            <p className="text-[10px] text-gray-500">+12% increase this week</p>
          </div>
        </div>

        {/* Metric 2: System Health */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">System Load: 24%</p>
            <p className="text-[10px] text-gray-500">Optimal performance</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;