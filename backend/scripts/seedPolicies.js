import mongoose from 'mongoose';
import Policy from '../models/Policy.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set strictQuery to false to suppress the deprecation warning
mongoose.set('strictQuery', false);

const policies = [
  {
    policyId: "HP2",
    title: "Health Shield",
    description: "Premium health insurance with extensive coverage",
    type: "Health",
    premium: 5550,
    features: [
      {
        title: "500+ Network Hospitals",
        description: "Nationwide coverage"
      },
      {
        title: "24/7 Health Support",
        description: "Round the clock medical assistance"
      },
      {
        title: "No Room Rent Capping",
        description: "No restrictions on room rent"
      },
      {
        title: "Day Care Procedures",
        description: "Coverage for 500+ day care procedures"
      }
    ],
    durations: {
      "1Y": 5550,
      "2Y": 10683,
      "3Y": 15400
    },
    riders: [
      {
        name: "Maternity Cover",
        price: 2000,
        description: "Complete maternity coverage"
      },
      {
        name: "Dental Care",
        price: 1500,
        description: "Comprehensive dental coverage"
      }
    ]
  },
  {
    policyId: "HP3",
    title: "Family Health Plus",
    description: "Comprehensive family floater health insurance plan",
    type: "Health",
    premium: 7998,
    features: [
      {
        title: "Family Coverage",
        description: "Coverage for self, spouse, children, and parents"
      },
      {
        title: "Restore Benefits",
        description: "Sum insured restoration on exhaustion"
      },
      {
        title: "No Age Limit",
        description: "No age limit for dependent children"
      },
      {
        title: "Preventive Health Check",
        description: "Annual health check-up for all family members"
      }
    ],
    durations: {
      "1Y": 7998,
      "2Y": 15195,
      "3Y": 22192
    },
    riders: [
      {
        name: "Critical Illness",
        price: 2500,
        description: "Coverage for 50+ critical illnesses"
      },
      {
        name: "Hospital Cash",
        price: 1200,
        description: "Daily cash benefit during hospitalization"
      }
    ]
  },
  {
    policyId: "HP4",
    title: "Senior Care",
    description: "Specialized health insurance for senior citizens",
    type: "Health",
    premium: 42000,
    features: [
      {
        title: "No Age Limit",
        description: "Coverage available up to 80 years"
      },
      {
        title: "Pre-existing Diseases",
        description: "Coverage for pre-existing conditions"
      },
      {
        title: "Home Healthcare",
        description: "Coverage for home nursing and care"
      },
      {
        title: "Annual Health Check",
        description: "Comprehensive health check-up"
      }
    ],
    durations: {
      "1Y": 42000,
      "2Y": 79800,
      "3Y": 113400
    },
    riders: [
      {
        name: "Critical Illness",
        price: 3000,
        description: "Coverage for 40+ critical illnesses"
      },
      {
        name: "Home Care Plus",
        price: 2500,
        description: "Enhanced home healthcare coverage"
      }
    ]
  },
  {
    policyId: "HP5",
    title: "Critical Care",
    description: "Specialized coverage for critical illnesses",
    type: "Health",
    premium: 6000,
    features: [
      {
        title: "40+ Critical Illnesses",
        description: "Coverage for major critical illnesses"
      },
      {
        title: "Lump Sum Payout",
        description: "100% sum insured on diagnosis"
      },
      {
        title: "Survival Period",
        description: "30 days survival period"
      },
      {
        title: "Premium Waiver",
        description: "Premium waiver on claim"
      }
    ],
    durations: {
      "1Y": 6000,
      "2Y": 11400,
      "3Y": 16200
    },
    riders: [
      {
        name: "Additional Coverage",
        price: 2000,
        description: "Additional critical illness coverage"
      },
      {
        name: "Income Benefit",
        price: 1500,
        description: "Monthly income during treatment"
      }
    ]
  },
  {
    policyId: "HP6",
    title: "Maternity Care",
    description: "Comprehensive maternity health insurance",
    type: "Health",
    premium: 36000,
    features: [
      {
        title: "Maternity Coverage",
        description: "Coverage for normal and C-section delivery"
      },
      {
        title: "Newborn Coverage",
        description: "Coverage for newborn baby"
      },
      {
        title: "Complications",
        description: "Coverage for pregnancy complications"
      },
      {
        title: "Vaccination",
        description: "Coverage for baby vaccinations"
      }
    ],
    durations: {
      "1Y": 36000,
      "2Y": 68400,
      "3Y": 97200
    },
    riders: [
      {
        name: "Enhanced Maternity",
        price: 5000,
        description: "Additional maternity coverage"
      },
      {
        name: "Baby Care",
        price: 3000,
        description: "Extended newborn coverage"
      }
    ]
  },
  {
    policyId: "HP7",
    title: "Diabetes Care",
    description: "Specialized health insurance for diabetics",
    type: "Health",
    premium: 48000,
    features: [
      {
        title: "Diabetes Coverage",
        description: "Coverage for diabetes-related treatments"
      },
      {
        title: "Regular Check-ups",
        description: "Coverage for regular health check-ups"
      },
      {
        title: "Complications",
        description: "Coverage for diabetes complications"
      },
      {
        title: "Medication",
        description: "Coverage for regular medications"
      }
    ],
    durations: {
      "1Y": 48000,
      "2Y": 91200,
      "3Y": 129600
    },
    riders: [
      {
        name: "Enhanced Coverage",
        price: 2000,
        description: "Additional diabetes coverage"
      },
      {
        name: "Medication Plus",
        price: 1500,
        description: "Extended medication coverage"
      }
    ]
  },
  {
    policyId: "HP8",
    title: "Cancer Care",
    description: "Specialized health insurance for cancer treatment",
    type: "Health",
    premium: 21600,
    features: [
      {
        title: "Cancer Treatment",
        description: "Coverage for all cancer treatments"
      },
      {
        title: "Chemotherapy",
        description: "Coverage for chemotherapy sessions"
      },
      {
        title: "Radiation",
        description: "Coverage for radiation therapy"
      },
      {
        title: "Surgery",
        description: "Coverage for cancer surgeries"
      }
    ],
    durations: {
      "1Y": 21600,
      "2Y": 41040,
      "3Y": 58320
    },
    riders: [
      {
        name: "Enhanced Treatment",
        price: 5000,
        description: "Additional cancer treatment coverage"
      },
      {
        name: "Recovery Care",
        price: 3000,
        description: "Post-treatment recovery coverage"
      }
    ]
  },
  {
    policyId: "HP9",
    title: "Rural Health Plan",
    description: "Affordable health insurance for rural areas",
    type: "Health",
    premium: 4800,
    features: [
      {
        title: "Basic Healthcare",
        description: "Essential medical services"
      },
      {
        title: "Emergency Transport",
        description: "24/7 ambulance service"
      },
      {
        title: "Telemedicine",
        description: "Remote doctor consultation"
      },
      {
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
        name: "Transport Cover",
        price: 400,
        description: "Emergency transport coverage"
      },
      {
        name: "Local Network Plus",
        price: 300,
        description: "Extended hospital network"
      }
    ]
  },
  {
    policyId: "HP10",
    title: "Student Health",
    description: "Affordable health insurance for students",
    type: "Health",
    premium: 60000,
    features: [
      {
        title: "Basic Coverage",
        description: "Essential health coverage"
      },
      {
        title: "Accident Cover",
        description: "Coverage for accidents"
      },
      {
        title: "OPD Benefits",
        description: "Outpatient department coverage"
      },
      {
        title: "Dental Care",
        description: "Basic dental coverage"
      }
    ],
    durations: {
      "1Y": 60000,
      "2Y": 114000,
      "3Y": 162000
    },
    riders: [
      {
        name: "Enhanced Coverage",
        price: 500,
        description: "Additional health coverage"
      },
      {
        name: "Dental Plus",
        price: 300,
        description: "Extended dental coverage"
      }
    ]
  },
  {
    policyId: "HP11",
    title: "Women's Health",
    description: "Specialized health insurance for women",
    type: "Health",
    premium: 30000,
    features: [
      {
        title: "Women's Health",
        description: "Coverage for women-specific conditions"
      },
      {
        title: "Maternity Benefits",
        description: "Basic maternity coverage"
      },
      {
        title: "Wellness Programs",
        description: "Health and wellness programs"
      },
      {
        title: "Regular Check-ups",
        description: "Coverage for regular health check-ups"
      }
    ],
    durations: {
      "1Y": 30000,
      "2Y": 57000,
      "3Y": 81000
    },
    riders: [
      {
        name: "Maternity Plus",
        price: 2000,
        description: "Enhanced maternity coverage"
      },
      {
        name: "Wellness Plus",
        price: 1500,
        description: "Extended wellness programs"
      }
    ]
  },
  {
    policyId: "HP12",
    title: "Corporate Health",
    description: "Group health insurance for corporate employees",
    type: "Health",
    premium: 18000,
    features: [
      {
        title: "Group Coverage",
        description: "Coverage for all employees"
      },
      {
        title: "Family Coverage",
        description: "Coverage for employee families"
      },
      {
        title: "Cashless Treatment",
        description: "Cashless hospitalization"
      },
      {
        title: "Wellness Programs",
        description: "Corporate wellness programs"
      }
    ],
    durations: {
      "1Y": 18000,
      "2Y": 34200,
      "3Y": 48600
    },
    riders: [
      {
        name: "Family Plus",
        price: 1000,
        description: "Enhanced family coverage"
      },
      {
        name: "Wellness Plus",
        price: 800,
        description: "Extended wellness programs"
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding process...');
    
    // Connect to MongoDB
    const mongoURI = 'mongodb://127.0.0.1:27017/insurance_db';
    console.log(`Attempting to connect to MongoDB at ${mongoURI}`);
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Successfully connected to MongoDB');

    // Check if database exists
    const adminDb = mongoose.connection.db.admin();
    const dbList = await adminDb.listDatabases();
    const dbExists = dbList.databases.some(db => db.name === 'insurance_db');
    console.log(`Database 'insurance_db' exists: ${dbExists}`);

    // Drop the existing collection
    try {
      console.log('Attempting to drop existing policies collection...');
      await mongoose.connection.collection('policies').drop();
      console.log('Successfully dropped existing policies collection');
    } catch (err) {
      if (err.code === 26) {
        console.log('Collection does not exist, will create new one');
      } else {
        console.error('Error dropping collection:', err);
        throw err;
      }
    }

    // Insert new policies
    console.log(`Attempting to insert ${policies.length} policies...`);
    const result = await Policy.insertMany(policies);
    console.log(`Successfully inserted ${result.length} policies`);

    // Verify the data
    const count = await Policy.countDocuments();
    console.log(`Verification: Total policies in database: ${count}`);

    // List all policies
    const allPolicies = await Policy.find({});
    console.log('\nAll policies in database:');
    allPolicies.forEach(policy => {
      console.log(`\nPolicy ID: ${policy.policyId}`);
      console.log(`Title: ${policy.title}`);
      console.log(`Type: ${policy.type}`);
      console.log(`Premium: ₹${policy.premium}`);
    });

    // Close the connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('Database connection closed after error');
    }
    process.exit(1);
  }
};

// Run the seed function
console.log('Starting seed script...');
seedDatabase(); 