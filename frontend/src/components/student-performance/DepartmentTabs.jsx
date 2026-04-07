import React from 'react';

const DepartmentTabs = ({ selected, onSelect }) => {
  const departments = [
    'Science',
    'Commercial',
    'Art',
    'JAMB CLASS',
    'GCE'
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {departments.map((dept) => (
        <button
          key={dept}
          onClick={() => onSelect(dept)}
          className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
            selected === dept
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {dept}
        </button>
      ))}
    </div>
  );
};

export default DepartmentTabs;