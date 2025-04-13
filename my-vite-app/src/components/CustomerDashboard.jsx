import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

const CustomerDashboard = () => {
  const { user, setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="customer-dashboard-container">
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, {user?.name || "Customer"}!</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
        <section className="dashboard-info">
          <p>Email: {user?.email}</p>
        </section>
        <section className="dashboard-welcome">
          <p>Explore your insurance options and manage your policies.</p>
        </section>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button className="action-btn">View Policies</button>
            <button className="action-btn">File a Claim</button>
            <button className="action-btn">Update Profile</button>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>Purchased Health Insurance Policy</li>
            <li>Updated payment details</li>
            <li>Submitted a claim request</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;