import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./BasicQuestions.css";

const BasicQuestions = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "",
    area: "",
    qualification: "",
    income: "",
    vintage: "",
    claimAmount: "",
    numberOfPolicies: "",
    policiesChosen: "",
    maritalStatus: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fromHealthPolicy = new URLSearchParams(window.location.search).get("from") === "health-policy";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const customer = JSON.parse(localStorage.getItem("customer"));
    if (!customer || !customer.name || !customer.email) {
      setError("No customer data found in localStorage");
      setIsLoading(false);
      return;
    }

    const payload = {
      name: customer.name,
      email: customer.email,
      ...formData,
    };

    try {
      console.log("Sending POST request to http://localhost:5000/api/basic-questions/submit with data:", payload);
      const response = await axios.post("http://localhost:5000/api/basic-questions/submit", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Response:", response.data);

      if (response.data.success) {
        navigate(fromHealthPolicy ? "/health-policies" : "/thankyou");
      } else {
        setError(response.data.message || "Failed to submit form");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data.message || "Unknown error"}`);
      } else if (err.request) {
        setError("Unable to connect to the server. Please ensure the backend is running on http://localhost:5000.");
      } else {
        setError(`Request setup error: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Basic Questions</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block">Area</label>
          <select name="area" value={formData.area} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select Area</option>
            <option value="Urban">Urban</option>
            <option value="Rural">Rural</option>
          </select>
        </div>
        <div>
          <label className="block">Qualification</label>
          <select name="qualification" value={formData.qualification} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select Qualification</option>
            <option value="High School">High School</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Master">Master</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div>
          <label className="block">Income</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Enter annual income"
            required
          />
        </div>
        <div>
          <label className="block">Vintage (Years with Company)</label>
          <input
            type="number"
            name="vintage"
            value={formData.vintage}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Enter years"
            required
          />
        </div>
        <div>
          <label className="block">Claim Amount</label>
          <input
            type="number"
            name="claimAmount"
            value={formData.claimAmount}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Enter claim amount"
            required
          />
        </div>
        <div>
          <label className="block">Number of Policies</label>
          <input
            type="number"
            name="numberOfPolicies"
            value={formData.numberOfPolicies}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Enter number of policies"
            required
          />
        </div>
        <div>
          <label className="block">Policies Chosen</label>
          <select name="policiesChosen" value={formData.policiesChosen} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select Policy</option>
            <option value="A">A (Health)</option>
            <option value="B">B (Vehicle)</option>
            <option value="C">C (Life)</option>
          </select>
        </div>
        <div>
          <label className="block">Marital Status</label>
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Select Marital Status</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BasicQuestions;