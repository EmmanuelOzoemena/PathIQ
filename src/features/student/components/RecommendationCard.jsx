import React from 'react';

const RecommendationCard = ({ 
  image, 
  subject, 
  title, 
  badgeText, 
  badgeVariant, 
  buttonText, 
  onClick 
}) => {
  // Define badge styles based on variant
  const badgeStyles = {
    danger: "bg-red-50 text-red-500",
    info: "bg-indigo-50 text-indigo-500",
  };

  return (
    <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex gap-4">
      {/* Image Section */}
      <img
        className="w-26 h-16 object-cover rounded-lg flex-shrink-0"
        src={image}
        alt={`${title}-thumbnail`}
      />

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              {subject}
            </p>
            <button className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
              •••
            </button>
          </div>
          <h4 className="text-sm font-bold text-[#0A2684] mt-0.5 leading-tight">
            {title}
          </h4>
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-2 mt-3">
          <span className={`text-[9px] px-3 py-1.5 rounded font-bold whitespace-nowrap ${badgeStyles[badgeVariant]}`}>
            {badgeText}
          </span>
          <button 
            onClick={onClick}
            className="text-[10px] bg-[#0A2684] text-white px-4 py-1.5 rounded-md font-bold cursor-pointer hover:bg-blue-900 transition-all active:scale-95 whitespace-nowrap"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;