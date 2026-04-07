import React from 'react';
import Layout from '../components/layout/Layout';
import ParentHeader from '../components/parent/ParentHeader';
import OverallStats from '../components/parent/OverallStats';
import ChildrenProfiles from '../components/parent/ChildrenProfiles';

const ParentProfile = () => {
  return (
    <Layout activeItem="parent-profile">
      <div className="space-y-4 sm:space-y-6">
        <ParentHeader />
        <OverallStats />
        <ChildrenProfiles />
      </div>
    </Layout>
  );
};

export default ParentProfile;