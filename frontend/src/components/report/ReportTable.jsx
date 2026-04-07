import React from 'react';

const ReportTable = ({ subjects }) => {
  const getStatusColor = (total) => {
    if (total >= 70) return 'text-green-600 bg-green-100';
    if (total >= 50) return 'text-blue-600 bg-blue-100';
    if (total >= 40) return 'text-amber-600 bg-amber-100';
    return 'text-rose-600 bg-rose-100';
  };

  const getGrade = (total) => {
    if (total >= 70) return 'A';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    if (total >= 40) return 'D';
    return 'F';
  };

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Academic Performance</h3>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Subject</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Attendance (20)</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Quiz (50)</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Exam (50)</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Total (100)</th>
              <th className="text-center py-3 px-4 text-sm font-medium text-gray-500">Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">{subject.name}</td>
                <td className="py-3 px-4 text-center text-gray-700">{subject.attendance}</td>
                <td className="py-3 px-4 text-center text-gray-700">{subject.quiz}</td>
                <td className="py-3 px-4 text-center text-gray-700">{subject.exam}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`font-semibold ${subject.total >= 50 ? 'text-green-600' : 'text-rose-600'}`}>
                    {subject.total}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subject.total)}`}>
                    {getGrade(subject.total)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">{subject.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subject.total)}`}>
                {getGrade(subject.total)}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Attendance</p>
                <p className="font-medium text-gray-900">{subject.attendance}/20</p>
              </div>
              <div>
                <p className="text-gray-500">Quiz</p>
                <p className="font-medium text-gray-900">{subject.quiz}/50</p>
              </div>
              <div>
                <p className="text-gray-500">Exam</p>
                <p className="font-medium text-gray-900">{subject.exam}/50</p>
              </div>
              <div>
                <p className="text-gray-500">Total</p>
                <p className={`font-bold ${subject.total >= 50 ? 'text-green-600' : 'text-rose-600'}`}>
                  {subject.total}/100
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportTable;