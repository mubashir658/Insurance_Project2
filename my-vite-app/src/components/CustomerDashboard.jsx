import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav.jsx";
import Homepage from "./Homepage.jsx";
import Login from "./Login.jsx";
import About from "./About.jsx";
import HelpLine from "./HelpLine.jsx";
import CustomerDashboard from "./CustomerDashboard.jsx"; // Correct name

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/helpline" element={<HelpLine />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} /> 
      </Routes>
    </>
  );
}

export default App;
