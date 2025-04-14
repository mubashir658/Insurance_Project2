import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Homepage from "./components/Homepage.jsx";
import Login from "./components/Login.jsx";
import About from "./components/About.jsx";
import HelpLine from "./components/HelpLine.jsx";
import UserDashboard from "./components/UserDashboard.jsx";  // Updated to UserDashboard
import AgentDashboard from "./components/AgentDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
      </Routes>
    </>
  );
}

export default App;
