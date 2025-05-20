import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { healthPolicies, recommendPolicies } from "../data/healthPolicies";
import "./HealthPoliciesPage.css";

const HealthPoliciesPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [annualIncome, setAnnualIncome] = useState("");
  const [recommendedPolicies, setRecommendedPolicies] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [showAllPlans, setShowAllPlans] = useState(false);

  useEffect(() => {
    if (annualIncome) {
      const recommended = recommendPolicies(parseInt(annualIncome));
      setRecommendedPolicies(recommended);
    } else {
      
      setRecommendedPolicies([]);
    }
  }, [annualIncome]);

  const handleViewDetails = (id) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate(`/hpolicy${id}`);
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setAnnualIncome(value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleShowAllPlans = () => {
    setShowAllPlans(!showAllPlans);
  };

  const getSortedPolicies = () => {
    const policiesToSort = showAllPlans ? healthPolicies : recommendedPolicies;
    
    if (sortOrder === "none") return policiesToSort;
    
    return [...policiesToSort].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
      
      if (sortOrder === "lowToHigh") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  };

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

      {annualIncome && (
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
      )}

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
            key={policy.id} 
            className={`policy-card ${policy.recommended && !showAllPlans ? 'recommended' : ''}`}
          >
            {policy.recommended && !showAllPlans && (
              <div className="recommended-badge">Recommended</div>
            )}
            <h2>{policy.name}</h2>
            <p className="price">{policy.price}</p>
            <p className="coverage">Coverage: {policy.coverage}</p>
            <ul>
              {policy.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              className="select-btn"
              onClick={() => handleViewDetails(policy.id)}
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
