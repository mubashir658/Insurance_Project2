import mongoose from 'mongoose';

   const BasicQuestionSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
     age: { type: Number, required: true },
     bmi: { type: Number, required: true },
     smoker: { type: Number, required: true },
     dependents: { type: Number, required: true },
     hospital_visits_last_year: { type: Number, required: true },
     chronic_disease: { type: Number, required: true },
     physical_activity_level: { type: Number, required: true },
     alcohol_consumption: { type: Number, required: true },
     gender: { type: Number, required: true },
     income: { type: Number, required: true },
     pre_existing_conditions: { type: Number, required: true },
     result: { type: String, required: true },
     probability: { type: Number, required: true },
     createdAt: { type: Date, default: Date.now }
   });

   export default mongoose.model('BasicQuestion', BasicQuestionSchema);