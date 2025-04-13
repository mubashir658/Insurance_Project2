import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./AgentDashboard.css";

const AgentDashboard = () => {
  const { user, setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="agent-dashboard-container">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, Agent {user?.name || "Agent"}!</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <section className="dashboard-info">
          <p>Email: {user?.email}</p>
          <p>Employee ID: {user?.employeeId || "N/A"}</p>
        </section>
        <section className="dashboard-welcome">
          <p>Manage client policies and view reports here.</p>
        </section>

        {/* Quick Actions Section */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Add New Client</button>
            <button className="action-btn">View Client Policies</button>
            <button className="action-btn">Generate Reports</button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>Client A purchased Health Insurance Policy</li>
            <li>Client B updated their profile</li>
            <li>Client C submitted a claim request</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;