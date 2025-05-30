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
      } finally {
        // Added a finally block to ensure loading is set to false even if there's an error
        // Although it's already covered by the catch block in this case, it's good practice.
      }
    };

    fetchPolicies();
  }, []);

  useEffect(() => {
    if (annualIncome && policies.length > 0) {
      const income = parseInt(annualIncome);
      if (isNaN(income) || income <= 0) {
        // Handle invalid income input if necessary, or just clear recommendations
        setRecommendedPolicies([]);
      } else if (income < 100000) {
        setRecommendedPolicies([]); // Keep the original logic for income < 100000
      } else {
        const recommended = policies.filter(policy => {
          const premium = parseFloat(policy.premium); // Ensure premium is treated as a number
          // Recommend policies where premium is between 5% and 15% of annual income
          return premium >= income * 0.05 && premium <= income * 0.15;
        });
        setRecommendedPolicies(recommended);
      }
    } else {
      // If no annual income is entered, clear recommendations
      setRecommendedPolicies([]);
    }
  }, [annualIncome, policies]);

  const handleViewDetails = (policyId) => {
    if (!isLoggedIn) {
      // Use navigate function correctly
      navigate('/login');
      return;
    }
    // Extract the number from policyId (e.g., "HP1" -> "1")
    const id = policyId.replace('HP', '');
    // Use navigate function correctly with template literal
    navigate(`/hpolicy${id}`);
  };

  const handleIncomeChange = (e) => {
    // Allow only digits in the income input
    const value = e.target.value.replace(/\D/g, '');
    setAnnualIncome(value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleShowAllPlans = () => {
    // Toggle between showing all plans and recommended plans
    setShowAllPlans(!showAllPlans);
  };

  const getSortedPolicies = () => {
    // Determine which list of policies to sort
    const policiesToSort = showAllPlans ? policies : recommendedPolicies;
    
    // If no sorting is selected, return the list as is
    if (sortOrder === "none") return policiesToSort;
    
    // Sort the policies based on premium
    return [...policiesToSort].sort((a, b) => {
      const premiumA = parseFloat(a.premium);
      const premiumB = parseFloat(b.premium);
      if (sortOrder === "lowToHigh") {
        return premiumA - premiumB;
      } else {
        return premiumB - premiumA;
      }
    });
  };

  if (loading) {
    return <div className="loading">Loading policies...</div>; // Basic loading indicator
  }

  if (error) {
    return <div className="error">Error: {error}</div>; // Basic error message
  }

  return (
    <div className="health-policies">
      <h1>Health Insurance Plans</h1>
      
      {/* Income Input Section */}
      <div className="income-input-container">
        <label htmlFor="annualIncome">Enter Your Annual Income (₹)</label>
        <input
          type="text" // Changed type to text to allow replace for non-digits
          id="annualIncome"
          value={annualIncome}
          onChange={handleIncomeChange}
          placeholder="Enter your annual income"
          className="income-input"
        />
      </div>

      {/* Controls Section (Sort and Show All/Recommended) */}
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
          className={`show-all-btn ${showAllPlans ? 'active' : ''}`} // Using template literal for class names
          onClick={handleShowAllPlans}
        >
          {showAllPlans ? 'Show Recommended Plans' : 'Show All Plans'}
        </button>
      </div>

      {/* Conditional message based on income input */}
      {!annualIncome && (policies.length > 0) && ( // Only show if policies are loaded and no income is entered
        <div className="empty-state">
          <p>Please enter your annual income to see recommended health insurance plans.</p>
        </div>
      )}

      {/* Recommendation Info Header */}
      {annualIncome && (
        <div className="recommendation-info">
          <h2>{showAllPlans ? 'All Available Health Insurance Plans' : 'Recommended Health Insurance Plans'}</h2>
          <p>Based on your annual income of ₹{annualIncome}</p>
        </div>
      )}

      {/* Policy List Section - Rendering cards directly */}
      <div className="policy-list">
        {getSortedPolicies().map((policy) => (
          <div 
            key={policy.policyId} 
            className={`policy-card ${!showAllPlans && annualIncome ? 'recommended' : ''}`} // Apply 'recommended' class only if showing recommended policies
          >
            {/* Recommended Badge (conditionally rendered based on 'recommended' class) */}
            {!showAllPlans && annualIncome && ( // Only show badge if showing recommended and income is entered
              <div className="recommended-badge">Recommended</div>
            )}
            
            {/* Policy Details */}
            <h2>{policy.title}</h2>
            <p className="price">₹{policy.premium} <span style={{fontSize: '0.9em', color: '#888'}}>/year</span></p>
            <p className="coverage">{policy.description}</p>
            
            {/* Features List */}
            <ul>
              {policy.features.map((feature, index) => (
                <li key={index}>{feature.title}: {feature.description}</li>
              ))}
            </ul>
            
            {/* View Details Button */}
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
