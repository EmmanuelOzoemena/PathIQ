import React from "react";

const DefaultSidebar = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-8">
        PathIQ
      </h1>

      <span className="inline-block border border-white/30 rounded-full px-4 py-1 text-sm mb-6">
        Welcome
      </span>

      <h2 className="text-6xl font-bold leading-tight mb-6">
        Learning that <br /> adapts to you.
      </h2>

      <p className="text-blue-100 text-lg max-w-md mb-12">
        PathIQ builds personalised AI-powered study paths for students aged
        12-25 tailored to your goals, your pace, your exam.
      </p>

      {/* Stats Row */}
      <div className="flex gap-12 mb-12">
        <div>
          <p className="text-3xl font-bold">50k+</p>
          <p className="text-blue-200 text-sm">Students</p>
        </div>
        <div>
          <p className="text-3xl font-bold">94%</p>
          <p className="text-blue-200 text-sm">Pass Rate</p>
        </div>
        <div>
          <p className="text-3xl font-bold">200+</p>
          <p className="text-blue-200 text-sm">Subjects</p>
        </div>
      </div>

      {/* Progress Card Snippet */}
      <div className="bg-white rounded-xl p-6 text-gray-800 w-80 shadow-xl">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-4">
          Students learning now
        </p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-white bg-blue-900 flex items-center justify-center text-[10px] text-white font-bold"
              >
                {["TN", "KA", "EM", "JO"][i - 1]}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
              +2k
            </div>
          </div>
          <p className="text-[10px] text-gray-500 font-medium">
            Active right now
          </p>
        </div>
        <div className="w-full bg-blue-100 h-2 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full w-[78%]"></div>
        </div>
        <p className="text-[10px] mt-2 text-gray-400">
          78% of students hit their weekly goal
        </p>
      </div>
    </div>
  );
};

export default DefaultSidebar;
