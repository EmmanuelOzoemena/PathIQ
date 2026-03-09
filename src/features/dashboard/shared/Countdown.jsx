import { HiOutlineCalendar } from "react-icons/hi";

export const Countdown = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    <div className="flex justify-between mb-4">
      <p className="text-xs font-bold text-gray-800 uppercase">
        JAMB Countdown
      </p>
      <HiOutlineCalendar className="text-gray-400" />
    </div>
    <div className="bg-[#0A2684] text-white p-4 rounded-xl text-center">
      <p className="text-4xl font-bold">45</p>
      <p className="text-[10px] font-bold uppercase tracking-widest mt-1">
        Days Left
      </p>
    </div>
    <p className="text-[10px] text-center text-gray-400 mt-4 font-medium uppercase tracking-wider">
      Exam: 14 April, 2026
    </p>
  </div>
);
