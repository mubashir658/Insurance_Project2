import React from 'react';
import Tagline from './Tagline.jsx';
import Box from './Box.jsx';
import './Homepage.css';

function Homepage() {
  const insuranceTypes = [
    {
      title: "Life Insurance Policy",
      description: "Secure your family's future with comprehensive life coverage",
      icon: "🛡️",
      path: "/life-insurance"
    },
    {
      title: "Vehicle Insurance Policy",
      description: "Protect your vehicle with customizable coverage options",
      icon: "🚗",
      path: "/auto-insurance"
    },
    {
      title: "Health Insurance Policy",
      description: "Get the best healthcare coverage for you and your family",
      icon: "🏥",
      path: "/health-insurance"
    },
    {
      title: "Home Insurance Policy",
      description: "Safeguard your home against unexpected damages",
      icon: "🏠",
      path: "/home-insurance"
    }
  ];

  return (
    <div className="homepage">
      <main className="homepage-main">
        <Tagline />
        
        <section className="insurance-options">
          <h2 className="section-title">Choose Your Protection</h2>
          <p className="section-subtitle">Select the type of insurance you need</p>
          
          <div className="box-grid">
            {insuranceTypes.map((insurance) => (
              <Box 
                key={insurance.title}
                title={insurance.title}
                description={insurance.description}
                icon={insurance.icon}
                path={insurance.path}
              />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="homepage-footer">
        <p>Need help choosing? <a href="/contact">Talk to an expert</a></p>
      </footer>
    </div>
  );
}

export default Homepage;