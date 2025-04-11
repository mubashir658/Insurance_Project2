import React, { useState } from "react";
import "./HelpLine.css";
import helpBanner from "../assets/img.jpg"; // Ensure this image exists

function HelpLine() {
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log("Feedback submitted:", feedback);
    setIsSubmitted(true);
    setFeedback("");
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="help-container">
      {/* Image + Contact Boxes Section */}
      <div className="help-content">
        {/* Half-screen Image */}
        <div
          className="help-banner"
          style={{ backgroundImage: `url(${helpBanner})` }}
          aria-label="Help banner image"
        >
          <div className="help-text">
            <h1>Get Help</h1>
            <p>We're here to assist you 24/7</p>
          </div>
        </div>

        {/* Half-screen Contact Boxes */}
        <div className="contact-boxes">
          <div className="contact-item">
            <div className="contact-icon">📞</div>
            <h3>Call Us</h3>
            <p>
              <a href="tel:+919876543210">+91 9876543210</a>
            </p>
            <p className="contact-hours">24/7 Support</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <h3>Email</h3>
            <p>
              <a href="mailto:support@help.com">support@help.com</a>
            </p>
            <p className="contact-hours">Response within 24 hours</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <h3>Location</h3>
            <p>Hyderabad, India</p>
            <p className="contact-hours">Headquarters</p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="review-section">
        <h2>Send us your Feedback</h2>
        <p>We value your opinion to improve our services</p>
        
        {isSubmitted ? (
          <div className="success-message">
            Thank you for your feedback!
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <textarea 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback here..."
              required
              aria-label="Feedback text area"
            />
            <br />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default HelpLine;