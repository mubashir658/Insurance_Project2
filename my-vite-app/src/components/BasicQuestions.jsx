import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    policyType: "",
    maritalStatus: ""
  });

  const navigate = useNavigate();

  const policyExplanations = {
    "A": "Health Insurance - Coverage for medical expenses and treatments",
    "B": "Vehicle Insurance - Protection for your vehicles against damage and liability",
    "C": "Life Insurance - Financial protection for your family in case of unfortunate events",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    navigate('/health-policies');
  };

  return (
    <div className="form-container">
      <h1>Insurance Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} />
              <span>Male</span>
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} />
              <span>Female</span>
            </label>
          </div>
        </div>

        {/* Area */}
        <div className="form-group">
          <label>Residential Area Type</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="area" value="Urban" checked={formData.area === "Urban"} onChange={handleChange} />
              <span>Urban</span>
            </label>
            <label>
              <input type="radio" name="area" value="Rural" checked={formData.area === "Rural"} onChange={handleChange} />
              <span>Rural</span>
            </label>
          </div>
        </div>

        {/* Qualification */}
        <div className="form-group">
          <label>Highest Educational Qualification</label>
          <select name="qualification" value={formData.qualification} onChange={handleChange}>
            <option value="">Select qualification</option>
            <option value="Bachelor">Bachelor's Degree</option>
            <option value="Highschool">High School</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Income */}
        <div className="form-group">
          <label>Annual Income Range</label>
          <select name="income" value={formData.income} onChange={handleChange}>
            <option value="">Select income range</option>
            <option value="<2L">Less than ₹2 Lakhs</option>
            <option value="2-5L">₹2-5 Lakhs</option>
            <option value="5-10L">₹5-10 Lakhs</option>
            <option value=">10L">More than ₹10 Lakhs</option>
          </select>
        </div>

        {/* Vintage */}
        <div className="form-group">
          <label>Years with Company</label>
          <input type="number" name="vintage" min="0" value={formData.vintage} onChange={handleChange} placeholder="Enter number of years" />
        </div>

        {/* Claim Amount */}
        <div className="form-group">
          <label>Previous Claim Amount (₹)</label>
          <input type="number" name="claimAmount" min="0" value={formData.claimAmount} onChange={handleChange} placeholder="Enter amount in rupees" />
        </div>

        {/* Number of Policies */}
        <div className="form-group">
          <label>Number of Current Policies</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="numberOfPolicies" value="1" checked={formData.numberOfPolicies === "1"} onChange={handleChange} />
              <span>1</span>
            </label>
            <label>
              <input type="radio" name="numberOfPolicies" value="More than 1" checked={formData.numberOfPolicies === "More than 1"} onChange={handleChange} />
              <span>More than 1</span>
            </label>
          </div>
        </div>

        {/* Policies Chosen */}
        <div className="form-group">
          <label>Preferred Policy Type</label>
          <select name="policiesChosen" value={formData.policiesChosen} onChange={handleChange}>
            <option value="">Select policy type</option>
            <option value="A">Health Insurance (A)</option>
            <option value="B">Vehicle Insurance (B)</option>
            <option value="C">Life Insurance (C)</option>
          </select>
          {formData.policiesChosen && (
            <div className="policy-explanation">
              {policyExplanations[formData.policiesChosen]}
            </div>
          )}
        </div>

        {/* Policy Type */}
        <div className="form-group">
          <label>Preferred Policy Tier</label>
          <select name="policyType" value={formData.policyType} onChange={handleChange}>
            <option value="">Select policy tier</option>
            <option value="Platinum">Platinum</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
          </select>
        </div>

        {/* Marital Status */}
        <div className="form-group">
          <label>Marital Status</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="maritalStatus" value="Yes" checked={formData.maritalStatus === "Yes"} onChange={handleChange} />
              <span>Married</span>
            </label>
            <label>
              <input type="radio" name="maritalStatus" value="No" checked={formData.maritalStatus === "No"} onChange={handleChange} />
              <span>Single</span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
