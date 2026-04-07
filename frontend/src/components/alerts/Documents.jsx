import React from 'react';
import { FileText, Download, Calendar, ChevronRight } from 'lucide-react';

const Documents = () => {
  const documents = [
    {
      name: 'Class A Test Semester Result',
      date: '02 Mar, 09:20 AM',
      type: 'result',
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      name: 'Test Questions',
      date: '25 Feb, 04:20 PM',
      type: 'questions',
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      name: 'Class E attendance sheet',
      date: '24 Feb, 08:20 AM',
      type: 'attendance',
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          See all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${doc.bg} rounded-lg`}>
                <FileText className={`w-4 h-4 ${doc.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">{doc.name}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  {doc.date}
                </div>
              </div>
            </div>
            <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick Upload */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
          + Upload new document
        </button>
      </div>
    </div>
  );
};

export default Documents;