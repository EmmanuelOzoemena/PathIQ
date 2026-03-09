import React from "react";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
