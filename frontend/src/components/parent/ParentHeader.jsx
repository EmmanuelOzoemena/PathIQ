import { useEffect, useState } from "react";
import { Users, Clock, User } from "lucide-react";

const ParentHeader = () => {
  const [user, setUser] = useState(null);

  // Get user's first name or fallback
  const getDisplayName = () => {
    if (!user) return "Parent";
    return user.name || "Parent";
  };

  // Generate Avatar URL based on user name
  const getAvatarUrl = () => {
    const nameParam = user?.name ? encodeURIComponent(user.name) : "User";
    return `https://ui-avatars.com/api/?name=${nameParam}&background=6366f1&color=fff&size=128&bold=true`;
  };

  useEffect(() => {
    const savedData = localStorage.getItem("user_data");

    if (savedData && savedData !== "undefined") {
      try {
        const parsedUser = JSON.parse(savedData);
        setUser(parsedUser);
      } catch (error) {
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          {/* Dynamic Profile Image */}
          <img
            src={getAvatarUrl()}
            alt={user?.name || "User Profile"}
            className="w-16 h-16 rounded-full ring-4 ring-indigo-100 object-cover transition-opacity duration-300"
          />

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {getDisplayName()}
            </h1>
            <p className="text-gray-500">Parent Dashboard</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <div className="flex items-center gap-3 bg-indigo-50 rounded-xl px-4 py-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">No Of Child</p>
              <p className="text-xl font-bold text-gray-900">3</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-green-50 rounded-xl px-4 py-2">
            <Clock className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Last Login</p>
              <p className="text-xl font-bold text-gray-900">3 hours Ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentHeader;
