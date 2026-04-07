import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import Report from '../components/report/Report';

const ReportPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeItem="report" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-7xl mx-auto">
            <Report />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportPage;