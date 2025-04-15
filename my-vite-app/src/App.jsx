import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import BasicQuestions from './components/BasicQuestions';
import About from "./components/About.jsx";
import HelpLine from "./components/HelpLine.jsx";
import UserDashboard from "./components/UserDashboard.jsx";
import AgentDashboard from "./components/AgentDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HealthPoliciesPage from './components/HealthPoliciesPage';
import FullDetailWrapper from "./components/FullDetailWrapper";
import ThankYouPage from "./components/ThankYouPage";
import HPolicy1 from './components/HPolicy1';
import HPolicy2 from './components/HPolicy2';
import HPolicy3 from './components/HPolicy3';
import Profile from './components/Profile';
import GovernmentPolicies from './components/GovernmentPolicies';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/helpline" element={<HelpLine />} />
        
        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
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

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Policy and Question Routes */}
        <Route path="/basic-questions" element={<BasicQuestions />} />
        <Route path="/full-detail" element={<FullDetailWrapper />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
        <Route path="/health-policies" element={<HealthPoliciesPage />} />
        <Route path="/hpolicy1" element={<HPolicy1 />} />
        <Route path="/hpolicy2" element={<HPolicy2 />} />
        <Route path="/hpolicy3" element={<HPolicy3 />} />
        <Route path="/government-policies" element={<GovernmentPolicies />} />
        <Route path="/government-policy/:id" element={<GovernmentPolicies />} />
        
        {/* 404 Route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
