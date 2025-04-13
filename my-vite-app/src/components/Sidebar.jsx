import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
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
            <button
              className={`menu-item ${activeItem === 'dashboard' ? 'active' : ''}`}
              onClick={() => handleItemClick('dashboard')}
            >
              <span>🏠</span>
              {!isCollapsed && 'Dashboard'}
            </button>
          </li>
          <li>
            <button
              className={`menu-item ${activeItem === 'policies' ? 'active' : ''}`}
              onClick={() => handleItemClick('policies')}
            >
              <span>📑</span>
              {!isCollapsed && 'Policies'}
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