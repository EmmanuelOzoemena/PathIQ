export const MiniSubjectProgress = ({ title, progress, color }) => (
  <div className="bg-white p-4 border border-gray-100 rounded-xl">
    <div className="flex justify-between items-center mb-2">
        
      <span className="text-xs font-bold text-gray-700">{title}</span>
      <span className="text-[10px] text-gray-400 font-bold">{progress}%</span>
    </div>
    <div className="w-full bg-gray-50 h-1.5 rounded-full overflow-hidden">
      <div
        className={`${color} h-full rounded-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);
