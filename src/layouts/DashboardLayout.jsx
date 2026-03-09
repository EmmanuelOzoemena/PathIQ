import React from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#FDFDFF]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
