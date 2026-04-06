export const ProgressBar = () => (
  <div className="flex items-center gap-3">
    <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="bg-blue-400 h-full rounded-full transition-all duration-500"
        style={{ width: "65%" }}
      ></div>
    </div>
  </div>
);
