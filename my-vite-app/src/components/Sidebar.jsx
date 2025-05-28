import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (item === 'Profile') {
      navigate('/profile');
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Agent Info */}
      {user && user.role === 'agent' && !isCollapsed && (
        <div className="agent-info">
          <div className="agent-avatar">{user.name?.charAt(0) || 'A'}</div>
          <div className="agent-details">
            <div className="agent-name">{user.name}</div>
            <div className="agent-role">Agent</div>
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
          <li>
            
          </li>
          <li>
            <button
              className={`menu-item ${activeItem === 'Profile' ? 'active' : ''}`}
              onClick={() => handleItemClick('Profile')}
            >
              <span>📑</span>
              {!isCollapsed && 'Profile'}
            </button>
          </li>
          <li>
            <button
              className={`menu-item ${activeItem === 'settings' ? 'active' : ''}`}
              onClick={() => handleItemClick('settings')}
            >
              <span>⚙️</span>
              {!isCollapsed && 'Settings'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;