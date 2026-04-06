import React from "react";
import { HiOutlineChevronRight, HiOutlineBookOpen } from "react-icons/hi";

const SubjectCard = ({ title, progress, iconBg }) => {
  return (
    <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group h-full">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div
          className={`w-10 h-10 rounded-xl ${iconBg} flex-shrink-0 flex items-center justify-center text-blue-700`}
        >
          <HiOutlineBookOpen className="text-xl" />
        </div>
        <div className="flex-1 min-w-0">
          {" "}
          {/* Added min-w-0 */}
          <div className="flex justify-between items-center mb-2 gap-2">
            <h4 className="text-sm font-bold text-[#0A2684] truncate">
              {title}
            </h4>
            <HiOutlineChevronRight className="text-gray-300 group-hover:text-blue-600 transition-colors flex-shrink-0" />
          </div>
          {/* Progress Bar Container */}
          <div className="flex items-center gap-3">
            <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="bg-blue-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubjectCard;
