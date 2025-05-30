import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleItemClick = (item) => {
    setActiveItem(item);
    switch (item) {
      case 'dashboard':
        navigate(user?.role === 'agent' ? '/agent-dashboard' : '/user-dashboard');
        break;
      case 'policies':
        navigate('/health-policies');
        break;
      case 'claims':
        navigate('/claims');
        break;
      case 'documents':
        navigate('/documents');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'logout':
        logout();
        navigate('/login');
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'policies', label: 'My Policies', icon: '📄' },
    { id: 'claims', label: 'Claims', icon: '📝' },
    { id: 'documents', label: 'Documents', icon: '📁' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* User Info */}
      {user && !isCollapsed && (
        <div className="user-info">
          <div className="user-avatar">{user.name?.charAt(0) || 'U'}</div>
          <div className="user-details">
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role === 'agent' ? 'Agent' : 'Customer'}</div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        className="toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
      >
        {isCollapsed ? '→' : '←'}
      </button>

      {/* Navigation Menu */}
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                <span>{item.icon}</span>
                {!isCollapsed && item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;