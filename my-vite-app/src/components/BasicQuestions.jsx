import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./BasicQuestions.css";

export default function BasicQuestions() {
  const [formData, setFormData] = useState({
    gender: "",
    area: "",
    qualification: "",
    income: "",
    vintage: "",
    claimAmount: "",
    numberOfPolicies: "",
    policiesChosen: "",
    policyType: "health",
    maritalStatus: ""
  });

  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedPolicy = location.state?.selectedPolicy;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
    setValidationErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setValidationErrors([]);
    setIsSubmitting(true);

    try {
      const updatedFormData = {
        ...formData,
        policyType: formData.policiesChosen === "A" ? "health" : 
                   formData.policiesChosen === "B" ? "vehicle" : 
                   formData.policiesChosen === "C" ? "life" : "other"
      };

      console.log("Submitting form data:", updatedFormData);
      const response = await axios.post('http://localhost:5000/api/basic-questions', updatedFormData);
      console.log("Form submission response:", response.data);
      
      if (response.data.success) {
        // Check if user came from health policy card
        if (selectedPolicy?.title?.includes("Health Insurance")) {
          navigate('/health-policies');
        } else {
          // For all other policies, go to thank you page
          navigate('/thankyou', { 
            state: { 
              formData: updatedFormData,
              message: "Thank you for your interest! We'll get back to you soon with personalized policy options."
            } 
          });
        }
      } else {
        setError(response.data.message || "Failed to save form data");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setError(error.response?.data?.message || "Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="basic-questions">
      <h1>Basic Information</h1>
      <p className="subtitle">Please provide some basic information to help us find the best policy for you</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
           
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="area">Area</label>
          <select
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
          >
            <option value="">Select Area</option>
            <option value="urban">Urban</option>
            <option value="rural">Rural</option>
        
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <select
            id="qualification"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
          >
            <option value="">Select Qualification</option>
            <option value="high-school">High School</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="income">Annual Income (₹)</label>
          <input
            type="number"
            id="income"
            name="income"
            value={formData.income}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="vintage">Years of Experience</label>
          <input
            type="number"
            id="vintage"
            name="vintage"
            value={formData.vintage}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="claimAmount">Previous Claim Amount (₹)</label>
          <input
            type="number"
            id="claimAmount"
            name="claimAmount"
            value={formData.claimAmount}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberOfPolicies">Number of Existing Policies</label>
          <input
            type="number"
            id="numberOfPolicies"
            name="numberOfPolicies"
            value={formData.numberOfPolicies}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="policiesChosen">Type of Policy</label>
          <select
            id="policiesChosen"
            name="policiesChosen"
            value={formData.policiesChosen}
            onChange={handleChange}
            required
          >
            <option value="">Select Policy Type</option>
            <option value="A">Health Insurance</option>
            <option value="B">Vehicle Insurance</option>
            <option value="C">Life Insurance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="maritalStatus">Marital Status</label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Marital Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
           
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}
        {validationErrors.length > 0 && (
          <div className="validation-errors">
            {validationErrors.map((err, index) => (
              <p key={index} className="error-message">{err}</p>
            ))}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
