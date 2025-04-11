import React, { useState } from "react";
import "./BasicQuestions.css";

const BasicQuestions = ({ onContinue }) => {
  const [formData, setFormData] = useState({
    gender: "",
    member: "",
    age: "",
    city: "",
    name: "",
    mobile: "",
    medicalHistory: [],
    whatsappUpdates: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "medicalHistory") {
      setFormData((prev) => {
        const updated = checked
          ? [...prev.medicalHistory, value]
          : prev.medicalHistory.filter((d) => d !== value);
        return { ...prev, medicalHistory: updated };
      });
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue(formData);
  };

  return (
    <div className="form-container">
      <form className="basic-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Find top health plans for you</h2>
          <p className="subtitle">Get up to 25% discount on premium</p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "25%" }}></div>
          </div>
        </div>

        <div className="form-body">
          <div className="section">
            <label className="section-label">Gender</label>
            <div className="radio-group">
              <label className={`radio-option ${formData.gender === "Male" ? "selected" : ""}`}>
                <input type="radio" name="gender" value="Male" onChange={handleChange} />
                <span className="radio-design"></span>
                <span className="radio-label">Male</span>
              </label>
              <label className={`radio-option ${formData.gender === "Female" ? "selected" : ""}`}>
                <input type="radio" name="gender" value="Female" onChange={handleChange} />
                <span className="radio-design"></span>
                <span className="radio-label">Female</span>
              </label>
            </div>
          </div>

          <div className="section">
            <label className="section-label">Select member to insure</label>
            <div className="select-wrapper">
              <select name="member" onChange={handleChange} required>
                <option value="">-- Select Member --</option>
                <option value="Self">Self</option>
                <option value="Wife">Wife</option>
                <option value="Son">Son</option>
                <option value="Daughter">Daughter</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="More">More</option>
              </select>
            </div>
          </div>

          <div className="section">
            <label className="section-label">Age</label>
            <div className="input-wrapper">
              <input type="number" name="age" min="0" onChange={handleChange} required />
              <span className="input-suffix">years</span>
            </div>
          </div>

          <div className="section">
            <label className="section-label">City</label>
            <div className="select-wrapper">
              <select name="city" onChange={handleChange} required>
                <option value="">Select City</option>
                <option>Delhi</option>
                <option>Bengaluru</option>
                <option>Pune</option>
                <option>Hyderabad</option>
                <option>Mumbai</option>
                <option>Chennai</option>
              </select>
            </div>
          </div>

          <div className="section">
            <label className="section-label">Full Name</label>
            <div className="input-wrapper">
              <input type="text" name="name" onChange={handleChange} required />
            </div>
          </div>

          <div className="section">
            <label className="section-label">Mobile Number</label>
            <div className="input-wrapper">
              <input type="tel" name="mobile" pattern="[0-9]{10}" onChange={handleChange} required />
            </div>
          </div>

          <div className="section">
            <label className="section-label">Medical History (Select all that apply)</label>
            <div className="checkbox-grid">
              {[
                "Diabetes",
                "Blood Pressure",
                "Heart disease",
                "Any Surgery",
                "Thyroid",
                "Asthma",
                "Other disease",
                "None of these",
              ].map((item) => (
                <label
                  key={item}
                  className={`checkbox-option ${
                    formData.medicalHistory.includes(item) ? "selected" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    name="medicalHistory"
                    value={item}
                    onChange={handleChange}
                    checked={formData.medicalHistory.includes(item)}
                  />
                  <span className="checkbox-design"></span>
                  <span className="checkbox-label">{item}</span>
                </label>
              ))}
            </div>
          </div>

          

          <button type="submit" className="submit-button">
            Continue
            <span className="button-icon">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicQuestions;
