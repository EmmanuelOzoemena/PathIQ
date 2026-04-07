import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const LoginFrequency = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Login Frequency</h3>
        <div className="p-2 bg-indigo-100 rounded-lg">
          <Calendar className="w-5 h-5 text-indigo-600" />
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-5xl font-bold text-indigo-600 mb-2">32</div>
        <p className="text-sm text-gray-500">Times</p>
      </div>

      {/* Weekly Login Chart (Simplified) */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
        <div className="flex items-center justify-between gap-1">
          {[5, 7, 4, 6, 8, 3, 2].map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-indigo-600 rounded-t-sm transition-all duration-300 hover:bg-indigo-700"
                style={{ height: `${value * 4}px`, minHeight: '4px' }}
              />
              <span className="text-[10px] text-gray-400 mt-1">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginFrequency;