import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ClientManagement from "./ClientManagement";
import "./AgentDashboard.css";

const AgentDashboard = () => {
  const { user, setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const handleCardClick = (action) => {
    switch(action) {
      case 'clients':
        setActiveView('clients');
        break;
      case 'policies':
        navigate('/agent-policies');
        break;
      case 'reports':
        navigate('/agent-reports');
        break;
      default:
        setActiveView('dashboard');
        break;
    }
  };

  return (
    <div className="agent-dashboard-container">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {activeView === 'dashboard' ? (
          <div className="dashboard-cards">
            {/* Client Management Card */}
            <div className="dashboard-card" onClick={() => handleCardClick('clients')}>
              <div className="card-icon">👥</div>
              <h2>Client Management</h2>
              <p>View and manage your client list, add new clients, and track client interactions.</p>
              <div className="card-stats">
                <span>Active Clients: 25</span>
                <span>New This Month: 5</span>
              </div>
            </div>

            {/* Policy Management Card */}
            <div className="dashboard-card" onClick={() => handleCardClick('policies')}>
              <div className="card-icon">📄</div>
              <h2>Policy Management</h2>
              <p>Manage insurance policies, view policy details, and handle policy-related tasks.</p>
              <div className="card-stats">
                <span>Active Policies: 50</span>
                <span>Pending Approvals: 3</span>
              </div>
            </div>

            {/* Reports Card */}
            <div className="dashboard-card" onClick={() => handleCardClick('reports')}>
              <div className="card-icon">📊</div>
              <h2>Reports</h2>
              <p>Access detailed reports, analytics, and performance metrics.</p>
              <div className="card-stats">
                <span>Monthly Sales: ₹500,000</span>
                <span>Conversion Rate: 25%</span>
              </div>
            </div>
          </div>
        ) : (
          <ClientManagement />
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;