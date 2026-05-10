import PolicyTemplate from '../PolicyTemplate';
import { 
  faUsers,
  faBriefcaseMedical,
  faUserFriends,
  faDumbbell
} from "@fortawesome/free-solid-svg-icons";

const HPolicy8 = () => {
  const policyData = {
    name: "Corporate Health Plan",
    insurer: "CorporateCare Insurance",
    cover: "₹7 Lakh",
    badge: "Corporate Special",
    hospitals: 400,
    features: [
      {
        icon: faUsers,
        title: "Group Coverage",
        description: "Coverage for all employees"
      },
      {
        icon: faBriefcaseMedical,
        title: "Employee Benefits",
        description: "Comprehensive health benefits"
      },
      {
        icon: faUserFriends,
        title: "Family Add-on",
        description: "Optional family coverage"
      },
      {
        icon: faDumbbell,
        title: "Wellness Programs",
        description: "Health and fitness initiatives"
      }
    ],
    durations: {
      "1Y": 21600,
      "2Y": 41040,
      "3Y": 58320
    },
    riders: [
      { 
        id: 1,
        name: "Family Coverage", 
        price: 1800,
        description: "Add family members to plan"
      },
      { 
        id: 2,
        name: "Wellness Package", 
        price: 1200,
        description: "Additional wellness benefits"
      }
    ]
  };

  return <PolicyTemplate policyData={policyData} />;
};

export default HPolicy8; 