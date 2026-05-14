import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BasicQuestions.css';

const BasicQuestions = () => {

  const [formData, setFormData] = useState({

    age: '',
    bmi: '',
    smoker: 0,
    dependents: '',
    hospital_visits_last_year: '',
    chronic_disease: 0,
    physical_activity_level: 1,
    alcohol_consumption: 0,
    gender: 0,
    income: 1,
    pre_existing_conditions: 3

  });

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [hasExistingData, setHasExistingData] = useState(false);

  const navigate = useNavigate();

  // ---------------------------------------------------
  // FETCH PREVIOUS DATA
  // ---------------------------------------------------

  useEffect(() => {

    const fetchPreviousData = async () => {

      try {

        const token = localStorage.getItem('token');

        if (!token) {

          setLoading(false);

          return;
        }

        const response = await axios.get(

          `${import.meta.env.VITE_API_URL}/api/basic-questions/user-data`,

          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        if (
          response.data.success
          &&
          response.data.data
        ) {

          const userData = response.data.data;

          setFormData({

            age: userData.age,
            bmi: userData.bmi,
            smoker: userData.smoker,
            dependents: userData.dependents,
            hospital_visits_last_year:
              userData.hospital_visits_last_year,

            chronic_disease:
              userData.chronic_disease,

            physical_activity_level:
              userData.physical_activity_level,

            alcohol_consumption:
              userData.alcohol_consumption,

            gender: userData.gender,

            income: userData.income,

            pre_existing_conditions:
              userData.pre_existing_conditions
          });

          setHasExistingData(true);
        }

      } catch (error) {

        console.log(
          'No previous data found or error:',
          error.message
        );

        if (
          error.response
          &&
          error.response.status !== 404
        ) {

          console.error(
            'Error fetching user data:',
            error
          );
        }

      } finally {

        setLoading(false);
      }
    };

    fetchPreviousData();

  }, []);

  // ---------------------------------------------------
  // HANDLE INPUT CHANGE
  // ---------------------------------------------------

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  // ---------------------------------------------------
  // HANDLE SUBMIT
  // ---------------------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);

      const token = localStorage.getItem('token');

      console.log('Token retrieved:', token);

      if (!token) {

        throw new Error(
          'Please log in to continue'
        );
      }

      // ---------------------------------------------------
      // CLEAN DATA
      // ---------------------------------------------------

      const cleanedData = {

        age: Number(formData.age),

        bmi: Number(formData.bmi),

        smoker: Number(formData.smoker),

        dependents: Number(
          formData.dependents
        ),

        hospital_visits_last_year: Number(
          formData.hospital_visits_last_year
        ),

        chronic_disease: Number(
          formData.chronic_disease
        ),

        physical_activity_level: Number(
          formData.physical_activity_level
        ),

        alcohol_consumption: Number(
          formData.alcohol_consumption
        ),

        gender: Number(formData.gender),

        income: Number(formData.income),

        pre_existing_conditions: Number(
          formData.pre_existing_conditions
        )
      };

      console.log(
        'Cleaned Data:',
        cleanedData
      );

      // ---------------------------------------------------
      // SAVE TO MAIN BACKEND
      // ---------------------------------------------------

      const backendResponse = await axios.post(

        `${import.meta.env.VITE_API_URL}/api/basic-questions`,

        cleanedData,

        {
          headers: {

            'Content-Type': 'application/json',

            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log(
        'Backend Response:',
        backendResponse.data
      );

      // ---------------------------------------------------
      // CALL DL MODEL API
      // ---------------------------------------------------


      const flaskResponse = await axios.post(
        "https://mohammedali786-dl.hf.space/predict",
        cleanedData,
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 60000
        }
      );

      console.log('Prediction Response:', flaskResponse.data);

      // ---------------------------------------------------
      // STORE PREDICTION RESULT
      // ---------------------------------------------------

      localStorage.setItem('predictionResult', JSON.stringify(flaskResponse.data));

      // ---------------------------------------------------
      // NAVIGATE
      // ---------------------------------------------------

      if (backendResponse.data.success) {
        navigate('/health-policies', {
          state: { prediction: flaskResponse.data }
        });
      } else {
        throw new Error(backendResponse.data.message || 'Failed to save data');
      }

    } catch (err) {

      console.error(
        'Submission error:',
        err
      );

      alert(

        'Error: ' +

        (
          err.response?.data?.error
          ||
          err.message
        )
      );

    } finally {

      setSubmitting(false);
    }
  };

  // ---------------------------------------------------
  // LOADING SCREEN
  // ---------------------------------------------------

  if (loading) {

    return (

      <div className="basic-questions-container">

        <div className="loading-spinner">

          <p>Loading...</p>

        </div>

      </div>
    );
  }

  // ---------------------------------------------------
  // MAIN UI
  // ---------------------------------------------------

  return (

    <div className="basic-questions-container">

      <h2>Health Insurance Prediction</h2>

      {

        hasExistingData
        &&
        (

          <div className="update-notice">

            <p>

              You already have health information
              on file. Any changes you make will
              update your existing record.

            </p>

          </div>
        )
      }

      <form onSubmit={handleSubmit}>

        <div>

          <label>Age:</label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
            max="100"
            placeholder="e.g., 30"
          />

        </div>

        <div>

          <label>BMI:</label>

          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            required
            min="10"
            max="50"
            step="0.1"
            placeholder="e.g., 25.0"
          />

        </div>

        <div>

          <label>Smoker:</label>

          <select
            name="smoker"
            value={formData.smoker}
            onChange={handleChange}
            required
          >

            <option value="0">No</option>

            <option value="1">Yes</option>

          </select>

        </div>

        <div>

          <label>Dependents:</label>

          <input
            type="number"
            name="dependents"
            value={formData.dependents}
            onChange={handleChange}
            required
            min="0"
            max="10"
            placeholder="e.g., 2"
          />

        </div>

        <div>

          <label>Hospital Visits Last Year:</label>

          <input
            type="number"
            name="hospital_visits_last_year"
            value={formData.hospital_visits_last_year}
            onChange={handleChange}
            required
            min="0"
            max="50"
            placeholder="e.g., 1"
          />

        </div>

        <div>

          <label>Chronic Disease:</label>

          <select
            name="chronic_disease"
            value={formData.chronic_disease}
            onChange={handleChange}
            required
          >

            <option value="0">No</option>

            <option value="1">Yes</option>

          </select>

        </div>

        <div>

          <label>Physical Activity Level:</label>

          <select
            name="physical_activity_level"
            value={formData.physical_activity_level}
            onChange={handleChange}
            required
          >

            <option value="0">Sedentary</option>

            <option value="1">Moderate</option>

            <option value="2">Active</option>

          </select>

        </div>

        <div>

          <label>Alcohol Consumption:</label>

          <select
            name="alcohol_consumption"
            value={formData.alcohol_consumption}
            onChange={handleChange}
            required
          >

            <option value="0">None</option>

            <option value="1">Moderate</option>

            <option value="2">Heavy</option>

          </select>

        </div>

        <div>

          <label>Gender:</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >

            <option value="0">Male</option>

            <option value="1">Female</option>

          </select>

        </div>

        <div>

          <label>Income:</label>

          <select
            name="income"
            value={formData.income}
            onChange={handleChange}
            required
          >

            <option value="0">Low</option>

            <option value="1">Average</option>

            <option value="2">High</option>

          </select>

        </div>

        <div>

          <label>Pre-existing Conditions:</label>

          <select
            name="pre_existing_conditions"
            value={formData.pre_existing_conditions}
            onChange={handleChange}
            required
          >

            <option value="0">Cancer</option>

            <option value="1">Diabetes</option>

            <option value="2">Hypertension</option>

            <option value="3">None</option>

            <option value="4">Asthma</option>

          </select>

        </div>

        <button
          type="submit"
          disabled={submitting}
        >

          {
            submitting
            ?
            'Predicting...'
            :
            (
              hasExistingData
              ?
              'Update and Continue'
              :
              'Continue'
            )
          }

        </button>

      </form>

    </div>
  );
};

export default BasicQuestions;