const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const basicQuestionsRouter = require('./routes/basicQuestions');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/basic-questions', basicQuestionsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 