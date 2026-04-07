import React from 'react';
import { User, Calendar, BookOpen } from 'lucide-react';

const ReportHeader = ({ student }) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://ui-avatars.com/api/?name=Grace+Mike&background=6366f1&color=fff&size=64"
            alt={student.name}
            className="w-16 h-16 rounded-full ring-4 ring-indigo-100"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <BookOpen className="w-4 h-4" />
                <span>Class: {student.class}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Term: {student.term}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Session: {student.session}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
            Report Generated
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;