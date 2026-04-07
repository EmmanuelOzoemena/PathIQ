import React, { useState } from 'react';

const DepartmentTabs = () => {
  const [activeTab, setActiveTab] = useState('Science');

  const departments = [
    'Science',
    'Commercial',
    'Art',
    'JAMB CLASS',
    'GCE'
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveTab(dept)}
            className={`px-6 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeTab === dept
                ? 'bg-indigo-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DepartmentTabs;