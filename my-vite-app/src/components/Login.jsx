import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [isAgent, setIsAgent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="login-container">
      <h2 className="login-title">
        {isSignup ? "Sign Up " : "Login"}
      </h2>

      {/* Toggle between Customer and Agent */}
      <div className="toggle-buttons">
        <button onClick={() => setIsAgent(false)} className={!isAgent ? "active" : ""}>Customer</button>
        <button onClick={() => setIsAgent(true)} className={isAgent ? "active" : ""}>Agent</button>
      </div>

      {/* Login / Signup Form */}
      <form className="login-form">
        {isSignup && <input type="text" placeholder="Name" required />}
        <input type="email" placeholder="Email" required />
        {isAgent && <input type="text" placeholder="Employee ID" required={isSignup} />}
        <input type="password" placeholder="Password" required />
        
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
