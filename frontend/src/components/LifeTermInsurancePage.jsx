import React from "react";
import "./HealthPoliciesPage.css"; // Reusing the same CSS

const lifePolicies = [
  {
    insurer: "LIC",
    name: "Tech Term Plus",
    term: 35,
    features: [
      "Flexible Premium Payment Term",
      "Critical Illness Cover",
      "Tax Benefits under 80C & 10(10D)",
      "Accidental Death Benefit"
    ],
    cover: "₹1 Cr",
    premium: "₹833/month",
    annual: "₹9,996",
    claimSettle: "99.7",
    rating: 4.8,
    popular: true,
    tag: "Best Seller"
  },
  {
    insurer: "HDFC Life",
    name: "Click 2 Protect Life",
    term: 40,
    features: [
      "8 Critical Illnesses Covered",
      "Option to Increase Cover",
      "Return of Premium Option",
      "Waiver of Premium"
    ],
    cover: "₹2 Cr",
    premium: "₹1,245/month",
    annual: "₹14,940",
    claimSettle: "99.2",
    rating: 4.6,
    tag: "High Coverage"
  },
  {
    insurer: "Max Life",
    name: "Smart Secure Plan",
    term: 30,
    features: [
      "Whole Life Coverage Option",
      "Critical Illness Rider",
      "Premium Payment Flexibility",
      "Loyalty Additions"
    ],
    cover: "₹75 Lakh",
    premium: "₹689/month",
    annual: "₹8,268",
    claimSettle: "99.5",
    rating: 4.7,
    popular: true
  },
  {
    insurer: "SBI Life",
    name: "eShield Next",
    term: 25,
    features: [
      "Income Tax Benefits",
      "Terminal Illness Benefit",
      "Convertible to Whole Life",
      "Suicide Cover After 1 Year"
    ],
    cover: "₹50 Lakh",
    premium: "₹432/month",
    annual: "₹5,184",
    claimSettle: "98.9",
    rating: 4.4,
    tag: "Budget Friendly"
  },
  {
    insurer: "ICICI Pru",
    name: "iProtect Smart",
    term: 40,
    features: [
      "Option for Life Extension",
      "Critical Illness Protection",
      "Accelerated Payout Option",
      "5 Free Look Period"
    ],
    cover: "₹1.5 Cr",
    premium: "₹1,099/month",
    annual: "₹13,188",
    claimSettle: "99.3",
    rating: 4.5
  },
];

const LifeTermInsurancePage = () => {
  return (
    <div className="health-policies-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Secure Your Family's Future with Term Life Insurance</h1>
          <p className="subtitle">Compare affordable plans with high coverage from top insurers</p>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-value">25+</div>
              <div className="stat-label">Insurance Partners</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">99.5%</div>
              <div className="stat-label">Claim Settlement</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">40 Yrs</div>
              <div className="stat-label">Max Coverage Term</div>
            </div>
          </div>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-options">
          <button className="filter-btn active">All Plans</button>
          <button className="filter-btn">Most Popular</button>
          <button className="filter-btn">Lowest Premium</button>
          <button className="filter-btn">Longest Term</button>
        </div>
        <div className="sort-options">
          <span>Sort by:</span>
          <select className="sort-select">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Coverage Amount</option>
            <option>Policy Term</option>
          </select>
        </div>
      </div>

      <div className="policy-grid-container">
        <div className="policy-grid">
          {lifePolicies.map((policy, idx) => (
            <div className={`policy-card ${policy.popular ? "popular" : ""}`} key={idx}>
              {policy.popular && <div className="popular-badge">Most Popular</div>}
              {policy.tag && <div className="tag-badge">{policy.tag}</div>}
              
              <div className="card-header">
                <div className="insurer-logo">
                  <div className="logo-placeholder">{policy.insurer.charAt(0)}</div>
                  <div className="insurer-info">
                    <h3>{policy.insurer}</h3>
                    <div className="rating">
                      <span className="stars">{"★".repeat(Math.floor(policy.rating))}{"☆".repeat(5-Math.floor(policy.rating))}</span>
                      <span className="rating-value">{policy.rating}</span>
                    </div>
                  </div>
                </div>
                <h4>{policy.name}</h4>
                <div className="hospital-count">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  {policy.term} Year Term Plan
                </div>
              </div>

              <div className="card-features">
                <ul>
                  {policy.features.map((feature, i) => (
                    <li key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <div className="policy-stats">
                  <div className="stat">
                    <div className="stat-label">Cover</div>
                    <div className="stat-value">{policy.cover}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Premium</div>
                    <div className="stat-value">{policy.premium}</div>
                  </div>
                  <div className="stat">
                    <div className="stat-label">Claim Settlement</div>
                    <div className="stat-value">{policy.claimSettle}%</div>
                  </div>
                </div>
                <div className="card-actions">
                  <button className="compare-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="16 3 21 3 21 8"></polyline>
                      <line x1="4" y1="20" x2="21" y2="3"></line>
                      <polyline points="21 16 21 21 16 21"></polyline>
                      <line x1="15" y1="15" x2="21" y2="21"></line>
                      <line x1="4" y1="4" x2="9" y2="9"></line>
                    </svg>
                    Compare
                  </button>
                  <button className="view-details-btn">
                    View Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="disclaimer">
        <p>Note: Premiums shown are for a healthy 30-year-old non-smoker. Actual premium may vary based on medical history and lifestyle factors.</p>
      </div>
    </div>
  );
};

export default LifeTermInsurancePage;