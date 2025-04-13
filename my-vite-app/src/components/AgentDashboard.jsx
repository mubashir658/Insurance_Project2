// src/components/AgentDashboard.jsx
import React from "react";
import Sidebar from "./Sidebar";
import "./AgentDashboard.css";

const AgentDashboard = () => {
  return (
    <div className="agent-dashboard-container">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <h1>Agent Dashboard</h1>
        <p>Welcome to your dashboard. Here you can manage client policies and view reports.</p>

        {/* Example: Quick Actions Section */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">Add New Client</button>
            <button className="action-btn">View Client Policies</button>
            <button className="action-btn">Generate Reports</button>
          </div>
        </div>

        {/* Example: Recent Activity Section */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>Client A purchased Health Insurance Policy 1</li>
            <li>Client B updated their profile</li>
            <li>Client C submitted a claim request</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;