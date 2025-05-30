import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./HealthPoliciesPage.css";

const HealthPoliciesPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [annualIncome, setAnnualIncome] = useState("");
  const [policies, setPolicies] = useState([]);
  const [recommendedPolicies, setRecommendedPolicies] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch policies from backend
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/policies');
        const healthPolicies = response.data.filter(policy => policy.type === 'Health');
        setPolicies(healthPolicies);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch policies');
        setLoading(false);
        console.error('Error fetching policies:', err);
      }
    };

    fetchPolicies();
  }, []);

  useEffect(() => {
    if (annualIncome && policies.length > 0) {
      const income = parseInt(annualIncome);
      if (income < 100000) {
        setRecommendedPolicies([]);
      } else {
        const recommended = policies.filter(policy => {
          const premium = policy.premium;
          // Recommend policies where premium is between 5% and 15% of annual income
          return premium >= income * 0.05 && premium <= income * 0.15;
        });
        setRecommendedPolicies(recommended);
      }
    } else {
      setRecommendedPolicies([]);
    }
  }, [annualIncome, policies]);

  const handleViewDetails = (policyId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // Extract the number from policyId (e.g., "HP1" -> "1")
    const id = policyId.replace('HP', '');
    navigate(`/hpolicy${id}`);
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setAnnualIncome(value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleShowAllPlans = () => {
    setShowAllPlans(!showAllPlans);
  };

  const getSortedPolicies = () => {
    const policiesToSort = showAllPlans ? policies : recommendedPolicies;
    
    if (sortOrder === "none") return policiesToSort;
    
    return [...policiesToSort].sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.premium - b.premium;
      } else {
        return b.premium - a.premium;
      }
    });
  };

  if (loading) {
    return <div className="loading">Loading policies...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="health-policies">
      <h1>Health Insurance Plans</h1>
      
      <div className="income-input-container">
        <label htmlFor="annualIncome">Enter Your Annual Income (₹)</label>
        <input
          type="text"
          id="annualIncome"
          value={annualIncome}
          onChange={handleIncomeChange}
          placeholder="Enter your annual income"
          className="income-input"
        />
      </div>

      <div className="controls-container">
        <div className="sort-container">
          <label htmlFor="sortOrder">Sort by Price:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="none">No Sorting</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
        
        <button
          className={`show-all-btn ${showAllPlans ? 'active' : ''}`}
          onClick={handleShowAllPlans}
        >
          {showAllPlans ? 'Show Recommended Plans' : 'Show All Plans'}
        </button>
      </div>

      {!annualIncome && (
        <div className="empty-state">
          <p>Please enter your annual income to see recommended health insurance plans.</p>
        </div>
      )}

      {annualIncome && (
        <div className="recommendation-info">
          <h2>{showAllPlans ? 'All Available Health Insurance Plans' : 'Recommended Health Insurance Plans'}</h2>
          <p>Based on your annual income of ₹{annualIncome}</p>
        </div>
      )}

      <div className="policy-list">
        {getSortedPolicies().map((policy) => (
          <div 
            key={policy.policyId} 
            className={`policy-card ${!showAllPlans ? 'recommended' : ''}`}
          >
            {!showAllPlans && (
              <div className="recommended-badge">Recommended</div>
            )}
            <h2>{policy.title}</h2>
            <p className="price">₹{policy.premium} <span style={{fontSize: '0.9em', color: '#888'}}>/year</span></p>
            <p className="coverage">{policy.description}</p>
            <ul>
              {policy.features.map((feature, index) => (
                <li key={index}>{feature.title}: {feature.description}</li>
              ))}
            </ul>
            <button
              className="select-btn"
              onClick={() => handleViewDetails(policy.policyId)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthPoliciesPage;
