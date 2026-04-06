import React from "react";

const RoleCard = ({ title, description, iconColor, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all mb-4
        ${selected ? "border-[#0035B9] bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}
      `}
    >
      {/* Icon Placeholder */}
      <div
        className={`w-12 h-12 rounded-lg ${iconColor} mr-4 flex-shrink-0`}
      ></div>

      <div className="flex-grow">
        <h3 className="font-bold text-[#001D66]">{title}</h3>
        <p className="text-xs text-gray-500 leading-tight">{description}</p>
      </div>

      {/* Custom Radio Circle */}
      <div
        className={`
        w-5 h-5 rounded-full border-2 flex items-center justify-center
        ${selected ? "border-[#0035B9]" : "border-gray-300"}
      `}
      >
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full green"></div>
        )}
      </div>
    </div>
  );
};

export default RoleCard;
