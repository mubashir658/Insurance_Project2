import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // Ensure the path is correct
import ErrorBoundary from "./components/ErrorBoundary.jsx"; // Custom Error Boundary component
import "./index.css"; // Global CSS file

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider> {/* This ensures the context is available throughout the app */}
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
