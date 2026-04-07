import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import CourseGrid from '../components/dashboard/CourseGrid';
import Assessment from '../components/learning-path/Assessment';
import Progress from '../components/learning-path/Progress';
import Planner from '../components/learning-path/Planner';
import Reward from '../components/learning-path/Reward';
import Forum from '../components/learning-path/Forum';
import Settings from '../components/learning-path/Settings';

const LearningPath = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('dashboard');

  useEffect(() => {
    // const path = location.pathname;
    
    // if (path === '/') {
    //   setActiveSection('dashboard');
    // } else if (path === '/learning-path') {
    //   setActiveSection('learning-path');
    // } else if (path.includes('/learning-path/')) {
    //   const section = path.split('/').pop();
    //   setActiveSection(section);
    // }
  }, [location]);

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <>
            <WelcomeCard />
            <div className="mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Your Courses</h2>
              <CourseGrid />
            </div>
          </>
        );
      case 'assessment':
        return <Assessment />;
      case 'progress':
        return <Progress />;
      case 'planner':
        return <Planner />;
      case 'reward':
        return <Reward />;
      case 'forum':
        return <Forum />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <>
            <WelcomeCard />
            <div className="mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Your Courses</h2>
              <CourseGrid />
            </div>
          </>
        );
    }
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <Layout 
      activeItem={activeSection === 'dashboard' ? 'dashboard' : 'learning-path'}
      activeSubItem={activeSection !== 'dashboard' && activeSection !== 'learning-path' ? activeSection : null}
      onNavigate={handleNavigation}
    >
      {renderContent()}
    </Layout>
  );
};

export default LearningPath;