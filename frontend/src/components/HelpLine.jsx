import React, { useState } from "react";
import "./HelpLine.css";
import helpBanner from "../assets/img.jpg"; // Ensure this image exists
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

function HelpLine() {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Please log in to submit feedback");
        return;
      }

      // Get user ID from the token
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        setError("Invalid token format");
        return;
      }

      const payload = JSON.parse(atob(tokenParts[1]));
      const userId = payload.id;

      if (!userId) {
        setError("User ID not found in token");
        return;
      }

      const response = await axios.post('http://localhost:5000/api/feedback', {
        userId,
        feedbackText: feedback
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setIsSubmitted(true);
        setFeedback("");
        setError("");
        setTimeout(() => setIsSubmitted(false), 3000);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError(error.response?.data?.message || "Failed to submit feedback. Please try again.");
    }
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
        
        {error && <div className="error-message">{error}</div>}
        
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