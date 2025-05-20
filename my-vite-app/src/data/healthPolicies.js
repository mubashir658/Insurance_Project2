export const healthPolicies = [
  {
    id: 1,
    name: "Silver Health Plan",
    price: "₹800/month",
    coverage: "Up to ₹3 lakh",
    features: ["Basic hospitalization", "OPD consultation", "Emergency ambulance"],
    incomeRange: [0, 400000],
    recommended: false
  },
  {
    id: 2,
    name: "Gold Health Plan",
    price: "₹1500/month",
    coverage: "Up to ₹7 lakh",
    features: ["Family coverage", "Cashless claims", "Annual health checkup", "Dental care"],
    incomeRange: [400000, 900000],
    recommended: false
  },
  {
    id: 3,
    name: "Platinum Health Plan",
    price: "₹3000/month",
    coverage: "Up to ₹15 lakh",
    features: ["Comprehensive coverage", "Global treatment", "No waiting period", "Luxury hospital access"],
    incomeRange: [900000, 2000000],
    recommended: false
  },
  {
    id: 4,
    name: "Diamond Health Plan",
    price: "₹5000/month",
    coverage: "Up to ₹25 lakh",
    features: ["Premium coverage", "International treatment", "Personal health manager", "Concierge service"],
    incomeRange: [2000000, 5000000],
    recommended: false
  },
  {
    id: 5,
    name: "Student Health Plan",
    price: "₹500/month",
    coverage: "Up to ₹1 lakh",
    features: ["Basic hospitalization", "Accident coverage", "Mental health support", "Online doctor consultation"],
    incomeRange: [0, 200000],
    recommended: false
  },
  {
    id: 6,
    name: "Family First Plan",
    price: "₹2500/month",
    coverage: "Up to ₹10 lakh",
    features: ["Family coverage", "Maternity benefits", "Child care", "Vaccination cover"],
    incomeRange: [500000, 1200000],
    recommended: false
  },
  {
    id: 7,
    name: "Senior Care Plan",
    price: "₹4000/month",
    coverage: "Up to ₹20 lakh",
    features: ["Senior-specific care", "Pre-existing coverage", "Home healthcare", "Regular checkups"],
    incomeRange: [800000, 1500000],
    recommended: false
  },
  {
    id: 8,
    name: "Corporate Shield Plan",
    price: "₹2000/month",
    coverage: "Up to ₹8 lakh",
    features: ["Group coverage", "Employee benefits", "Family add-on", "Wellness programs"],
    incomeRange: [600000, 1200000],
    recommended: false
  },
  {
    id: 9,
    name: "Rural Care Plan",
    price: "₹500/month",
    coverage: "Up to ₹2 lakh",
    features: ["Basic healthcare", "Emergency transport", "Telemedicine", "Local hospital network"],
    incomeRange: [0, 250000],
    recommended: false
  },
  {
    id: 10,
    name: "Elite Health Plan",
    price: "₹6000/month",
    coverage: "Up to ₹30 lakh",
    features: ["Premium coverage", "International treatment", "Luxury hospital access", "Personal health manager"],
    incomeRange: [2500000, 6000000],
    recommended: false
  },
  {
    id: 11,
    name: "Special Care Plan",
    price: "₹3500/month",
    coverage: "Up to ₹12 lakh",
    features: ["Specialized care", "Regular checkups", "Nutrition counseling", "Complication coverage"],
    incomeRange: [700000, 1500000],
    recommended: false
  },
  {
    id: 12,
    name: "Wellness Plus Plan",
    price: "₹1200/month",
    coverage: "Up to ₹5 lakh",
    features: ["Preventive care", "Fitness programs", "Nutrition guidance", "Mental wellness support"],
    incomeRange: [300000, 700000],
    recommended: false
  }
];

export const recommendPolicies = (annualIncome) => {
  // Reset recommended flag for all policies
  healthPolicies.forEach(policy => policy.recommended = false);
  
  // Find policies that match the income range
  const matchingPolicies = healthPolicies.filter(policy => 
    annualIncome >= policy.incomeRange[0] && annualIncome <= policy.incomeRange[1]
  );
  
  // If we have 3 or more matching policies, return 3
  if (matchingPolicies.length >= 3) {
    const recommended = matchingPolicies.slice(0, 3);
    recommended.forEach(policy => policy.recommended = true);
    return recommended;
  }
  
  // If we have less than 3 matching policies, add policies from higher income ranges
  const remainingCount = 3 - matchingPolicies.length;
  const higherIncomePolicies = healthPolicies
    .filter(policy => policy.incomeRange[0] > annualIncome)
    .sort((a, b) => a.incomeRange[0] - b.incomeRange[0])
    .slice(0, remainingCount);
  
  const allRecommended = [...matchingPolicies, ...higherIncomePolicies];
  allRecommended.forEach(policy => policy.recommended = true);
  return allRecommended;
}; 