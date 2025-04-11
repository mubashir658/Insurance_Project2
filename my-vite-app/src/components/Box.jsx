import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import "./Box.css";

const Box = ({ title, description, icon }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    const path = isLoggedIn ? "/dashboard" : "/login";
    navigate(path);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <div 
      className="box"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${isLoggedIn ? "dashboard" : "login"}`}
    >
      {icon && <div className="box-icon">{icon}</div>}
      <h3 className="box-title">{title}</h3>
      {description && <p className="box-description">{description}</p>}
      <div className="box-hover-effect"></div>
    </div>
  );
};

export default Box;