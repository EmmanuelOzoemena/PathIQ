import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./features/onboarding/pages/SignUp";
import SelectRole from "./features/onboarding/pages/SelectRole";
// import StudentDetails from "./features/onboarding/pages/StudentDetails";
import AccountDetails from "./features/onboarding/pages/AccountDetails";
import SignIn from "./features/onboarding/pages/SignIn";

function App() {
  return (
    <>
      <Routes>
        {/* Default route (redirects to signup) */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Onboarding Screens */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select-role" element={<SelectRole />} />

        {/* <Route path="/student-details" element={<StudentDetails />} /> */}
        <Route path="/signup/details" element={<AccountDetails />} />

        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
