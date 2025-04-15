import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FullDetailQuestion from "./FullDetailQuestion";
import axios from "axios";

const FullDetailWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get the selected policy data from navigation state
  const selectedPolicyData = location.state?.selectedPolicyData;

  const handleContinue = async (formData) => {
    try {
      setIsSubmitting(true);
      
      // Combine form data with policy data
      const completeData = {
        ...formData,
        policyDetails: selectedPolicyData
      };
      
      // Send form data to the backend
      const response = await axios.post('http://localhost:5000/api/full-detail', completeData);
      
      if (response.data.success) {
        // Navigate to thank you page with the form data
        navigate("/thankyou", { 
          state: { 
            formData: completeData,
            message: "Thank you for submitting your details. We'll get back to you soon!"
          } 
        });
      } else {
        throw new Error(response.data.message || "Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return <FullDetailQuestion onContinue={handleContinue} isSubmitting={isSubmitting} />;
};

export default FullDetailWrapper;
