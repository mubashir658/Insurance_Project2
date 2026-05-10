import PolicyTemplate from '../PolicyTemplate';
import { 
  faHospitalAlt,
  faAmbulance,
  faLaptopMedical,
  faMapMarkedAlt
} from "@fortawesome/free-solid-svg-icons";

const HPolicy9 = () => {
  const policyData = {
    name: "Rural Health Plan",
    insurer: "RuralCare Insurance",
    cover: "₹1.5 Lakh",
    badge: "Rural Special",
    hospitals: 150,
    features: [
      {
        icon: faHospitalAlt,
        title: "Basic Healthcare",
        description: "Essential medical services"
      },
      {
        icon: faAmbulance,
        title: "Emergency Transport",
        description: "24/7 ambulance service"
      },
      {
        icon: faLaptopMedical,
        title: "Telemedicine",
        description: "Remote doctor consultation"
      },
      {
        icon: faMapMarkedAlt,
        title: "Local Network",
        description: "Access to nearby hospitals"
      }
    ],
    durations: {
      "1Y": 4800,
      "2Y": 9120,
      "3Y": 12960
    },
    riders: [
      { 
        id: 1,
        name: "Transport Cover", 
        price: 400,
        description: "Emergency transport coverage"
      },
      { 
        id: 2,
        name: "Local Network Plus", 
        price: 300,
        description: "Extended hospital network"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy9; 