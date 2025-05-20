import React from "react";
import "./ThankYouPage.css";
import thankYouImage from "../assets/thankyou image.png";

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <div className="image-section">
          <img 
            src={thankYouImage} 
            alt="Thank you" 
            className="fullscreen-image" 
          />
          <p className="visiting-message">
            Thank you for visiting. We will soon contact you.
          </p>
        </div>

        <div className="content-section">
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
          
          <h1 className="thank-you-title">Submission Successful!</h1>
          <p className="thank-you-text">
            We've received your information and our team will contact you shortly.
          </p>
          
          <div className="contact-info">
            <div className="info-item">
              <i className="fas fa-phone-alt icon"></i>
              <span>+91 9991113331</span>
            </div>
            <div className="info-item">
              <i className="fas fa-envelope icon"></i>
              <span>insurewise@healthplans.com</span>
            </div>
          </div>
          
          <div className="decorative-line"></div>
          
          <p className="assurance-text">
            <i className="fas fa-clock"></i>
            Our executive will reach out within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;