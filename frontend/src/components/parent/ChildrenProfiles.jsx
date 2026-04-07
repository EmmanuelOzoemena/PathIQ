import React from 'react';
import ChildCard from './ChildCard';

const ChildrenProfiles = () => {
  const children = [
    {
      id: 1,
      name: 'Alex Doe',
      grade: 'Grade 4',
      progress: 50,
      avatar: 'https://ui-avatars.com/api/?name=Alex+Doe&background=3B82F6&color=fff&size=60'
    },
    {
      id: 2,
      name: 'Emily Doe',
      grade: 'Grade 5',
      progress: 60,
      avatar: 'https://ui-avatars.com/api/?name=Emily+Doe&background=8B5CF6&color=fff&size=60'
    },
    {
      id: 3,
      name: 'Sarah Doe',
      grade: 'Grade 6',
      progress: 70,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Doe&background=EC4899&color=fff&size=60'
    },
    {
      id: 4,
      name: 'Sarah Doe',
      grade: 'Grade 6',
      progress: 30,
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Doe&background=F59E0B&color=fff&size=60'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Children Profiles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child) => (
          <ChildCard key={child.id} child={child} />
        ))}
      </div>
    </div>
  );
};

export default ChildrenProfiles;