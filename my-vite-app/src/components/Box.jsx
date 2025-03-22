import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx"; // ✅ Correct path

import "./Box.css";

const Box = ({ title }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard"); // Redirect to Customer Dashboard
    } else {
      navigate("/login"); // Redirect to Login page
    }
  };

  return (
    <div className="box" onClick={handleClick}>
      {title}
    </div>
  );
};

export default Box;
