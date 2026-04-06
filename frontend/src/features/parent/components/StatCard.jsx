export const StatCard = ({ title, value, sub, icon }) => (
  <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm">
    <p className="text-[10px] text-gray-400 font-bold uppercase mb-4">
      {title}
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#0A2684] rounded-lg flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-[#0A2684]">{value}</h4>
        <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
      </div>
    </div>
  </div>
);
