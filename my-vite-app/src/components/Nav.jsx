import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <div id="nav">
      <ul>
        <li id="NAME">
          <Link to="/" className="nav-link">InsureWise</Link>
        </li>
        <div className="nav-right">
          <li><Link to="/helpline" className="nav-link">Help Line</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
        </div>
      </ul>
    </div>
  );
}

export default Nav;
