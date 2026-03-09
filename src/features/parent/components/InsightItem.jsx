export const InsightItem = ({ icon, text }) => (
  <div className="flex gap-3 items-start">
    <div className="mt-1">{icon}</div>
    <p className="text-xs text-gray-600 font-medium leading-relaxed">{text}</p>
  </div>
);
