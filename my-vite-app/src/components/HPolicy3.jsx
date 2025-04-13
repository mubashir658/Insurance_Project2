import PolicyTemplate from './PolicyTemplate';
import { 
  faHospital,
  faShieldHeart,
  faInfinity,
  faStar,
  faGem // New icon for Limitless Care
} from "@fortawesome/free-solid-svg-icons";

const HPolicy3 = () => {
  const policyData = {
    name: "Super Star",
    insurer: "Star Health",
    cover: "₹5 Lakh",
    badge: "5 Star Partner",
    hospitals: 485,
    features: [
      {
        icon: faHospital,
        title: "485+ Cashless Hospitals",
        description: "With anywhere network support"
      },
      {
        icon: faStar,
        title: "Premium Partnership",
        description: "Policybazaar 5 Star Partner"
      },
      {
        icon: faShieldHeart,
        title: "Renewal Benefits",
        description: "100% additional sum insured on renewal"
      },
      {
        icon: faInfinity,
        title: "Unlimited Claim Restoration",
        description: "Lifetime coverage protection"
      }
    ],
    durations: {
      "1Y": 7998,
      "2Y": 15195,
      "3Y": 22192
    },
    riders: [
      { 
        id: 1, 
        name: "Super Star Bonus", 
        price: 1442,
        description: "100% additional sum insured after each renewal"
      },
      { 
        id: 2,
        name: "Limitless Care", 
        price: 899, // Placeholder price - adjust as needed
        description: "One unlimited claim cover for lifetime"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy3;