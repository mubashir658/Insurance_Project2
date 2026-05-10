import PolicyTemplate from '../PolicyTemplate';
import { 
  faGlobe,
  faStar,
  faUserTie,
  faHospital
} from "@fortawesome/free-solid-svg-icons";

const HPolicy10 = () => {
  const policyData = {
    name: "Comprehensive Health Plan",
    insurer: "GlobalCare Insurance",
    cover: "₹25 Lakh",
    badge: "Premium Plus",
    hospitals: 1000,
    features: [
      {
        icon: faGlobe,
        title: "International Treatment",
        description: "Global medical coverage"
      },
      {
        icon: faStar,
        title: "Luxury Hospital Access",
        description: "Premium healthcare facilities"
      },
      {
        icon: faUserTie,
        title: "Personal Health Manager",
        description: "Dedicated health concierge"
      },
      {
        icon: faHospital,
        title: "Full Coverage",
        description: "Comprehensive medical benefits"
      }
    ],
    durations: {
      "1Y": 60000,
      "2Y": 114000,
      "3Y": 162000
    },
    riders: [
      { 
        id: 1,
        name: "International Plus", 
        price: 5000,
        description: "Enhanced global coverage"
      },
      { 
        id: 2,
        name: "Concierge Service", 
        price: 4000,
        description: "Premium health management"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy10; 