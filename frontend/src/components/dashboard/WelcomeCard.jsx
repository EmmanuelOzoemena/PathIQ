// src/components/dashboard/WelcomeCard.jsx
import { useEffect, useState } from "react";
import { Plus, ChevronRight } from "lucide-react";

const WelcomeCard = ({ onJoinClick }) => {
  const [user, setUser] = useState(null);

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

  // Get user's first name or fallback
  const getDisplayName = () => {
    if (!user) return "Student";
    return user.name?.split(' ')[0] || user.name || "Student";
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        {/* Left side - Greeting */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 break-words">
            Hello {getDisplayName()}! 👋
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base md:text-lg">
            Ready to continue learning?
          </p>
        </div>
        
        {/* Right side - Join Button */}
        <button 
          onClick={onJoinClick}
          className="w-full sm:w-auto mt-3 lg:mt-0 inline-flex items-center justify-center gap-2 bg-white text-indigo-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-indigo-50 active:bg-indigo-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Join A Course</span>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:inline-block" />
        </button>
      </div>
      
      {/* Optional: Progress indicator for mobile */}
      <div className="mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-indigo-100">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>Ready to learn</span>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button 
            onClick={onJoinClick}
            className="hover:text-white transition-colors"
          >
            Find courses →
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;