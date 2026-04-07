import React from 'react';

const LevelTabs = ({ selected, onSelect }) => {
  const levels = ['SS-1', 'SS-2', 'SS-3'];

  return (
    <div className="flex gap-2">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-colors ${
            selected === level
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {level}
        </button>
      ))}
    </div>
  );
};

export default LevelTabs;