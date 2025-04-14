import React from "react";
import { useNavigate } from "react-router-dom";
import FullDetailQuestion from "./FullDetailQuestion";

const FullDetailWrapper = () => {
  const navigate = useNavigate();

  const handleContinue = (formData) => {
    // When form is submitted, navigate to the ThankYou page
    navigate("/thankyou");
  };

  return <FullDetailQuestion onContinue={handleContinue} />;
};

export default FullDetailWrapper;
