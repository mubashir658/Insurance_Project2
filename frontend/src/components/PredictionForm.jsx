import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    gender: 'Male',
    area: 'Urban',
    qualification: 'Bachelor',
    income: '5_10L',
    vintage: '',
    claim_amount: '',
    num_policies: '1',
    policy: 'A',
    type_of_policy: 'Platinum',
    marital_status: 'Yes'
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('/api/predict', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Error making prediction');
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="prediction-form">
      <h2>Customer Prominence Prediction</h2>
      <form onSubmit={handleSubmit}>
        {/* Gender */}
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* Area */}
        <div className="form-group">
          <label>Area:</label>
          <select name="area" value={formData.area} onChange={handleChange}>
            <option>Urban</option>
            <option>Rural</option>
          </select>
        </div>

        {/* Add all other fields following similar pattern */}

        {/* Vintage */}
        <div className="form-group">
          <label>Vintage (years):</label>
          <input 
            type="number" 
            name="vintage" 
            value={formData.vintage}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Check Prominence'}
        </button>
      </form>

      {prediction && (
        <div className="prediction-result">
          <h3>Prediction Result</h3>
          <p>Status: {prediction.prominent ? 'Prominent' : 'Not Prominent'}</p>
          <p>Confidence: {(prediction.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;