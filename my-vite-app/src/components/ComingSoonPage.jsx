import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoonPage.css';

const ComingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1>Coming Soon!</h1>
        <div className="icon">🚧</div>
        <p>We're currently working on this policy type.</p>
        <p>Our team is putting the finishing touches to bring you the best insurance options.</p>
        <p>Please check back soon or explore our Health Insurance policies in the meantime.</p>
        <button 
          className="back-button"
          onClick={() => navigate('/user-dashboard')}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ComingSoonPage; 