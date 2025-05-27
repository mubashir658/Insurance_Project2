# Database Maintenance Scripts

This directory contains scripts for maintaining the database.

## Cleanup Duplicates Script

The `cleanupDuplicates.js` script removes duplicate entries in the BasicQuestions collection, keeping only the most recent submission for each user.

### How to Run

1. Make sure your MongoDB server is running
2. Navigate to the backend directory
3. Run the script using Node.js:

```bash
node --experimental-modules scripts/cleanupDuplicates.js
```

### What it Does

- Finds all users who have submitted basic questions
- For each user, keeps only their most recent submission (based on updatedAt or createdAt date)
- Deletes all older submissions
- Outputs a summary of the cleanup operation

### When to Run

Run this script if you notice duplicate entries for users in the client management dashboard. This can happen if you've recently updated the system to use the new "update instead of create" approach but still have old duplicate data.

Note: This is a one-time cleanup script. Once the system is using the new approach of updating existing records instead of creating new ones, you shouldn't need to run this script again.