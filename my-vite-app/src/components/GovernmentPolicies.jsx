import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GovernmentPolicies.css';

const GovernmentPolicies = () => {
  const navigate = useNavigate();

  const policies = [
    {
      name: "Pradhan Mantri Suraksha Bima Yojana",
      price: "₹12/year",
      coverage: "Accidental Death & Disability",
      features: [
        "Accidental death cover of ₹2 lakh",
        "Total disability cover of ₹2 lakh",
        "Partial disability cover of ₹1 lakh",
        "Available for age group 18-70 years"
      ]
    },
    {
      name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
      price: "₹330/year",
      coverage: "Life Insurance",
      features: [
        "Life cover of ₹2 lakh",
        "Available for age group 18-50 years",
        "Auto-debit facility available",
        "Simple enrollment process"
      ]
    },
    {
      name: "Ayushman Bharat Yojana",
      price: "Free",
      coverage: "Health Insurance",
      features: [
        "Health cover of ₹5 lakh per family per year",
        "Covers secondary and tertiary hospitalization",
        "No restrictions on family size",
        "Cashless hospitalization"
      ]
    }
  ];

  const handleViewDetails = (policy) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate(`/government-policy/${policy.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="government-policies">
      <h1>Government Insurance Schemes</h1>
      <p className="subtitle">Affordable insurance schemes for all citizens</p>
      
      <div className="policy-list">
        {policies.map((policy, index) => (
          <div key={index} className="policy-card">
            <div>
              <h2>{policy.name}</h2>
              <div className="price">{policy.price}</div>
              <div className="coverage">{policy.coverage}</div>
              <ul>
                {policy.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            <button 
              className="view-details-btn"
              onClick={() => handleViewDetails(policy)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentPolicies; 