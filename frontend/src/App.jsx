// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Public Pages
import SignUp from "./features/onboarding/pages/SignUp";
import SelectRole from "./features/onboarding/pages/SelectRole";
import AccountDetails from "./features/onboarding/pages/AccountDetails";
import SignIn from "./features/onboarding/pages/SignIn";
import VerifyAccount from "./features/onboarding/pages/VerifyAccount";
import ForgotPassword from "./features/onboarding/pages/ForgotPassword";
import ResetPassword from "./features/onboarding/pages/ResetPassword";

// Student Pages
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentProfile";
import LearningPath from "./pages/LearningPath";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

// Learning Path Components
import Progress from "./components/learning-path/Progress";
import Planner from "./components/learning-path/Planner";
import Reward from "./components/learning-path/Reward";
import Forum from "./components/learning-path/Forum";
import Settings from "./components/learning-path/Settings";

// Assessment Pages
import Assessment from "./pages/Assessment";
import QuizPage from "./pages/QuizPage";
import ExamPage from "./pages/ExamPage";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminSignIn from "./features/onboarding/pages/AdminSignIn";
import AdminStudents from "./pages/AdminStudents";
import AdminCourses from "./pages/AdminCourses";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminReports from "./pages/AdminReports";
import AdminEvents from "./pages/AdminEvents"; // ← ADD THIS IMPORT
import ClassOverview from "./pages/ClassOverview";
import StudentPerformancePage from "./pages/StudentPerformancePage";
import EngagementAnalysisPage from "./pages/EngagementAnalysisPage";
import ReportPage from "./pages/ReportPage";
import CoursesManagement from "./pages/CoursesManagement";

// Parent Pages
import ParentProfile from "./pages/ParentProfile";

// Shared Pages
import AlertsPage from "./pages/AlertsPage";
import Onboarding from "./features/onboarding/pages/Onboarding";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select-role" element={<SelectRole />} />
        <Route path="/signup/details" element={<AccountDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ========== STUDENT ONLY ROUTES ========== */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-path"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <LearningPath />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-path/progress"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-path/planner"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Planner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-path/reward"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Reward />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-path/forum"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-path/settings"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Assessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:courseId/:topicId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam/:courseId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <ExamPage />
            </ProtectedRoute>
          }
        />

        {/* ========== ADMIN ONLY ROUTES ========== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminEvents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/class-overview"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ClassOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/student-performance"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <StudentPerformancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/engagement-analysis"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <EngagementAnalysisPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/report"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ReportPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses-management"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CoursesManagement />
            </ProtectedRoute>
          }
        />

        {/* ========== PARENT ONLY ROUTES ========== */}
        <Route
          path="/parent"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentProfile />
            </ProtectedRoute>
          }
        />

        {/* ========== SHARED ROUTES ========== */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute allowedRoles={["student", "admin", "parent"]}>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <ProtectedRoute allowedRoles={["student", "admin", "parent"]}>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute allowedRoles={["student", "admin", "parent"]}>
              <AlertsPage />
            </ProtectedRoute>
          }
        />

        {/* ========== STUDENT DASHBOARD ROUTES ========== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/learning-path"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <LearningPath />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/learning-path/progress"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/learning-path/planner"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Planner />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/learning-path/reward"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Reward />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/learning-path/forum"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Forum />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/learning-path/settings"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/alerts"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <AlertsPage />
            </ProtectedRoute>
          }
        />

        {/* ========== PARENT DASHBOARD ROUTES ========== */}
        <Route
          path="/parent/dashboard"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <ParentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parent/alerts"
          element={
            <ProtectedRoute allowedRoles={["parent"]}>
              <AlertsPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect root based on role */}
        <Route path="/" element={<RoleBasedRedirect />} />
        <Route path="/get-started" element={<Onboarding />} />
        
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

// Component to redirect users to their role-specific dashboard
const RoleBasedRedirect = () => {
  const { userRole } = useAuth();

  if (userRole === "student") return <Navigate to="/dashboard" replace />;
  if (userRole === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (userRole === "parent") return <Navigate to="/parent/dashboard" replace />;

  const hasSeenOnboarding = localStorage.getItem("pathiq_onboarded");

  if (!hasSeenOnboarding) {
    return <Navigate to="/get-started" replace />;
  }

  return <Navigate to="/signin" replace />;
};

export default App;