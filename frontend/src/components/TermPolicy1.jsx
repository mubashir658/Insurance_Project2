import React from 'react';
import PolicyTemplate from './PolicyTemplate';
import './PolicyTemplate.css';

const TermPolicy1 = () => {
  const policyData = {
    name: "HDFC Life Click 2 Protect Super",
    insurer: "HDFC Life",
    badge: "Best Seller",
    cover: "1 Crore",
    durations: {
      "10Y": 1021,
      "15Y": 1320,
      "20Y": 1580
    },
    features: [
      {
        icon: "shield-alt",
        title: "Life Cover",
        description: "Up to ₹1 Crore coverage"
      },
      {
        icon: "calendar-alt",
        title: "Cover Till",
        description: "60 Years of Age"
      },
      {
        icon: "wallet",
        title: "Payment Term",
        description: "Pay for 40 Years"
      }
    ],
    riders: [
      { id: 1, name: "Accidental Death Benefit", price: 150 },
      { id: 2, name: "Critical Illness Cover", price: 300 }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default TermPolicy1;