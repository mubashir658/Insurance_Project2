import React from "react";
import "./HealthPoliciesPage.css";

const healthPolicies = [
  {
    id: 1,
    name: "Basic Health Plan",
    price: "₹650/month",
    coverage: "Up to ₹2 lakh",
    features: ["Covers hospitalization", "OPD consultation", "24/7 customer support"],
  },
  {
    id: 2,
    name: "Family Health Plan",
    price: "₹2000/month",
    coverage: "Up to ₹5 lakh",
    features: ["Covers entire family", "Cashless claims", "Emergency ambulance", "Free annual checkup"],
  },
  {
    id: 3,
    name: "Premium Health Plan",
    price: "₹2500/month",
    coverage: "Up to ₹10 lakh",
    features: ["High coverage", "Global medical access", "No waiting period", "Dental & vision care"],
  },
];

const HealthPoliciesPage = () => {
  return (
    <div className="health-policies">
      <h1>Affordable Health Insurance Plans</h1>
      <div className="policy-list">
        {healthPolicies.map((policy) => (
          <div key={policy.id} className="policy-card">
            <h2>{policy.name}</h2>
            <p className="price">{policy.price}</p>
            <p className="coverage">Coverage: {policy.coverage}</p>
            <ul>
              {policy.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className="select-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthPoliciesPage;
