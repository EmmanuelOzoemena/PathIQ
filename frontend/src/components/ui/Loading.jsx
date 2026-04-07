import React from "react";

const Loading = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/70 backdrop-blur-[2px]">
      <div className="flex flex-col items-center gap-4">
        {/* Modern Spinning Circle */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#0A2684] rounded-full animate-spin"></div>
        <p className="text-[#0A2684] font-bold animate-pulse text-sm">Processing...</p>
      </div>
    </div>
  );
};

export default Loading;