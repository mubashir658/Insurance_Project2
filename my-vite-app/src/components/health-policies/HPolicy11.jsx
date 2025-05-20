import PolicyTemplate from '../PolicyTemplate';
import { 
  faSyringe,
  faClipboardCheck,
  faUtensils,
  faStethoscope
} from "@fortawesome/free-solid-svg-icons";

const HPolicy11 = () => {
  const policyData = {
    name: "Diabetes Care Plan",
    insurer: "DiabeticCare Insurance",
    cover: "₹12 Lakh",
    badge: "Diabetes Special",
    hospitals: 350,
    features: [
      {
        icon: faSyringe,
        title: "Specialized Care",
        description: "Diabetes-specific treatment"
      },
      {
        icon: faClipboardCheck,
        title: "Regular Checkups",
        description: "Frequent health monitoring"
      },
      {
        icon: faUtensils,
        title: "Nutrition Counseling",
        description: "Dietary guidance and support"
      },
      {
        icon: faStethoscope,
        title: "Complication Coverage",
        description: "Coverage for related conditions"
      }
    ],
    durations: {
      "1Y": 30000,
      "2Y": 57000,
      "3Y": 81000
    },
    riders: [
      { 
        id: 1,
        name: "Advanced Monitoring", 
        price: 2500,
        description: "Enhanced health tracking"
      },
      { 
        id: 2,
        name: "Nutrition Support", 
        price: 2000,
        description: "Personalized diet planning"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy11; 