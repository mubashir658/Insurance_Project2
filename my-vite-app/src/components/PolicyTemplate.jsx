import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './PolicyTemplate.css';

const PolicyTemplate = ({ policyData }) => {
  const [selectedDuration, setSelectedDuration] = useState('1Y');
  const [selectedRiders, setSelectedRiders] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isEligible, setIsEligible] = useState(null);
  const navigate = useNavigate();

  const calculateTotal = () => {
    const base = policyData.durations[selectedDuration];
    const ridersTotal = selectedRiders.reduce((sum, rider) => sum + rider.price, 0);
    return base + ridersTotal;
  };

  const handleEligibilityCheck = () => {
    navigate('/full-detail-question'); // Changed to direct navigation
  };

  return (
    <div className="policy-template">
      {/* Header Section */}
      <div className="policy-header blue-header">
        <div className="policy-header-content">
          <h1>{policyData.name}</h1>
          {policyData.badge && <div className="policy-badge">{policyData.badge}</div>}
          <div className="policy-meta">
            <span>{policyData.insurer}</span>
            <span>•</span>
            <span>Cover: {policyData.cover}</span>
            <span>•</span>
            <span>{policyData.hospitals}+ Hospitals</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="policy-content">
        {/* Key Features Grid */}
        <div className="features-grid">
          {policyData.features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <FontAwesomeIcon icon={feature.icon} className="feature-icon" />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Duration Selector */}
        <div className="duration-section">
          <h2>Policy Duration</h2>
          <div className="duration-buttons">
            {Object.entries(policyData.durations).map(([duration, price]) => (
              <button
                key={duration}
                className={`duration-btn ${selectedDuration === duration ? 'active' : ''}`}
                onClick={() => setSelectedDuration(duration)}
              >
                {duration} - ₹{price.toLocaleString()}
              </button>
            ))}
          </div>
          {policyData.durationNote && <p className="duration-note">{policyData.durationNote}</p>}
        </div>

        {/* Riders Section */}
        <div className="riders-section">
          <h2>
            Optional Riders{' '}
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className="help-icon"
              title="Optional riders provide additional benefits at an extra cost."
            />
          </h2>
          <div className="riders-grid">
            {policyData.riders.map((rider, index) => (
              <div
                className={`rider-card ${selectedRiders.some((r) => r.id === rider.id) ? 'selected' : ''}`}
                key={index}
                onClick={() =>
                  setSelectedRiders((prev) =>
                    prev.some((r) => r.id === rider.id)
                      ? prev.filter((r) => r.id !== rider.id)
                      : [...prev, rider]
                  )
                }
              >
                <h3>{rider.name}</h3>
                <p>{rider.description}</p>
                <div className="rider-price">+ ₹{rider.price.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Summary */}
        <div className="price-summary">
          <div className="price-line">
            <span>Base Premium:</span>
            <span>₹{policyData.durations[selectedDuration].toLocaleString()}</span>
          </div>
          {selectedRiders.map((rider, index) => (
            <div className="price-line" key={index}>
              <span>{rider.name}:</span>
              <span>+ ₹{rider.price.toLocaleString()}</span>
            </div>
          ))}
          <div className="total-price">
            <span>Total Premium:</span>
            <span>₹{calculateTotal().toLocaleString()}</span>
          </div>
        </div>

        {/* Eligibility Check - Now only triggers navigation */}
        {!showQuestions && isEligible === null && (
          <div className="eligibility-container">
            <button className="eligibility-btn" onClick={handleEligibilityCheck}>
              Check Eligibility
            </button>
          </div>
        )}

        {/* Removed results section since we're navigating immediately */}
      </div>
    </div>
  );
};

export default PolicyTemplate;