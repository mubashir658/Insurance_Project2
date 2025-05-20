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
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
             fullName: formData.name,
             email: formData.email,
             employeeId: formData.employeeId,
             password: formData.password,
             role: isAgent ? "agent" : "customer",
           }
         : {
             email: formData.email,
             password: formData.password,
             role: isAgent ? "agent" : "customer",
           };

       try {
         console.log(`Sending POST request to http://localhost:5000${endpoint} with data:`, payload);
         const response = await axios.post(`http://localhost:5000${endpoint}`, payload, {
           headers: { "Content-Type": "application/json" },
         });
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

             // Store token and customer data
             localStorage.setItem("token", response.data.token);
             localStorage.setItem("customer", JSON.stringify({ name: response.data.data.name, email: response.data.data.email }));

             const loginResult = await login({ ...response.data.data, token: response.data.token });

             if (loginResult.success) {
               navigate(response.data.data.role === 'agent' ? "/agent-dashboard" : "/basic-questions", { replace: true });
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
         console.error("Auth error:", err);
         const errorMessages = {
           "User not found": "No account found with this email.",
           "Invalid credentials": "Incorrect email or password.",
           "Email already exists": "This email is already registered.",
           "Server configuration error": "Server error. Please try again later.",
         };
         setError(
           err.response?.data?.message
             ? errorMessages[err.response.data.message] || err.response.data.message
             : "Unable to connect to the server. Please ensure the backend is running on http://localhost:5000."
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
                   value={formData.email}
                   onChange={handleChange}
                   required
                   disabled={isLoading}
                 />
               </div>
             )}

             <div className="form-group password-group">
               <label htmlFor="password">Password</label>
               <div className="password-input-wrapper">
                 <input
                   type={showPassword ? "text" : "password"}
                   id="password"
                   name="password"
                   value={formData.password}
                   onChange={handleChange}
                   required
                   minLength="6"
                   disabled={isLoading}
                 />
                 <button
                   type="button"
                   className="password-toggle"
                   onClick={() => setShowPassword(!showPassword)}
                   disabled={isLoading}
                 >
                   {showPassword ? (
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                       <line x1="1" y1="1" x2="23" y2="23"></line>
                     </svg>
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                       <circle cx="12" cy="12" r="3"></circle>
                     </svg>
                   )}
                 </button>
               </div>
             </div>

             {isSignup && (
               <div className="form-group password-group">
                 <label htmlFor="confirmPassword">Confirm Password</label>
                 <div className="password-input-wrapper">
                   <input
                     type={showConfirmPassword ? "text" : "password"}
                     id="confirmPassword"
                     name="confirmPassword"
                     value={formData.confirmPassword}
                     onChange={handleChange}
                     required
                     minLength="6"
                     disabled={isLoading}
                   />
                   <button
                     type="button"
                     className="password-toggle"
                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                     disabled={isLoading}
                   >
                     {showConfirmPassword ? (
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                         <line x1="1" y1="1" x2="23" y2="23"></line>
                       </svg>
                     ) : (
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                         <circle cx="12" cy="12" r="3"></circle>
                       </svg>
                     )}
                   </button>
                 </div>
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