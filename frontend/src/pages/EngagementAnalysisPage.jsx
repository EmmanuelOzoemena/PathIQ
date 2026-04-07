import React from 'react';
import Layout from '../components/layout/Layout';
import EngagementAnalysis from '../components/engagement-analysis/EngagementAnalysis';

const EngagementAnalysisPage = () => {
  return (
    <Layout activeItem="engagement-analysis">
      <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <EngagementAnalysis />
        </div>
      </div>
    </Layout>
  );
};

export default EngagementAnalysisPage;