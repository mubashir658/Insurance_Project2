import PolicyTemplate from '../PolicyTemplate';
import { 
  faUserNurse,
  faHeartbeat,
  faHome,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";

const HPolicy4 = () => {
  const policyData = {
    name: "Senior Citizen Health Plan",
    insurer: "SeniorCare Insurance",
    cover: "₹15 Lakh",
    badge: "Senior Special",
    hospitals: 450,
    features: [
      {
        icon: faUserNurse,
        title: "Specialized Senior Care",
        description: "Dedicated senior care specialists"
      },
      {
        icon: faHeartbeat,
        title: "Pre-existing Coverage",
        description: "Coverage for existing conditions"
      },
      {
        icon: faHome,
        title: "Home Healthcare",
        description: "In-home medical services"
      },
      {
        icon: faCalendarCheck,
        title: "Annual Health Checkup",
        description: "Comprehensive senior health screening"
      }
    ],
    durations: {
      "1Y": 42000,
      "2Y": 79800,
      "3Y": 113400
    },
    riders: [
      { 
        id: 1,
        name: "Domiciliary Treatment", 
        price: 2000,
        description: "Home treatment coverage"
      },
      { 
        id: 2,
        name: "Daily Hospital Cash", 
        price: 1500,
        description: "₹2000 per day during hospitalization"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy4; 