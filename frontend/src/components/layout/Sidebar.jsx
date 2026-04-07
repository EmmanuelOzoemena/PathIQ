// src/components/layout/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  GitBranch,
  ClipboardCheck,
  TrendingUp,
  Calendar,
  Award,
  MessageCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  Users,
  User,
  Heart,
  School,
  BarChart3,
  LineChart,
  FileText,
  Bell,
  X,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const Sidebar = ({
  activeItem = "dashboard",
  activeSubItem = null,
  onNavigate,
  isMobile = false,
  isOpen = false,
  onClose,
}) => {
  const navigate = useNavigate();
  const { user, userRole, logout } = useAuth();
  const [isLearningPathOpen, setIsLearningPathOpen] = useState(true);

  // Get menu items based on user role
  const getMenuItems = () => {
    // Common items for all authenticated users
    const commonItems = [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        id: "dashboard",
        path: "/dashboard",
      },
      {
        icon: BookOpen,
        label: "Courses",
        id: "courses",
        path: "/courses",
      },
    ];

    // Student-specific items (Assessment moved to top level)
    const studentItems = [
      {
        icon: GitBranch,
        label: "Learning Path",
        id: "learning-path",
        path: "/learning-path",
        subItems: [
          // Assessment removed from here
          {
            icon: TrendingUp,
            label: "Progress",
            id: "progress",
            path: "/learning-path/progress",
          },
          {
            icon: Award,
            label: "Reward",
            id: "reward",
            path: "/learning-path/reward",
          },
        ],
      },
      {
        icon: User,
        label: "My Profile",
        id: "profile",
        path: "/profile",
      },
    ];

    // Admin-specific items
    const adminItems = [
      {
        icon: Users,
        label: "Admin Dashboard",
        id: "admin-dashboard",
        path: "/admin",
      },
      {
        icon: School,
        label: "Class Overview",
        id: "class-overview",
        path: "/class-overview",
      },
      {
        icon: BarChart3,
        label: "Student Performance",
        id: "student-performance",
        path: "/student-performance",
      },
      {
        icon: LineChart,
        label: "Engagement Analysis",
        id: "engagement-analysis",
        path: "/engagement-analysis",
      },
      {
        icon: FileText,
        label: "Reports",
        id: "report",
        path: "/report",
      },
      {
        icon: BookOpen,
        label: "Courses Management",
        id: "courses-management",
        path: "/courses-management",
      },
    ];

    // Parent-specific items
    const parentItems = [
      {
        icon: Heart,
        label: "Parent Dashboard",
        id: "parent-profile",
        path: "/parent",
      },
    ];

    // Alert item for all users
    const alertItem = {
      icon: Bell,
      label: "Alerts",
      id: "alerts",
      path: "/alerts",
    };

    // const settingItem = {
    //   icon: Settings,
    //   label: "Setting",
    //   id: "setting",
    //   path: "/learning-path/settings"
    // }

    // Build menu based on role
    let items = [...commonItems];

    if (userRole === "student") {
      // Add top-level Assessment item first (optional ordering)
      items.push({
        icon: ClipboardCheck,
        label: "Assessment",
        id: "assessment",
        path: "/assessment",
      });
      items = [...items, ...studentItems];
    } else if (userRole === "admin") {
      items = [...items, ...adminItems];
    } else if (userRole === "parent") {
      items = [...items, ...parentItems];
    }

    // Add alerts for all authenticated users
    items.push(alertItem);

    return items;
  };

  const menuItems = getMenuItems();

  // Close sidebar on navigation for mobile
  const handleNavigation = (id, path) => {
    if (onNavigate) {
      onNavigate(id);
    }

    if (path) {
      navigate(path);
    }

    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleSubNavigation = (id, path) => {
    if (onNavigate) {
      onNavigate(id);
    }
    if (path) {
      navigate(path);
    }
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.name) {
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
    }
    return userRole === "student"
      ? "SN"
      : userRole === "admin"
        ? "AD"
        : userRole === "parent"
          ? "PT"
          : "U";
  };

  // For mobile overlay
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        <aside
          className={`
          fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          {/* Mobile Header with Close Button */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              PathIQ
            </h1>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="h-[calc(100vh-160px)] overflow-y-auto py-6">
            <ul className="space-y-1 px-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {!item.subItems ? (
                    <button
                      onClick={() => handleNavigation(item.id, item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                        activeItem === item.id
                          ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ) : (
                    <div>
                      <button
                        onClick={() =>
                          setIsLearningPathOpen(!isLearningPathOpen)
                        }
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors group ${
                          activeItem === item.id
                            ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {isLearningPathOpen ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {isLearningPathOpen && (
                        <ul className="mt-1 ml-4 space-y-1 border-l-2 border-indigo-100 dark:border-indigo-900">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.id}>
                              <button
                                onClick={() =>
                                  handleSubNavigation(subItem.id, subItem.path)
                                }
                                className={`w-full flex items-center gap-3 px-4 py-2.5 ml-4 text-sm rounded-lg transition-colors ${
                                  activeSubItem === subItem.id
                                    ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                                }`}
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile at Bottom */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <img
                src={`https://ui-avatars.com/api/?name=${getUserInitials()}&background=6366f1&color=fff&size=48`}
                alt={user?.name || "User"}
                className="w-10 h-10 rounded-full ring-2 ring-indigo-100 dark:ring-indigo-900"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {user?.name ||
                    (userRole === "student"
                      ? "Student User"
                      : userRole === "admin"
                        ? "Admin User"
                        : userRole === "parent"
                          ? "Parent User"
                          : "User")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">
                  {userRole || "Guest"}
                </p>
              </div>
              <button
                onClick={() =>
                  handleNavigation("settings", "/learning-path/settings")
                }
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors mr-1"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </aside>
      </>
    );
  }

  // Desktop version
  return (
    <aside className="hidden lg:flex w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          PathIQ
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              {!item.subItems ? (
                <button
                  onClick={() => handleNavigation(item.id, item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                    activeItem === item.id
                      ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ) : (
                <div>
                  <button
                    onClick={() => setIsLearningPathOpen(!isLearningPathOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors group ${
                      activeItem === item.id
                        ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {isLearningPathOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>

                  {isLearningPathOpen && (
                    <ul className="mt-1 ml-4 space-y-1 border-l-2 border-indigo-100 dark:border-indigo-900">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <button
                            onClick={() =>
                              handleSubNavigation(subItem.id, subItem.path)
                            }
                            className={`w-full flex items-center gap-3 px-4 py-2.5 ml-4 text-sm rounded-lg transition-colors ${
                              activeSubItem === subItem.id
                                ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-medium"
                                : "text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400"
                            }`}
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span>{subItem.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile at Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${getUserInitials()}&background=6366f1&color=fff&size=48`}
            alt={user?.name || "User"}
            className="w-10 h-10 rounded-full ring-2 ring-indigo-100 dark:ring-indigo-900"
          />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-white truncate">
              {user?.name ||
                (userRole === "student"
                  ? "Student User"
                  : userRole === "admin"
                    ? "Admin User"
                    : userRole === "parent"
                      ? "Parent User"
                      : "User")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate capitalize">
              {userRole || "Guest"}
            </p>
          </div>
          <button
            onClick={() => handleNavigation("admin", "/admin/signin")}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-[#0A2684] dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Admin Panel"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>
          <button
            onClick={() =>
              handleNavigation("settings", "/learning-path/settings")
            }
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
