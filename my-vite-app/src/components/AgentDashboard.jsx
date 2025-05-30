import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";
import ClientManagement from "./ClientManagement";
import FeedbackManagement from "./FeedbackManagement";
import "./AgentDashboard.css";

const AgentDashboard = () => {
  const { user, setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard');
  const [clientStats, setClientStats] = useState({
    totalClients: 0,
    newClients: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientStats = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log('Token from localStorage:', token ? `${token.substring(0, 15)}...` : 'No token found');
        
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        console.log('Fetching client data for dashboard...');
        const response = await axios.get('http://localhost:5000/api/basic-questions', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('API response received:', response.status, response.statusText);
        console.log('Client data count:', response.data.length);

        // Calculate client statistics
        const clients = response.data;
        const totalClients = clients.length;
        
        // Calculate new clients this month
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const newClientsThisMonth = clients.filter(client => {
          const clientDate = new Date(client.createdAt);
          return clientDate >= firstDayOfMonth;
        }).length;

        console.log('Client stats calculated:', { totalClients, newClientsThisMonth });

        setClientStats({
          totalClients,
          newClients: newClientsThisMonth
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching client stats:", error);
        console.error("Error details:", error.response?.data);
        
        // Set default values for stats when there's an error
        setClientStats({
          totalClients: 0,
          newClients: 0
        });
        setLoading(false);
      }
    };

    fetchClientStats();
  }, []);

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
      case 'feedbacks':
        setActiveView('feedbacks');
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
                {loading ? (
                  <span>Loading client data...</span>
                ) : (
                  <>
                    <span>Active Clients: {clientStats.totalClients}</span>
                    <span>New This Month: {clientStats.newClients}</span>
                  </>
                )}
              </div>
            </div>

            {/* Policy Management Card */}
            <div className="dashboard-card" onClick={() => handleCardClick('policies')}>
              <div className="card-icon">📄</div>
              <h2>Policy Management</h2>
              <p>Manage insurance policies, view policy details, and handle policy-related tasks.</p>
              <div className="card-stats">
                <span>Active Policies: {clientStats.totalClients > 0 ? clientStats.totalClients : '0'}</span>
                <span>Pending Approvals: {Math.round(clientStats.totalClients * 0.1) || 0}</span>
              </div>
            </div>

            {/* Feedbacks Card */}
            <div className="dashboard-card" onClick={() => handleCardClick('feedbacks')}>
              <div className="card-icon">💬</div>
              <h2>Customer Feedbacks</h2>
              <p>View and manage customer feedbacks, track issues, and improve service quality.</p>
              <div className="card-stats">
                <span>Total Feedbacks: {clientStats.totalClients > 0 ? Math.round(clientStats.totalClients * 0.3) : '0'}</span>
                <span>Response Rate: {clientStats.totalClients > 0 ? '85%' : '0%'}</span>
              </div>
            </div>
          </div>
        ) : activeView === 'clients' ? (
          <ClientManagement />
        ) : activeView === 'feedbacks' ? (
          <FeedbackManagement />
        ) : null}
      </div>
    </div>
  );
};

export default AgentDashboard;