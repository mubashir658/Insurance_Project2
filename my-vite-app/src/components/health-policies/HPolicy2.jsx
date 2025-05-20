import PolicyTemplate from '../PolicyTemplate.jsx';

import { 
  faHospital, 
  faBed,
  faStar,
  faGlobeAsia
} from "@fortawesome/free-solid-svg-icons";

const HPolicy2 = () => {
  const policyData = {
    name: "Niva Bupa Aspire Gold+ Value (Direct)",
    insurer: "Niva Bupa Health Insurance",
    cover: "₹5 Lakh",
    hospitals: 234,
    badge: "Platinum Partner",
    features: [
      {
        icon: faHospital,
        title: "234+ Cashless Hospitals",
        description: "With anywhere support"
      },
      {
        icon: faBed,
        title: "Private AC Room",
        description: "Comfortable recovery space"
      },
      {
        icon: faStar,
        title: "Day Care Treatments",
        description: "All procedures covered"
      },
      {
        icon: faGlobeAsia,
        title: "Global Coverage",
        description: "40+ countries included"
      }
    ],
    durations: {
      "1Y": 5550,
      "2Y": 10683,
      "3Y": 15400
    },
    riders: [
      { id: 1, name: "Hospital Cash", price: 433 },
      { id: 2, name: "Safeguard +", price: 999 }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy2;