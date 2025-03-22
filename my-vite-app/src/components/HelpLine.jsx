import React from "react";
import "./HelpLine.css";
import helpBanner from "../assets/img.jpg"; // Ensure this image exists

function HelpLine() {
  return (
    <div className="help-container">
      {/* Image + Contact Boxes Section */}
      <div className="help-content">
        {/* Half-screen Image */}
        <div
          className="help-banner"
          style={{ backgroundImage: `url(${helpBanner})` }}
        >
          <div className="help-text">Get Help</div>
        </div>

        {/* Half-screen Contact Boxes */}
        <div className="contact-boxes">
          <div className="contact-item">
            <h3>Call Us</h3>
            <p>📞 +91 9876543210</p>
          </div>
          <div className="contact-item">
            <h3>Email</h3>
            <p>📧 support@help.com</p>
          </div>
          <div className="contact-item">
            <h3>Location</h3>
            <p>📍 Hyderabad, India</p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="review-section">
        <h2>Send us your Feedback</h2>
        <textarea placeholder="Write your review here..."></textarea>
        <br />
        <button>Submit</button>
      </div>
    </div>
  );
}

export default HelpLine;
