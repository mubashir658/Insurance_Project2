import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const [isAgent, setIsAgent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear errors when user types
  };

  const validateForm = () => {
    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    const endpoint = isSignup ? "/auth/signup" : "/auth/login";
    const payload = isSignup ? formData : {
      email: formData.email,
      password: formData.password,
      isAgent
    };

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      
      if (response.data.success) {
        if (isSignup) {
          setIsSignup(false); // Switch to login after successful signup
          setError(""); // Clear any previous errors
        } else {
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          navigate(isAgent ? "/agent-dashboard" : "/dashboard");
        }
      }
      setError(response.data.message || "Action completed successfully");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong! Try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isSignup ? "Create Account" : "Welcome Back"}
          <span className="auth-subtitle">
            {isAgent ? " (Agent Portal)" : " (Customer Portal)"}
          </span>
        </h2>

        {/* Role Selection */}
        <div className="role-toggle">
          <button 
            onClick={() => setIsAgent(false)} 
            className={`role-btn ${!isAgent ? "active" : ""}`}
            disabled={isLoading}
          >
            Customer
          </button>
          <button 
            onClick={() => setIsAgent(true)} 
            className={`role-btn ${isAgent ? "active" : ""}`}
            disabled={isLoading}
          >
            Agent
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Auth Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {isAgent && isSignup && (
            <div className="form-group">
              <label htmlFor="employeeId">Employee ID</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              disabled={isLoading}
            />
          </div>

          {isSignup && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
                disabled={isLoading}
              />
            </div>
          )}

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              isSignup ? "Create Account" : "Login"
            )}
          </button>
        </form>

        {/* Auth Toggle */}
        <div className="auth-toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button 
            onClick={() => setIsSignup(!isSignup)}
            disabled={isLoading}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;