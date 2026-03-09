import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./features/onboarding/pages/SignUp";
import SelectRole from "./features/onboarding/pages/SelectRole";
// import StudentDetails from "./features/onboarding/pages/StudentDetails";
import AccountDetails from "./features/onboarding/pages/AccountDetails";
import SignIn from "./features/onboarding/pages/SignIn";
import StudentDashboard from "./features/student/pages/StudentDashboard";
import PageUnavailable from "./features/dashboard/pages/PageUnavailable";
import ParentDashboard from "./features/parent/pages/ParentDashboard";


function App() {
  return (
    <>
      <Routes>
        {/* Default route (redirects to signup) */}
        {/* <Route path="/" element={<Navigate to="/signup" />} /> */}
        <Route path="/" element={<StudentDashboard />} />

        {/* Onboarding Screens */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select-role" element={<SelectRole />} />

        {/* <Route path="/student-details" element={<StudentDetails />} /> */}
        <Route path="/signup/details" element={<AccountDetails />} />

        <Route path="/signin" element={<SignIn />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />

        <Route path="/unavailable" element={<PageUnavailable />} />
      </Routes>
    </>
  );
}

export default App;
