import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import BasicQuestions from './components/BasicQuestions';
import About from "./components/About.jsx";
import HelpLine from "./components/HelpLine.jsx";
import UserDashboard from "./components/UserDashboard.jsx";  // Updated to UserDashboard
import AgentDashboard from "./components/AgentDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HealthPoliciesPage from './components/HealthPoliciesPage';
import FullDetailQuestion from './components/FullDetailQuestion.jsx';
import ThankYouPage from "./components/ThankYouPage";
import FullDetailWrapper from "./components/FullDetailWrapper";
import HPolicy1 from './components/HPolicy1'; // Ensure you have this page
import HPolicy2 from './components/HPolicy2'; // Ensure you have this page
import HPolicy3 from './components/HPolicy3'; // Ensure you have this page

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Updated path to root "/" */}
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/helpline" element={<HelpLine />} />
        
        {/* Updated the route for users to be directed to UserDashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard /> {/* Render UserDashboard instead of CustomerDashboard */}
            </ProtectedRoute>
          }
        />

        <Route
          path="/agent-dashboard"
          element={
            <ProtectedRoute>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path="/basic-questions" element={<BasicQuestions />} />
          
        <Route path="/full-detail-question" element={<FullDetailQuestion />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        
        <Route path="/full-detail" element={<FullDetailWrapper />} />
        <Route path="/health-policies" element={<HealthPoliciesPage />} />
        <Route path="/hpolicy1" element={<HPolicy1 />} />
        <Route path="/hpolicy2" element={<HPolicy2 />} />
        <Route path="/hpolicy3" element={<HPolicy3 />} />
      </Routes>
    </>
  );
}

export default App;
