export const ActivityRow = ({ icon, text, time }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-default">
    <div className="flex items-center gap-3">
      <span className="text-lg">{icon}</span>
      <p className="text-xs font-medium text-gray-600">{text}</p>
    </div>
    <span className="text-[10px] text-gray-400 whitespace-nowrap">{time}</span>
  </div>
);
