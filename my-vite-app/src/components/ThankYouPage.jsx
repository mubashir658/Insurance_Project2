import React from "react";
import "./ThankYouPage.css";

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="animation-container">
          <div className="success-animation">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        </div>
        
        <div className="thank-you-content">
          <h1 className="thank-you-title">Thank You!</h1>
          <p className="thank-you-text">
            We've received your information and our team will contact you shortly.
          </p>
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-phone-alt icon"></i>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope icon"></i>
              <span>support@healthplans.com</span>
            </div>
          </div>
          <div className="decorative-line"></div>
          <p className="assurance-text">
            Our executive will reach out to you within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;