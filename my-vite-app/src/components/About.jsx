import React from "react";
import "./About.css";
import aboutImg from "../assets/About-image.jpg";



function About() {
  return (
    <div className="about-container">   
      <h1>About InsureWise</h1>
      <p>
        We help agents determine if a customer is prominent and assist customers 
        in finding the best policy based on their data.
      </p>
      <img src={aboutImg} alt="Insurance Meeting" className="about-image" />
      
    </div>
  );
}

export default About;
