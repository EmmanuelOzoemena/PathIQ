import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const WeakestSubjectCard = ({ subject }) => {
  return (
    /* Added h-full to ensure cards in the same row stay equal height */
    <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center justify-between h-full min-h-[140px]">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mb-2">
        Weakest Subject
      </p>

      <div className="flex flex-col items-center gap-1 mb-3">
        <HiOutlineExclamationCircle className="text-red-500 text-xl md:text-2xl" />
        {/* Added truncate to prevent long subject names from breaking the card UI */}
        <h4 className="text-base md:text-lg font-bold text-gray-800 truncate w-full px-2">
          {subject}
        </h4>
      </div>

      <button className="w-full py-2 bg-[#0A2684] text-white text-[10px] font-bold rounded-md hover:bg-blue-900 transition-colors cursor-pointer active:scale-95">
        Improve
      </button>
    </div>
  );
};

export default WeakestSubjectCard;