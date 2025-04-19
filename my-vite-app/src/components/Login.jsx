/*import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const [isAgent, setIsAgent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
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
    setSuccess("");

    const endpoint = isSignup ? "/auth/signup" : "/auth/login";
    const payload = isSignup
      ? {
          ...formData,
          role: isAgent ? "agent" : "customer",
          fullName: formData.name
        }
      : { 
          email: formData.email, 
          password: formData.password,
          role: isAgent ? "agent" : "customer"
        };

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      console.log("API Response:", response.data);

      if (response.data.success) {
        if (isSignup) {
          setIsSignup(false);
          setFormData({ name: "", email: "", employeeId: "", password: "", confirmPassword: "" });
          setSuccess("Account created successfully! Please log in.");
        } else {
          if (!response.data.data) {
            throw new Error("Invalid login response");
          }
          
          // Use the login function from auth context
          const loginResult = await login(response.data.data);
          
          if (loginResult.success) {
            // Navigate based on role
            navigate(response.data.data.role === 'agent' ? "/agent-dashboard" : "/user-dashboard", { replace: true });
          } else {
            throw new Error(loginResult.error || "Login failed");
          }
        }
      } else {
        const errorMessages = {
          "User not found": "No account found with this email.",
          "Invalid credentials": "Incorrect email or password.",
          "Email already exists": "This email is already registered.",
          "Error during login": "Login failed. Please try again.",
          "Error creating user": "Signup failed. Please try again.",
          "Server configuration error": "Server error. Please try again later.",
        };
        setError(errorMessages[response.data.message] || response.data.message || "An error occurred.");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessages = {
        "User not found": "No account found with this email.",
        "Invalid credentials": "Incorrect email or password.",
        "Email already exists": "This email is already registered.",
        "Server configuration error": "Server error. Please try again later.",
      };
      setError(
        err.response?.data?.message
          ? errorMessages[err.response.data.message] || err.response.data.message
          : "Unable to connect to the server. Please try again."
      );
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

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

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

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : (isSignup ? "Create Account" : "Login")}
          </button>
        </form>

        <div className="auth-toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button onClick={() => setIsSignup(!isSignup)} disabled={isLoading}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
*/
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const [isAgent, setIsAgent] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
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
  
    // Validate the form before proceeding
    if (!validateForm()) return;
  
    setIsLoading(true);
    setError("");
    setSuccess("");
  
    const endpoint = isSignup ? "/auth/signup" : "/auth/login";
    const payload = isSignup
      ? {
          ...formData,
          role: isAgent ? "agent" : "customer", // Include role based on user type
        }
      : {
          email: formData.email,
          password: formData.password,
          role: isAgent ? "agent" : "customer", // Include role for login
        };
  
    console.log("Submitting form data:", payload); // Log the payload for debugging
  
    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);
      console.log("API Response:", response.data); // Log the backend response for debugging
  
      // Check if the response indicates success
      if (response.data.success) {
        if (isSignup) {
          // On successful signup, store customer details in localStorage
          const { name, email } = response.data.data; // Ensure user data exists
          localStorage.setItem("customer", JSON.stringify({ name, email }));
  
          setIsSignup(false);
          setFormData({
            name: "",
            email: "",
            employeeId: "",
            password: "",
            confirmPassword: "",
          });
          setSuccess("Account created successfully! Please log in.");
        } else {
          // On successful login, store customer details in localStorage
          if (!response.data.data || !response.data.data.name || !response.data.data.email) {
            setError("Server did not return required user data. Please try again.");
            return;
          }
  
          const { name, email } = response.data.data;
          localStorage.setItem("customer", JSON.stringify({ name, email }));
  
          // Use the login function from auth context
          const loginResult = await login(response.data.data);
  
          if (loginResult.success) {
            navigate(response.data.data.role === "agent" ? "/agent-dashboard" : "/user-dashboard", {
              replace: true,
            });
          } else {
            throw new Error(loginResult.error || "Login failed");
          }
        }
      } else {
        // Handle backend-specific error messages
        const errorMessages = {
          "User not found": "No account found with this email.",
          "Invalid credentials": "Incorrect email or password.",
          "Email already exists": "This email is already registered.",
          "Error during login": "Login failed. Please try again.",
          "Error creating user": "Signup failed. Please try again.",
          "Server configuration error": "Server error. Please try again later.",
        };
        setError(errorMessages[response.data.message] || response.data.message || "An error occurred.");
      }
    } catch (err) {
      console.error("Login/Signup error:", err); // Log the full error for debugging
  
      // Handle network or server errors
      const errorMessages = {
        "User not found": "No account found with this email.",
        "Invalid credentials": "Incorrect email or password.",
        "Email already exists": "This email is already registered.",
        "Server configuration error": "Server error. Please try again later.",
      };
  
      setError(
        err.response?.data?.message
          ? errorMessages[err.response.data.message] || err.response.data.message
          : "Unable to connect to the server. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading state regardless of success or failure
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isSignup ? "Create Account" : "Welcome Back"}
          <span className="auth-subtitle">{isAgent ? " (Agent Portal)" : " (Customer Portal)"}</span>
        </h2>

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

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

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

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <div className="auth-toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button onClick={() => setIsSignup(!isSignup)} disabled={isLoading}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;