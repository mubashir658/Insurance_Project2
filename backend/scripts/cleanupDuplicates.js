import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BasicQuestion from '../models/BasicQuestion.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/insurance_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected");
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    return false;
  }
};

// Function to clean up duplicate entries
const cleanupDuplicates = async () => {
  try {
    // Get all users with submissions
    const users = await BasicQuestion.distinct('userId');
    console.log(`Found ${users.length} users with submissions`);
    
    let totalRemoved = 0;
    
    // For each user, keep only the most recent submission
    for (const userId of users) {
      // Get all submissions for this user, sorted by updatedAt (most recent first)
      const submissions = await BasicQuestion.find({ userId })
        .sort({ updatedAt: -1, createdAt: -1 });
      
      if (submissions.length > 1) {
        console.log(`User ${userId} has ${submissions.length} submissions. Keeping the most recent one.`);
        
        // Keep the first one (most recent) and delete the rest
        const idsToRemove = submissions.slice(1).map(s => s._id);
        const result = await BasicQuestion.deleteMany({ _id: { $in: idsToRemove } });
        
        console.log(`Removed ${result.deletedCount} duplicate submissions for user ${userId}`);
        totalRemoved += result.deletedCount;
      }
    }
    
    console.log(`Cleanup complete. Removed ${totalRemoved} duplicate submissions.`);
  } catch (error) {
    console.error("Error cleaning up duplicates:", error.message);
  }
};

// Main function
const main = async () => {
  const connected = await connectDB();
  if (!connected) {
    process.exit(1);
  }
  
  await cleanupDuplicates();
  
  // Disconnect from MongoDB
  await mongoose.disconnect();
  console.log("MongoDB Disconnected");
  process.exit(0);
};

// Run the script
main();