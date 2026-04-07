import React from "react";
import { ShieldCheck, Activity, Users, Zap } from "lucide-react";

const AdminSidebar = () => {
  return (
    <div className="text-white">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 mb-8">
        {/* <ShieldCheck className="w-8 h-8 text-blue-200" /> */}
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
      <p className="text-blue-100 text-lg max-w-md mb-12">
        Manage users, track system performance, and oversee educational paths
        from one central hub. platform.
      </p>

      {/* Admin Quick-Stats Card */}
      <div className="bg-white rounded-2xl p-6 text-gray-800 w-80 shadow-2xl border border-blue-100">
        <div className="flex justify-between items-center mb-6">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">
            System Overview
          </p>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-600">LIVE</span>
          </div>
        </div>

        {/* Metric 1: Active Users */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#001D66]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#001D66]">
              1,284 Active Users
            </p>
            <p className="text-[10px] text-gray-500">+12% increase this week</p>
          </div>
        </div>

        {/* Metric 2: System Health */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-800">System Load: 24%</p>
            <p className="text-[10px] text-gray-500">Optimal performance</p>
          </div>
        </div>

        {/* Action Button for Sidebar */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-[11px] font-bold text-[#001D66] hover:underline cursor-pointer">
            <span>View Server Logs</span>
            <Zap className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
