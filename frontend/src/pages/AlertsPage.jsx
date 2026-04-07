import React from 'react';
import Layout from '../components/layout/Layout';
import AlertsAndRecommendations from '../components/alerts/AlertsAndRecommendations';

const AlertsPage = () => {
  return (
    <Layout activeItem="alerts">
      <div className="px-0 sm:px-0">
        <AlertsAndRecommendations />
      </div>
    </Layout>
  );
};

export default AlertsPage;