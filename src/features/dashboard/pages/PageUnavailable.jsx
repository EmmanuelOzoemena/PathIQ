import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layouts/DashboardLayout';
import { HiOutlineWrench } from 'react-icons/hi2';
import { Button } from '../../../components/ui/Button';

const PageUnavailable = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-8 text-center">
        {/* Icon Container */}
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <HiOutlineWrench className="text-4xl text-[#0A2684] animate-bounce" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#0A2684] mb-2">
          Under Construction
        </h1>
        <p className="text-gray-500 max-w-md mb-8">
          We're working hard to bring this feature to life. Check back soon for updates on your personalized learning experience!
        </p>

        <div className="flex gap-4">
          <Button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#0A2684] px-8 py-3"
          >
            Back to Dashboard
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate(-1)} // Goes to previous page
            className="px-8 py-3"
          >
            Go Back
          </Button>
        </div>

        {/* Decorative element */}
        <div className="mt-12 opacity-20 grayscale">
            {/* You can put a small Path IQ logo or watermark here */}
            <p className="text-xs font-bold tracking-widest uppercase">Path IQ Beta v1.0</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PageUnavailable;