import PolicyTemplate from '../PolicyTemplate';
import { 
  faGraduationCap,
  faAmbulance,
  faBrain,
  faLaptopMedical
} from "@fortawesome/free-solid-svg-icons";

const HPolicy5 = () => {
  const policyData = {
    name: "Student Health Plan",
    insurer: "EduCare Insurance",
    cover: "₹1 Lakh",
    badge: "Student Special",
    hospitals: 200,
    features: [
      {
        icon: faGraduationCap,
        title: "Basic Hospitalization",
        description: "Essential medical coverage"
      },
      {
        icon: faAmbulance,
        title: "Accident Coverage",
        description: "24/7 emergency support"
      },
      {
        icon: faBrain,
        title: "Mental Health Support",
        description: "Counseling and therapy coverage"
      },
      {
        icon: faLaptopMedical,
        title: "Online Consultation",
        description: "Virtual doctor visits"
      }
    ],
    durations: {
      "1Y": 6000,
      "2Y": 11400,
      "3Y": 16200
    },
    riders: [
      { 
        id: 1,
        name: "Sports Injury Cover", 
        price: 500,
        description: "Coverage for sports-related injuries"
      },
      { 
        id: 2,
        name: "Study Abroad Extension", 
        price: 1000,
        description: "International coverage for students"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy5; 