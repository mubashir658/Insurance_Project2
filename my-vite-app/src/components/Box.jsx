import React from "react";
import "./Box.css";

const Box = ({ title, description, icon, onClick }) => {
  return (
    <div className="box" onClick={onClick}>
      <div className="box-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Box;
