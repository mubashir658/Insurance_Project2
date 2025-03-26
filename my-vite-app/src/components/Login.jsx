import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = ({ setUser }) => {
  const [isAgent, setIsAgent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup ? "http://localhost:5000/auth/signup" : "http://localhost:5000/auth/login";
    
    try {
      const response = await axios.post(url, formData);
      alert(response.data.message); // Show pop-up message
      
      if (response.data.success && !isSignup) {
        setUser(response.data.user); // Set user in parent state after login
      }
    } catch (error) {
      alert("Something went wrong! Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">{isSignup ? "Sign Up" : "Login"}</h2>

      {/* Toggle between Customer and Agent */}
      <div className="toggle-buttons">
        <button onClick={() => setIsAgent(false)} className={!isAgent ? "active" : ""}>
          Customer
        </button>
        <button onClick={() => setIsAgent(true)} className={isAgent ? "active" : ""}>
          Agent
        </button>
      </div>

      {/* Login / Signup Form */}
      <form className="login-form" onSubmit={handleSubmit}>
        {isSignup && <input type="text" name="name" placeholder="Name" onChange={handleChange} required />}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        {isAgent && isSignup && <input type="text" name="employeeId" placeholder="Employee ID" onChange={handleChange} required />}
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>

      {/* Toggle between Login and Signup */}
      <p className="switch-text">
        {isSignup ? "Already have an account?" : "Don't have an account?"} 
        <span onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? " Login" : " Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default Login;
