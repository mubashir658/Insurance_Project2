import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./HealthPoliciesPage.css";

const HealthPoliciesPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [annualIncome, setAnnualIncome] = useState(() => {
    return localStorage.getItem('healthPolicyIncome') || "";
  });
  const [age, setAge] = useState(() => {
    return localStorage.getItem('healthPolicyAge') || "";
  });
  const [familySize, setFamilySize] = useState(() => {
    return localStorage.getItem('healthPolicyFamilySize') || "1";
  });
  const [preExistingConditions, setPreExistingConditions] = useState(() => {
    const saved = localStorage.getItem('healthPolicyConditions');
    return saved ? JSON.parse(saved) : [];
  });
  const [lifestyle, setLifestyle] = useState(() => {
    return localStorage.getItem('healthPolicyLifestyle') || "moderate";
  });
  const [policies, setPolicies] = useState([]);
  const [recommendedPolicies, setRecommendedPolicies] = useState([]);
  const [sortOrder, setSortOrder] = useState("none");
  const [showAllPlans, setShowAllPlans] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const preExistingOptions = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "None"
  ];

  const lifestyleOptions = [
    { value: "sedentary", label: "Sedentary (Office work, minimal exercise)" },
    { value: "moderate", label: "Moderate (Regular exercise, active lifestyle)" },
    { value: "active", label: "Active (Sports, heavy physical activity)" }
  ];

  // Fetch policies from backend
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/policies');
        const healthPolicies = response.data.filter(policy => policy.type === 'Health');
        
        // Map the policies to match their corresponding HPolicy pages
        const mappedPolicies = healthPolicies.map(policy => {
          const policyId = policy.policyId;
          let policyData = { ...policy };
          
          // Map policy data based on policyId
          switch(policyId) {
            case 'HP2':
              policyData = {
                ...policy,
                title: "Niva Bupa Aspire Gold+ Value (Direct)",
                description: "Premium health coverage with extensive benefits",
                premium: 5550,
                features: [
                  { title: "234+ Cashless Hospitals", description: "With anywhere support" },
                  { title: "Private AC Room", description: "Comfortable recovery space" },
                  { title: "Day Care Treatments", description: "All procedures covered" },
                  { title: "Global Coverage", description: "40+ countries included" }
                ]
              };
              break;
            case 'HP3':
              policyData = {
                ...policy,
                title: "Super Star",
                description: "Premium health coverage with unlimited benefits",
                premium: 7998,
                features: [
                  { title: "485+ Cashless Hospitals", description: "With anywhere network support" },
                  { title: "Premium Partnership", description: "Policybazaar 5 Star Partner" },
                  { title: "Renewal Benefits", description: "100% additional sum insured on renewal" },
                  { title: "Unlimited Claim Restoration", description: "Lifetime coverage protection" }
                ]
              };
              break;
            case 'HP4':
              policyData = {
                ...policy,
                title: "Senior Citizen Health Plan",
                description: "Specialized health coverage for senior citizens",
                premium: 42000,
                features: [
                  { title: "Specialized Senior Care", description: "Dedicated senior care specialists" },
                  { title: "Pre-existing Coverage", description: "Coverage for existing conditions" },
                  { title: "Home Healthcare", description: "In-home medical services" },
                  { title: "Annual Health Checkup", description: "Comprehensive senior health screening" }
                ]
              };
              break;
            case 'HP5':
              policyData = {
                ...policy,
                title: "Student Health Plan",
                description: "Affordable health coverage for students",
                premium: 6000,
                features: [
                  { title: "Basic Hospitalization", description: "Essential medical coverage" },
                  { title: "Accident Coverage", description: "24/7 emergency support" },
                  { title: "Mental Health Support", description: "Counseling and therapy coverage" },
                  { title: "Online Consultation", description: "Virtual doctor visits" }
                ]
              };
              break;
            case 'HP6':
              policyData = {
                ...policy,
                title: "Maternity Health Plan",
                description: "Comprehensive coverage for maternity care",
                premium: 36000,
                features: [
                  { title: "Prenatal Care", description: "Regular checkups and tests" },
                  { title: "Delivery Coverage", description: "Normal and C-section delivery" },
                  { title: "Newborn Care", description: "Comprehensive baby care" },
                  { title: "Postnatal Support", description: "Mother and baby wellness" }
                ]
              };
              break;
            case 'HP7':
              policyData = {
                ...policy,
                title: "Critical Illness Plan",
                description: "Specialized coverage for critical illnesses",
                premium: 48000,
                features: [
                  { title: "Major Illness Coverage", description: "Coverage for critical diseases" },
                  { title: "Lump Sum Payout", description: "Immediate financial support" },
                  { title: "Rehabilitation Support", description: "Post-treatment care" },
                  { title: "Second Opinion Service", description: "Expert medical consultation" }
                ]
              };
              break;
            case 'HP8':
              policyData = {
                ...policy,
                title: "Corporate Health Plan",
                description: "Comprehensive health coverage for corporate employees",
                premium: 21600,
                features: [
                  { title: "Group Coverage", description: "Coverage for all employees" },
                  { title: "Employee Benefits", description: "Comprehensive health benefits" },
                  { title: "Family Add-on", description: "Optional family coverage" },
                  { title: "Wellness Programs", description: "Health and fitness initiatives" }
                ]
              };
              break;
            case 'HP9':
              policyData = {
                ...policy,
                title: "Rural Health Plan",
                description: "Affordable health coverage for rural areas",
                premium: 4800,
                features: [
                  { title: "Basic Healthcare", description: "Essential medical services" },
                  { title: "Emergency Transport", description: "24/7 ambulance service" },
                  { title: "Telemedicine", description: "Remote doctor consultation" },
                  { title: "Local Network", description: "Access to nearby hospitals" }
                ]
              };
              break;
            case 'HP10':
              policyData = {
                ...policy,
                title: "Comprehensive Health Plan",
                description: "Premium health coverage with global benefits",
                premium: 60000,
                features: [
                  { title: "International Treatment", description: "Global medical coverage" },
                  { title: "Luxury Hospital Access", description: "Premium healthcare facilities" },
                  { title: "Personal Health Manager", description: "Dedicated health concierge" },
                  { title: "Full Coverage", description: "Comprehensive medical benefits" }
                ]
              };
              break;
            case 'HP11':
              policyData = {
                ...policy,
                title: "Diabetes Care Plan",
                description: "Specialized coverage for diabetes care",
                premium: 30000,
                features: [
                  { title: "Specialized Care", description: "Diabetes-specific treatment" },
                  { title: "Regular Checkups", description: "Frequent health monitoring" },
                  { title: "Nutrition Counseling", description: "Dietary guidance and support" },
                  { title: "Complication Coverage", description: "Coverage for related conditions" }
                ]
              };
              break;
            case 'HP12':
              policyData = {
                ...policy,
                title: "Wellness Health Plan",
                description: "Comprehensive wellness and preventive care",
                premium: 18000,
                features: [
                  { title: "Preventive Care", description: "Health maintenance programs" },
                  { title: "Fitness Programs", description: "Exercise and wellness plans" },
                  { title: "Nutrition Guidance", description: "Diet and lifestyle support" },
                  { title: "Mental Wellness", description: "Stress management support" }
                ]
              };
              break;
          }
          return policyData;
        });
        
        setPolicies(mappedPolicies);
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
    if (policies.length > 0) {
      const income = parseInt(annualIncome) || 0;
      const userAge = parseInt(age) || 0;
      const familyMembers = parseInt(familySize) || 1;
      const isFamilyOrCouple = familyMembers > 1;
      
      const recommended = policies.filter(policy => {
        const premium = parseFloat(policy.premium);
        
        // More flexible premium range for high-income users
        const minPremium = income * 0.02; // Lower threshold for high-income users
        const maxPremium = income * 0.15;
        const baseMatch = income === 0 || (premium >= minPremium && premium <= maxPremium);

        // Exclude student plans for couples and families
        const isStudentPlan = policy.title.toLowerCase().includes("student");
        if (isStudentPlan && isFamilyOrCouple) {
          return false;
        }

        // Age-based matching with more flexibility
        const ageMatch = userAge === 0 || (
          (userAge >= 60 && (policy.title.includes("Senior") || policy.title.includes("Care"))) ||
          (userAge <= 25 && !isFamilyOrCouple && policy.title.includes("Student")) ||
          (userAge > 25 && userAge < 60)
        );

        // Family size matching with more options
        const familyMatch = 
          familyMembers <= 1 || 
          policy.title.includes("Family") || 
          policy.title.includes("Plus") ||
          policy.features.some(f => f.title.includes("Family") || f.title.includes("Dependent"));

        // Pre-existing conditions matching with broader coverage
        const conditionMatch = preExistingConditions.length === 0 || 
          preExistingConditions.some(condition => 
            policy.title.toLowerCase().includes(condition.toLowerCase()) ||
            policy.title.toLowerCase().includes("care") ||
            policy.features.some(feature => 
              feature.title.toLowerCase().includes(condition.toLowerCase()) ||
              feature.title.toLowerCase().includes("disease") ||
              feature.title.toLowerCase().includes("medical")
            )
          );

        // Lifestyle matching with broader criteria
        const lifestyleMatch = 
          (lifestyle === "active" && (
            policy.features.some(f => 
              f.title.includes("Sports") || 
              f.title.includes("Activity") || 
              f.title.includes("Fitness")
            )
          )) ||
          (lifestyle === "sedentary" && (
            policy.features.some(f => 
              f.title.includes("Regular Check") || 
              f.title.includes("Preventive") ||
              f.title.includes("Wellness")
            )
          )) ||
          (lifestyle === "moderate");

        // Combine all conditions with weighted importance
        const conditions = [
          { match: baseMatch, weight: 1.5 },      // Premium range is most important
          { match: ageMatch, weight: 1.2 },       // Age match is second most important
          { match: familyMatch, weight: 1.2 },    // Family match is equally important
          { match: conditionMatch, weight: 1.0 }, // Pre-existing conditions
          { match: lifestyleMatch, weight: 0.8 }  // Lifestyle is least important
        ];

        // Calculate weighted score
        const weightedScore = conditions.reduce((score, { match, weight }) => 
          score + (match ? weight : 0), 0);

        // Only include policies that meet the minimum threshold
        return weightedScore >= 2.0; // At least 2 conditions must match
      });

      // Enhanced scoring system
      const scoredPolicies = recommended.map(policy => {
        let score = 0;
        
        // Premium score (more flexible for high-income users)
        if (income > 0) {
          const idealPremium = income * 0.05; // Lower ideal percentage for high-income users
          const premiumDiff = Math.abs(policy.premium - idealPremium);
          score += 100 - (premiumDiff / idealPremium * 100);
        }

        // Age relevance with more weight
        if (userAge > 0) {
          if (userAge >= 60 && (policy.title.includes("Senior") || policy.title.includes("Care"))) score += 60;
          if (userAge <= 25 && !isFamilyOrCouple && policy.title.includes("Student")) score += 60;
          if (userAge > 25 && userAge < 60) score += 40;
        }

        // Family relevance with more options
        if (familyMembers > 1) {
          if (policy.title.includes("Family")) score += 50;
          if (policy.title.includes("Plus")) score += 40;
          if (policy.features.some(f => f.title.includes("Family") || f.title.includes("Dependent"))) score += 30;
        }

        // Enhanced pre-existing conditions matching with higher weights
        preExistingConditions.forEach(condition => {
          // Direct title match gets highest weight
          if (policy.title.toLowerCase().includes(condition.toLowerCase())) {
            score += 100;
          }
          
          // Policy type match gets high weight
          if (policy.title.toLowerCase().includes("care") || 
              policy.title.toLowerCase().includes("health")) {
            score += 80;
          }

          // Feature match gets medium weight
          policy.features.forEach(feature => {
            if (feature.title.toLowerCase().includes(condition.toLowerCase())) {
              score += 70;
            }
            if (feature.description.toLowerCase().includes(condition.toLowerCase())) {
              score += 60;
            }
          });

          // Special handling for specific conditions
          switch(condition.toLowerCase()) {
            case "diabetes":
              if (policy.title.toLowerCase().includes("diabetes") || 
                  policy.features.some(f => f.title.toLowerCase().includes("diabetes"))) {
                score += 90;
              }
              break;
            case "cancer":
              if (policy.title.toLowerCase().includes("cancer") || 
                  policy.features.some(f => f.title.toLowerCase().includes("cancer"))) {
                score += 90;
              }
              break;
            case "heart disease":
              if (policy.title.toLowerCase().includes("heart") || 
                  policy.features.some(f => f.title.toLowerCase().includes("heart"))) {
                score += 90;
              }
              break;
            case "hypertension":
              if (policy.title.toLowerCase().includes("hypertension") || 
                  policy.features.some(f => f.title.toLowerCase().includes("hypertension"))) {
                score += 90;
              }
              break;
            case "asthma":
              if (policy.title.toLowerCase().includes("asthma") || 
                  policy.features.some(f => f.title.toLowerCase().includes("asthma"))) {
                score += 90;
              }
              break;
          }
        });

        // Lifestyle relevance with broader criteria
        if (lifestyle === "active") {
          if (policy.features.some(f => 
            f.title.includes("Sports") || 
            f.title.includes("Activity") || 
            f.title.includes("Fitness")
          )) score += 40;
        }
        if (lifestyle === "sedentary") {
          if (policy.features.some(f => 
            f.title.includes("Regular Check") || 
            f.title.includes("Preventive") ||
            f.title.includes("Wellness")
          )) score += 40;
        }

        return { ...policy, relevanceScore: score };
      });

      // Sort by relevance score and take top 5
      const sortedPolicies = scoredPolicies
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 5);

      setRecommendedPolicies(sortedPolicies);
    }
  }, [annualIncome, age, familySize, preExistingConditions, lifestyle, policies]);

  const handleViewDetails = (policyId) => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    const id = policyId.replace('HP', '');
    navigate(`/hpolicy${id}`);
  };

  const handleIncomeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setAnnualIncome(value);
    localStorage.setItem('healthPolicyIncome', value);
    setRefreshKey(prev => prev + 1);
  };

  const handleAgeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setAge(value);
    localStorage.setItem('healthPolicyAge', value);
    setRefreshKey(prev => prev + 1);
  };

  const handleFamilySizeChange = (e) => {
    setFamilySize(e.target.value);
    localStorage.setItem('healthPolicyFamilySize', e.target.value);
    setRefreshKey(prev => prev + 1);
  };

  const handlePreExistingChange = (e) => {
    const value = e.target.value;
    if (value === "None") {
      setPreExistingConditions([]);
      localStorage.setItem('healthPolicyConditions', JSON.stringify([]));
    } else {
      const newConditions = preExistingConditions.includes(value)
        ? preExistingConditions.filter(item => item !== value)
        : [...preExistingConditions, value];
      setPreExistingConditions(newConditions);
      localStorage.setItem('healthPolicyConditions', JSON.stringify(newConditions));
    }
    setRefreshKey(prev => prev + 1);
  };

  const handleLifestyleChange = (e) => {
    setLifestyle(e.target.value);
    localStorage.setItem('healthPolicyLifestyle', e.target.value);
    setRefreshKey(prev => prev + 1);
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
    return <div className="loading">Loading policies...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="health-policies">
      <h1>Health Insurance Plans</h1>
      
      {/* User Inputs Section */}
      <div className="user-inputs-container">
        <div className="input-group">
          <label htmlFor="annualIncome">Annual Income (₹)</label>
          <input
            type="text"
            id="annualIncome"
            value={annualIncome}
            onChange={handleIncomeChange}
            placeholder="Enter your annual income"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={handleAgeChange}
            placeholder="Enter your age"
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label htmlFor="familySize">Family Size</label>
          <select
            id="familySize"
            value={familySize}
            onChange={handleFamilySizeChange}
            className="input-field"
          >
            <option value="1">Single</option>
            <option value="2">Couple</option>
            <option value="3">Small Family (3-4)</option>
            <option value="5">Large Family (5+)</option>
          </select>
        </div>

        <div className="input-group">
          <label>Pre-existing Conditions</label>
          <select
            value={preExistingConditions.length === 0 ? "None" : ""}
            onChange={handlePreExistingChange}
            className="input-field"
          >
            <option value="None">Select a condition</option>
            {preExistingOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {preExistingConditions.length > 0 && (
            <div className="selected-conditions">
              {preExistingConditions.map(condition => (
                <span key={condition} className="condition-tag">
                  {condition}
                  <button onClick={() => handlePreExistingChange({ target: { value: condition } })}>×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="input-group">
          <label>Lifestyle</label>
          <select
            value={lifestyle}
            onChange={handleLifestyleChange}
            className="input-field"
          >
            {lifestyleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Controls Section */}
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

      {/* Empty State */}
      {!annualIncome && policies.length > 0 && (
        <div className="empty-state">
          <p>Please enter your details to see recommended health insurance plans.</p>
        </div>
      )}

      {/* Recommendation Info */}
      {annualIncome && (
        <div className="recommendation-info">
          <h2>{showAllPlans ? 'All Available Health Insurance Plans' : 'Recommended Health Insurance Plans'}</h2>
          <p>Based on your profile:</p>
          <ul>
            <li>Annual Income: ₹{annualIncome}</li>
            {age && <li>Age: {age} years</li>}
            <li>Family Size: {familySize === "1" ? "Single" : 
              familySize === "2" ? "Couple" :
              familySize === "3" ? "Small Family" : "Large Family"}</li>
            {preExistingConditions.length > 0 && (
              <li>Pre-existing Conditions: {preExistingConditions.join(", ")}</li>
            )}
            <li>Lifestyle: {lifestyleOptions.find(opt => opt.value === lifestyle)?.label}</li>
          </ul>
        </div>
      )}

      {/* Policy List */}
      <div className="policy-list">
        {getSortedPolicies().map((policy) => (
          <div 
            key={policy.policyId} 
            className={`policy-card ${!showAllPlans && annualIncome ? 'recommended' : ''}`}
          >
            {!showAllPlans && annualIncome && (
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
              className="view-details-btn"
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
