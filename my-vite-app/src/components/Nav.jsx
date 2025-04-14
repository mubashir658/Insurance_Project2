import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Ensure you import the AuthContext
import "./Nav.css";

const Nav = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext); // Get login status from AuthContext
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Log out the user
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/">InsuranceWise</Link>
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>
      <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        {/* Remove Home button */}
        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/helpline"
            className={location.pathname === "/helpline" ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Helpline
          </Link>
        </li>
        {/* Conditionally render Login/Logout button */}
        {!isLoggedIn ? (
          <li>
            <Link
              to="/login"
              className={`nav-btn ${location.pathname === "/login" ? "active" : ""}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        ) : (
          <li>
            <button
              className="nav-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
