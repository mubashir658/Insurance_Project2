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

  const handleCardClick = (action) => {
    switch(action) {
      case 'clients':
        navigate('/agent-clients');
        break;
      case 'policies':
        navigate('/agent-policies');
        break;
      case 'reports':
        navigate('/agent-reports');
        break;
      default:
        break;
    }
  };

  return (
    <div className="agent-dashboard-container">
      {/* Sidebar for navigation */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
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
            <p>Manage client policies, process claims, and track policy status.</p>
            <div className="card-stats">
              <span>Active Policies: 45</span>
              <span>Pending Claims: 3</span>
            </div>
          </div>

          {/* Reports & Analytics Card */}
          <div className="dashboard-card" onClick={() => handleCardClick('reports')}>
            <div className="card-icon">📊</div>
            <h2>Reports & Analytics</h2>
            <p>Generate reports, view performance metrics, and analyze business trends.</p>
            <div className="card-stats">
              <span>Monthly Sales: ₹2.5L</span>
              <span>Success Rate: 92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;