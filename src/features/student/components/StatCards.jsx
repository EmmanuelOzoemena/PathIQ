import React from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
// import { Button } from '../../../components/ui/Button';

const WeakestSubjectCard = ({ subject }) => {
  return (
    <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center justify-between">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mb-2">
        Weakest Subject
      </p>

      <div className="flex flex-col items-center gap-1 mb-3">
        <HiOutlineExclamationCircle className="text-red-500 text-2xl" />
        <h4 className="text-lg font-bold text-gray-800">{subject}</h4>
      </div>

      <button className="w-full py-1.5 bg-[#0A2684] text-white text-[10px] font-bold rounded-md hover:bg-blue-900 transition-colors  cursor-pointer">
        Improve
      </button>
    </div>
  );
};

export default WeakestSubjectCard;
