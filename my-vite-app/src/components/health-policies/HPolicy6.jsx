import PolicyTemplate from '../PolicyTemplate';
import { 
  faBaby,
  faStethoscope,
  faHospitalUser,
  faHandHoldingMedical
} from "@fortawesome/free-solid-svg-icons";

const HPolicy6 = () => {
  const policyData = {
    name: "Maternity Health Plan",
    insurer: "MamaCare Insurance",
    cover: "₹8 Lakh",
    badge: "Maternity Special",
    hospitals: 300,
    features: [
      {
        icon: faBaby,
        title: "Prenatal Care",
        description: "Regular checkups and tests"
      },
      {
        icon: faStethoscope,
        title: "Delivery Coverage",
        description: "Normal and C-section delivery"
      },
      {
        icon: faHospitalUser,
        title: "Newborn Care",
        description: "Comprehensive baby care"
      },
      {
        icon: faHandHoldingMedical,
        title: "Postnatal Support",
        description: "Mother and baby wellness"
      }
    ],
    durations: {
      "1Y": 36000,
      "2Y": 68400,
      "3Y": 97200
    },
    riders: [
      { 
        id: 1,
        name: "Newborn Cover", 
        price: 3000,
        description: "Additional coverage for newborn"
      },
      { 
        id: 2,
        name: "Complications Cover", 
        price: 2500,
        description: "High-risk pregnancy coverage"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy6; 