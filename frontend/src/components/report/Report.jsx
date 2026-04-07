import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import ReportHeader from './ReportHeader';
import ReportTable from './ReportTable';
import ReportSummary from './ReportSummary';
import TeacherNote from './TeacherNote';

const Report = () => {
  const reportData = {
    student: {
      name: 'Grace Mike',
      class: 'SS-2',
      term: '1st Term',
      session: '2023/2024'
    },
    subjects: [
      { name: 'Mathematics', attendance: 10, quiz: 25, exam: 0, total: 35, status: 'F' },
      { name: 'English Language', attendance: 15, quiz: 24, exam: 0, total: 39, status: 'F' },
      { name: 'Biology', attendance: 8, quiz: 20, exam: 0, total: 28, status: 'F' },
      { name: 'Economics', attendance: 7, quiz: 19, exam: 0, total: 26, status: 'F' },
      { name: 'Civic Education', attendance: 6, quiz: 28, exam: 0, total: 81, status: 'A' },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Report</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Printer className="w-4 h-4" />
            <span className="text-sm font-medium">Print</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Download PDF</span>
          </button>
        </div>
      </div>

      {/* Report Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Report Header with Student Info */}
        <ReportHeader student={reportData.student} />

        {/* Report Table */}
        <ReportTable subjects={reportData.subjects} />

        {/* Report Footer with Summary and Teacher's Note */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          <div className="lg:col-span-2">
            <TeacherNote />
          </div>
          <div className="lg:col-span-1">
            <ReportSummary subjects={reportData.subjects} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;