  import PolicyTemplate from '../PolicyTemplate';
  import { 
    faDumbbell,
    faAppleAlt,
    faBrain,
    faHeartbeat
  } from "@fortawesome/free-solid-svg-icons";

  const HPolicy12 = () => {
    const policyData = {
      name: "Wellness Health Plan",
      insurer: "WellnessCare Insurance",
      cover: "₹4 Lakh",
      badge: "Wellness Special",
      hospitals: 250,
      features: [
        {
          icon: faDumbbell,
          title: "Preventive Care",
          description: "Health maintenance programs"
        },
        {
          icon: faAppleAlt,
          title: "Fitness Programs",
          description: "Exercise and wellness plans"
        },
        {
          icon: faBrain,
          title: "Nutrition Guidance",
          description: "Diet and lifestyle support"
        },
        {
          icon: faHeartbeat,
          title: "Mental Wellness",
          description: "Stress management support"
        }
      ],
      durations: {
        "1Y": 18000,
        "2Y": 34200,
        "3Y": 48600
      },
      riders: [
        { 
          id: 1,
          name: "Fitness Plus", 
          price: 1500,
          description: "Enhanced fitness programs"
        },
        { 
          id: 2,
          name: "Mental Wellness", 
          price: 1200,
          description: "Additional mental health support"
        }
      ]
    };

    return <PolicyTemplate policyData={policyData} />;
  };

  export default HPolicy12; 