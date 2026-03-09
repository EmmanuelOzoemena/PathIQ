import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import {
  HiOutlineChevronRight,
  HiOutlineBookOpen,
  HiOutlineCalendar,
} from "react-icons/hi";
import { Button } from "../../../components/ui/Button";
import WeakestSubjectCard from "../components/StatCards";
import SubjectCard from "../components/SubjectCard";
import rocket from "../../../assets/rocket.png";
import maths from "../../../assets/maths.jpg";
import physics from "../../../assets/physics.jpg";
import english from "../../../assets/english.jpg";
import RecommendationCard from "../components/RecommendationCard";

const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="grid grid-cols-1 lg:flex lg:gap-8 p-4 md:p-6 lg:p-8">
          {/* MAIN CONTENT AREA */}
          <div className="w-full lg:flex-[2] space-y-8 order-1">
            {/* Welcome Section */}
            <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 lg:gap-0">
              {/* Greeting Section */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A2684] flex items-center gap-2">
                  Good Morning, Tasha{" "}
                  <svg
                    width="34"
                    height="36"
                    viewBox="0 0 34 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.6644 16.7642C26.7269 16.858 26.8832 16.7955 26.8832 16.7017C27.0707 15.0142 27.5707 10.358 30.8832 9.35796C31.9457 9.04546 33.0082 9.79546 33.1332 10.7642C33.3519 12.3267 31.5707 16.358 31.7269 20.0455C31.7582 20.6392 32.7582 26.9205 30.1019 30.6392C27.4457 34.358 21.1332 38.1392 14.8519 32.3892C11.6019 29.4205 11.6019 28.233 7.57067 24.0767C6.75817 23.2642 3.50817 19.7017 2.63317 18.608C1.47692 17.1392 3.32067 15.2017 4.72692 16.2017C5.38317 16.6705 11.1957 21.5455 11.4144 21.7642C11.8519 22.1392 12.3832 21.608 12.0707 21.233C8.50817 16.5455 5.07067 12.3267 4.13317 10.7017C3.19567 9.07671 5.44567 7.32671 6.75817 8.73296C7.66442 9.67046 14.3832 17.5142 14.6957 17.858C15.0082 18.2017 15.5394 17.7642 15.3519 17.3267C15.1332 16.9205 9.69567 7.45171 8.72692 5.29546C7.88317 3.38921 10.6957 1.60796 12.0082 3.57671C13.0707 5.13921 19.0082 15.0142 19.2269 15.358C19.5082 15.858 20.1332 15.5455 19.8832 14.983C19.6957 14.5767 16.0394 4.57671 15.7582 3.54546C15.2582 1.73296 17.8519 0.232965 19.0707 2.29546C20.7269 5.13921 24.0082 13.8267 26.6644 16.7642Z"
                      fill="#0A2777"
                    />
                    <mask
                      id="mask0_68_186"
                      // style="mask-type:luminance"
                      maskUnits="userSpaceOnUse"
                      x="2"
                      y="1"
                      width="32"
                      height="35"
                    >
                      <path
                        d="M26.6644 16.7642C26.7269 16.858 26.8832 16.7955 26.8832 16.7017C27.0707 15.0142 27.5707 10.358 30.8832 9.35796C31.9457 9.04546 33.0082 9.79546 33.1332 10.7642C33.3519 12.3267 31.5707 16.358 31.7269 20.0455C31.7582 20.6392 32.7582 26.9205 30.1019 30.6392C27.4457 34.358 21.1332 38.1392 14.8519 32.3892C11.6019 29.4205 11.6019 28.233 7.57067 24.0767C6.75817 23.2642 3.50817 19.7017 2.63317 18.608C1.47692 17.1392 3.32067 15.2017 4.72692 16.2017C5.38317 16.6705 11.1957 21.5455 11.4144 21.7642C11.8519 22.1392 12.3832 21.608 12.0707 21.233C8.50817 16.5455 5.07067 12.3267 4.13317 10.7017C3.19567 9.07671 5.44567 7.32671 6.75817 8.73296C7.66442 9.67046 14.3832 17.5142 14.6957 17.858C15.0082 18.2017 15.5394 17.7642 15.3519 17.3267C15.1332 16.9205 9.69567 7.45171 8.72692 5.29546C7.88317 3.38921 10.6957 1.60796 12.0082 3.57671C13.0707 5.13921 19.0082 15.0142 19.2269 15.358C19.5082 15.858 20.1332 15.5455 19.8832 14.983C19.6957 14.5767 16.0394 4.57671 15.7582 3.54546C15.2582 1.73296 17.8519 0.232965 19.0707 2.29546C20.7269 5.13921 24.0082 13.8267 26.6644 16.7642Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_68_186)">
                      <path
                        d="M26.0082 16.8267C22.1332 19.983 20.4145 24.483 23.602 29.1705C23.8832 29.5767 24.477 29.2017 24.227 28.733C22.9145 26.3892 21.9457 22.1705 26.477 17.7642C27.0082 18.0142 27.6332 17.483 27.6645 17.0142C28.0082 14.0767 28.352 11.6392 30.5395 10.2642C31.3832 9.73297 32.477 10.108 32.5395 11.3892C32.5395 11.3892 33.227 11.4517 33.5082 11.483C33.6645 10.8267 33.977 9.63921 33.977 9.60796C33.977 9.57671 30.2895 8.20171 30.2895 8.20171L27.0707 11.3892L26.0082 16.8267ZM19.7582 15.5455C20.1957 15.3267 20.5707 14.983 20.3832 14.5142C20.1957 14.0142 16.727 4.57672 16.5082 3.85797C16.0707 2.54547 17.1645 1.51422 18.1332 1.95172C18.6645 2.20172 18.9145 1.35797 18.6332 1.23297C18.352 1.10797 17.6958 0.514215 16.3833 1.17047C14.0395 2.35797 15.4145 4.98297 16.0395 6.51422C16.6645 8.04547 19.7582 15.5455 19.7582 15.5455ZM15.227 17.8892C15.7583 17.5142 16.1645 17.2017 15.6958 16.4517C15.3833 15.9517 10.102 6.35797 9.57075 5.42047C8.7895 4.07672 10.4145 2.88921 11.3208 3.73296C11.727 4.10796 12.352 3.29547 12.0395 2.98297C11.727 2.67047 10.6332 1.76422 9.25825 2.67047C7.88325 3.57672 7.852 4.67046 8.0395 5.13921C8.19575 5.60796 15.227 17.8892 15.227 17.8892ZM12.102 21.733C12.477 21.1705 12.727 20.8892 12.1957 20.1705C11.6645 19.4517 5.352 11.2017 5.00825 10.733C4.13325 9.57672 5.4145 8.57672 6.0395 8.92047C6.63325 9.26422 6.977 8.29546 6.477 8.04546C5.977 7.79546 5.1645 7.51421 4.4145 8.04546C3.6645 8.57671 3.227 9.67046 3.352 10.2955C3.44575 10.9205 12.102 21.733 12.102 21.733Z"
                        fill="#0A2777"
                      />
                      <path
                        d="M26.5082 33.5142C21.4457 35.9205 17.6645 34.0455 15.227 31.6705C12.4457 28.9517 11.1332 26.4517 9.28949 24.7642C8.66449 24.1705 3.72699 18.9205 3.13324 18.0142C2.66449 17.2642 3.60199 15.983 4.63324 16.7017C5.28949 17.1392 5.60199 16.2017 5.16449 15.9517C4.72699 15.7017 3.75824 15.1705 2.72699 15.9517C1.69574 16.7017 1.66449 18.0455 1.91449 18.483C2.16449 18.9205 17.352 36.358 17.352 36.358L23.5395 36.2017L26.852 34.1705L26.5082 33.5142Z"
                        fill="#0A2777"
                      />
                    </g>
                    <mask
                      id="mask1_68_186"
                      // style="mask-type:luminance"
                      maskUnits="userSpaceOnUse"
                      x="2"
                      y="1"
                      width="32"
                      height="35"
                    >
                      <path
                        d="M26.6644 16.7642C26.7269 16.858 26.8832 16.7955 26.8832 16.7017C27.0707 15.0142 27.5707 10.358 30.8832 9.35796C31.9457 9.04546 33.0082 9.79546 33.1332 10.7642C33.3519 12.3267 31.5707 16.358 31.7269 20.0455C31.7582 20.6392 32.7582 26.9205 30.1019 30.6392C27.4457 34.358 21.1332 38.1392 14.8519 32.3892C11.6019 29.4205 11.6019 28.233 7.57067 24.0767C6.75817 23.2642 3.50817 19.7017 2.63317 18.608C1.47692 17.1392 3.32067 15.2017 4.72692 16.2017C5.38317 16.6705 11.1957 21.5455 11.4144 21.7642C11.8519 22.1392 12.3832 21.608 12.0707 21.233C8.50817 16.5455 5.07067 12.3267 4.13317 10.7017C3.19567 9.07671 5.44567 7.32671 6.75817 8.73296C7.66442 9.67046 14.3832 17.5142 14.6957 17.858C15.0082 18.2017 15.5394 17.7642 15.3519 17.3267C15.1332 16.9205 9.69567 7.45171 8.72692 5.29546C7.88317 3.38921 10.6957 1.60796 12.0082 3.57671C13.0707 5.13921 19.0082 15.0142 19.2269 15.358C19.5082 15.858 20.1332 15.5455 19.8832 14.983C19.6957 14.5767 16.0394 4.57671 15.7582 3.54546C15.2582 1.73296 17.8519 0.232965 19.0707 2.29546C20.7269 5.13921 24.0082 13.8267 26.6644 16.7642Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask1_68_186)">
                      <path
                        d="M32.3519 9.26421C32.5081 9.67046 32.6956 10.3892 32.5081 11.358C31.7894 14.983 30.6019 17.108 30.9769 21.0142C31.6644 28.5142 29.0394 34.2017 20.0081 35.3267C19.1019 35.4517 19.3519 36.1392 19.8206 36.0767C20.0394 36.0455 26.4769 34.8892 26.4769 34.8892C26.4769 34.8892 32.4457 29.7955 32.4457 29.733C32.4457 29.6705 33.9456 10.233 33.9456 10.233L32.3519 9.26421ZM16.7269 1.29546C17.1331 1.35796 18.0081 1.70171 18.6331 2.92046C19.2581 4.13921 22.3206 11.1705 22.7269 11.9205C23.1331 12.6705 24.7894 16.3892 26.1331 17.5142C26.5706 17.858 26.7894 17.2642 26.7894 17.2642L26.8207 16.2955L19.5706 -0.204535L17.1644 -0.110785L16.7269 1.29546ZM19.7581 15.5455C19.1644 15.8267 18.7269 16.0767 18.2894 15.3892C18.0081 14.8892 14.9769 9.70171 11.1644 3.63921C10.8519 3.17046 10.1331 2.76421 9.57065 2.98296C9.00815 3.23296 8.88315 2.51421 9.1644 2.35796C9.44565 2.20171 11.1956 1.23296 12.3831 3.23296C13.5706 5.23296 19.7581 15.5455 19.7581 15.5455ZM15.2269 17.8892C14.7581 18.233 14.2894 18.6705 13.6956 17.9517C13.1331 17.2642 6.7269 9.63921 6.3519 9.17046C5.9769 8.70171 5.19565 8.29546 4.6019 8.67046C4.19565 8.92046 3.82065 8.17046 4.07065 7.98296C4.32065 7.79546 5.7269 6.54546 6.6644 7.60796C7.6019 8.67046 15.2269 17.8892 15.2269 17.8892ZM12.1019 21.733C11.6956 22.1705 11.2581 22.4205 10.6644 21.983C10.0706 21.5455 4.75815 17.0767 4.4144 16.7642C4.07065 16.4517 3.07065 15.983 2.32065 16.733C2.0394 17.0142 1.5394 16.5455 1.82065 16.2642C2.1019 15.9517 3.63315 14.3892 4.8519 15.4205C6.07065 16.4517 12.1019 21.733 12.1019 21.733Z"
                        fill="#0A2777"
                      />
                    </g>
                    <path
                      d="M0.820578 23.4205C1.78933 26.2955 3.25808 28.0767 5.66433 29.7017C6.10183 30.0142 5.85183 30.6392 5.35183 30.4205C3.10183 29.5142 0.601828 27.5142 0.00807835 23.5455C-0.0856717 23.0142 0.664328 22.9205 0.820578 23.4205ZM2.69558 21.7017C3.66433 24.5767 5.13308 26.358 7.53933 27.983C7.97683 28.2955 7.72683 28.9205 7.22683 28.7017C4.97683 27.7955 2.47683 25.7955 1.88308 21.8267C1.82058 21.2955 2.53933 21.2017 2.69558 21.7017ZM26.7268 8.82671C25.9768 5.88921 24.6018 4.01421 22.3206 2.26421C21.8831 1.95171 22.1956 1.32671 22.6956 1.54546C24.8831 2.57671 27.2581 4.76421 27.5706 8.76422C27.6018 9.29547 26.8518 9.35796 26.7268 8.82671ZM28.7581 7.32671C28.0081 4.38921 26.6331 2.51421 24.3518 0.764215C23.9143 0.451715 24.2268 -0.173285 24.7268 0.0454646C26.9143 1.07671 29.2893 3.26421 29.6018 7.26421C29.6331 7.76421 28.9143 7.82671 28.7581 7.32671Z"
                      fill="#0A2777"
                    />
                  </svg>
                </h2>
                <p className="text-gray-400 font-medium text-sm md:text-base mt-1">
                  Ready to continue learning?
                </p>
              </div>

              {/* Exam Date & Actions Section */}
              <div className="flex flex-col items-start lg:items-end w-full lg:w-auto">
                <div className="text-left lg:text-right mb-4">
                  <p className="text-gray-400 text-lg md:text-2xl">
                    Exam Date:{" "}
                    <span className="font-bold text-gray-700 whitespace-nowrap">
                      14 April, 2026
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                  <Button className="flex-1 sm:flex-none py-2 px-6 md:px-8 text-xs bg-[#0A2684]">
                    Start Practice
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none py-2 px-6 md:px-8 text-xs"
                  >
                    Take a Quiz
                  </Button>
                </div>
              </div>
            </div>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              {/* JAMB Readiness */}
              <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center h-full">
                <p className="text-[10px] text-gray-400 font-bold mb-4 uppercase">
                  JAMB Readiness Score
                </p>
                <div className="w-16 h-16 rounded-full border-4 border-blue-50 border-t-green-400 flex items-center justify-center mb-2">
                  <span className="text-sm font-bold">67%</span>
                </div>
                <p className="text-[10px] text-green-500 font-bold">
                  ● Good Progress
                </p>
              </div>

              {/*  Weakest Subject */}
              <WeakestSubjectCard subject="Physics" />

              {/* Core Courses */}
              <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center h-full">
                <div className="flex justify-between w-full items-start mb-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase text-left">
                    Core Courses (4)
                  </p>
                  <button className="text-gray-400">•••</button>
                </div>
                <p className="text-sm font-bold text-[#0A2684] leading-tight mt-2">
                  Eng, Math, Phy, Chem
                </p>
                <div className="w-full bg-blue-100 h-1.5 rounded-full mt-4 overflow-hidden">
                  <div className="bg-blue-400 h-full w-[60%]"></div>
                </div>
              </div>

              {/* Study Time */}
              <div className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex flex-col items-center text-center h-full">
                <div className="flex justify-between w-full items-start mb-2">
                  <p className="text-[10px] text-gray-400 font-bold uppercase text-left">
                    Study Time
                  </p>
                  <div className="w-2 h-0.5 bg-blue-900"></div>
                </div>
                <p className="text-xl font-bold text-gray-800 mt-2">4h 30m</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">
                  This Week
                </p>
              </div>
            </div>

            {/* Your JAMB Subjects Section */}
            <div className="mt-8">
              <h3 className="font-bold text-gray-800 mb-4 text-lg px-2 lg:px-0">
                Your JAMB Subjects
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <SubjectCard
                  title="English"
                  progress={75}
                  iconBg="bg-blue-50"
                />
                <SubjectCard
                  title="Maths"
                  progress={82}
                  iconBg="bg-purple-50"
                />
                <SubjectCard
                  title="Physics"
                  progress={45}
                  iconBg="bg-indigo-50"
                />
                <SubjectCard
                  title="Chemistry"
                  progress={70}
                  iconBg="bg-cyan-50"
                />
              </div>
            </div>

            {/* Continue Learning Section */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm mt-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 text-sm md:text-base">
                  Continue Learning
                </h3>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  JAMB Topic
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-14 md:w-26 md:h-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-50">
                    <img
                      className="w-full h-full object-cover"
                      src={maths}
                      alt="quadratic-equation"
                    />
                  </div>

                  <div className="md:hidden">
                    <p className="text-xs font-bold text-gray-800">
                      Mathematics
                    </p>
                    <p className="text-[11px] text-gray-500 truncate max-w-[150px]">
                      Quadratic Equations
                    </p>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="hidden md:flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-gray-800">
                      Mathematics
                    </span>
                    <HiOutlineChevronRight className="text-gray-400 text-xs" />
                    <span className="text-sm text-gray-500">
                      Quadratic Equations
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-grow h-2 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                      <div
                        className="bg-blue-400 h-full rounded-full transition-all duration-700"
                        style={{ width: "82%" }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
                      82%{" "}
                      <span className="hidden sm:inline text-gray-400 font-medium">
                        Complete
                      </span>
                    </span>
                  </div>
                </div>

                <button className="w-full md:w-auto px-8 lg:px-12 py-2.5 md:py-2 bg-[#0A2684] text-white text-[10px] font-bold rounded-md hover:bg-blue-900 transition-all active:scale-95 cursor-pointer shadow-sm">
                  Resume
                </button>
              </div>
            </div>

            {/* Recommended For You Section */}
            <div className="mt-8 mb-10">
              <div className="flex justify-between items-center mb-4 px-2 sm:px-0">
                <h3 className="font-bold text-gray-800 text-lg">
                  Recommended For You
                </h3>
                <button className="text-xs text-gray-400 font-medium hover:underline cursor-pointer">
                  View all
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <RecommendationCard
                  image={physics}
                  subject="Physics"
                  title="JAMB Past Questions"
                  badgeText="Low Accuracy"
                  badgeVariant="danger"
                  buttonText="Practice"
                  onClick={() => console.log("Start Practice")}
                />

                <RecommendationCard
                  image={english}
                  subject="English"
                  title="Mock Test 1 (Timed)"
                  badgeText="40 Qs · 2hrs"
                  badgeVariant="info"
                  buttonText="Start Test"
                  onClick={() => console.log("Start Test")}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Info Panel */}
          <div className="w-full lg:w-80 space-y-6 order-2">
            {/* JAMB Countdown */}
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

            {/* Progress Bar Container */}
            <div className="flex items-center gap-3">
              <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="bg-blue-400 h-full rounded-full transition-all duration-500"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            {/* Today's Tasks */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-xs font-bold text-gray-800 mb-4 uppercase">
                Today's Tasks
              </p>
              <div className="space-y-4">
                {[
                  "Math Quiz - 12:00 PM",
                  "English Past Qs (10)",
                  "Physics Reading",
                ].map((task) => (
                  <div
                    key={task}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    {task}
                  </div>
                ))}
              </div>
              <Button className="mt-6 text-xs bg-[#0A2684]">
                View Planner
              </Button>
            </div>

            {/* XP Banner */}
            <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
              {/* Top Row: Emojis and Badge */}
              <div className="flex items-center justify-between">
                <div className="flex gap-1 text-xl">
                  <span>🔥</span>
                  <span>🔥</span>
                  <span>🔥</span>
                  <span>🔥</span>
                  <span>🔥</span>
                </div>
                <div className="bg-[#EEEBFF] text-[#4F46E5] px-3 py-1 rounded-lg text-xs font-bold">
                  +10 XP
                </div>
              </div>

              {/* Bottom Row: Progress Bar */}
              <div className="w-full bg-blue-50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-400 h-full rounded-full transition-all duration-500"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            {/* Go Pro Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-bold text-gray-800">
                  Go Pro{" "}
                  <span className="text-gray-400 font-normal">
                    | Unlock Premium Features
                  </span>
                </h3>
              </div>

              <div className="flex gap-4 items-center">
                {/* INSERT IMAGE: src/assets/rocket.png */}
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex-shrink-0 flex items-center justify-center text-3xl">
                  <img src={rocket} alt="rocket" />
                </div>
                <ul className="text-[10px] space-y-1 text-gray-500 font-medium">
                  <li>• Advanced performance insights</li>
                  <li>• Unlimited practice questions</li>
                  <li>• Ad-free experience</li>
                  <li>• Mock exams</li>
                </ul>
              </div>

              <Button className="w-full mt-6 bg-[#0A2684] py-2.5 text-xs font-bold">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
