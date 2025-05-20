import PolicyTemplate from '../PolicyTemplate';
import { 
  faHospital,
  faShieldAlt,
  faStar,
  faMoneyBillWave
} from "@fortawesome/free-solid-svg-icons";

const HPolicy1 = () => {
  const policyData = {
    name: "Care Plus",
    insurer: "Care Health",
    cover: "₹5 Lakh",
    badge: "5 Star Partner",
    hospitals: 380,
    features: [
      {
        icon: faHospital,
        title: "380+ Cashless Hospitals",
        description: "With anywhere network support"
      },
      {
        icon: faStar,
        title: "Premium Partnership",
        description: "Policybazaar 5 Star Partner"
      },
      {
        icon: faMoneyBillWave,
        title: "No Claim Bonus",
        description: "20% premium discount on renewal"
      },
      {
        icon: faShieldAlt,
        title: "Network Hospitals",
        description: "Pan-India coverage support"
      }
    ],
    durations: {
      "1Y": 8585,
      "2Y": 16526,
      "3Y": 24253
    },
    riders: [
      { 
        id: 1,
        name: "Critical Illness Cover", 
        price: 1299,
        description: "35+ critical diseases covered"
      },
      { 
        id: 2,
        name: "OPD Care", 
        price: 899,
        description: "Outpatient department coverage"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy1;