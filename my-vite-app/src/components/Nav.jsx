import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/">Insurance Hub</Link>
      </div>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>
      <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <li>
          <Link
            to="/"
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
        </li>
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
        <li>
          <Link
            to="/login"
            className={`nav-btn ${location.pathname === "/login" ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;