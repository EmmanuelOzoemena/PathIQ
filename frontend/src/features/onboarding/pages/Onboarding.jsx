import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  HiChevronRight,
  HiLightningBolt,
  HiChartBar,
  HiAcademicCap,
} from "react-icons/hi";

const onboardingSteps = [
  {
    title: "Precision Pathfinding",
    subtitle:
      "PathIQ analyzes your strengths to map out the perfect academic journey tailored just for you.",
    accent: "from-blue-600 to-cyan-500",
    icon: <HiLightningBolt />,
    tag: "Intelligence",
  },
  {
    title: "Guardian Insights",
    subtitle:
      "Real-time data for parents. Track every milestone and stay ahead of the curve with deep analytics.",
    accent: "from-indigo-600 to-purple-500",
    icon: <HiChartBar />,
    tag: "Analytics",
  },
  {
    title: "Future-Ready Skills",
    subtitle:
      "From core subjects to advanced concepts, we bridge the gap between classroom and career.",
    accent: "from-blue-800 to-blue-600",
    icon: <HiAcademicCap />,
    tag: "Excellence",
  },
];

const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => {
    if (current < onboardingSteps.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem("pathiq_onboarded", "true");
      navigate("/select-role");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex overflow-hidden font-sans">
      {/* --- SIDEBAR (The "Path" Indicator) --- */}
      <div className="hidden lg:flex w-[350px] bg-[#001D66] p-12 flex-col justify-between relative">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/30">
              P
            </div>
            <span className="text-white text-2xl font-black tracking-tighter">
              Path<span className="text-blue-400">IQ</span>
            </span>
          </div>

          <div className="space-y-12 relative">
            {/* The actual vertical "Path" line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-blue-900/50" />

            {onboardingSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-6 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    idx === current
                      ? "bg-blue-500 border-blue-500 scale-125 shadow-lg shadow-blue-500/40"
                      : "bg-[#001D66] border-blue-900"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${idx === current ? "bg-white" : "bg-blue-900"}`}
                  />
                </div>
                <div className="pt-1">
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.2em] mb-1 ${idx === current ? "text-blue-400" : "text-blue-900/60"}`}
                  >
                    Phase 0{idx + 1}
                  </p>
                  <p
                    className={`text-sm font-semibold transition-colors ${idx === current ? "text-white" : "text-white/30"}`}
                  >
                    {step.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/40 text-[10px] uppercase tracking-widest font-bold">
          PathIQ Protocol v1.0.4
        </div>
      </div>

      {/* --- CONTENT ENGINE --- */}
      <div className="flex-1 flex flex-col relative bg-white">
        <main className="flex-1 flex flex-col items-start justify-center px-8 lg:px-32 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-blue-700 text-xs font-black uppercase tracking-widest mb-12 border border-gray-100`}
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                {onboardingSteps[current].tag} Module
              </div>

              <h2 className="text-6xl lg:text-7xl font-black text-[#001D66] leading-[1.1] mb-8 tracking-tight">
                {onboardingSteps[current].title}
              </h2>

              <p className="text-2xl text-gray-400 font-medium leading-relaxed max-w-xl mb-12">
                {onboardingSteps[current].subtitle}
              </p>

              <div
                className={`w-20 h-2 bg-gradient-to-r ${onboardingSteps[current].accent} rounded-full mb-20`}
              />
            </motion.div>
          </AnimatePresence>

          <div className="w-full flex items-center justify-between pt-10 border-t border-gray-100">
            <button
              onClick={() => navigate("/select-role")}
              className="text-[#001D66] font-bold text-sm hover:underline"
            >
              Skip Introduction
            </button>

            <button
              onClick={next}
              className="group flex items-center gap-4 bg-[#001D66] text-white pl-10 pr-4 py-4 rounded-full font-bold text-lg hover:bg-blue-800 transition-all shadow-2xl shadow-blue-900/30"
            >
              {current === onboardingSteps.length - 1
                ? "Initialize PathIQ"
                : "Analyze Next Phase"}
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform">
                <HiChevronRight className="text-2xl" />
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Onboarding;
