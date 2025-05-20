import PolicyTemplate from '../PolicyTemplate';
import { 
  faHeartbeat,
  faMoneyBillWave,
  faHandsHelping,
  faUserMd
} from "@fortawesome/free-solid-svg-icons";

const HPolicy7 = () => {
  const policyData = {
    name: "Critical Illness Plan",
    insurer: "CriticalCare Insurance",
    cover: "₹20 Lakh",
    badge: "Critical Care",
    hospitals: 500,
    features: [
      {
        icon: faHeartbeat,
        title: "Major Illness Coverage",
        description: "Coverage for critical diseases"
      },
      {
        icon: faMoneyBillWave,
        title: "Lump Sum Payout",
        description: "Immediate financial support"
      },
      {
        icon: faHandsHelping,
        title: "Rehabilitation Support",
        description: "Post-treatment care"
      },
      {
        icon: faUserMd,
        title: "Second Opinion Service",
        description: "Expert medical consultation"
      }
    ],
    durations: {
      "1Y": 48000,
      "2Y": 91200,
      "3Y": 129600
    },
    riders: [
      { 
        id: 1,
        name: "Advanced Treatment", 
        price: 4000,
        description: "Coverage for advanced therapies"
      },
      { 
        id: 2,
        name: "Recovery Support", 
        price: 3000,
        description: "Post-treatment care package"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy7; 