import React from "react";
import "./About.css";
import aboutImg from "../assets/About-image.jpg";

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About InsureWise</h1>
        <p className="about-description">
          At InsureWise, we're revolutionizing the insurance industry by leveraging 
          advanced analytics to connect customers with the perfect policies and 
          empower agents with powerful tools for client assessment.
        </p>
        
        <div className="about-features">
          <div className="feature">
            <h3>For Agents</h3>
            <p>
              Our sophisticated algorithms help insurance professionals quickly 
              identify prominent clients and assess risk profiles with unprecedented 
              accuracy.
            </p>
          </div>
          
          <div className="feature">
            <h3>For Customers</h3>
            <p>
              We analyze your unique situation to match you with optimal coverage 
              options from our network of trusted providers, saving you time and money.
            </p>
          </div>
        </div>
      </div>
      
      <div className="about-image-container">
        <img 
          src={aboutImg} 
          alt="Insurance professionals discussing policy options" 
          className="about-image" 
        />
        <div className="image-overlay">
          <p>Trusted by thousands of agents and policyholders nationwide</p>
        </div>
      </div>
    </div>
  );
}

export default About;