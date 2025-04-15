import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Tagline from "./Tagline.jsx";
import Box from "./Box.jsx";
import "./Homepage.css";

function Homepage() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePolicyClick = (path, policy) => {
    if (isLoggedIn) {
      navigate(path, { state: { selectedPolicy: policy } });
    } else {
      navigate('/login');
    }
  };

  const insuranceTypes = [
    {
      title: "Life Insurance Policy",
      description: "Secure your family's future with comprehensive life coverage",
      icon: "🛡️",
      path: "/basic-questions",
    },
    {
      title: "Vehicle Insurance Policy",
      description: "Protect your vehicle with customizable coverage options",
      icon: "🚗",
      path: "/basic-questions",
    },
    {
      title: "Health Insurance Policy",
      description: "Get the best healthcare coverage for you and your family",
      icon: "🏥",
      path: "/basic-questions",
    },
    {
      title: "Home Insurance Policy",
      description: "Safeguard your home against unexpected damages",
      icon: "🏠",
      path: "/basic-questions",
    },
  ];

  return (
    <div className="homepage">
      <header className="homepage-hero">
        <h1>Welcome to Your InsureWise</h1>
        <p>Explore coverage options tailored for you.</p>
        {!isLoggedIn ? (
          <Link to="/login" className="hero-btn">
            Get Started
          </Link>
        ) : (
          <Link
            to={user?.employeeId ? "/agent-dashboard" : "/user-dashboard"}
            className="hero-btn"
          >
            Go to Dashboard
          </Link>
        )}
      </header>

      <main className="homepage-main">
        <Tagline />

        <section className="insurance-options">
          <h2 className="section-title">Choose Your Protection</h2>
          <p className="section-subtitle">Select the type of insurance you need</p>

          <div className="box-grid">
            {insuranceTypes.map((type, index) => (
              <Box
                key={index}
                title={type.title}
                description={type.description}
                icon={type.icon}
                onClick={() => handlePolicyClick(type.path, type)}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="homepage-footer">
        <p>
          Need help choosing? <Link to="/helpline">Talk to an expert</Link>
        </p>
        <nav className="footer-nav">
          <Link to="/about">About Us</Link>
          <Link to="/helpline">Helpline</Link>
        </nav>
      </footer>
    </div>
  );
}

export default Homepage;
